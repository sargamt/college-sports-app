import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Team = {
  School: string;
  Rank: number;
  Wins: number;
  Losses: number;
  WinPercentage: number;
};

export default function BaseballTab() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // shows all schools by default
  const [selectedSchool, setSelectedSchool] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/baseball/data'); // Replace with your machine's IP address
        const result = await response.json();
        setData(result.data); // Access standings array
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  // list of all schools for dropdown
  const schoolOptions = ['All', ...new Set(data.map(team => team.School))];

  // filter data based on selected school
  const filteredData = selectedSchool === 'All' 
    ? data 
    : data.filter(team => team.School === selectedSchool);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>NCAA Baseball Rankings</Text>
      </View>

      {/* dropdown */}
      <Picker
        selectedValue={selectedSchool}
        onValueChange={(itemValue) => setSelectedSchool(itemValue)}
        style={styles.picker}
      >
        {schoolOptions.map((school, index) => (
          <Picker.Item key={index} label={school} value={school} />
        ))}
      </Picker>

      {/* Render standings */}
      {filteredData.map((team, index) => (
        <View key={index} style={styles.teamContainer}>
          <Text style={styles.teamName}>{team.School}</Text>
          <Text>RPI Rank: {team.Rank}</Text>
          <Text>Wins: {team.Wins}</Text>
          <Text>Losses: {team.Losses}</Text>
          <Text>Win Percentage: {team.WinPercentage}</Text>
        </View>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
    backgroundColor: '#f0f8ff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
  },
  teamContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
