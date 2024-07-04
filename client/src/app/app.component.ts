import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HomePageComponent } from './home-page/home-page.component';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup';
import { LoginPageComponent } from './login-page/login-page.component';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, MatButtonModule,HomePageComponent, NgToastModule, JsonPipe, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

  constructor (private router: Router) {}

  @ViewChild(LoginPageComponent) LoginPage? :LoginPageComponent;
  
  ToasterPosition = ToasterPosition;
  
  currentUser?:  string | null = localStorage.getItem('username');
  id?: string | null = localStorage.getItem('id');

  // currentUser?: string | null = this.LoginPage?.hello;

}
