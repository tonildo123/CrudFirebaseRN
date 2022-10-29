import React, { useState} from 'react';
import {
  View, Text, StyleSheet, TextInput, 
  TouchableOpacity,
  ImageBackground, 
} from 'react-native';

const UnionesScreen = ({navigation}) => {

    const [name, setName] = useState(""); 
    const [acronimo, setAcronimo] = useState(""); 
    const [cuit, setCuit] = useState(''); 
    const [telefono, setTelefono] = useState(''); 
    const [domicilio, setDomicilio] = useState(""); 

    

  /////////////////

const handleContinue = () =>{

  console.log(name);

  
  
  loadingData();

}
//////////////////
const loadingData = ()=>{


  const enviar = {
    nombre:name,
    acronimo:acronimo,
    cuit:cuit ,
    telefono:telefono,
    domicilio:domicilio,

  }

  navigation.navigate('UnionesAlta', {enviar})
  
}


  return (
    <View style={styles.slide1}>
        
      <Text style={styles.text}>Datos de la Union</Text>
      <TextInput
        style={styles.input}
        placeholder='NOMBRE'
        placeholderTextColor='white'
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder='ACRONIMO'
        placeholderTextColor='white'
        onChangeText={setAcronimo}
        value={acronimo}
      />

      <TextInput
        style={styles.input}
        placeholder='CUIT'
        placeholderTextColor='white'
        onChangeText={setCuit}
        value={cuit}
      />
      <TextInput
        style={styles.input}
        placeholder='TELEFONO'
        placeholderTextColor='white'
        onChangeText={setTelefono}
        value={telefono}
      />

      <TextInput
        style={styles.input}
        placeholder='DOMICILIO'
        placeholderTextColor='white'
        onChangeText={setDomicilio}
        value={domicilio}
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

export default UnionesScreen

const styles = StyleSheet.create({
    
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
      borderRadius: 10,
      padding:20,
      margin:10,
    },
    textButton:{
      fontSize:20,
      color:'white',
    }
  })