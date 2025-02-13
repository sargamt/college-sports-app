import { ScrollView, View, Text, StyleSheet } from 'react-native';

/**
 * BasketballTab Component:
 * This component displays a scrollable view containing a static box at the top,
 * followed by 20 randomly generated boxes.
 */
export default function BasketballTab() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      
      {/* Static Box */}
      <View style={styles.staticContainer}>
        <View style={styles.staticBox}>
          <Text style={styles.boxText}>Example Box</Text>
        </View>
      </View>
      
      {/* Randomly generated boxes */}
      {[...Array(20).keys()].map((i) => (
        <View key={i} style={styles.box}>
          <Text style={styles.boxText}>Basketball Box {i + 1}</Text>
        </View>
      ))}
      
    </ScrollView>
  );
}

/**
 * Styles for the BasketballTab Component
 */
const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
  staticContainer: {
    marginBottom: 20, // Add some space between the static box and the rest
  },
  staticBox: {
    height: 100,
    backgroundColor: '#add8e6', // Light blue for the static box
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  box: {
    height: 100,
    backgroundColor: '#ffcccb',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  boxText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});