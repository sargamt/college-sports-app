import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default function App() {
    const [activeTab, setActiveTab] = useState('sport');

    const handleTabClick = (tab: 'sport') => {
        setActiveTab(tab); 
    }
    return (
        <View style = {{ padding: 20, backgroundColor: '#f04343'}}>
            <Text style = {{fontSize: 20, color: activeTab == 'sport' ? 'blue': 'black'}}>
                Sport
            </Text>

            <View style={{ marginTop: 20 }}>
        {activeTab === 'sport' && <Text>Sport Content</Text>}
      </View>


        </View>
       /* <div className = "app">
            <div className = "tabs">
                <button 
                className = {`tab ${activeTab === 'sport'? 'active': ''}`}
                onClick={() => handleTabClick('sport')}
                >
                    Sport
                </button>
            </div>

        </div> */
    );
}
