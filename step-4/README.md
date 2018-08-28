# Étape 4 - Redux, Persistance des données, Éjection et Accès aux images du device

## Architecture


## Objectif

Le but de cette étape est d'éjecter l'application.
L'éjection de l'application va mettre à disposition les parties natives de notre appli dans les dossiers ios et android. Ceci va nous permettre d'ajouter de nouvelles librairies contenant du code natif et qu'il est nécessaire de lier à notre projet, ce que nous ne pouvons pas faire tant que l'application est encapsulée par Expo.


## C'est parti !

### Éjection de l'application

Nous allons maintenant éjecter notre projet en exécutant la commande ```yarn eject```. Choisissez l'option **_React Native: I'd like a regular React Native project_**, entrez le nom de l'application : **_React Native Workshop_** puis saisissez le nom de projet pour Android Studio / Xcode : **_reactnativeworkshop_**.
Voilà votre projet est éjecté. Maintenant ajoutez la librairie React Native Image Picker avec la commande ```yarn add react-native-image-picker```.

### react-native link

Cette librairie nécessite d'être liée au projet. Pour la lier, vous avez deux possibilités : 

- ```react-native link``` qui va lier toutes les dépendances de votre projet ayant besoin d'être liées.
- ```react-native link react-native-image-picker``` qui va lier seulement la librairie *react-native-image-picker*.

Après l'éjection du projet, je vous conseille de lancer ```react-native link``` qui va s'assurer que toutes vos dépendances soient liées si elles le nécessitaient.