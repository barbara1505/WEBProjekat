export class Iznajmljivanje
{
    constructor(datumUzimanja, datumVracanja, knjiga, autor, bibliotekar)
    {
        this.datumUzimanja = new Date(datumUzimanja);
        this.datumUzimanja = this.datumUzimanja.toLocaleDateString('en-UK');

        this.datumVracanja = new Date(datumVracanja);
        this.datumVracanja = this.datumVracanja.toLocaleDateString('en-UK');
        
        this.knjiga=knjiga;
        this.autor=autor;
        this.bibliotekar=bibliotekar;
    }
}