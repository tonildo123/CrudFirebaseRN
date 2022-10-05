import React, {useState, useEffect} from 'react';
import {
  Dimensions, View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity,Button
 } from 'react-native';
 import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

var { height } = Dimensions.get('window');
 
var box_count = 15;
var box_height = height / box_count;


const EditScreen = ({route, navigation}) => {

  const values = route.params.item;

  useEffect(()=>{
    console.log(values);
  }, []);


  const [descripcion, setDescripcion] = useState(values.descripcion);
  const [precio, setPrecio] = useState(values.precio);
  const [fotobase64, setFotobase64] = useState(values.fotobase64);
  const [key, setKey] = useState(values.key);

  const handleImagen = () =>{

    const options = {
      title:'Seleccione una imagen',
      storageOption:{
        skipBackup:true,
        path:'images',
      },
    };

    launchImageLibrary(options, response =>{
      console.log('response = '+response);

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
      title:'Seleccione una imagen',
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


  const handleEdit = async()=>{

    try {
      firestore().collection('productos').doc(key).update({
        descripcion,
        precio,
        fotobase64,
      })
    } catch (error) {
      console.log(error)
    }finally{
      setDescripcion('');
      setPrecio('');
      setFotobase64('https://via.placeholder.com/200');
      navigation.navigate('Home');

    }

  
}



  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.box1]}>
        <Button
          title='Seleccionar una imagen'
          onPress={handleImagen}
        />
      </View>
      <View style={[styles.box, styles.box1]}>
       <Button
        title='Tomar una fotografia'
        onPress={handleFoto}
      />
      </View>
      <Image 
        style={{
          alignSelf:'center',
          height:300,
          width:200,
          resizeMode : 'contain',
        }}
        source = {{uri:fotobase64}}
        />
      <View>
      <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Descripcion"
        onChangeText={text =>setDescripcion(text)}
        value={descripcion}
      />
      <TextInput
        style={styles.input}
        onChangeText={number =>setPrecio(number)}
        value={precio}
        placeholder="$ PRECIO"
        keyboardType="numeric"
      />
    </SafeAreaView>
      </View>
      <View>
        <TouchableOpacity
         style={styles.button}
         onPress={handleEdit}
        >
          <Text>Editar Producto</Text>
        </TouchableOpacity>
      </View>
    </View>  
  
  );  
  
}

export default EditScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    
  },
  box: {
    height: box_height,
  },
  box1: {
      backgroundColor: '#2196F3',
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode : 'contain', // es como el objetfit de css
    padding:50,    
    marginTop:100,
    
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
      backgroundColor: '#2196F3',
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
      fontSize:50,
      padding:10,
      alignSelf:'center',
    },
});
