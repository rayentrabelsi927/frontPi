import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QRCodeModule } from 'angular2-qrcode';

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
//import { LoginComponent } from './admin/login/login.component';
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
import { SectionsmanagementComponent } from './Client/sectionsmanagement/sectionsmanagement.component';
import { FavoritesListComponent } from './Client/favorites-list/favorites-list.component';
import { ListArticlesComponent } from './Client/list-articles/list-articles.component';
import { AddUpadateArticleComponent } from './Client/add-upadate-article/add-upadate-article.component';
//import { HttpClientModule } from '@angular/common/http';
import { CartArticleComponent } from './Client/cart-article/cart-article.component';
import { ArticleDetailsComponent } from './Client/article-details/article-details.component';
import { AdminChartsComponent } from './admin/admin-charts/admin-charts.component';
import { ArticlesManagementComponent } from './admin/articles-management/articles-management.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
//import { MatPaginatorModule } from '@angular/material/paginator';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoginComponent } from './Client/login/login.component';
import { RegisterComponent } from './Client/register/register.component';
import { ActivateAccountComponent } from './Client/activate-account/activate-account.component';
import { LogoutComponent } from './Client/logout/logout.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';

import { CodeInputComponent, CodeInputModule } from 'angular-code-input';
import { TransactionComponent } from './Client/transaction/transaction.component';
import { PaiementComponent } from './Client/paiement/paiement.component';
import { SucessComponent } from './Client/sucess/sucess.component';
import { CancelComponent } from './Client/cancel/cancel.component';
import { TransactionListComponent } from './admin/transaction-list/transaction-list.component';
import { ChatbotComponent } from './Client/chatbot/chatbot.component';
import { StatisticFeedbackComponent } from './admin/statistic-feedback/statistic-feedback.component';
import { BannedUserComponent } from './admin/banned-user/banned-user.component';
import { PagehomeComponent } from './Client/pagehome/pagehome.component';
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

import { InternshipComponent } from './Client/internship/internship.component';
import { InternshipDetailComponentComponent } from './Client/internship-detail-component/internship-detail-component.component';
import { FreelanceComponent } from './Client/freelance/freelance.component';
import { FreelanceDetailComponentComponent } from './Client/freelance-detail-component/freelance-detail-component.component';
import { InternshipAdminComponent } from './admin/internship-admin/internship-admin.component';
import { NewInternshipComponent } from './admin/new-internship/new-internship.component';
import { FreelanceAdminComponent } from './admin/freelance-admin/freelance-admin.component';
import { NewJobComponent } from './admin/new-job/new-job.component';
import { UpdateInternshipComponent } from './admin/update-internship/update-internship.component';
import { InternshipRoomComponent } from './Client/internship-room/internship-room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FileComponent } from './admin/file/file.component';
import { NgxPaginationModule } from 'ngx-pagination';
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
import { TransactionhousingComponent } from './Client/transactionhousing/transactionhousing.component';
import { TestComponent } from './test/test.component';
import { EventadminComponent } from './admin/eventadmin/eventadmin.component';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from './services/event-service.service';
import { AddeventComponent } from './admin/addevent/addevent.component';
import { EventclientComponent } from './Client/eventclient/eventclient.component';
import { UpdateeventComponent } from './admin/updateevent/updateevent.component';

import { InternshiprecommendationComponent } from './Client/internshiprecommendation/internshiprecommendation.component';
import { UpdateFreelanceJobComponent } from './admin/update-freelance-job/update-freelance-job.component';
import { UserArticlesComponent } from './Client/user-articles/user-articles.component';

import { AtsListOwnerComponent } from './admin/ats-list-owner/ats-list-owner.component';
import { AddVisitComponent } from './add-visit/add-visit.component';
import { AddVisit2Component } from './add-visit2/add-visit2.component';
import { AllComplaintsComponent } from './admin/all-complaints/all-complaints.component';
import { UserDetailsComponent } from './Client/user-details/user-details.component';
import { RoomComponent } from './Client/room/room.component';


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
    RegisterComponent,
    ActivateAccountComponent,
    LogoutComponent,

    AllUsersComponent,
    
    SectionsmanagementComponent,
    FavoritesListComponent,
    ListArticlesComponent,
    AddUpadateArticleComponent,
    CartArticleComponent,
   ArticleDetailsComponent,
   AdminChartsComponent,
   ArticlesManagementComponent,
   AdminActionsComponent,


    TransactionComponent,
    PaiementComponent,
    SucessComponent,
    CancelComponent,
    TransactionListComponent,
    ChatbotComponent,
    StatisticFeedbackComponent,
    BannedUserComponent,
    PagehomeComponent,
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

    InternshipComponent,
    InternshipDetailComponentComponent,
    FreelanceComponent,
    FreelanceDetailComponentComponent,
    InternshipAdminComponent,
    NewInternshipComponent,
    FreelanceAdminComponent,
    NewJobComponent,
    UpdateInternshipComponent,
    FileComponent,
    HousingListComponent,
    HousingAddComponent,
    HousingDetailsComponent,
    HousingUpdateComponent,
    HousingRecComponent,
    HousingATSComponent,
    AtsListComponent,
    VisitListComponent,
    HousingOwnerComponent,
    HousingOwnerDetailsComponent,
    HousingAvailabilityComponent,
    TransactionhousingComponent,
    AtsListOwnerComponent,
    AddVisitComponent,
    AddVisit2Component,
    
    TestComponent,
    EventadminComponent,
    AddeventComponent,
    EventclientComponent,
    UpdateeventComponent,
    
   
    InternshipRoomComponent,
    InternshiprecommendationComponent,
    UpdateFreelanceJobComponent,

    UserArticlesComponent,
    AllComplaintsComponent,
    UserDetailsComponent,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule, // Add this line
    FormsModule ,// Add this line
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CodeInputModule,
    BrowserAnimationsModule,
    QRCodeModule,
    FormsModule, // Add this line
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,

    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    NgxPaginationModule,
    FormsModule, // Add this line
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [
    HttpClient,

    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    QRCodeModule,
    EventService
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
