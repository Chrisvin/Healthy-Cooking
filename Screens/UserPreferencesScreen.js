import * as React from 'react';
import { Text, View } from 'react-native';
 
export default function UserPreferencesScreen() {
    return <View>
        <Text style={{fontWeight:"bold", padding:12}}>User preferences</Text>
        <Text style={{paddingHorizontal:12}}><pre>Allergies, etc</pre></Text>
    </View>
}