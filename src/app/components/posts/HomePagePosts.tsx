/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
//import PostApi from '../../api/postApi'
import{ connect } from 'react-redux'
import { fetchPosts, refreshPosts } from '../../actions/postsActions'
import { renderFooter, renderHeader } from './HomePagePostRenders'
import PostCard from './PostCard';
import { styles, styleContainer } from './homePageStyles'
//import PropTypes from 'prop-types'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {
  currentUserId: string
  fetchPosts: any
  refreshing: boolean
  refreshPosts: any
  lastPostId: number
  isPostLoaded: boolean
  error: any
  posts: any []
  loading:boolean
  //posts: Array<{}>
};
//interface Props {};
class HomePagePosts extends Component<Props> {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount = () => {
    this.props.fetchPosts(this.props.currentUserId, this.props.refreshing, this.props.lastPostId)
  }

  handleRefresh = () => {
    this.props.refreshPosts(this.props.currentUserId, this.props.refreshing, this.props.lastPostId)
  }

  handleLoadMore = () => {
    this.props.fetchPosts(this.props.currentUserId, this.props.refreshing, this.props.lastPostId)
  }

  render = () => {
    const { posts, isPostLoaded, refreshing, error } = this.props
    return (
      <View style={styles.container}>
        {
          !isPostLoaded ? 
            <Text style={{textAlign: 'center'}}>Loading...</Text> : 

            error ? 
            <Text style={{textAlign: 'center'}}>Sorry, Network Issues</Text> : 
            //<List containerStyle={styleContainer}>
              <FlatList
                  data={posts}
                  renderItem={(post) => (
                    <PostCard post={post} />
                  )}
                  keyExtractor={(post, ind) => ind.toString()/*post.id.toString()*/}
                  ListHeaderComponent={renderHeader(posts)}
                  ListFooterComponent={renderFooter(this.props.loading)}
                  refreshing={refreshing}
                  onRefresh={this.handleRefresh}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0}
              />
          //</List>
        }
      </View>
    );
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.welcome}>Welcome to React Native!</Text>
    //     <Text style={styles.instructions}>To get started, edit App.js</Text>
    //     <Text style={styles.instructions}>{instructions}</Text>
    //   </View>
    // );
  }
}

// HomePagePosts.propTypes = {
//   fetchPosts: PropTypes.func.isRequired,
//   posts: PropTypes.object.isRequired
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

const mapStateToProps = state => {
  const {posts, error, refreshing, lastPostId, isPostLoaded, loading} = state.postReducer
  return {
    posts,
    error,
    refreshing,
    lastPostId,
    isPostLoaded,
    loading
  }
}

const mapDispatchToProps = dispatch => {
 return {
  fetchPosts: (currentUserId, refreshing, lastPostId) => dispatch(fetchPosts(currentUserId, refreshing, lastPostId)),
  refreshPosts: (currentUserId, refreshing, lastPostId) => dispatch(refreshPosts(currentUserId, refreshing, lastPostId))
  //fetchPosts: () => dispatch(fetchPosts('14', false, null))
  //fetchPosts: () => fetchPosts('14', false, null)
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePagePosts) //*
//export default connect(mapStateToProps)(HomePagePosts) //*