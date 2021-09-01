import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Playlist from './Components/Playlist';
import Album from './Components/Album';
import Start from './Components/Start';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Home" component={Start} options={{headerShown: false}}/>
                
                <Stack.Screen name="Playlist" component={Playlist} options={{headerShown: false}}/>
                <Stack.Screen name="Album" component={Album} options={{headerShown: false}}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}