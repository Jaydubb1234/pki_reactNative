import React from 'react';
import axios from 'axios';
import console = require('console');

class PostApi {
    // static async getAllPosts () {
    //     return await this.getPost()
    //     .then(posts => {
    //         axios.all(posts.map(async res => await this.getAuthor(res.author) 
    //         ))
    //         .then(axios.spread(function(...res){
    //             //console.log(res);
    //             for(let i = 0 ; i < posts.length; i++){
    //                 posts[i].authorName = res[i].name;
    //                 posts[i].avatar = Object.values(res[i].avatar_urls)[0];
    //                 // posts[i].content.rendered = posts[i].content.rendered.replace('https://test', 'http://test');
    //                 // console.log(posts[i].content.rendered);
    //             }
    //         }))
    //         .catch(err => {
    //             throw err;
    //         });
    //         console.log("first");
    //         console.log(posts);
    //         return posts;
    //     })
    //     .catch(err => {
    //         throw err;
    //     });
    // }

    static async getPost(userId, lastId?) {
        return await this.getPostAndAuthor(userId, lastId)
    }

    static async getPostAndAuthor(currentUserId, lastId?){
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
            }) //await fetch('http://localhost:3002/api/v1/posts/14') -GET //await fetch('http://test.poetsknowit.com/wp-json/wp/v2/posts') -GET
            const result = await res.json()
            const promiseMap = result.data.map(async (res) => {
                return await this.getPostAuthorAvatar(res.post_author)
            })
            return Promise.all(promiseMap)
                .then(vals => {
                    vals.forEach( (val, i) => {
                        result.data[i].avatar = val.avatar_urls[24]
                    })
                    return {res: result.data, err:false, lastPostId: result.data[result.data.length-1] ? result.data[result.data.length-1].id : null}
                })

            // return fetch('http://localhost:3002/api/v1/posts',{
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         currentUserId: '14',
            //         lastId
            //     })
            // })
            // .then(res => res.json())
            // .then(result => {
            //     const promiseMap = result.data.map(async (res) => {
            //         return Promise.resolve(this.getPostAuthorAvatar(res.post_author))
            //     })
            //     return Promise.all(promiseMap)
            //     .then(vals => {
            //         vals.forEach( (val, i) => {
            //             result.data[i].avatar = val.avatar_urls[24]
            //         })
            //         console.log('result.data ',result.data)
            //         return {res: result.data, err:false}
            //     })
            // })
        }
        catch(err){
            return {res: err, err:true}
        }
    }

    static async getPostAuthorAvatar(authorId){
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