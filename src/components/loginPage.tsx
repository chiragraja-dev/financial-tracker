"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import * as  Images from "@/assets/image"
import * as  Icons from "@/assets/icon"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaMoneyBillTrendUp } from 'react-icons/fa6'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { PasswordInput } from './ui/password-input'
import signUp from '@/firebase/signup'
import { ToastAction } from "@/components/ui/toast"
import { toast, useToast } from "@/components/ui/use-toast"
import { Toaster } from './ui/toaster'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import signIn from '@/firebase/login'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const FormSchema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    })
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",

        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        const { result, error } = await signIn(data?.email, data?.password);
        console.log(result, "------<>-----res")
        console.log(error, "error")
        sessionStorage.setItem('user', JSON.stringify(result?.user))
        // sessionStorage.setItem('accessToken', result?.user?.accessToken)
        // sessionStorage.setItem('uid', result?.)
        if (error) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Please try again ",

            })
        } else {
            router.push('/dashboard')
            toast({
                variant: "success",
                title: "You are successfully logged in",
                description: "Stay connected.. ",
            })


            // redirect('/dashboard')

        }
    }


    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='col-span-5 p-5 px-14 pt-12 bg-gray-50 text-black border min-h-screen md:h-auto'>

                <div className=''>
                    <h1 className='text-3xl text-amber-400 font-bold'>Login</h1>
                    <h6 className='text-sm text-gray-400 font-semibold'>Track Your Finances: Login Now!</h6>
                </div>
                <div className="h-5 border-b border-gray-300 text-2xl text-center mt-4">
                    <span className="bg-gray-50 text-gray-500 text-sm px-3 font-medium">Login with</span>
                </div>
                <div className='my-10 grid grid-cols-2 gap-3'>
                    <div className='flex gap-2 p-3 rounded-sm border hover:text-sky-500 font-medium hover:bg-gray-100 cursor-pointer'>
                        <Image src={Icons?.Brand?.Google} alt="" className='w-6 h-6' />
                        <span className=''>Google</span>
                    </div>

                    <div className='flex gap-2 p-3 rounded-sm border hover:text-sky-500 font-medium hover:bg-gray-100 cursor-pointer'>
                        <Image src={Icons?.Brand?.gitHub} alt="" className='w-6 h-6' />
                        <span className=''>Github</span>
                    </div>

                </div>
                <div className="h-5 border-b border-gray-300 text-2xl text-center -mt-2">
                    <span className="bg-gray-50 text-gray-500 text-sm px-3 ">Or with  email</span>
                </div>
                <div className='mt-10'>
                    <div className="grid w-full  items-center gap-3">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input id="email" placeholder="Email"
                                            className=' border-gray-300 !ring-gray-600'
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid w-full  items-center gap-3 mt-5">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        {/* <Input id="email" placeholder="Email"
                                                {...field}
                                            /> */}
                                        <PasswordInput
                                            id="password"
                                            {...field}
                                            autoComplete="new-password"
                                        // onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className=' capitalize text-sky-500 font-semibold text-sm text-end cursor-pointer '>forgot password ?</p>
                    </div>
                    <div className="grid w-full  items-center gap-3 mt-5">
                        <Button className="bg-stone-800 hover:bg-zinc-800">
                            <span className=" ">Login </span>
                        </Button>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className=' text-gray-500 text-sm text-center'>Not Login yet ? <Link className=' text-sky-500 font-semibold' href={'/register'}>Register</Link></div>
                </div>


            </form>
        </Form>
    )
}

export default LoginPage