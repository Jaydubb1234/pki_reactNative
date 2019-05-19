import PostApi from '../api/postApi'

export function fetchPosts(currentUserId, refreshing, lastPostId?){
    return function(dispatch){
    //return  dispatch => {
        dispatch({
            type:'FETCH_POSTS_STARTED',
        })
        Promise.resolve(PostApi.getPost(currentUserId,lastPostId))
        .then( data => {
            data.lastPostId ? 
                dispatch({
                    type:'FETCH_POSTS_COMPLETED',
                    payload:data.res,
                    lastPostId: data.lastPostId,
                    refreshing
                }) :
            data.err ? 
                dispatch({
                    type:'FETCH_POSTS_ERROR',
                    error: data.res
                }) :
            null
        })
        .catch(err => {
            dispatch({
                type:'FETCH_POSTS_ERROR',
                error:err
            })
        })
    }

}

export function refreshPosts(currentUserId, refreshing, lastPostId?){
    return function(dispatch){
        dispatch({
            type:'FETCH_POSTS_STARTED',
        })
        Promise.resolve(PostApi.getPost(currentUserId,lastPostId))
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
                    error:err
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

export function loadMore(){
    
}