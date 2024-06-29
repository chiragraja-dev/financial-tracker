// firebaseService.js
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, where, WhereFilterOp } from "firebase/firestore";
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { db } from '../../../config';


const collectionName = "items";

const addItem = (item: any, collectionName: string) => {
    return from(addDoc(collection(db, collectionName), item)).pipe(
        map((docRef) => ({ id: docRef.id, ...item })),
        catchError((error) => of({ error }))
    );
};

const getItems = (collectionName: string) => {
    return from(getDocs(collection(db, collectionName))).pipe(
        map((querySnapshot) => {
            const items: any[] = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            return items;
        }),
        catchError((error) => of({ error }))
    );
};

const getItemsOrderBy = (
    collectionName: string,
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
    whereField?: string,
    whereOperator?: WhereFilterOp,
    whereValue?: any
) => {
    const itemsCollection = collection(db, collectionName);
    let q = query(itemsCollection);

    if (whereField && whereOperator && whereValue !== undefined) {
        q = query(itemsCollection, where(whereField, whereOperator, whereValue));
    }

    if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection));
    }

    return from(getDocs(q)).pipe(
        map((querySnapshot) => {
            const items: any[] = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            return items;
        }),
        catchError((error) => {
            console.error('Error fetching documents:', error);
            return of({ error });
        })
    );
};

const updateItem = (id: string, updatedItem: any, collectionName: string) => {
    const docRef = doc(db, collectionName, id);
    return from(updateDoc(docRef, updatedItem)).pipe(
        map(() => ({ id, ...updatedItem })),
        catchError((error) => of({ error }))
    );
};

const deleteItem = (id: string, collectionName: string) => {
    const docRef = doc(db, collectionName, id);
    return from(deleteDoc(docRef)).pipe(
        map(() => ({ id })),
        catchError((error) => of({ error }))
    );
};

export default {
    addItem,
    getItems,
    updateItem,
    deleteItem,
    getItemsOrderBy
};
