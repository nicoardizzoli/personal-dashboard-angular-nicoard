import { Bookmark } from './../shared/bookmark.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark-tile',
  templateUrl: './bookmark-tile.component.html',
  styleUrls: ['./bookmark-tile.component.scss']
})
export class BookmarkTileComponent implements OnInit {

  @Input() bookmark!: Bookmark;

  favicon: string = "";

  constructor() { }

  ngOnInit(): void {
    this.favicon = `${this.bookmark.url}/favicon.ico`;
  }

}
