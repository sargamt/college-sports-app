import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, ListRenderItem} from 'react-native';

const data = [
  {id : '1', name: 'Item 1'},
  {id: '2', name: 'Item 2'},
  {id: '3', name: 'Item 3'},
  {id: '4', name: 'Item 4'}
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

      <ActivityIndicator size = "large" color = "00008B"/>
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
  Name: {
    backgroundColor: '#00008B',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff', 
    padding: 40,
    marginBottom: 50,
    marginHorizontal: 8,
    borderColor: '#1E88E5',
    borderRadius: 70,
    height: 200
    
  },
});

