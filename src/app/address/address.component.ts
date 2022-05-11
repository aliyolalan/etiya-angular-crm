import { Component, OnInit } from '@angular/core';
import { faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { AddressList, IAddress } from '../models/iadress';
import { ToastrService } from 'ngx-toastr';
import { userFunction } from '../utils/user';
import { environment } from 'src/environments/environment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { dateConvertFunction } from '../utils/date-convert';
import { IUser, Bilgiler } from '../models/iuser';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  user: Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: '',
  };

  faDeleteLeft = faDeleteLeft;
  faTrash = faTrash;

  addressList: AddressList = {};
  allAddress: AddressList[] = [];
  modelAddress: AddressList = {};

  constructor(
    private toastrService: ToastrService,
    private httpService: HttpClient,
    private ngxSmartModalService: NgxSmartModalService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.updateTitle('Etiya | Adres Listesi');
    this.allAddressFunction();
  }

  allAddressFunction() {
    const userInfo = userFunction();

    if (userInfo !== null) {
      const url = 'https://www.jsonbulut.com/json/addressList.php';
      const sendParams = {
        ref: environment.referanceNumber,
        musterilerID: userInfo.userId,
      };
      const newThis = this;
      this.httpService.get<IAddress>(url, { params: sendParams }).subscribe({
        next(res) {
          newThis.allAddress = res.addressList!;
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  }

  addressAddFunction() {
    const userInfo = userFunction();

    if (userInfo !== null) {
      this.addressList.musterilerID = userInfo.userId;

      if (this.addressList.il === undefined || this.addressList.il === '') {
        this.toastrService.error('City can not be null!');
      } else if (
        this.addressList.ilce === undefined ||
        this.addressList.ilce === ''
      ) {
        this.toastrService.error('Distinct can not be null!');
      } else if (
        this.addressList.Mahalle === undefined ||
        this.addressList.Mahalle === ''
      ) {
        this.toastrService.error('Neighborhood can not be null!');
      } else if (
        this.addressList.adres === undefined ||
        this.addressList.adres === ''
      ) {
        this.toastrService.error('Address can not be null!');
      } else if (
        this.addressList.kapiNo === undefined ||
        this.addressList.kapiNo === ''
      ) {
        this.toastrService.error('No can not be null!');
      } else if (
        this.addressList.not === undefined ||
        this.addressList.not === ''
      ) {
        this.toastrService.error('Note can not be null!');
      } else {
        const url = 'https://www.jsonbulut.com/json/addressAdd.php';
        const sendParams = {
          ref: environment.referanceNumber,
          musterilerID: this.addressList.musterilerID,
          il: this.addressList.il,
          ilce: this.addressList.ilce,
          mahalle: this.addressList.Mahalle,
          adres: this.addressList.adres,
          kapiNo: this.addressList.kapiNo,
          notBilgisi: this.addressList.not,
        };

        const newThis = this;
        this.httpService.get<IUser>(url, { params: sendParams }).subscribe({
          next(res) {
            const user = res.user[0];
            const userStatus = user.durum;
            const userMessage = user.mesaj;

            if (userStatus === true) {
              newThis.allAddressFunction();
              newThis.toastrService.success('Kayıt işlemi başarılı.');
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

  removeAddressFunction(adresID: string) {
    const answer = confirm('Are you sure?');

    if (answer) {
      const userInfo = userFunction();

      if (userInfo !== null) {
        const url = 'https://www.jsonbulut.com/json/addressDelete.php';
        const sendParams = {
          ref: environment.referanceNumber,
          musterilerID: userInfo.userId,
          adresID: adresID,
        };

        const newThis = this;
        this.httpService.get(url, { params: sendParams }).subscribe({
          next(res) {
            newThis.allAddressFunction();
          },
          error(err) {
            console.log(err.message);
          },
        });
      }
    }
  }

  // Adres Detail
  detailFunction(index: number) {
    const item = this.allAddress[index];
    if (item.tarih) {
      const newTarih = dateConvertFunction(item.tarih.toString());
      item.tarih = newTarih;
    }
    this.modelAddress = item;
  }
}
