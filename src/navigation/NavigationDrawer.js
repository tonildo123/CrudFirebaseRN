import Entypo from 'react-native-vector-icons/Entypo';
import { createDrawerNavigator, DrawerContentComponentProps,
   DrawerContentOptions, DrawerContentScrollView, DrawerItemList  } from '@react-navigation/drawer';
import ClubScreen from '../components/screensadmin/ClubScreen';
import HomeScreen from '../components/screensadmin/HomeScreen';
import PartidoScreen from '../components/screensadmin/PartidoScreen';
import { Image, Text, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import CustomDrawer from '../components/componentDrawer/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UnionesScreen from '../components/screensadmin/UnionesScreen';
import UnionesScreen2 from '../components/screensUniones/UnionesScreen2';
import ListarUniones from '../components/screensUniones/ListarUniones';
import ClubeScreen2 from '../components/screensClubes/ClubesScreen2';


const Drawer = createDrawerNavigator();

function NavigationDrawer() {
  const {width} = useWindowDimensions();

  

  return (
    <Drawer.Navigator 
      screenOptions={{
        headerShown:false,
      }}
      drawerContent={props => <CustomDrawer {...props}/>}
    >
      
      <Drawer.Screen name="Home" component={HomeScreen}
        
        
        options={{
          drawerIcon:({color})=>(
            <Ionicons name="home-outline" size={23} color={color}  />
          )
        }}
      />
      <Drawer.Screen name="Club" component={ClubScreen} 
        options={{
          drawerIcon:({color})=>(
            <Entypo name="sports-club" size={23} color={color}  />
          )
        }}
      />
      <Drawer.Screen name="Partido" component={PartidoScreen} 
        options={{
          drawerIcon:({color})=>(
            <MaterialIcons name="sports-rugby" size={23} color={color}  />
          )
        }}
      />
      <Drawer.Screen name="Uniones" component={UnionesScreen} 
        options={{
          drawerIcon:({color})=>(
            <MaterialIcons name="sports-rugby" size={23} color={color}  />
          )
        }}
      />
      <Drawer.Screen name="UnionesAlta" component={UnionesScreen2} 
        options={{
          drawerIcon:({color})=>(
            <MaterialIcons name="sports-rugby" size={23} color={color}  />
          )
        }}
      />
      <Drawer.Screen name="ListarUniones" component={ListarUniones} 
        options={{
          drawerIcon:({color})=>(
            <MaterialIcons name="sports-rugby" size={23} color={color}  />
          )
        }}
      />
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
