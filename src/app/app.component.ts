import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { PersonnesModule } from './Personnes/personnes.module';
import { FormationsModule } from './formations/formations.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { ProjetsModule } from './projets/projets.module';
import { CertficatModule } from './certificats/certificats.module';
import { CompétencesModule } from './compétences/compétences.module';
import { LanguesModule } from './langues/langues.module';
import { InteretsModule } from './interets/interets.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, PersonnesModule, FormationsModule, ExperiencesModule, AuthModule, ProjetsModule, CertficatModule, CompétencesModule, LanguesModule, InteretsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UI';
}
