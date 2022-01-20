import { NotificationService } from './../shared/notification.service';
import { NoteService } from './../shared/note.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  showValidationMessage: boolean = false;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  onSubmitForm(form: NgForm) {
    if (form.valid) {
      const note = this.noteService.crateNote(
        form.value.title,
        form.value.content
      );
      console.log(note);

      this.noteService.addNote(note);
      this.router.navigateByUrl('/notes');
      this.notificationService.show('Note added')
    } else {
      this.showValidationMessage = true;
    }
  }
}
