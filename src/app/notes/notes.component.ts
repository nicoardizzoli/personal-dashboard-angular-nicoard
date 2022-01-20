import { NoteService } from './../shared/note.service';
import { Note } from './../shared/note.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  constructor(private noteService: NoteService) {

  }

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }

}
