import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, ListRenderItem} from 'react-native';

  const data = [
    {id : '1', name: 'Item 1'},
    {id: '2', name: 'Item 2'}
  ]


type Item = {
  id: string,
  name: string,
}

const renderItem = ({ item }: {item: Item}) => {
  return(
    <View>
    <Text style={styles.Name}>{item.name}</Text>
  </View>
  )
}

export default function Tab() {
  return (
    <SafeAreaView style={styles.container}>
      {/*<View style={styles.header}>
      <Text style ={styles.headerTitle}>Current news</Text>
      </View>
      <Text>Tab [Settings]</Text>*/}

      <ActivityIndicator size = "large" color = "000"/>
      <FlatList
          data = {data}
          keyExtractor={(item) => item.id}
          renderItem= { renderItem }
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  header: {
    padding: 50,
    alignItems: 'center',
  },
  headerTitle: {
    color: "#000000",
    fontSize: 30, 
    fontWeight: 'bold',
  },
  Name: {
    backgroundColor: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff', // Dark blue color
    marginBottom: 4,
    borderRadius: 20,
    padding: 40,
  },
});

