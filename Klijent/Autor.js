export class Autor
{
    constructor(ime,prezime,godRodjenja, godSmrti)
    {
        this.ime=ime;
        this.prezime=prezime;
        this.godinaRodjenja=godRodjenja;
        this.godinaSmrti=godSmrti;
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
        el.innerHTML = this.godinaRodjenja;
        tr.appendChild(el);

        el = document.createElement("td");
        if(this.godinaSmrti!==0)
        el.innerHTML = this.godinaSmrti;
        else
        el.innerHTML="/";
        tr.appendChild(el);
    }
}
