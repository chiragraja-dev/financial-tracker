import Axios from '../../lib/constants/axios';
import { from, Observable, forkJoin } from 'rxjs';


export const transcationApiClient = () => {

    const addDailyTranscation = (collectionName: string, items: any[]): Observable<any[]> => {
        const requests = items.map((item: any) => {
            return from(Axios.addItem(item, collectionName));
        });
        return forkJoin(requests);
    };

    return {
        addDailyTranscation,
    };


    return {
        addDailyTranscation,
    };
}

