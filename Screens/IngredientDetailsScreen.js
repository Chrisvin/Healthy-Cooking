import * as React from 'react';
import { Text, View } from 'react-native';

export default function IngredientDetailsScreen({ route, navigation }) {
    const { itemID } = route.params;
    return <View>
        <Text>Details about the ingredient with id: ${itemID}</Text>
    </View>
}