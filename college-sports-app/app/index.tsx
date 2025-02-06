import { Text, View } from "react-native";
import Tab from './Tab'; 

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Changing index</Text>

      <Tab/>
    </View>

  );
}
