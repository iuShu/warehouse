'use client';

import {useRouter} from "next/navigation";
import {useAuthContext} from "../../providers/auth";
import {useNotificationContext} from "../../providers/notification";
import {fetchData} from "../fetch";

export function LoginSubmit() {

  const router = useRouter()
  const authContext = useAuthContext()
  const notificationContext = useNotificationContext()

  const submitLogin = () => {
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    if (!username || !password) {
      notificationContext.alert('请输入用户名和密码')
      return
    }

    fetchData("/auth/pub/api").then(data => {
      if (data.code !== 1) {
        notificationContext.alert(data.msg || "请求密钥出现异常")
        return
      }
      const body = {
        username: username,
        password: password
      }
      fetchData("/auth/api", "POST", body).then(data => {
        console.log(data)
      })
    })

    /*fetch('/auth/api', {
      method: 'POST',
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
      if (!res.ok) {
        alert('auth failed')
        return
      }
      res.json().then(data => {
        data.user["loginAt"] = Date.now()
        authContext.loginHandler(data.user)
      })
      router.push('/admin')
    }).catch(err => {
      console.error('auth error', err)
    })*/
  }

  return (
    <>
      <button onClick={submitLogin}
              className="py-2 rounded tracking-widest transition duration-300 bg-blue-200 hover:bg-blue-300 dark:text-indigo-100 dark:bg-indigo-500 hover:dark:bg-indigo-600">
        登录
      </button>
    </>
  )
}