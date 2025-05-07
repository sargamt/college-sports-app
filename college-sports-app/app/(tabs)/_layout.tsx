import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
// import playbook from '../../assets/images/playbook.png';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerLeft: ()=> (
            <Image source={require('../../assets/images/playbook.png')}
            style={{ width: 60, height: 60, marginLeft: 20}}
            resizeMode='contain'/>
          ),
          tabBarLabel: 'Football',
          tabBarIcon: ({ color }) =>
            <FontAwesome6 name="football"
                          size={24}
                          color={color} />,
          tabBarStyle: {
            height: 50
            }
        }}
      />
      <Tabs.Screen
        name="basketball"
        options={{
          title: '',
          headerLeft: ()=> (
            <Image source={require('../../assets/images/playbook.png')}
            style={{ width: 60, height: 60, marginLeft: 20}}
            resizeMode='contain'/>
          ),
          tabBarLabel: 'Basketball',
          tabBarIcon: ({ color }) =>
            <FontAwesome6 name="basketball"
                          size={24}
                          color={color} />,
          tabBarStyle: {
            height: 50
            }
        }}
      />
      <Tabs.Screen
        name="baseball"
        options={{
          title: '',
          headerLeft: ()=> (
            <Image source={require('../../assets/images/playbook.png')}
            style={{ width: 60, height: 60, marginLeft: 20}}
            resizeMode='contain'/>
          ),
          tabBarLabel: 'Baseball',
          // color is blue if on that tab, grey otherwise
          tabBarIcon: ({ color }) =>
            <FontAwesome6 name="baseball"
                          size={24}
                          color={color}
                           />,
          tabBarStyle: {
            height: 50
          }
        }}
      />
    </Tabs>
  );
}
