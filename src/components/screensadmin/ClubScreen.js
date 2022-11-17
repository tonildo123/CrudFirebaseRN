import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { StyleLoginScreen } from '../../styles/StyleLoginScreen';
import DropDownPicker from 'react-native-dropdown-picker';


const ClubScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [acronimo, setAcronimo] = useState('');
  const [cuit, setCuit] = useState('');
  const [telefono, setTelefono] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [data, setData] = useState();

  /////////////dropdown pais prov 
  const [pais, setPais] = useState([{label: 'Argentina', value: '456'}]); //dropdown
  const [itemPais, setItemPais] = useState('');
  const [provincia, setProvincia] = useState([
    {label: 'Tucuman', value: 1},
    {label: 'Catamarca', value: 2},
    {label: 'Salta', value: 3},
  ]); //dropdown
  const [itemProvincia, setItemProvincia] = useState('');
  const [openPro, setOpenProv] = useState(false);
  const [valueProv, setValuePrv] = useState(null);
  const [openPais, setOpenPais] = useState(false);
  const [valuePais, setValuePais] = useState(null);
  
  useEffect(() => {
    getUniones();
  }, []);


  const getUniones = ()=>{
    const suscriber = firestore().collection('uniones').
    onSnapshot(
      querySnapshot => {

        const uniones = [];
        querySnapshot.forEach(
          documentSnapshot => {
            uniones.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id 
            })
              

          }
        )
        console.log('uniones : ', uniones)
        setData(uniones);
      }
    )

    return () => suscriber()
  }
  /////////////////

  const handleContinue = () => {
    console.log(name);

    loadingData();
  };
  //////////////////
  const loadingData = () => {
    const enviar = {
      nombre: name,
      acronimo: acronimo,
      cuit: cuit,
      telefono: telefono,
      domicilio: domicilio,
      pais:itemPais,
      provincia:itemProvincia,
    };

    navigation.navigate('ClubAlta', {enviar, data});
  };

  const handleMensaje = ()=>{

    Alert.alert('Cargando datos!')

  }

  return (
    <ScrollView>
    <View style={styles.slide1}>
        <Text style={styles.text}>Datos del Club</Text>
        <SafeAreaView>
        <View>
          <Text style={styles.text2}>Nombre: </Text>
          <TextInput
            style={styles.input}
            placeholder='NOMBRE'
            placeholderTextColor='grey'
            onChangeText={setName}
            value={name}
          />
        </View>
        <View>
          <Text style={styles.text2}>Acronimo: </Text>
          <TextInput
            style={styles.input}
            placeholder='ACRONIMO'
            placeholderTextColor='grey'
            onChangeText={setAcronimo}
            value={acronimo}
          />
        </View>
        <View>
          <Text style={styles.text2}>CUIT: </Text>

          <TextInput
            style={styles.input}
            placeholder='CUIT'
            placeholderTextColor='grey'
            onChangeText={setCuit}
            value={cuit}
          />
        </View>
        <View>
          <Text style={styles.text2}>Telefono: </Text>

          <TextInput
            style={styles.input}
            onChangeText={setTelefono}
            placeholder='TELEFONO'
            placeholderTextColor='grey'
            value={telefono}
          />
        </View>
        <View>
          <Text style={styles.text2}>Domicilio: </Text>
          
          <TextInput
            style={styles.input}
            onChangeText={setDomicilio}
            placeholder='DOMICILIO'
            placeholderTextColor='grey'
            value={domicilio}
          />
          
        </View>
        <View style={{flexDirection:'row', padding:10}}>
        <View style={{width: '50%'}}>
            <DropDownPicker
              placeholder="Pais"
              open={openPais}
              value={valuePais}
              items={pais}
              setOpen={setOpenPais}
              setValue={setValuePais}
              onSelectItem={item => {
                setItemPais(item.label);
              }}
            />
          </View>
          <View style={{width: '50%'}}>
            <DropDownPicker
              placeholder="Provincia"
              open={openPro}
              value={valueProv}
              items={provincia}
              setOpen={setOpenProv}
              setValue={setValuePrv}
              onSelectItem={item => {
                setItemProvincia(item.label);
              }}
            />
          </View>
        </View>
        </SafeAreaView>

        {
          (data == undefined)
          ?<TouchableOpacity onPress={handleMensaje} style={styles.button}>  
          <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
            >
            <Text style={styles.textButton}>Espere..</Text>          
            </LinearGradient>       
          </TouchableOpacity>
          :<TouchableOpacity onPress={handleContinue} style={styles.button}>
            <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
            >
            <Text style={styles.textButton}>CONTINUAR</Text>
            </LinearGradient>
          </TouchableOpacity>

        }
      
    </View>
    </ScrollView>
  );
};

export default ClubScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    fontSize: 15,
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
    fontSize: 32,
    lineHeight: 44,
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
    // padding: '5%',
    // margin: '5%',
    // fontSize:50,
  },
  textButton: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    // backgroundColor: '#6A5ACD',
    borderRadius: 10,
    fontWeight: 'bold',
  },
});
