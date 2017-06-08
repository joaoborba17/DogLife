import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, Image } from 'react-native';
import { Constants, Google, Facebook, Location, Permissions, MapView } from 'expo';
import { StackNavigator } from 'react-navigation'

class TelaPrincipal extends Component {
_irparaOutraTela = () => {

const { navigate } = this.props.navigation;

navigate('ProximaTela')

}

  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      switch (type) {
        case 'success': {
          Alert.alert(
            'Logged in!',
            `Hi ${user.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
    
        <Text style={styles.destaque}>
        DogLife 
        </Text>
        
          <Image
          source={{ uri: 'https://www.corepoweryoga.com/sites/default/files/IMCE/CPYBlog/Pets%20WIDE.jpg' }}
          style={{ height: 140, width: 200 }}
        />
      
         
      <View style={styles.button}>
       <Button
          title="Entrar com o Facebook"
          onPress={this._handleFacebookLogin}
        />
      </View>
       <View style={styles.button}>
          <Button
            title="Entrar com o Google"
            onPress={this._handleGoogleLogin}
          />
      </View>
      
       <View style={styles.button}>
      <Button
        title="Proxima Tela"
        onPress={this._irparaOutraTela}
      />
       </View>
       </View>
    
  
    
    
    );
  }
}

const styles = StyleSheet.create({
  destaque: {
    color: "#003311", 
    fontSize: 40
    
    
  }, 
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
    },
button:{
  marginTop: 20
}
});
class ProximaTela extends Component {
  state = {
    locationResult: null,
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location) });
 };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    return (
      <View>
        <Text></Text>
        <Button title="" onPress={this._irparaOutraTela}/>
        
        <Text>
          Location: {this.state.locationResult}
        </Text>
      
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{latitude: this.state.locationResult.latitude, longitude: this.state.locationResult.longitude}}
          onRegionChange={this._handleMapRegionChange}
        />
      
      </View>
    );
  }
}

const AplicativoExemplo = StackNavigator({

Main: {screen: TelaPrincipal},
ProximaTela: {screen: ProximaTela},

});

export default AplicativoExemplo
