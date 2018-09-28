import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import TelaInicial from './src/TelaInicial-drawer-navigator'
import Conversa from './src/Conversa-drawer-navigator'

const Navegador = DrawerNavigator({
  Home: { 
    screen:TelaInicial
  },
  TelaChat: {
    screen:Conversa
  }
});
export default Navegador;