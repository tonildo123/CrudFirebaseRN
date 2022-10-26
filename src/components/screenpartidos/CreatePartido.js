import React, { useState, useEffect} from 'react';
import {
  View, Text, StyleSheet, TextInput, 
  ImageBackground, 
  TouchableOpacity, Button,
  Modal
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker'
import firestore from '@react-native-firebase/firestore';
import Moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CreatePartido = ({navigation}) => {

  const [data, setData] = useState(); 

  const [name, setName] = useState("Arbitro"); 
  const [showHora, setShowHora] = useState(false); // timepicker
  const [showfecha, setShowFecha] = useState(false); // timepicker
  const [fecha, setFecha] = useState(null); // timepicker
  const [hora, setHora] = useState(null); // timepicker
  const [tiempos, setTiempos] = useState([
    {label:'Un tiempo', value:1},
    {label:'Dos tiempos', value:2},
    {label:'Tres tiempos', value:3},
  ]); // dropdown cuantos tiempos
  const [openTiempos, setOpenTiempos] = useState(false);
  const [valueTiempos, setValueTiempos] = useState(null);
  const [itemTiempos, setItemTiempos] = useState(''); 
  //------------------------------------------------------//
  const [duracion, setDuracion] = useState([
    {label:'Un tiempo de 70', value:11},
    {label:'Dos tiempos 35', value:22},
    {label:'Tres tiempos 25-25-20', value:33},
  ]); // dropdown duracion
  const [openDuracion, setOpenDuracion] = useState(false);
  const [valueDuracion, setValueDuracion] = useState(null);
  const [itemDuracion, setItemDuracion] = useState(''); 
  //------------------------------------------------------//
  const [local, setLocal] = useState([
    
  ]); // dropdown equipo local
  const [openLocal, setOpenLocal] = useState(false);
  const [valueLocal, setValueLocal] = useState(null);
  const [itemLocal, setItemLocal] = useState(''); 
  //------------------------------------------------------//
  const [visitante, setVisitante] = useState([
    
  ]); // dropdown equipo visitante
  const [openVisitante, setOpenVisitante] = useState(false);
  const [valueVisitante, setValueVisitante] = useState(null);
  const [itemVisitante, setItemVisitante] = useState(''); 
  //------------------------------------------------------//
  const [sede, setSede] = useState([
    
  ]); // dropdown sede   
  const [openSede, setOpenSede] = useState(false);
  const [valueSede, setValueSede] = useState(null);
  const [itemSede, setItemSede] = useState(''); 
  //------------------------------------------------------//

  const [isLoading, setIsLoading] = useState(false);
    
  
  const [datos, setDatos] = useState({
    
        fecha:'',
        deporte:'',
        pais:'',
        provincia:'',
        logo:'',
     
  });

  /////////////////

  useEffect(() => {
    getProdcuts();

  }, [])

/////////////////
/// traigo los clubes y uniiones 
const getProdcuts = async () =>{
  const suscriber = firestore().collection('clubes').
  onSnapshot(
    querySnapshot => {

      const clubes = [];
      querySnapshot.forEach(
        documentSnapshot => {
          clubes.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id 
          })
            

        }
      )
      console.log('clubes', clubes)
  
      setData(clubes);
    }
  )

  return () => suscriber()
}
//////////////////

