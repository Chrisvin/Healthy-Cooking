import * as React from 'react';
import  { useState, useEffect } from 'react';
import { Text, StyleSheet, FlatList, View, Image, Dimensions } from 'react-native';
import { Card, SearchBar } from 'react-native-elements'
import { SPOONACULAR_API_KEY } from '../Constants';

const windowWidth = Dimensions.get('window').width;

const ingredients = [
    // {name: 'Lorem', img_url: 'https://picsum.photos/200/200', aisle:'something or the other'},
    // {name: 'Ipsum', img_url: 'https://picsum.photos/201/201', aisle:'something or the other'},
];

export function IngredientScreen() {
  const [searchText, setSearchText] = useState("");
  const [ingredientData, setData] = useState(ingredients);

  const getIngredients = async (query) => {
    fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${SPOONACULAR_API_KEY}&query=${query.length>0 ? query : 'a'}&number=10&metaInformation=true`)
      .then(response => response.json())
      .then(responseJson => {
          for (let i=0; i<responseJson.number; i++) {
              ingredients.push({
                  name:responseJson.results[i].name,
                  img_url:`https://spoonacular.com/cdn/ingredients_250x250/`+responseJson.results[i].image,
                  aisle:responseJson.results[i].aisle
                });
          }
          
          console.log("Response:", ingredients);
          
          setData(ingredients);
      })
      .catch((error) => {
          console.error(error);
      });;
  }

  useEffect(() => {
      getIngredients(searchText);
  }, []);

  const updateSearch = (text) => {
    setSearchText(text);
    setData(ingredients.filter(function(item) {
        return item.name.startsWith(text);
    }))
    // console.log("Search Text = ", text);
  };  

  return (
      <View style={{flex:1}}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={searchText}/>
        <FlatList
          data={ingredientData}
          numColumns = {windowWidth > 600 ? (windowWidth > 900 ? 3 : 2) : 1}
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
        />
      </View>
  );
}