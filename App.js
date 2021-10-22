import * as React from 'react';
import  { useState } from 'react';
import { Text, StyleSheet, FlatList, View, Image, Dimensions } from 'react-native';
import { Card, SearchBar } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IngredientFlatList from "./IngredientFlatList";

const windowWidth = Dimensions.get('window').width;

function IngredientScreen() {
  const [searchTextHook, setSearchText] = useState("");

  const updateSearch = (searchText) => {
    setSearchText(searchText);
    // console.log("Search Text = ", searchTextHook);
  };  

  return (
      <View style={{flex:1}}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={searchTextHook}/>
        <FlatList
          data={[
            {name: 'Lorem', img_url: 'https://picsum.photos/200/200', description: 'Fusce eget mi eget nibh posuere lacinia sit amet sit amet metus. Vestibulum lacinia varius turpis, in gravida diam rhoncus id. Ut.'},
            {name: 'Ipsum', img_url: 'https://picsum.photos/201/201', description: 'Quisque dictum in ligula in lacinia. Donec bibendum varius quam, eu malesuada eros ultricies sed. Morbi ac velit ultrices, finibus quam eu.'},
            {name: 'Lorem', img_url: 'https://picsum.photos/202/200', description: 'Fusce eget mi eget nibh posuere lacinia sit amet sit amet metus. Vestibulum lacinia varius turpis, in gravida diam rhoncus id. Ut.'},
            {name: 'Ipsum', img_url: 'https://picsum.photos/202/201', description: 'Quisque dictum in ligula in lacinia. Donec bibendum varius quam, eu malesuada eros ultricies sed. Morbi ac velit ultrices, finibus quam eu.'},
            {name: 'Lorem', img_url: 'https://picsum.photos/203/200', description: 'Fusce eget mi eget nibh posuere lacinia sit amet sit amet metus. Vestibulum lacinia varius turpis, in gravida diam rhoncus id. Ut.'},
            {name: 'Ipsum', img_url: 'https://picsum.photos/203/201', description: 'Quisque dictum in ligula in lacinia. Donec bibendum varius quam, eu malesuada eros ultricies sed. Morbi ac velit ultrices, finibus quam eu.'},
            {name: 'Lorem', img_url: 'https://picsum.photos/204/200', description: 'Fusce eget mi eget nibh posuere lacinia sit amet sit amet metus. Vestibulum lacinia varius turpis, in gravida diam rhoncus id. Ut.'},
            {name: 'Ipsum', img_url: 'https://picsum.photos/204/201', description: 'Quisque dictum in ligula in lacinia. Donec bibendum varius quam, eu malesuada eros ultricies sed. Morbi ac velit ultrices, finibus quam eu.'},
          ]}
          numColumns = {windowWidth > 600 ? (windowWidth > 900 ? 3 : 2) : 1}
          renderItem = {
            ({item}) => 
            <View style={{width: windowWidth > 600 ? (windowWidth > 900 ? "33%" : "50%") : "100%"}}>
              <Card style={{flex: 1}}>
                <Card.Title>{item.name}</Card.Title>
                <Card.Divider/>
                <View style={{flex:1, flexDirection: "row"}}>
                  <Image style={{flex:1, resizeMode:"contain"}} source={{uri: item.img_url}}/>
                  <View style={{flex:3, flexDirection: "column"}}>
                    <Text style={{padding:12, flex:1, numberOfLines:2, ellipsizeMode:'tail'}}>{item.description}</Text>
                    <Text style={{paddingHorizontal:12, fontWeight: "bold", flex:1}}>Caloric Info</Text>
                    <Text style={{paddingVertical:8, paddingHorizontal:12, flex:2}}>More stuff</Text>
                  </View>
                </View>
              </Card>
            </View>
          }
        />
      </View>
  );
}

function RecipeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card>
        <Card.Title>Hello World!</Card.Title>
        <Text>Recipe Info!!!</Text>
        <Card.Divider/>
      </Card>
    </View>
  );
}

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