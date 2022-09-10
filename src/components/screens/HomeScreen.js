/* eslint-disable comma-dangle */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {
    View, Text, FlatList, Image, TouchableOpacity,StyleSheet,Alert
 } from 'react-native';
import { DocumentSnapshot } from 'firebase/firestore';
// import { QuerySnapshot } from 'firebase/firestore';

const HomeScreen = ({navigation}) => {

  const [data, setData] =  useState();
  

  // const getProdcuts = async () =>{
  //   // const data = await getDocs(productColection);
  //   const usersCollection = await firestore().collection('productos').get();
  //   setData(usersCollection.docs);
  //   console.log('data');
  //   console.log(usersCollection.docs[0].data().precio);
  // }; tambien sirve pero no trae la key id

  const getProdcuts = async () =>{
    const suscriber = firestore().collection('productos').
    onSnapshot(
      querySnapshot => {

        const productos = [];
        querySnapshot.forEach(
          documentSnapshot => {
            productos.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id 
            })
              

          }
        )
        setData(productos);
      }
    )

    return () => suscriber()
  }

  
  useEffect(() => {
    getProdcuts();
  }, [])

  const handleProducto = () =>{
    navigation.navigate('Create');
  }

  const handleEdit = (item) =>{
    navigation.navigate('Edit', {item})
  }

  
  const  handleDelete = (item)=>{

    Alert.alert(
      `Producto ${item.descripcion}`,
      'Seguro que desea eliminarlo', 
      [
        { text:"Cancelar", 
          style:'cancel'
        },
        {
          text:"Editar", 
          onPress: ()=> handleEdit(item)
          
        },
        { text:'Si, Eliminar',
          onPress: ()=>{ firestore().collection('productos').doc(item.key)
          .delete().then(()=>{
              Alert.alert(
                `${item.descripcion} Eliminado!`)
            }) 
        },
          style:'destructive'
        },
      ]
    );
  } 

  const handleItem = ({item}) =>{

    return(
      <TouchableOpacity
          onPress={()=>handleDelete(item)}
          style={{flexDirection:'column', margin:10}}
        >
        <Text style={styles.txtDescripcion}>{item.descripcion}</Text>
          <Text style={styles.textPrecio}>$ {item.precio}</Text>
          <Image
            style={styles.image}
            source={{
              uri: item.fotobase64
            }}
          />
      </TouchableOpacity>       
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