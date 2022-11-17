import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { InfoCardComponent } from './card-list/info-card/info-card.component';
import { HeaderComponent } from './header/header.component';
import { CardListComponent } from './card-list/card-list.component';
import { MenuComponent } from './header/menu/menu.component';
import { InfoCardTooltipComponent } from './card-list/info-card/info-card-tooltip/info-card-tooltip.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { QuestionnairTodoBtnComponent } from './questionnair-todo-btn/questionnair-todo-btn.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PersonalInfoPipe } from './pipes/personal-info.pipe';
import { TimeRangeComponent } from './time-range/time-range.component';
import { QuestionnairTodoBtnListComponent } from './questionnair-todo-btn-list/questionnair-todo-btn-list.component';
import { CompletedQuestionnairListComponent } from './completed-questionnair-list/completed-questionnair-list.component';
import { CompletedQuestionnaireComponent } from './completed-questionnair-list/completed-questionnair/completed-questionnair.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { MainComponent } from './main/main.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { LoginComponent } from './login/login.component';
import { AvailableQuestionnairesComponent } from './available-questionnaires/available-questionnaires.component';
import { MenuListComponent } from './header/menu/menu-list/menu-list.component';
import { MenuItemComponent } from './header/menu/menu-list/menu-item/menu-item.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoCardComponent,
    HeaderComponent,
    CardListComponent,
    MenuComponent,
    InfoCardTooltipComponent,
    SearchBarComponent,
    QuestionnairTodoBtnComponent,
    PersonalInfoComponent,
    PersonalInfoPipe,
    TimeRangeComponent,
    QuestionnairTodoBtnListComponent,
    CompletedQuestionnairListComponent,
    CompletedQuestionnaireComponent,
    QuestionnaireComponent,
    MainComponent,
    PatientsListComponent,
    LoginComponent,
    AvailableQuestionnairesComponent,
    MenuListComponent,
    MenuItemComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    MatSidenavModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
