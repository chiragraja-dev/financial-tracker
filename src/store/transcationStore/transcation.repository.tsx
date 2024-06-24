import Transcation from "@/app/(tracker)/transcation/page";
import { useTranscationObservable } from "./transcation.observable";
import { transcationApiClient } from "@/apiClient/transcationFunctionClient/transcationFunctionClient";
import { Subscription } from 'rxjs';

export enum InitalTranscationSubjectKey {

}

export enum TranscationLoaderType {
    POST_TRANSCATION_LOADER = 'postranscationLoader',
}

export interface TranscationtateLoaderProps {
    postranscationLoader: boolean;
}

export interface InitalTranscationubjectState {
    loader: TranscationtateLoaderProps;
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
        debugger;

        return transcationApiService
            .addDailyTranscation(collectionName, transactions)
            .subscribe({
                error(err: any) {
                    transcationObservable.setLoaderState(
                        false,
                        TranscationLoaderType.POST_TRANSCATION_LOADER
                    );
                    console.error('Error posting transactions:', err);
                    throw err;
                },
                next(value: any) {
                    transcationObservable.setLoaderState(
                        false,
                        TranscationLoaderType.POST_TRANSCATION_LOADER
                    );

                },
            });
    };

    // const postDailyTranscation = (transcation: any, collectionName: any): Subscription => {
    //     transcationObservable.setLoaderState(
    //         true,
    //         TranscationLoaderType.POST_TRANSCATION_LOADER
    //     );
    //     debugger
    //     return transcationApiService
    //         .addDailyTranscation(transcation, collectionName)
    //         .subscribe({
    //             error(err: any) {
    //                 transcationObservable.setLoaderState(
    //                     false,
    //                     TranscationLoaderType.POST_TRANSCATION_LOADER
    //                 );
    //                 debugger

    //                 throw err;
    //             },
    //             next(value: any) {
    //                 transcationObservable.setLoaderState(
    //                     false,
    //                     TranscationLoaderType.POST_TRANSCATION_LOADER
    //                 );
    //                 debugger

    //             },
    //         });
    // };

    return {
        getTranscationObjervable,
        postDailyTranscation,
    };
};
