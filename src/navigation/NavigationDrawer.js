import { createDrawerNavigator,  } from '@react-navigation/drawer';
import ClubScreen from '../components/screensadmin/ClubScreen';
import HomeScreen from '../components/screensadmin/HomeScreen';
import { useWindowDimensions} from 'react-native';
import CustomDrawer from '../components/componentDrawer/CustomDrawer';
import UnionesScreen from '../components/screensadmin/UnionesScreen';
import UnionesScreen2 from '../components/screensUniones/UnionesScreen2';
import ListarUniones from '../components/screensUniones/ListarUniones';
import ListPartidos from '../components/screenpartidos/ListPartidos';
import CreatePartido from '../components/screenpartidos/CreatePartido';
import ClubeScreen2 from '../components/screensClubes/ClubesScreen2';
import ListarClubes from '../components/screensClubes/ListarClubes';
import EditUnion from '../components/screensUniones/EditUnion';
import DetailUniones from '../components/screensUniones/DetailUniones';
import EditClub from '../components/screensClubes/EditClub';
import DetailClub from '../components/screensClubes/DetailClub';
import EditPartidos from '../components/screenpartidos/EditPartidos';
import DetailPartido from '../components/screenpartidos/DetailPartido';
import CreateCampeonatoScreen from '../components/screenCampeonatos/CreateCampeonatoScreen';
import ListarCampeonatos from '../components/screenCampeonatos/ListarCampeonatos';


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
          backgroundColor: '#0E6251', //Set Header color
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
      
      <Drawer.Screen name="Home" component={HomeScreen}/>
      <Drawer.Screen name="Uniones" component={UnionesScreen}/>
      <Drawer.Screen name="UnionesAlta" component={UnionesScreen2}/>
      <Drawer.Screen name="ListarUniones" component={ListarUniones}/>
      <Drawer.Screen name="EditarUnion" component={EditUnion}/>
      <Drawer.Screen name="DetalleUnion" component={DetailUniones}/>
      <Drawer.Screen name="Club" component={ClubScreen}/>
      <Drawer.Screen name="ClubAlta" component={ClubeScreen2} />
      <Drawer.Screen name="ListarClubes" component={ListarClubes}/>
      <Drawer.Screen name="EditarClubes" component={EditClub}/>
      <Drawer.Screen name="DetalleClubes" component={DetailClub}/>
      <Drawer.Screen name="CampeonatoAlta" component={CreateCampeonatoScreen}/>
      <Drawer.Screen name="CampeonatoListar" component={ListarCampeonatos} />
      <Drawer.Screen name="PartidoAlta" component={CreatePartido}/>
      <Drawer.Screen name="PartidoListar" component={ListPartidos} />
      <Drawer.Screen name="DetallePartido" component={DetailPartido} />
      <Drawer.Screen name="EditarPartido" component={EditPartidos} />
      
      
    </Drawer.Navigator>
  );
}

export default NavigationDrawer
