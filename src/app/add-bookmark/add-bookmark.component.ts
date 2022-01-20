import { NotificationService } from './../shared/notification.service';
import { Router } from '@angular/router';
import { BookmarkService } from './../shared/bookmark.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {

  showValidationMessage : boolean = false;

  constructor(private bookmarkService: BookmarkService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onSubmitForm(form : NgForm) {

    if (form.valid) {
      this.bookmarkService.addBookmark(this.bookmarkService.createBookmark(form.value.name, form.value.url));
      this.router.navigateByUrl("/bookmarks")
      this.notificationService.show('Bookmark created');
    } else {
      this.showValidationMessage = true
    }

  }

}
