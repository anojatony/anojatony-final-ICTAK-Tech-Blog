import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-singleadmin',
  templateUrl: './singleadmin.component.html',
  styleUrls: ['./singleadmin.component.css']
})
export class SingleadminComponent implements OnInit {

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
      comment:''
    }]
  }

  constructor(private blogService:BlogService, private router:Router,public _auth:AuthService) { }

  ngOnInit(): void {
   

    let postadminid = localStorage.getItem("singleadminblog");
    this.blogService.getadminBlog(postadminid).subscribe((data)=>{
    this.post=JSON.parse(JSON.stringify(data));
  })
  }


  logoutUser()
  {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('trainer')
  this.router.navigate(['blog'])
  }

}
