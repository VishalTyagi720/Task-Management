import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private componentReloadSubject = new Subject<void>();

  componentReload$ = this.componentReloadSubject.asObservable();

  // Method to trigger the event
  triggerComponentReload() {
    this.componentReloadSubject.next();
  }
}
