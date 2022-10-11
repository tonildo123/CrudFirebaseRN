import { createDrawerNavigator } from '@react-navigation/drawer';
import ClubScreen from '../components/screensadmin/ClubScreen';
import HomeScreen from '../components/screensadmin/HomeScreen';
import PartidoScreen from '../components/screensadmin/PartidoScreen';

const Drawer = createDrawerNavigator();

function NavigationDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Club" component={ClubScreen} />
      <Drawer.Screen name="Partido" component={PartidoScreen} />
    </Drawer.Navigator>
  );
}

export default NavigationDrawer