import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import React, {Component} from 'react'
//import MapScreen from './components/MapScreen'
import * as Location from 'expo-location'
import MapView, {Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

//import { registerRootComponent } from 'expo';
//import { Permissions } from 'expo';
//import MapView, {Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
//import Geolocation from '@react-native-community/geolocation';

//Geolocation.setRNConfiguration(config);


// const checkPermission = async () => {
//   const hasPermission = await Location.requestForegroundPermissionsAsync();
//   if (hasPermission.status === 'granted') {
//     const permission = await askPermission();
//     return permission;
//   }
//   return true;
// };
// const askPermission = async () => {
//   const permission = await Location.getForegroundPermissionsAsync();
//   return permission.status === 'granted';
// };

// export const getUserLocation = async () => {
//   const userLocation = await Location.getCurrentPositionAsync();
//   return userLocation.coords;
// };



export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      elements: [],
      south: null,
      west: null,
      north: null,
      east: null,
      latitude: 35.681236,
      longitude: 139.767125,
    }
  }

  updateState(location) {
    this.setState({
      ...this.state,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  async componentDidMount(){
    
    try {
      let { status } =  await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location =  await Location.getCurrentPositionAsync({});
      this.updateState(location);
    } catch (error) {
      console.log(error);
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <MapView
                style={styles.map}
                region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
                }}
            >
                <Marker coordinate={this.state}/>
            </MapView>
        <StatusBar style="auto" />
      </View>
    )
  }
  
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

