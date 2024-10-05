import {Text, View} from 'react-native';
import {wrapperStyles} from '../styles/wrapperstyle';

export default function HighLighter({item, text}: any) {
  var content: any;
  if (text.left || text.match || text.right) {
    content = (
      <View style={{flexDirection: 'row'}}>
        <Text style={wrapperStyles.titleStyle} >
          {text.left}
          <Text style={{color: 'red'}}>{text.match}</Text>
          {text.right}
        </Text>
      </View>
    );
  } else {
    content = <Text style={wrapperStyles.titleStyle}>{item.title}</Text>;
  }

  return content;
}
