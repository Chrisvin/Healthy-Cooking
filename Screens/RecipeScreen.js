import * as React from 'react';
import  { useState, useEffect } from 'react';
import { Text, FlatList, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card, SearchBar } from 'react-native-elements'
import { getRecipes } from '../API/RecipeAPI';

const windowWidth = Dimensions.get('window').width;
const numberOfItems = 15;
const recipes = [];
let searchTimer = setTimeout(()=>{}, 0);

export function RecipeScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [recipeData, setData] = useState(recipes);
  const [offset, setOffet] = useState(0);

  const responseHandler = (responseJson, text) => {
    setOffet(offset + responseJson.results.length);
    for (let i=0; i<responseJson.results.length; i++) {
      if (recipes.findIndex((item) => item.id===responseJson.results[i].id) == -1) {
        recipes.push({
          id: responseJson.results[i].id,
          name:responseJson.results[i].title,
          img_url:responseJson.results[i].image,
          recipe_information:responseJson.results[i].summary
        });
      }
    }

    console.log("Original Recipe List:", responseJson);

    const updatedRecipes = recipes.filter(function(item) {
      return item.name.includes(text);
    });

    console.log("Filtered Recipe List:", updatedRecipes);
    
    setData(updatedRecipes)
  }
  
  const updateSearch = (text) => {
    setSearchText(text);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setOffet(0);
      getRecipes(text, numberOfItems, 0, responseHandler);
    }, 1000);
  };

  useEffect(() => {
    getRecipes(searchText, numberOfItems, offset, responseHandler);
  }, []);

  const renderItem = ({item}) => (
    <View style={{width: windowWidth > 600 ? (windowWidth > 900 ? "33%" : "50%") : "100%"}}>
      <TouchableOpacity onPress={() => navigation.navigate('RecipeDetailsScreen', {itemID: item.id})}> 
        <Card style={{flex: 1}}>
            <View style={{flex:1, flexDirection: "row"}}>
            <Image style={{flex:3, resizeMode:"contain"}} source={{uri: item.img_url}}/>
            <View style={{flex:3, flexDirection: "column"}}>
                <Card.Title style={{flex:1}}>{item.name}</Card.Title>
                <Text style={{flex:2, paddingHorizontal:8}} numberOfLines={4} ellipsizeMod={'tail'}>{item.recipe_information.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
            </View>
            </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
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
          renderItem = { renderItem }
          onEndReached = {(distanceFromEnd) =>
            getRecipes(searchText, numberOfItems, offset, responseHandler)
          }
        />
      </View>
  );
}