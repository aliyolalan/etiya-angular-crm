import { Component, OnInit } from '@angular/core';
import { faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { AddressList, IAddress } from '../models/iadress';
import { ToastrService } from 'ngx-toastr';
import { userFunction } from '../utils/user';
import { environment } from 'src/environments/environment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { dateConvertFunction } from '../utils/date-convert';
import { IUser } from '../models/iuser';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  faDeleteLeft = faDeleteLeft;
  faTrash = faTrash;

  addres: AddressList = {};
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

  // Adres Listeleme Fonksiyonu
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

  // Adres Ekleme Fonksiyonu
  addressAddFunction() {
    const userInfo = userFunction();

    if (userInfo !== null) {
      this.addres.musterilerID = userInfo.userId;

      if (this.addres.il === undefined || this.addres.il === '') {
        this.toastrService.error('City can not be null!');
      } else if (this.addres.ilce === undefined || this.addres.ilce === '') {
        this.toastrService.error('Distinct can not be null!');
      } else if (
        this.addres.Mahalle === undefined ||
        this.addres.Mahalle === ''
      ) {
        this.toastrService.error('Neighborhood can not be null!');
      } else if (this.addres.adres === undefined || this.addres.adres === '') {
        this.toastrService.error('Address can not be null!');
      } else if (
        this.addres.kapiNo === undefined ||
        this.addres.kapiNo === ''
      ) {
        this.toastrService.error('No can not be null!');
      } else if (this.addres.not === undefined || this.addres.not === '') {
        this.toastrService.error('Note can not be null!');
      } else {
        const url = 'https://www.jsonbulut.com/json/addressAdd.php';
        const sendParams = {
          ref: environment.referanceNumber,
          musterilerID: this.addres.musterilerID,
          il: this.addres.il,
          ilce: this.addres.ilce,
          Mahalle: this.addres.Mahalle,
          adres: this.addres.adres,
          kapiNo: this.addres.kapiNo,
          notBilgi: this.addres.not,
        };

        const newThis = this;
        this.httpService.get<IUser>(url, { params: sendParams }).subscribe({
          next(res) {
            const user = res.user[0];
            const userStatus = user.durum;
            const userMessage = user.mesaj;

            if (userStatus === false) {
              newThis.toastrService.error(userMessage);
            } else {
              newThis.allAddressFunction();
              newThis.toastrService.success('Adres Kaydedildi.');
            }
          },
          error(err) {
            console.log(err.message);
          },
        });
      }
    }
  }

  // Adres Silme Fonksiyonu
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
