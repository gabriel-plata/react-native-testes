import React, { Component } from 'react';
import { View, Alert } from 'react-native';

/*	

React-Native

*********************************************************************************
props comuns:
-style={}
*********************************************************************************


*********************************************************************************
flexbox

flex:1
flexDirection:'row'
flexDirection:'column' (padrão)
alignItems:'center'
alignItems:'flex-start' (padrão)
alignItems:'flex-end'
alignItems:'stretch'
justifyContent:'flex-start' (padrão)
justifyContent:'flex-end'
justifyContent:'center'
justifyContent:'space-between'
justifyContent:'space-around'
*********************************************************************************



*********************************************************************************
-----------------------------------COMPONENTES-----------------------------------
*********************************************************************************

=================================================================================
->Group:
=================================================================================

View

TouchableOpacity ( preferencialmente componente independente --propriedade={} )
-onPress={}															-REQUIRED

FlatList
-data={} //array de dados a serem exibidos (usar state)				-REQUIRED
-renderItem => função para renderizar itens a serem exibidos		-REQUIRED

SectionList
-sections={lista}													-REQUIRED
-renderItem={ ({item}) => { action(item) } }						-REQUIRED
-renderSectionHeader={ (section) => { action(section) } }			-REQUIRED

Modal
-animationType= "slide" "fade" "none"								-REQUIRED
-visible={bool}														-REQUIRED

Text

Picker
let variavel = this.state.variavel.map((v, k) => {
	return <Picker.Item key={k} value={k} label={v.nome} />
});
-selectedValue={} //itens disponíveis
-onValueChange={ (itemValue, itemIndex) => { this.action(itemValue,itemIndex) } }
-CONTENT: {variavel} 

ScrollView
-paggingEnable={bool}
-horizontal={bool}

=================================================================================
->Self-Closed
=================================================================================

Image
-source={require('destino')}										-REQUIRED

Button
-onPress={}															-REQUIRED

Switch //on-off button
-value={bool}														-REQUIRED
-onValueChange={ (v) => { action(v) } }								-REQUIRED
-thumbTintColor={} //cor da bola									-OPCIONAL
-onTintColor={} //cor do fundo										-OPCIONAL

Slider (selecão de um valor de um intervalo)
-value={state.value}
-minimumValue={}
-maximumValue={}
-minimumTintColor="cor" //cor da linha antes da bola
-maximumTrackTintColor="cor" //cor da linha depois da bola

StatusBar //barra superior do celular
-backgroundColor="cor" (Android only)
-barStyle={ "light-content" ou "dark-content" }
-currentHeight (Android Only)
-visible={bool}

TextInput
-autoCapitalize={
	characters 	-> all with CAPS 	
	words 		-> primeira letra de cada palavra with CAPS
	sentences 	-> primeira letra de cada sentença (padrão)
	none 		-> disable
} 
-autoCorrect={bool} //default: true
-dataDetectorTypes={	//IOS Only
	'phoneNumber'
	'link'
	'address'
	'calendarEvent'
	'none'
	'all'
}
-defaultValue="texto inicial" //value="texto inicial"
-placeholder="Dica sobre o input, semelhante ao defaultValue porém texto cinza e value=null"
-placeholderTextColor="cor" //default: cinza
-keyboardType={
	default
	numeric
	email-address
	phone-pad
	ascii-capable 			(IOS Only)
	numbers-and-punctuation	(IOS Only)
	url						(IOS Only)
	number-pad				(IOS Only)
	name-phone-pad			(IOS Only)
	decimal-pad				(IOS Only)
	twitter					(IOS Only)
	web-search				(IOS Only)
	visible-password		(Android Only)
}
-maxLength=NUMBER
-multiLine={bool} //default: false
-onChangeText={action}
-onBlur={action}
-onEndEditing={action}
-onFocus={action}
-onKeyPress={action}
-editable={bool}

=================================================================================
->Not JSX Component
=================================================================================

StyleSheet
-StyleSheet.create({
	class:{
		prop:'value'
	}
});

Alert
-Alert.alert("");

AsyncStorage
-AsyncStorage.setItem("nomeVar",value);
-AsyncStorage.getItem("nomeVar").then((value) => {
	action();
});

=================================================================================

*/

export default class ProjetoFinal extends Component {

	constructor(props){
		super(props);
		this.state = { 
			
		};
	}

	render(){
	    return(
		    <View style={styles.body}>
		    	
		    </View>
	    );
  	}
}

const styles = StyleSheet.create({
	body:{
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	}
});