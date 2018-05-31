import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class Botao extends Component{

	constructor(props){
		super(props);
		this.state = {};
		this.styles = StyleSheet.create({
			botao:{
				flex:1,
				borderColor:props.color,
				borderWidth:4,
				backgroundColor:'transparent',
				alignItems:'center',
				justifyContent:'center',
				borderRadius:5,
				height:40,
				margin:10
			},
			titulo:{
				fontSize:17,
				fontWeight:'bold',
				color:props.textcolor
			},
			botaoArea:{
				flex:1,
				alignItems:'center',
				justifyContent:'center'
			}
		});
	}

	render(){
		return({
			<TouchableOpacity style={this.styles.botao} onPress={this.props.onPress}>
				<View style={this.styles.botaoArea}>		
					<Text style={this.styles.titulo}>{this.props.title}</Text>
				</View>
			</TouchableOpacity>
		});
	}
}

export default class ProjetoFinal extends Component {

	constructor(props){
		super(props);
		this.state = {
			start:false,
			time:0.0,
			botao:'Start'
		};
		this.timer = null;
		this.start = this.start.bind(this);
		this.zerar = this.zerar.bind(this);
	}

	start(){
		let s = this.state;
		if(!s.start){
			s.start = true;
			s.botao = 'Stop';
			this.timer = setInterval( () => {
				let s = this.state;
      			s.time += 0.01;
      			this.setState(s);
    		}, 10);
		}else{
			s.start = false;
			s.botao = 'Start';
			clearInterval(this.timer);
			this.timer = null;
		}
		this.setState(s);
	}

	zerar(){
		let s = this.state;
		if(this.timer != null){
			clearInterval(this.timer);
			this.timer = null;
			s.start = false;
			s.botao = 'Start';
		}
		s.time = 0.0;
		this.setState(s);
	}

	render(){
	    return(
		    <View style={styles.body}>
		    	<Image source={require('./images/relogio.png')} />
		    	<Text style={styles.timer}>{this.state.time.toFixed(2)}</Text>
		    	<View style={styles.botaoArea}>
		    		<Botao onPress={this.zerar} color="#886532" title="Zerar" textcolor="#FFFFFF"/>
		    		<Botao onPress={this.start} color="#886532" title={this.state.botao} textcolor="#FFFFFF"/>
		    	</View>
		    </View>
	    );
  	}
}

const styles = StyleSheet.create({
	body:{
		flex:1,
		alignItems:'center',
		paddingTop:20,
		justifyContent:'center',
		backgroundColor:'#2C1F30'
	},
	timer:{
		fontSize:80,
		color:'#BAA07A',
		fontWeight:'bold',
		backgroundColor:'transparent',
		marginTop:-150
	},
	botaoArea:{
		flexDirection:'row',
		height:40,
		marginTop:80
	}
});