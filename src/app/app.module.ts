import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import {RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthguardService } from './authguard.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardService]},
  {path: 'profile', component: ProfileComponent,canActivate: [AuthguardService]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    // Specify the library as an import
    NgFlashMessagesModule.forRoot(),
    HttpModule,
    JwtModule.forRoot({
      config: {
        // ...
        tokenGetter: () => {
          return  localStorage.getItem('id_token');
        }
      }
    }),
    
    
  ],
  
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
