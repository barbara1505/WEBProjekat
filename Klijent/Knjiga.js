export class Knjiga
{
    constructor(naslov, autor, zanr, brp, brs)
    {
        this.naslov=naslov;
        this.autor=autor;
        this.zanr=zanr;
        this.brojPrimeraka=brp;
        this.brojStrana=brs;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML = this.naslov;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.autor.ime +" "+ this.autor.prezime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.zanr;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.brojPrimeraka;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.brojStrana;
        tr.appendChild(el);
      
    }

}