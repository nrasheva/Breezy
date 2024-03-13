import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  showMenu = window.innerWidth > 768;

  constructor() {
    this.checkScreenWidth();
  }

  toggleMenu() {
    if (window.innerWidth < 768) this.showMenu = !this.showMenu;
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.toggleMenu();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    this.showMenu = window.innerWidth > 768;
  }
}
