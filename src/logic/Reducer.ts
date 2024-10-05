import { ReducerTypes } from "../Constants"

const initialState = {
    loading: false,
    searchText: "",
    data: []
}

function reducerFunction(state: any, action: { type: any, payload?: any }) {
    switch (action.type) {
        case ReducerTypes.loading: {
            return { ...state, loading: true }
        }
        case ReducerTypes.notLoading: {
            return { ...state, loading: false }
        }
        case ReducerTypes.changeText: {
            return { ...state, searchText: action.payload }
        }
        case ReducerTypes.cleartext: {
            return { ...state, searchText: "", loading: false }
        }
        case ReducerTypes.data: {
            return { ...state, data: action.payload }
        }
    }
}

interface Idata{
    disp():void
}

export { initialState, reducerFunction }