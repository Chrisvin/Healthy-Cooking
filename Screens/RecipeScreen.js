import * as React from 'react';
import  { useState, useEffect } from 'react';
import { Text, FlatList, View, Image, Dimensions } from 'react-native';
import { Card, SearchBar } from 'react-native-elements'
import { getRecipes } from '../API/RecipeAPI';
import { uniq } from 'lodash';

const windowWidth = Dimensions.get('window').width;
const numberOfItems = 15;
const recipes = [
    // {id: 1, name: 'Lorem', img_url: 'https://picsum.photos/200/200', aisle:'something or the other'},
    // {id: 2, name: 'Ipsum', img_url: 'https://picsum.photos/201/201', aisle:'something or the other'},
];

export function RecipeScreen() {
  const [searchText, setSearchText] = useState("");
  const [recipeData, setData] = useState(recipes);
  const [offset, setOffet] = useState(0);

  const responseHandler = (responseJson, text) => {
    setOffet(offset + responseJson.results.length);
    for (let i=0; i<responseJson.results.length; i++) {
      recipes.push({
        id: responseJson.results[i].id,
        name:responseJson.results[i].title,
        img_url:responseJson.results[i].image,
        recipe_information:responseJson.results[i].summary
      });
    }
    recipes = uniq(recipes);
    
    console.log("Original Recipe List:", responseJson);

    const updatedRecipes = [... new Set(
        recipes.filter(function(item) {
        // console.log(item.name," - ",text," = ",item.name.startsWith(text));
        return item.name.startsWith(text);
      })
    )];

    console.log("Filtered Recipe List:", updatedRecipes);
    
    setData(updatedRecipes)
  }
  
  const updateSearch = (text) => {
    setSearchText(text);
    getRecipes(text, numberOfItems, offset, responseHandler);
    // console.log("Search Text = ", text);
  };

  useEffect(() => {
    getRecipes(searchText, numberOfItems, offset, responseHandler);
  }, []);

  return (
      <View style={{flex:1}}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={searchText}/>
        <FlatList
          data={recipeData}
          numColumns = {windowWidth > 600 ? (windowWidth > 900 ? 3 : 2) : 1}
          keyExtractor = {item => item.id}
          renderItem = {
            ({item}) => 
            <View style={{width: windowWidth > 600 ? (windowWidth > 900 ? "33%" : "50%") : "100%"}}>
              <Card style={{flex: 1}}>
                <View style={{flex:1, flexDirection: "row"}}>
                <Image style={{flex:3, resizeMode:"contain"}} source={{uri: item.img_url}}/>
                <View style={{flex:3, flexDirection: "column"}}>
                    <Card.Title style={{flex:1}}>{item.name}</Card.Title>
                    <Text style={{flex:2, paddingHorizontal:8}} numberOfLines={4} ellipsizeMod={'tail'}>{item.recipe_information}</Text>
                </View>
                </View>
              </Card>
            </View>
          }
          onEndReached = {(distanceFromEnd) =>
            getRecipes(searchText, numberOfItems, offset, responseHandler)
          }
          // onRefresh = {
          //   getRecipes(searchText, numberOfItems, 0, responseHandler)
          // }
        />
      </View>
  );
}