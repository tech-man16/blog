import { Button } from "@heroui/react"
import { Link } from "@heroui/react"
import Navbar from "./components/navbar"
export default function Home() {
  return (

    <>
      <div className="flex flex-col gap-2 h-screen">
        <Navbar />
        <div className="flex flex-1 justify-center items-center">
          <Link href="/Blog/tech-man"> Visit My Blog </Link>
        </div>
      </div>
    </>

  )
}