"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from '@/components/ui/label'
import DailyTranscation from '@/components/transcation/dailyTranscation'
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
                <div className=' underline hover:text-sky-500 cursor-pointer'>View Transcation</div>
            </div>
            <DailyTranscation />
        </>
    )
}

export default Transcation