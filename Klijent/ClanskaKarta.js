export class ClanskaKarta
{
    constructor(brojKarte, tip, clanarina, datumIzdavanja, datumVazenja)
    {
        this.brojKarte=brojKarte;
        this.tip=tip;
        
        this.datumIzdavanja = new Date(datumIzdavanja);
        this.datumIzdavanja = this.datumIzdavanja.toLocaleDateString('en-UK');
        
        this.datumVazenja = new Date(datumVazenja);
        this.datumVazenja = this.datumVazenja.toLocaleDateString('en-UK');
    }
}