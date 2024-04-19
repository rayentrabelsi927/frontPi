import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SqueletteComponent } from './shared/squelette/squelette.component';
import { HeaderTopComponent } from './Client/header-top/header-top.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './Client/home/home.component';
import { ListTopicsComponent } from './Client/list-topics/list-topics.component';
import { WorksComponent } from './Client/works/works.component';
import { ExploreComponent } from './Client/explore/explore.component';
import { ReviewsComponent } from './Client/reviews/reviews.component';
import { StatisticsComponent } from './Client/statistics/statistics.component';
import { BlogComponent } from './Client/blog/blog.component';
import { ContactComponent } from './Client/contact/contact.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './Client/login/login.component';
import { TableComponent } from './Client/table/table.component';
import { BuyComponent } from './Client/buy/buy.component';
import { AddComponent } from './Client/add/add.component';
import { UpdateComponent } from './Client/update/update.component';
import { AccountSeettingComponent } from './Client/account-seetting/account-seetting.component';
import { AllComponent } from './Client/all/all.component';






const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 

  { path: 'home', component: HomeComponent },
  { path: 'list-topics', component: ListTopicsComponent },
  { path: 'works', component: WorksComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'buy', component: BuyComponent },
  { path: 'account', component: AccountSeettingComponent },

  { path: 'add', component: AddComponent },
  { path: 'update', component: UpdateComponent },

  { path: 'add', component: AddComponent },
  { path: 'all', component: AllComponent },

  { path: 'statistics', component: StatisticsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'table', component: TableComponent },

  { path: 'login', component: LoginComponent },

  
  // Ajoutez d'autres routes au besoin
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
