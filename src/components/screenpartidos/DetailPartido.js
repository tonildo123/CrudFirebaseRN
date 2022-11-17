import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

const DetailPartido = () => {

  const recibo = useRoute();
  const recibi = recibo.params.datos;
  const local = recibo.params.local;
  const visita = recibo.params.visita;

  useEffect(() => {

    console.log('detalle partido : ', JSON.stringify(recibi, null, 4));
    console.log('detalle local : ', JSON.stringify(local, null, 4));
    console.log('detalle visita : ', JSON.stringify(visita, null, 4));
    
  }, [])
  

  return (
    <View
      style={{flex:1}}
    >
      <View>
        <Text
          style={{
          color:'#283747',
          fontSize:17,    
          }}
          > 
          {recibi.fecha} - {recibi.hora}
        </Text>    
      </View>
      <View>
        <Text
          style={{
          color:'#283747',
          fontSize:17,    
          }}
          > 
          {recibi.local} {recibi.gol_local} -  {recibi.visitante} {recibi.gol_visitante}
        </Text>
      </View>
      <View>
        <Text
          style={{
          color:'#283747',
          fontSize:17,    
          }}
          > 
          Duracion {recibi.duracion} - de {recibi.tiempos}
        </Text>    
      </View>      
      <View>
        <Text
          style={{
          color:'#283747',
          fontSize:17,    
          }}
          > 
          Arbitro - {recibi.arbitro}
        </Text>    
      </View>
      <View>
        <Text
          style={{
          color:'#283747',
          fontSize:17,    
          }}
          > 
          Partido - {recibi.estado}
        </Text>    
      </View>
      <View>
        <Text
          style={{
          color:'#283747',
          fontSize:17,    
          }}
          > 
          Volver
        </Text>    
      </View>
    </View>
  )
}

export default DetailPartido