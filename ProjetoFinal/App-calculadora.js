import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

/*
Todo:
1.Mudar historyView e visorView para FlatList (ajustar fonte para não cortar números)
2.Ajustar historyView para não cortar números ao chegar no limite da View
3.Integrar historyApp com bd
4.Pegar usuário e trocar por "Gabriel Plata" ao criar History e popular historyApp -> TODO - Task: 4
5.Add menu para ver historyApp e outras funcionalidades
*/

class History {

	constructor(pilhaNumeros,pilhaOperacoes,resultado,date,user){
		this.pilhaNumeros = pilhaNumeros;
		this.pilhaOperacoes = pilhaOperacoes;
		this.resultado = resultado;
		this.date = date;
		this.user = user;
	}

	getHistory(){
		let history = "";
		let i = 0;

		history = "Usuário: " + user + "\n" + "Data: " + date + "\n"; 
		do{
			history += this.pilhaNumeros[i] + " " + this.pilhaOperacoes[i] + " " + this.pilhaNumeros[i+1] + " ";
			i++;
		}while(i < this.pilhaOperacoes.length);

		history += "= " + this.resultado;

		return history;
	}
}

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
			resultado:"0",
			hasVirgula:false,
			pilhaOperacoes:[],
			pilhaNumeros:[],
			hasNegativeSignal:[],
			negativeSignalApplied:false,
			historyInfo:null,
			historyApp:[] //depois que aprender conexão com bd puxar do banco ao iniciar app e ao fechar fazer upload do historyApp
		};
		
		this.puloDoGato = this.puloDoGato.bind(this);
	}

	puloDoGato(comando){
		let s = this.state;

		switch(comando){
			case "%":
			case "÷":
			case "*":
			case "+":
			case "-":
				s = this.operar(comando,s);
				break;
			case "AC":
				s = this.restartState(s,true);
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

	restartState(s,ac){

		if( ac ){
			s.resultado = "0";
		}

		if( parseFloat(s.resultado) - parseInt(s.resultado) != 0 ){
			s.hasVirgula = true;
		}else{
			s.hasVirgula = false;
		}

		s.pilhaOperacoes = [];
		s.pilhaNumeros = [];
		s.hasNegativeSignal = [];
		s.negativeSignalApplied = false;
		s.historyInfo = null;
		
		return s;
	}

	operar(operador,s){
		let num;
		let	temp;
		let indexNum = s.pilhaNumeros.length - 1;
		let	lastCharResultado = s.resultado.charAt(s.resultado.length - 1);

		if( indexNum > -1 ){
			if( !s.hasNegativeSignal[indexNum] ){
				num	= parseFloat(s.resultado);
			}else{
				temp = s.resultado;
				temp.substr(3);
				num	= parseFloat(temp) * -1;
			}
		}else{
			if( s.hasNegativeSignal.length > 0 ){
				temp = s.resultado;
				temp.substr(3);
				num = parseFloat(temp) * -1;
			}else{
				num	= parseFloat(s.resultado);
			}
		}
	
		if( num != 0 && lastCharResultado != "." ){
			if( s.pilhaNumeros.length == s.pilhaOperacoes.length ){
				s.pilhaNumeros.push(num);
				s.pilhaOperacoes.push(operador);
				s.resultado = "0";
				s.hasVirgula = false;
				s.negativeSignalApplied = false;
				s.historyInfo += " " + operador + " ";	
			}else{
				Alert.alert("Insira um número antes de adicionar uma nova operação");
			}
		}else{
			temp = s.resultado;
			temp.substr(0, 3);
			if( !s.negativeSignalApplied && temp == "(-)" ){
				s.negativeSignalApplied = true;
				s.hasNegativeSignal.push(false); //todo: review
			}
			if( lastCharResultado == "." ){
				Alert.alert("O número não pode terminar com uma vírgula");
			}else{
				if( operador == "-" ){
					if( indexNum > -1 ){
						if( !s.hasNegativeSignal[indexNum] ){
							s.resultado = "(-)" + s.resultado;
							s.hasNegativeSignal.push(true);
						}else{
							Alert.alert("Sinal negativo já adicionado");
						}
					}else{
						if( s.hasNegativeSignal.length > 0 ){
							Alert.alert("Sinal negativo já adicionado"); //todo: review
						}else{
							s.resultado = "(-)" + s.resultado;
							s.hasNegativeSignal.push(true);
						}
					}
				}else{
					Alert.alert("Insira um número antes de adicionar uma nova operação");
				}
			}
		}
		return s;
	}

	addNumber(numero,s){
		let resultado = s.resultado;
		let numAtualIsNegative = false;
		let temp = s.resultado;

		temp.substr(0,3);

		if( s.historyInfo == null ){
			s.historyInfo = "History: ";
		}

		s.historyInfo += numero;
		
		if( temp == "(-)" ){
			numAtualIsNegative = true;
		}

		if( numAtualIsNegative ){
			resultado.substr(3, resultado.length - 3);
		}

		if( parseFloat(resultado) == 0 && !s.hasVirgula ){
			if( numAtualIsNegative ){
				s.resultado = "(-)" + numero;
			}else{
				s.resultado = numero;
			}
		}else{
			s.resultado += numero;	
		}

		return s;
	}

	addVirgula(s){

		if( !s.hasVirgula ){
			s.resultado += ".";
			s.historyInfo += ".";
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
		let history;
		let data;
		let dataFormatted;

		if( s.resultado.charAt(s.resultado.length - 1) != "." ){
			s.pilhaNumeros.push(parseFloat(s.resultado));
			s.resultado = this.resolvePilha(s.pilhaOperacoes,s.pilhaNumeros);
			data = new Date();
			dataFormatted = data.getDate() + " - " + (data.getMonth() + 1) + " - " + data.getFullYear();
			history = new History(s.pilhaNumeros,s.pilhaOperacoes,s.resultado,dataFormatted,"Gabriel Plata"); //TODO - task: 4 
			s.historyApp.push(history);
			s = this.restartState(s,false);
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
		    		<Botao label="AC" onPress={ () => this.puloDoGato("AC") } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")} flex="2"/>
		    		<Botao label="%" onPress={ () => this.puloDoGato("%") } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    		<Botao label="÷" onPress={ () => this.puloDoGato("÷") } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    	</View>
		    	<View style={styles.linha}>
		    		<Botao label="9" onPress={ () => this.puloDoGato("9") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="8" onPress={ () => this.puloDoGato("8") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="7" onPress={ () => this.puloDoGato("7") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="*" onPress={ () => this.puloDoGato("*") } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    	</View>
		    	<View style={styles.linha}>
		    		<Botao label="6" onPress={ () => this.puloDoGato("6") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="5" onPress={ () => this.puloDoGato("5") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="4" onPress={ () => this.puloDoGato("4") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="-" onPress={ () => this.puloDoGato("-") } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    	</View>
		    	<View style={styles.linha}>
		    		<Botao label="3" onPress={ () => this.puloDoGato("3") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="2" onPress={ () => this.puloDoGato("2") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="1" onPress={ () => this.puloDoGato("1") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="+" onPress={ () => this.puloDoGato("+") } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
		    	</View>
		    	<View style={styles.linha}>
		    		<Botao label="0" onPress={ () => this.puloDoGato("0") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")} flex="2"/>
		    		<Botao label="." onPress={ () => this.puloDoGato(".") } textColor={this.colors("textBotaoNum")} bgColor={this.colors("bgBotaoNumero")} borderColor={this.colors("borderNumColor")}/>
		    		<Botao label="=" onPress={ () => this.puloDoGato("=") } textColor={this.colors("textBotaoOp")} bgColor={this.colors("bgBotaoOperador")} borderColor={this.colors("borderOpColor")}/>
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