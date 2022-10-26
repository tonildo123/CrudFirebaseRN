import { View, Text , ImageBackground, Image, Section} from 'react-native';
import React,{useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerContent } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Drawer} from 'react-native-paper';


const CustomDrawer = (props) => {

    const [NestedDrawerItem, setNestedDrawerItem] = useState(false);
    const [NestedDrawerItemUnion, setNestedDrawerItemUnion] = useState(false);
    const [NestedDrawerItemClub, setNestedDrawerItemClub] = useState(false);
    const [focus, setFocus] = useState('1');
    
    const HandleNested = ()=>{

        setNestedDrawerItem(!NestedDrawerItem);
    }

    const HandleNestedUnion = ()=>{

        setNestedDrawerItemUnion(!NestedDrawerItemUnion);
    }
    const HandleNestedClub = ()=>{

        setNestedDrawerItemClub(!NestedDrawerItemClub);
    }
    

  return (
    <View style={{
            flex:1,
         }}>
        <DrawerContentScrollView 
            {...props}
            contentContainerStyle={{
                backgroundColor:'grey',

            }}
        
        >
            <ImageBackground
                source={require('../../assets/succes.png')}
                style={{padding:30,
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
                <Text
                    style={{
                        color:'#fff',
                        fontSize:18,
                        fontFamily:'Roboto-Medium'
                    }}
                >Tony Diaz</Text>
                <View 
                    style={{flexDirection:'row'}}>
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
            </View>
            
                
        </DrawerContentScrollView>
         
        <View
            style={{
                padding:20,
                borderTopWidth:2,
                borderTopColor:'black',
            }}
        >
            <TouchableOpacity
                onPress={()=>{
                    console.log('exit')
                }}
                style={{
                    paddingVertical:15
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
                <Text style={{paddingHorizontal:20}}>Salir</Text>
        </View>
      
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{
                    console.log('exit')
                }}
                style={{
                    paddingVertical:15
                }}
            >
            <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                <Ionicons
                        name="exit-outline"
                        color='black'
                        size={20}
                    />       
                <Text style={{paddingHorizontal:20}}>Cerrar Sesion</Text>
        </View>
      
            </TouchableOpacity>
            
        </View>
        
    </View>
  )
}

export default CustomDrawer