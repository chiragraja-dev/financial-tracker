"use client"
import React, { useState } from 'react'

import DailyTranscation from '@/components/transcation/dailyTranscation'
import Link from 'next/link'
const Transcation = () => {
    const [transcation, setTranscation] = useState<string | any>()
    const [date, setDate] = React.useState<Date>()



    return (
        <>
            <div className='flex justify-between px-5'>
                {/* <Select onValueChange={setTranscation} >
                    <SelectTrigger className="w-[220px] bg-amber-50">
                        <SelectValue placeholder="Select Transaction type" />
                    </SelectTrigger>
                    <SelectContent className=' outline-none'>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select> */}
                <div></div>
                <Link className=' underline hover:text-sky-500 cursor-pointer' href={'/view-transcation'}>View Transcation</Link >
            </div>
            <DailyTranscation />
        </>
    )
}

export default Transcation