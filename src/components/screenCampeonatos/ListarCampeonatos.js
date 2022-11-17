import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    View, Text, FlatList,
     Image, TouchableOpacity,StyleSheet,Alert
     ,ActivityIndicator
 } from 'react-native';
 import LinearGradient from 'react-native-linear-gradient';
import { StyleLoginScreen } from '../../styles/StyleLoginScreen';

const ListarCampeonatos = () => {
  const [data, setData] =  useState();

  const getProdcuts = async () =>{
    const suscriber = firestore().collection('torneo').
    onSnapshot(
      querySnapshot => {

        const torneos = [];
        querySnapshot.forEach(
          documentSnapshot => {
            torneos.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id 
            })
              

          }
        )
        setData(torneos);
      }
    )

    return () => suscriber()
  }

  
  useEffect(() => {
    getProdcuts();
  }, [])
 
  
  const handleItemDetail = (datos) =>{

    console.log('detalles datos', datos)
    console.log('id torneo', datos.key)

    // navigation.navigate('detalleTorneo', {datos});

  }

  const handleDeleteItem = (datos) =>{
    console.log('eliminar datos', datos);
    Alert.alert(
      `Se eliminara ${datos.nombre}`,
      '¿Esta seguro?', 
      [
        { text:"Cancelar", 
          style:'cancel'
        },
        { text:'Si, Eliminar',
          onPress: ()=>{ firestore().collection('torneo').doc(datos.key)
          .delete().then(()=>{
              Alert.alert(
                `${datos.acronimo} Eliminado!`)
            }) 
        },
          style:'destructive'
        },
      ]
    );
  }

  const handleEditItem = (datos) =>{
    console.log('edit datos', datos)
    // navigation.navigate('EditarPartido', {datos});
  }

  const handleItem = ({item}) =>{

    return(
      <View
        key={item.key}
        style={{flexDirection:'column', margin:5,alignItems: "center",}}
      >
        <View
          style={{
          flexDirection:'row',
          height:50           
            }}
        >
            <View
              style={{
                width:'45%',
                backgroundColor:'grey',
                justifyContent:'center',                
              }}
            >              
              <Text style={styles.txtDescripcionNombre}>{item.nombre}</Text>
            </View>
            <View
              style={{
                width:'25%',
                backgroundColor:'grey',
                justifyContent:'center',                
              }}
            >              
              <Text style={styles.txtDescripcionNombre}>sede - {item.pais}</Text>
            </View>
            <View
              style={{
                width:'10%',
                backgroundColor:'orange',
                justifyContent:'center',
                alignItems:'center'
              }}
            >
              <TouchableOpacity
                onPress={()=>{handleItemDetail(item)}}
              >
                <FontAwesome
                  name="align-justify"
                  color='white'
                  size={20}
                />
              </TouchableOpacity>
              
            </View>
            <View
              style={{
                width:'10%',
                backgroundColor:'red',
                justifyContent:'center',
                alignItems:'center'
              }}
            >
              <TouchableOpacity
                onPress={()=>{handleDeleteItem(item)}}
              >
                <FontAwesome
                  name="trash-o"
                  color='white'
                  size={20}
                />
              </TouchableOpacity>
              
            </View>
            <View
              style={{
                width:'10%',
                backgroundColor:'#76448A',
                justifyContent:'center',
                alignItems:'center'                
              }}
            >
              <TouchableOpacity
                onPress={()=>{handleEditItem(item)}}
              >
                <FontAwesome
                  name="edit"
                  color='white'
                  size={20}
                />
              </TouchableOpacity>
              
            </View>
          </View>
      </View>       
    );

  }

  return (
    <View style={styles.container}>

          {
            (data==undefined)
            ?<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color='white' />
            </View> 
            :<View style={{
              
            }}
              >
              <LinearGradient
            colors={['#28B463', '#0E6251']}
            style={StyleLoginScreen.signIn}
            >
            <Text style={styles.title}>Torneos</Text>
            </LinearGradient>
            <FlatList 
              data={data}
              renderItem={handleItem}
              keyExtractor={item => item.id}
            />
            </View>
          }
          
          
    </View>   
  )
}

export default ListarCampeonatos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'grey'
  },
  title:{
    marginTop: 1,
    // paddingVertical: 8,
    // borderWidth: 4,
    // borderColor: "#20232a",
    borderRadius: 6,
    // backgroundColor: "#283747",
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode : 'cover', // es como el objetfit de css
    padding:5,
    margin:3,
    borderRadius: 1,
    
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
      fontSize:20,
    },
    txtDescripcionNombre:{
      // backgroundColor:'black',
      color:'white',
      fontSize:15,
      margin:2, 
      paddingLeft:2
    },
});