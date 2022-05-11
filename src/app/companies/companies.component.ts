import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userFunction } from '../utils/user';
import { environment } from 'src/environments/environment';
import { Company, CompanyBilgiler, ICompany } from '../models/icompany';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompaniesComponent implements OnInit {
  arrayOfCompanyInfo: CompanyBilgiler[] = [];
  oldArrayOfCompanyInfo: CompanyBilgiler[] = [];
  companyItem: CompanyBilgiler = {};

  constructor(
    private httpService: HttpClient,
    private toastrService: ToastrService,
    private cdRef: ChangeDetectorRef,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.updateTitle('Etiya | Şirket Listesi');
    this.allCompaniesList();
  }

  allCompaniesList() {
    const userInfo = userFunction();

    if (userInfo !== null) {
      const URL = 'https://www.jsonbulut.com/json/company.php';
      const sendParams = {
        ref: environment.referanceNumber,
      };

      const newThis = this;
      this.httpService.get<ICompany>(URL, { params: sendParams }).subscribe({
        next(res) {
          const resCompany = res.Company[0];
          const resStatus = resCompany.durum;
          const resMessage = resCompany.mesaj;

          const companyInformation = res.Company[0].bilgiler;

          if (companyInformation && resStatus) {
            newThis.arrayOfCompanyInfo = companyInformation;
            newThis.oldArrayOfCompanyInfo = companyInformation;
            console.log(companyInformation);
          } else {
            console.log('Çalışmadı', resMessage);
          }
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
    }
  }
}
