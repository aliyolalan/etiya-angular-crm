import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { encrypt } from '../utils/crypto';


// FontAwesome Icons...
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../models/iuser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faSignIn = faSignIn

  constructor(
    private formBuilder: FormBuilder,
    private routerService: Router,
    private httpService: HttpClient,
    private toastrService: ToastrService
    ) { }

  userForm = this.formBuilder.group({
    email: "",
    password: ""
  })

  // Lifecycle Method...
  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(this.userForm.value.email, [
        Validators.required, Validators.email
      ]),
      password: new FormControl(this.userForm.value.password, [
        Validators.required
      ]),
    })
  }

  // Get Methods...
  get email() {
    return this.userForm.get("email")
  }

  get password() {
    return this.userForm.get("password")
  }

  // Login Function...
  loginFunction(){
    const email = this.email?.value
    const password = this.password?.value

    const url = 'https://www.jsonbulut.com/json/userLogin.php'
    const sendParams = {
      ref: '74430d47fa16b4c53c0fe59510752c70',
      userEmail: email,
      userPass: password,
      face: 'no'
    }

    // Sending Data To Backend...
    const newThis = this
    this.httpService.get<IUser>(url, {params: sendParams}).subscribe({
      next(res){
        const user = res.user[0]
        const durum = user.durum
        const mesaj = user.mesaj

        // Login işleminin başarılı olması durumunda...
        if (durum === true) {
          const us = user.bilgiler;

          if (us) {
            const stUs = JSON.stringify(us)
            sessionStorage.setItem("user", encrypt(stUs));
            newThis.toastrService.success(mesaj, "Giriş Başarılı", {
              timeOut: 2000
            })
            newThis.routerService.navigate(['/dashboard'])
          }
        } else {
          // Girişin başarısız olduğu durumda çalışır.
          newThis.toastrService.clear()
          newThis.toastrService.error(mesaj, "Hata", {
            timeOut: 2000
          })
        }
      },
      error( err ) {
        console.error( err.message )
      }
    })

  }
}
