/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  AsyncStorageStatic,
  Alert,
  ImageBackground,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import auth from '@react-native-firebase/auth';

const RegisterData = ({route, navigation}) => {
  const apellido = route.params.enviar.apellido;
  const nombre = route.params.enviar.nombre;
  const dni = route.params.enviar.dni;

  useEffect(() => {
    console.log('llega nombre : ', route.params.enviar);
  }, []);

  const [user, setUser] = useState(''); // user
  const [pass, setPass] = useState(''); // password
  const [pass2, setPass2] = useState(''); // password
  const [id, setId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [datos, setDatos] = useState({
    idUsuario: id,
    tipo: 'Admin',
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    email: user,
    password: pass,
  });

  // registro firebase auth

  const handleRegister = () => {
    console.log('user ', user);
    console.log('pass', pass);

    auth()
      .createUserWithEmailAndPassword(user, pass)
      .then(resp => {
        console.log('resp : ', JSON.stringify(resp.user.uid, null, 3));
        console.log('User account created & signed in!');
        setId(resp.user.uid);
        const idUSer = resp.user.uid;
        changeScreen(idUSer);
      })
      .catch(error => {
        console.error(error);
        Alert.alert(`${error}`)

      });
  };

  const changeScreen = idUSer => {
    const enviar = {
      idUsuario: idUSer,
      tipo: 'Admin',
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      email: user,
      password: pass,
    };

    navigation.navigate('Registertres', {enviar});
    loadingData();
  };

  const loadingData = () => {
    setPass('');
    setPass2('');
    setUser('');
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
      <Text style={styles.text}>Sigamos</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUser}
        value={user}
        placeholder="email"
        placeholderTextColor='grey'
      />
      <View
        style={{flexDirection:'row', padding:10}}
      >
        <TextInput
        style={styles.inputpass}
        onChangeText={setPass}
        value={pass}
        secureTextEntry={showPassword ? false : true}
        placeholder="Contraseña"
        placeholderTextColor='grey'
      />
      <TouchableOpacity
        onPress={() => {
          setShowPassword(!showPassword);
        }}>
        {showPassword ? (
          <Feather name="eye" color="black" size={20} />
        ) : (
          <Feather name="eye-off" color="gray" size={20} />
        )}
      </TouchableOpacity>

      </View>

      <View
        style={{flexDirection:'row', padding:10}}
      >
        <TextInput
        style={styles.inputpass}
        onChangeText={setPass2}
        value={pass2}
        secureTextEntry={showPassword2 ? false : true}
        placeholder="Repita contraseña"
        placeholderTextColor='grey'
      />
      <TouchableOpacity
        onPress={() => {
          setShowPassword2(!showPassword2);
        }}>
        {showPassword2 ? (
          <Feather name="eye" color="black" size={20} />
        ) : (
          <Feather name="eye-off" color="gray" size={20} />
        )}
      </TouchableOpacity>
      </View>
      
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleRegister();
        }}>
        <Text style={styles.textButton}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterData;

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
  inputpass: {
    height: 40,
    width:'90%',
    marginRight: 12,
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
    fontWeight: 'bold',
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
