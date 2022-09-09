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
  const [number, onChangeNumber] = useState(null);

  

  const handleLogin = () =>{

    navigation.navigate('Home');  

  }

  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.image} />
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
          <Text>Iniciar Sesion</Text>
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
    alignItems:'center'
    
  },
  image: {
    width: 80,
    height: 120,
    resizeMode : 'contain', // es como el objetfit de css
    padding:50,
    marginTop:20,
    
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      // margin:20,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",    
      padding:20,
      margin:20,
    },
});


export default LoginScreens;