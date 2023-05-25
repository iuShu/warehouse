'use client';

import {useRouter} from "next/navigation";
import {useAuthContext} from "../../providers/auth";
import {useNotificationContext} from "../../providers/notification";
import {fetchData} from "../fetch";
import forge from "node-forge";
import {setLocalSetting, setRtk} from "../settings";
import {useState} from "react";

export function LoginSubmit() {

  const router = useRouter()
  const authContext = useAuthContext()
  const notificationContext = useNotificationContext()
  const [on, setOn] = useState(false)

  const submitLogin = () => {
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    if (!username || !password) {
      notificationContext.alert('请输入用户名和密码')
      return
    }

    setOn(true)
    fetchData("/auth/pub/api").then(data => {
      if (data.code !== 1) {
        notificationContext.alert(data.msg || "请求密钥出现异常")
        setOn(false)
        return
      }

      const pubKey = forge.pki.publicKeyFromPem(`-----BEGIN PUBLIC KEY-----\n${data.payload}\n-----END PUBLIC KEY-----`)
      const body = {
        username: encodeURIComponent(forge.util.encode64(pubKey.encrypt(username))),
        password: encodeURIComponent(forge.util.encode64(pubKey.encrypt(password)))
      }
      fetchData("/auth/api", "POST", body).then(data => {
        if (data.code === 1) {
          const user = data.payload.user
          user["loginAt"] = Date.now()
          user["password"] = password
          authContext.loginHandler(user)
          setRtk(data.payload.refreshToken)
          notificationContext.notify("登录成功，正在进入 ...")
          router.push("/admin")
        }
        else if (data.code === -101) {
          notificationContext.alert("未查找到该用户")
        }
        else if (data.code === -1001) {
          notificationContext.alert("用户名或密码错误")
        }
        else {
          notificationContext.alert("登录请求异常")
        }
        setOn(false)
      })
    })
  }

  return (
    <>
      <button onClick={submitLogin}
              className="py-2 rounded flex flex-col items-center font-medium tracking-widest transition duration-300 text-blue-900 bg-blue-300 hover:bg-blue-400 dark:text-indigo-100 dark:bg-indigo-500 hover:dark:bg-indigo-600">
        <svg className={"animate-spin h-5 w-5 text-white " + (on ? "" : "hidden")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <div className={on ? "hidden" : ""}>登录</div>
      </button>
    </>
  )
}