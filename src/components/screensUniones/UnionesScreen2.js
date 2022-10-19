import React, { useState, useEffect} from 'react';
import {
  View, Text, Image, StyleSheet,
  TouchableOpacity, Button,
  Modal
} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker'
import firestore from '@react-native-firebase/firestore';
import Moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';





const UnionesScreen2 = ({navigation}) => {

  const currentUser = useSelector(state => state.CurrentUser)

    let date = new Date();  
    let Fecha = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
    let startdate = Moment();
        // startdate = startdate.subtract(7, "days");
        // startdate = startdate.format("DD-MM-YYYY");

    const recibo = useRoute();
    const recibi = recibo.params.enviar;
    
    const name=recibi.nombre;
    const acronimo=recibi.acronimo;
    const cuit=recibi.cuit;
    const telefono=recibi.telefono;
    const domicilio=recibi.domicilio;

    const [showfecha, setShowFecha] = useState(false); // timepicker
    const [fecha, setFecha] = useState(null); // timepicker
    const [deporte, setDeporte] = useState([
        {label:'Rugby', value:132},
        
    ]); // dropdown
    const [itemDeporte, setItemDeporte] = useState(''); 
    const [pais, setPais] = useState([
        {label:'Argentina', value:'456'}
    ]); //dropdown
    const [itemPais, setItemPais] = useState('');
    const [provincia, setProvincia] = useState([
        {label:'Tucuman', value:1},
        {label:'Catamarca', value:2},
        {label:'Salta', value:3},
    ]); //dropdown
    const [itemProvincia, setItemProvincia] = useState('');
    const [logo, setLogo] = useState('https://via.placeholder.com/200'); // seleccionar imagen

    ///////////////////////////
    const [openDeporte, setOpenDeporte] = useState(false);
    const [valuedep, setValueDep] = useState(null);
    const [openPro, setOpenProv] = useState(false);
    const [valueProv, setValuePrv] = useState(null);
    const [openPais, setOpenPais] = useState(false);
    const [valuePais, setValuePais] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    
    ///////////////////////////
    

    const [datos, setDatos] = useState({
    
        fecha:'',
        deporte:'',
        pais:'',
        provincia:'',
        logo:'',
     
  });

  /////////////////

  useEffect(() => {

    console.log('llegan de la primera pantalla', JSON.stringify(recibo, null, 3));
    console.log('nombre', JSON.stringify(name, null, 3));    
    console.log('obtengo x redux', JSON.stringify(currentUser, null, 3));

    
  }, [])
  
const PreContinue =()=>{

  setIsLoading(true);

      console.log('id 1', currentUser.user.idUsuario)
      console.log('id2', currentUser.user.idUsuario+cuit)
      console.log('nombre', name)
      console.log('acrnimi', acronimo)
      console.log('cuit', cuit)
      console.log('tel', telefono)
      console.log('domicilio', domicilio)
      console.log('fecha', fecha.day+'/'+fecha.month+'/'+fecha.year)
      console.log('deporte', itemDeporte)
      console.log('pais', itemPais)
      console.log('provincia', itemProvincia)
      console.log('logo', logo)
      handleContinue();
}
const handleContinue = async() =>{

       

try {
    firestore()
    .collection('uniones').add({
      idusuario:currentUser.user.idUsuario,
      idUnion:currentUser.user.idUsuario+cuit,
      nombre:name,
      acronimo:acronimo,
      cuit:cuit,
      telefono:telefono,
      domicilio:domicilio,
      fechaIn: fecha.day+'/'+fecha.month+'/'+fecha.year,
      deporte:itemDeporte,
      pais:itemPais,
      provincia:itemProvincia,
      logo:logo,
  })
} catch (error) {
  console.log('error al subir datos', error)
  setIsLoading(false);
}finally{

  setLogo('https://via.placeholder.com/200');
  console.log('subido con exito!')
  setIsLoading(false);
  
}

}


//  navigation.navigate('Registerdos', {enviar})


// selecciona una imagen
const handleImagen = () =>{

    const options = {
      title:'Seleccione una imagen',
      storageOption:{
        skipBackup:true,
        path:'images',
      },
    };

    launchImageLibrary(options, response =>{
      console.log('response = ' + response);

        if(response.errorCode){
          console.log('response error= '+response.errorCode);
        }else if(response.didCancel){
          console.log('user cancel action ');
        }else{
          const path = response.assets[0].uri;
          setLogo(path);
          
        }

    });


  };


  return (
    <View style={styles.slide1}>
      <Text style={styles.text}>Ultimo paso</Text>
      <TouchableOpacity
        style={{
          backgroundColor:'red',
          borderRadius:15,
          marginVertical:20,
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
        >Fecha de inauguracion</Text>
      </TouchableOpacity>  
      <Modal visible={showfecha} animationType='fade'>
          <Calendar style={{borderRadius:10, elevation:5,margin:40,}}
            onDayPress={(date)=>{console.log(date); setFecha(date); setShowFecha(false); }}            
          />
      </Modal>
      <View style={{flexDirection:'row', padding:10}}>
        <View style={{width:'33%'}}>
            <DropDownPicker
            placeholder="Deporte"
            open={openDeporte}
            value={valuedep}
            items={deporte}
            setOpen={setOpenDeporte}
            setValue={setValueDep}
            onSelectItem={(item)=>{setItemDeporte(item.label)}}
            />
        </View>
        <View style={{width:'34%'}}>
          <DropDownPicker
          placeholder="Pais"
          open={openPais}
          value={valuePais}
          items={pais}
          setOpen={setOpenPais}
          setValue={setValuePais}
          onSelectItem={(item)=>{setItemPais(item.label)}}
          />
        </View>
        <View style={{width:'33%'}}>
            <DropDownPicker
            placeholder="Provincia"
            open={openPro}
            value={valueProv}
            items={provincia}
            setOpen={setOpenProv}
            setValue={setValuePrv}
            onSelectItem={(item)=>{setItemProvincia(item.label)}}
            />
        </View>
      </View>
      

      <View>
      <Button
        title='Seleccionar una imagen'
        onPress={handleImagen}
      />
      <Image 
      style={{
        alignSelf:'center',
        height:200,
        width:200,
      }}
      source = {{uri:logo}}
      />
      </View>
      

      <TouchableOpacity
        onPress={PreContinue}
        style={styles.button}
      >
        {
          (isLoading) ? <Text style={styles.textButton}>Cargando...</Text>
                      : <Text style={styles.textButton}>Continuar</Text>
        }
        
      </TouchableOpacity>
    </View>
  )
}

export default UnionesScreen2

const styles = StyleSheet.create({
    // wrapper: {},
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
    //   justifyContent: 'center',
    //   alignItems: 'center',
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
      backgroundColor: "blue",    
      // borderWidth: 4,
      borderRadius: 10,
      padding:20,
      margin:10,
      // fontSize:50,
      
    },
    textButton:{
      fontSize:20,
      color:'white',
    }
  })