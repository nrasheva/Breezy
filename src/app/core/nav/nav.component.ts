import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  faRightFromBracket = faRightFromBracket;
  showMenu = window.innerWidth > 768;
  isLoggedIn = false;
  private authSubscription!: Subscription;

  constructor(private userService: UserService) {
    this.checkScreenWidth();
  }

  ngOnInit(): void {
    this.authSubscription = this.userService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    );
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

  logout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
