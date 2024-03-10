import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  showMenu = window.innerWidth > 768;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.toggleMenu();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.showMenu = window.innerWidth > 768;
  }
}
