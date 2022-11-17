import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { AvailableQuestionnairesComponent } from './available-questionnaires/available-questionnaires.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'dashboard:id', component: MainComponent },
  { path: 'patients', pathMatch: 'full', component: PatientsListComponent },
  {
    path: 'questionnaire-list',
    pathMatch: 'full',
    component: AvailableQuestionnairesComponent,
  },
  {
    path: 'questionnaire/:name',
    // /:type/:name',
    pathMatch: 'full',
    component: QuestionnaireComponent,
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
