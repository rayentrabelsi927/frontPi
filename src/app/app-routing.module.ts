import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Client/home/home.component';
import { ListTopicsComponent } from './Client/list-topics/list-topics.component';
import { WorksComponent } from './Client/works/works.component';
import { ExploreComponent } from './Client/explore/explore.component';
import { ReviewsComponent } from './Client/reviews/reviews.component';
import { StatisticsComponent } from './Client/statistics/statistics.component';
import { BlogComponent } from './Client/blog/blog.component';
import { ContactComponent } from './Client/contact/contact.component';
import { LoginComponent } from './admin/login/login.component';
import { TableComponent } from './Client/table/table.component';
import { BuyComponent } from './Client/buy/buy.component';
import { AddComponent } from './admin/add/add.component';
import { UpdateComponent } from './admin/update/update.component';
import { AccountSeettingComponent } from './Client/account-seetting/account-seetting.component';
import { AllComponent } from './admin/all/all.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HousingListComponent } from './housing-list/housing-list.component';
import { HousingAddComponent } from './housing-add/housing-add.component';
import { HousingDetailsComponent } from './housing-details/housing-details.component';
import { HousingUpdateComponent } from './housing-update/housing-update.component';
import { HousingRecComponent } from './housing-rec/housing-rec.component';
import { HousingATSComponent } from './housing-ats/housing-ats.component';
import { AtsListComponent } from './ats-list/ats-list.component';
import { VisitListComponent } from './visit-list/visit-list.component';
import { HousingOwnerComponent } from './admin/housing-owner/housing-owner.component';
import { HousingOwnerDetailsComponent } from './admin/housing-owner-details/housing-owner-details.component';
import { HousingAvailabilityComponent } from './housing-availability/housing-availability.component';






const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 

  { path: 'home', component: HomeComponent },
  { path: 'list-topics', component: ListTopicsComponent },
  { path: 'works', component: WorksComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'account', component: AccountSeettingComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'table', component: TableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'housing-list', component: HousingListComponent },
  { path: 'housing-add', component: HousingAddComponent },
  { path: 'housing-list/housing-byId/:id', component: HousingDetailsComponent },
  
  { path: 'housing-rec', component: HousingRecComponent },
  { path: 'housing-ats-add/:housingId', component: HousingATSComponent },
  { path: 'housing-ats-list/:id', component: AtsListComponent },
  { path: 'housing-visit-list/:id', component: VisitListComponent },
  { path: 'housing-ATSdispo/:id', component: HousingAvailabilityComponent }, 
  

  /* admin lezm el path yabda b kelmet admin */
  { path: 'admin/all', component: AllComponent },
  { path: 'admin/add', component: AddComponent },
  { path: 'admin/update', component: UpdateComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/housing-Owner/:id', component: HousingOwnerComponent },
  { path: 'admin/housing-Owner-details/:id', component: HousingOwnerDetailsComponent },
  { path: 'admin/housing-update/:id', component: HousingUpdateComponent },

  
  // Ajoutez d'autres routes au besoin
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
