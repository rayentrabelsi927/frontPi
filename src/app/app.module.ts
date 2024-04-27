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
import { FormsModule } from '@angular/forms';
import { AllComponent } from './admin/all/all.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { InternshipComponent } from './Client/internship/internship.component';
import { HttpClientModule } from '@angular/common/http';
import { InternshipDetailComponentComponent } from './Client/internship-detail-component/internship-detail-component.component';
import { FreelanceComponent } from './Client/freelance/freelance.component';
import { FreelanceDetailComponentComponent } from './Client/freelance-detail-component/freelance-detail-component.component';
import { InternshipAdminComponent } from './admin/internship-admin/internship-admin.component';
import { NewInternshipComponent } from './admin/new-internship/new-internship.component';
import { FreelanceAdminComponent } from './admin/freelance-admin/freelance-admin.component';
import { NewJobComponent } from './admin/new-job/new-job.component';
import { UpdateInternshipComponent } from './admin/update-internship/update-internship.component';
import { UpdateFreelanceJobComponent } from './admin/update-freelance-job/update-freelance-job.component';


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
    InternshipComponent,
    InternshipDetailComponentComponent,
    FreelanceComponent,
    FreelanceDetailComponentComponent,
    InternshipAdminComponent,
    NewInternshipComponent,
    FreelanceAdminComponent,
    NewJobComponent,
    UpdateInternshipComponent,
    UpdateFreelanceJobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
