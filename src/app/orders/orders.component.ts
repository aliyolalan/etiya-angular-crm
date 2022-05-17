import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrder, OrderList } from '../models/iorder';
import { SeoService } from '../services/seo.service';
import { userFunction } from '../utils/user';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  cartList: OrderList[] = [];
  constructor(
    private httpService: HttpClient,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.updateTitle('Etiya | Siparişlerim');

    const user = userFunction();

    if (user !== null) {
      const url = 'https://www.jsonbulut.com/json/orderList.php';
      const sendParams = {
        ref: environment.referanceNumber,
        musterilerID: user.userId,
      };

      const newThis = this;
      this.httpService.get<IOrder>(url, { params: sendParams }).subscribe({
        next(res) {
          newThis.cartList = res.orderList![0];
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  }
}
