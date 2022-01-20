import { NotificationService } from './../shared/notification.service';
import { Bookmark } from './../shared/bookmark.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarkService } from './../shared/bookmark.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss'],
})
export class EditBookmarkComponent implements OnInit {
  bookmark?: Bookmark;

  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      this.bookmark = this.bookmarkService.getBookmark(idParam);
    });
  }

  onSubmitForm(form: NgForm) {
      this.bookmarkService.updateBookmark(this.bookmark!.id, form.value);
      this.router.navigateByUrl(`/bookmarks/manage`);

      this.notificationService.show('bookmark updated')
  }

  delete(){
    this.bookmarkService.deleteBookmark(this.bookmark!.id);
    this.router.navigateByUrl(`/bookmarks/manage`);
  }
}
