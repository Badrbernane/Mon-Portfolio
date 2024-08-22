import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ViewPersonComponent } from './Personnes/view-person/view-person.component';
import { PersoninfoComponent } from './Personnes/personinfo/personinfo.component';
import { ModifpersonComponent } from './Personnes/modifperson/modifperson.component';
import { ViewformationComponent } from './formations/viewformation/viewformation.component';
import { ModifformationComponent } from './formations/modifformation/modifformation.component';
import { ChangeExperComponent } from './experiences/change-exper/change-exper.component';
import { ViewExperiencesComponent } from './experiences/view-experiences/view-experiences.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent},
    { path:"Register", component: RegisterComponent},
    { path: 'home', component: ViewPersonComponent},
    { path: 'Personne', component: PersoninfoComponent},
    { path: 'modifperson', component: ModifpersonComponent },
    { path: 'Formation', component: ViewformationComponent},
    { path: 'modifformation', component: ModifformationComponent},
    { path: 'modifexp', component: ChangeExperComponent },
    { path: 'Experience', component: ViewExperiencesComponent },
    { path: "**", component: RegisterComponent},
];
