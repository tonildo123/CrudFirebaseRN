import 'react-native-gesture-handler';
import React from 'react';
import Navigate from './src/navigation/Navigate';
import { Provider } from 'react-redux';
import store from './src/store/ReduxFile';


const App = () => {  

  return (    
    <Provider
      store={store}
    >
        <Navigate />      
    </Provider>
    
  );
};

export default App;