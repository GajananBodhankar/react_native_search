import {
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {wrapperStyles} from '../styles/wrapperstyle';
import {useEffect, useReducer, useRef, useState} from 'react';
import {initialState, reducerFunction} from '../logic/Reducer';
import bussinessLogic from '../logic/mainClass';
import CustomtextInput from './CustomTextInput';
import FlatListRender from './FlatListRender';
import ItemSeparatorComponent from './ItemSeparator';
import {PredictableFlatList} from './PredictableFlatlist';
function Wrapper() {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const [predictData, setPredictData] = useState<any>([]);
  const [showPredict, setShowPredict] = useState(true);
  // const search = useRef(true);
  const flatListRef = useRef<FlatList>(null);
  // console.log(state);
  useEffect(() => {
    bussinessLogic.getdata(dispatch);
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
          renderItem={({item}) => <FlatListRender item={item} state={state} />}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
    </View>
  );
}

export default Wrapper;
