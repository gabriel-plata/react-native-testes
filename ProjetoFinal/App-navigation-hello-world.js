import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

class TelaInicial extends Component{

	static navigationOptions = ({navigation}) => ({
		title:'Bem Vindo'
	});

	colors(tipo){
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

	render(){
		return (
			<View style={styles.body}>
				<Text>Olá Navigation</Text>
			</View>
		);
	}
}

const Navegador = StackNavigator({
	Home: { 
		screen:TelaInicial
	}
});
export default Navegador;

const styles = StyleSheet.create({
	body:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:this.colors("bgBody")
	}
});