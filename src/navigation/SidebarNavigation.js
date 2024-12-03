import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../const/color'
import HomeScreen from '../ui/Home/HomeScreen'

const Drawer = createDrawerNavigator();

const SidebarNavigation = () => {
  return (
    <Drawer.Navigator
   
    screenOptions={({ route }) => ({
     drawerIcon: ({ focused, color, size }) => {
       let iconName;
       if (route.name === "HomeScreen") {
         iconName = "home";
       } else if (route.name === "ListTabScreen") {
         iconName = "person";
       } else if (route.name === "AddTabScreen") {
         iconName = "person";
       }

       return <Icon name={iconName} size={size} color={color} />;
     },
     tabBarActiveTintColor: 'blue',
     tabBarInactiveTintColor: 'gray',
   })}>
     <Drawer.Screen name="Home Screen" component={HomeScreen} />
     <Drawer.Screen name="ListTabScreen" component={HomeScreen} />
     <Drawer.Screen name="AddTabScreen" component={HomeScreen} />
   </Drawer.Navigator>

  )
}

export default SidebarNavigation