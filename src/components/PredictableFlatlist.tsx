import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import ItemSeparatorComponent from './ItemSeparator';
import {wrapperStyles} from '../styles/wrapperstyle';
import businessLogic from '../logic/mainClass';
export function PredictableFlatList({
  predictData,
  state,
  dispatch,
  showPredict,
  setShowPredict,
}: any) {
  var content = <View></View>;
  if (state.searchText && predictData.length && showPredict) {
    content = (
      <View style={wrapperStyles.dropDown}>
        <FlatList
          ItemSeparatorComponent={ItemSeparatorComponent}
          data={predictData}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{padding: 10, backgroundColor: 'grey'}}
              onPress={() =>
                businessLogic.handleDropDown(
                  dispatch,
                  item,
                  state,
                  setShowPredict,
                )
              }>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
  return content;
}
