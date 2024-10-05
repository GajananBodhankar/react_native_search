import { FlatList, SafeAreaView, View } from "react-native";
import { wrapperStyles } from "../styles/wrapperstyle";
import { useEffect, useReducer, useRef, useState } from "react";
import { initialState, reducerFunction } from "../logic/Reducer";
import bussinessLogic from "../logic/mainClass";
import CustomtextInput from "./CustomTextInput";
import FlatListRender from "./FlatListRender";
import ItemSeparatorComponent from "./ItemSeparator";
import { PredictableFlatList } from "./PredictableFlatlist";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Wrapper() {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const [predictData, setPredictData] = useState<any>([]);
  const [showPredict, setShowPredict] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  useEffect(() => {
    bussinessLogic.getdata(dispatch);
    // AsyncStorage.getAllKeys().then((e) => console.log(e));
    // AsyncStorage.clear().then(e=>console.log("first"))
  }, []);
  useEffect(() => {
    var timer: any;
    async function callFilterData() {
      timer = await bussinessLogic.filterData(state, setPredictData, dispatch);
    }
    callFilterData();
    return () => {
      clearTimeout(timer);
    };
  }, [state.searchText]);
  return (
    <View style={wrapperStyles.mainContainer}>
      <SafeAreaView />
      <CustomtextInput
        state={state}
        dispatch={dispatch}
        setShowPredict={setShowPredict}
      />
      <View style={wrapperStyles.flatListWrapper}>
        <PredictableFlatList
          state={state}
          dispatch={dispatch}
          predictData={predictData}
          showPredict={showPredict}
          setShowPredict={setShowPredict}
        />
        <FlatList
          ref={flatListRef}
          data={state.data}
          renderItem={({ item }) => (
            <FlatListRender
              item={item}
              state={state}
              showPredict={showPredict}
              predictData={predictData}
            />
          )}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
    </View>
  );
}

export default Wrapper;
