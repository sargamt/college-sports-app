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

type SortField = keyof TeamStanding;
type SortOrder = 'asc' | 'desc';
type Gender = 'men' | 'women';

export default function BasketballTab() {
  const [data, setData] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConference, setSelectedConference] = useState('all-conf');
  const [selectedGender, setSelectedGender] = useState<Gender>('men');
  const [sortField, setSortField] = useState<SortField>('Conference W');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

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

  const conferenceNames: { [key: string]: string } = {
    'all-conf': 'All Conferences',
    'america-east': 'America East Conference',
    'the-American': 'American Athletic Conference',
    'atlantic-10': 'Atlantic 10 Conference',
    'acc': 'Atlantic Coast Conference',
    'asun': 'Atlantic Sun Conference',
    'big-12': 'Big 12 Conference',
    'big-east': 'Big East Conference',
    'big-sky': 'Big Sky Conference',
    'big-south': 'Big South Conference',
    'big-ten': 'Big Ten Conference',
    'big-west': 'Big West Conference',
    'caa': 'Coastal Athletic Association',
    'cusa': 'Conference USA',
    'horizon': 'Horizon League',
    'maac': 'Metro Atlantic Athletic Conference',
    'mac': 'Mid-American Conference',
    'meac': 'Mid-Eastern Athletic Conference',
    'mvc': 'Missouri Valley Conference',
    'mountain-west': 'Mountain West Conference',
    'nec': 'Northeast Conference',
    'ovc': 'Ohio Valley Conference',
    'patriot': 'Patriot League',
    'sec': 'Southeastern Conference',
    'socon': 'Southern Conference',
    'southland': 'Southland Conference',
    'swac': 'Southwestern Athletic Conference',
    'sun-belt': 'Sun Belt Conference',
    'ivy-league': 'The Ivy League',
    'summit-league': 'The Summit League',
    'wcc': 'West Coast Conference',
    'wac': 'Western Athletic Conference'
  };

  const sortFields: { label: string; value: SortField }[] = [
    { label: 'School Name', value: 'School' },
    { label: 'Conference Wins', value: 'Conference W' },
    { label: 'Conference Losses', value: 'Conference L' },
    { label: 'Conference Win %', value: 'Conference PCT' },
    { label: 'Overall Wins', value: 'Overall W' },
    { label: 'Overall Losses', value: 'Overall L' },
    { label: 'Overall Win %', value: 'Overall PCT' },
    { label: 'Current Streak', value: 'Overall STREAK' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/basketball/data?conference=${selectedConference}&gender=${selectedGender}`);
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
  }, [selectedConference, selectedGender]);

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
    <View style={styles.container}>
      <View style={styles.contentCard}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>NCAA Basketball Standings</Text>
          </View>

          {/* Conference Display */}
          <View style={styles.selectedConferenceContainer}>
            <Text style={styles.selectedConference}>
              {conferenceNames[selectedConference]}: {selectedGender === 'men' ? "Men's" : "Women's"} Basketball
            </Text>
          </View>

          {/* Gender Selector */}
          <View style={styles.selectorSection}>
            <Text style={styles.selectorTitle}>Men's or Women's</Text>
            <Picker
              selectedValue={selectedGender}
              onValueChange={(itemValue) => setSelectedGender(itemValue as Gender)}
              style={styles.picker}
            >
              <Picker.Item label="Men's Basketball" value="men" />
              <Picker.Item label="Women's Basketball" value="women" />
            </Picker>
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

          {/* Render standings */}
          {sortedData.map((team, index) => (
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 10,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  selectorSection: {
    marginBottom: 20,
  },
  sortSection: {
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#2c3e50',
  },
  sortControls: {
    flexDirection: 'row',
    gap: 10,
  },
  picker: {
    height: 50,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  sortPicker: {
    flex: 2,
  },
  orderPicker: {
    flex: 1,
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
