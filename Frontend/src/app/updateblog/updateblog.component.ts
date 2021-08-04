import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-updateblog',
  templateUrl: './updateblog.component.html',
  styleUrls: ['./updateblog.component.css']
})
export class UpdateblogComponent implements OnInit {

  posts={
    id:'',
    title:'',
    author:'',
    introduction:'',
    content:'',
    category:'',
    date:'',
    image:''
  }
 
  cats=["Cyber Security","Artificial Intelligence","Full Stack Development","Data Science","Others"];

  constructor(private blogService:BlogService, private router:Router) { }

  ngOnInit(): void {

    let blogid = localStorage.getItem("editblogid");
    this.blogService.getupdateBlog(blogid).subscribe((data)=>{
    this.posts=JSON.parse(JSON.stringify(data));
  })

  }

  selectImage(event:any){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.posts.image=file;
    }
     }

     selectCat(event:any){
     this.posts.category=event.target.value;
       }
   
     updatepost(posts:any){
        posts=posts._id
       const formData=new FormData();
       formData.append('image', this.posts.image)
       formData.append('title',this.posts.title)
       formData.append('author',this.posts.author)
       formData.append('introduction',this.posts.introduction)
       formData.append('content',this.posts.content)
       formData.append('category',this.posts.category)
       formData.append('date',this.posts.date)
       formData.append('id',posts)
       this.blogService.editBlog(formData);
       console.log("Called");

       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Updated Successfully!!',
        showConfirmButton: false,
        timer: 1500,
        
      })
       this.router.navigate(['/admin'])
     }

}
