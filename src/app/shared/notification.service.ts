import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 private notification$: Subject<string> = new Subject();

 get notifications(){
  return this.notification$.asObservable();
 }

 constructor() { }

  show(text: string) {
    this.notification$.next(text);
  }
}
