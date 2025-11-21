import { useContext, useEffect, useReducer, useRef } from "react";
import Context from "./Context";

function useSafeContext() {
    const store = useContext(Context);
    if (!store) {
        throw new Error(
            "Could not find react-redux context value; please ensure the component is wrapped in a "
        );
    }
    return store;
}

export function useStore() {
    return useSafeContext();
}

export function useDispatch() {
    const store = useSafeContext();
    return store.dispatch;
}

export function useSelector(selector) {
    const store = useSafeContext();
    const latestSelected = useRef(selector(store.getState())); // ✅ khởi tạo ngay
    const latestState = useRef(store.getState());

    const [, forceRender] = useReducer((c) => c + 1, 0);

    const checkForUpdates = () => {
        const currentState = store.getState();
        const selected = selector(currentState);

        if (
            latestState.current === currentState &&
            latestSelected.current !== selected &&
            typeof selected === "object"
        ) {
            console.warn(
                "Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders."
            );
        }

        if (selected !== latestSelected.current) {
            latestSelected.current = selected;
            latestState.current = currentState;
            forceRender();
        }
    };

    useEffect(() => {
        const unsubscribe = store.subscribe(checkForUpdates);
        checkForUpdates();
        return unsubscribe;
    }, [store]);

    return latestSelected.current;
}
