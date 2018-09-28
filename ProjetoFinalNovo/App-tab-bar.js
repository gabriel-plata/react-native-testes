import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import TelaInicial from './src/TelaInicial-tab-navigator'
import Conversa from './src/Conversa-tab-navigator'

const Navegador = TabNavigator({
  Home: { 
    screen:TelaInicial
  },
  TelaChat: {
    screen:Conversa
  }
}, {
  tabBarOptions: {
    showIcon: true
  }
});
export default Navegador;