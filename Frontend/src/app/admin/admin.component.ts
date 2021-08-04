import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import Swal from 'sweetalert2'
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  checkedd:any;
  updateadmin:any;
  event:any;
  cate:any;
  count:any;

  posts=[{
    id:'',
    title:'',
    author:'',
    introduction:'',
    content:'',
    category:'',
    date:'',
    image:''
  }]

  constructor(private blogService:BlogService,private router:Router,public _auth:AuthService) { }

  ngOnInit(): void {


  this.blogService.getAdminPosts().subscribe((data)=>{
    this.posts=JSON.parse(JSON.stringify(data));
  })

  // this.blogService.getAdminCount().subscribe((data)=>{
  //   this.count=JSON.parse(JSON.stringify(data));
  // })

  
  }

Search(){
  if(this.cate==""){
    this.ngOnInit();
  }
  else{
    this.posts=this.posts.filter(res=>{
      return res.category.toLocaleLowerCase().match(this.cate.toLocaleLowerCase());
    })
  }
}

drop(event:any){
  moveItemInArray(this.posts, event.previousIndex, event.currentIndex);
}

  check(post:any){
    this.checkedd=post;
    this.updateadmin=post._id;


  }

  change(event:any){
    this.event=event.target.checked;
  }

  approve(){
   
    if(this.event){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Approve Blog Post!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.blogPost(this.checkedd);
        this.router.navigate(['blog'])

         // 
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Approved successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      this.router.navigate(['/admin']);
    }
   
    })
  }
  else{
    alert("Choose a Blog Post");
  }
 

  }

  update(){
    if(this.event){
    localStorage.setItem("editblogid", this.updateadmin.toString());
    this.router.navigate(['updateblog']);
    }
    else{
      alert("Choose a Blog Post");
    }
  }

  delete(){
    if(this.event){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete the post!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
       this.blogService.deleteBlog(this.checkedd._id)
       .subscribe((data) => {
        this.posts = this.posts.filter(p => p !== this.checkedd);
        })

         // Swal.fire('Deleted!','Your imaginary file has been deleted.','success')
       Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Deleted successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      this.router.navigate(['/admin']);
    }
   
    })

  }
  else{
    alert("Choose a Blog Post");
  }

  }

singleBlog(post:any){
  localStorage.setItem("singleadminblog", post._id.toString());
  this.router.navigate(['singleblog']);
}

logoutUser()
  {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('trainer')
  localStorage.removeItem('userid')
  localStorage.removeItem('trainerid')
  this.router.navigate(['blog'])
  }

}
