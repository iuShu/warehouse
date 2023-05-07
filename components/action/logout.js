'use client';

import Link from "next/link";

export function Logout() {

  const logout = () => {
    fetch('/login/api', {
      method: 'delete'
    }).then(res => {
      console.log('logout', res.ok)
    }).catch(err => {
      console.error('logout error', err)
    })
  }

  return (
    <>
      <Link href={""} className="text-sky-600" onClick={logout}>Logout</Link>
    </>
  )
}