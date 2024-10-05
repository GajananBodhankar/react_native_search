import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {wrapperStyles} from '../styles/wrapperstyle';
import {ReducerTypes} from '../Constants';
interface Icustom {
  state: {
    loading: boolean;
    searchText: string;
    data: Array<any>[];
  };
  dispatch(arg: any): void;
  setShowPredict(arg: any): void;
}

export default function CustomtextInput({
  state,
  dispatch,
  setShowPredict,
}: Icustom) {
  return (
    <View>
      <View style={wrapperStyles.inputContainer}>
        <TextInput
          onKeyPress={() => setShowPredict(true)}
          style={wrapperStyles.inputStyle}
          placeholder="Search goes here..."
          placeholderTextColor={'grey'}
          value={state?.searchText}
          onChangeText={e => {
            dispatch({type: ReducerTypes.changeText, payload: e});
          }}
        />
        {!state.searchText && (
          <Image
            source={require('../../assets/search.png')}
            style={wrapperStyles.searchIcon}
          />
        )}
        {state.loading && state.searchText && (
          <ActivityIndicator size={'small'} style={{flex: 1}} />
        )}
        {state.searchText && !state.loading && (
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => dispatch({type: ReducerTypes.cleartext})}>
            <Image
              source={require('../../assets/close.png')}
              style={{height: 20, width: 'auto', objectFit: 'contain'}}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
