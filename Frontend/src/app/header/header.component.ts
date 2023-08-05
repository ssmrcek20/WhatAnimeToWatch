import { Component, Renderer2  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private renderer: Renderer2) { }
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
