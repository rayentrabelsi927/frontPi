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
//import { LoginComponent } from './admin/login/login.component';
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
import { LoginComponent } from './Client/login/login.component';
import { RegisterComponent } from './Client/register/register.component';
import { ActivateAccountComponent } from './Client/activate-account/activate-account.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';

import { TransactionComponent } from './Client/transaction/transaction.component';
import { PaiementComponent } from './Client/paiement/paiement.component';
import { CancelComponent } from './Client/cancel/cancel.component';
import { SucessComponent } from './Client/sucess/sucess.component';
import { TransactionListComponent } from './admin/transaction-list/transaction-list.component';
import { ChatbotComponent } from './Client/chatbot/chatbot.component';
import { StatisticFeedbackComponent } from './admin/statistic-feedback/statistic-feedback.component';
import { BannedUserComponent } from './admin/banned-user/banned-user.component';
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
import { FreelanceAdminComponent } from './admin/freelance-admin/freelance-admin.component';
import { NewInternshipComponent } from './admin/new-internship/new-internship.component';
import { NewJobComponent } from './admin/new-job/new-job.component';
import { UpdateFreelanceJobComponent } from './admin/update-freelance-job/update-freelance-job.component';
import { UpdateInternshipComponent } from './admin/update-internship/update-internship.component';
import { InternshipRoomComponent } from './Client/internship-room/internship-room.component';
import { FileComponent } from './admin/file/file.component';
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
import { EventadminComponent } from './admin/eventadmin/eventadmin.component';
import { AddeventComponent } from './admin/addevent/addevent.component';
import { EventclientComponent } from './Client/eventclient/eventclient.component';
import { UpdateeventComponent } from './admin/updateevent/updateevent.component';

import { InternshiprecommendationComponent } from './Client/internshiprecommendation/internshiprecommendation.component';
import { UserArticlesComponent } from './Client/user-articles/user-articles.component';
import { AtsListOwnerComponent } from './admin/ats-list-owner/ats-list-owner.component';
import { AddVisitComponent } from './add-visit/add-visit.component';
import { AddVisit2Component } from './add-visit2/add-visit2.component';
import { AllComplaintsComponent } from './admin/all-complaints/all-complaints.component';
import { UserDetailsComponent } from './Client/user-details/user-details.component';
import { RoomComponent } from './Client/room/room.component';






const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'paiement', component: PaiementComponent },
  { path: 'user-details/:id', component: UserDetailsComponent},
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
  { path: 'addItem', component: AddUpadateArticleComponent },
  { path: 'favorites', component:FavoritesListComponent},
  { path: 'items', component: ListArticlesComponent},
  { path:'sections', component: SectionsmanagementComponent},
  { path: 'cart', component:CartArticleComponent},
  { path: 'articleDetails/:articleId', component: ArticleDetailsComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'activate-account', component: ActivateAccountComponent},
  { path: 'room', component: RoomComponent},


  { path: 'chatbot', component: ChatbotComponent },

  { path: 'admin/statistics', component: StatisticFeedbackComponent },
  { path: 'allsportteam', component: AllSportTeamComponent },
  { path: 'add-team', component: AddTeamComponent },
  { path: 'update-team/:id', component: UpdateTeamComponent },
  { path: 'details-team/:id', component: DetailsTeamComponent },
  { path: 'details-team-client/:id', component: DetailsTeamClientComponent },
  { path: 'all-reservations', component: AllReservationsComponent },
  { path: 'add-reservation', component: AddReservationComponent },
  { path: 'paimenthousing', component: TransactionhousingComponent },
  { path: 'update-reservation/:id', component: UpdateReservationComponent },
  {path: 'myItems', component:UserArticlesComponent},

  { path: 'update-reservation/:id', component: UpdateReservationComponent },
  { path: 'recommendations', component: InternshiprecommendationComponent },


  { path: 'housing-list', component: HousingListComponent },
  { path: 'housing-add', component: HousingAddComponent },
  { path: 'housing-list/housing-byId/:id', component: HousingDetailsComponent },
  
  { path: 'housing-rec', component: HousingRecComponent },
  { path: 'housing-ats-add/:housingId', component: HousingATSComponent },
  { path: 'housing-ats-list/:id', component: AtsListComponent },
  { path: 'housing-visit-list/:id', component: VisitListComponent },
  { path: 'housing-ATSdispo/:id', component: HousingAvailabilityComponent }, 
  { path: 'visit-add/:idATS/:housingId', component: AddVisitComponent }, 

  

  /* admin lezm el path yabda b kelmet admin */
  { path: 'internships', component: InternshipComponent },
  { path: 'freelances', component: FreelanceComponent },
  { path: 'internships/:id', component: InternshipDetailComponentComponent },
  { path: 'freelance/:id', component: FreelanceDetailComponentComponent },
  { path: 'admin/all', component: AllComponent },
  { path: 'admin/internship', component: InternshipAdminComponent },
  { path: 'admin/freelance', component: FreelanceAdminComponent },
  { path: 'admin/add', component: AddComponent },
  { path: 'admin/update', component: UpdateComponent },
  { path: 'admin/login', component: LoginComponent },
  {path: 'admin/charts', component: AdminChartsComponent},
  {path: 'admin/adminItems', component:ArticlesManagementComponent},
  {path: 'admin/adminActions', component:AdminActionsComponent},
  { path: 'admin/housing-Owner/:id', component: HousingOwnerComponent },
  { path: 'admin/housing-Owner-details/:id', component: HousingOwnerDetailsComponent },
  { path: 'admin/housing-update/:id', component: HousingUpdateComponent },
  { path: 'admin/events', component: EventadminComponent },
  { path: 'admin/addevent', component: AddeventComponent },
  { path: 'client/events', component: EventclientComponent },
  { path: 'admin/update-event/:eventId', component: UpdateeventComponent },






  { path: 'admin/housing-atsList/:id', component: AtsListOwnerComponent },

  {path: 'admin/all-users', component:AllUsersComponent},
  {path: 'admin/all-complaints', component:AllComplaintsComponent},
  

  { path: 'admin/banned', component: BannedUserComponent },

  { path: 'admin/transaction', component: TransactionListComponent },
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
  { path: 'admin/newInternship', component: NewInternshipComponent },
  { path: 'admin/newFreelanceJob', component: NewJobComponent },
  { path: 'admin/updateFreelanceJob/:id', component:UpdateFreelanceJobComponent },
  { path: 'admin/updateInternship/:id', component: UpdateInternshipComponent },
  { path: 'internshipRoom/:id', component: InternshipRoomComponent },
  { path: 'admin/files', component: FileComponent },
  { path: 'addFile/:id', component: InternshipDetailComponentComponent } // Remplacez InternshipDetailComponent par le composant correspondant
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
