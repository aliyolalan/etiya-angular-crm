import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Bilgiler, IUser } from '../models/iuser';
import { decrypt } from '../utils/crypto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: '',
  };

  password = '';

  constructor(
    private toastrService: ToastrService,
    private httpService: HttpClient
  ) {
    const userInStorage = sessionStorage.getItem('user');

    if (userInStorage) {
      try {
        this.user = JSON.parse(decrypt(userInStorage));
      } catch (error) {
        sessionStorage.removeItem('user');
      }
    }
  }

  ngOnInit(): void {}

  updateFunction() {
    if (this.user.userName === '') {
      this.toastrService.error('Name Empty!');
    } else if (this.user.userSurname === '') {
      this.toastrService.error('Surname Empty!');
    } else if (this.user.userEmail === '') {
      this.toastrService.error('Email Empty!');
    } else if (this.user.userPhone === '') {
      this.toastrService.error('Phone Empty!');
    } else if (this.password === '') {
      this.toastrService.error('Password Entry!');
    } else {
      const url = 'https://www.jsonbulut.com/json/userSettings.php';
      const sendParams = {
        ref: environment.referanceNumber,
        userName: this.user.userName,
        userSurname: this.user.userSurname,
        userEmail: this.user.userEmail,
        userPhone: this.user.userPhone,
        userPassword: this.password,
        userId: this.user.userId,
      };

      const newThis = this;
      this.httpService.get<IUser>(url, { params: sendParams }).subscribe({
        next(res) {
          const user = res.user[0];
          const userStatus = user.durum;
          const userMessage = user.mesaj;

          if (userStatus === true) {
            const userInStorage = JSON.stringify(newThis.user);
            sessionStorage.setItem('user', userInStorage);
            newThis.toastrService.success(userMessage);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            newThis.toastrService.error(userMessage);
          }
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  }
}
