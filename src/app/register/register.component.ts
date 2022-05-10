import { Component, OnInit } from '@angular/core';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faSignIn = faSignIn

  constructor() { }

  ngOnInit(): void {
  }

}
