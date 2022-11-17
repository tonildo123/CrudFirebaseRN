import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Modal,
  ImageBackground,
  Alert,
} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRoute} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StyleLoginScreen } from '../../styles/StyleLoginScreen';

const ClubeScreen2 = ({navigation}) => {
  const currentUser = useSelector(state => state.CurrentUser);

  const recibo = useRoute();
  const recibi = recibo.params.enviar;
  const recibiuniones = recibo.params.data;
  
  const name = recibi.nombre;
  const acronimo = recibi.acronimo;
  const cuit = recibi.cuit;
  const telefono = recibi.telefono;
  const domicilio = recibi.domicilio;
  const pais=recibi.pais;
  const provincia=recibi.provincia;

  const [showfecha, setShowFecha] = useState(false); // timepicker
  const [fecha, setFecha] = useState(null); // timepicker
  const [deporte, setDeporte] = useState([{label: 'Rugby', value: 132}]); // dropdown
  const [itemDeporte, setItemDeporte] = useState('');
 
  const [logo, setLogo] = useState('https://via.placeholder.com/200'); // seleccionar imagen
  
  ///////////////////////////
  const [openDeporte, setOpenDeporte] = useState(false);
  const [valuedep, setValueDep] = useState(null);
  const [isLoading,setIsLoading ] = useState(false);


  const [listaunion, setListaUniones] = useState();
  const [itemUnion, setItemUnion] = useState('');
  const [valueUnion, setValueUnion] = useState(null);
  const [openUnion, setOpenUnion] = useState(false);
  
  ///////////////////////////
  
  const [datos, setDatos] = useState({
    fecha: '',
    deporte: '',
    pais: '',
    provincia: '',
    logo: '',
  });
 
  ////////////////

  let otro_array = [];
  
  
  useEffect(() => {

    
    console.log('datos de la primera pantalla', recibi);
    console.log('uniones recibidas', recibiuniones);

    const items = []
    recibiuniones.map(item => {
        items.push({ label: item.nombre, value: item.idUnion })
    })

    setListaUniones(items)



  }, []);

  
  ///////////////////////////////


  const PreContinue = () => {
    setIsLoading(true);

    console.log('id 1', currentUser.user.idUsuario);
    console.log('id2', valueUnion);
    console.log('nombre', name);
    console.log('acrnimi', acronimo);
    console.log('cuit', cuit);
    console.log('tel', telefono);
    console.log('domicilio', domicilio);
    console.log('fecha', fecha.day + '/' + fecha.month + '/' + fecha.year);
    console.log('deporte', itemDeporte);
    console.log('pais', pais);
    console.log('provincia', provincia);
    console.log('logo', logo);
    handleContinue();
  };
  const handleContinue = async () => {
    try {
      firestore()
        .collection('clubes')
        .add({
          idClub: currentUser.user.idUsuario + cuit,
          idUnion: valueUnion,
          nombre: name,
          acronimo: acronimo,
          cuit: cuit,
          telefono: telefono,
          domicilio: domicilio,
          fechaIn: fecha.day + '/' + fecha.month + '/' + fecha.year,
          deporte: itemDeporte,
          pais: pais,
          puntos:0,
          provincia: provincia,
          logo: logo,
        });
    } catch (error) {
      console.log('error al subir datos', error);
      Alert.alert('Error al crear Union')
      setIsLoading(false);
    } finally {
      setLogo('https://via.placeholder.com/200');
      console.log('subido con exito!');
      setIsLoading(false);
      Alert.alert(
        "Exito!",
        "Club creado correctamente!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => navigation.navigate('Home')}
        ]
      );
    }
  };

  
  const handleImagen = () => {
    const options = {
      title: 'Seleccione una imagen',
      storageOption: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      console.log('response = ' + response);

      if (response.errorCode) {
        console.log('response error= ' + response.errorCode);
      } else if (response.didCancel) {
        console.log('user cancel action ');
      } else {
        const path = response.assets[0].uri;
        setLogo(path);
      }
    });
  };

  return (
    <View style={styles.slide1}>
      <ImageBackground
        source={require('../../assets/altas.jpeg')}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.text}>Ultimo paso</Text>
        <TouchableOpacity
          style={{
            // backgroundColor: '#6A5ACD',
            borderRadius: 15,
            marginVertical: 20,
            padding: 10,
            width: '100%',
            alignItems: 'center',
          }}
          onPress={() => {
            setShowFecha(!showfecha);
          }}>
            <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
            >
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold',}}>
          {
              (fecha == undefined)
              ? 'FECHA DE INAUGURACION' : `${fecha.day<10 ? '0'+fecha.day: fecha.day}/${fecha.month<10 ? '0'+fecha.month: fecha.month}/${fecha.year} `
         }
          </Text>
          </LinearGradient>
        </TouchableOpacity>
        <Modal visible={showfecha} animationType="fade">
          <Calendar
            style={{borderRadius: 10, elevation: 5, margin: 40}}
            onDayPress={date => {
              console.log(date);
              setFecha(date);
              setShowFecha(false);
            }}
          />
        </Modal>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '100%'}}>
            <DropDownPicker
              placeholder="Deporte"
              open={openDeporte}
              value={valuedep}
              items={deporte}
              setOpen={setOpenDeporte}
              setValue={setValueDep}
              onSelectItem={item => {
                setItemDeporte(item.label);
              }}
            />
          </View>
          
        </View>
        <View style={{margin: '3%'}}>
          <Button title="Seleccionar una imagen" onPress={handleImagen} color="#28B463"/>
          <Image
            style={{
              alignSelf: 'center',
              height: 200,
              width: 200,
            }}
            source={{uri: logo}}
          />
        </View>
        <View style={{width: '100%'}}>        
            <DropDownPicker
              placeholder="Union"
              open={openUnion}
              value={valueUnion}
              items={listaunion}
              setOpen={setOpenUnion}
              setValue={setValueUnion}
              onSelectItem={item => {
                setItemUnion(item.label);
              }}
            />          
        </View>

        <TouchableOpacity onPress={PreContinue} style={styles.button}>
        <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
            >
          {isLoading ? (
            <Text style={styles.textButton}>Cargando...</Text>
          ) : (
            <Text style={styles.textButton}>Continuar</Text>
          )}
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default ClubeScreen2;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: '3%',
    borderWidth: 2,
    padding: '5%',
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white',
    opacity: 0.4,
    lineHeight: 84,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  slide1: {
    flex: 1,
    paddingTop: 20,
  },
  slide2: {
    flex: 1,
    padding: 20,
    backgroundColor: 'grey',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  text2: {
    color: 'white',
    fontSize: 21,
    lineHeight: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
    opacity: 0.8,
  },
  button: {
    alignItems: 'center',
    // backgroundColor: '#6A5ACD',
    // borderWidth: 4,
    borderRadius: 5,
    padding: '5%',
    // margin: '5%',
    // fontSize:50,
  },
  textButton: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    // backgroundColor: '#6A5ACD',
    fontWeight: 'bold',
    borderRadius: 10,
  },
});
