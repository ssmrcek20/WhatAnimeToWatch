import { Component, Renderer2, OnInit } from '@angular/core';

interface CustomMenuItem {
  label: string;
  icon?: string;
  url?: string;
  routerLink?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2) { }
  items: CustomMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
          {
            label: 'Quiz',
            routerLink: 'quiz'
          },
          {
            label: 'Anime List',
            routerLink: ''
          },
          {
            label: 'Import',
            routerLink: ''
          }
    ];
  }

  private themeLink = this.renderer.selectRootElement('#theme', true);
  isLightTheme = true;

  toggleTheme(button: HTMLButtonElement): void {
    this.isLightTheme = !this.isLightTheme;
    if (this.isLightTheme) {
      this.themeLink.setAttribute('href', 'assets/theme.css');
      button.classList.remove('pi-sun');
      button.classList.add('pi-moon');
    } else {
      this.themeLink.setAttribute('href', 'assets/theme-dark.css');
      button.classList.remove('pi-moon');
      button.classList.add('pi-sun');
    }
  }
}
