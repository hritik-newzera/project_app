import React from 'react';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileScreen from './screens/ProfileScreen';
import StoryScreen from './screens/StoryScreen';

const client = new ApolloClient({
  uri: ['http://10.0.2.2:4000/graphql'],
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ProfileScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="StoryScreen" component={StoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
