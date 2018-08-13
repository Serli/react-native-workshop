# Étape 1 - Navigation vers le détail d'un film

## Architecture

Ce dossier reprend ce qui a été fait dans l'étape 0 et rajoute une gestion de la pagination des films.

Dans le dossier *src*, nous avons rajouté :

- Un dossier *assets* qui contient une image que nous allons utiliser lorsqu'un acteur ne dispose d'aucune photo.

- Une méthode *getCredits* permettant de récupérer le casting d'un film.

- Le style complet que nous avons utilisé pour la correction de cette étape. Vous pouvez l'utiliser puisque la manipulation du style faisait partie de l'étape précédente.

- Un fichier *MovieDetail.js* dans lequel vous écrirez le code affichant le détail d'un film

- Un fichier *Person.js* dans lequel devrez écrire le code permettant d'afficher un acteur dans la liste des acteurs ayant tourné dans le film.

## Objectif

Le but de cette étape est d'ajouter de la navigation dans l'application. Pour ce faire, vous allez devoir ajouter la librairie **react-navigation**. Il faudra également créer un fichier gérant la navigation et compléter les composants *MovieDetail* et *Person* afin d'avoir un écran affichant le détail d'un film. Vous devrez également utiliser les LayoutAnimation de React Native pour cacher/afficher les boutons de pagination lors du scroll vers le bas/haut.

L'écran de détail d'un film sera composé du titre du film, de son synopsis, de la note des utilisateurs, de sa date de sortie et de son casting. L'affichage du casting se fera par une liste horizontale dans laquelle chaque élément contiendra la photo de l'acteur, son nom et le nom de son personnage dans le film.

## C'est parti !

### Navigation

La première chose à faire est d'ajouter la librairie **react-navigation**. Pour ce faire lancez la commande ```yarn add react-navigation```.

