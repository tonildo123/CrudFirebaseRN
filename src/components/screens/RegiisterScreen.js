import React, { useState} from 'react';
import {
  View, Text, StyleSheet, TextInput, 
  TouchableOpacity, 
} from 'react-native';
// import Swiper from 'react-native-swiper';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';



const RegiisterScreen = ({navigation}) => {
    

    const [name, setName] = useState(""); // nombre
    const [lastName, setLastName] = useState(""); // apellido
    const [documento, setDocumento] = useState(null); // apellido

    const [datos, setDatos] = useState({
    
      nombre: '',
      apellido: '',
      dni:null
     
  });

  /////////////////

const handleContinue = () =>{

  console.log(name);

  setDatos(
    {     
      ...datos,
    nombre:name,
    apellido:lastName,
    dni:documento
  })
  
  
  loadingData();

}
//////////////////
const loadingData = ()=>{


  const enviar = {
    nombre:name,
    apellido:lastName,
    dni:documento,

  }

  navigation.navigate('Registerdos', {enviar})

  // setName('');
  // setLastName('');
  // setDocumento(null)
  
}

  return (
    
    
    <View style={styles.slide1}>
      <Text style={styles.text}>Ingrese sus datos</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
      />

      <TextInput
        style={styles.input}
        onChangeText={setDocumento}
        value={documento}
      />

      <TouchableOpacity
        onPress={handleContinue}
        style={styles.button}
      >
        <Text style={styles.textButton}>Continuar</Text>
      </TouchableOpacity>
    </View>
  
  )
}

const styles = StyleSheet.create({
    // wrapper: {},
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color:'white',
        fontSize:15
      },
    slide1: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      paddingTop:20,
      backgroundColor: 'grey'
    },
    slide2: {
      flex: 1,
      padding:20,
      backgroundColor: 'grey'
      
    },
    slide3: {
      flex: 1,
      padding:20,
      backgroundColor: 'grey'
    },
    slide4: {
        flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
      
      backgroundColor: 'grey'
      },
    text: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold'
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
  })


export default RegiisterScreen