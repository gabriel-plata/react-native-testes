import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';

export default class ProjetoFinal extends Component {

	constructor(props){
		super(props);
		this.state = {consumido:0, status:'Ruim', pct:0};
		this.consumir = this.consumir.bind(this);
		this.atualizar = this.atualizar.bind(this);
	}

	atualizar(){
		let s = this.state;

		if(s.consumido >= 2000){
			s.status = 'Bom';
		}else{
			s.status = 'Ruim';
		}

		s.pct = (s.consumido/2000) * 100;

		this.setState(s);
	}

	consumir(){
		let s = this.state;
		s.consumido += 200;
		this.setState(s);
		this.atualizar();
	}

	render(){
	    return(
		    <View style={styles.body}>
		   		<ImageBackground style={styles.bgimage} source={require('./images/waterbg.png')}>
		   			<View>
			   			<View style={styles.infoArea}>
			   				<View style={styles.area}>
			   					<Text style={styles.textoInfo}>Meta</Text>
			   					<Text style={styles.dados}>2000ml</Text>
			   				</View>
			   				<View style={styles.area}>
								<Text style={styles.textoInfo}>Consumido</Text>
								<Text style={styles.dados}>{this.state.consumido}ml</Text>
			   				</View>
			   				<View style={styles.area}>
			   					<Text style={styles.textoInfo}>Status</Text>
			   					<Text style={styles.dados}>{this.state.status}</Text>
			   				</View>
			   			</View>
			   			<View style={styles.pctArea}>
			   				<Text style={styles.pctTexto}>{Math.floor(this.state.pct)}%</Text>
			   			</View>
			   			<View style={styles.btnArea}>
			   				<Button title="Consumir" onPress={this.consumir} color="#841584"/>
			   			</View>
		   			</View>
		   		</ImageBackground>
		    </View>
	    );
  	}
}

const styles = StyleSheet.create({
	body:{
		flex:1
	},
	bgimage:{
		flex:1,
		width:null
	},
	infoArea:{
		flex:1,
		flexDirection:'row',
		marginTop:70
	},
	area:{
		flex:1,
		alignItems:'center'
	},
	textoInfo:{
		fontSize:20,
		fontWeight:'bold',
		color:'#45B2FC'
	},
	dados:{
		color:'#2B4274',
		fontSize:15,
		fontWeight:'bold'
	},
	pctArea:{
		marginTop:170,
		alignItems:'center'
	},
	pctTexto:{
		fontSize:70,
		color:'#FFFFFF',
		backgroundColor:'transparent'
	},
	btnArea:{
		marginTop:30,
		alignItems:'center'
	}
});