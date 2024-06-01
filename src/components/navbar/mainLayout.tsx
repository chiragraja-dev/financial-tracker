"use client"

import Link from "next/link";
import { redirect } from "next/navigation";
import SideNavigation from "./sidebar";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/router'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);


    return (
        <main className="flex ">
            <SideNavigation />
            <section className="flex-1 w-8/12 ">
                <header className={`p-4 bg-white mb-6 py-5 sticky top-0 px-6  z-50 transition-all duration-300 ease-in-out  ${visible ? ' top-0' : ' -top-20'} `}>
                    <div className=" container flex justify-between">
                        <div></div>
                        <div className="flex">
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild className="mr-10 ">
                                    <Button variant={'outline'} className=""><PlusIcon className="mr-2" />Create</Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-auto flex flex-col divide-y bg-white">
                                    <DropdownMenuItem className="hover:bg-slate-100 py-2 text-center justify-center flex">
                                        Project
                                    </DropdownMenuItem>
                                    <Link href={"/admin/blogs/create"}>
                                        <DropdownMenuItem
                                            className="hover:bg-slate-100 py-2 text-center justify-center flex">
                                            Blog
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild className="mr-10 bg-slate-800 text-white">
                                    {/* <Button variant="outline"><PlusIcon className="mr-2" />Create</Button> */}
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>chirag</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-auto flex flex-col divide-y bg-white">
                                    <DropdownMenuItem className="hover:bg-slate-100 py-2 flex gap-2 items-center">
                                        <Avatar className="w-7 h-7">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>{"chirag"}</AvatarFallback>
                                        </Avatar>
                                        <p>{"chirag"}</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-slate-100 py-2 text-center justify-center flex">
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>
                <div className="px-6 py-2">
                    {children}
                </div>
            </section>
        </main>
    )

    // return user ? (
    //   <div className="flex items-center gap-4">
    //     Hey, {user.email}!
    //     <form action={signOut}>
    //       <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
    //         Logout
    //       </button>
    //     </form>
    //   </div>
    // ) : (
    //   <Link
    //     href="/login"
    //     className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    //   >
    //     Login
    //   </Link>
    // );
}
