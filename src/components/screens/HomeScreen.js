/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {
    View, Text, FlatList, Image, TouchableOpacity,StyleSheet,
 } from 'react-native';

const HomeScreen = ({navigation}) => {

  const [data, setData] =  useState();
  

  const getProdcuts = async () =>{
    // const data = await getDocs(productColection);
    const usersCollection = await firestore().collection('productos').get();
    setData(usersCollection.docs);
    console.log('data');
    console.log(usersCollection.docs[0].data().precio);
  };

  
  useEffect(() => {
    getProdcuts();
  }, [])

  const handleProducto = () =>{
    navigation.navigate('Create');
  }

  const handleItem = ({item}) =>{

    return(
      <View style={{flexDirection:'column', margin:10}}>
        <Text style={styles.txtDescripcion}>{item.data().descripcion}</Text>
        <Text style={styles.textPrecio}>$ {item.data().precio}</Text>
        <Image
          style={styles.image}
          source={{
            uri: item.data().fotobase64
          }}
        />
        

      </View>
    );

  }

  return (
    <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleProducto}
            >
            <Text>Subir un producto nuevo</Text>
          </TouchableOpacity>
          <Text style={styles.title}>PRODUCTOS</Text>
          <FlatList 
            data={data}
            renderItem={handleItem}
            keyExtractor={item => item.id}

          />
    </View>   
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
    
  },
  title:{
    backgroundColor:'#337AFF',
    color:'white',
    paddingHorizontal:50,
    paddingVertical:10,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode : 'contain', // es como el objetfit de css
    padding:100,
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
    textPrecio:{
      backgroundColor:'grey',
      color:'white',
    },
    txtDescripcion:{
      backgroundColor:'black',
      color:'white',
    },
});

export default HomeScreen;