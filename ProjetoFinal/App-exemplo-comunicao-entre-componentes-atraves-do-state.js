import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default class ProjetoFinal extends Component {

	constructor(props){
		super(props);
		this.state = {inputTexto:'', texto:''};
		this.btnNomePress = this.btnNomePress.bind(this);
	}

	btnNomePress(){
		let s = this.state;
		s.texto = "Olá, "+s.inputTexto;
		this.setState(s);
	}

	render(){
	    return(
		    <View style={styles.viewApp}>
		    	<View style={styles.viewName}>
			    	<TextInput style={styles.inputName} onChangeText={(inputTexto) => this.setState({inputTexto})} placeholder="Qual seu nome?" underlineColorAndroid="transparent"/>
			    	<Button style={styles.btnName} title="Ok" onPress={this.btnNomePress} />
			    </View>
			    <View style={styles.content}>
		    		<Text style={styles.texto}>{this.state.texto}</Text>
		    	</View>
		    </View>
	    );
  	}
}

const styles = StyleSheet.create({
	content:{
		flex:16,
		backgroundColor:'black'
	},
	viewName:{
		flex:1, 
		flexDirection:'row', 
		margin:10,
		alignItems:'center',
		justifyContent:'center'
	},
	inputName:{
		flex:1,
		height:45,
		borderWidth:3,
		borderColor: '#FF0000',
		margin:10,
		fontSize:20,
		alignItems:'center',
		justifyContent:'center',
		padding:10,
		borderRadius:5
	},
	btnName:{
		fontSize:20,
		textAlignVertical:'center',
		fontWeight:'bold',
		borderRadius:5,
		borderColor:'black',
		backgroundColor:'red',
		borderWidth:10,
		height:5
	},
	viewApp:{
		flex:1,
		backgroundColor:'#FFFF8F'
	},
	texto:{
		color:'red',
		fontSize:30
	}

});