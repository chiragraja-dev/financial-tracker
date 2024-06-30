"use client"
import { useObservable } from '@/lib/hooks/useObservable';
import { useTranscationRepositiory } from '@/store/transcationStore/transcation.repository';
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const ViewTranscation = () => {
    const [open, setOpen] = useState<number>()
    const transcationRepository = useTranscationRepositiory();

    const transcationState = useObservable(
        transcationRepository.getTranscationObjervable()
    );

    useEffect(() => {
        transcationRepository?.getAllTransaction('Transcation')
    }, [])
    // new Date(item.date).toDateString()
    const uniqueDates = [...new Set(transcationState.getTransaction?.map((item: { date: string | number | Date; }) => item.date))];


    const getTransaction = (item: any) => {
        transcationRepository?.getAllTransactionById('Transcation', item)
    }

    console.log(JSON.stringify(transcationState?.getTransactionById) + "---")


    return (
        <div>
            {uniqueDates && uniqueDates?.map((item: any, index) => {
                return (
                    <>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger onClick={() => { getTransaction(item); setOpen(index) }}>{new Date(item).toDateString()}</AccordionTrigger>

                                {open == index &&
                                    <AccordionContent className='border shadow-md p-5'>
                                        {/* {JSON.stringify(transcationState?.getTransactionById)} */}
                                        <div className=' grid grid-cols-4 py-2-2 border-b border-gray-400'>
                                            <div>Amount</div>
                                            <div>Category</div>
                                            <div>Comments</div>
                                            <div>Receiver Name</div>
                                        </div>

                                        {
                                            transcationState?.loader?.getTransactionLoader ? <>Loading</> :
                                                transcationState?.getTransactionById?.map((data: any) => (
                                                    <>

                                                        <div className='grid grid-cols-4 border-t'>

                                                            <div className='mt-5 '>
                                                                {data?.amount}
                                                            </div>
                                                            <div className='mt-5 '>
                                                                {data?.category}
                                                            </div>
                                                            <div className='mt-5 '>
                                                                {data?.comments}
                                                            </div>
                                                            <div className='mt-5 '>
                                                                {data?.reciever_name}
                                                            </div>
                                                        </div>
                                                    </>
                                                ))
                                        }

                                    </AccordionContent>
                                }

                            </AccordionItem>
                        </Accordion >


                    </>
                )
            })}
        </div >
    )
}

export default ViewTranscation