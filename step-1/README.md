# Étape 1 - La liste

## Architecture

Ce dossier a été généré par la commande ```create-react-native-app```. 

Dans le dossier *src*, nous avons rajouté :

- Un dossier *api* qui contient les constantes nécessaires à l'utilisation de l'API de THE MOVIE DB.

- Un dossier *services* contenant les méthodes qui vous seront utiles à la récupération des données de l'API.

- Un dossier *styles* dans lequel vous écrirez les styles de votre application

- Un fichier *MovieList.js* dans lequel vous devrez écrire le code permettant d'afficher une liste de films.

- Un fichier *Movie.js* dans lequel devrez écrire le code permettant d'afficher un film dans la liste.

Le fichier *App.js* contient le composant qui sera appelé par votre application.
Nous l'avons pré-rempli pour qu'il affiche le composant MovieList. Il contient également un composant View qui permet de ne pas empiéter sur la barre de status.
Dans cette étape vous n'aurez pas à le modifier.

## Objectif

Le but de cette étape est de compléter les fichiers MovieList.js, Movie.js et le fichier de style movie.js afin d'obtenir un écran avec la liste des films actuellement à l'affiche. Vous devez afficher chaque film avec son affiche, son titre, un aperçu du résumé, la date de sortie... .

Il faudra également ajouter un système de pull to refresh pour que l'utilisateur puisse mettre à jour sa liste sans relancer l'application.

Vous n'hésiterez pas à mettre du style dans vos composants pour prendre en main le style dans React Native en utilisant Flexbox.

## C'est parti !

Si vous n'avez pas lancé le script ```install.sh```, vous devez lancer la commande ```yarn install``` pour installer les dépendances du projet.

Pour que l'application se lance sur un émulateur Android, il faut que l'émulateur soit déjà ouvert au lancement du projet. En revanche sur iOS, l'émulateur se lance automatiquement.

Pour lancer le projet, vous avez trois possibilités :

- ```yarn start``` va lancer le serveur et une fois le serveur lancé, il vous suffira d'appuyer sur la touche **a** pour lancer l'application sur l'émulateur Android et sur **i** pour lancer l'application sur l'émulateur iOS.

- ```yarn android``` va lancer le serveur et l'application directement sur l'émulateur Android.

- ```yarn ios``` va lancer le serveur et l'application directement sur l'émulateur iOS.

Pour lancer l'application sur un smartphone réel, il vous suffit de télécharger l'application **Expo** sur le store de votre appareil et de scanner le QR Code qui s'affiche au lancement du serveur.

## Amélioration ( optionnel )

L'API nous renvoie la liste des films paginée, vous pouvez ajouter à l'application des boutons permettant d'aller de page en page. Si vous manquez d'idée, les prochaines étapes de l'application disposent de ces boutons. Vous pouvez donc lancer une de ces étapes pour vous inspirer du résultat obtenu.