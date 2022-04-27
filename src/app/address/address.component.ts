import { Component, OnInit } from '@angular/core';
import { faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  faDeleteLeft = faDeleteLeft
  faTrash = faTrash

  constructor() { }

  ngOnInit(): void {
  }

}
