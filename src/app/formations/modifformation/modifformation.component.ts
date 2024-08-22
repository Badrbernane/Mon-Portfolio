import { formation } from './../../models/models';
import { ApiService } from './../../shared/services/api.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'modifformation',
  templateUrl: './modifformation.component.html',
  styleUrl: './modifformation.component.scss'
})
export class ModifformationComponent {
    newformation: FormGroup;
    deleteformation: FormControl;

    constructor(
      fb: FormBuilder,
      private apiService: ApiService,
      private snackBar: MatSnackBar
    )
    {
      this.newformation = fb.group({
        titre: fb.control('',[Validators.required]),
        description: fb.control('',[Validators.required]),
        datedebut: fb.control('',[Validators.required]),
        datefin: fb.control('',[Validators.required]),
        ecole: fb.control('',[Validators.required]),
        date_creation: fb.control('',[Validators.required]),
        date_modification: fb.control('',[Validators.required]),
        idPersonnes: fb.control('',[Validators.required]),
        actuel:fb.control(false),
    });

    this.deleteformation = fb.control('', [Validators.required]);
    }

      

    addnewformation(){
      let formation = {
        titre: this.newformation.get("titre")?.value,
        description: this.newformation.get("description")?.value,
        datedebut: this.newformation.get("datedebut")?.value,
        datefin: this.newformation.get("datefin")?.value,
        idPersonnes: this.newformation.get("idPersonnes")?.value,
        ecole: this.newformation.get("ecole")?.value,
        actuel: this.newformation.get("actuel")?.value,
        date_creation: this.newformation.get("datedebut")?.value,
        date_modification: this.newformation.get("datefin")?.value,
      };
      console.log('Données envoyées :', formation);
      this.apiService.addnewformation(formation).subscribe(
        (res: any) => {
          console.log('Réponse du backend :', res);
          // Vérification de la réponse du backend
        if (res) {
          this.snackBar.open('Formation ajoutée avec succès', 'Fermer', { duration: 3000 });
        } else {
          console.warn('error 1')
          this.snackBar.open('Problème lors de l\'ajout de la formation', 'Fermer', { duration: 3000 });
        }
      },
      (error) => {
        console.warn('error 2')
        // Gestion des erreurs
        console.error('Erreur lors de l\'ajout de la formation:', error);
        this.snackBar.open('Erreur lors de l\'ajout de la formation', 'Fermer', { duration: 3000 });
      }
      );
    }

    deleteExistformation(){
      let id = this.deleteformation.value;
      this.apiService.deleteExistformation(id).subscribe({
      next: (res: any) => {
      console.log('Réponse du backend :', res);
      if (res === "Formation suprimmén avec succès") {
        this.snackBar.open(res, 'ok');
      }
    },
    error: (err) => {
      if (err.status === 404) {
        // Gestion du cas où la formation n'existe pas
        this.snackBar.open("La formation n'existe pas.", 'ok');
      } else {
        // Gestion des autres erreurs
        this.snackBar.open("Une erreur est survenue lors de la suppression", 'ok');
      }
    }
      });
    }  
}

