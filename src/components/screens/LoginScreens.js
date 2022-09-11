/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity
} from 'react-native';

import logoImg from '../../Assets/vectoricon.png';
import Feather from 'react-native-vector-icons/FontAwesome';


const LoginScreens = ({navigation}) => {
  

  const [text, onChangeText] = useState("Usuario/eMail/Telefono");
  const [number, onChangeNumber] = useState('*********');

  

  const handleLogin = () =>{

    navigation.navigate('Home');  

  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={logoImg} style={styles.image} />
      </View>
      
      <View>
      <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Contraseña"
        keyboardType="numeric"
      />
    </SafeAreaView>
      </View>
      <View>
        <TouchableOpacity
         style={styles.button}
         onPress={handleLogin}
        >
          <Text style={styles.textButton}>Iniciar Sesion</Text>
        </TouchableOpacity>
      </View>
      <View>
      <Feather
        name="facebook"
        backgroundColor="#3b5998"
        // onPress={}
      >
        Login with Facebook
      </Feather>
      </View>
    </View>
    );
    

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    
  },
  logo:{
    flex: 0.50,
    // justifyContent:'center',
    alignItems: "center",

  },
  image: {
    width: 200,
    height: 220,
    resizeMode : 'contain', // es como el objetfit de css
    padding:50,
    marginTop:20,
    
    
  },
  input: {
      backgroundColor: "white",
      borderColor: "gray",
      width: "100%",
      borderWidth: 4,
      borderRadius: 10,
      padding: 10,
      color:'grey',
    },
    button: {
      alignItems: "center",
      backgroundColor: "#85929E",    
      // borderWidth: 4,
      borderRadius: 10,
      padding:20,
      margin:10,
      // fontSize:50,
      
    },
    textButton:{
      fontSize:20,
      color:'white',
    }
});


export default LoginScreens;