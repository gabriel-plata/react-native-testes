import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';

export default class ProjetoFinal extends Component {

	constructor(props){
		super(props);
		this.state = {textoTop:'Texto 1', textoBottom:'Texto 2'};
		this.escrever = this.escrever.bind(this);
	}

	mudarVogais(t){
		let novoTexto = t.toLowerCase();

		novoTexto = novoTexto.replace(/(a|e|i|o|u)/g, 'i');
		novoTexto = novoTexto.replace(/(á|à|ã|â)/g, 'i');
		novoTexto = novoTexto.replace(/(é|è|ê)/g, 'i');
		novoTexto = novoTexto.replace(/(í|ì|î)/g, 'i');
		novoTexto = novoTexto.replace(/(ó|ò|õ|ô)/g, 'i');
		novoTexto = novoTexto.replace(/(ú|ù|û|ü)/g, 'i');

		return novoTexto;
	}

	escrever(t){
		let s = this.state;
		s.textoTop = t;
		s.textoBottom = this.mudarVogais(t);
		this.setState(s);
	}

	render(){
	    return(
		    <View style={styles.body}>
		    
		    	<View>
			    	<Text style={styles.titulo}>Criador me Mimimi</Text>
		    	</View>
		    
		    	<View style={styles.inputView}>
		    		<TextInput style={styles.input} placeholder="Digite seu mimimi" onChangeText={this.escrever} underlineColorAndroid="transparent"/>
		    	</View>
		    
		    	<View style={styles.conteudo}>
		    		<Text style={[styles.texto, styles.textoTop]}>{this.state.textoTop.toUpperCase()}</Text>
		    		<Image style={styles.guri} source={require('D:\Projetos\TesteAndroid\ProjetoFinal\images\mimimi.jpg')} />
		    		<Text style={[styles.texto, styles.textoBottom]}>{this.state.textoBottom.toUpperCase()}</Text>
		    	</View>

		    </View>
	    );
  	}
}

const styles = StyleSheet.create({
	body:{
		flex:1,
		flexDirection:'column',
		alignItems:'center',
		backgroundColor:'#999999',
		paddingTop:30
	},
	titulo:{
		fontSize:30,
		color:'#FFFFFF'
	},
	inputView:{
		alignSelf:'stretch'
	},
	input:{
		borderWidth:1,
		borderColor:'#999999',
		backgroundColor:'#EEEEEE',
		color:'#000000',
		height:40,
		margin:20,
		padding:10
	},
	conteudo:{
		width:300,
		height:300,
		marginTop:10
	},
	guri:{
		width:300,
		height:300,
		marginTop:-70,
		zIndex:0
	},
	texto:{
		fontSize:25,
		color:'#FFFFFF',
		padding:10,
		backgroundColor:'transparent',
		fontWeight:'bold',
		textAlign:'center',
		height:70
	},
	textoTop:{
		zIndex:1
	},
	textoBottom:{
		marginTop:-70,
		zIndex:1
	}
});