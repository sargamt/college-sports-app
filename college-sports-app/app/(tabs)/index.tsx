import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useFonts } from 'expo-font';
import { ImageBackground } from 'react-native';

interface TeamStanding {
  School: string;
  "Conference W": string;
  "Conference L": string;
  "Conference PCT"?: string;
  "Overall W": string;
  "Overall L": string;
  "Overall PCT"?: string;
  "Overall STREAK": string;
  "Overall PF": string;
  "Overall PA": string;
  "Overall HOME": string;
  "Overall AWAY": string;
}

type SortField = keyof TeamStanding;
type SortOrder = 'asc' | 'desc';

export default function FootballTab() {
  const [data, setData] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConference, setSelectedConference] = useState('all-conf');
  const [sortField, setSortField] = useState<SortField>('Conference W');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [fontsLoaded] = useFonts({
    'jersey': require('../../assets/fonts/jersey-m54.ttf')
  })

  const conferences = [
    'all-conf',
    'the-american',
    'acc',
    'big-12',
    'big-ten',
    'cusa',
    'fbs-independent',
    'mac',
    'mountain-west',
    'pac-12',
    'sec',
    'sun-belt'
  ];

  const conferenceNames: { [key: string]: string } = {
    'all-conf': 'All Conferences',
    'the-american': 'American Athletic Conference',
    'acc': 'Atlantic Coast Conference',
    'big-12': 'Big 12 Conference',
    'big-ten': 'Big Ten Conference',
    'cusa': 'Conference USA',
    'fbs-independent': 'FBS Independent',
    'mac': 'Mid-American Conference',
    'mountain-west': 'Mountain West Conference',
    'pac-12': 'PAC-12 Conference',
    'sec': 'Southeastern Conference',
    'sun-belt': 'Sun Belt Conference'
  };

  const sortFields: { label: string; value: SortField }[] = [
    { label: 'School Name', value: 'School' },
    { label: 'Conference Wins', value: 'Conference W' },
    { label: 'Conference Losses', value: 'Conference L' },
    { label: 'Conference Win %', value: 'Conference PCT' },
    { label: 'Overall Wins', value: 'Overall W' },
    { label: 'Overall Losses', value: 'Overall L' },
    { label: 'Overall Win %', value: 'Overall PCT' },
    { label: 'Points For', value: 'PF' },
    { label: 'Points Against', value: 'PA' },
    { label: 'Home Record', value: 'HOME' },
    { label: 'Away Record', value: 'AWAY' },
    { label: 'Current Streak', value: 'Overall STREAK' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/football/data?conference=${selectedConference}`);
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

  const sortData = (data: TeamStanding[]) => {
    return [...data].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      // Handle numeric values
      if (sortField !== 'School' && sortField !== 'Overall STREAK') {
        aValue = parseFloat(aValue as string);
        bValue = parseFloat(bValue as string);
      }

      // Handle streak values (e.g., "Won 5", "Lost 2")
      if (sortField === 'Overall STREAK') {
        const aNum = parseInt((aValue as string).split(' ')[1]) || 0;
        const bNum = parseInt((bValue as string).split(' ')[1]) || 0;
        const aIsWinning = (aValue as string).startsWith('Won');
        const bIsWinning = (bValue as string).startsWith('Won');
        
        if (aIsWinning !== bIsWinning) {
          return sortOrder === 'asc' 
            ? (aIsWinning ? 1 : -1)
            : (aIsWinning ? -1 : 1);
        }
        return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
      }

      // Handle numeric comparisons
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle string comparisons
      return sortOrder === 'asc' 
        ? (aValue as string).localeCompare(bValue as string)
        : (bValue as string).localeCompare(aValue as string);
    });
  };

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

  const sortedData = sortData(data);

  return (
      <ImageBackground
        source={require('../../assets/images/football.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover">
      {/* <View style={styles.contentCard}> */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Title */}
          <View style={styles.titleContainer}>
            {/* <Text style={styles.title}>NCAA Football Standings</Text> */}
            <Text style={{ fontFamily: 'jersey', fontSize: 60, color: 'white'}}>
              NCAA Football Standings
              </Text>
          </View>


          {/* Conference Selector */}
          <View style={styles.selectorSection}>
            <Text style={styles.selectorTitle}>Select Conference</Text>
            <Picker
              selectedValue={selectedConference}
              onValueChange={(itemValue) => setSelectedConference(itemValue)}
              style={styles.picker}
            >
              {conferences.map((conf) => (
                <Picker.Item key={conf} label={conferenceNames[conf]} value={conf} />
              ))}
            </Picker>
          </View>

          {/* Sort Controls */}
          <View style={styles.sortSection}>
            <Text style={styles.selectorTitle}>Sort By</Text>
            <View style={styles.sortControls}>
              <Picker
                selectedValue={sortField}
                onValueChange={(itemValue) => setSortField(itemValue as SortField)}
                style={[styles.picker, styles.sortPicker]}
              >
                {sortFields.map((field) => (
                  <Picker.Item key={field.value} label={field.label} value={field.value} />
                ))}
              </Picker>
              <Picker
                selectedValue={sortOrder}
                onValueChange={(itemValue) => setSortOrder(itemValue as SortOrder)}
                style={[styles.picker, styles.orderPicker]}
              >
                <Picker.Item label="High to Low" value="desc" />
                <Picker.Item label="Low to High" value="asc" />
              </Picker>
            </View>
          </View>

          {/* Conference Display */}
          <View style={styles.selectedConferenceContainer}>
            <Text style={styles.selectedConference}>
              {conferenceNames[selectedConference]}
            </Text>
          </View>

          {/* Render standings */}
          {sortedData.map((team, index) => (
            <View key={index} style={styles.teamContainer}>
              <Text style={styles.teamName}>{team.School}</Text>
              <Text>Conference Record: {team["Conference W"]}-{team["Conference L"]}</Text>
              <Text>Overall Record: {team["Overall W"]}-{team["Overall L"]}</Text>
              <Text>Points For: {team["Overall PF"] || "N/A"}</Text>
              <Text>Points Against: {team["Overall PA"] || "N/A"}</Text>
              <Text>Home Record: {team["Overall HOME"] || "N/A"}</Text>
              <Text>Away Record: {team["Overall AWAY"] || "N/A"}</Text>
              <Text>Streak: {team["Overall STREAK"] || "N/A"}</Text>
            </View>
          ))}
        {/* </ScrollView> */}
      {/* </View> */}
      </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02030c',
    padding: 10,
  },
  // contentCard: {
  //   flex: 1,
  //   backgroundImage: 'linear-gradient(to bottom, #005f9c, #ffffff)',
  //   borderRadius: 12,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 4,
  //   elevation: 3,
  //   overflow: 'hidden',
  // },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  scrollContainer: {
    padding: 15,
  },
  titleContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  selectorSection: {
    paddingVertical: 5,
    marginBottom: 10,
  },
  sortSection: {
    paddingVertical: 5,
    marginBottom: 10,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#ffffff',
  },
  sortControls: {
    flexDirection: 'row',
    gap: 10,
  },
  picker: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 5,
  },
  sortPicker: {
    flex: 2,
    paddingVertical: 5,
  },
  orderPicker: {
    flex: 1,
    paddingVertical: 5,
  },
  selectedConferenceContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  selectedConference: {
    fontSize: 30,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  teamContainer: {
    backgroundColor: '#ffffff',
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
    color: '#2c3e50',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
