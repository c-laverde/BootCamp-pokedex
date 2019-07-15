import React from 'react';
import {
 ActivityIndicator,
 AsyncStorage,
 StatusBar,
 StyleSheet,
 View,
 TextInput,
 Text,
 TouchableOpacity
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import PokemonList from './app/screens/PokemonList';
import PokemonDetail from './app/screens/PokemonDetail';

class SignInScreen extends React.Component {
 constructor(props) {
   super(props);
   this.state = { userName: null, pass: null };
 }

 static navigationOptions = {
   title: 'Login',
 };

 render() {
   return (
     <View style={styles.container}>
       <TextInput
         style={styles.input}
         onChangeText={(userName) => this.setState({userName})}
         value={this.state.userName}
         placeholder='username'
       />
       <TextInput
         style={styles.input}
         onChangeText={(pass) => this.setState({pass})}
         value={this.state.pass}
         placeholder='password'
         secureTextEntry= {true}
       />
       <TouchableOpacity style={styles.buttons} onPress={this._signIn}>
         <Text style={{fontSize: 20}}>Sign In</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.buttons} onPress={this._showSignUp}>
         <Text style={{fontSize: 20, color: 'green'}}>Sing Up</Text>
       </TouchableOpacity>
     </View>
   );
 }

 _signIn = () => {

  if(this.state.userName && this.state.pass) {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'NO-ID');
    const pass = navigation.getParam('pass', 'some default value');

    if(user.toUpperCase() === this.state.userName.toUpperCase() && pass == this.state.pass) {
      this.props.navigation.navigate('App');
    } else if (user === this.state.userName){
        alert('Incorrect Pass!')
    } else {
      alert('User no exit!')
    }
  } else {
    alert('Empty input!')
  }
};

 /* _signInAsync = () => {
   const { userName, pass } = this.navigation;
   console.log(this.props);

   if(userName == this.state.userName && pass === this.state.pass ){
     this.props.navigation.navigate('App');
   }
 }; */

 _showSignUp = () => {
   this.props.navigation.navigate('SingUp');
 };
}

class SignUpScreen extends React.Component {

 constructor(props) {
   super(props);
   this.state = { userName: null, pass: null };
 }

 static navigationOptions = {
   title: 'Sign up',
 };

 render() {
   return (
     <View style={styles.container}>
       <TextInput
         style={styles.input}
         onChangeText={(userName) => this.setState({userName})}
         value={this.state.userName}
         placeholder='username'
       />
       <TextInput
         style={styles.input}
         onChangeText={(pass) => this.setState({pass})}
         value={this.state.pass}
         placeholder='password'
         secureTextEntry= {true}
       />
       <TouchableOpacity style={styles.buttons} onPress={this._signIn} >
         <Text style={{fontSize: 20, color: 'green'}}>Sing Up</Text>
       </TouchableOpacity>
     </View>
   );
 }

  /* _signIn = async () => {
    this.props.navigation.navigate('SignIn');
  }; */

  _signIn = async () => {
    console.log('User ', this.state.userName, 'Pass ', this.state.pass)
    this.props.navigation.navigate('SignIn', { user: this.state.userName, pass: this.state.pass } );
  };
}

class HomeScreen extends React.Component {
 static navigationOptions = {
   title: 'Pókemon List',
 };

 render() {
   return (
     <View style={styles.containerList}>
       <View styele={styles.buttonContainer}>
         <TouchableOpacity style={styles.buttons} onPress={this._signOut} >
          <Text style={{fontSize: 16,}}>Sing Out</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.buttons} onPress={this._goToDetail} >
          <Text style={{fontSize: 16, color: 'blue'}}>Pókemon Detail</Text>
         </TouchableOpacity>
       </View>
       <View>
         <PokemonList></PokemonList>
       </View>
     </View>
   );
 }

 _goToDetail = () => {
   this.props.navigation.navigate('PokeDetail',
   /* {
     itemId: 86,
     otherParam: 'anything you want here',
   } */);
 };

 _signOut =  () => {
   this.props.navigation.navigate('Auth');
 };
}

class PokemonDetailScreen extends React.Component {
 static navigationOptions = {
   title: 'Pókemon Detail',
 };

 render() {

   const { navigation } = this.props;
   const itemId = navigation.getParam('itemId', 'default');

   return (
     <View style={styles.container}>
       {/* <Text>itemId: {JSON.stringify(itemId)}</Text>
       <Text>otherParam: {JSON.stringify(otherParam)}</Text> */}
       <PokemonDetail pokemonId={itemId} onclick={this._getItem}></PokemonDetail>
       <StatusBar barStyle="default" />
     </View>
   );
 }

 _getItem = () => {
   console.log('Send the pokemon ID');
 }

 _signOut =  () => {
   this.props.navigation.navigate('Auth');
 };
}

class AuthLoadingScreen extends React.Component {
 constructor() {
   super();
   this._bootstrapAsync();
 }

 // Fetch the token from storage then navigate to our appropriate place
 _bootstrapAsync = async () => {
   const userToken = await AsyncStorage.getItem('userToken');

   // This will switch to the App screen or Auth screen and this loading
   // screen will be unmounted and thrown away.
   this.props.navigation.navigate(userToken ? 'App' : 'Auth');
 };

 render() {
   return (
     <View style={styles.container}>
       <ActivityIndicator />
       <StatusBar barStyle="default" />
     </View>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: 'gray',
 },
 containerList: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: 'gray',
},
 input: {
   width:250,
   height: 40,
   borderColor: 'white',
   borderWidth: 1,
   borderRadius: 5,
   marginBottom: 10,
   paddingLeft: 5
 },
 buttons: {
   width:240,
   height: 50,
   margin: 5,
   backgroundColor: 'white',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: 10
 },
 buttonContainer: {
   justifyContent: 'flex-start',
 }
});

const AppStack = createStackNavigator({ Home: HomeScreen, PokeDetail: PokemonDetailScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen, SingUp: SignUpScreen });

export default createAppContainer(createSwitchNavigator(
 {
   AuthLoading: AuthLoadingScreen,
   App: AppStack,
   Auth: AuthStack,
 },
 {
   initialRouteName: 'AuthLoading',
 }
));