const handleContinue = () =>{

console.log(name);



loadingData();

}
//////////////////
const loadingData = ()=>{


const enviar = {
  nombre:name,
  acronimo:acronimo,
  cuit:cuit ,
  telefono:telefono,
  domicilio:domicilio,

}

navigation.navigate('UnionesAlta', {enviar})

}
  return (
<View
  style={{
    flex:1
  }}
>
    {
      isLoading
      ? <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black'

      }}>
          <Text
            style={{
              color:'white',
              fontSize:30,
              
            }}
          > Cargando..  </Text>
        </View>
      :<View style={styles.slide1}>
        
      <Text style={styles.text}>Datos del partido</Text>
      <TouchableOpacity
        style={{
          backgroundColor:'red',
          borderRadius:15,
          marginVertical:5,
          padding:10, 
          width:'100%',
          alignItems:'center',

        }}
        onPress={()=>{
          setShowFecha(!showfecha);
        }}
      >
        <Text 
        style={{fontSize:24, color:'white'}}
        >Fecha del Partido</Text>
      </TouchableOpacity>  
      <Modal visible={showfecha} animationType='fade'>
          <Calendar style={{borderRadius:10, elevation:5,margin:40,}}
            onDayPress={(date)=>{console.log(date); setFecha(date); setShowFecha(false); }}            
          />
      </Modal>
      <TouchableOpacity
        style={{
          backgroundColor:'red',
          borderRadius:15,
          marginVertical:5,
          padding:10, 
          width:'100%',
          alignItems:'center',

        }}
        onPress={()=>{
          setShowFecha(!showfecha);
        }}
      >
        <Text 
        style={{fontSize:24, color:'white'}}
        >Horario del partido</Text>
      </TouchableOpacity>  
      <Modal visible={showHora} animationType='fade'>
          <Calendar style={{borderRadius:10, elevation:5,margin:40,}}
            onDayPress={(date)=>{console.log(date); setHora(date); setShowHora(false); }}            
          />
      </Modal>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <View style={{flexDirection:'row', padding:10}}>
        <View style={{width:'33%'}}>
            <DropDownPicker
            placeholder="Local"
            open={openLocal}
            value={valueLocal}
            items={local}
            setOpen={setOpenLocal}
            setValue={setValueLocal}
            onSelectItem={(item)=>{setItemLocal(item.label)}}
            />
        </View>
        <View style={{width:'34%'}}>
          <DropDownPicker
            placeholder="Visitante"
            open={openVisitante}
            value={valueVisitante}
            items={visitante}
            setOpen={setOpenVisitante}
            setValue={setValueVisitante}
            onSelectItem={(item)=>{setItemVisitante(item.label)}}
          />
        </View>
        <View style={{width:'33%'}}>
            <DropDownPicker
            placeholder="Sede"
            open={openSede}
            value={valueSede}
            items={sede}
            setOpen={setOpenSede}
            setValue={setValueSede}
            onSelectItem={(item)=>{setItemSede(item.label)}}
            />
        </View>
      </View>

      {//---------------------------------------------
      }
      <View style={{flexDirection:'row', padding:10}}>
        <View style={{width:'50%'}}>
            <DropDownPicker
            placeholder="Duracion"
            open={openDuracion}
            value={valueDuracion}
            items={duracion}
            setOpen={setOpenDuracion}
            setValue={setValueDuracion}
            onSelectItem={(item)=>{setItemDuracion(item.label)}}
            />
        </View>
        <View style={{width:'50%'}}>
          <DropDownPicker
            placeholder="Tiempos"
            open={openTiempos}
            value={valueTiempos}
            items={tiempos}
            setOpen={setOpenTiempos}
            setValue={setValueTiempos}
            onSelectItem={(item)=>{setItemTiempos(item.label)}}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleContinue}
        style={styles.button}
      >
        <Text style={styles.textButton}>Continuar</Text>
      </TouchableOpacity>
    </View>
    }
    </View>
    
  )
}

export default CreatePartido


const styles = StyleSheet.create({
    
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color:'white',
      fontSize:15
    },
  slide1: {
    flex: 1,
    paddingTop:20,
    backgroundColor: 'grey'
  },
  slide2: {
    flex: 1,
    padding:20,
    backgroundColor: 'grey'
    
  },
  slide3: {
    flex: 1,
    padding:20,
    backgroundColor: 'grey'
  },
  slide4: {
      flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
    
    backgroundColor: 'grey'
    },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  }, 
  button: {
    alignItems: "center",
    backgroundColor: "#85929E",    
    borderRadius: 10,
    padding:20,
    margin:10,
  },
  textButton:{
    fontSize:20,
    color:'white',
  }
})