import { trigger, transition, style, animate } from '@angular/animations';
import { NotificationService } from './../shared/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(5px)'
        }),
        animate(250)
      ]),
      transition(':leave', [
        animate(125, style({
          opacity: 0,
          transform: 'scale(0.85)'
        }),)
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {

  notification?: string;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notification: string) => {
        this.notification = notification;

        setTimeout(() => {
          this.notification = ""
        }, 2000);
    })
  }

}
