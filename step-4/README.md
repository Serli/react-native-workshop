# Étape 4 - Ejection et ajout de notifications

## Objectif

Le but de cette étape est d'éjecter l'application et d'ajouter des notifications.
L'éjection de l'application va mettre à disposition les parties natives de notre appli dans les dossiers ios et android. Ceci va nous permettre d'ajouter de nouvelles librairies contenant du code natif et qu'il est nécessaire de lier à notre projet, ce que nous ne pouvons pas faire tant que l'application est encapsulée par Expo.

Nous allons ensuite utiliser la librairie OneSignal qui va nous permettre de gérer les notifications de notre application. Nous n'allons cependant pas ajouter de notifications pour iOS car cela demande de faire partie d'une équipe de développement disposant d'un compte payant.

Si vous souhaitez ajouter les notifications sur iOS, suivez [la documentation de OneSignal](https://documentation.onesignal.com/docs/react-native-sdk-setup) qui va vous guider étape par étape.

## C'est parti !

### Configuration de OneSignal

Commencez par créer un compte sur [le site OneSignal](https://onesignal.com/), puis ajoutez une nouvelle application. 

Ensuite générez une clé de serveur Firebase et ajoutez la à votre projet OneSignal en suivant [cette documentation](https://documentation.onesignal.com/docs/generate-a-google-server-api-key).

### Éjection de l'application

Nous allons maintenant éjecter notre projet en exécutant la commande ```yarn eject```. Choisissez l'option **_React NAtive: I'd like a regular React Native project_**, entre le nom de l'application : **_React Native Workshop_** puis saisissez le nom de projet pour Android Studio / Xcode : **_reactnativeworkshop_**.
Voilà votre projet est éjecté. Maintenant ajoutez la librairie onesignal avec la commande ```yarn add react-native-onesignal```.

### react-native link

Cette librairie nécessite d'être liée au projet. Pour la lier, vous avez deux possibilités : 

- ```react-native link``` qui va lier toutes les dépendances de votre projet ayant besoin d'être liées.
- ```react-native link react-native-onesignal``` qui va lier seulement la librairie *react-native-onesignal*.

Après l'éjection du projet, je vous conseille de lancer ```react-native link``` qui va s'assurer que toutes vos dépendances soient liées si elles le nécessitaient.

### Utilisation de One Signal dans l'application

Remplacez le code de votre fichier *App.js* par :

```javascript
import React, { Component } from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import OneSignal from 'react-native-onesignal';

console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated'];

export default class App extends Component {
  
  componentWillMount() {
    OneSignal.init("YOUR-ONESIGNAL-APP-ID");
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
      <AppNavigation />
    );
  }
}
```

Sur [le site OneSignal](https://onesignal.com/), dans l'onglet **Settings**, dans la partie **Keys & IDs**, récupérez votre *ONESIGNAL APP ID* et remplacez le dans la méthode :
```javascript
OneSignal.init("YOUR-ONESIGNAL-APP-ID");
```

Pour fonctionner, OneSignal nécessite que votre application soit au minimum au niveau d'API 26. Donc dans le fichier *android/app/build.gradle*, montez les versions de : 
- compileSdkVersion : ```compileSdkVersion 26```
- buildToolsVersion : ```buildToolsVersion "26.0.2"```
- targetSdkVersion : ```targetSdkVersion 26```
- com.android.support:appcompat-v7 : ```compile "com.android.support:appcompat-v7:26.0.2"```

Pour finir, remplacez le code du fichier *android/build.gradle* par :
```gradle
buildscript {
    repositories {
        jcenter()
        maven {
            url 'https://maven.google.com/'
            name 'Google'
        }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.0'
        classpath 'com.google.gms:google-services:4.0.0'
    }
}

allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven {
            url "$rootDir/../node_modules/react-native/android"
        }
        maven {
            url 'https://maven.google.com/'
            name 'Google'
        }
    }
}
```

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