Créez le dossier navigation dans *src/*. Ensuite créez le fichier AppNavigation.js à l'intérieur de ce nouveau dossier.

Dans ce fichier, exportez un composant AppNavigation :

```javascript
import React, { Component } from "react";

export default class AppNavigation extends Component {
  render() {
    return //TODO
  }
}
```

Nous allons maintenant créer un StackNavigator qui permet de définir les écrans atteignables lors de la navigation. Toujours dans le même fichier mais à l'extérieur du composant créez la constante Stack : 

```javascript
import { createStackNavigator } from "react-navigation";
import MovieList from "../MovieList";
import MovieDetail from "../MovieDetail";

const Stack = createStackNavigator(
  {
    MovieList: {
      screen: MovieList,
      navigationOptions: () => {
        return {
          headerTitle: "À l'affiche"
        };
      }
    },
    MovieDetail: {
      screen: MovieDetail,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: navigation.state.params.item.title
        };
      }
    }
  },
  {
    navigationOptions: () => ({
      headerTintColor: "black"
    }),
    initialRouteName: "MovieList"
  }
);
```

Ensuite modifiez la méthode render de votre composant pour qu'elle renvoie notre Stack :
```javascript
render() {
  return <Stack />;
}
```

Maintenant que vous avez défini la navigation de votre application, vous pouvez modifier le composent App pour qu'il rende le composant AppNavigation.

À partir de maintenant votre application se lance sur l'écran défini dans le paramètre initialRouteName de votre Stack. Pour pouvoir se déplacer vers l'écran de détail d'un film, il va falloir gérer le "click" sur le film.

React Native met à disposition 3 types de boutons :

- TouchableHighlight : un bouton qui applique un couche de couleur lorsque l'on appui dessus (par défaut la couche est noire).
- TouchableWithoutFeedback : un bouton qui ne montre aucun signe que l'on a bien appuyé dessus.
- TouchableOpacity : un bouton qui réduit son opacité lorsque l'on appui dessus. Il dispose d'un attribut activeOpacity qui permet de régler le changement d'opacité.

Ces composants englobent un autre composant et le rendent "cliquable". Si vous voulez afficher plusieurs composants à l'intérieur d'un Touchable, il faut qu'ils soient contenus dans une View car les Touchable n'acceptent qu'un seul composant.

La méthode à appeler lors de l'appui sur un Touchable, est à préciser dans l'attribut onPress.

Remplacez la View englobant le composant Movie par un TouchableOpacity pour que chaque film devienne "cliquable". Ensuite créez une méthode onPress :

```javascript
onPress = item => {
    const { navigate } = this.props.navigation;
    navigate({ routeName: 'MovieDetail', params: { item } });
  }
```

La méthode navigate permet de naviguer vers l'écran précisé dans le paramètre **routeName** et l'on peut passer des paramètres au nouvel écran en les indiquant dans **params**. Le nouvel écran aura alors accès à ces paramètres dans **this.props.navigation.state.params**. Ces paramètres peuvent également être récupéré dans la navigation. Par exemple dans notre stack de navigation, nous avons défini l'écran MovieDetail de cette façon :

```javascript
MovieDetail: {
      screen: MovieDetail,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: navigation.state.params.item.title
        };
      }
    }
```

Ici, le titre de l'écran est récupéré dans l'attribut params.

Pour terminer la navigation, il suffit de passer la méthode onPress au composant TouchableOpacity : 

```javascript
<TouchableOpacity onPress={() => this.onPress(item)}>
```

### Détail d'un film

Maintenant que l'écran de détail d'un film est atteignable, vous devez compléter les composants MovieDetail et Person pour obtenir le résultat attendu dans l'objectif de cette étape.

### Animation

Pour réaliser des animations, il existe une librairie nommée **react-native-animatable** mais React Native permet directement de créer des animations simple rapidement.

Pour que les boutons gérant les pages ne gènent pas la visibilité de notre liste nous allons les faire disparaitre lorsque l'utilisateur scroll vers le bas et les faire réapparaitre lorsqu'il scroll vers le haut.

Dans le fichier MovieList.js, importez **LayoutAnimation** et **UIManager** depuis react-native.

Pour que les animations fonctionnent sur Android il faut ajouter cette ligne dans le constructeur du composant :

```javascript
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
```

Attention sur Android, les animations ont du mal à gérer beaucoup d'élements.

Nous allons maintenant voir la ligne qui va permettre de réaliser une animation d'entrée/sortie d'un élément :

```javascript
LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
```

Il faut placer cette ligne juste avant un setState et lors du prochain rendu du composant, LayoutAnimation fera en sorte de faire une transition entre le précédent état de chaque élement et son nouvel état.

Dans notre cas, si on utilise le preset easeInEaseout sur un élément qui passe d'une coordonnée y = 10 à une coordonnée y = 110, on va voir l'élément glisser jusqu'à sa nouvelle position.

Pour ce faire, il va falloir rajouter une variable dans le state que nous appelerons **ascending** (elle permettra de savoir si l'utilisateur monte ou descend la liste) et qui sera initialisée à **true**.

Ensuite il faut modifier le style de la View contenant ce que l'on veut animer. Dans la méthode renderPage rajoutez une condition sur le style de la View principale :

```javascript
<View style={this.state.ascending ? styles.movieList.pageContainerVisible : styles.movieList.pageContainerHidden}>
```

Le style *pageContainerHidden* affiche le composant de la même façon que le style *pageContainerVisible* mais l'affiche plus bas que le bas de l'écran et donc il n'est pas visible.

Il ne reste plus qu'a mettre à jour la variable ascending au scroll de l'utilisateur pour que l'animation se déclenche.

La FlatList dispose des propriétés de la ScrollView et la ScrollView dispose d'un attribut onScroll qui prend une fonction et qui l'exécute lorsque l'utilisateur fait défiler le composant.

Ajoutez ```onScroll={this.handleScroll}``` à la FlatList et supprimez ```ListFooterComponent={<View style={{ height: 50 }} />}```. Cette dernière ligne ajoutait une marge à la fin de la liste pour que les boutons n'empêchent pas de visualiser le dernier film de la liste mais nous n'allons plus avoir besoin de cette marge.

Ajoutez la ligne ```this.lastY = 0;``` dans le constructeur et ajoutez la méthode *handleScroll* qui va permettre de savoir dans quel sens s'effectue le scroll :

```javascript
handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if(y >= 0){
      if(y - this.lastY > 0 && this.state.ascending){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ascending: false});
      } else if(y - this.lastY < 0 && !this.state.ascending){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ascending: true});
      }
      this.lastY = y;
    }
  }
```

Et voilà maintenant les boutons disparaissent lorsue l'on scroll vers le bas et réapparaissent lorsque l'on scroll vers le haut. Cependant sur iOS, lorsque l'on atteint le bout de la liste, il y a un rebond qui fait remonter la liste. Il va donc falloir désactiver ce rebond grâce à l'attribut **bounces** de la FlatList. Mais le passer simplement à false n'est pas suffisant car cela désactive le pull to refresh. Il faut donc le relier à notre variable ascending : 

```javascript
bounces={this.state.ascending}
```

Maintenant lorsque l'on descend, on désactive le rebond et lorsque l'on monte, on le réactive pour pouvoir utiliser le pull to refresh.