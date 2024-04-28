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
import { TransactionComponent } from './Client/transaction/transaction.component';
import { PaiementComponent } from './Client/paiement/paiement.component';
import { CancelComponent } from './Client/cancel/cancel.component';
import { SucessComponent } from './Client/sucess/sucess.component';
import { TransactionListComponent } from './admin/transaction-list/transaction-list.component';
import { ChatbotComponent } from './Client/chatbot/chatbot.component';
import { StatisticFeedbackComponent } from './admin/statistic-feedback/statistic-feedback.component';






const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'paiement', component: PaiementComponent },
  { path: 'cancel', component: CancelComponent },
  { path: 'success', component: SucessComponent },
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
  { path: 'chatbot', component: ChatbotComponent },

  { path: 'admin/statistics', component: StatisticFeedbackComponent },

  /* admin lezm el path yabda b kelmet admin */
  { path: 'admin/all', component: AllComponent },
  { path: 'admin/add', component: AddComponent },
  { path: 'admin/update', component: UpdateComponent },
  { path: 'admin/login', component: LoginComponent },

  { path: 'admin/transaction', component: TransactionListComponent },

  // Ajoutez d'autres routes au besoin
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
