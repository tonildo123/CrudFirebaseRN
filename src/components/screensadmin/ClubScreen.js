import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';


const ClubScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [acronimo, setAcronimo] = useState('');
  const [cuit, setCuit] = useState('');
  const [telefono, setTelefono] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [data, setData] = useState();
  

  

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
    };

    navigation.navigate('ClubAlta', {enviar, data});
  };

  const handleMensaje = ()=>{

    Alert.alert('Cargando datos!')

  }

  return (
    <View style={styles.slide1}>
      <ImageBackground
        source={require('../../assets/altas.jpeg')}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.text}>Datos del Club</Text>
        <View>
          <Text style={styles.text2}>Nombre: </Text>
          <TextInput
            style={styles.input }
            onChangeText={setName}
            value={name}
          />
        </View>
        <View>
          <Text style={styles.text2}>Acronimo: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setAcronimo}
            value={acronimo}
          />
        </View>
        <View>
          <Text style={styles.text2}>CUIT: </Text>

          <TextInput
            style={styles.input}
            onChangeText={setCuit}
            value={cuit}
          />
        </View>
        <View>
          <Text style={styles.text2}>Telefono: </Text>

          <TextInput
            style={styles.input}
            onChangeText={setTelefono}
            placeholder="Telefono"
            value={telefono}
          />
        </View>
        <View>
          <Text style={styles.text2}>Domicilio: </Text>

          <TextInput
            style={styles.input}
            onChangeText={setDomicilio}
            placeholder="Domicilio"
            value={domicilio}
          />
        </View>

        {
          (data == undefined)
          ?<TouchableOpacity onPress={handleMensaje} style={styles.button}>         
            <Text style={styles.textButton}>Espere..</Text>          
          </TouchableOpacity>
          :<TouchableOpacity onPress={handleContinue} style={styles.button}>
            <Text style={styles.textButton}>Continuar</Text>
          </TouchableOpacity>

         }
      </ImageBackground>
    </View>
  );
};

export default ClubScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: '3%',
    borderWidth: 2,
    padding: '5%',
    color: 'white',
    backgroundColor: 'white',
    opacity: 0.75,
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
    backgroundColor: '#6A5ACD',
    // borderWidth: 4,
    borderRadius: 5,
    padding: '5%',
    margin: '5%',
    // fontSize:50,
  },
  textButton: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    borderRadius: 10,
  },
});
