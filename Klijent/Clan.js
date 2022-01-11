export class Clan
{
    constructor(ime, prezime, adresa, telefon, karta)
    {
        this.ime=ime;
        this.prezime=prezime;
        this.adresa=adresa;
        this.telefon=telefon;
        this.karta=karta;
    }
    
    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el;
        el = document.createElement("td");
        el.innerHTML = this.ime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.prezime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.adresa;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.telefon;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.karta.brojKarte;
        tr.appendChild(el);
    }
}