import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import CustomDrawer from '../components/CustomDrawer';
 import StackNavigation from './StackNavigation';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{headerShown: false, swipeEdgeWidth: 0}}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="StackNavigation" component={StackNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
