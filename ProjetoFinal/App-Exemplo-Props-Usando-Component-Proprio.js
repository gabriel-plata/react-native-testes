import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

class Imagem extends Component {

  render() {
    let imagem = {
      uri:'https://www.google.com/logos/'+this.props.nome+'.jpg'
    };
    return(
      <Image source={imagem} style={{width:parseInt(this.props.largura), height:parseInt(this.props.altura)}} />
    );
  }


}

export default class ProjetoFinal extends Component {

  //constructor() {


  //}

  render() {
    let nome = "Gabriel Plata";

    return(
      <View style={styles.container}>
        <Text style={styles.texto}>Meu nome é: {nome}</Text>
        <Button title="Botão" onPress={()=>{
          alert('Botão Apertado');
        }} />
        <Imagem nome="google" largura="354" altura="116" />
      </View>

    );
  }


}

const styles = StyleSheet.create({
  texto:{
    fontSize:30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});