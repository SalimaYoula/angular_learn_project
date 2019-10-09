import {Candidat} from '../_models/candidat.model';
import {Entreprise} from '../_models/entreprise.model';

export class User{
    id: number;
    email: string;
    password: string;
    actif:boolean = false;
    candidat: Candidat;
    entreprise: Entreprise;

    public constructor(email,password){
        this.email =email;
        this.password =password;

    }
}

