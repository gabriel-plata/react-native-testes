import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Janta extends Component {

  constructor(props) {
    super(props);
    this.state = {comida:props.comida};
    let comidas = ['Pizza', 'Lasanha', 'Hamburger', 'Salada', 'Tofu', 'Baicon', 'Queijo'];
    setInterval( () => {
      this.setState(previousState => {
        let r = Math.floor(Math.random() * comidas.length);
        return {comida: comidas[r]};
      });
    }, 1000);
  }


  render() {

    return(
      <View>
        <Text style={styles.title}>Hoje vamos jantar:</Text>
        <Text style={styles.text}>{this.state.comida}</Text>
      </View>
    );
  }


}

export default class ProjetoFinal extends Component {

  //constructor() {


  //}

  render() {
    

    return(
      <View style={styles.container}>
        <Text style={styles.titleApp}>Meu primeiro App</Text>
        <Janta comida='Queijo'/>
      </View>

    );
  }


}

const styles = StyleSheet.create({
  text: {
    textAlign:'center',
    fontSize:15
  },
  title: {
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20,
    color:'red'
  },
  titleApp: {
    textAlign:'center',
    fontWeight:'bold',
    fontSize:30,
    color:'blue'
  },
  container: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});