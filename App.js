import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Text
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
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{  width:200, height: 40, borderColor: 'blue', borderWidth: 1, borderRadius: 5, marginBottom: 5, paddingLeft: 5 }}
          onChangeText={(userName) => this.setState({userName})}
          value={this.state.userName}
          placeholder='username'
        />
        <TextInput
          style={{ width:200, height: 40, borderColor: 'blue', borderWidth: 1, borderRadius: 5, marginBottom: 5, paddingLeft: 5 }}
          onChangeText={(pass) => this.setState({pass})}
          value={this.state.pass}
          placeholder='password'
          secureTextEntry= {true}
        />
        <Button title="Sign in!" onPress={this._signInAsync} />
        <Button title="Sign up!" onPress={this._showSignUp} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  _showSignUp = () => {
    this.props.navigation.navigate('SingUp');
  };
}

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign up',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{  width:200, height: 40, borderColor: 'blue', borderWidth: 1, borderRadius: 5, marginBottom: 5 }}
          // onChangeText={(text) => this.setState({ text })}
          value=''
          placeholder='username'
          textContentType='emailAddress'
        />
        <TextInput
          style={{ width:200, height: 40, borderColor: 'blue', borderWidth: 1, borderRadius: 5, marginBottom: 5 }}
          // onChangeText={(text) => this.setState({ text })}
          value=''
          placeholder='password'
          textContentType='password'
        />
        <Button title="Sign up!"/>
        {/* <Button title="Sign up!" onPress={this._signInAsync} /> */}
      </View>
    );
  }

  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('App');
  // };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Pókemon List!',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Button style={styles.buttons} title="Show me more of the app" onPress={this._showMoreApp} />
          <Button style={styles.buttons} title="Actually, sign me out :)" onPress={this._signOutAsync} />
        </View>
        <View>
          <PokemonList></PokemonList>
        </View>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other', 
    {
      itemId: 86,
      otherParam: 'anything you want here',
    });
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Pókemon Detail',
  };

  render() {

    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <PokemonDetail pokemonId={itemId}></PokemonDetail>
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
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

  // Render any loading content that you like here
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
  buttonsContainer: {
    backgroundColor: 'white',
    padding: 5,
  },
  buttons: {
    margin: 5,
  }
});

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
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