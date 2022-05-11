import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private httpService: HttpClient) {}
  baseURL = 'https://www.jsonbulut.com/json/';
  ref = environment.referanceNumber;

  // Tüm Ürünleri Çağır!
  allProduct() {
    const url = this.baseURL + 'product.php';
    const sendParams = {
      ref: this.ref,
      start: 0,
    };

    return this.httpService.get<IProduct>(url, { params: sendParams });
  }
}
