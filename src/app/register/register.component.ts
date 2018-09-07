import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../services/validate.service";
import { AuthService } from "../services/auth.service";
//import {FlashMessage} from 'angular-flash-message';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    name: String;
    username: String;
    email: String;
    password: String;


  constructor(private validateService: ValidateService,
              private flashMessageService: NgFlashMessageService,
              private authService: AuthService,
              private router: Router) { }
  

  ngOnInit() {    
    
  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    if (!this.validateService.validateRegister(user)) {
      
        this.flashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Please filled all fileds"],        
        // Time after which the flash disappears defaults to 2000ms
        timeout: 3000  ,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      });
      return false;      
    }

    if (!this.validateService.validateEmail(user.email)) {
      
      console.log('Please Enter validate email');
      this.flashMessageService.showFlashMessage({
        // Array of messages each will be displayed in new line
        messages: ["Please Enter validate email"],              
        // Time after which the flash disappears defaults to 2000ms
        timeout: 3000,
        // Type of flash message, it defaults to info and success, warning, danger types can also be used
        type: 'danger'
      });
      return false;      
    }

    this.authService.registerUser(user).subscribe(data => {
        if (data.success) {
          this.flashMessageService.showFlashMessage({
            // Array of messages each will be displayed in new line
            messages: ["You are now registered"],              
            // Time after which the flash disappears defaults to 2000ms
            timeout: 3000,
            // Type of flash message, it defaults to info and success, warning, danger types can also be used
            type: 'success'
          });
          this.router.navigate(['/login']);
        }
        else{
          this.flashMessageService.showFlashMessage({
            // Array of messages each will be displayed in new line
            messages: ["Something Went wrong"],              
            // Time after which the flash disappears defaults to 2000ms
            timeout: 3000,
            // Type of flash message, it defaults to info and success, warning, danger types can also be used
            type: 'danger'
          });
          this.router.navigate(['/register']);
        }
    });

  }

  

  
  
   

}
