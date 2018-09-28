import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';

export default class TelaInicial extends Component{

  static navigationOptions = ({navigation}) => ({
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor, focused}) => {
      if(focused){
        return (
          <Image source={require('../assets/images/home_on.png')} style={{width:26, height:26}} />
        );
      }else{
        return (
          <Image source={require('../assets/images/home_off.png')} style={{width:26, height:26}} />
        );
      }
      
    }
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