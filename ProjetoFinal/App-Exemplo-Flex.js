import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ProjetoFinal extends Component {

  render() {

    return(
      <View style={{flex:1}}>
        <View style={{height:60, backgroundColor: 'orange'}}></View>
        <View style={{flex:1, backgroundColor: 'green'}}></View>
        <View style={{height:40, backgroundColor: 'yellow'}}></View>
      </View>

    );
  }

}