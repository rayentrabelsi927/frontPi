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
import { FavoritesListComponent } from './Client/favorites-list/favorites-list.component';
import { ListArticlesComponent } from './Client/list-articles/list-articles.component';
import { AddUpadateArticleComponent } from './Client/add-upadate-article/add-upadate-article.component';
import { SectionsmanagementComponent } from './Client/sectionsmanagement/sectionsmanagement.component';
import { CartArticleService } from './services/cart-article.service';
import { CartArticleComponent } from './Client/cart-article/cart-article.component';
import { ArticleDetailsComponent } from './Client/article-details/article-details.component';
import { AdminChartsComponent } from './admin/admin-charts/admin-charts.component';
import { ArticlesManagementComponent } from './admin/articles-management/articles-management.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';







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
  { path: 'addItem', component: AddUpadateArticleComponent },
  { path: 'favorites', component:FavoritesListComponent},
  { path: 'items', component: ListArticlesComponent},
  { path:'sections', component: SectionsmanagementComponent},
  { path: 'cart', component:CartArticleComponent},
  { path: 'articleDetails/:articleId', component: ArticleDetailsComponent },



  /* admin lezm el path yabda b kelmet admin */
  { path: 'admin/all', component: AllComponent },
  { path: 'admin/add', component: AddComponent },
  { path: 'admin/update', component: UpdateComponent },
  { path: 'admin/login', component: LoginComponent },
  {path: 'admin/charts', component: AdminChartsComponent},
  {path: 'admin/adminItems', component:ArticlesManagementComponent},
  {path: 'admin/adminActions', component:AdminActionsComponent},
  


  
  // Ajoutez d'autres routes au besoin
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
