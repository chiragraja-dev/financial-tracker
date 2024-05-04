"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import * as  Images from "@/assets/image"
import * as  Icons from "@/assets/icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { Button } from "@/components/ui/button"
import { PasswordInput } from './ui/password-input'
import Link from 'next/link'
import signUp from '@/firebase/signup'


const RegisterPage = () => {
    const [passwordConfirmation, setPasswordConfirmation] = useState<any>()
    const [password, setPassword] = useState<any>()
    const [email, setEmail] = useState<any>()
    const [passwordMatch, setPasswordMatch] = useState<any>('')


    const handleForm = async (event: any) => {
        event.preventDefault()
        const { result, error } = await signUp(email, password);
        if (error) {
            return console.log(error)
        }
        console.log(result)
        // return router.push("/admin")
    }


    useEffect(() => {
        if (passwordConfirmation && password && passwordConfirmation != password) {
            setPasswordMatch("The password and confirm password do not match")
        }
        else {
            setPasswordMatch("")
        }
    }, [password, passwordConfirmation])






    return (
        <>
            <div className='col-span-5 p-5 px-14 pt-12 bg-gray-50 text-black border min-h-screen md:h-auto' >
                <div className=''>
                    <h1 className='text-3xl text-amber-400 font-bold'>Sign Up</h1>
                    <h6 className='text-sm text-gray-400 font-semibold'>Track Your Finances: Sign Up Now!</h6>
                </div>
                <div className="h-5 border-b border-gray-300 text-2xl text-center mt-4">
                    <span className="bg-gray-50 text-gray-500 text-sm px-3 font-medium">Register with</span>
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
                        <Input type="email" id="email" placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* <div className="grid w-full  items-center gap-3 mt-5">
                        <Label htmlFor="Password">Password</Label>
                        <Input type="Password" id="Password" placeholder="Password" />
                    </div> */}
                    {/* <p className=' capitalize text-sky-500 font-semibold text-sm text-end cursor-pointer '>forgot password ?</p> */}

                    <div className="grid w-full  items-center gap-3 mt-5">
                        <Label htmlFor="password">New Password</Label>
                        <PasswordInput
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="grid w-full  items-center gap-3 mt-5">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <PasswordInput
                            id="password_confirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            autoComplete="new-password"
                        />
                        {passwordMatch && <p className='text-red-500 text-sm'>{passwordMatch}</p>}
                    </div>
                    <div className="grid w-full  items-center gap-3 mt-5">
                        <Button className="bg-stone-800 hover:bg-zinc-800" onClick={handleForm}>
                            <span className=" ">Sign Up</span>
                        </Button>
                    </div>
                </div >
                <div className='mt-5'>
                    <div className=' text-gray-500 text-sm text-center'>Alerady have account ? <Link className=' text-sky-500 font-semibold' href={'/login'}>Login</Link></div>
                </div>

            </div >
        </>
    )
}

export default RegisterPage