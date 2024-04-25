import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { 
  }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token',JSON.stringify(res.user?.refreshToken));
        localStorage.setItem('userid', JSON.stringify(res.user?.uid));
        localStorage.setItem('email',JSON.stringify(res.user?.email));
        if(res.user?.emailVerified == true) {
          
          window.location.replace('/dashboard');
        } else {
          this.router.navigate(['/verify-email']);
        }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  // register method
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      sessionStorage.clear();
      localStorage.removeItem('token');
      window.location.replace('/login');
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/verify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

  // email varification
  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      localStorage.setItem('token',JSON.stringify(res.user?.refreshToken));
      localStorage.setItem('userid', JSON.stringify(res.user?.uid));
      
      window.location.replace('/dashboard');
      
    }, err => {
      alert(err.message);
    })
  }


}