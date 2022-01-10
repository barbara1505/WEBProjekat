export class Bibliotekar {
    constructor(ime, prezime, brojKnjizice, pol, smena) {
        this.ime = ime;
        this.prezime = prezime;
        this.brojKnjizice = brojKnjizice;
        this.pol = pol;
        this.smena = smena;
    }
    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML = this.brojKnjizice;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.ime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.prezime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.pol;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.smena;
        tr.appendChild(el);
    }

}