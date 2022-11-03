import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    View, Text, FlatList, TouchableOpacity,StyleSheet,Alert
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

  const handleItemDetail = (datos) =>{

    console.log('detalles datos', datos)
    navigation.navigate('DetalleUnion', {datos});

  }

  const handleDeleteItem = (datos) =>{
    console.log('eliminar datos', datos);
    Alert.alert(
      `Se eliminara este partido`,
      '¿Esta seguro?', 
      [
        { text:"Cancelar", 
          style:'cancel'
        },
        { text:'Si, Eliminar',
          onPress: ()=>{ firestore().collection('partidos').doc(datos.key)
          .delete().then(()=>{
              Alert.alert(
                `Partido Eliminado!`)
            }) 
        },
          style:'destructive'
        },
      ]
    );
  }

  const handleEditItem = (datos) =>{
    console.log('edit datos', datos)
    navigation.navigate('EditarUnion', {datos});
  }

  const handleItem = ({item}) =>{

    return(
      <View
        style={{flexDirection:'column',
         margin:2,
         alignItems: "center",}}
      >
        <View
          style={{
          flexDirection:'row',
          height:70           
          }}
        >
       
            <View
              style={{
                width:'70%',
                backgroundColor:'#138D75',
                justifyContent:'center', 
                flexDirection:'column',               
              }}
            >              
              <View style={{
                backgroundColor:'#B2BABB',
                justifyContent:'center',
                alignItems:'center'}}>
                <Text style={{
                  color:'white',
                  fontSize:17,

                }}>Torneo - sede {item.sede}</Text>
              </View>
              <View style={{
                backgroundColor:'#7DCEA0',
                // justifyContent:'center',
                // alignItems:'center',
                flexDirection:'row',
                }}>
                  <View
                    style={{
                      width:'45%',
                      justifyContent:'center',
                      alignItems:'center',}}
                  >
                    <Text
                    style={{
                      color:'#283747',
                      fontSize:17,
    
                    }}
                    >{item.local}</Text>    
                  </View>
                  <View
                    style={{
                      width:'10%',backgroundColor:'#D0D3D4',
                      justifyContent:'center',
                      alignItems:'center',
                    }}
                  >
                    <Text> vs </Text>    
                  </View>
                  <View
                    style={{width:'45%',
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                    <Text
                    style={{
                      color:'#283747',
                      fontSize:17,
    
                    }}
                    > {item.visitante}</Text>    
                  </View>
                
              </View>
              <View style={{
                backgroundColor:'#27AE60',
                justifyContent:'center',
                alignItems:'center'}}>
                <Text style={{
                  color:'white',
                  fontSize:17,}}>{item.fecha} - {item.hora}</Text></View>
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
                backgroundColor:'blue',
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
    backgroundColor:'#138D75'
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