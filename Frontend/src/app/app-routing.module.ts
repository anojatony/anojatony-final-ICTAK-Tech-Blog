import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { BlogComponent } from './blog/blog.component';
import { CategoryComponent } from './category/category.component';
import { CreatpostComponent } from './creatpost/creatpost.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignuptrainerComponent } from './signuptrainer/signuptrainer.component';
import { SingleadminComponent } from './singleadmin/singleadmin.component';
import { SingleblogComponent } from './singleblog/singleblog.component';
import { SinglefeatureComponent } from './singlefeature/singlefeature.component';
import { SinglehomeComponent } from './singlehome/singlehome.component';
import { SingletrendingComponent } from './singletrending/singletrending.component';
import { UpdateblogComponent } from './updateblog/updateblog.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'blog',component:BlogComponent},
  {path:'createpost', component:CreatpostComponent},
  {path:'category/:cat',component:CategoryComponent},
  {path:'singleblog',component:SingleblogComponent},
  {path:'singlefeature',component:SinglefeatureComponent},
  {path:'singletrending',component:SingletrendingComponent},
  {path:'singlehome',component:SinglehomeComponent},
  {path:'singleadmin',component:SingleadminComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'signuptrainer',component:SignuptrainerComponent},
  {path:'admin',canActivate:[AuthGuard], component:AdminComponent},
  {path:'updateblog',component:UpdateblogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
