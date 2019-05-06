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
type Props = {};
@connect( store => {
    console.log('store ',store)
    return {
        posts: store.posts.posts,
        lastPostId: store.posts.lastPostId,
        isPostLoaded: store.posts.isPostLoaded,
        refreshing: store.posts.refreshing,
        error: store.posts.error
    }
})
export default class HomePagePosts extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      postData: [],
      usersData: [],
      isLoaded: false,
      loading:false,
      lastId: null,
      refreshing: false,
      error: false
    }
  }

  componentDidMount(){
    //this.makeRemoteRequest()
    this.props.dispatch(fetchPosts('14', this.props.refreshing, null))
  }

  makeRemoteRequest = () => {
    this.setState({loading: true})
    Promise.resolve(PostApi.getPost(this.props.currentUserId,this.state.lastId))
      .then( data => {
        data.err ?
          this.setState({
            loading: false,
            refreshing: false,
            error: true,
            isLoaded: true
          }) 
        :
          this.setState({
            postData: this.state.refreshing ? [...data.res, ...this.state.postData] : [...this.state.postData, ...data.res],
            loading: false, 
            refreshing: false,
            isLoaded: true
          })
      }
    )
  }

  handleRefresh = () => {
    // this.setState({
    //   refreshing: true,
    //   lastId: null
    // }, () => {
    //   this.makeRemoteRequest()
    // })
    this.props.dispatch(refreshPosts('14', this.props.refreshing, null))
  }

  handleLoadMore = () => {
    // this.setState({
    //   lastId: this.state.postData[this.state.postData.length-1].id
    // }, () => {
    //   this.makeRemoteRequest()
    // })
    this.props.dispatch(fetchPosts('14', this.props.refreshing, this.props.lastPostId))
  }

  render() {
    //const {isLoaded, refreshing, error, postData} = this.state
    const { posts, isPostLoaded, lastPostId, refreshing, error } = this.props
    console.log('posts ',posts)
    const postData = posts
    //const pData = posts[posts.length-1]
    // console.log('isPostLoaded ',isPostLoaded)

    //pData ? postData.push(...pData) : null
    console.log('postData ',postData)
    // console.log('lastPostId ',lastPostId)
    // console.log('posts.length ',posts.length)
    // console.log('posts[0] ',posts[0])
    // console.log('this.props ',this.props)
      return (
      <View style={styles.container}>
        {
          !isPostLoaded ? 
            <Text style={{textAlign: 'center'}}>Loading...</Text> : 

            error ? 
            <Text style={{textAlign: 'center'}}>Sorry, Network Issues</Text> : 
            <List containerStyle={styleContainer}>
              <FlatList
                  data={postData}
                  renderItem={(post) => (
                    <PostCard post={post} />
                  )}
                  keyExtractor={(post) => post.id}
                  ListHeaderComponent={renderHeader(postData)}
                  ListFooterComponent={renderFooter(this.state.loading)}
                  refreshing={refreshing}
                  onRefresh={this.handleRefresh}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0}
              />
          </List>
        }
      </View>
    );
  }
}