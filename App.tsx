import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from './src/screens/Products';
import ProductDetails from './src/screens/ProductDetails';

export type RootStackParamList = {
  Products: undefined;
  ProductDetails: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Products" component={Products} options={{ headerTitle: 'Products' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerTitle: 'Products Details' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
