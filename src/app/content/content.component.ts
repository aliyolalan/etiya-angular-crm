import { Component, OnInit } from '@angular/core';
import { IProduct, ProBilgiler } from '../models/iproduct';
import { RestService } from '../services/rest.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  searchedString = '';
  searchedID = '';
  maxValue = '';
  minValue = '';

  arrayOfProductInfo: ProBilgiler[] = [];
  oldArrayOfProductInfo: ProBilgiler[] = [];
  productItem: ProBilgiler = {};

  constructor(
    private restService: RestService,
    public ngxSmartModalService: NgxSmartModalService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    // Update Title
    this.seoService.updateTitle('Etiya | Ürün Listesi');

    // Products List Method...
    const newThis = this;
    this.restService.allProduct().subscribe({
      next(res) {
        const productInformation = res.Products[0].bilgiler;
        if (productInformation) {
          newThis.arrayOfProductInfo = productInformation;
          newThis.oldArrayOfProductInfo = productInformation;
        }
      },
      error(err) {
        console.error(err.message);
      },
    });
  }

  searchFunctionWithTitle() {
    this.arrayOfProductInfo = this.oldArrayOfProductInfo;
    const searchedWord = this.searchedString.toLocaleLowerCase();

    const filterGlobal = (productItem: ProBilgiler) =>
      productItem.productName?.toLocaleLowerCase().includes(searchedWord);
    this.arrayOfProductInfo = this.arrayOfProductInfo.filter(filterGlobal);
  }

  searchFunctionWithID() {
    this.arrayOfProductInfo = this.oldArrayOfProductInfo;
    const searchingID = this.searchedID;

    const filterGlobal = (productItem: ProBilgiler) =>
      productItem.productId?.includes(searchingID);
    this.arrayOfProductInfo = this.arrayOfProductInfo.filter(filterGlobal);
  }

  rangeFilterFunction() {
    this.arrayOfProductInfo = this.oldArrayOfProductInfo;
    const maxedValue = parseInt(this.maxValue);
    console.log(maxedValue);
  }

  openDetailModal(i: number) {
    this.productItem = this.arrayOfProductInfo[i];
  }
}
