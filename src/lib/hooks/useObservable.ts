import { useLayoutEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

export function useObservable<TState>(stateSubject: BehaviorSubject<TState>) {
    const initialAppState = stateSubject.getValue()
    const [state, setState] = useState(initialAppState);

    useLayoutEffect(() => {
        const subscription = stateSubject.subscribe((currentState) => {
            setState(currentState);
        });
        return () => subscription.unsubscribe();
    }, [state, setState]);

    return state;
}
