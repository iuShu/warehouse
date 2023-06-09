import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full min-h-screen bg-zinc-100 items-center justify-center">
        <p>Home</p>
        <Link href={"/admin"} className="text-sky-600">Admin</Link>
      </div>
    </>
  )
}
