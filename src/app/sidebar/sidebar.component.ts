import { Component, OnInit } from '@angular/core';
import { faCoffee, faSignOut, faList, faAddressCard, faShoppingCart, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faCoffee = faCoffee
  faSignOut = faSignOut
  faList = faList
  faAddressCard = faAddressCard
  faShoppingCart = faShoppingCart
  faUsers = faUsers
  faChartBar = faChartBar

  constructor() { }

  ngOnInit(): void {
  }

}
