'use client'
import AllForuns from "@/components/AllForuns"
import ButtonUser from "@/components/ButtonUser"
import CriarForum from "@/components/CriarForum"
import Category from "@/components/category"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { Home } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {

    const session = useSession()
    const router = useRouter()


    useEffect(() => {
        if (session?.status === 'unauthenticated') {
            router.push('/login');
        }
    })

    return (
        <section>
            <div className="w-full">
                <div className="flex gap-2 p-2 bg-zinc-950 h-screen">
                    <div className="w-64 bg-zinc-800 h-full rounded relative flex flex-col gap-2 justify-between">
                        <div className="flex justify-center items-center w-full my-5 text-4xl">
                            <h1 className="text-white">Logo</h1>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col justify-center text-center p-2 items-center gap-2">
                                <div className="py-2 w-full bg-zinc-700/80 rounded text-white flex flex-row gap-2 px-2 justify-center">
                                    <Home />
                                    <h1 className="">Home</h1>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-full p-2 outline-none"><ButtonUser /></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Settings
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <button onClick={() => signOut()}>Log out</button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link href="/user" className="py-2 w-full flex flex-row gap-2 items-center rounded hover:bg-zinc-700/90 transition-all text-white"></Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex h-40 rounded bg-gradient-to-br from-emerald-500 to-emerald-950 relative">
                            <div className="background absolute top-0 left-0 w-full h-full rounded"></div>
                            <div className="p-6 text-white z-10">
                                <CriarForum />
                            </div>
                        </div>
                        <div className="text-white flex-grow rounded bg-zinc-800 overflow-y-scroll">
                            <Category />
                            <AllForuns />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}