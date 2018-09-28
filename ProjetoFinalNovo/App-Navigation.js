import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';

class TelaInicial extends Component{

  static navigationOptions = ({navigation}) => ({
    title:'Bem Vindo'
  });

  constructor(props){
    super(props);
    this.state = {nome:''}
    this.conversar = this.conversar.bind(this);
  }

  conversar(){
    this.props.navigation.navigate('TelaChat',{
      nome:this.state.nome
    });
  }

  render(){
    return (
      <View style={styles.body}>
        <Text>Olá Navigation</Text>
        <TextInput style={styles.inputName} placeholder="Qual seu nome?" onChangeText={(nome)=>{let s = this.state; s.nome = nome; this.setState(s);}}/>
        <Button title="Conversar" onPress={this.conversar} />
      </View>
    );
  }
}

class Conversa extends Component{

  static navigationOptions = ({navigation}) => ({
    title:navigation.state.params.nome
  });

  render(){
    return(
      <View>
        <Text>Conversa</Text>
      </View>
    );
  }
}

const Navegador = StackNavigator({
  Home: { 
    screen:TelaInicial
  },
  TelaChat: {
    screen:Conversa
  }
});
export default Navegador;

const styles = StyleSheet.create({
  body:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#E0E0E0'
  },
  inputName:{
    height:40,
    borderWidth:1,
    borderColor:'#000000',
    width:200
  }
});