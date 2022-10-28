import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {
    View, Text, FlatList, Image, TouchableOpacity,StyleSheet,Alert
 } from 'react-native';


const ListPartidos = () => {

  
  const [data, setData] =  useState();

  const getProdcuts = async () =>{
    const suscriber = firestore().collection('partidos').
    onSnapshot(
      querySnapshot => {

        const partidos = [];
        querySnapshot.forEach(
          documentSnapshot => {
            partidos.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id 
            })
              

          }
        )
        setData(partidos);
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
      `Partido dirigido por ${item.arbitro}`,
       
      [
        { text:"Cancelar", 
          style:'cancel'
        },
        {
          text:"Editar", 
          // onPress: ()=> handleEdit(item)
          
        },
        { text:'Si, Eliminar',
          onPress: ()=>{ firestore().collection('partidos').doc(item.key)
          .delete().then(()=>{
              Alert.alert(
                `${item.arbitro} Eliminado!`)
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
          onPress={
            ()=>handleDelete(item)}
          style={{flexDirection:'column', margin:10,alignItems: "center",}}
        >
          <Text style={styles.txtDescripcion}>{item.local} VS {item.visitante}</Text>
          <Text style={styles.textPrecio}>sede {item.sede}</Text>
          <Text style={styles.textPrecio}>fecha {item.fecha} - hora {item.hora}</Text>
          <Text style={styles.textPrecio}>Dirigido por {item.arbitro}</Text>
          
      </TouchableOpacity>       
    );

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Partidos</Text>
      <FlatList 
        data={data}
        renderItem={handleItem}
        keyExtractor={item => item.id}
      />
    </View>   
  )
}

export default ListPartidos


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
      fontSize:15,
      
    },
    txtDescripcion:{
      color:'white',
      fontSize:15,
    },
});