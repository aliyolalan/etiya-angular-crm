export interface ICompany {
  Company: Company[];
}

export interface Company {
  durum: boolean;
  mesaj: string;
  bilgiler?: CompanyBilgiler[];
}

export interface CompanyBilgiler {
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companylogo?: string;
  latitude?: string;
  longitude?: string;
  sector?: string;
}
