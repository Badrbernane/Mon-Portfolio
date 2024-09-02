export interface Personne {
    id: number;
    nom: string;
    prenom: string;
    age: number;
    codepostal: string;
    gmail: string;
    motdepasse: string;
    permis: string;
    description: string;
    titreposte: string;
    photo: string;
    lienfacebook: string;
    lienlinkdin: string;
    lieninstagram: string;
    lientwitter: string;
    cv: string;
    nombredexperience: number;
    datecreation: Date | null;
    datemodification: Date | null;
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

export interface projet{
    id: number;
    titre: string;
    remarque: string;
    client: string;
    lien: string;
    photo: string;
    dateprojet: Date;
    datecreation: Date;
    datemodification: Date;
    idPersonnes: number;
}

export interface certificat {
    id: number;
    nom: string;
    source: string;
    image: string;
    datecreation: Date;
    datemodification: Date;
    idPersonnes: number;
}

export interface competence{
    id: number;
    nom: string;
    datecreation: Date;
    datemodification: Date;
    date_creation: Date;
}

export interface Langue{
    langueNom: any;
    id: number;
    nom: string;
    datecreation: Date;
    datemodification: Date;
    niveau?: string;
}

export interface Interet{
centreInteretNom: any;
personneNom: any;
    id: number;
    nom: string;
    datecreation: Date;
    datemodification: Date;
    date_creation: Date;
}

export interface changePassword{
    id: number;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
