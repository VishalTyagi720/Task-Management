import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatCard, MatCardTitle, MatCardContent, MatFormField, MatInput, MatButton, MatFormFieldModule,
    MatInputModule, RouterLink, JsonPipe],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  
  constructor (private http: HttpClient, private router: Router, private toast: NgToastService) {}

  id?: string| null = localStorage.getItem('id');
  username?: string | null = localStorage.getItem('username');
  email?: string | null = localStorage.getItem('email');

  currentUser: any
  
  profileForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    try {
      this.http.get<{data: { username: string, email: string }}>(`/api/user/${this.id}`)
    .subscribe((response) =>{
      this.currentUser = response.data
      // console.log(this.currentUser)
      this.profileForm.patchValue({
        username: this.currentUser.username,
        email: this.currentUser.email
      })
    }, (error) => {
      console.log(error);
    })
    } catch (error) {
      console.log(error)
    }
  }


  hadleUpdate () {
    try {
      this.http.post<{data: { username: string, email: string }}>(`api/user/update/${this.id}`, this.profileForm.value)
      .subscribe((response) => {
        const updatedData = response.data
        console.log(updatedData)
        localStorage.setItem('username', updatedData.username)
        localStorage.setItem('email', updatedData.email)
        this.toast.success('User details updated successfully', "SUCCESS", 3000);
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      }, (error) => {
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteUser () {
    try {
      this.http.delete(`/api/user/delete/${this.id}`)
      .subscribe((response) => {
        console.log(response)
        localStorage.removeItem('id')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('editUserTaskId')
        this.toast.success('Profile deleted successfully', "SUCESS", 3000);
        this.router.navigate(['/signup'])
      }, (error) => {
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
  }

  logoutUser () {
    try {
      this.http.post("/api/auth/logout", this.id)
      .subscribe((response) => {
        console.log(response)
        localStorage.removeItem('id')
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('editUserTaskId')
        location.reload();
        this.toast.success('logged Out successfully', 'SUCCESS', 3000);
        this.router.navigate(['/login'])
      }, (error) => {
        console.log(error)
      })
    } catch (error) {
        console.log(error)
    }
  }

}
