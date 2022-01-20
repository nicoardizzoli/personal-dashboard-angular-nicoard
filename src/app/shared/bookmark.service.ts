import { fromEvent, Subscription } from 'rxjs';
import { Bookmark } from './bookmark.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  storageListenSub: Subscription;

  bookmarks: Bookmark[] = [];

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(
      window,
      'storage'
    ).subscribe((e: StorageEvent) => {
      console.log(e);
      if (e.key === 'bookmarks') {
        this.loadState();
      }
    });
  }

  createBookmark(name: string, url: string) {
    return new Bookmark(name, url);
  }

  getBookmarks() {
    return this.bookmarks;
  }

  getBookmark(id: string) {
    return this.bookmarks.find((b) => b.id === id);
  }

  addBookmark(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);

    this.saveState();
  }

  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    const bookmark = this.getBookmark(id);
    Object.assign(bookmark, updatedFields);

    this.saveState();
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex((b) => b.id === id);
    if (bookmarkIndex == -1) return;
    this.bookmarks.splice(bookmarkIndex, 1);

    this.saveState();
  }

  saveState() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    try {
      const bookmarksInLocal = localStorage.getItem('bookmarks');
      if (bookmarksInLocal) {
        const bookmarksInStorage = JSON.parse(bookmarksInLocal!);

        this.bookmarks.length = 0;
        this.bookmarks.push(...bookmarksInStorage);
      }
    } catch (error) {
      console.log('Error retreiving bookmarks in localstorage');
      console.log(error);
    }
  }
}
