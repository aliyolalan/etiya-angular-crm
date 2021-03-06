import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../models/iuser';
import { faSignIn, faRegistered } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { SeoService } from '../services/seo.service';

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
    private toastrService: ToastrService,
    private seoService: SeoService
  ) {}

  userForm = this.formBuilder.group({
    userName: '',
    userSurname: '',
    userPhone: '',
    userMail: '',
    userPassword: '',
  });

  // Validators in LifeCycle Method...
  ngOnInit(): void {
    this.seoService.updateTitle('Etiya | Kayıt Ol');

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
      userMail: new FormControl(this.userForm.value.userMail, [
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

  get userMail() {
    return this.userForm.get('userMail');
  }

  get userPassword() {
    return this.userForm.get('userPassword');
  }

  // Register Function
  registerFunction() {
    const userName = this.userName?.value;
    const userSurname = this.userSurname?.value;
    const userPhone = this.userPhone?.value;
    const userMail = this.userMail?.value;
    const userPass = this.userPassword?.value;

    const URL = 'https://www.jsonbulut.com/json/userRegister.php';
    const sendParams = {
      ref: environment.referanceNumber,
      userName: userName,
      userSurname: userSurname,
      userPhone: userPhone,
      userMail: userMail,
      userPass: userPass,
    };

    // Sending Personal Information To Backend
    const newThis = this;
    this.httpService.get<IUser>(URL, { params: sendParams }).subscribe({
      next(res) {
        const user = res.user[0];
        const resStatus = user.durum;
        const resMessage = user.mesaj;

        // This Codes Work If Successful
        if (resStatus === true) {
          newThis.toastrService.success(resMessage, 'Başarılı');

          // Redirect to Login Page After Registration
          setTimeout(() => {
            newThis.routerService.navigate(['/login']);
          }, 1000);
        } else {
          newThis.toastrService.clear();
          newThis.toastrService.error(resMessage, 'Hata', {
            timeOut: 2000,
          });
        }
      },
    });
  }
}
