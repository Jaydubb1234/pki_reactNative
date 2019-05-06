import React from 'react';
import { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { List } from 'react-native-elements'
import PostCard from './PostCard';
import PostApi from '../../api/postApi'
import { renderFooter, renderHeader } from './HomePagePostRenders'
import { styles, styleContainer } from './homePageStyles'
import{ connect } from 'react-redux'
import { fetchPosts, refreshPosts } from '../../actions/postsActions'
import console = require('console');
import { Container } from 'native-base';

class FreeWriteScreen extends Component {
    handlePress = () => {
        console.log('press')
    }

    render() {
        return (
            <Container
                backgroundColor="#c95e0c"
                onPress={this.handlePress}
            />
        )
    }
}

export default FreeWriteScreen