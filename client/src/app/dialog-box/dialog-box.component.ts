
import {ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatDatepickerModule, JsonPipe,MatCard],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css',
})
export class DialogBoxComponent {

  constructor (private http: HttpClient, private router: Router, private toast: NgToastService) {}

  taskData?: any

  addTaskForm: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    dueDate: new FormControl(new Date(),[Validators.required])
  })

  handelTaskSubmit () {
    this.taskData = this.addTaskForm.value;
    this.taskData["userRef"] = localStorage.getItem('id')
    console.log(this.taskData)

    try {
      this.http.post("/api/task/create", this.taskData)
      .subscribe((response) => {
        console.log(response)
        this.toast.success('New task created successfully', 'SUCCESS', 3000)
        this.router.navigate(['all-tasks'])
      }, (error) => {
        console.log(error)
      })
    } catch (error) {
      console.log(error)
    }
  }

}
