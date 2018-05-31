import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

/*
Todo:
1.Colocar limites dos números
2.Ajustar histórico para não ultrapassar limite disponível
3.Integrar historyApp com bd
*/

class Botao extends Component {
	
	constructor(props){
		super(props);
		this.state = {};
		let flex = 1;
		if(props.flex != null){
			flex = parseInt(props.flex);
		}
		let borderWidth = 1;
		if(props.borderWidth != null){
			borderWidth = parseInt(props.borderWidth);
		}
		this.styles = StyleSheet.create({
			botao:{
				flex:flex,
				justifyContent:'center',
				alignItems:'center',
				borderWidth:borderWidth,
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

export default class ProjetoFinal extends Component {

	constructor(props){
		super(props);
		this.state = {
			teste:"", 
			resultado:"0",
			hasVirgula:false,
			pilhaOperacoes:[],
			pilhaNumeros:[],
			historyPilhaNumeros:[],
			historyPilhaOperacoes:[],
			historyInfo:null,
			historyApp:[] //depois que aprender conexão com bd puxar do banco ao iniciar app e ao fechar fazer upload do historyApp
		};
		
		this.puloDoGato = this.puloDoGato.bind(this);
	}

	puloDoGato(){
		let s = this.state;
		let comando = s.teste;

		switch(comando){
			case "%":
			case "÷":
			case "*":
			case "+":
			case "-":
				s = this.operar(comando,s);
				break;
			case "AC":
				s = this.zerar(s);
				break;
			case "9":
			case "8":
			case "7":
			case "6":
			case "5":
			case "4":
			case "3":
			case "2":
			case "1":
			case "0":
				s = this.addNumber(comando,s);
				break;
			case "=":
				s = this.getResult(s);
				break;
			case ".":
				s = this.addVirgula(s);
				break;
			default:
				Alert.alert("Botão não cadastrado");
				break;
		}
		this.setState(s);

	}

	zerar(s){

		s.resultado = "0";
		s.hasVirgula = false;
		s.pilhaOperacoes = [];
		s.pilhaNumeros = [];
		s.historyPilhaNumeros = [];
		s.historyPilhaOperacoes = [];
		s.historyInfo = null;
		return s;
	}

	operar(operador,s){
		let num;

		if(s.resultado.charAt(s.resultado.length - 1) != "." && s.resultado.length > s.resultado.indexOf(".") ){
			if(s.hasVirgula){
				num	= parseFloat(s.resultado);
			}else{
				num = parseInt(s.resultado);
			}
		}

		if((num != 0 && num != -0) && s.resultado.charAt(s.resultado.length - 1).localeCompare(".") != 0 ){
			s.pilhaNumeros.push(num);
			if((s.pilhaNumeros.length - 1) == s.pilhaOperacoes.length){
				s.pilhaOperacoes.push(operador);
				s.resultado = "0";
				s.hasVirgula = false;
				if(s.historyInfo == null){
					s.historyInfo = "History: ";
				}
				s.historyInfo += " " + num.toString() + " " + operador;	
			}else{
				Alert.alert("Insira um número antes de adicionar uma nova operação");
				s.pilhaNumeros.pop();
			}
		}else{
			if(s.resultado.charAt(s.resultado.length - 1).localeCompare(".") == 0 ){
				Alert.alert("O número não pode terminar com uma vírgula");
			}else{
				if( operador.localeCompare("-") == 0){
					num = num * -1;
					s.resultado = num.toString();
				}else{
					Alert.alert("Insira um número antes de adicionar uma nova operação");
				}
			}
		}

		return s;
	}

	addNumber(numero,s){
		if(parseFloat(s.resultado) == 0 && !s.hasVirgula){
			s.resultado = numero;
		}else{
			s.resultado += numero;	
		}
		
		return s;
	}

	addVirgula(s){

		if(!s.hasVirgula){
			s.resultado += ".";
			s.hasVirgula = true;
		}else{
			Alert.alert("O número só pode ter uma vírgula");
		}
		return s;
	}

	resolvePilha(operadores,numeros){
		let i = 0;
		let temp;

		do{

			if( operadores[i] == "÷" || operadores[i] == "*" || operadores[i] == "%" ){
				switch(operadores[i]){
					case "÷":
						temp = numeros[i] / numeros[i+1];
						break;
					case "*":
						temp = numeros[i] * numeros[i+1];
						break;
					case "%":
						temp = (numeros[i] / 100) * numeros[i+1];
						break;
				}
				numeros.splice(i,2,temp);
				operadores.splice(i,1);
				i--;
			}
			i++;
		}while(i < operadores.length);

		i = 0;
		while(i < operadores.length){
			switch(operadores[i]){
				case "+":
					temp = numeros[i] + numeros[i+1];
					break;
				case "-":
					temp = numeros[i] - numeros[i+1];
					break;
			}
			numeros.splice(i,2,temp);
			operadores.splice(i,1);
		}
		return numeros[0].toString();		
	}

	getResult(s){
		let lastNum;

		if( s.resultado.charAt(s.resultado.length - 1).localeCompare(".") != 0 ){
			lastNum = parseFloat(s.resultado);
			s.pilhaNumeros.push(lastNum);
			if(s.pilhaOperacoes.length == s.pilhaNumeros.length){
				s.pilhaOperacoes.pop();
			}
			s.resultado = this.resolvePilha(s.pilhaOperacoes,s.pilhaNumeros);
			if( parseFloat(s.resultado) - parseInt(s.resultado) != 0 ){
				s.hasVirgula = true;
			}else{
				s.hasVirgula = false;
			}
			s.historyApp.push(s.historyInfo);
			s.historyInfo = null;
			s.historyPilhaOperacoes += s.pilhaOperacoes;
			s.historyPilhaNumeros += s.pilhaNumeros;
			s.pilhaNumeros = [];
			s.pilhaOperacoes = [];
		}else{
			Alert.alert("O número não pode terminar com vírgula");
		}
		return s;
	}

	creditos(){
		//depois de aprender a alternar entre telas mudar de Alert.alert("") para uma tela
		Alert.alert("Author: Gabriel Plata");
	}

	colors(tipo){
		let color;
		switch(tipo){
			case "bgBotaoNumero":
				color = '#E0E0E0';
				break;
			case "bgBotaoOperador":
				color = 'orange';
				break;
			case "borderNumColor":
				color = '#999999';
				break;
			case "borderOpColor":
				color = '#999999';
				break;
			case "textBotaoNum":
				color = '#FFFFFF';
				break;
			case "textBotaoOp":
				color = '#FFFFFF';
				break;
			case "bgBotaoCreditos":
				color = 'black';
				break;
			case "borderColorCreditos":
				color = 'red';
				break;
			case "textCreditos":
				color = 'green';
				break;
			default:
				color = '#FF0000';
				Alert.alert("Tipo de cor não cadastrada");
				break;
		}
		return color;
	}

	render(){
	    return(
		    <View style={styles.body}>
		    	<View style={styles.visor}>
		    		<Text style={styles.resultado}>{this.state.resultado}</Text>
		    	</View>
		    	<View style={styles.linha}>
		    		<Botao label="AC" onPress={ () => {this.state.teste="AC"; this.puloDoGato();} } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")} flex="2"/>
		    		<Botao label="%" onPress={ () => {this.state.teste="%"; this.puloDoGato();} } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    		<Botao label="÷" onPress={ () => {this.state.teste="÷"; this.puloDoGato();} } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    	</View>
		    	<View style={styles.linha}>
		    		<Botao label="9" onPress={ () => {this.state.teste="9"; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="8" onPress={ () => {this.state.teste="8"; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="7" onPress={ () => {this.state.teste="7"; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="*" onPress={ () => {this.state.teste="*"; this.puloDoGato();} } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    	</View>
		    	<View style={styles.linha}>
		    		<Botao label="6" onPress={ () => {this.state.teste="6"; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="5" onPress={ () => {this.state.teste="5"; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="4" onPress={ () => {this.state.teste="4"; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="-" onPress={ () => {this.state.teste="-"; this.puloDoGato();} } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    	</View>
		    	<View style={styles.linha}>
		    		<Botao label="3" onPress={ () => {this.state.teste="3"; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="2" onPress={ () => {this.state.teste="2"; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="1" onPress={ () => {this.state.teste="1"; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="+" onPress={ () => {this.state.teste="+"; this.puloDoGato();} } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    	</View>
		    	<View style={styles.linha}>
		    		<Botao label="0" onPress={ () => {this.state.teste="0"; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")} flex="2"/>
		    		<Botao label="." onPress={ () => {this.state.teste="."; this.puloDoGato();} } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="=" onPress={ () => {this.state.teste="="; this.puloDoGato();} } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    	</View>
		    	<View style={styles.history}>
		    		<Text style={styles.historyInfo}>{this.state.historyInfo}</Text>
		    		<Botao label="ABOUT" onPress={this.creditos} textColor={this.colors("textCreditos")} bgColor={this.colors("bgBotaoCreditos")} borderColor={this.colors("borderColorCreditos")} borderWidth="2"/>
		    	</View>
		    </View>
	    );
  	}
}

const styles = StyleSheet.create({
	body:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
	},
	visor:{
		flexDirection:'row',
		flex:1,
		backgroundColor:'#2C1F30',
		alignItems:'center',
		justifyContent:'center'
	},
	linha:{
		flex:1,
		flexDirection:'row'
	},
	resultado:{
		color:'#FFFFFF',
		flex:1,
		textAlign:'right',
		fontWeight:'bold',
		fontSize:50
	},
	history:{
		flex:1,
		flexDirection:'row',
		backgroundColor:'darkgray'
	},
	historyInfo:{
		color:'blue',
		fontSize:22,
		fontWeight:'bold',
		flex:3
	}
});