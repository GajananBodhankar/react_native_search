import {Text, View} from 'react-native';
import {wrapperStyles} from '../styles/wrapperstyle';
import {useEffect, useState} from 'react';
import HighLighter from './HighLighter';
import businessLogic from '../logic/mainClass';
interface Iflat {
  item: {
    title: string;
    id: number;
    completed: boolean;
  };
  state: any;
}

export default function FlatListRender({item, state}: Iflat) {
  const [text, setText] = useState({left: '', match: '', right: ''});
  useEffect(() => {
    businessLogic.handleSearchText(state, item, setText);
  }, [state.searchText]);
  return (
    <View style={wrapperStyles.flatListMainview}>
      <View>
        <Text style={wrapperStyles.id}>{item.id}</Text>
      </View>
      <View style={{flex: 1}}>
        <HighLighter item={item} text={text} />
        <Text style={wrapperStyles.status}>
          Status - {item.completed ? 'completed' : 'Pending'}
        </Text>
      </View>
    </View>
  );
}
