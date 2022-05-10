import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faSignIn, faRegistered } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  faSignIn = faSignIn;
  faRegistered = faRegistered;

  constructor(
    private formBuilder: FormBuilder,
    private routerService: Router,
    private httpService: HttpClient,
    private toastrService: ToastrService
  ) {}

  userForm = this.formBuilder.group({
    userName: '',
    userSurname: '',
    userPhone: '',
    userEmail: '',
    userPassword: '',
  });

  // Validators in LifeCycle Method...
  ngOnInit(): void {
    this.userForm = new FormGroup({
      userName: new FormControl(this.userForm.value.userName, [
        Validators.required,
      ]),
      userSurname: new FormControl(this.userForm.value.userSurname, [
        Validators.required,
      ]),
      userPhone: new FormControl(this.userForm.value.userPhone, [
        Validators.required,
      ]),
      userEmail: new FormControl(this.userForm.value.userEmail, [
        Validators.required,
        Validators.email,
      ]),
      userPassword: new FormControl(this.userForm.value.userPassword, [
        Validators.required,
      ]),
    });
  }

  // Get Methods For NgIf... Conditional Rendering...
  get userName() {
    return this.userForm.get('userName');
  }

  get userSurname() {
    return this.userForm.get('userSurname');
  }

  get userPhone() {
    return this.userForm.get('userPhone');
  }

  get userEmail() {
    return this.userForm.get('userEmail');
  }

  get userPassword() {
    return this.userForm.get('userPassword');
  }

  registerFunction() {}
}
