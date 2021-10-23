import * as React from 'react';
import { Text, View } from 'react-native';

export default function RecipeDetailsScreen({ route, navigation }) {
    const { itemID } = route.params;
    return <View>
        <Text>Details about the recipe with id: ${itemID}</Text>
    </View>
}