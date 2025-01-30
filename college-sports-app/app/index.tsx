import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Tab 1 (Baseball) */}
      <View
        style={{
          width: 200,
          height: 100,
          backgroundColor: "#191970", // Blue box
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10, // Rounded corners
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.2,
          elevation: 5, // Android shadow effect
        }}
      >
        {/* Text inside the box */}
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Hello, Expo!
        </Text>
      </View>
    </View>
  );
}
  // <Text>Edit app/index.tsx to edit this screen.</Text>
   // </View>
  //);
//}
