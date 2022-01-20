import { Router } from '@angular/router';
import { NoteService } from './../shared/note.service';
import { Note } from './../shared/note.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() note!: Note;

  constructor(private noteService: NoteService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id);
  }
  editNote() {
    this.router.navigateByUrl("/notes/" + this.note.id);
  }

}
