export class ClanskaKarta {
    constructor(brojKarte, tip, clanarina, datumIzdavanja, datumVazenja) {
        this.brojKarte = brojKarte;
        this.tip = tip;

        this.clanarina=clanarina;

        this.datumIzdavanja = new Date(datumIzdavanja);
        this.datumIzdavanja = this.datumIzdavanja.toLocaleDateString('en-UK');

        this.datumVazenja = new Date(datumVazenja);
        this.datumVazenja = this.datumVazenja.toLocaleDateString('en-UK');
        
    }
    crtaj(host) 
    {
        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el;
        el = document.createElement("td");
        el.innerHTML = this.brojKarte;
        tr.appendChild(el);

        el = document.createElement("td");
        var tipovi=["Standardna","Djacka","Studentska","Penzionerska"];
        el.innerHTML = tipovi[this.tip];
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.clanarina;
        tr.appendChild(el);


        el = document.createElement("td");
        el.innerHTML = this.datumIzdavanja;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.datumVazenja;
        tr.appendChild(el);
    }
}