/**
 * To be made by Kush Bajpai - 2020mt93731@wilp.bits-pilani.ac.in
 */

import * as React from 'react';
import  { useState, useEffect } from 'react';
import { Text, View, Button, Linking, Platform } from 'react-native';
import { getIngredientInformation } from '../API/IngredientAPI';

export default function IngredientDetailsScreen({ route, navigation }) {
    const { itemID } = route.params;
    const [ingredientDetails, setIngredientDetails] = useState("Loading");

    const responseHandler = (responseJson) => {
        console.log(responseJson);
        setIngredientDetails(JSON.stringify(responseJson, null, 2));
    }

    useEffect(() => {
        getIngredientInformation(itemID, responseHandler);
    }, []);
    
    return <View>
        <Text style={{fontWeight:"bold", padding:12}}>Details about the ingredient with id: ${itemID}</Text>
        <Text style={{paddingHorizontal:12}}><pre>Details about the ingredient with id: ${ingredientDetails}</pre></Text>
        <Button title="Buy from Amazon" onPress={
            () => {
                console.log(ingredientDetails, "\n ==> ", JSON.parse(ingredientDetails).name);
                const url = "https://www.amazon.in/s?k="+JSON.parse(ingredientDetails).name
                if(Platform.OS == 'web'){
                    window.open(url, '_blank');
                } else {
                    Linking.openURL(url);
                }
            }
        } />
    </View>
}