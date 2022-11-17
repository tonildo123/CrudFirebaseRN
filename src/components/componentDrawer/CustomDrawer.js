import { View, Text , ImageBackground, Image, FlatList} from 'react-native';
import React,{useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Drawer} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import AllActions from '../../store/actions/AllActions';
import firestore from '@react-native-firebase/firestore';



const CustomDrawer = (props) => {

    const currentUser = useSelector(state => state.CurrentUser)
    let url = '../../assets/portadados.png';
    // let uri = currentUser.user.foto;


    const dispatch = useDispatch()
    const [NestedDrawerItem, setNestedDrawerItem] = useState(false);
    const [NestedDrawerItemUnion, setNestedDrawerItemUnion] = useState(false);
    const [NestedDrawerItemClub, setNestedDrawerItemClub] = useState(false);
    const [NestedDrawerItemPartido, setNestedDrawerItemPartido] = useState(false);
    const [NestedDrawerItemCampeonato, setNestedDrawerItemCampeonato] = useState(false);
    const [focus, setFocus] = useState('1');
    const [isLoadingPartido, setIsLoadingPartido] = useState(false);
    const [isLoadingPartidoList, setIsLoadingPartidoList] = useState(false);
    const [data, setData] = useState();
    const [torneos, setTorneos] = useState();
    
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
    const HandleNestedCampeonato = ()=>{

        setNestedDrawerItemCampeonato(!NestedDrawerItemCampeonato);
    }

    const handleExit = ()=>{
        dispatch(AllActions.UserActions.logoutUSer());
    }

    const llamarTorneos = () =>{
        const suscriber = firestore().collection('torneo').
    onSnapshot(
      querySnapshot => {
        
        const torneos = [];
        querySnapshot.forEach(
          documentSnapshot => {
            torneos.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id 
            })
            
  
          }
        )
        // console.log('torneos', torneos)
        setTorneos(torneos);       
          
      }
    ) 
    return () => suscriber()
    }

    const llamarClubes = (doAction)=>{

     llamarTorneos();   
        
    (doAction === 'CREAR') ? setIsLoadingPartido(true) : setIsLoadingPartidoList(true);
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

    // console.log('custom drawer : ', currentUser)
    // console.log('clubes .... ', data)

    if(data != undefined && torneos != undefined && isLoadingPartido){
        setIsLoadingPartido(false);
        props.navigation.navigate('PartidoAlta', {data, torneos})
    }else if(data != undefined && torneos != undefined && isLoadingPartidoList){
        setIsLoadingPartidoList(false);
        props.navigation.navigate('PartidoListar', {data, torneos})
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
                source={require(url)}
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
                            // source={require('../../assets/avatar.png')}
                            source={{uri: currentUser.user.foto}}                            
                            style={{
                                height:90,
                                width:90, 
                                resizeMode : 'cover',
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
                >{currentUser.user.nombre} {currentUser.user.apellido}</Text>
                    <Text
                        style={{
                            color:'#fff',
                            // fontSize:18,
                            fontFamily:'Roboto-Regular'
                        }}
                    >{currentUser.user.tipo}</Text>
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
                        labelStyle={{color:'#0E6251'}}
                        onPress={HandleNested}
                        icon={()=>(
                            <FontAwesome
                                name="user-circle"
                                color='#0E6251'
                                size={20}
                            />
                        )}
                    />
                    {
                        NestedDrawerItem == true && 
                        <DrawerItem
                            label='Completar datos'
                            icon={()=>(
                                <FontAwesome
                                    name="check-square-o"
                                    color='#28B463'
                                    size={20}
                                />
                            )}
                            labelStyle={{color:'#28B463'}}
                            onPress={
                                ()=>{props.navigation.navigate('Club')}}
                        />
                    }
                    {
                        NestedDrawerItem == true && 
                        <DrawerItem
                            label='Validar datos'
                            icon={()=>(
                                <FontAwesome
                                    name="check-circle"
                                    color='#28B463'
                                    size={20}
                                />
                            )}
                            labelStyle={{color:'#28B463'}}
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
                        labelStyle={{color:'#0E6251'}}
                        onPress={HandleNestedUnion}
                        icon={()=>(
                            <FontAwesome
                                name="institution"
                                color='#0E6251'
                                size={20}
                            />
                        )}
                    />
                    {
                        NestedDrawerItemUnion == true && 
                        <DrawerItem
                            label='Alta de unión'
                            icon={()=>(
                                <FontAwesome
                                    name="plus"
                                    color='#28B463'
                                    size={20}
                                />
                            )}
                            labelStyle={{color:'#28B463'}}
                            onPress={
                                ()=>{props.navigation.navigate('Uniones')}}
                        />
                    }
                    {
                        NestedDrawerItemUnion == true && 
                        <DrawerItem
                            label='Listar Uniones'
                            icon={()=>(
                                <FontAwesome
                                    name="server"
                                    color='#28B463'
                                    size={20}
                                />
                            )}
                            labelStyle={{color:'#28B463'}}
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
                        labelStyle={{color:'#0E6251'}}
                        onPress={HandleNestedClub}
                        icon={()=>(
                            <FontAwesome
                                name="fort-awesome"
                                color='#0E6251'
                                size={20}
                            />
                        )
                            
                        }
                    />
                    {
                        NestedDrawerItemClub == true && 
                        <DrawerItem
                            label='Alta de Club'
                            icon={()=>(
                                <FontAwesome
                                    name="plus"
                                    color='#28B463'
                                    size={20}
                                />
                            )}
                            labelStyle={{color:'#28B463'}}
                            onPress={
                                ()=>{props.navigation.navigate('Club')}}
                        />
                    }
                    {
                        NestedDrawerItemClub == true && 
                        <DrawerItem
                            label='Listar Clubes'
                            icon={()=>(
                                <FontAwesome
                                    name="server"
                                    color='#28B463'
                                    size={20}
                                />
                            )}
                            labelStyle={{color:'#28B463'}}
                            onPress={
                                ()=>{props.navigation.navigate('ListarClubes')}}
                        />
                    }
                    
                </Drawer.Section>
                <Drawer.Section>
                    <DrawerItem
                        focused={
                        focus== 1 ? true : false
                        }
                        label='Campeonato'
                        labelStyle={{color:'#0E6251'}}
                        onPress={HandleNestedCampeonato}
                        icon={()=>(
                            <FontAwesome
                                name="gamepad"
                                color='#0E6251'
                                size={20}
                            />
                        )
                            
                        }
                    />
                    {
                        NestedDrawerItemCampeonato == true && 
                        <DrawerItem
                            label='Crear Campeonato'
                            icon={()=>(
                                <FontAwesome
                                    name="plus"
                                    color='#28B463'
                                    size={20}
                                />
                            )}
                            labelStyle={{color:'#28B463'}}
                            onPress={
                                ()=>{props.navigation.navigate('CampeonatoAlta')}}
                        />
                    }
                    {
                        NestedDrawerItemCampeonato == true && 
                        <DrawerItem
                            label='Listar Campeonatos'
                            labelStyle={{color:'#28B463'}}
                            icon={()=>(
                                <FontAwesome
                                    name="server"
                                    color='#28B463'
                                    size={20}
                                />
                            )}
                            onPress={
                                ()=>{props.navigation.navigate('CampeonatoListar')}}
                        />
                    }
                    
                </Drawer.Section>   
                <Drawer.Section>
                    <DrawerItem
                        focused={
                        focus== 1 ? true : false
                        }
                        label='Partido'
                        labelStyle={{color:'#0E6251'}}
                        onPress={HandleNestedPartido}
                        icon={()=>(
                            <FontAwesome
                                name="soccer-ball-o"
                                color='#0E6251'
                                size={20}
                            />
                        )
                            
                        }
                    />
                    {
                        NestedDrawerItemPartido == true && 
                        <DrawerItem
                            label={(isLoadingPartido) ? 'Cargando..' :'Crear Partido'}
                            labelStyle={{color:'#28B463'}}
                            icon={()=>(
                                <FontAwesome
                                    name="plus"
                                    color='#28B463'
                                    size={20}
                                />
                            )}
                            onPress={
                                ()=>{llamarClubes('CREAR')}}
                        />
                    }
                    {
                        NestedDrawerItemPartido == true && 
                        <DrawerItem
                        label={(isLoadingPartidoList) ? 'Cargando..' :'Listar Partidos'}
                            labelStyle={{color:'#28B463'}}
                            icon={()=>(
                                <FontAwesome
                                    name="server"
                                    color='#28B463'
                                    size={20}
                                />
                            )}
                            onPress={
                                ()=>{llamarClubes('LISTAR')}}
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