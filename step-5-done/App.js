import React, { Component } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import OneSignal from 'react-native-onesignal';

console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated'];

export default class App extends Component {
  
  componentWillMount() {
    OneSignal.init("080417cf-9e9a-426f-a16b-ed9a795db307");
    OneSignal.inFocusDisplaying(2);
    // Cet appel déclenche l'event listener 'ids'
    OneSignal.configure();
  
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
}

componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
}

onReceived(notification) {
    console.log("Notification received: ", notification);
}

onOpened(openResult) {
  console.log('Message: ', openResult.notification.payload.body);
  console.log('Data: ', openResult.notification.payload.additionalData);
  console.log('isActive: ', openResult.notification.isAppInFocus);
  console.log('openResult: ', openResult);
}

onIds(device) {
console.log('Device info: ', device);
}

  render() {
    return (
        <AppNavigation />
    );
  }
}
