import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  constructor(
    private locationService: Location,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.updateTitle('Etiya | Sayfa Bulunamadı');
  }

  backToLastPage() {
    this.locationService.back();
  }
}
