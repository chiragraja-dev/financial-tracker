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
                    <div className='col-span-5 p-5 px-14 pt-12 bg-gray-50 text-black border min-h-screen md:h-auto' >
                        <div className=''>
                            <h1 className='text-3xl text-amber-400 font-bold'>Login</h1>
                            <h6 className='text-sm text-gray-400 font-semibold'>Track Your Finances: Login Now!</h6>
                        </div>
                        <div className="h-5 border-b border-gray-300 text-2xl text-center mt-4">
                            <span className="bg-gray-50 text-gray-500 text-sm px-3 font-medium">Login with</span>
                        </div>
                        <div className='my-10 grid grid-cols-2 gap-3'>
                            <div className='flex gap-2 p-3 rounded-sm border hover:text-sky-500 font-medium hover:bg-gray-100'>
                                <Image src={Icons?.Brand?.Google} alt="" className='w-6 h-6' />
                                <span className=''>Google</span>
                            </div>

                            <div className='flex gap-2 p-3 rounded-sm border hover:text-sky-500 font-medium hover:bg-gray-100'>
                                <Image src={Icons?.Brand?.gitHub} alt="" className='w-6 h-6' />
                                <span className=''>Github</span>
                            </div>

                        </div>
                        <div className="h-5 border-b border-gray-300 text-2xl text-center -mt-2">
                            <span className="bg-gray-50 text-gray-500 text-sm px-3 ">Or with  email</span>
                        </div>
                        <div className='mt-10'>
                            <div className="grid w-full  items-center gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="Email" />
                            </div>
                            <div className="grid w-full  items-center gap-3 mt-5">
                                <Label htmlFor="Password">Password</Label>
                                <Input type="Password" id="Password" placeholder="Password" />
                                <p className=' capitalize text-sky-500 font-semibold text-sm text-end cursor-pointer '>forgot password ?</p>
                            </div>
                            <div className="grid w-full  items-center gap-3 mt-5">
                                <Button className="bg-stone-800 hover:bg-zinc-800">
                                    <span className=" ">Login </span>
                                </Button>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className=' text-gray-500 text-sm text-center'>Not Login yet ? <span className=' text-sky-500 font-semibold'>Register</span></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default LoginPage