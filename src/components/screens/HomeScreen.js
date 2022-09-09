/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {
    View, Text, FlatList, Image
 } from 'react-native';

const HomeScreen = () => {

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


  const handleItem = ({item}) =>{

    return(
      <View style={{flexDirection:'column', margin:10}}>
        <Text>{item.data().descripcion}</Text>
        <Text>$ {item.data().precio}</Text>
        <Image
          style={{
            width: 100,
            height: 130,
            resizeMode: 'contain'
          }}
          source={{
            uri: item.data().fotobase64
          }}
        />
        

      </View>
    );

  }

  return (
    <View>
          <Text>Productos</Text>
          <FlatList 
            data={data}
            renderItem={handleItem}
            keyExtractor={item => item.id}

          />


    </View>   
  )
}

export default HomeScreen;