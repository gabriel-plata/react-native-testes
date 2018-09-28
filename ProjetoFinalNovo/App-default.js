import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

export default class ProjetoFinal extends Component {

  constructor(props){
    super(props);
    this.state = { 
      
    };
    
    this.funcaoState = this.funcaoState.bind(this);
  }

  funcaoState(){
    let s = this.state;
  }

  creditos(){
    Alert.alert("Author: Gabriel Plata");
  }

  render(){
      return(
        <View style={styles.body}>
          
        </View>
      );
    }
}

function colors(tipo){
    let color;
    switch(tipo){
      case "bgBody":
        color = '#E0E0E0';
        break;
      default:
        color = '#FF0000';
        Alert.alert("Tipo de cor não cadastrada");
        break;
    }
    return color;
}

const styles = StyleSheet.create({
  body:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors("bgBody")
  }
});