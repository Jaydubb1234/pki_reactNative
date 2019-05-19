
class PostApi {

    static async getPost(currentUserId: number, lastId?: number){
        try{
            const res = await fetch('http://localhost:3002/api/v1/posts',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentUserId,
                    lastId
                })
            })
            const result = await res.json()
            const promiseMap = result.data.map(async (res: any) => {
                return await this.getPostAuthorAvatar(res.post_author)
            })
            return Promise.all(promiseMap).then(vals => {
                vals.forEach( (val: any, i: number) => {
                    result.data[i].avatar = val.avatar_urls[24]
                })
                return {res: result.data, err:false, lastPostId: result.data[result.data.length-1] ? result.data[result.data.length-1].id : null}
            })
        }
        catch(err){
            return {res: err, err:true}
        }
    }

    static async getPostAuthorAvatar(authorId: number){
        try{
           const res = await fetch('http://test.poetsknowit.com/wp-json/wp/v2/users/'+authorId)
           const result = res.json()
           return result
        }
        catch(err){
            return false
        }
    }

    // public getPost: (currentUserId: string, lastId?: any) => Promise<{currentUserId: string, lastId: any}> = (currentUserId, lastId) => {
    //     return new Promise<{currentUserId: string, lastId: any}>( (resolve,reject) => {
    //         this.axiosInstance.get(`/posts/${14}`) // currentUserId switch with 14
    //             .then(function (response: any) {
    //                 console.log('response ',response)
    //                 resolve(response)
    //             })
    //             .catch(function (error: any) {
    //                 console.log(error)
    //                 reject(error)
    //             })
    //     })
    // }

    // public getPosts: (currentUserId: string, lastId?: any) => Promise<{currentUserId: string, lastId: any}> = (currentUserId, lastId) => {
    //     return new Promise<{currentUserId: string, lastId: any}>( (resolve,reject) => {
    //         this.axiosInstance.post('/posts',{currentUserId: '14', lastId})
    //             .then(function (response: any) {
    //                 console.log(response)
    //                 resolve(response)
    //             })
    //             .catch(function (error: any) {
    //                 console.log(error)
    //                 reject(error)
    //             })
    //     })
    // }

    // public createPost: (postContent: any, currentUserId?: string,) => Promise<{postContent: any, currentUserId: string}> = (postContent, currentUserId) => {
    //     return new Promise<{postContent: any, currentUserId: string}>( (resolve,reject) => {
    //         this.axiosInstance.post('/posts/create',{postContent, currentUserId: '17', })
    //             .then(function (response: any) {
    //                 console.log(response)
    //                 resolve(response)
    //             })
    //             .catch(function (error: any) {
    //                 console.log(error)
    //                 reject(error)
    //             })
    //     })
    // }
}


export default PostApi;