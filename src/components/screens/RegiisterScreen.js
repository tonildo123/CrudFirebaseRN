import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { StyleLoginScreen } from '../../styles/StyleLoginScreen';
import LinearGradient from 'react-native-linear-gradient';


const RegiisterScreen = ({navigation}) => {
  const [name, setName] = useState(''); // nombre
  const [lastName, setLastName] = useState(''); // apellido
  const [documento, setDocumento] = useState(null); // apellido

  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    dni: null,
  });

  /////////////////

  const handleContinue = () => {
    console.log(name);

    setDatos({
      ...datos,
      nombre: name,
      apellido: lastName,
      dni: documento,
    });

    loadingData();
  };
  //////////////////
  const loadingData = () => {
    const enviar = {
      nombre: name,
      apellido: lastName,
      dni: documento,
    };

    navigation.navigate('Registerdos', {enviar});

    // setName('');
    // setLastName('');
    // setDocumento(null)
  };

  return (
    <View style={styles.slide1}>
      <ImageBackground
        source={require('../../assets/fondo.jpg')}
        style={{
          flex: 1,
          justifyContent: 'center',
          opacity: 0.4,
        }}></ImageBackground>

      <View>
        <Text style={styles.text}>Ingrese sus datos</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Nombre"
          placeholderTextColor='grey'
        />
        <TextInput
          style={styles.input}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Apellido"
          placeholderTextColor='grey'
        />

        <TextInput
          style={styles.input}
          onChangeText={setDocumento}
          value={documento}
          placeholder="Numero de Documento"
          placeholderTextColor='grey'
        />
        <TouchableOpacity onPress={handleContinue} 
        style={styles.button}
        >
        <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
        > 
        <Text 
            style={styles.textButton}
        >Continuar</Text>           
        </LinearGradient>          
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // wrapper: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    fontSize: 15,
  },
  slide1: {
    flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    paddingTop: 20,
  },
  slide2: {
    flex: 1,
    padding: 20,
    backgroundColor: 'grey',
  },
  slide3: {
    flex: 1,
    padding: 20,
    backgroundColor: 'grey',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'grey',
  },
  text: {
    color: 'black',
    fontSize: 30,
    margin: '1%',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    // backgroundColor: '#6A5ACD',
    // borderWidth: 4,
    borderRadius: 5,
    // padding: '5%',
    margin: '2%',
    // fontSize:50,
  },
  textButton: {
    fontSize: 22,
    color: 'white',
    alignItems: 'center',
    // backgroundColor: '#6A5ACD',
    borderRadius: 15,
  },
});

export default RegiisterScreen;
