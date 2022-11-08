
import React, { useState, useEffect} from 'react';
import {
  View, Text, Image, StyleSheet,
  TouchableOpacity, Button,
  Dimensions,
  Alert
} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { StyleLoginScreen } from '../../styles/StyleLoginScreen';

var { height } = Dimensions.get('window');
 
var box_count = 15;
var box_height = height / box_count;

const RegisterScreenSelfie = ({route, navigation}) => {


  useEffect(() => {
    console.log('llega datos : ', route.params.enviar)
  }, [])
  

  const [fotobase64, setFotobase64] = useState('https://via.placeholder.com/200');
  const [datos, setDatos] = useState({
    
      idUsuario:route.params.enviar.idUsuario,// llega
      tipo:route.params.enviar.tipo,// llega
      nombre: route.params.enviar.nombre,// llega
      apellido: route.params.enviar.apellido, // llega
      dni:route.params.enviar.dni, // llega
      email: route.params.enviar.email,// llega
      password: route.params.enviar.password, // llega
      fotobase64:fotobase64,
    
  });

  useEffect(() => {
    console.log('datos : ', JSON.stringify(datos, null, 3))
  }, [])
  

  const cargarDataUser = async()=>{

        const idUsuario = datos.idUsuario;
        const tipo = datos.tipo;
        const nombre = datos.nombre;
        const apellido = datos.apellido;
        const dni = datos.dni;
        const email = datos.email;
        const password = datos.password;
        
    
    try {
      firestore().collection('datauser').add({
        idUsuario:idUsuario,
        tipo:tipo,
        nombre:nombre,
        apellido:apellido,
        dni:dni,
        email:email,
        password:password, 
        foto:fotobase64,
      })
    } catch (error) {
      console.log('error al subir datos', error)
      Alert.alert('Hubo un error al guardar datos')
    }finally{
      setFotobase64('https://via.placeholder.com/200');
      Alert.alert(
        "Exito!",
        "Datos guardados correctamente!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => navigation.navigate('Login')}
        ]
      );
    }
  }

const login = () =>{

  navigation.navigate('Login');

}

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
          setFotobase64(path);
          
        }

    });


  };

  const handleFoto = () =>{

    const options = {
      title:'Tomar una foto',
      storageOption:{
        skipBackup:true,
        path:'images',
      },
      includeBase64:true,
    };

    launchCamera(options, response =>{
      console.log('response = '+response);

        if(response.errorCode){
          console.log('response error= '+response.errorCode);
        }else if(response.didCancel){
          console.log('user cancel action ');
        }else{
          const uri = response.assets[0].uri;
          setFotobase64(uri);
          
        }

    });


  };


  return (
    
    <View style={styles.container}>
    <View style={[styles.box, styles.box1]}>
      <Button
        color="#28B463"
        title='Seleccionar una imagen'
        onPress={handleImagen}
      />
    </View>
    <View style={[styles.box, styles.box1]}>
     <Button
      title='Tomar una fotografia'
      color="#28B463"
      onPress={handleFoto}
      
    />
    </View>
    <Image 
      style={{
        alignSelf:'center',
        height:200,
        width:200,
      }}
      source = {{uri:fotobase64}}
      />
   
    <View>
      <TouchableOpacity
       style={styles.button}
       onPress={cargarDataUser}
      >
        <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
        > 
        <Text 
            style={styles.textButton}
        >REGISTRARME</Text>           
        </LinearGradient> 
      </TouchableOpacity>
    </View>
    <View>
      <TouchableOpacity
       style={styles.button}
       onPress={login}
      >
        <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
        > 
        <Text 
            style={styles.textButton}
        >INICIO</Text>           
        </LinearGradient> 
      </TouchableOpacity>
    </View>
  </View> 
    
  
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#637571'
    
  },
  box: {
    height: box_height,
  },
  box1: {
      backgroundColor: '#28B463', // 
      borderWidth: 4,
      borderColor: "#0E6251", // 
      borderRadius: 6,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode : 'contain', // es como el objetfit de css
    padding:50,
    marginTop:20,
    
  },
  input: {
    backgroundColor: "#f0f0f0",   
    // height: 40,
    //   margin: 12,
    borderRadius:10,
      borderWidth: 1,
      padding: 10,
      margin:5,
    },
    button: {
      // backgroundColor: '#2196F3',
      borderWidth: 2,
      // borderColor: "#20232a",
      borderRadius: 12,      
      // padding:10,
      width:'100%'
    },
    textButton:{
      alignSelf:'center',
      color:'white',
      fontSize:24,
    }
});


export default RegisterScreenSelfie;