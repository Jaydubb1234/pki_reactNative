import * as React from 'react';
import { Component } from 'react';
import { View, Text } from 'react-native';
import HomePagePosts from './components/posts/HomePagePosts'
import { Container, Footer, FooterTab, Button, Icon } from 'native-base'
import { Provider } from 'react-redux'
import store from './store'

const styles = {
  flex: 1,
  //justifyContent: 'center',
  //alignItems: 'center',
}

type Props = {};
export default class App extends Component<Props> {
  render = () => {
      return (
      <Provider store={store}>
        <View style={styles}>
            <HomePagePosts currentUserId={'14'}/>
            {/* <View style={{width: '100%',height: 45,backgroundColor: '#7e3f98'}}>
            <Text>This is Footer</Text>
            </View> */}
    
            {/* <Footer>
                <FooterTab>
                <Button transparent>
                    <Icon name='home' style={{color:'#7e3f98'}}/>
                </Button>  
                <Button transparent>
                    <Icon name='add-circle' style={{color:'#7e3f98'}}/>
                </Button>  
                <Button transparent>
                    <Icon name='aperture' style={{color:'#7e3f98'}}/>
                </Button>  
                <Button transparent>
                    <Icon name='people' style={{color:'#7e3f98'}}/>
                </Button>  
                <Button transparent>
                    <Icon name='book' style={{color:'#7e3f98'}}/>
                </Button>  
                </FooterTab>
            </Footer> */}
        
        </View>
      </Provider>
    );
  }
}
