import { Personne } from './../../models/models';
import { Component } from '@angular/core';

@Component({
  selector: 'personinfo',
  templateUrl: './personinfo.component.html',
  styleUrl: './personinfo.component.scss'
})
export class PersoninfoComponent {
    personne: Personne[] = [];
}
