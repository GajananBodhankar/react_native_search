import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINT, ReducerTypes } from "../Constants";

class BussinessLogic {
    constructor() { }
    async apiCall() {
        try {
            let result = await fetch(API_ENDPOINT);
            let data = await result.json();
            return data
        } catch (error) {
            console.log(error)
        }
    }
    async getdata(dispatch: (arg0: { type: string; payload: any; }) => void) {
        dispatch({
            type: ReducerTypes.data,
            payload: await this.apiCall(),
        });
    }
    async filterData(state: any, setPredictData: any, dispatch: any,) {
        var timer: any;
        let search = true;
        dispatch({ type: ReducerTypes.loading });

        if (state.searchText) {
            let e = await AsyncStorage.getAllKeys();
            if (e.length) {
                setPredictData(
                    e.filter(i => {
                        if (i.length >= state.searchText.length) {
                            if (
                                i.toLowerCase().includes(state.searchText.toLowerCase()) ||
                                i.toLowerCase().startsWith(state.searchText.toLowerCase())
                            ) {
                                search = false;
                                return i;
                            }
                        }
                    }),
                );
            } else {
                search = true;
            }
            dispatch({ type: ReducerTypes.notLoading });
            if (search) {
                dispatch({ type: ReducerTypes.loading });
                timer = setTimeout(() => {
                    //api call
                    let result = state.data.filter(
                        (i: { title: string }) =>
                            i.title.startsWith(state.searchText.toLowerCase()) ||
                            i.title.includes(state.searchText.toLowerCase()),
                    );
                    if (result.length) {
                        AsyncStorage.setItem(state.searchText, '1');
                    }
                    dispatch({
                        type: ReducerTypes.data,
                        payload: result,
                    });
                    dispatch({ type: ReducerTypes.notLoading });
                }, 1000);
            }
            dispatch({ type: ReducerTypes.notLoading });

        } else {
            this.getdata(dispatch);
        }
        return timer
    }
    handleDropDown(dispatch: (arg0: { type: string; payload: any; }) => void, item: string, state: { data: any[]; }, setShowPredict: (arg0: boolean) => void) {
        dispatch({ type: ReducerTypes.changeText, payload: item });
        dispatch({
            type: ReducerTypes.data,
            payload: state.data.filter(
                (i: { title: string }) =>
                    i.title.startsWith(item.toLowerCase()) ||
                    i.title.includes(item.toLowerCase()),
            ),
        });
        setShowPredict(false);
    }
    handleSearchText(state: any, item: any, setText: any) {
        if (state.searchText) {
            setText((prev: any) => ({
                ...prev,
                left: item.title.slice(
                    0,
                    item.title.toLowerCase().indexOf(state.searchText.toLowerCase()),
                ),
                match: state.searchText,
                right: item.title.slice(
                    item.title.toLowerCase().indexOf(state.searchText.toLowerCase()) +
                    state.searchText.length,
                ),
            }));
        } else {
            setText({ left: '', match: '', right: '' });
        }
    }
}

export default new BussinessLogic();