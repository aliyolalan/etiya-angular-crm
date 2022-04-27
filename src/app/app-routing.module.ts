import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddressComponent } from './address/address.component';
import { ContentComponent } from './content/content.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';



const routes: Routes = [
  { path: "", component: LayoutComponent, children: [
  { path: 'header', component: HeaderComponent},
  { path: "dashboard", component: DashboardComponent},
  { path: "address", component: AddressComponent},
  { path: "profile", component: ProfileComponent},
  { path: "orders", component: OrdersComponent},
  { path: "customers", component: CustomersComponent},
  { path: "content", component: ContentComponent}]},
  { path: 'login', component: LoginComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
