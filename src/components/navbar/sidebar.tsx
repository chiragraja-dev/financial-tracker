import Link from 'next/link'
import { title } from 'process';
import React from 'react'
import { FaChartPie, FaMoneyBillTransfer, FaMoneyBillTrendUp } from 'react-icons/fa6';
import { MdHome, MdMenu } from "react-icons/md";
import { BsGraphUp, BsGraphUpArrow } from "react-icons/bs";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

import * as Icon from "@/assets/icon"
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {

    const pathName = usePathname()

    // console.log(pathName)
    const sidebar = [
        {
            icon: <MdHome className='w-6 h-5 ' />,
            title: "Dashboard",
            navigate: "/dashboard"
        },
        {
            icon: <FaMoneyBillTransfer className=' w-6 h-5 mt-1' />,
            title: "Transaction",
            navigate: "/transaction"
        },
        {
            icon: <GiReceiveMoney className='w-6 h-5 ' />,
            title: "Budgets and Income",
            navigate: "/budget"
        },
        {
            icon: <BsGraphUpArrow className='w-6 h-5 ' />,
            title: "Investment",
            navigate: "/investment"
        },
        {
            icon: <FaChartPie className='w-6 h-5 ' />,
            title: "Analysis",
            navigate: "/analysis"
        },

    ]

    return (
        <>
            <div className='lg:hidden p-10'>
                <MdMenu />
            </div>
            <aside className="sticky top-0 w-[300px] md:hidden lg:block lg:w-[250px] xl:w-[300px] 2xl:w-[350px] border-gray-300 h-screen bg-[#202021]">
                <h1 className="font-semibold text-2xl px-4 py-3 text-center mt-3 text-amber-400 flex justify-center items-center cursor-pointer">
                    FInTracker
                    <FaMoneyBillTrendUp className="ml-2 -mt-1" />
                </h1>
                <div className=" my-3"></div>
                <div className="mt-4 py-7">
                    <ul className=' space-y-5'>

                        {
                            sidebar.map((data, index) => (

                                <li className=' ' key={index}>
                                    <Link href={data.navigate} className={` button-sidebar   text-white  hover:text-slate-800 flex items-center px-10 py-4  ${data.navigate == pathName ? " font-bold" : " font-light"}`}>
                                        {/* <Image src={data.icon} alt={''} className='w-6 h-6 hover:fill-slate-500 fill-amber-500'></Image> */}
                                        <span>{data.icon}</span>
                                        <span className='ml-2'> {data?.title}</span>
                                    </Link>
                                </li>


                            ))
                        }

                    </ul>
                </div>
            </aside>
        </>)
}

export default SideBar