import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatCard, MatCardTitle, MatCardContent, MatFormField, MatInput, MatButton, MatFormFieldModule,
    MatInputModule, RouterLink, JsonPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor (private toast: NgToastService, private http: HttpClient, private router: Router, private sharedService: SharedService) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginUserData: any
  // user?: object
  username?: string;
  id?: string;
  email?: string;
  hello:string = 'hello'

  handleSubmit () {
    this.loginUserData = this.loginForm.value

    try {
      this.http.post<{data: { username: string, _id: string, email: string }}>('/api/auth/log-in', this.loginUserData)
      .subscribe((response) => {
        const data = response.data
        console.log(data)
        if(data) {
          this.username = data.username
          this.id = data._id
          this.email = data.email
          // console.log(this.username, this.id)
          localStorage.setItem('username', this.username)
          localStorage.setItem('id', this.id)
          localStorage.setItem('email', this.email)
          this.sharedService.triggerComponentReload();
          location.reload();
          this.toast.success('Successful Login', "SUCCESS", 3000)
          this.router.navigate([''])
        }
      }, (error) => {
        console.log(error)
        this.toast.danger('Wrong Credentials', "ERROR", 3000)
      })
      
    }catch (error) {
      console.log(error)
      this.toast.danger('Wrong Credentials', "ERROR", 3000)
    }
  }

}
