import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { JwtHelperService } from '@auth0/angular-jwt';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken : any;
  user: any;


  constructor(private http: Http,
              public helper: JwtHelperService) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    .pipe(
            map( res => res.json())
    );
  }
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    .pipe(
            map( res => res.json())
    );
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    return this.http.get('http://localhost:3000/users/profile',{headers: headers})
    .pipe(
            map( res => res.json())
    );
  }
  storeUserData(token, user){
      localStorage.setItem('id_token', token);
      localStorage.setItem('user',JSON.stringify(user));
      this.authToken = token;
      this.user = user;
  }

  loggedIn(){
    //console.log(!this.helper.isTokenExpired(localStorage.getItem('id_token')))    
    return !this.helper.isTokenExpired( localStorage.getItem('id_token'));
  }

  loadToken(){
    let token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
