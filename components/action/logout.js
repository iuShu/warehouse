"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";

export function Logout() {

  const router = useRouter()

  const logout = () => {
    fetch("/auth/api", {
      method: "delete"
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.success)
            router.push("/auth")
          else
            alert("logout failed" + data.msg)
        })
      }
    }).catch(err => {
      console.error("logout error", err)
    })
  }

  return (
    <>
      <Link href={""} className="text-sky-600" onClick={logout}>Logout</Link>
    </>
  )
}