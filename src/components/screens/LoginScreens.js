/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Platform,
  Dimensions,StatusBar,ScrollView,
  View, Text, Image, StyleSheet, SafeAreaView, 
  TextInput, TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';

  import { useTheme } from '@react-navigation/native';
  import * as Animatable from 'react-native-animatable';
  import LinearGradient from 'react-native-linear-gradient';
  import NetInfo from "@react-native-community/netinfo";
// import logoImg from '../../assets/vectoricon.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import fondo from '../../assets/fondo.jpg'
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import AllActions from '../../store/actions/AllActions';
import firestore from '@react-native-firebase/firestore';
import { StyleLoginScreen } from '../../styles/StyleLoginScreen';


const LoginScreens = ({navigation}) => {

  // const url = ''
  
  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState('');
  const [validateUser, setValidateUser] = useState(false)
  const [validatePassword, setValidatePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [hayInternet, setHayInternet] = useState(false);

  const currentUser = useSelector(state => state.CurrentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    
    // Subscribe
const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
  setHayInternet(state.isConnected)
});

// Unsubscribe
unsubscribe();

  }, [])

  

  const handleLogin = () =>{

    setLoadingData(true)

    // console.log('user', text)
    // console.log('pass', number)

    auth()
    .signInWithEmailAndPassword(text, number)
    .then((resp) => {
      // console.log('Log in ', JSON.stringify(resp, null, 3));
      // console.log('id user ', resp.user.uid);
      const id = resp.user.uid
      getUser(id);
    })
    .catch(error => {
      setLoadingData(false)
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        Alert.alert('El usuario ya esta en uso')
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        Alert.alert('Email invalido')
      } else {
        Alert.alert('Problemas con el servidor')
        console.error(error);
      }
      
    });

  }
  const getUser = async (idUSer) =>{
    const suscriber = firestore().collection(`datauser`);

    suscriber
    .get()
    .then((results) => {
      
    const data = results.docs.map((doc) => ({
      
      id: doc.id,
      ...doc.data(),
    }));
    // console.log("Toda la colección  ", JSON.stringify(data, null, 3));
    pasarPantalla(data, idUSer)
    
  }).catch((error)=>{
    console.log('error data user', error)
    Alert.alert('Verifique sus datos')
    setLoadingData(false)
  });
    
  }

  const pasarPantalla = (array, idDato) =>{

    // console.log('llega data', array)
    // console.log('llega id', idDato)

    let user = array.filter(number =>  number.idUsuario == idDato );
    console.log(user[0].nombre); 
    const usuario = 
    {
     idUsuario:user[0].idUsuario,
     tipo:user[0].tipo,
     nombre:user[0].nombre,
     apellido:user[0].apellido,
     dni:user[0].dni,
     email:user[0].email,
     password:user[0].password,
     foto:user[0].foto,
     
    };

    // console.log('user final', JSON.stringify(usuario, null, 4) ); 
    setLoadingData(false)
    dispatch(AllActions.UserActions.loginUSer(usuario))


  }



  const handleRegister = () =>{

    navigation.navigate('Register');  

  }

  return (
    
    <View style={StyleLoginScreen.container}>
        <StatusBar backgroundColor='#000000' barStyle="light-content" />
        <View style={[StyleLoginScreen.header]}>
        <Animatable.Image
              animation="bounceIn"
              duraton="1500"
              source = {{
                uri: 'data:image/jpeg;base64,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'
              }}
              style={StyleLoginScreen.logo}
              resizeMode="stretch"
        />
        <Text style={StyleLoginScreen.text_header}>Bienvenido</Text>         
        <Text style={StyleLoginScreen.text_header}>a Kani Sport</Text>
        </View>

        <Animatable.View
            animation="fadeInUpBig"
            style={[StyleLoginScreen.footer, {
                backgroundColor: 'white',
                      }]}
         >
      
       <ScrollView>
                <Text style={[StyleLoginScreen.text_footer, {
                    color:'grey'
                }]}>Iniciar Sesión</Text>
                <View style={StyleLoginScreen.action}>
                    <FontAwesome
                        name="user-o"
                        color='grey'
                        size={20}
                     />
                 <TextInput
                    placeholder="Email"
                    placeholderTextColor="#666666"
                          style={[StyleLoginScreen.textInput, {
                              color: 'black'
                          }]}
                    autoCapitalize="none"
                    onChangeText={onChangeText}
                    value={text}
                  />
    
            </View>
           <Text style={[StyleLoginScreen.text_footer, {
              color: 'grey',
              marginTop: 35
          }]}>Contraseña</Text>
          <View style={StyleLoginScreen.action}>
              <Feather
                  name="lock"
                  color='grey'
                  size={20}
              />
        <TextInput
            placeholder="Ingresar contraseña"
            placeholderTextColor="#666666"
            onChangeText={onChangeNumber}
            value={number}
            secureTextEntry={showPassword ? false : true}
            style={[StyleLoginScreen.textInput, {
                color: 'black'
            }]}
            autoCapitalize="none"
           
        />
    <TouchableOpacity
         onPress={()=>{setShowPassword(!showPassword);}}
    >
       
        {showPassword 
            ?<Feather
            name="eye"
            color='grey'
            size={20}
            />
            :<Feather
            name="eye-off"
            color="gray"
            size={20}
            />  
                      
        }
        
    </TouchableOpacity>
</View>
<View
style={{flexDirection:'row',justifyContent:'space-evenly'}}
>
<TouchableOpacity
   onPress={() => { 
    // navigation.navigate('recuperarPassword') 
    Alert.alert('Seccion en mantenimiento!');
    }}>
    <Text style={{ 
      color: 'red' ,
      marginTop: 15 
                }}
    >
        ¿Olvidó su contraseña?
    </Text>
</TouchableOpacity>
<TouchableOpacity
   onPress={() => { handleRegister() }}>
    <Text style={{ 
      color: 'red' ,
      marginTop: 15 
                }}
    >
        Registrarme
    </Text>
</TouchableOpacity>
</View>

<View style={StyleLoginScreen.button}>
    <TouchableOpacity
        style={StyleLoginScreen.signIn}
        onPress={() => {
          hayInternet 
          ? handleLogin()
          : Alert.alert('Sin conexion a intenet')
          }}
        
    >
        <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
        >
            {loadingData
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='white' />
                  </View> 
                : 
                <Text style={[StyleLoginScreen.textSign, { color: 'black'}]}>Ingresar</Text>
                }
        </LinearGradient>

    </TouchableOpacity>

</View>

</ScrollView>
      

</Animatable.View>
        
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    flex: 0.5,
    // justifyContent:'center',
    alignItems: 'center',
  },
  image: {
    width: '50%',
    height: '100%',
    resizeMode: 'contain', // es como el objetfit de css
    padding: '10%',
    margin: '5%',
  },
  input: {
    // backgroundColor: "white",
    // borderColor: "gray",
    // width: "100%",
    // borderWidth: 4,
    // borderRadius: 10,
    // padding: 10,
    // color:'grey',
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: '5%',
    margin: '1%',
    color: 'black',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#85929E',
    // borderWidth: 4,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    // fontSize:50,
  },
  buttonLogin: {
    alignItems: 'center',
    // backgroundColor: 'black',
    backgroundColor: '#24C7EB',
    // borderWidth: 4,
    borderRadius: 10,
    padding: 20,
    margin: 10,
    // fontSize:50,
  },
  textButton: {
    fontSize: 20,
    color: 'white',
  },
});

export default LoginScreens;
