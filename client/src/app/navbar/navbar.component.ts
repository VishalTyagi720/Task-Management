import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { NgToastModule, ToasterPosition } from 'ng-angular-popup';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,RouterLink, MatButtonModule, NgToastModule, JsonPipe,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  reloadSubscription?: Subscription;

  constructor(private sharedService: SharedService, private router: Router) {}

  currentUser?:  string | null = localStorage.getItem('username');
  id?: string | null = localStorage.getItem('id');

  ngOnInit() {
    this.reloadSubscription = this.sharedService.componentReload$.subscribe(() => {
      this.reloadComponent();
    });
  }

  reloadComponent() {
    console.log('Component reloaded!');
    // location.reload()
    // const currentUrl = this.router.url;
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([currentUrl]);
    // });
  }

  ngOnDestroy() {
    if (this.reloadSubscription) {
      this.reloadSubscription.unsubscribe();
    }
  }


}
