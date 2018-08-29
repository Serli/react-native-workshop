# Étape 5 - Ajout de notifications

## Objectif

Le but de cette étape est d'ajouter des notifications à notre application.

Nous allons utiliser la librairie OneSignal qui va nous permettre de gérer les notifications. Nous n'allons cependant pas ajouter de notifications pour iOS car cela demande de faire partie d'une équipe de développement disposant d'un compte payant.

Si vous souhaitez ajouter les notifications sur iOS, suivez [la documentation de OneSignal](https://documentation.onesignal.com/docs/react-native-sdk-setup) qui va vous guider étape par étape.

## C'est parti !

### Configuration de OneSignal

Commencez par créer un compte sur [le site OneSignal](https://onesignal.com/), puis ajoutez une nouvelle application. 

Ensuite générez une clé de serveur Firebase et ajoutez la à votre projet OneSignal en suivant [cette documentation](https://documentation.onesignal.com/docs/generate-a-google-server-api-key).

### Utilisation de One Signal dans l'application

Ajoutez la librairie OneSignal avec la commande ```yarn add react-native-onesignal``` et liez la.

Remplacez le code de votre fichier *App.js* par :

```javascript
import React, { Component } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/store';
import OneSignal from 'react-native-onesignal';
import { ONESIGNAL } from './src/api/constants'

console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated'];

export default class App extends Component {
  
  componentWillMount() {
    OneSignal.init(ONESIGNAL.id);
    OneSignal.inFocusDisplaying(2);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    // Cet appel déclenche l'event listener 'ids'
    OneSignal.configure();
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    );
  }
}
```

Sur [le site OneSignal](https://onesignal.com/), dans l'onglet **Settings**, dans la partie **Keys & IDs**, récupérez votre *ONESIGNAL APP ID* et remplacez le dans le fichier api/constants :

```javascript
export const ONESIGNAL = {
    id: 'YOUR-ONESIGNAL-APP-ID'
}
```

Pour fonctionner, OneSignal nécessite que notre application soit au minimum au niveau d'API 26, nous nous sommes chargés de ça dans l'étape 4.

### Déclenchement de notifications

Vous pouvez lancer des notifications directement depuis le site OneSignal dans l'onglet Messages. Cela peut être très utile pour effectuer des tests mais si vous souhaitez déclencher les notifications depuis du code, OneSignal dispose d'une API que vous pouvez appeler pour déclencher vos notifications.

Il faudra envoyer une requête POST à l'url ```https://onesignal.com/api/v1/notifications``` avec le header **Authorization** ayant pour valeur **Basic YOUR-ONESIGNAL-REST-API-KEY** et le header **Content-Type** avec la valeur **application/json**.

Ensuite dans le body, si vous souhaitez envoyer votre notification à tout le monde :
```json
{
  "app_id": "YOUR-ONESIGNAL-APP-ID",
  "included_segments": ["All"],
  "data": {"needToReload": false},
  "headings": {"en": "Postman Notification"},
  "contents": {"en": "Cette notification a été envoyée à tout le monde."}
}
```

Et si vous souhaitez envoyer votre notification à seulement quelques personnes :
```json
{
  "app_id": "YOUR-ONESIGNAL-APP-ID",
  "include_player_ids": ["5022b693-a187-48a1-a207-6cef049a6365"],
  "data": {"needToReload": true},
  "headings": {"en": "Postman Notification"},
  "contents": {"en": "Cette notification n'a été envoyée qu'à 1 seule personne."}
}
```

Vous pouvez récupérer le player id d'un appareil lors de l'évènement *ids*, dans notre application cette évènement déclenche la méthode *onIds*.

Dans la partie **data**, vous pouvez mettre les informations que vous voulez fournir à votre application. Par exemple, ici on fourni ```needToReload``` que l'on va traiter dans l'application pour que, par exemple, l'application recharge les données si ce paramètre est à ```true```.