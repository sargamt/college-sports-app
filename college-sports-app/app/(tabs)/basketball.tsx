import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface TeamStanding {
  School: string;
  "Conference W": string;
  "Conference L": string;
  "Conference PCT": string;
  "Overall W": string;
  "Overall L": string;
  "Overall PCT": string;
  "Overall STREAK": string;
}

interface ConferenceData {
  conference: string;
  standings: TeamStanding[];
}

export default function BasketballTab() {
  const [data, setData] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConference, setSelectedConference] = useState('all-conf');

  const conferences = [
    'all-conf',
    'america-east',
    'the-American',
    'atlantic-10',
    'acc',
    'asun',
    'big-12',
    'big-east',
    'big-sky',
    'big-south',
    'big-ten',
    'big-west',
    'caa',
    'cusa',
    'horizon',
    'maac',
    'mac',
    'meac',
    'mvc',
    'mountain-west',
    'nec',
    'ovc',
    'patriot',
    'sec',
    'socon',
    'southland',
    'swac',
    'sun-belt',
    'ivy-league',
    'summit-league',
    'wcc',
    'wac'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/basketball/data?conference=${selectedConference}`);
        const result = await response.json();
        setData(result.data[0]?.standings || []);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedConference]);

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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{selectedConference.toUpperCase()} Conference Standings</Text>
      </View>

      {/* Conference dropdown */}
      <Picker
        selectedValue={selectedConference}
        onValueChange={(itemValue) => setSelectedConference(itemValue)}
        style={styles.picker}
      >
        {conferences.map((conf) => (
          <Picker.Item key={conf} label={conf.toUpperCase()} value={conf} />
        ))}
      </Picker>

      {/* Render standings */}
      {data.map((team, index) => (
        <View key={index} style={styles.teamContainer}>
          <Text style={styles.teamName}>{team.School}</Text>
          <Text>Conference Wins: {team["Conference W"]}</Text>
          <Text>Conference Losses: {team["Conference L"]}</Text>
          <Text>Conference PCT: {team["Conference PCT"]}</Text>
          <Text>Overall Wins: {team["Overall W"]}</Text>
          <Text>Overall Losses: {team["Overall L"]}</Text>
          <Text>Overall PCT: {team["Overall PCT"]}</Text>
          <Text>Streak: {team["Overall STREAK"]}</Text>
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
