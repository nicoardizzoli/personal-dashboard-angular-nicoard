import { NotificationService } from './../shared/notification.service';
import { Note } from './../shared/note.model';
import { NoteService } from './../shared/note.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  note?: Note;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      this.note = this.noteService.getNote(idParam);
    });
  }

  onSubmitForm(form: NgForm) {
    this.noteService.updateNote(this.note!.id, form.value);
    this.router.navigateByUrl('/notes');
    this.notificationService.show('Note edited');
  }
}
