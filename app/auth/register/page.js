import Link from "next/link";

export default function Register() {
  return (
    <>
      <div className="text-xl text-blue-400">Register</div>
      <Link href={"/auth"}>to Login</Link>
      <Link href={"/auth/retrieve"}>to Retrieve</Link>
    </>
  )
}