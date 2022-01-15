export class Iznajmljivanje
{
    constructor(redniBroj, datumUzimanja, datumVracanja, knjiga, clan, bibliotekar)
    {
        this.redniBroj=redniBroj;

        this.datumUzimanja = new Date(datumUzimanja);
        this.datumUzimanja = this.datumUzimanja.toLocaleDateString('en-UK');

        this.datumVracanja = new Date(datumVracanja);
        this.datumVracanja = this.datumVracanja.toLocaleDateString('en-UK');
        
        this.knjiga=knjiga;
        this.clan=clan;
        this.bibliotekar=bibliotekar;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        tr.className="RedIznajmljivanje";
        host.appendChild(tr);

        var el = document.createElement("td");
        el.className="RedniBroj";
        el.innerHTML = this.redniBroj;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.clan.ime +" "+this.clan.prezime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.knjiga.naslov;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.datumUzimanja;
        tr.appendChild(el);

        
        var el = document.createElement("td");
        if(this.datumVracanja!=null)
        {
            el.innerHTML = this.datumVracanja;
        }
        else
            el.innerHTML="";
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.bibliotekar.ime +" "+this.bibliotekar.prezime;
        tr.appendChild(el);
    }
}