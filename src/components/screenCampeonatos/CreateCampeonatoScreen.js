import React, {useState} from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleLoginScreen } from '../../styles/StyleLoginScreen';
import {useSelector, useDispatch} from 'react-redux';

const CreateCampeonatoScreen = ({navigation}) => {

  const currentUser = useSelector(state => state.CurrentUser);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [data, setData] = useState();

  /////////////dropdown pais prov 
  const [pais, setPais] = useState([{label: 'Argentina', value: '456'}]); //dropdown
  const [itemPais, setItemPais] = useState('');
  const [division, setDivision] = useState([

    /*
    M6”, “M7”, “M8”, “M9”, “M10”, “M11”, “M12”, “M13”, “M14”, “M15”, “M16”, “M18”, “Plantel superior” y “Veteranos” */
    {label: 'M6', value: 1},
    {label: 'M7', value: 2},
    {label: 'M8', value: 3},
    {label: 'M9', value: 4},
    {label: 'M10', value: 5},
    {label: 'M11', value: 6},
    {label: 'M12', value: 7},
    {label: 'M13', value: 8},
    {label: 'M14', value: 9},
    {label: 'M15', value: 10},
    {label: 'M16', value: 11},
    {label: 'M17', value: 12},
    {label: 'M18', value: 13},
    {label: 'Plantel superio', value: 14},
    {label: 'Veteranos', value: 15},
    
  ]); //dropdown
  const [itemDivision, setItemDivision] = useState('');
  const [openDiv, setOpenDiv] = useState(false);
  const [valueDiv, setValueDiv] = useState(null);
  const [openPais, setOpenPais] = useState(false);
  const [valuePais, setValuePais] = useState(null);
  
  


  /////////////////

  const handleContinue = () => {
    setIsLoading(true)
    
try {
  firestore()
  .collection('torneo').add({
    idusuario:currentUser.user.idUsuario,    
    nombre:name,
    pais:itemPais,    
    division:itemDivision
})
} catch (error) {
console.log('error al subir datos', error)
Alert.alert('Error al crear la torneo')
setIsLoading(false);
}finally{
console.log('subido con exito!')
setIsLoading(false);
setName('')
Alert.alert(
  "Exito!",
  "Torneo creado correctamente!",
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
  
return (
    
    <ScrollView>
    <View style={[styles.slide1]}>
        <Text style={styles.text}>Datos del Torneo</Text>
        <SafeAreaView style={{
          height:'90%',
          justifyContent: "flex-start",
        }}>
        <View>
          <Text style={styles.text2}>Torneo</Text>
          <TextInput
            style={styles.input}
            placeholder='NOMBRE'
            placeholderTextColor='grey'
            onChangeText={setName}
            value={name}
          />
        </View>
        
        <View style={{flexDirection:'row', padding:10}}>
        <View style={{width: '50%'}}>
            <DropDownPicker
              placeholder="Sede"
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
              placeholder="División"
              open={openDiv}
              value={valueDiv}
              items={division}
              setOpen={setOpenDiv}
              setValue={setValueDiv}
              onSelectItem={item => {
                setItemDivision(item.label);
              }}
            />
          </View>
        </View>
        </SafeAreaView>        
      
    </View>
    <View style={{
        marginTop:400,       
        
      }}>
        <TouchableOpacity onPress={handleContinue} style={styles.button}>
            <LinearGradient
            colors={['#0E6251', '#28B463']}
            style={StyleLoginScreen.signIn}
            >
              {isLoading
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='white' />
                  </View> 
                : 
            <Text style={styles.textButton}>CONTINUAR</Text>
            }
            </LinearGradient>
          </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default CreateCampeonatoScreen



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
