import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';
import { MenuItem } from '../interfaces/MenuItems';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2, private quizService: QuizService, private elementRef: ElementRef) { }
  items: MenuItem[] | undefined;

  button: HTMLElement | null | undefined;
  private themeLink = this.renderer.selectRootElement('#theme', true);
  isLightTheme = true;

  ngOnInit() {
    this.items = [
          {
            label: 'Quiz',
            routerLink: 'quiz'
          },
          {
            label: 'Anime List',
            routerLink: 'anime-list'
          }
    ];

    this.button = document.getElementById('themeButton');
    const selectedTheme = localStorage.getItem('theme');
    if (selectedTheme) {
      this.applyTheme(selectedTheme !== 'light');
    }
  }

  toggleTheme(): void {
    this.applyTheme(this.isLightTheme);

    localStorage.setItem('theme', this.isLightTheme ? 'light' : 'dark');
  }

  private applyTheme(isLightTheme: boolean): void {
    if (isLightTheme) {
      this.isLightTheme = false;
      this.themeLink.setAttribute('href', 'assets/theme-dark.css');
      if(this.button != null && this.button != undefined){
        this.button.classList.remove('pi-moon');
        this.button.classList.add('pi-sun');
      }
      
    } else {
      this.isLightTheme = true;
      this.themeLink.setAttribute('href', 'assets/theme.css');
      if(this.button != null && this.button != undefined){
        this.button.classList.remove('pi-sun');
        this.button.classList.add('pi-moon');
      }
    }
  }

  resetQuiz(): void {
    this.quizService.deleteAllFormData();
  }
}
