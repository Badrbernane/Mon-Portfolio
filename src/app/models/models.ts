export interface Personne {
    id: number;
    nom: string;
    prenom: string;
    age: number;
    code_postal: string;
    gmail: string;
    mot_de_passe: string;
    permis: string;
    description: string;
    titre_poste: string;
    photo: string;
    lien_facebook: string;
    lien_linkdin: string;
    lien_instagram: string;
    lien_twitter: string;
    cv: string;
    nombre_d_experience: number;
    date_creation: Date;
    date_modification: Date;
    numTelephone: string;
}

export interface formation{
    id: number;
    titre: string;
    description: string;
    datedebut: Date;
    datefin: Date;
    ecole: string;
    actuel: boolean;
    date_creation: Date;
    date_modification: Date;
    idPersonnes: number;
}

export interface experience{
    id: number;
    entreprise: string;
    remarque: string;
    datedebut: Date;
    datefin: Date;
    datecreation: Date;
    datemodification: Date;
    idPersonnes: number;
}

export interface ConfirmDialogData {
    title: string;
    message: string;}
