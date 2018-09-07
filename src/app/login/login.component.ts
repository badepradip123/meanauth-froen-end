import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: NgFlashMessageService) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data =>{
      if (data.success) {
          console.log('sdfsdfsdfsd');
        this.authService.storeUserData(data.token,data.user);
        this.flashMessage.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["You are now login"],              
          // Time after which the flash disappears defaults to 2000ms
          timeout: 3000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'success'
        });
        this.router.navigate(['dashboard']);
      }
      else{
        this.flashMessage.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: ["Invalid Username or password"],              
          // Time after which the flash disappears defaults to 2000ms
          timeout: 3000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: 'danger'
        });
        this.router.navigate(['login']);
      }

    });
    
  }
}
