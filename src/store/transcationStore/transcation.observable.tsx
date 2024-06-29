import { BehaviorSubject } from 'rxjs';
import {
    TranscationtateLoaderProps,
    TranscationLoaderType,
    InitalTranscationubjectState,
} from './transcation.repository';
import { boolean } from 'zod';

const initalTranscationubjectStateLoader: TranscationtateLoaderProps = {
    postranscationLoader: false,
    getTransactionLoader: false,
    getCategoryLoader: false
}

export const initialSubjectTranscationState: InitalTranscationubjectState = {
    loader: initalTranscationubjectStateLoader,
    postTranscation: undefined,
    getTransaction: undefined,
    getCategory: undefined,
    getTransactionById: undefined
}

const transcationSubject = new BehaviorSubject<InitalTranscationubjectState>(
    initialSubjectTranscationState
);

const setNextState = (payload: any) => {
    const state = transcationSubject.getValue();
    transcationSubject.next({ ...state, ...payload });
};

export const useTranscationObservable = () => {
    const setTranscationState = (value: any, globalStateKeyType: string) => {
        const previousState = transcationSubject.getValue();
        setNextState({ ...previousState, [globalStateKeyType]: value })
    }

    const getTranscationObjervables = () => {
        return transcationSubject;
    };

    const setLoaderState = (
        loader: boolean,
        loaderName: keyof transacationLoaderType
    ) => {
        const transcationStateLoader = {
            ...transcationSubject.getValue().loader,
        };
        transcationStateLoader[loaderName] = loader;
        setNextState({ loader: transcationStateLoader });
    };


    type transacationLoaderType = {
        postranscationLoader: boolean;
        getTransactionLoader: boolean;
        getCategoryLoader: boolean

    }

    return {
        setLoaderState,
        getTranscationObjervables,
        setTranscationState
    }
}




