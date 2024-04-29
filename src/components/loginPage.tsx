"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import * as  Images from "@/assets/image"
import * as  Icons from "@/assets/icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { Button } from "@/components/ui/button"


const LoginPage = () => {
    useEffect(() => {
        // document.body.style.overflowY = 'hidden';
        // return () => {
        //     document.body.style.overflowY = 'auto';
        // };
    }, []);
    return (
        <div className='bg-stone-900 '>
            <div className=''>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div className='px-20'>
                        <h1 className="text-3xl my-10 text-amber-400 select-none flex cursor-pointer">
                            FInTracker
                            <FaMoneyBillTrendUp className="ml-2" />
                        </h1>
                        <div className='flex justify-center'>
                            <Image
                                src={Images?.LoginPage?.loginSideImg}
                                width={400}
                                height={400}
                                alt="Picture of the author"
                                className='my-10'
                            />
                        </div>
                    </div>
                    <div className='p-5 px-14 pt-12 bg-gray-50 text-black border min-h-screen md:h-auto'>
                        <div className='py-4'>
                            <h1 className='text-3xl text-amber-400 font-bold'>Login</h1>
                            <h6 className='text-base text-gray-400 font-semibold'>Track Your Finances: Login Now!</h6>
                        </div>
                        <div className='mt-10'>
                            <div className="grid w-full  items-center gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="Email" />
                            </div>
                            <div className="grid w-full  items-center gap-3 mt-5">
                                <Label htmlFor="Password">Password</Label>
                                <Input type="Password" id="Password" placeholder="Password" />
                            </div>
                            <div className="grid w-full  items-center gap-3 mt-5">
                                <Button className="bg-stone-800">
                                    <span className=" ">Login </span>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage