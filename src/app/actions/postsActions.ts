import PostApi from '../api/postApi'
import console = require('console');
//import console = require('console');

export function fetchPosts(currentUserId, refreshing, lastPostId?){
    console.log('this.props action ',this.props)
    // return {
    //     type:'FETCH_POSTS',
    //     payload: {
    //         posts
    //     }
    // }
    return function(dispatch){
        Promise.resolve(PostApi.getPost(currentUserId/*currentUserId*/,lastPostId/*lastId*/))
        .then( data => {
            console.log('data ', data)
            data.lastPostId ? 
            dispatch({
                type:'FETCH_POSTS_COMPLETE',
                payload:data.res,
                lastPostId: data.lastPostId,
                refreshing
            }) : 
            null
        })
        .catch(err => {
            console.log('err ',err)
            dispatch({
                    type:'FETCH_POSTS_ERROR',
                    payload:err
                })
        })
    }

}

export function addPost(post){
    return {
        type:'ADD_POST',
        payload:{
            post
        }
    }
}

export function refreshPosts(currentUserId, refreshing, lastPostId?){
    return function(dispatch){
        Promise.resolve(PostApi.getPost(currentUserId/*currentUserId*/,lastPostId/*lastId*/))
            .then( data => {
                console.log('refresh data ', data)
                dispatch({
                    type:'REFETCH_POSTS_COMPLETE',
                    payload:data.res,
                    refreshing
                })
            })
            .catch(err => {
                dispatch({
                        type:'REFETCH_POSTS_ERROR',
                        payload:err
                    })
            })
    }
}

export function loadMore(){
    
}