import { Text, View } from "react-native";
import { wrapperStyles } from "../styles/wrapperstyle";
import React, { useEffect, useState } from "react";

export default React.memo(function HighLighter({
  item,
  text,
  showPredict,
  predictData,
  state,
}: any) {
  var content: any;
  const [load, setLoad] = useState(false);
  useEffect(() => {
    var x: any;
    setLoad(true);
    if (!predictData.length) {
      x = setTimeout(() => setLoad(false), 1000);
    } else {
      setLoad(false);
    }
    return () => {
      clearTimeout(x);
    };
  }, [state.searchText]);
  if (showPredict == true && predictData.length > 0) {
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

  return (
    <>
      {load ? (
        <Text style={wrapperStyles.titleStyle}>{item.title}</Text>
      ) : (
        content
      )}
    </>
  );
});
