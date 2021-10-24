import * as React from 'react';
import  { useState, useEffect } from 'react';
import { Text, FlatList, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card, SearchBar } from 'react-native-elements'
import { getIngredients } from '../API/IngredientAPI';

const windowWidth = Dimensions.get('window').width;
const numberOfItems = 25;
const ingredients = [];
let searchTimer = setTimeout(()=>{}, 0);

export function IngredientScreen({ navigation }) {
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
        return item.name.startsWith(text);
      })
    )];

    console.log("Filtered Ingredient List:", updatedIngredients);
    
    setData(updatedIngredients)
  }
  
  const updateSearch = (text) => {
    setSearchText(text);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setOffet(0);
      getIngredients(text, numberOfItems, 0, responseHandler);
    }, 1000);
  };

  useEffect(() => {
    getIngredients(searchText, numberOfItems, offset, responseHandler);
  }, []);

  const renderItem = ({item}) => (
    <View style={{width: windowWidth > 600 ? (windowWidth > 900 ? "33%" : "50%") : "100%"}}>
      <TouchableOpacity onPress={() => navigation.navigate('IngredientDetailsScreen', {itemID: item.id})}> 
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
          data={ingredientData}
          numColumns = {windowWidth > 600 ? (windowWidth > 900 ? 3 : 2) : 1}
          keyExtractor = {item => item.id}
          renderItem = {renderItem}
          onEndReached = {(distanceFromEnd) =>
            getIngredients(searchText, numberOfItems, offset, responseHandler)
          }
        />
      </View>
  );
}