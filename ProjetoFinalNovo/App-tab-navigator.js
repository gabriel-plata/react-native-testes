import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import TelaInicial from './src/TelaInicial'
import Conversa from './src/Conversa'

const Navegador = TabNavigator({
  Home: { 
    screen:TelaInicial
  },
  TelaChat: {
    screen:Conversa
  }
});
export default Navegador;