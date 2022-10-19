import React, { useState, useEffect} from 'react';
import {
  View, Text, Image, StyleSheet,
  TouchableOpacity, Button,
  Dimensions
} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker'



const UnionesScreen2 = ({navigation}) => {

    const recibo = useRoute();
    const recibi = recibo.params.enviar;
    
    const name=recibi.nombre;
    const acronimo=recibi.acronimo;
    const cuit=recibi.cuit;
    const telefono=recibi.telefono;
    const domicilio=recibi.domicilio;
    const [fecha, setFecha] = useState(""); // timepicker
    const [deporte, setDeporte] = useState([
        {label:'Rugby', value:132},
        
    ]); // dropdown
    const [pais, setPais] = useState([
        {label:'Argentina', value:'456'}
    ]); //dropdown
    const [provincia, setProvincia] = useState([
        {label:'Tucuman', value:1},
        {label:'Catamarca', value:2},
        {label:'Salta', value:3},
    ]); //dropdown
    const [logo, setLogo] = useState('https://via.placeholder.com/200'); // seleccionar imagen

    const [datos, setDatos] = useState({
    
        fecha:'',
        deporte:'',
        pais:'',
        provincia:'',
        logo:'',
     
  });

  /////////////////

const handleContinue = () =>{

  console.log(name);

  setDatos(
    {     
      ...datos,
      fecha:'',
      deporte:'',
      pais:'',
      provincia:'',
      logo:'',
  })
  
  
  loadingData();

}
//////////////////
const loadingData = ()=>{


  const enviar = {
    fecha:'',
    deporte:'',
    pais:'',
    provincia:'',
    logo:'',

  }

  navigation.navigate('Registerdos', {enviar})

}
// selecciona una imagen
const handleImagen = () =>{

    const options = {
      title:'Seleccione una imagen',
      storageOption:{
        skipBackup:true,
        path:'images',
      },
    };

    launchImageLibrary(options, response =>{
      console.log('response = ' + response);

        if(response.errorCode){
          console.log('response error= '+response.errorCode);
        }else if(response.didCancel){
          console.log('user cancel action ');
        }else{
          const path = response.assets[0].uri;
          setLogo(path);
          
        }

    });


  };


  return (
    <View style={styles.slide1}>
      <Text style={styles.text}>Un paso mas</Text>
      <TextInput
        style={styles.input} // fecha
        onChangeText={setName}
        value={name}
      />
      
      <DropDownPicker
        placeholder="Deporte"
        open={open}
        value={value}
        items={deporte}
        setOpen={setOpen}
        setValue={setDeporte}
        onSelectItem={(item)=>{
            setItemDeporte(item.label)}}
        />

    <DropDownPicker
        placeholder="Pais"
        open={open}
        value={value}
        items={pais}
        setOpen={setOpen}
        setValue={setPais}
        onSelectItem={(item)=>{
            setItemPais(item.label)}}
        />
      <DropDownPicker
        placeholder="Provincia"
        open={open}
        value={value}
        items={provincia}
        setOpen={setOpen}
        setValue={setProvincia}
        onSelectItem={(item)=>{
            setItemProvincia(item.label)}}
        />

      <View>
      <Button
        title='Seleccionar una imagen'
        onPress={handleImagen}
      />
      <Image 
      style={{
        alignSelf:'center',
        height:200,
        width:200,
      }}
      source = {{uri:logo}}
      />
      </View>
      

      <TouchableOpacity
        onPress={handleContinue}
        style={styles.button}
      >
        <Text style={styles.textButton}>Continuar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UnionesScreen2

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