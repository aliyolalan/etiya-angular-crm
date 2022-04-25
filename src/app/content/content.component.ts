import { Component, OnInit } from '@angular/core';
import { IProduct, ProBilgiler } from '../models/iproduct';
import { RestService } from '../services/rest.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  searchedString = ""
  searchedID = ""
  arrayOfProductInfo:ProBilgiler[] = []
  oldArrayOfProductInfo:ProBilgiler[] = []
  productItem:ProBilgiler = {}

  constructor(private restService: RestService, public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit(): void {
    const newThis = this
    this.restService.allProduct().subscribe({
      next(res) {
        const productInformation = res.Products[0].bilgiler
        if(productInformation) {
          newThis.arrayOfProductInfo = productInformation
          newThis.oldArrayOfProductInfo = productInformation
        }
      }, error(err) {
        console.error(err.message)
      }
    })

    console.log("Deneme: ", this.productItem)
  }

  searchFunctionWithTitle() {
    this.arrayOfProductInfo = this.oldArrayOfProductInfo
    const searchedWord = this.searchedString.toLocaleLowerCase()

    const filterGlobal = (productItem: ProBilgiler) => productItem.productName?.toLocaleLowerCase().includes(searchedWord)
    this.arrayOfProductInfo = this.arrayOfProductInfo.filter(filterGlobal)
  }

  searchFunctionWithID() {
    this.arrayOfProductInfo = this.oldArrayOfProductInfo
    const searchingID = this.searchedID

    const filterGlobal = (productItem: ProBilgiler) => productItem.productId?.includes(searchingID)
    this.arrayOfProductInfo = this.arrayOfProductInfo.filter(filterGlobal)
  }

  openDetailModal(i: number) {
    this.productItem = this.arrayOfProductInfo[i]
  }

}
