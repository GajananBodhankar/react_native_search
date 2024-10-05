import { Alert, Text, View } from "react-native";
import { wrapperStyles } from "../styles/wrapperstyle";
import React from "react";

export default React.memo(function HighLighter({
  item,
  text,
  showPredict,
  predictData,
  state,
}: any) {
  var content: any;
  // Alert.alert(
  //   JSON.stringify(`${showPredict},${predictData.length},${state.loading}`)
  // );
  if ((showPredict == true && predictData.length > 0) || state.loading) {
    content = <Text style={wrapperStyles.titleStyle}>{item.title}</Text>;
  } else if (
    (text.left || text.match || text.right) &&
    item.title.toLowerCase().indexOf(text.match.toLowerCase()) >= 0
  ) {
    content = (
      <View style={{ flexDirection: "row" }}>
        <Text style={wrapperStyles.titleStyle}>
          {text.left}
          <Text style={{ color: "red" }}>{text.match}</Text>
          {text.right}
        </Text>
      </View>
    );
  } else {
    content = <Text style={wrapperStyles.titleStyle}>{item.title}</Text>;
  }

  return content;
});
