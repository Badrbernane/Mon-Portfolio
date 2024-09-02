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
import { ViewProjectComponent } from './projets/view-project/view-project.component';
import { ChangeProjectComponent } from './projets/change-project/change-project.component';
import { ViewCertificatComponent } from './certificats/view-certificat/view-certificat.component';
import { ChangeCertificatComponent } from './certificats/change-certificat/change-certificat.component';
import { ViewCompetenceComponent } from './compétences/view-competence/view-competence.component';
import { ChangeCompetenceComponent } from './compétences/change-competence/change-competence.component';
import { ViewLanguesComponent } from './langues/view-langues/view-langues.component';
import { ChangeLanguesComponent } from './langues/change-langues/change-langues.component';
import { ViewInteretsComponent } from './interets/view-interets/view-interets.component';
import { ChangeInteretsComponent } from './interets/change-interets/change-interets.component';
import { AuthGuard } from './auth.guard';
import { ChangePasswordComponent } from './Personnes/change-password/change-password.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent},
    { path:"Register", component: RegisterComponent},
    { path: 'profile', component: ViewPersonComponent, canActivate: [AuthGuard]},
    { path: 'Personne', component: PersoninfoComponent},
    { path: 'modifperson', component: ModifpersonComponent },
    { path: 'Formation', component: ViewformationComponent},
    { path: 'modifformation', component: ModifformationComponent},
    { path: 'modifexp', component: ChangeExperComponent },
    { path: 'Experience', component: ViewExperiencesComponent },
    {path: 'Projet', component: ViewProjectComponent},
    {path: 'modifproject', component: ChangeProjectComponent},
    { path: 'Certificat', component: ViewCertificatComponent },
    { path: 'modifcertif', component: ChangeCertificatComponent },
    { path: 'Compétence', component: ViewCompetenceComponent },
    { path: 'modifcomp', component: ChangeCompetenceComponent},
    { path: 'Langue', component: ViewLanguesComponent},
    { path: 'modiflangue', component: ChangeLanguesComponent },
    { path: 'Intéret', component: ViewInteretsComponent },
    { path:'modifInteret', component: ChangeInteretsComponent},
    { path: 'changepassw', component: ChangePasswordComponent},
    { path: "**", component: LoginComponent},
];
