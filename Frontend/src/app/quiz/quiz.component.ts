import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../interfaces/MenuItems';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Media Type',
        routerLink: 'media'
      },
      {
        label: 'Number of episodes',
        routerLink: 'num-ep'
      },
      {
        label: 'Episodes duration',
        routerLink: 'duration'
      },
      {
        label: 'Genre',
        routerLink: 'genre'
      },
      {
        label: 'Status',
        routerLink: 'status'
      },
      {
        label: 'Release date',
        routerLink: 'rel-date'
      },
      {
        label: 'Source',
        routerLink: 'source'
      },
      {
        label: 'Studio',
        routerLink: 'studio'
      },
      {
        label: 'Age rating',
        routerLink: 'rating'
      }
    ];
  }
}
