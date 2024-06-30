"use client"
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlus } from 'react-icons/fa';
import { db, firebase_app } from '../../../config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useTranscationRepositiory } from '@/store/transcationStore/transcation.repository';
import { useObservable } from '@/lib/hooks/useObservable';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getAuth } from 'firebase/auth';




const FormSchema = z.object({
    transactions: z.array(z.object({
        amount: z.number().positive().nullable().optional(),
        reciever_name: z.string().nullable().optional(),
        comments: z.string().nullable().optional(),
        date: z.string().nullable().optional(),
        category: z.string().nullable().optional()
    })),
});

const DailyTransaction = () => {
    const [date, setDate] = useState<any>();
    const router = useRouter()
    const auth = getAuth(firebase_app)


    const transcationRepository = useTranscationRepositiory();
    const transcationState = useObservable(
        transcationRepository.getTranscationObjervable()
    );

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            transactions: [
                { amount: 0, reciever_name: '', comments: '', date: '', category: '' },
            ],
        },
    });

    const { fields, append } = useFieldArray({
        control: form.control,
        name: "transactions",
    }
    );

    const [user, setUser] = useState(null);





    const addFields = () => {
        append({ amount: 0, reciever_name: '', comments: '', category: '' });
    };


    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            if (date && auth?.currentUser?.uid) {
                if (Array.isArray(data.transactions)) {
                    const currentDate = new Date(date).toISOString();
                    const transactionsWithDate = data.transactions.map((transaction: any) => ({
                        ...transaction,
                        date: currentDate,
                        userId: auth?.currentUser?.uid
                    }));

                    transcationRepository?.postDailyTranscation(transactionsWithDate, "Transcation").add({
                        unsubscribe() {
                            router.push('/view-transcation')
                        }
                    });
                } else {
                    throw new Error("Expected 'transactions' to be an array");
                }
            } else {
                toast({
                    variant: "destructive",
                    description: "Please Select The Date",

                })
            }
        } catch (error) {
            console.error('Error during form submission', error);
        }
    };

    useEffect(() => {
        transcationRepository?.getCategory("Category")
    }, [])


    return (
        <>
            <div className=' px-5 gap-3'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=''>


                        <div className=' w-full'>
                            <div {...form}>
                                <div onSubmit={form.handleSubmit(onSubmit)} className='col-span-5 text-black '>
                                    <div className="w-full">
                                        <CardHeader>
                                            <CardTitle>
                                                Add Transcation
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className=' flex gap-2 items-center mt-5'>
                                                <Label className='text-slate-600 mb-2'>Select Transcation Date</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] justify-start text-left font-normal ",
                                                                !date && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={setDate}
                                                            initialFocus
                                                            disabled={(date) =>
                                                                date >= new Date() || date < new Date("1900-01-01")
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </CardContent>

                                        {
                                            date && <>

                                                <CardContent>
                                                    <div className='grid gap-2'>
                                                        {fields.map((item, index) => (
                                                            <div key={item.id} className='grid grid-cols-4 gap-2'>
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`transactions.${index}.amount`}
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Amount</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    id={`amount-${index}`}
                                                                                    placeholder="Amount"
                                                                                    className='border-gray-300 !ring-gray-600'
                                                                                    {...field}
                                                                                    value={field.value ?? ''}
                                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                                                />
                                                                            </FormControl>
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`transactions.${index}.reciever_name`}
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Reciever Name</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    id={`reciever_name-${index}`}
                                                                                    placeholder="Reciever Name"
                                                                                    className='border-gray-300 !ring-gray-600'
                                                                                    {...field}
                                                                                    value={field.value ?? ''}
                                                                                />
                                                                            </FormControl>
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name={`transactions.${index}.comments`}
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Comments</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    id={`comments-${index}`}
                                                                                    placeholder="Comments"
                                                                                    className='border-gray-300 !ring-gray-600'
                                                                                    {...field}
                                                                                    value={field.value ?? ''}
                                                                                    onChange={(e) => field.onChange(e.target.value)}
                                                                                />
                                                                            </FormControl>
                                                                        </FormItem>
                                                                    )}
                                                                />


                                                                {/* <FormField
                                                                    control={form.control}
                                                                    name={`transactions.${index}.category`}
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Category</FormLabel>
                                                                            <FormControl>
                                                                              

                                                                                <Select>
                                                                                    <SelectTrigger className="">
                                                                                        <SelectValue placeholder="Category Name" />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent
                                                                                        id={`category-${index}`}
                                                                                        className="border-gray-300 !ring-gray-600"
                                                                                        {...field}
                                                                                    >
                                                                                        {transcationState && transcationState?.getCategory?.map((item: any) => (
                                                                                            <SelectItem
                                                                                                key={item?.category_name}
                                                                                                value={item?.category_name ?? ''}
                                                                                            >
                                                                                                {item?.category_name}
                                                                                            </SelectItem>
                                                                                        ))}
                                                                                    </SelectContent>
                                                                                </Select>


                                                                            </FormControl>
                                                                        </FormItem>
                                                                    )}
                                                                /> */}

                                                                <FormField
                                                                    control={form.control}
                                                                    name={`transactions.${index}.category`}
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel>Category</FormLabel>
                                                                            <FormControl>
                                                                                <Select
                                                                                    value={field.value ?? ''}
                                                                                    onValueChange={(value) => field.onChange(value)}
                                                                                >
                                                                                    <SelectTrigger className="">
                                                                                        <SelectValue placeholder="Category Name" />
                                                                                    </SelectTrigger>
                                                                                    <SelectContent
                                                                                        id={`category-${index}`}
                                                                                        className="border-gray-300 !ring-gray-600"
                                                                                    >
                                                                                        {transcationState && transcationState.getCategory?.map((item: any) => (
                                                                                            <SelectItem
                                                                                                key={item?.category_name}
                                                                                                value={item?.category_name ?? ''}
                                                                                            >
                                                                                                {item?.category_name}
                                                                                            </SelectItem>
                                                                                        ))}
                                                                                        <SelectItem key={'Other'}
                                                                                            value={'Other'}>
                                                                                            Other
                                                                                        </SelectItem>
                                                                                    </SelectContent>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex justify-between">
                                                    <Button variant="outline" type="button" onClick={addFields} className=' flex items-center gap-2'>
                                                        <FaPlus className=' w-3 h-3' />
                                                        <span> Add More Transcation</span>
                                                    </Button>
                                                    <Button type="submit">Submit</Button>
                                                </CardFooter>
                                            </>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </Form>
            </div>
        </>
    );
}

export default DailyTransaction;


