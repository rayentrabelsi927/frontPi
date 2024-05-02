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
