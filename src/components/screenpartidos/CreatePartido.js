import React, { useState, useEffect} from 'react';
import {
  View, Text, StyleSheet, TextInput, 
  TouchableOpacity, 
  Modal,
  Alert
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import firestore from '@react-native-firebase/firestore';

import {Calendar} from 'react-native-calendars';
import {useRoute} from '@react-navigation/native';

const CreatePartido = () => {

  const recibo = useRoute();
  
  const clubes = recibo.params.data;



  const [horapicker, setHorapicker] = useState([
    {label:'08', value:8},
    {label:'09', value:9},
    {label:'10', value:10},
    {label:'11', value:11},
    {label:'12', value:12},
    {label:'13', value:13},
    {label:'14', value:14},
    {label:'15', value:15},
    {label:'16', value:16},
    {label:'17', value:17},
    {label:'18', value:18},
    {label:'19', value:19},
    {label:'20', value:20},
    {label:'21', value:21},
    {label:'22', value:22},
    {label:'23', value:23},
    
  ]); 
  const [openhorapicker, setOpenhorapicker] = useState(false);
  const [valuehorapicker, setValuehorapicker] = useState(null);
  

  ////////////////////////
  const [minutospicker, setMinutospicker] = useState([
    {label:'00', value:1},
    {label:'15', value:15},
    {label:'30', value:30},
    {label:'45', value:45},
    
  ]); 
  const [openminutospicker, setOpenminutospicker] = useState(false);
  const [valueminutospicker, setValueminutospicker] = useState(null);
  
//////////////////////////
  const [name, setName] = useState("Arbitro"); 
  const [showHora, setShowHora] = useState(false); // timepicker
  const [showfecha, setShowFecha] = useState(false); // timepicker
  const [fecha, setFecha] = useState(); // timepicker
  const [hora, setHora] = useState(); // timepicker
  const [minutos, setMinutos] = useState(); // timepicker
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
  const [local, setLocal] = useState(); // dropdown equipo local
  const [openLocal, setOpenLocal] = useState(false);
  const [valueLocal, setValueLocal] = useState(null);
  const [itemLocal, setItemLocal] = useState(''); 
  //------------------------------------------------------//
  const [visitante, setVisitante] = useState(); // dropdown equipo visitante
  const [openVisitante, setOpenVisitante] = useState(false);
  const [valueVisitante, setValueVisitante] = useState(null);
  const [itemVisitante, setItemVisitante] = useState(''); 
  //------------------------------------------------------//
  const [sede, setSede] = useState(); // dropdown sede   
  const [openSede, setOpenSede] = useState(false);
  const [valueSede, setValueSede] = useState(null);
  const [itemSede, setItemSede] = useState(''); 
  //------------------------------------------------------//

  const [isLoading, setIsLoading] = useState(false);

  /////////////////

  useEffect(() => {

    const items = []
    clubes.map(item => {
      items.push({ label: item.acronimo, value: item.idClub })
    });

    setVisitante(items)
    setLocal(items)
    setSede(items)

  }, [])



const handleContinue = () =>{

  const cargardatos = {
    fecha:`${fecha.day<10 ? '0'+fecha.day: fecha.day}/${fecha.month<10 ? '0'+fecha.month: fecha.month}/${fecha.year} `,
    hora:`${hora}:${minutos}`,
    local:itemLocal ,
    visitante:itemVisitante,
    sede:itemSede,
    tiempos:itemTiempos,
    duracion:itemDuracion ,
    arbitro:name,   
  
  }

  console.log('datos a cargar del partido', JSON.stringify(cargardatos, null, 4))
  setIsLoading(true);


loadingData();

}
//////////////////
const loadingData = async()=>{


  try {
    firestore()
    .collection('partidos').add({
    fecha:`${fecha.day<10 ? '0'+fecha.day: fecha.day}/${fecha.month<10 ? '0'+fecha.month: fecha.month}/${fecha.year} `,
    hora:`${hora}:${minutos}`,
    local:itemLocal ,
    visitante:itemVisitante,
    sede:itemSede,
    tiempos:itemTiempos,
    duracion:itemDuracion ,
    arbitro:name, 
  })
} catch (error) {
  console.log('error al subir datos', error)
  Alert.alert('Error al crear partido ')
  setIsLoading(false);
}finally{
  Alert.alert('Se creo el partido exitosamente')
  console.log('subido con exito!')
  setIsLoading(false);
  
}

}



  return (
<View
  style={{
    flex:1
  }}>  

    <View style={{flexDirection:'column',}}>
          <View style={{backgroundColor:'green', width:'100%', height:'20%'}}>
            <Text style={styles.text}>DATOS DEL PARTIDO</Text>
            <View
            style={{flexDirection:'row', padding:10}}
            >
              <TouchableOpacity
                    style={{
                      backgroundColor:'red',
                      borderRadius:15,
                      margin:5,
                      padding:10, 
                      width:'50%',
                      alignItems:'center',

                    }}
                    onPress={()=>{
                      setShowFecha(!showfecha);
                    }}
                  >
                    <Text 
                    style={{fontSize:24, color:'white'}}
                    >
                      {
                        (fecha == undefined)
                        ? 'FECHA' : `${fecha.day<10 ? '0'+fecha.day: fecha.day}/${fecha.month<10 ? '0'+fecha.month: fecha.month}/${fecha.year} `
                      }
                      </Text>
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
                      margin:5,
                      marginRight:5,
                      padding:10, 
                      width:'50%',
                      alignItems:'center',

                    }}
                    onPress={()=>{
                      setShowHora(!showHora);
                    }}
                  >
                    <Text 
                    style={{fontSize:24, color:'white'}}
                    >
                      {
                        (hora == undefined && minutos == undefined)
                        ? 'HORARIO' : `${hora} : ${minutos}`
                      }</Text>
                  </TouchableOpacity>  
                  <Modal visible={showHora} animationType='fade'>
                      <View style={{flexDirection:'row', padding:10}}>
                        <View style={{width:'50%'}}>
                            <DropDownPicker
                            placeholder="Hora"
                            open={openhorapicker}
                            value={valuehorapicker}
                            items={horapicker}
                            setOpen={setOpenhorapicker}
                            setValue={setValuehorapicker}
                            onSelectItem={(item)=>{
                              setHora(item.label)}}
                            />
                        </View>
                        <View style={{width:'50%'}}>
                          <DropDownPicker
                            placeholder="Minuto"
                            open={openminutospicker}
                            value={valueminutospicker}
                            items={minutospicker}
                            setOpen={setOpenminutospicker}
                            setValue={setValueminutospicker}
                            onSelectItem={(item)=>{
                              setMinutos(item.label)
                              setShowHora(false);
                              }}
                          />
                        </View>
                      </View>
                  </Modal>
            </View>                 
          </View>
          <View style={{backgroundColor:'#196F3D', width:'100%', height:'30%'}}>
              <View style={{flexDirection:'row', padding:10}}>
                <View style={{width:'50%'}}>
                    <DropDownPicker
                    placeholder="DURACION"
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
                    placeholder="TIEMPOS"
                    open={openTiempos}
                    value={valueTiempos}
                    items={tiempos}
                    setOpen={setOpenTiempos}
                    setValue={setValueTiempos}
                    onSelectItem={(item)=>{setItemTiempos(item.label)}}
                  />
                </View>
              </View>
          </View>
          <View style={{backgroundColor:'#196F3D', width:'100%', height:'30%'}}>
          <View style={{flexDirection:'row', padding:10}}>
        <View style={{width:'33%'}}>
            <DropDownPicker
            placeholder="LOCAL"
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
            placeholder="VISITANTE"
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
            placeholder="SEDE"
            open={openSede}
            value={valueSede}
            items={sede}
            setOpen={setOpenSede}
            setValue={setValueSede}
            onSelectItem={(item)=>{setItemSede(item.label)}}
            />
        </View>
      </View>      
      </View>
      <View style={{backgroundColor:'#196F3D', width:'100%', height:'20%'}}
        >
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
          <TouchableOpacity
              onPress={handleContinue}
              style={styles.button}
            > 
              <Text style={styles.textButton}>CONTINUAR</Text>
            </TouchableOpacity>
    </View>
    </View> 
    
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
    alignSelf:'center',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    padding:5
  }, 
  button: {
    alignItems: "center",
    backgroundColor: "red",    
    borderRadius: 10,
    padding:20,
    margin:10,
  },
  textButton:{
    fontSize:20,
    color:'white',
  }
})