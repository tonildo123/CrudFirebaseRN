import React, { useState} from 'react';
import {
  View, Text, StyleSheet, TextInput, 
  TouchableOpacity,
  ImageBackground, 
} from 'react-native';

const UnionesScreen = ({navigation}) => {

    const [name, setName] = useState(""); 
    const [acronimo, setAcronimo] = useState(""); 
    const [cuit, setCuit] = useState(null); 
    const [telefono, setTelefono] = useState(null); 
    const [domicilio, setDomicilio] = useState(""); 

    const [datos, setDatos] = useState({
    
      nombre: '',
      acronimo: '',
      cuit:null, 
      telefono:null, 
      domicilio:'',
     
  });

  /////////////////

const handleContinue = () =>{

  console.log(name);

  setDatos(
    {     
      ...datos,
      nombre:name,
      acronimo: acronimo,
      cuit:cuit, 
      telefono:telefono, 
      domicilio:domicilio,
  })
  
  
  loadingData();

}
//////////////////
const loadingData = ()=>{


  const enviar = {
    nombre:datos.nombre,
    acronimo:datos.acronimo,
    cuit:datos.cuit, 
    telefono:datos .telefono,
    domicilio:datos.domicilio,

  }

  navigation.navigate('UnionesAlta', {enviar})
  
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
        onChangeText={setAcronimo}
        value={acronimo}
      />

      <TextInput
        style={styles.input}
        onChangeText={setCuit}
        value={cuit}
      />
      <TextInput
        style={styles.input}
        onChangeText={setTelefono}
        value={telefono}
      />

      <TextInput
        style={styles.input}
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