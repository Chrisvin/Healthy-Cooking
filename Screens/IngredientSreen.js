import * as React from 'react';
import  { useState, useEffect } from 'react';
import { Text, FlatList, View, Image, Dimensions } from 'react-native';
import { Card, SearchBar } from 'react-native-elements'
import { getIngredients } from '../API/IngredientAPI';

const windowWidth = Dimensions.get('window').width;
const numberOfItems = 25;
const ingredients = [
    // {id: 1, name: 'Lorem', img_url: 'https://picsum.photos/200/200', aisle:'something or the other'},
    // {id: 2, name: 'Ipsum', img_url: 'https://picsum.photos/201/201', aisle:'something or the other'},
];

export function IngredientScreen() {
  const [searchText, setSearchText] = useState("");
  const [ingredientData, setData] = useState(ingredients);
  const [offset, setOffet] = useState(0);

  const responseHandler = (responseJson, text) => {
    setOffet(offset + responseJson.results.length);
    for (let i=0; i<responseJson.results.length; i++) {
      ingredients.push({
        id: responseJson.results[i].id,
        name:responseJson.results[i].name,
        img_url:`https://spoonacular.com/cdn/ingredients_250x250/`+responseJson.results[i].image,
        aisle:responseJson.results[i].aisle
      });
    }
    
    console.log("Original Ingredient List:", ingredients);

    const updatedIngredients = [... new Set(
      ingredients.filter(function(item) {
        // console.log(item.name," - ",text," = ",item.name.startsWith(text));
        return item.name.startsWith(text);
      })
    )];

    console.log("Filtered Ingredient List:", updatedIngredients);
    
    setData(updatedIngredients)
  }
  
  const updateSearch = (text) => {
    setSearchText(text);
    getIngredients(text, numberOfItems, offset, responseHandler);
    // console.log("Search Text = ", text);
  };

  useEffect(() => {
    getIngredients(searchText, numberOfItems, offset, responseHandler);
  }, []);

  return (
      <View style={{flex:1}}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={searchText}/>
        <FlatList
          data={ingredientData}
          numColumns = {windowWidth > 600 ? (windowWidth > 900 ? 3 : 2) : 1}
          keyExtractor = {item => item.id}
          renderItem = {
            ({item}) => 
            <View style={{width: windowWidth > 600 ? (windowWidth > 900 ? "33%" : "50%") : "100%"}}>
              <Card style={{flex: 1}}>
                <View style={{flex:1, flexDirection: "row"}}>
                <Image style={{flex:2, resizeMode:"contain"}} source={{uri: item.img_url}}/>
                    <View style={{flex:1, flexDirection: "column"}}>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Divider/>
                        <Text style={{paddingHorizontal:12, fontWeight: "500", flex:1}}>Product Type</Text>
                        <Text style={{padding:12, flex:1, numberOfLines:2, ellipsizeMode:'tail'}}>{item.aisle}</Text>
                    </View>
                </View>
              </Card>
            </View>
          }
          onEndReached = {(distanceFromEnd) =>
            getIngredients(searchText, numberOfItems, offset, responseHandler)
          }
        />
      </View>
  );
}