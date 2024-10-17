import { Component } from '@angular/core';
import {MaNotification, NotificationType} from '../../data/Notification';
import {NotificationService} from '../../services/notificationService';
import {debounceTime, tap} from 'rxjs';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgSwitch,
    MatIcon,
    MatIconButton,
    NgSwitchCase
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
//Flag that is going to be used in the view to determine if the notification should be visible or not.
  showNotification: boolean = false;

//Notification object with the data that is going to be showed.
  incommingNotification: MaNotification = {
    title: '',
    message: '',
    type: NotificationType.error,
  };

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    //We subscribe or listens to new values / notification requests.
      this.notificationService.notifyRequest$
        .pipe(
  //we receive new notification and update the values of the notification object we have in this component.
  // we alse make the notification visible.
          tap((notification: MaNotification) => {
            this.incommingNotification = notification;
            this.showNotification = true;
          }),
  //we wait for 3 seconds before updating the visibility of the notification
          debounceTime(3000),
  //3 seconds later, we make our notification invisible again and ready for the value.
          tap(() => {
            this.showNotification = false;
          })
        )
        .subscribe();
  }

}
