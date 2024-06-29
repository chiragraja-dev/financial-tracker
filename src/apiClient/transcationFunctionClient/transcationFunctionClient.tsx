import Axios from '../../lib/constants/axios';
import { from, Observable, forkJoin, firstValueFrom } from 'rxjs';


export const transcationApiClient = () => {

    const addDailyTranscation = (collectionName: string, items: any[]): Observable<any[]> => {
        const requests = items.map((item: any) => {
            return from(Axios.addItem(item, collectionName));
        });
        return forkJoin(requests);
    };

    // yourWhereField', ' == ', 'yourWhereValue'
    const getTransaction = async (collectionName: string, value?: string | Date): Promise<Observable<any>> => {
        try {
            const items = await Axios.getItemsOrderBy(collectionName, 'date', 'desc', 'date', '==', value);
            debugger
            return items
        } catch (error: any) {
            return error
        }
    };

    const getTransactionById = async (collectionName: string, value?: string | Date): Promise<Observable<any>> => {
        try {
            const items = await Axios.getItemsOrderBy(collectionName, 'date', 'desc', 'date', '==', value);
            debugger
            return items
        } catch (error: any) {
            return error
        }
    };

    const getAllCategory = async (collectionName: string): Promise<Observable<any>> => {
        try {
            const items = await Axios.getItems(collectionName);
            debugger
            return items
        } catch (error: any) {
            return error
        }
    };


    return {
        addDailyTranscation,
        getTransaction,
        getAllCategory,
        getTransactionById
    };



}

