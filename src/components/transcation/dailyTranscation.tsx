import React, { useState } from 'react';
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
import { db } from '../../../config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const FormSchema = z.object({
    transactions: z.array(z.object({
        amount: z.number().positive().nullable().optional(),
        reciever_name: z.string().nullable().optional(),
        comments: z.string().nullable().optional(),
        date: z.string().nullable().optional()
    })),
});

const DailyTransaction = () => {
    const [date, setDate] = useState<any>();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            transactions: [
                { amount: 0, reciever_name: '', comments: '', date: '' },
            ],
        },
    });

    const { fields, append } = useFieldArray({
        control: form.control,
        name: "transactions",
    }
    );
    const watchedValues = form.watch(); // Watch all fields


    const addFields = () => {
        append({ amount: 0, reciever_name: '', comments: '' });
    };


    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {

            const transactionsWithDate = data.transactions.map((transaction: any) => ({
                ...transaction,
                date: date,
            }));

            try {
                const docRef = await addDoc(collection(db, "Transcation"), transactionsWithDate[0]);
                console.log("Document written with ID: ", docRef.id);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
            console.log('Form Submitted');
            console.log(transactionsWithDate); // Log the transactions with the appended date
        } catch (error) {
            console.error('Error during form submission', error);
        }
    };


    return (
        <>
            <div className='mt-5 pt-5 border-t border-orange-200 px-5 flex gap-3'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=' flex gap-2'>

                        <div className='grid'>
                            <div>
                                <Label className='text-slate-600 mb-2'>Select Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] justify-start text-left font-normal bg-amber-50",
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
                        </div>
                        <div className='border shadow-lg w-full'>
                            <div {...form}>
                                <div onSubmit={form.handleSubmit(onSubmit)} className='col-span-5 text-black border'>
                                    <Card className="w-full">
                                        <CardHeader>
                                            <CardTitle>Add Transaction of {date ? date.toDateString() : "________"}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className='grid gap-2'>
                                                {fields.map((item, index) => (
                                                    <div key={item.id} className='grid grid-cols-3 gap-2'>
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
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <Button type="button" onClick={addFields} className=' flex items-center gap-2'>
                                                <FaPlus className=' w-3 h-3' />
                                                <span> Add More Transcation</span>
                                            </Button>
                                            <Button type="submit">Submit</Button>
                                        </CardFooter>
                                    </Card>
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
