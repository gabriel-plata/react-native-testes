import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import TelaInicial from './src/TelaInicial'
import Conversa from './src/Conversa'

const Navegador = StackNavigator({
  Home: { 
    screen:TelaInicial
  },
  TelaChat: {
    screen:Conversa
  }
});
export default Navegador;