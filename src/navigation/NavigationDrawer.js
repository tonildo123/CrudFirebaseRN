/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import ClubScreen from '../components/screensadmin/ClubScreen';
import HomeScreen from '../components/screensadmin/HomeScreen';
import PartidoScreen from '../components/screensadmin/PartidoScreen';
import {
  Image,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';

const Drawer = createDrawerNavigator();

function NavigationDrawer() {
  const {width} = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerType={width >= 768 ? 'permanent' : 'front'}
      drawerContent={props => <MenuInterno {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Club" component={ClubScreen} />
      <Drawer.Screen name="Partido" component={PartidoScreen} />
    </Drawer.Navigator>
  );
}

export default NavigationDrawer;

const MenuInterno = ({
  navigation,
}: DrawerContentComponentProps<DrawerContentOptions>) => {
  return (
    <DrawerContentScrollView>
      <View>
        <Image
          style={{
            height: 100,
            width: 100,
          }}
          source={{
            uri: 'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif',
          }}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Club')}>
          <Text>Club</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Partido')}>
          <Text>Equipo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Partido')}>
          <Text>Partido</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
          <Text>Primer Arbitro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
          <Text>4to Arbitro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
          <Text>Jugadores</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
          <Text>Aficionados</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Text>
            <Icon name="settings-outline" size={30} color="#900" />
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};
