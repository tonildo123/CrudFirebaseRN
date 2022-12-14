/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React, { useContext }from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreens from '../components/screens/LoginScreens';
import HomeScreen from '../components/screens/HomeScreen';
import EditScreen from '../components/screens/EditScreen';
import CreateCreen from '../components/screens/CreateCreen';
import RegiisterScreen from '../components/screens/RegiisterScreen';
import RegisterData from '../components/screens/RegisterData';
import RegisterScreenSelfie from '../components/screens/RegisterScreenSelfie';
import {useSelector, useDispatch} from 'react-redux';
import NavigationDrawer from './NavigationDrawer';


const Stack = createNativeStackNavigator();


const Navigate = () => {

  const currentUser = useSelector(state => state.CurrentUser)

  console.log('navigate console : ', currentUser)



  return (
    <NavigationContainer>

      {
        (currentUser.loggedIn)
        ? <NavigationDrawer/>
        : <Stack.Navigator
        screenOptions={{
          headerShown:false,
          cardStyle:{
              backgroundColor:'black',
          },
        }}
      >
        <Stack.Screen name="Login" component={ LoginScreens } />
        <Stack.Screen name="Home" component={ HomeScreen } />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="Create" component={CreateCreen} />
        <Stack.Screen name="Register" component={RegiisterScreen} />
        <Stack.Screen name="Registerdos" component={RegisterData} />
        <Stack.Screen name="Registertres" component={RegisterScreenSelfie} />
      </Stack.Navigator>
      }
      
    </NavigationContainer>


  );

};

export default Navigate;