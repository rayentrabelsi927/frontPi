import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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
import { LoginComponent } from './admin/login/login.component';
import { TableComponent } from './Client/table/table.component';
import { BuyComponent } from './Client/buy/buy.component';
import { AddComponent } from './admin/add/add.component';
import { UpdateComponent } from './admin/update/update.component';
import { AccountSeettingComponent } from './Client/account-seetting/account-seetting.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllComponent } from './admin/all/all.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
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


@NgModule({
  declarations: [
    AppComponent,
    SqueletteComponent,
    HeaderTopComponent,
    NavbarComponent,
    HomeComponent,
    ListTopicsComponent,
    WorksComponent,
    ExploreComponent,
    ReviewsComponent,
    StatisticsComponent,
    BlogComponent,
    ContactComponent,
    FooterComponent,
    LoginComponent,
    TableComponent,
    BuyComponent,
    AddComponent,
    UpdateComponent,
    AccountSeettingComponent,
    AllComponent,
    HeaderComponent,
    SidebarComponent,
    AllSportTeamComponent,
    AddTeamComponent,
    UpdateTeamComponent,
    DetailsTeamComponent,
    AllFieldsComponent,
    AddFieldComponent,
    UpdateFieldComponent,
    AllReservationsComponent,
    AddReservationComponent,
    UpdateReservationComponent,
    AdminAllReservationsComponent,
    AdminUpdateReservationComponent,
    AdminAddReservationComponent,
    AdminAllsportTeamComponent,
    AdminAddsportTeamComponent,
    AdminUpdatesportTeamComponent,
    AdminDetailssportTeamComponent,
    DetailsTeamClientComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, // Add this line
    FormsModule, // Add this line
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
