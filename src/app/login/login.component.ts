import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { encrypt } from '../utils/crypto';
import { rememberControl } from '../utils/remember-control';

// FontAwesome Icons...
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../models/iuser';
import { environment } from 'src/environments/environment';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faSignIn = faSignIn;

  constructor(
    private formBuilder: FormBuilder,
    private routerService: Router,
    private httpService: HttpClient,
    private toastrService: ToastrService,
    private seoService: SeoService
  ) {
    const status = rememberControl();
    if (status === true) {
      this.routerService.navigate(['/dashboard']);
    }
  }

  userForm = this.formBuilder.group({
    email: '',
    password: '',
    remember: false,
  });

  // Lifecycle Method...
  ngOnInit(): void {
    this.seoService.updateTitle('Etiya | Giriş Yap');

    this.userForm = new FormGroup({
      email: new FormControl(this.userForm.value.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.userForm.value.password, [
        Validators.required,
      ]),
    });
  }

  // Get Methods...
  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  // Login Function...
  loginFunction() {
    const email = this.email?.value;
    const password = this.password?.value;
    const remember = this.userForm.value.remember;

    const url = 'https://www.jsonbulut.com/json/userLogin.php';
    const sendParams = {
      ref: environment.referanceNumber,
      userEmail: email,
      userPass: password,
      face: 'no',
    };

    // Sending Data To Backend...
    const newThis = this;
    this.httpService.get<IUser>(url, { params: sendParams }).subscribe({
      next(res) {
        const user = res.user[0];
        const durum = user.durum;
        const mesaj = user.mesaj;

        // Login işleminin başarılı olması durumunda...
        if (durum === true) {
          const us = user.bilgiler;

          if (us) {
            const stUs = JSON.stringify(us);
            sessionStorage.setItem('user', encrypt(stUs));
            if (remember === true) {
              localStorage.setItem('user', encrypt(stUs));
            }
            newThis.routerService.navigate(['/']);
          }
        } else {
          // Girişin başarısız olduğu durumda çalışır.
          newThis.toastrService.clear();
          newThis.toastrService.error(mesaj, 'Hata', {
            timeOut: 2000,
          });
        }
      },
      error(err) {
        console.error(err.message);
      },
    });
  }
}
