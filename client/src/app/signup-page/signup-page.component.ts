import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormGroup, ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [MatCard, MatCardTitle,MatCardContent, MatButton, MatFormField, MatFormFieldModule, MatInput, MatInputModule,
    ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {

  constructor(private http: HttpClient, private router: Router, private toast: NgToastService) {}

  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required,]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  signupUserData: any

  handleSubmit () {
    this.signupUserData = this.signupForm.value;

    try {
      this.http.post("/api/auth/sign-up", this.signupUserData)
      .subscribe((response) => {
        // console.log(response);
        const data = response
        console.log(data);
        if (data) {
          this.toast.success('Signup Successfully', "SUCCESS", 3000)
          this.router.navigate(['/login']);
        }
      }, (error) => {
        this.toast.danger('User Already exist', "SUCCESS", 3000)
        console.log(error)
      })
    } catch (error) {
      this.toast.danger('User Already exist', "SUCCESS", 3000)
      console.log(error)
    }

  }

}
