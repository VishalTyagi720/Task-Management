import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DatePipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [MatButtonModule, JsonPipe, DatePipe, RouterLink, RouterOutlet, MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent implements OnInit {

  constructor (private http: HttpClient, public dialog: MatDialog, private toast: NgToastService, private router: Router) {}

  // @ViewChild(DialogBoxComponent) DialogBox?: DialogBoxComponent

  forms: { title: string, description: string, dueDate: Date }[] = [
    {title: 'task1', description: 'hello world', dueDate: new Date()},
    {title: 'task2', description: 'hello world', dueDate: new Date()},
    {title: 'task3', description: 'hello world', dueDate: new Date()},
  ];

  userData?: any;
  updatedUserTask?: any

  taskDescription?: string
  taskVisiable?: boolean = false;

  id: string | null = localStorage.getItem('id')

  ngOnInit(): void {
    try {
      this.http.get<{data: { title: string, description: string, dueDate: Date }}>(`/api/user/tasks/${this.id}`)
    .subscribe((response) => {
      console.log(response.data)
      this.userData = response.data
      console.log(this.userData)
    }, (error) => {
      console.log(error)
    })
    } catch (error) {
      console.log(error)
    }
  }

  userTaskDelete (userTaskId: string) {
    try {
      this.http.delete(`/api/task/delete/${userTaskId}`)
      .subscribe((response) => {
        console.log(response)
        this.toast.success('Task deleted successfully', 'SUCCESS', 3000);
        // location.reload()
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

  userTaskUpdate (userTaskId: string): void {
    localStorage.setItem('editUserTaskId', userTaskId)

    const dialogRef = this.dialog.open(EditTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('Form data:', result);
        this.updatedUserTask = result
        console.log(this.updatedUserTask)

        try {
          this.http.post(`/api/task/update/${userTaskId}`, this.updatedUserTask)
        .subscribe((response) => {
          console.log(response)
          this.toast.success('Task updated successfully', 'SUCCESS', 3000);
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
        // this.ngOnInit()

      }
    });

  }

  // fetchDetailTask (taskId: string) {
  //   try {
  //     this.http.get<{data: { description: string }}>(`/api/task/get/${taskId}`)
  //   .subscribe((response) => {
  //     console.log(response.data)
  //     this.taskDescription = response.data.description
  //     console.log(this.taskDescription)
  //   }, (error) => {
  //     console.log(error)
  //   })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

}
