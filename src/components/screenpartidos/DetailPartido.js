import { View, Text, Image, TouchableOpacity,StyleSheet, } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { StyleLoginScreen } from '../../styles/StyleLoginScreen';


const DetailPartido = ({navigation}) => {

  const recibo = useRoute();
  const torneos = recibo.params.torneos;
  const data = recibo.params.data;

  const recibi = recibo.params.datos;
  const local = recibo.params.local;
  const visita = recibo.params.visita;

  useEffect(() => {

    // console.log('detalle partido : ', JSON.stringify(recibi, null, 4));
    // console.log('detalle local : ', JSON.stringify(local, null, 4));
    // console.log('detalle visita : ', JSON.stringify(visita, null, 4));

    
  }, [])
  

  return (
    
      <View
      style={styles.contenedor}
      >
        <View 
          style={styles.primerView}
        >
          <Text
          style={{
          color:'black',
          fontSize:24,   
          fontWeight: 'bold', 
          }}
          > 
          {recibi.torneo} 
        </Text>    
        </View>
        <View
          style={styles.segundoView}
        >
          <View
          style={styles.primeraColumna}
          >
            <View
              style={styles.filaPrimeraColumna}
            >
              <View
              style={styles.viewImagen}
              >
                <Image
                style={styles.image}
                source={{
                  uri: local[0].logo
                  }}
                  />
              </View>
              <View
              style={styles.viewNombreEquipo}
              >
                <Text
                style={styles.textoEquipo}
                > 
                {local[0].nombre} 
              </Text>
              </View>
              <View
               style={styles.viewGoles}
              >
                 <Text
                style={styles.textoGoles}
                > 
                {recibi.goles_local}
              </Text>

              </View>             
            </View>
            <View
            style={styles.filaPrimeraColumna}
            >
              <View
              style={styles.viewImagen}
              >
                <Image
                style={styles.image}
                source={{
                  uri: visita[0].logo,
                  cache: 'only-if-cached',
                  }}
                  
              />
              </View>
              <View
              style={styles.viewNombreEquipo}
              >
                <Text
                style={styles.textoEquipo}
                > 
                {visita[0].nombre} 
              </Text>
              </View>

              <View
              style={styles.viewGoles}
              >
                <Text
                style={styles.textoGoles}
                > 
                {recibi.goles_visita}
              </Text>
              </View>             
            </View>
          </View>
          <View
          style={styles.segundaColumna}
          >
            
            <Text
              style={{
              color:'white',
              fontSize:17,    
              fontWeight:'bold',
              
              }}
              > 
              {recibi.fecha} 
            </Text>
            <Text
              style={{
              color:'white',
              fontSize:17,    
              fontWeight: 'bold',
              }}
              > 
              {recibi.hora}
            </Text>
            <Text
            style={{
            color:'white',
            fontSize:17, 
            fontWeight: 'bold',   
            }}
          > 
          Partido 
        </Text>
        <Text
            style={{
            color:'white',
            fontSize:17, 
            fontWeight: 'bold',   
            }}
          > 
          {recibi.estado}
        </Text>    
          </View>
        </View>
        <View
          style={styles.tercerView}
        >
          <View
            style={{
              justifyContent:'center',
              alignItems:'center',
              backgroundColor:'#AAB7B8',
              width:'100%',
              paddingBottom:5
            }}
          >
          <Text
            style={{
            color:'#283747',
            fontSize:17,    
            fontWeight: 'bold',
            marginTop:15,
            
            }}
            > 
            Duracion {recibi.duracion} minutos de {recibi.tiempos}
          </Text>    
          <Text
            style={{
            color:'#283747',
            fontSize:17,    
            fontWeight: 'bold',
            
            }}
            > 
            Arbitro : {recibi.arbitro}
          </Text> 
          </View>
          
          <TouchableOpacity
            style={{
              width:'100%',
              alignSelf:'flex-end',
              
            }}

            onPress={()=>{
              navigation.navigate('PartidoListar', {data, torneos})
            }}
          >

          <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
          >
          <Text
            style={{
            color:'white',
            fontSize:17,    
            fontWeight: 'bold',
            
            }}
            > 
            VOLVER
          </Text>
          </LinearGradient>
        </TouchableOpacity>  
        </View>
      </View>
    
  )
}

export default DetailPartido

const styles = StyleSheet.create({

contenedor :{
  flex:1,
  backgroundColor:'white',
  flexDirection:'column',               
},  
primerView:{ // columan 1 donde esta nombre de torneo
  flexDirection:'row',
  height:'6%',
  justifyContent:'center',
  backgroundColor:'#AAB7B8',
 }
,
segundoView:{ // columna 2, donde estan datos de los equipos y partido
  // backgroundColor:'white',
  flexDirection:'row',
  height:'20%',
      },

tercerView:{ 
  flexDirection:'column',
  height:'74%',
  // justifyContent:'center',
  backgroundColor:'white',
  alignItems:'center'
},      

primeraColumna:{ // primera columna del View 2
  backgroundColor:'white',
  flexDirection:'column',
  width:'70%',
  height:'100%',
  
},
segundaColumna:{
  backgroundColor:'#5F6A6A',
  flexDirection:'column',
  width:'30%',
  height:'100%',
  alignItems:'center',
  justifyContent:'center',
  
},
filaPrimeraColumna:{
  flexDirection:'row',
  height:'50%',
  borderWidth:3,
  borderColor:'black',
  }, 
viewImagen:{
  width:'30%',
  height:'100%',

},
viewNombreEquipo:{
  width:'55%',
  height:'100%',
  padding:10,
  
},
viewGoles:{
  width:'15%',
  height:'100%',
  // padding:10,
  borderWidth:0.3,
  borderColor:'grey',
  justifyContent:'flex-end',
  flexDirection:'row'
},
image: {
  width: '100%',
  height: '100%',
  resizeMode : 'stretch', // es como el objetfit de css
  padding:5,
  // margin:3,
  borderRadius: 1,
  
},
textoEquipo:{
 color:'black',
 fontSize:17,    
 fontWeight: 'bold',
 alignSelf:'center'
 },
 textoGoles:{
  color:'black',
  fontSize:24,  
  alignSelf: "flex-end",
  marginRight:14,  
  fontWeight: 'bold', 
  alignSelf:'center'
  },
 
})

