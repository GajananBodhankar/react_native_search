import { Text, View } from "react-native";
import { wrapperStyles } from "../styles/wrapperstyle";
import { useEffect, useState } from "react";
import HighLighter from "./HighLighter";
import businessLogic from "../logic/mainClass";
import React from "react";
interface Iflat {
  item: {
    title: string;
    id: number;
    completed: boolean;
  };
  state: any;
  showPredict: boolean;
  predictData: any;
}

export default React.memo(function FlatListRender({
  item,
  state,
  showPredict,
  predictData,
}: Iflat) {
  const [text, setText] = useState({ left: "", match: "", right: "" });
  useEffect(() => {
    businessLogic.handleSearchText(state, item, setText);
    // console.log(predictData.length, showPredict, state.loading);
  }, [state.searchText]);
  return (
    <View style={wrapperStyles.flatListMainview}>
      <View>
        <Text style={wrapperStyles.id}>{item.id}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <HighLighter
          item={item}
          text={text}
          showPredict={showPredict}
          predictData={predictData}
          state={state}
        />
        <Text style={wrapperStyles.status}>
          Status - {item.completed ? "completed" : "Pending"}
        </Text>
      </View>
    </View>
  );
});
