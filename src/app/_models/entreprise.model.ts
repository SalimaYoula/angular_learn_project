export class Entreprise{
    nomEntreprise: string;
    siret: number;
    nbEmploye: number;
    private _profil: string;
    public constructor(nomEntreprise:string){
        this.nomEntreprise =nomEntreprise;
    }
    public get profil(): string {
        return this._profil;
    }
    public set profil(value: string) {
        this._profil = value;
    }

}