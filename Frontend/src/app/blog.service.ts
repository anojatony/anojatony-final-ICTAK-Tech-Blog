import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get("http://localhost:8000/posts")
  }

  getAdminPosts(){
    return this.http.get("http://localhost:8000/adminposts")
  }


  searchCategory(cat:any){
    return this.http.get("http://localhost:8000/category/"+cat);
  }

  getBlog(id:any){
    return this.http.get("http://localhost:8000/blog/"+id);
  }

  blogPost(post:any){
    return this.http.post("http://localhost:8000/createblog", post)
    .subscribe(data=>{console.log(data)})
  }

  newPost(post:any){
    return this.http.post("http://localhost:8000/adminblog", post)
    .subscribe(data=>{console.log(data)})
  }

  getfeaturedPosts(){
    return this.http.get("http://localhost:8000/featuredposts")
  }

  getfeaturedBlog(id:any){
    return this.http.get("http://localhost:8000/featuredblog/"+id);
  }

  gettrendingPosts(){
    return this.http.get("http://localhost:8000/trendingposts")
  }

  gettrendingBlog(id:any){
    return this.http.get("http://localhost:8000/trendingblog/"+id);
  }

  gethomePosts(){
    return this.http.get("http://localhost:8000/homeposts")
  }

  gethomeBlog(id:any){
    return this.http.get("http://localhost:8000/homeblog/"+id);
  }

  deleteBlog(id:any){
    return this.http.delete("http://localhost:8000/admindelete/"+id)
  }

  editBlog(blog:any){
    console.log('updated')
    return this.http.put("http://localhost:8000/updateblog",blog)
    .subscribe(data =>{console.log(data)})
  }

  getupdateBlog(id:any){
    return this.http.get("http://localhost:8000/updateblog/"+id);
  }

  getadminBlog(id:any){
    return this.http.get("http://localhost:8000/adminsingleblog/"+id);
  }

  getAdminCount(){
    return this.http.get("http://localhost:8000/admincount")
  }

  postcomment(id:any,comment:any,emails:any,emailt:any){
    const data={
      id: id,
      comment: comment,
      emails:emails,
      emailt:emailt
    }
  return this.http.post("http://localhost:8000/comment",data)
  .subscribe(data=>{console.log(data)})

  }


  getStudent(id:any){
    return this.http.get("http://localhost:8000/studentsget/"+id);
  }
  getTrainer(id:any){
    return this.http.get("http://localhost:8000/trainersget/"+id);
  }


  postLike(id:any,emails:any,emailt:any){
    const likedata=
    {id: id,
     emails:emails,
     emailt:emailt
    }
  return this.http.put("http://localhost:8000/like", likedata)
  .subscribe(data=>{console.log(data)})

  }

 



}


