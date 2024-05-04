"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import * as  Images from "@/assets/image"
import * as  Icons from "@/assets/icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import LoginPage from './loginPage'
import RegisterPage from './registerPage'

const AuthPage = () => {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <>

            <div className='bg-stone-900 '>
                <div className=''>
                    <div className='grid grid-cols-1 md:grid-cols-12'>
                        <div className='px-20 col-span-7'>
                            <h1 className="text-3xl my-10 text-amber-400 select-none flex 2xl:justify-center cursor-pointer">
                                FInTracker
                                <FaMoneyBillTrendUp className="ml-2" />
                            </h1>
                            <div className='flex justify-center'>
                                <Image
                                    src={Images?.LoginPage?.loginSideImg}
                                    width={400}
                                    height={400}
                                    alt="Picture of the author"
                                    className=''
                                />
                            </div>
                        </div>
                        {
                            pathname == "/login" ?
                                <LoginPage /> :
                                <RegisterPage />
                        }
                    </div>
                </div>
            </div>


        </>
    )
}

export default AuthPage