import React from 'react';
import {createStackNavigator } from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses'
import StudyTabs from './StudyTabs';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

function AppStack(){
  return( 
  
    <Auth.Navigator 
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#253237'},
    }}
     
    >

    <Auth.Screen name="SignIn" component={SignIn}/>
    <Auth.Screen name="SignUp" component={SignUp}/>
    <Auth.Screen name="Landing" component={Landing}/>
    <Auth.Screen name="GiveClasses" component={GiveClasses}/>
    <Auth.Screen name="Study" component={StudyTabs}/>

   
    </Auth.Navigator>

  )
}

export default AppStack;