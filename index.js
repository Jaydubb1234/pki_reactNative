import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';

import HomePagePosts from './src/app/components/posts/HomePagePosts'
import { Navigation } from 'react-native-navigation'

//AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent('HomePostsScreen', () => HomePagePosts)
App()

// Navigation.registerComponent(`navigation.p;ayground.WelcomeScreen`, () => App)

// Navigation.events().registerAppLaunchedListener( () => {
//     Navigation.setRoot({
//         root:{
//             component:{
//                 name:`navigation.playground.WelcomeScreen`
//             }
//         }
//     })
// })
