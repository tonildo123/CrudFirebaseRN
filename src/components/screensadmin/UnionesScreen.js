import React, { useState} from 'react';
import {
  View, Text, StyleSheet, TextInput, 
  TouchableOpacity,
  ImageBackground, 
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { StyleLoginScreen } from '../../styles/StyleLoginScreen';

const UnionesScreen = ({navigation}) => {

    const [name, setName] = useState(""); 
    const [acronimo, setAcronimo] = useState(""); 
    const [cuit, setCuit] = useState(''); 
    const [telefono, setTelefono] = useState(''); 
    const [domicilio, setDomicilio] = useState(""); 

    //// dropdown pais y provincia
    const [pais, setPais] = useState([
      {label:'Argentina', value:'456'}
  ]); //dropdown
  const [itemPais, setItemPais] = useState('');
  const [provincia, setProvincia] = useState([
      {label:'Tucuman', value:1},
      {label:'Catamarca', value:2},
      {label:'Salta', value:3},
  ]); //dropdown
  const [itemProvincia, setItemProvincia] = useState('');

  const [openPro, setOpenProv] = useState(false);
  const [valueProv, setValuePrv] = useState(null);
  const [openPais, setOpenPais] = useState(false);
  const [valuePais, setValuePais] = useState(null);

    

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
    pais:itemPais,
    provincia:itemProvincia,

  }

  navigation.navigate('UnionesAlta', {enviar})
  
}


  return (
    <View style={styles.slide1}>
      <ScrollView>       
      <Text style={styles.text}>Datos de la Union</Text>
      <TextInput
        style={styles.input}
        placeholder='NOMBRE/S'
        placeholderTextColor='grey'
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder='ACRONIMO'
        placeholderTextColor='grey'
        onChangeText={setAcronimo}
        value={acronimo}
      />

      <TextInput
        style={styles.input}
        placeholder='CUIT'
        placeholderTextColor='grey'
        onChangeText={setCuit}
        value={cuit}
      />
      <TextInput
        style={styles.input}
        placeholder='TELEFONO'
        placeholderTextColor='grey'
        onChangeText={setTelefono}
        value={telefono}
      />

      <TextInput
        style={styles.input}
        placeholder='DOMICILIO'
        placeholderTextColor='grey'
        onChangeText={setDomicilio}
        value={domicilio}
      />

      <View style={{flexDirection:'row', padding:10}}>
      <View style={{width:'50%'}}>
          <DropDownPicker
          placeholder="Pais"
          open={openPais}
          value={valuePais}
          items={pais}
          setOpen={setOpenPais}
          setValue={setValuePais}
          onSelectItem={(item)=>{setItemPais(item.label)}}
          />
        </View>
        <View style={{width:'50%'}}>
            <DropDownPicker
            placeholder="Provincia"
            open={openPro}
            value={valueProv}
            items={provincia}
            setOpen={setOpenProv}
            setValue={setValuePrv}
            onSelectItem={(item)=>{setItemProvincia(item.label)}}
            />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        style={styles.button}
      >
       <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
        >
          <Text style={[StyleLoginScreen .textSign, { color: 'black'}]}>CONTINUAR</Text>
                
        </LinearGradient>
      </TouchableOpacity>
      </ScrollView>
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
        color:'black',
        fontSize:15
      },
    slide1: {
      flex: 1,
      paddingTop:20,
      backgroundColor: '#D7DBDD'
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
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
      alignSelf:'center',
    }, 
    button: {
      alignItems: "center",
      // backgroundColor: "#85929E",    
      borderRadius: 10,
      // padding:20,
      margin:10,
    },
    textButton:{
      fontSize:20,
      color:'white',
    }
  })