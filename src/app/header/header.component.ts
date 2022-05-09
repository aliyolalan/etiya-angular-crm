import { Component, OnInit } from '@angular/core';
import { Bilgiler } from '../models/iuser';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { rememberControl } from '../utils/remember-control';
import { decrypt } from '../utils/crypto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  faUser = faUser;

  user: Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: '',
  };

  constructor(private routerService: Router) {
    rememberControl();

    const userInStorage = sessionStorage.getItem('user');

    if (userInStorage) {
      try {
        this.user = JSON.parse(decrypt(userInStorage));
      } catch (error) {
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
        this.routerService.navigate(['/']);
      }
    } else {
      sessionStorage.removeItem('user');
      localStorage.removeItem('user');
      this.routerService.navigate(['/']);
    }
  }

  // Lifecycle Method...
  ngOnInit(): void {}
}
