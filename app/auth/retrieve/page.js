import Link from "next/link";

export default function Retrieve() {
  return (
    <>
      <div className="text-xl text-blue-400">Retrieve</div>
      <Link href={"/auth"}>to Login</Link>
      <Link href={"/auth/register"}>to Register</Link>
    </>
  )
}