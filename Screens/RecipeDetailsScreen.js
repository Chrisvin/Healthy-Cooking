import * as React from 'react';
import  { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { getRecipeInformation } from '../API/RecipeAPI';

export default function RecipeDetailsScreen({ route, navigation }) {
    const { itemID } = route.params;
    const [recipeDetails, setRecipeDetails] = useState("Loading");

    const responseHandler = (responseJson) => {
        console.log(responseJson);
        setRecipeDetails(JSON.stringify(responseJson, null, 2));
    }

    useEffect(() => {
        getRecipeInformation(itemID, false, responseHandler);
    }, []);
    
    return <View>
        <Text style={{fontWeight:"bold", padding:12}}>Details about the recipe with id: ${itemID}</Text>
        <Text style={{paddingHorizontal:12}}><pre>Details about the recipe with id: ${recipeDetails}</pre></Text>
    </View>
}