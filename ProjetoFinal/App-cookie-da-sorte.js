import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

class Botao extends Component{

	constructor(props){
		super(props);
		this.state = {};
		this.styles = StyleSheet.create({
			botao:{
				width:250,
				height:50,
				borderWidth:2,
				borderColor:props.color,
				backgroundColor:'transparent',
				borderRadius:25,
				alignItems:'center'
			},
			botaoArea:{
				flex:1,
				flexDirection:'row',
				justifyContent:'center',
				alignItems:'center'
			},
			botaoLabel:{
				color:props.color
			}
		});
	}

	render(){
		return(
			<TouchableOpacity style={this.styles.botao} onPress={this.props.onPress}>
				<View style={this.styles.botaoArea}>
					<Text style={this.styles.botaoLabel}>{this.props.title}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

export default class ProjetoFinal extends Component {

	constructor(props){
		super(props);
		this.state = {texto:'Frase do dia...', indice:-1};
		this.quebrarBiscoito = this.quebrarBiscoito.bind(this);
		this.frases = ["E se os nossos caminhos forem diferentes, promete me encontrar no final?",
					   "Mesmo depois de conhecer vários novos sorrisos, o seu continua sendo o meu preferido.",
					   "O amor não faz o mundo girar. O amor é o que faz o giro valer a pena.",
					   "Pensando em você, me torno um poeta, olhando você, me torno um artista, imaginando nosso amor, me torno um sonhador...",
					   "O único momento que não estou pensando em você é quando estou dormindo, porque aí eu não estou pensando, estou sonhando.",
					   "Covarde não é aquele que chora por amor, e sim aquele que não ama por medo de chorar.",
					   "Nunca tente mudar uma pessoa que você ama, porque o próprio esforço para alterar diz que você ama metade, e a outra metade da pessoa não é aceita. Quando você ama, você simplesmente ama.",
					   "Doei todos meus órgãos - o coração já está em seu nome.",
					   "A gente acha que já superou, que já esqueceu. Mas tem horas que o coração aperta de novo, né?",
					   "Amor verdadeiro é aquele que o vento nunca leva, e a distância nunca separa!",
					   "Se for para dar valor, dê valor agora, porque o coração não acumula bônus.",
					   "O amor só é lindo, quando encontramos alguém que nos transforme no melhor que podemos ser.",
					   "Duvide do brilho das estrelas. Duvide do perfume de uma flor. Duvide de todas as verdades. Mas nunca duvide do meu amor.",
					   "Se num dia de tristeza você tiver de escolher entre o mundo e o amor, escolha o amor, e com ele conquiste o mundo.",
					   "Você me faz acreditar que nada existe sem amor, que você veio para mostrar o meu caminho. Você traz uma paixão que eu nunca pude descobrir. Mostrou que um coração não vive sem carinho."];
	}

	quebrarBiscoito(){
		let s = this.state;
		let lastIndice = s.indice;
		let newIndice;

		do{
			newIndice = Math.floor(Math.random() * this.frases.length);
		}while(newIndice == lastIndice);

		s.texto = this.frases[newIndice];
		s.indice = newIndice;
		this.setState(s);
	}

	render(){
	    return(
		    <View style={styles.body}>
		    	<Image source={require('./images/cookie.png')} />
				<Text style={styles.texto}>"{this.state.texto}"</Text>
				<Botao title="Quebrar Biscoito" color="blue" onPress={this.quebrarBiscoito}/>   		
		    </View>
	    );
  	}
}

const styles = StyleSheet.create({
	body:{
		flex:1,
		alignItems:'center',
		paddingTop:20,
		justifyContent:'center'
	},
	texto:{
		fontStyle:'italic',
		textAlign:'center',
		fontSize:20,
		margin:40
	}
});