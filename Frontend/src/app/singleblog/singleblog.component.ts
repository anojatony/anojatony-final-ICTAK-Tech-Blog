import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';
import { FormBuilder, Validators } from '@angular/forms';
import { analyzeNgModules } from '@angular/compiler';

@Component({
  selector: 'app-singleblog',
  templateUrl: './singleblog.component.html',
  styleUrls: ['./singleblog.component.css']
})
export class SingleblogComponent implements OnInit {

  comment:any;
   now:any;
   interval:any;
 
  pcomment : string[] =[];

  // pcomment(){
  //   this.postComment.push(this.comment);
  //   this.comment=""; 
  //   }
   

postcomment(post:any){
  const postc = this.comment;
   this.comment=""; 
   const id=post._id
   const emails=this.student.email;
   const emailt=this.trainer.email;
   this.blogService.postcomment(id, postc,emails,emailt)
   window.location.reload();
 
 
}


likeBlog(post:any){
   const likeid=post._id;
   const emails=this.student.email;
   const emailt=this.trainer.email;
   console.log(emails)
   console.log(emailt)
   this.blogService.postLike(likeid,emails,emailt)
   window.location.reload();
}



post={
    id:'',
    title:'',
    author:'',
    introduction:'',
    content:'',
    category:'',
    date:'',
    image:'',
    comments:[{
      comment:'',
      commentor:''
    }],
    like:'',
    likedBy:[]
  }


  student={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    phone:''
  }

  trainer={
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    phone:'',
    company:''
  }
  

  
  constructor(private blogService:BlogService, private router:Router,public _auth:AuthService) {}


  ngOnInit(): void {
     
 


    let postid = localStorage.getItem("singleblog");
    this.blogService.getBlog(postid).subscribe((data)=>{
      this.post=JSON.parse(JSON.stringify(data));
  })

 
  let trainerid = localStorage.getItem('trainerid');
  console.log(trainerid)
  this.blogService.getTrainer(trainerid).subscribe((data)=>{
  this.trainer=JSON.parse(JSON.stringify(data));
})
    
   let userid = localStorage.getItem('userid');
    console.log(userid)
    this.blogService.getStudent(userid).subscribe((data)=>{
     this.student=JSON.parse(JSON.stringify(data));
  })




  }



  logoutUser()
  {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('userid')
  localStorage.removeItem('trainerid')
  localStorage.removeItem('trainer')
  this.router.navigate(['blog'])
  }
}
