import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    View, Text, FlatList, TouchableOpacity,StyleSheet,Alert
 } from 'react-native';
 import {useRoute} from '@react-navigation/native';
import { DrawerItemList } from '@react-navigation/drawer';

const ListPartidos = ({navigation}) => {

  const recibo = useRoute();
  
  const clubes = recibo.params.data;
  const torneo = recibo.params.torneos;
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

    // console.log('Torneo', JSON.stringify(torneo, null, 4));
    // console.log('club', JSON.stringify(clubes, null, 4));
    // console.log('datos ', JSON.stringify(datos, null, 4));
    
    const local = clubes.filter(item => item.key == datos.datos_local.key)
    const visita = clubes.filter(item => item.key == datos.datos_visita.key)
    console.log('local ', JSON.stringify(local, null, 4));
    console.log('visita ', JSON.stringify(visita, null, 4));

    navigation.navigate('DetallePartido', {datos, local, visita});

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
    navigation.navigate('DetallePartido', {datos});
  }

  const handleItem = ({item}) =>{

    return(
      <View
        // key={item.key}
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
                  <View
                  style={{flexDirection:'row'}}
                  >
                   <Text style={{
                    color:'white',
                    fontSize:17,
                    }}>{item.torneo} - Estado </Text>
                    <FontAwesome
                    name="circle"
                    color={item.estado == 'pendiente' ? 'white' : item.estado == 'terminado' ? '#5DADE2' : item.estado == 'suspendido' ? 'CB4335' : item.estado == 'en curso' ? '28B463' : 'white'}
                    size={20}
                    />
                  </View>
                
              </View>
              <View style={{
                backgroundColor:'#7DCEA0',
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
                    >{item.local}  {item.goles_local}</Text>    
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
                    >{item.goles_visita} {item.visitante}</Text>    
                  </View>                
              </View>
              <View style={{
                backgroundColor:'#27AE60',
                justifyContent:'center',
                alignItems:'center'}}>
                <Text style={{
                  color:'white',
                  fontSize:15,}}>{item.fecha} - {item.hora} - sede : {item.sede}</Text></View>
            </View>
            <View
              style={{
                width:'10%',
                height:'100%',
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
                height:'100%',
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
                height:'100%',
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
      <View 
        style={{
          flexDirection:'row',
        }}
      >
        <View 
        style={{
          flexDirection:'row',
          width:'25%'
        }}>
          
          <FontAwesome
            name="circle"
            color='white'
            size={20}
          />
          <Text
          style={styles.textEstado}
          >Pendiente</Text>
        </View>
        <View 
        style={{
          flexDirection:'row',
          width:'25%'
        }}>
          
          <FontAwesome
            name="circle"
            color='#5DADE2'
            size={20}
          />
          <Text
          style={styles.textEstado}
          >Terminado</Text>
        </View>
        <View 
        style={{
          flexDirection:'row',
          width:'25%'
        }}>
          
          <FontAwesome
            name="circle"
            color='#CB4335'
            size={20}
          />
          <Text
          style={styles.textEstado}
          >Suspendido</Text>
        </View>
        <View 
        style={{
          flexDirection:'row',
          width:'25%'
        }}>
          
          <FontAwesome
            name="circle"
            color='#28B463'
            size={20}
          />
          <Text
          style={styles.textEstado}
          >En curso</Text>
        </View>
      </View>
      <FlatList 
        // key={data}
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
    textEstado:{
      color:'white',
    }
});