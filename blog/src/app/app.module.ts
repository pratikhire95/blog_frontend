import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { environment } from 'src/environments/environment.development';
import {AngularFireModule} from '@angular/fire/compat';
import { HttpService } from 'src/services/http.service';

import { NavbarComponent } from './navbar/navbar.component';
import { MypostComponent } from './mypost/mypost.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomepageComponent,
    DashboardComponent,
    PostComponent,
    NavbarComponent,
    MypostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    
  ],
  providers: [
    HttpClientModule,
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
