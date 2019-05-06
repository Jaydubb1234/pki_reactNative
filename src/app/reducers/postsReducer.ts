import console = require("console");

export default function reducer(state={
    posts:[],
    fetching: false,
    fetched:false,
    error:null,
    refreshing:false,
    lastPostId:null,
    isPostLoaded: false
}, action){
    switch(action.type){
        case 'FETCH_POSTS': {
            return {
                ...state, 
                fetching:true
            }
        }
        case 'FETCH_POSTS_COMPLETE': {
            return {
                ...state, 
                posts: action.refreshing ? mapRefresh(action.payload, state.posts)/*[...action.payload, ...state.posts]*/ : mapRefresh(state.posts, action.payload)/*[...state.posts, ...action.payload]*/,
                isPostLoaded: true,
                refreshing:false,
                lastPostId: action.lastPostId
            }
        }
        case 'ADD_POST': {
            return{
                ...state,
                posts:[...state.posts, action.payload]
            }
        }
        case 'FETCH_POSTS_ERROR': {
            return{
                ...state,
                error:[...state.posts, action.payload]
            }
        }
        case 'REFETCH_POSTS_COMPLETE':{
            return{
                ...state,
                posts: mapRefresh(action.payload, state.posts),//[...new Set([...action.payload, ...state.posts])],
                refreshing: true,
                lastPostId: null
            }
        }
    }
    return state
}

function mapRefresh(curr, old){
    if(old.length === 0){
        return curr
    }
    const data = []
    curr.forEach(val => {
        if( (old[0] && val) && (old[0].id < val.id)){
            data.push(val)
        }
    })
    return [...data,...old]
}