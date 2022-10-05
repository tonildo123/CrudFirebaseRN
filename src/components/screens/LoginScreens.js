import React, { useState, useEffect} from 'react';
import {
  View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity
} from 'react-native';

import logoImg from '../../assets/vectoricon.png';
import Icon from 'react-native-vector-icons/FontAwesome';

import auth from '@react-native-firebase/auth';

import {useSelector, useDispatch} from 'react-redux'
import AllActions from '../../store/actions/AllActions';



const LoginScreens = ({navigation}) => {
  

  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState('');

  const currentUser = useSelector(state => state.CurrentUser)
  const dispatch = useDispatch()

  useEffect(() => {

    // dispatch(AllActions.UserAction.setUser(user))
    dispatch(AllActions.UserActions.loginUSer(text))
    console.log('user actual ', currentUser);

  }, [])

  

  const handleLogin = () =>{

    console.log('user', text)
    console.log('pass', number)

    auth()
    .signInWithEmailAndPassword(text, number)
    .then(() => {
      console.log('Log in ');
      changeScreen();
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });



  }

  const changeScreen  =()=>{
    navigation.navigate('Home');  
  }

  const handleRegister = () =>{

    navigation.navigate('Register');  

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
        placeholder="Usuario/eMail/Telefono"
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="*********"
        keyboardType="numeric"
      />
    </SafeAreaView>
      </View>
      <View>
        <TouchableOpacity
         style={styles.buttonLogin}
         onPress={handleLogin}
        >
          <Text style={styles.textButton}>INICIAR SESION</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
         style={styles.button}
         onPress={handleRegister}
        >
          <Text style={styles.textButton}>REGISTRARME</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',justifyContent: "center" }}>
        <TouchableOpacity style={{paddingHorizontal:15}}>
          <Icon name="facebook" size={40} color="#3498DB"  />
        </TouchableOpacity>
          
        <TouchableOpacity style={{paddingHorizontal:15}}>
          <View style={{alignItems:'center',}}>
            <Icon name="camera-retro" size={40} color="#E74C3C" />
            <Text>FACE ID</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{paddingHorizontal:15}}>
          <View style={{alignItems:'center',}}>
            <Icon name="expeditedssl" size={40} color="#3498DB" />
            <Text>PIN</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{paddingHorizontal:15}}>
         <Icon name="google" size={40} color="#FA8072" />
        </TouchableOpacity>
         

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
    buttonLogin: {
      alignItems: "center",
      backgroundColor: "black",    
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