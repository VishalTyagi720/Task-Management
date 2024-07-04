import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatDatepickerModule, JsonPipe],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditTaskComponent>, private http: HttpClient) {}

  editUserTaskId?: string | null = localStorage.getItem('editUserTaskId')

  editTaskData?: any

  editTaskForm: FormGroup = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    dueDate: new FormControl(new Date(),[Validators.required])
  })

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    try {
      this.http.get<{data: {title: string, description: string, dueData: string }}>(`/api/task/get/${this.editUserTaskId}`)
    .subscribe((response) => {
      this.editTaskData = response.data
      console.log(this.editTaskData)
      const dueData = this.editTaskData.dueDate.substring(0,10)
      // console.log(dueData)
      this.editTaskForm.patchValue({
        title: this.editTaskData.title,
        description: this.editTaskData.description,
        dueDate: dueData
      });
    }, (error) => {
      console.log(error)
    })
    } catch (error) {
      console.log(error)
    }
  }

}
