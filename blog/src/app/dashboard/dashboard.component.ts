import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  postList: any = [];
  postId: any;
  i=100;
  commentList: any =[];
  body:any;
  constructor(public router: Router, public httpService: HttpService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){

    this.httpService.getPost().subscribe((data: any) => {
      this.postList = data;
      console.log(this.postList)
    }, error => {
      // Handle error
      console.log(error);
    });

  }

  viewComments(postId:any){
    this.postId = postId;
    this.httpService.getCommentsByPostId(postId).subscribe(
      (data): any => {
        this.commentList = data;
        console.log(this.commentList);
      }
    );
  }

  addComments(){
    this.i = this.i+1;
    let formModel = {name:localStorage.getItem('email'), body:this.body, email:localStorage.getItem('email'), postId:this.postId, id:this.i};
    this.commentList.push(formModel);
    this.body = '';
  }

}
