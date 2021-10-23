import * as React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IngredientScreen } from './Screens/IngredientSreen';
import { RecipeScreen } from './Screens/RecipeScreen';

const Tab = createBottomTabNavigator();

function HomeScreenTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Ingredients" component={IngredientScreen} />
      <Tab.Screen name="Recipes" component={RecipeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <HomeScreenTabs />
    </NavigationContainer>
  );
}