import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCoffee,
  faSignOut,
  faList,
  faAddressCard,
  faShoppingCart,
  faUsers,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  faCoffee = faCoffee;
  faSignOut = faSignOut;
  faList = faList;
  faAddressCard = faAddressCard;
  faShoppingCart = faShoppingCart;
  faUsers = faUsers;
  faChartBar = faChartBar;

  constructor(private routerService: Router) {}

  ngOnInit(): void {}

  logOutFunction() {
    const answer = confirm('Oturumu kapatmak istediğinizden emin misiniz?');

    if (answer) {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      this.routerService.navigate(['/login']);
    }
  }
}
