import Link from 'next/link'
import { title } from 'process';
import React from 'react'
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { MdHome, MdMenu } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

import * as Icon from "@/assets/icon"
import Image from 'next/image';

const SideBar = () => {


    const sidebar = [
        {
            icon: <MdHome className='w-6 h-5 ' />,
            title: "Dashboard",
            navigate: "/tracker"
        },
        {
            icon: <GiReceiveMoney className='w-6 h-5 ' />,
            title: "Income",
            navigate: "/income"
        },
        {
            icon: <GiPayMoney className=' w-6 h-5 mt-1' />,
            title: "Transcation",
            navigate: "/transcation"
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
                <div className="mt-4 p-4 py-7">
                    <ul>

                        {
                            sidebar.map((data, index) => (
                                <>
                                    <li>
                                        <Link href={data.navigate} className=" px-4 py-2 my-5 text-white hover:bg-amber-400 hover:text-slate-800 rounded-2xl font-medium flex items-center gap-2 ">
                                            {/* <Image src={data.icon} alt={''} className='w-6 h-6 hover:fill-slate-500 fill-amber-500'></Image> */}
                                            <span>{data.icon}</span>
                                            <span> {data?.title}</span>
                                        </Link>
                                    </li>

                                </>
                            ))
                        }

                    </ul>
                </div>
            </aside>
        </>)
}

export default SideBar