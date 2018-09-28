import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Conversa extends Component{

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