import Entypo from 'react-native-vector-icons/Entypo';
import { createDrawerNavigator, DrawerContentComponentProps,
   DrawerContentOptions, DrawerContentScrollView, DrawerItemList  } from '@react-navigation/drawer';
import ClubScreen from '../components/screensadmin/ClubScreen';
import HomeScreen from '../components/screensadmin/HomeScreen';
import { Image, Text, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import CustomDrawer from '../components/componentDrawer/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UnionesScreen from '../components/screensadmin/UnionesScreen';
import UnionesScreen2 from '../components/screensUniones/UnionesScreen2';
import ListarUniones from '../components/screensUniones/ListarUniones';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ListPartidos from '../components/screenpartidos/ListPartidos';
import CreatePartido from '../components/screenpartidos/CreatePartido';
import ClubeScreen2 from '../components/screensClubes/ClubesScreen2';
import ListarClubes from '../components/screensClubes/ListarClubes';
import LoginScreens from '../components/screens/LoginScreens';


const Drawer = createDrawerNavigator();

function NavigationDrawer() {
  const {width} = useWindowDimensions();

  

  return (
    <Drawer.Navigator 
      
      drawerType={width >= 768 ? 'permanent' : 'front'}
      screenOptions={{
        headerShown:true,
        title:'Kani Sport',        
        headerStyle: {
          backgroundColor: '#2874A6', //Set Header color
          elevation:0,
          shadowColor:'transparent',
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },

      }}
      drawerContent={props => <CustomDrawer {...props}/>}
    >
      
      <Drawer.Screen name="Home" component={HomeScreen}
        // options={{
        //   drawerIcon:({color})=>(
        //     <Ionicons name="home-outline" size={23} color={color}  />
        //   )
        // }}
      />
      <Drawer.Screen name="Login" component={LoginScreens}/>
      <Drawer.Screen name="Club" component={ClubScreen}/>
      <Drawer.Screen name="Uniones" component={UnionesScreen}/>
      <Drawer.Screen name="UnionesAlta" component={UnionesScreen2}/>
      <Drawer.Screen name="ListarUniones" component={ListarUniones}/>
      <Drawer.Screen name="ListarClubes" component={ListarClubes}/>
      <Drawer.Screen name="PartidoAlta" component={CreatePartido}/>
      <Drawer.Screen name="PartidoListar" component={ListPartidos} />
      <Drawer.Screen name="ClubAlta" component={ClubeScreen2} 
        options={{
          drawerIcon:({color})=>(
            <MaterialIcons name="sports-rugby" size={23} color={color}  />
          )
        }}
      />
      
    </Drawer.Navigator>
  );
}

export default NavigationDrawer
