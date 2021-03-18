import 'react-native-gesture-handler';
import React from 'react';
import { View,StatusBar } from 'react-native';
import{NavigationContainer} from '@react-navigation/native';
import { AppLoading } from 'expo';
import AppStack from './src/routes/AppStack';
import AppProvider from './src/hooks'
import {Archivo_400Regular, Archivo_700Bold, useFonts} from '@expo-google-fonts/archivo';
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins'; 


const App: React.FC = ()=> {
  /*

  */
  let [fontsLoaded]= useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  if(!fontsLoaded){
    return <AppLoading />;
    
  }else{
  return (
    
    <NavigationContainer>
       <StatusBar barStyle="light-content" backgroundColor="#312e38" />
       <AppProvider>
       <View style={{flex:1, backgroundColor:'#312e38'}}>
       <AppStack/>
       </View>
       </AppProvider>
      </NavigationContainer>   
  );
 }
}

export default App;