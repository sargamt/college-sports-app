import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface TeamRanking {
  RANK: string;
  TEAM: string;
  "OVERALL RECORD": string;
  "PREVIOUS RANK": string;
}

export default function BaseballTab() {
  const [data, setData] = useState<TeamRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/baseball/data');
        const result = await response.json();
        setData(result.data || []);
        setLastUpdated(result.updated || '');
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

  return (
    <View style={styles.container}>
      <View style={styles.contentCard}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>NCAA Baseball Rankings</Text>
            <Text style={styles.subtitle}>D1Baseball.com Top 25</Text>
          </View>

          {/* Last Updated */}
          <View style={styles.selectedConferenceContainer}>
            <Text style={styles.selectedConference}>{lastUpdated}</Text>
          </View>

          {/* Rankings */}
          {data.map((team, index) => (
            <View key={index} style={styles.teamContainer}>
              <View style={styles.rankContainer}>
                <Text style={styles.rank}>{team.RANK}</Text>
                <Text style={styles.previousRank}>Previous: {team["PREVIOUS RANK"]}</Text>
              </View>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{team.TEAM}</Text>
                <Text style={styles.record}>{team["OVERALL RECORD"]}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
    backgroundColor: '#f0f8ff',
  },
  container: {
    flex: 1,
    backgroundColor: '#3667c2',
    padding: 10,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#3667c2',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  scrollContainer: {
    padding: 15,
  },
  titleContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginTop: 5,
  },
  selectedConferenceContainer: {
    backgroundColor: '#f0f8ff',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  selectedConference: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
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
    flexDirection: 'row',
  },
  rankContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    marginRight: 15,
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  previousRank: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
    textAlign: 'center',
    width: '100%',
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  record: {
    fontSize: 16,
    color: '#34495e',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
