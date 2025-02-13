import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Football',
          tabBarIcon: ({ color }) => <FontAwesome6 name="football" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="basketball"
        options={{
          title: 'Basketball',
          tabBarIcon: ({ color }) => <FontAwesome6 name="basketball" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="baseball"
        options={{
          title: 'Baseball',
          tabBarIcon: ({ color }) => <FontAwesome6 name="baseball" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
