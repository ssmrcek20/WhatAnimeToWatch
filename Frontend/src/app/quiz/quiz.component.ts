import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../interfaces/MenuItems';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  items: MenuItem[] = [];
  progress = 0;
  currentQuestionIndex: number = 0;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.updateProgress();
      }
    });
  }


  ngOnInit(): void {
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
        routerLink: 'ep-duration'
      },
      {
        label: 'Anime type',
        routerLink: 'type'
      },
      {
        label: 'Status',
        routerLink: 'status'
      },
      {
        label: 'Release date',
        routerLink: 'release-date'
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
        routerLink: 'age-rating'
      }
    ];
  }

  updateProgress() {
    const currentRoute = this.router.url.split('/').pop();
    this.currentQuestionIndex = this.items.findIndex(item => item.routerLink === currentRoute);

    if (this.currentQuestionIndex >= 0) {
      const totalQuestions = this.items.length;
      this.progress = Math.round((this.currentQuestionIndex / totalQuestions) * 100);
    }
  }
}