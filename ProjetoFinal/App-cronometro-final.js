import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class ProjetoFinal extends Component {

	constructor(props){
		super(props);
		this.state = {
			start:false,
			time:0.0,
			hours:0,
			minutes:0,
			days:0,
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
      			if(s.time >= 60){
      				s.time = 0.0;
      				s.minutes += 1;
      				if(s.minutes >= 60){
      					s.minutes = 0;
      					s.hours += 1;
      					if(s.hours >= 24){
      						s.minutes = 0;
      						s.hours = 0;
      						s.days += 1;
      					}
      				}
      			}
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
		s.minutes = 0;
		s.hours = 0;
		s.days = 0;
		this.setState(s);
	}

	render(){
	    return(
		    <View style={styles.body}>
		    	<View style={styles.bodyInfo}>
		    		<View style={styles.viewInfo}>
		    			<Text style={styles.labelInfo}>Dias:</Text>
		    			<Text style={styles.infoValue}>{this.state.days}</Text>
		    		</View>
		    		<View style={styles.viewInfo}>
		    			<Text style={styles.labelInfo}>Horas:</Text>
		    			<Text style={styles.infoValue}>{this.state.hours}</Text>
		    		</View>
		    		<View style={styles.viewInfo}>
		    			<Text style={styles.labelInfo}>Minutos:</Text>
		    			<Text style={styles.infoValue}>{this.state.minutes}</Text>
		    		</View>
		    	</View>
		    	<Image source={require('./images/relogio.png')} />
		    	<Text style={styles.timer}>{this.state.time.toFixed(1)}</Text>
		    	<View style={styles.viewBotao}>
		    		<TouchableOpacity style={styles.botao} onPress={this.zerar}>		
						<Text style={styles.titulo}>Zerar</Text>
					</TouchableOpacity>		
					<TouchableOpacity style={styles.botao} onPress={this.start}>		
						<Text style={styles.titulo}>{this.state.botao}</Text>
					</TouchableOpacity>
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
	viewBotao:{
		flexDirection:'row',
		height:40,
		marginTop:80
	},
	botao:{
		flex:1,
		backgroundColor:'#886532',
		alignItems:'center',
		justifyContent:'center',
		borderRadius:5,
		height:40,
		margin:10
	},
	titulo:{
		fontSize:17,
		fontWeight:'bold',
		color:'#FFFFFF'
	},
	bodyInfo:{
		flexDirection:'row',
		height:40,
		marginBottom:160
	},
	viewInfo:{
		flexDirection:'row',
		backgroundColor:'#886532',
		marginRight:10,
		marginLeft:10,
		paddingRight:20,
		paddingLeft:20
	},
	labelInfo:{
		color:'#FFFFFF',
		fontWeight:'bold',
		fontSize:20,
		marginRight:5
	},
	infoValue:{
		color:'#FF0000',
		fontWeight:'bold',
		fontSize:20
	}
});