
import Transcation from "@/app/(tracker)/transaction/page";
import { useTranscationObservable } from "./transcation.observable";
import { transcationApiClient } from "@/apiClient/transcationFunctionClient/transcationFunctionClient";
import { Subscription } from 'rxjs';
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

export enum InitalTranscationSubjectKey {
    POST_TRANSCATION = 'postTranscation',
    GET_TRANSACTION = 'getTransaction',
    GET_CATEGORY = 'getCategory',
    GET_TRANSACTION_BY_ID = 'getTransactionById'
}

export enum TranscationLoaderType {
    POST_TRANSCATION_LOADER = 'postranscationLoader',
    GET_TRANSACTION_LOADER = 'getTransactionLoader',
    GET_CATEGORY_LOADER = 'getCategoryLoader'
}

export interface TranscationtateLoaderProps {
    postranscationLoader: boolean;
    getTransactionLoader: boolean;
    getCategoryLoader: boolean
}

export interface InitalTranscationubjectState {
    loader: TranscationtateLoaderProps;
    postTranscation: any;
    getTransaction: any;
    getCategory: any;
    getTransactionById: any
}

export const useTranscationRepositiory = () => {
    const transcationObservable = useTranscationObservable();
    const transcationApiService = transcationApiClient();

    const getTranscationObjervable = () => {
        return transcationObservable.getTranscationObjervables();
    };


    const postDailyTranscation = (transactions: any[], collectionName: string): Subscription => {
        transcationObservable.setLoaderState(
            true,
            TranscationLoaderType.POST_TRANSCATION_LOADER
        );
        return transcationApiService
            .addDailyTranscation(collectionName, transactions)
            .subscribe({
                error(err: any) {
                    transcationObservable.setLoaderState(
                        false,
                        TranscationLoaderType.POST_TRANSCATION_LOADER
                    );
                    toast({
                        variant: "destructive",
                        title: "something went wrong",
                    })
                    throw err;
                },
                next(value: any) {
                    transcationObservable.setLoaderState(
                        false,
                        TranscationLoaderType.POST_TRANSCATION_LOADER
                    );
                    transcationObservable.setTranscationState(
                        value,
                        InitalTranscationSubjectKey.POST_TRANSCATION
                    );
                    toast({
                        variant: "success",
                        title: "Transcation added successfully",
                    })
                },
            });
    };

    const getAllTransaction = async (collectionName: string, date?: string | Date): Promise<Subscription> => {
        transcationObservable.setLoaderState(
            true,
            TranscationLoaderType.GET_TRANSACTION_LOADER
        );

        return (await transcationApiService
            .getTransaction(collectionName))
            .subscribe({
                error(err: any) {
                    transcationObservable.setLoaderState(
                        false,
                        TranscationLoaderType.GET_TRANSACTION_LOADER
                    );
                    toast({
                        variant: "destructive",
                        title: "something went wrong",
                    })
                    throw err;
                },
                next(value: any) {
                    transcationObservable.setLoaderState(
                        false,
                        TranscationLoaderType.GET_TRANSACTION_LOADER
                    );
                    transcationObservable.setTranscationState(
                        value,
                        InitalTranscationSubjectKey.GET_TRANSACTION
                    );

                },
            });
    };


    const getAllTransactionById = async (collectionName: string, date?: string | Date): Promise<Subscription> => {
        transcationObservable.setLoaderState(
            true,
            TranscationLoaderType.GET_TRANSACTION_LOADER
        );
        debugger
        return (await transcationApiService
            .getTransactionById(collectionName, date))
            .subscribe({
                error(err: any) {
                    transcationObservable.setLoaderState(
                        false,
                        TranscationLoaderType.GET_TRANSACTION_LOADER
                    );
                    toast({
                        variant: "destructive",
                        title: "something went wrong",
                    })
                    throw err;
                },
                next(value: any) {
                    transcationObservable.setLoaderState(
                        false,
                        TranscationLoaderType.GET_TRANSACTION_LOADER
                    );
                    transcationObservable.setTranscationState(
                        value,
                        InitalTranscationSubjectKey.GET_TRANSACTION_BY_ID
                    );
                    debugger
                },
            });
    };


    const getCategory = async (collectionName: string): Promise<Subscription> => {
        transcationObservable.setLoaderState(
            true,
            TranscationLoaderType.GET_TRANSACTION_LOADER
        );

        return (await transcationApiService
            .getAllCategory(collectionName))
            .subscribe({
                error(err: any) {
                    transcationObservable.setLoaderState(
                        false,
                        TranscationLoaderType.GET_CATEGORY_LOADER
                    );
                    toast({
                        variant: "destructive",
                        title: "something went wrong",
                    })
                    throw err;
                },
                next(value: any) {
                    transcationObservable.setLoaderState(
                        false,
                        TranscationLoaderType.GET_CATEGORY_LOADER
                    );
                    transcationObservable.setTranscationState(
                        value,
                        InitalTranscationSubjectKey.GET_CATEGORY
                    );

                },
            });
    };

    return {
        getTranscationObjervable,
        postDailyTranscation,
        getAllTransaction,
        getCategory,
        getAllTransactionById
    };
};
