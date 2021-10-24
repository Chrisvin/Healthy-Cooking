import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IngredientScreen } from './Screens/IngredientSreen';
import { RecipeScreen } from './Screens/RecipeScreen';
import RecipeDetailsScreen from './Screens/RecipeDetailsScreen';
import IngredientDetailsScreen from './Screens/IngredientDetailsScreen';
import UserPreferencesScreen from './Screens/UserPreferencesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreenTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Recipes" component={RecipeScreen} />
      <Tab.Screen name="Ingredients" component={IngredientScreen} />
      <Tab.Screen name="Settings" component={UserPreferencesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreenTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="IngredientDetailsScreen" component={IngredientDetailsScreen} />
        <Stack.Screen name="RecipeDetailsScreen" component={RecipeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}