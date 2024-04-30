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
import { AllSportTeamComponent } from './Client/all-sport-team/all-sport-team.component';
import { AddTeamComponent } from './Client/add-team/add-team.component';
import { UpdateTeamComponent } from './Client/update-team/update-team.component';
import { DetailsTeamComponent } from './Client/details-team/details-team.component';
import { AllFieldsComponent } from './admin/all-fields/all-fields.component';
import { AddFieldComponent } from './admin/add-field/add-field.component';
import { UpdateFieldComponent } from './admin/update-field/update-field.component';
import { AllReservationsComponent } from './Client/all-reservations/all-reservations.component';
import { AddReservationComponent } from './Client/add-reservation/add-reservation.component';
import { UpdateReservationComponent } from './Client/update-reservation/update-reservation.component';
import { AdminAllReservationsComponent } from './admin/admin-all-reservations/admin-all-reservations.component';
import { AdminUpdateReservationComponent } from './admin/admin-update-reservation/admin-update-reservation.component';
import { AdminAddReservationComponent } from './admin/admin-add-reservation/admin-add-reservation.component';
import { AdminAllsportTeamComponent } from './admin/admin-allsport-team/admin-allsport-team.component';
import { AdminAddsportTeamComponent } from './admin/admin-addsport-team/admin-addsport-team.component';
import { AdminUpdatesportTeamComponent } from './admin/admin-updatesport-team/admin-updatesport-team.component';
import { AdminDetailssportTeamComponent } from './admin/admin-detailssport-team/admin-detailssport-team.component';
import { DetailsTeamClientComponent } from './Client/details-team-client/details-team-client.component';






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
  { path: 'allsportteam', component: AllSportTeamComponent },
  { path: 'add-team', component: AddTeamComponent },
  { path: 'update-team/:id', component: UpdateTeamComponent },
  { path: 'details-team/:id', component: DetailsTeamComponent },
  { path: 'details-team-client/:id', component: DetailsTeamClientComponent },
  { path: 'all-reservations', component: AllReservationsComponent },
  { path: 'add-reservation', component: AddReservationComponent },
  { path: 'update-reservation/:id', component: UpdateReservationComponent },


  /* admin lezm el path yabda b kelmet admin */
  { path: 'admin/all', component: AllComponent },
  { path: 'admin/add', component: AddComponent },
  { path: 'admin/update', component: UpdateComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/all-fields', component: AllFieldsComponent},
  { path: 'admin/add-field', component: AddFieldComponent },
  { path: '', redirectTo: '/all-fields', pathMatch: 'full' },
  { path: 'admin/update-field/:id', component: UpdateFieldComponent },
  { path: 'admin/all-reservations', component: AdminAllReservationsComponent },
  { path: 'admin/update-reservation/:id', component: AdminUpdateReservationComponent },
  { path: 'admin/add-reservation', component: AdminAddReservationComponent },
  { path: 'admin/allsportteam', component: AdminAllsportTeamComponent },
  { path: 'admin/add-team', component: AdminAddsportTeamComponent },
  { path: 'admin/update-team/:id', component: AdminUpdatesportTeamComponent },
  { path: 'admin/details-team/:id', component: AdminDetailssportTeamComponent },

  // Ajoutez d'autres routes au besoin
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
