import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import firebase from 'firebase';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  showAccountOpt: boolean;
  authService: AuthService;
  usersService: UsersService;
  userData: firebase.User = null;
  router: Router;
  @ViewChild('accountButton') buttonRef: ElementRef;
  @ViewChild('accountMenu') menuRef: ElementRef;

  constructor(private renderer: Renderer2, authService: AuthService, usersService: UsersService, router: Router) {
    this.authService = authService;
    this.usersService = usersService;
    this.authService.getUserData().subscribe((userData) => {
      this.userData = userData;
    });
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.menuRef && e.target !== this.buttonRef.nativeElement && e.target !== this.menuRef.nativeElement){
        this.showAccountOpt = false;
      }
    });
    this.router = router;
  }

  ngOnInit(): void {
    this.showAccountOpt = false;
  }

  toggleMenu(): void{
    this.showAccountOpt = !this.showAccountOpt;
  }

  signOut(): void{
    this.authService.signOut();
    this.router.navigate(['/trips-listing']);
  }
}
