//import console = require("console");

const initialState = {
    posts:[],
    fetching: false,
    fetched:false,
    error:false,
    refreshing:false,
    lastPostId:null,
    isPostLoaded: false,
    loading: false
}

const postReducer = (state=initialState, action) => {
    switch(action.type){
        case 'FETCH_POSTS_STARTED': {
            return {
                ...state, 
                fetching:true,
                loading: true 
            }
        }
        case 'FETCH_POSTS_COMPLETED': {
            return {
                ...state, 
                posts: action.refreshing ? mapRefresh(action.payload, state.posts)/*[...action.payload, ...state.posts]*/ : mapRefresh(state.posts, action.payload)/*[...state.posts, ...action.payload]*/,
                isPostLoaded: true,
                refreshing:false,
                lastPostId: action.lastPostId,
                loading: false
            }
        }
        case 'FETCH_POSTS_ERROR': {
            return{
                ...state,
                //error:[...state.posts, action.payload]
                error: action.error,
                loading: false

            }
        }
        case 'REFETCH_POSTS_COMPLETE':{
            return{
                ...state,
                posts: mapRefresh(action.payload, state.posts),//[...new Set([...action.payload, ...state.posts])],
                //refreshing: true,
                refreshing: false,
                loading: false,
                lastPostId: null
            }
        }
        case 'ADD_POST': {
            return{
                ...state,
                posts:[...state.posts, action.payload]
            }
        }
        default: 
            return state
    }
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

export default postReducer