import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

class Botao extends Component {
	
	constructor(props){
		super(props);
		this.state = {};
		
		let flex = 1;
		if(props.flex != null){
			flex = parseInt(props.flex);
		}

		this.styles = StyleSheet.create({
			botao:{
				flex:flex,
				justifyContent:'center',
				alignItems:'center',
				borderWidth:props.borderWidth,
				borderColor:props.borderColor,
				backgroundColor:props.bgColor
			},
			label:{
				fontSize:22,
				color:props.textColor,
				fontWeight:'bold',
				textAlign:'center',
				textAlignVertical:'center'
			}
		});
	}

	render(){
		return(
			<TouchableOpacity style={this.styles.botao} onPress={this.props.onPress}>
				<Text style={this.styles.label}>{this.props.label}</Text>
			</TouchableOpacity>
		);
	}
}