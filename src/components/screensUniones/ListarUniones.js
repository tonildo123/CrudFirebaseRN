import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {
    View, Text, FlatList, Image, TouchableOpacity,StyleSheet,Alert
 } from 'react-native';
// import { DocumentSnapshot } from 'firebase/firestore';

const ListarUniones = () => {

  const [data, setData] =  useState();

  const getProdcuts = async () =>{
    const suscriber = firestore().collection('uniones').
    onSnapshot(
      querySnapshot => {

        const uniones = [];
        querySnapshot.forEach(
          documentSnapshot => {
            uniones.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id 
            })
              

          }
        )
        setData(uniones);
      }
    )

    return () => suscriber()
  }

  
  useEffect(() => {
    getProdcuts();
  }, [])

  // const handleProducto = () =>{
  //   navigation.navigate('Create');
  // }

  // const handleEdit = (item) =>{
  //   navigation.navigate('Edit', {item})
  // }

  
  const  handleDelete = (item)=>{

    Alert.alert(
      `Union ${item.descripcion}`,
      'Seguro que desea eliminarlo', 
      [
        { text:"Cancelar", 
          style:'cancel'
        },
        {
          text:"Editar", 
          // onPress: ()=> handleEdit(item)
          
        },
        { text:'Si, Eliminar',
          onPress: ()=>{ firestore().collection('uniones').doc(item.key)
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
          style={{flexDirection:'column', margin:10,alignItems: "center",}}
        >
        <Text style={styles.txtDescripcion}>{item.nombre}</Text>
          <Text style={styles.textPrecio}>cuit {item.cuit}</Text>
          <Image
            style={styles.image}
            source={{
              uri: item.logo
            }}
          />
      </TouchableOpacity>       
    );

  }


  return (
    <View style={styles.container}>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={handleProducto}
            >
            <Text style={styles.textButton}>Subir un producto nuevo</Text>
          </TouchableOpacity> */}
          <Text style={styles.title}>Lista de Uniones</Text>
          <FlatList 
            data={data}
            renderItem={handleItem}
            keyExtractor={item => item.id}

          />
    </View>   
  )
}

export default ListarUniones

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'grey'
  },
  title:{
    marginTop: 1,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#283747",
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  image: {
    width: 200,
    height: 250,
    resizeMode : 'contain', // es como el objetfit de css
    padding:100,
    marginTop:20,
    borderRadius: 8,
    
  },
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      // margin:20,
    },
    button: {
      marginTop: 1,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
      backgroundColor: "#61dafb",
      color: "#20232a",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
      alignItems: "center",
    },
    textButton:{
      fontSize:25,      
    },
    textPrecio:{
      backgroundColor:'grey',
      color:'white',
      fontSize:25,
      
    },
    txtDescripcion:{
      // backgroundColor:'black',
      color:'white',
      fontSize:25,
    },
});