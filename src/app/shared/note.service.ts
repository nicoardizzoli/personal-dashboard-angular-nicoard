import { Note } from './note.model';
import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy {

  storageListenSub?: Subscription;

  notes: Note[] = [];

  constructor() {
    this.loadState();
    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage').subscribe((e:StorageEvent) => {
      console.log(e);
      if (e.key === 'notes') {
        this.loadState();
      }
    });
  }
  
  ngOnDestroy(): void {
    if(this.storageListenSub) this.storageListenSub?.unsubscribe();
  }

  crateNote(title: string, content:string) : Note {
    return new Note(title, content);
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note, updatedFields);
    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id);
    if(noteIndex > 0) {
      this.notes.splice(noteIndex, 1);
    }

    this.saveState();
  }

  saveState(){
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {

    try {
      const notesInLocal = localStorage.getItem('notes');
      if (notesInLocal) {
        const notesInStorage = JSON.parse(notesInLocal!);

        this.notes.length = 0
        this.notes.push(...notesInStorage);
      }
    } catch (error) {
      console.log('Error retreiving notes in localstorage');
      console.log(error);
    }

  }
}
