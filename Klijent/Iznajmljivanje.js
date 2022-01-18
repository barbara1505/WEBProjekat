export class Iznajmljivanje
{
    constructor(redniBroj, datumUzimanja, datumVracanja, knjiga, clan, bibliotekar)
    {
        this.redniBroj=redniBroj;

        this.datumUzimanja = new Date(datumUzimanja);
        this.datumUzimanja = this.datumUzimanja.toLocaleDateString('en-UK');

        this.datumVracanja = new Date(datumVracanja);
        //this.datumVracanja = this.datumVracanja.toLocaleDateString('en-UK');
        
        this.knjiga=knjiga;
        this.clan=clan;
        this.bibliotekar=bibliotekar;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        tr.className="RedIznajmljivanje";
        host.appendChild(tr);

        var el = document.createElement("td");
        el.classList.add("RedniBroj");
        el.classList.add("tdIznm");
        el.innerHTML = this.redniBroj;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.className="tdIznm";
        el.innerHTML = this.clan.ime +" "+this.clan.prezime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.className="tdIznm";
        el.innerHTML = this.knjiga.naslov;
        tr.appendChild(el);

        el = document.createElement("td");
        el.className="tdIznm";
        el.innerHTML = this.datumUzimanja;
        tr.appendChild(el);

        var datum=new Date();
        datum=datum.toLocaleDateString("en-UK");
        el = document.createElement("td");
        el.className="tdIznm";

        console.log(this.datumVracanja);
        
        if(this.datumVracanja.getTime()==new Date(null).getTime())
        el.innerHTML = "/";
        else
        el.innerHTML=this.datumVracanja.toLocaleDateString('en-UK');
    
        tr.appendChild(el);

        var el = document.createElement("td");
        el.className="tdIznm";
        el.innerHTML = this.bibliotekar.ime +" "+this.bibliotekar.prezime;
        tr.appendChild(el);
    }
}