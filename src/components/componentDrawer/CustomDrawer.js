import { View, Text , ImageBackground, Image, Section} from 'react-native';
import React,{useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerContent } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Drawer} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import AllActions from '../../store/actions/AllActions';
import firestore from '@react-native-firebase/firestore';


const CustomDrawer = (props) => {

    const dispatch = useDispatch()
    const [NestedDrawerItem, setNestedDrawerItem] = useState(false);
    const [NestedDrawerItemUnion, setNestedDrawerItemUnion] = useState(false);
    const [NestedDrawerItemClub, setNestedDrawerItemClub] = useState(false);
    const [NestedDrawerItemPartido, setNestedDrawerItemPartido] = useState(false);
    const [focus, setFocus] = useState('1');
    const [isLoadingPartido, setIsLoadingPartido] = useState(false);
    const [data, setData] = useState();
    
    const HandleNested = ()=>{

        setNestedDrawerItem(!NestedDrawerItem);
    }

    const HandleNestedUnion = ()=>{

        setNestedDrawerItemUnion(!NestedDrawerItemUnion);
    }
    const HandleNestedClub = ()=>{

        setNestedDrawerItemClub(!NestedDrawerItemClub);
    }
    const HandleNestedPartido = ()=>{

        setNestedDrawerItemPartido(!NestedDrawerItemPartido);
    }

    const handleExit = ()=>{
        // dispatch(AllActions.UserActions.loginUSer(usuario))
        dispatch(AllActions.UserActions.logoutUSer());

    }

    const llamarClubes = ()=>{
        
    setIsLoadingPartido(true);
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
        // console.log('clubes', clubes)
        setData(clubes);
        
          
        
  
      }
    ) 
    return () => suscriber()
  }
        

  useEffect(() => {

    console.log('clubes .... ', data)

    if(data != undefined){
    setIsLoadingPartido(false);
    props.navigation.navigate('PartidoAlta', {data})
    }
    
    
    
  }, [data])
  
    
    

  return (
    <View style={{
            flex:1,
         }}>
        <DrawerContentScrollView 
            {...props}
            contentContainerStyle={{
                backgroundColor:'black',

            }}
        
        >
            <ImageBackground
                source={require('../../assets/portadados.png')}
                style={{padding:30,
                        
                }}
            >
                <View
                    style={{
                        flex:1,
                        flexDirection:'column'
                    }}
                >
                    <View
                    style={{
                        width:'100%',
                        height:'40%', 
                        
                    }}
                    ></View>
                    <View
                    style={{
                        width:'100%',
                        height:'10%'
                    }}
                    ></View>
                    <View
                    style={{
                        width:'100%',
                        height:'50%', 
                        flexDirection:'row'
                    }}
                    >   
                    <View
                    style={{
                        width:'50%',
                        height:'100%'
                    }}
                    >
                        <Image 
                            source={require('../../assets/avatar.png')}
                            style={{
                                height:80,
                                width:80, 
                                borderRadius:40,
                                marginBottom:10,
                            }}
                        />

                    </View>
                    <View
                    style={{
                        width:'50%',
                        height:'100%'
                    }}
                    >
                        <Text
                    style={{
                        color:'#fff',
                        fontSize:20,
                        fontFamily:'Roboto-Medium'
                    }}
                >Tony Diaz</Text>
                    <Text
                        style={{
                            color:'#fff',
                            // fontSize:18,
                            fontFamily:'Roboto-Regular'
                        }}
                    >Administrador</Text>
                    <FontAwesome
                        name="check-circle"
                        color='white'
                        size={20}
                    />
                        
                    </View>
                        
                    </View>
                </View>
            </ImageBackground>
            <View 
            style={{
                flex:1,
                backgroundColor:'#fff',
                paddingTop:10,
            }}>
                {/* <DrawerItemList {...props}/>   */}
                <Drawer.Section>
                    <DrawerItem
                        focused={
                           focus== 1 ? true : false
                        }
                        label='Mi Cuenta'
                        onPress={HandleNested}
                        icon={()=>(
                            <FontAwesome
                                name="user-circle"
                                color='blue'
                                size={20}
                            />
                        )
                            
                        }
                    />
                    {
                        NestedDrawerItem == true && 
                        <DrawerItem
                            label='Completar datos'
                            onPress={
                                ()=>{props.navigation.navigate('Club')}}
                        />
                         
                    }
                    {
                        NestedDrawerItem == true && 
                        <DrawerItem
                            label='Validar datos'
                            onPress={
                                ()=>{props.navigation.navigate('Club')}}
                        />
                         
                    }
                    
                </Drawer.Section>
                <Drawer.Section>
                    <DrawerItem
                        focused={
                           focus== 1 ? true : false
                        }
                        label='Uniones'
                        onPress={HandleNestedUnion}
                        icon={()=>(
                            <FontAwesome
                                name="institution"
                                color='blue'
                                size={20}
                            />
                        )
                            
                        }
                    />
                    {
                        NestedDrawerItemUnion == true && 
                        <DrawerItem
                            label='Alta de unión'
                            onPress={
                                ()=>{props.navigation.navigate('Uniones')}}
                        />
                         
                    }
                    {
                        NestedDrawerItemUnion == true && 
                        <DrawerItem
                            label='Listar'
                            onPress={
                                ()=>{props.navigation.navigate('ListarUniones')}}
                        />
                         
                    }
                    
                </Drawer.Section>
                <Drawer.Section>
                    <DrawerItem
                        focused={
                           focus== 1 ? true : false
                        }
                        label='Club'
                        onPress={HandleNestedClub}
                        icon={()=>(
                            <FontAwesome
                                name="fort-awesome"
                                color='blue'
                                size={20}
                            />
                        )
                            
                        }
                    />
                    {
                        NestedDrawerItemClub == true && 
                        <DrawerItem
                            label='Alta de Club'
                            onPress={
                                ()=>{props.navigation.navigate('Club')}}
                        />
                         
                    }
                    {
                        NestedDrawerItemClub == true && 
                        <DrawerItem
                            label='Listar'
                            onPress={
                                ()=>{props.navigation.navigate('Club')}}
                        />
                         
                    }
                    
                </Drawer.Section>
                <Drawer.Section>
                    <DrawerItem
                        focused={
                           focus== 1 ? true : false
                        }
                        label='Partido'
                        onPress={HandleNestedPartido}
                        icon={()=>(
                            <FontAwesome
                                name="soccer-ball-o"
                                color='blue'
                                size={20}
                            />
                        )
                            
                        }
                    />
                    {
                        NestedDrawerItemPartido == true && 
                        <DrawerItem
                            label={(isLoadingPartido) ? 'Cargando..' :'Crear'}
                            onPress={
                                ()=>{llamarClubes()}}
                        />
                         
                    }
                    {
                        NestedDrawerItemPartido == true && 
                        <DrawerItem
                            label='Listar'
                            onPress={
                                ()=>{props.navigation.navigate('PartidoListar')}}
                        />
                         
                    }
                    
                </Drawer.Section>    
            </View>
            
                
        </DrawerContentScrollView>
         
        <View
            style={{
                padding:10,
                borderTopWidth:2,
                borderTopColor:'black',
            }}
        >
            <TouchableOpacity
                onPress={()=>{
                    handleExit();
                    console.log('exit')
                }}
                style={{
                    paddingVertical:5
                }}
            >
            <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        
                    }}
                >
                <FontAwesome
                        name="power-off"
                        color='black'
                        size={20}
                    />       
                <Text style={{paddingHorizontal:20, color:'black'}}>Salir</Text>
        </View>
      
            </TouchableOpacity>
           
            
        </View>
        
    </View>
  )
}

export default CustomDrawer