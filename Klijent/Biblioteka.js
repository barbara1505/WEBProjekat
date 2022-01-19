import { Autor } from "./Autor.js";
import { Bibliotekar } from "./Bibliotekar.js";
import { Clan } from "./Clan.js";
import { Knjiga } from "./Knjiga.js";
import { ClanskaKarta } from "./ClanskaKarta.js"
import { Iznajmljivanje } from "./Iznajmljivanje.js"

export class Biblioteka {
    constructor(naziv, listaAutora, listaBibliotekara, listaKnjiga, listaClanova, listaKarte, listaIznajmljivanja) {
        this.naziv = naziv;
        this.listaAutora = listaAutora;
        this.listaBibliotekara = listaBibliotekara;
        this.listaKnjiga = listaKnjiga;
        this.listaClanova = listaClanova;
        this.listaKarte = listaKarte;
        this.listaIznajmljivanja = listaIznajmljivanja;

        this.container = null;
    }

    crtaj(host) {
        this.container = document.createElement("div");
        this.container.className = "Kontejner";
        host.appendChild(this.container);

        let zaglavlje = document.createElement("div");
        zaglavlje.className = "zaglavljeStil";
        this.container.appendChild(zaglavlje);

        let naslov = document.createElement("h2");
        naslov.className = "naslovStil";
        naslov.innerHTML = this.naziv;
        zaglavlje.appendChild(naslov);

        let glavnaForma = document.createElement("div");
        glavnaForma.className = "glavnaForma";
        this.container.appendChild(glavnaForma);

        let leviProzor = document.createElement("div");
        leviProzor.className = "leviProzor";
        glavnaForma.appendChild(leviProzor);

        let desniProzor = document.createElement("div");
        desniProzor.className = "desniProzor";
        glavnaForma.appendChild(desniProzor);

        let dugmelab = ["Bibliotekari", "Knjige", "Autori", "Clanovi", "Clanske karte"];
        var dugmeniz = [];
        let glavniMeni = document.createElement("div");
        glavniMeni.className = "glavniMeni";
        leviProzor.appendChild(glavniMeni);

        dugmelab.forEach(dugme => {
            var btn = document.createElement("button");
            btn.innerHTML = dugme;
            btn.className = "dugme";
            dugmeniz.push(btn);
            glavniMeni.appendChild(btn);
        });

        let levaForma = document.createElement("div");
        levaForma.className = "levaForma";
        leviProzor.appendChild(levaForma);

        dugmeniz[0].onclick = (ev) => this.prikaziBibliotekare(levaForma);
        dugmeniz[1].onclick = (ev) => this.prikaziKnjige(levaForma);
        dugmeniz[2].onclick = (ev) => this.prikaziAutore(levaForma);
        dugmeniz[3].onclick = (ev) => this.prikaziClanove(levaForma);
        dugmeniz[4].onclick = (ev) => this.prikaziClanskeKarte(levaForma);

        this.crtajIznajmljivanja(desniProzor);
    }
    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

    }

    crtajHeader(host, tekst) {
        var h = document.createElement("h2");
        h.className = "headerStil";
        h.innerHTML = tekst;
        host.appendChild(h);
    }
    //#region bibliotekar
    prikaziBibliotekare(host) {

        this.removeAllChildNodes(host);

        this.listaBibliotekara = [];

        fetch("https://localhost:5001/Bibliotekar/Svi_bibliotekari")
            .then(p => {
                p.json().then(bibliotekari => {
                    bibliotekari.forEach(B => {
                        var radnik = new Bibliotekar(B.ime, B.prezime, B.brojKnjizice, B.pol, B.smena);
                        this.listaBibliotekara.push(radnik);
                    });

                    let forma = document.createElement("div");
                    forma.className = "zaPrikaz";
                    host.appendChild(forma);

                    this.crtajHeader(forma, "Lista bibliotekara");

                    var bibliotekariTabela = document.createElement("table");
                    bibliotekariTabela.className = "tabelaBibliotekari";
                    forma.append(bibliotekariTabela);

                    var tabelaheader = document.createElement("thead");
                    bibliotekariTabela.appendChild(tabelaheader);

                    var tr = document.createElement("tr");
                    tabelaheader.appendChild(tr);

                    let th;
                    var zaglavlje = ["Broj knjizice", "Ime", "Prezime", "Pol", "Smena"];
                    zaglavlje.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })
                    var tabelabody = document.createElement("tbody");
                    tabelabody.className = "bibliotekariPodaci";
                    bibliotekariTabela.appendChild(tabelabody);

                    this.listaBibliotekara.forEach(B => {
                        B.crtaj(bibliotekariTabela);
                    })


                    let FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.crtajHeader(FormaKontrole, "Uredi");

                    this.crtajKontroleBibliotekar(FormaKontrole);
                })
            });
    }
    crtajKontroleBibliotekar(host) {
        this.removeAllChildNodes(host);

        var dugmelab = ["Zaposli bibliotekara", "Otpusti bibliotekara"];
        var dugmeniz = [];

        dugmelab.forEach(d => {
            var btn = document.createElement("button");
            btn.innerHTML = d;
            btn.className = "dugmiciKontrole";
            dugmeniz.push(btn);
            host.appendChild(btn);
        })

        dugmeniz[0].onclick = (ev) => this.crtajDijalogZaposli(host);
        dugmeniz[1].onclick = (ev) => this.crtajDijalogOtpusti(host);
    }

    crtajDijalogZaposli(host) {

        this.removeAllChildNodes(host);

        this.crtajHeader(host, "Zaposli bibliotekara");

        var i = 0;
        var polja = ["Broj knjizice", "Ime", "Prezime", "Pol", "Smena"];

        var brojKnjizice, ime, prezime, pol, smena;
        var divniz = [brojKnjizice, ime, prezime, pol, smena];

        var lblBrojKnjizice, lblIme, lblPrezime, lblPol, lblSmena;
        var labeleTekst = ["Broj knjizice:", "Ime:", "Prezime:", "Pol:", "Smena:"];
        var labele = [lblBrojKnjizice, lblIme, lblPrezime, lblPol, lblSmena];

        var inputBrojKnjizice, inputIme, inputPrezime, inputPol, inputSmena
        var inputs = [inputBrojKnjizice, inputIme, inputPrezime, inputPol, inputSmena];

        var poljeKontrole = document.createElement("div");
        poljeKontrole.className = "bibliotekarKontrole";
        host.appendChild(poljeKontrole);

        polja.forEach(D => {

            divniz[i] = document.createElement("div");
            divniz[i].className = "bibliotekarKontrole";
            poljeKontrole.appendChild(divniz[i]);

            labele[i] = document.createElement("label");
            labele[i].className = "labeleKontrole";
            labele[i].innerHTML = labeleTekst[i];
            divniz[i].appendChild(labele[i]);

            if (i === 4) {

                inputs[i] = document.createElement("select");
                inputs[i].className = "labeleKontrole";

                let smena = ["Prepodne", "Popodne"];

                let opcija;
                var j = 0;

                smena.forEach(s => {

                    opcija = document.createElement("option");
                    opcija.innerHTML = s;
                    opcija.value = j++;
                    inputs[i].appendChild(opcija);
                })

                divniz[i].appendChild(inputs[i]);

            }
            else {
                inputs[i] = document.createElement("input");
                inputs[i].setAttribute("type", "text");
                inputs[i].className = "InputKontrole";
                divniz[i].appendChild(inputs[i]);
            }

            i++;
        })

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Zaposli, Odustani;
        var Dugmici = [Zaposli, Odustani];
        var DugmiciLabele = ["Zaposli", "Odustani"];
        var DugmiciKlase = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = DugmiciKlase[i];
            Btns.appendChild(Dugmici[i]);

            i++;
        })
        Dugmici[0].onclick = (ev) => {
            if (inputs[0].value < 10000 || inputs[0].value > 99999)
                alert("Pogresna vrednost za broj radne knjizice!");

            if (inputs[1].value == "")
                alert("Morate uneti ime!");

            if (inputs[2].value == "")
                alert("Morate uneti prezime!");

            if (inputs[3].value == "")
                alert("Morate uneti ime!");

            this.dodajBibliotekara(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
        }

        Dugmici[1].onclick = (ev) => this.crtajKontroleBibliotekar(host);
    }

    dodajBibliotekara(brojKnjizice, Ime, Prezime, Pol, Smena) {

        fetch("https://localhost:5001/Bibliotekar/Zaposli_bibliotekara/" + brojKnjizice + "/" + Ime + "/" + Prezime + "/" + Pol + "/" + Smena,
            {
                method: 'POST',
                body: JSON.stringify({
                    "brojKnjizice": brojKnjizice,
                    "ime": Ime,
                    "prezime": Prezime,
                    "pol": Pol,
                    "smena": Smena
                })
            }).then(Response => {

                let levaforma = this.container.querySelector(".levaForma");
                this.prikaziBibliotekare(levaforma);
            });
    }

    crtajDijalogOtpusti(host) {
        this.removeAllChildNodes(host);

        this.crtajHeader(host, "Otpusti bibliotekara:");

        var poljeKontrole = document.createElement("div");
        poljeKontrole.className = "bibliotekarKontrole";
        host.appendChild(poljeKontrole);


        var brojKnjizice = document.createElement("div");
        brojKnjizice.className = "bibliotekarKontrole";
        poljeKontrole.appendChild(brojKnjizice);

        var lblbrKnjizice = document.createElement("label");
        lblbrKnjizice.className = "labeleKontrole";
        lblbrKnjizice.innerHTML = "Broj knjizice:";
        brojKnjizice.appendChild(lblbrKnjizice);

        var inputKnjizica = document.createElement("input");
        inputKnjizica.setAttribute("type", "text");
        inputKnjizica.className = "InputKontrole";
        brojKnjizice.appendChild(inputKnjizica);

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Obrisi = document.createElement("button");
        Obrisi.innerHTML = "Otpusti";
        Obrisi.className = "Dodaj";
        Btns.appendChild(Obrisi);

        Obrisi.onclick = (ev) => {
            if (inputKnjizica.value < 10000 || inputKnjizica.value > 99999)
                alert("Pogresna vrednost za broj radne knjizice");

            this.obrisiBibliotekara(host, inputKnjizica.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = "Odustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.crtajKontroleBibliotekar(host);
    }

    obrisiBibliotekara(host, brojKnjizice) {
        this.removeAllChildNodes(host);

        this.crtajHeader(host, "Otpusti bibliotekara");

        fetch("https://localhost:5001/Bibliotekar/Otpusti_bibliotekara/" + brojKnjizice, {
            method: 'DELETE',
            body: JSON.stringify({
                "brojKnjizice": brojKnjizice
            })
        }).then(Response => {

            let levaforma = this.container.querySelector(".levaForma");
            this.prikaziBibliotekare(levaforma);
        });
    }
    //#endregion

    //#region knjiga
    prikaziKnjige(host) {
        this.removeAllChildNodes(host);

        this.listaKnjiga = [];

        fetch("https://localhost:5001/Knjiga/Sve_knjige")
            .then(p => {
                p.json().then(knjige => {
                    knjige.forEach(K => {
                        var knjiga = new Knjiga(K.naslov, K.autor, K.zanr, K.brojPrimeraka, K.brojStrana);
                        this.listaKnjiga.push(knjiga);
                    });

                    let forma = document.createElement("div");
                    forma.className = "zaPrikaz";
                    host.appendChild(forma);

                    this.crtajHeader(forma, "Lista knjiga");

                    var knjigeTabela = document.createElement("table");
                    knjigeTabela.className = "tabelaKnjige";
                    forma.append(knjigeTabela);

                    var tabelaheader = document.createElement("thead");
                    knjigeTabela.appendChild(tabelaheader);

                    var tr = document.createElement("tr");
                    tabelaheader.appendChild(tr);

                    let th;
                    var zaglavlje = ["Naslov", "Autor", "Zanr", "Broj primeraka", "Broj strana"];
                    zaglavlje.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })
                    var tabelabody = document.createElement("tbody");
                    tabelabody.className = "knjigePodaci";
                    knjigeTabela.appendChild(tabelabody);

                    this.listaKnjiga.forEach(K => {
                        K.crtaj(knjigeTabela);
                    })


                    let FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.crtajKontroleKnjiga(FormaKontrole);
                })
            });
    }
    crtajKontroleKnjiga(host) {
        this.removeAllChildNodes(host);

        var dugmelab = ["Dodaj knjigu", "Prikazi knjige odabranog zanra"];
        var dugmeniz = [];

        dugmelab.forEach(d => {
            var btn = document.createElement("button");
            btn.innerHTML = d;
            btn.className = "dugmiciKontrole";
            dugmeniz.push(btn);
            host.appendChild(btn);
        })

        dugmeniz[0].onclick = (ev) => this.crtajDijalogDodajKnjigu(host);
        dugmeniz[1].onclick = (ev) => this.crtajDijalogPrikaziKnjigeZanr(host);
    }

    crtajDijalogDodajKnjigu(host) {

        this.removeAllChildNodes(host);

        this.crtajHeader(host, "Dodaj knjigu");

        var i = 0;
        var polja = ["Naslov", "Ime autora", "Prezime autora", "Zanr", "Broj primeraka", "Broj strana"];

        var naslov, ime, prezime, zanr, brp, brs;
        var divniz = [naslov, ime, prezime, zanr, brp, brs];

        var lbnaslov, lbime, lbprezime, lbzanr, lbbrp, lbbrs;
        var labeleTekst = ["Naslov:", "Ime autora:", "Prezime autora:", "Zanr:", "Broj primeraka:", "Broj strana:"];
        var labele = [lbnaslov, lbime, lbprezime, lbzanr, lbbrp, lbbrs];

        var inpnaslov, inpime, inpprezime, inpzanr, inpbrp, inpbrs;
        var inputs = [inpnaslov, inpime, inpprezime, inpzanr, inpbrp, inpbrs];

        var poljeKontrole = document.createElement("div");
        poljeKontrole.className = "knjigeKontrole";
        host.appendChild(poljeKontrole);

        polja.forEach(D => {

            divniz[i] = document.createElement("div");
            divniz[i].className = "knjigeKontrole";
            poljeKontrole.appendChild(divniz[i]);

            labele[i] = document.createElement("label");
            labele[i].className = "labeleKontrole";
            labele[i].innerHTML = labeleTekst[i];
            divniz[i].appendChild(labele[i]);

            if (i === 3) {

                inputs[i] = document.createElement("select");
                inputs[i].className = "labeleKontrole";

                let smena = ["Za decu", "Lektira", "Price", "Poezija", "Roman"];

                let opcija;
                var j = 0;

                smena.forEach(s => {

                    opcija = document.createElement("option");
                    opcija.innerHTML = s;
                    opcija.value = j++;
                    inputs[i].appendChild(opcija);
                })

                divniz[i].appendChild(inputs[i]);

            }
            else {
                inputs[i] = document.createElement("input");
                inputs[i].setAttribute("type", "text");
                inputs[i].className = "InputKontrole";
                divniz[i].appendChild(inputs[i]);
            }

            i++;
        })

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];
        var DugmiciKlase = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = DugmiciKlase[i];
            Btns.appendChild(Dugmici[i]);

            i++;
        })
        Dugmici[0].onclick = (ev) => {

            if (inputs[0].value == "")
                alert("Morate uneti naslov knjige!");

            if (inputs[1].value == "")
                alert("Morate uneti ime autora!");

            if (inputs[2].value == "")
                alert("Morate uneti prezime autora!");

            this.dodajKnjigu(inputs[0].value, inputs[3].value, inputs[4].value, inputs[5].value, inputs[1].value, inputs[2].value);
        }

        Dugmici[1].onclick = (ev) => this.crtajKontroleKnjiga(host);
    }

    dodajKnjigu(naslov, zanr, brp, brs, ime, prezime) {

        fetch("https://localhost:5001/Knjiga/Dodaj_knjigu/" + naslov + "/" + brp + "/" + brs + "/" + zanr + "/" + ime + "/" + prezime,
            {
                method: 'POST',
                body: JSON.stringify({
                    "Naslov": naslov,
                    "BrojPrimeraka": brp,
                    "BrojStrana": brs,
                    "Zanr": zanr,
                    "imeAutora": ime,
                    "prezimeAutora": prezime
                })
            }).then(Response => {

                let levaforma = this.container.querySelector(".levaForma");
                this.prikaziKnjige(levaforma);
            });
    }

    crtajDijalogPrikaziKnjigeZanr(host) {
        this.removeAllChildNodes(host);

        this.crtajHeader(host, "Prikazi knjige odabranog zanra");

        var poljeKontrole = document.createElement("div");
        poljeKontrole.className = "knjigaKontrole";
        host.appendChild(poljeKontrole);


        var zanr = document.createElement("div");
        zanr.className = "knjigaKontrole";
        poljeKontrole.appendChild(zanr);

        var lblzanr = document.createElement("label");
        lblzanr.className = "labeleKontrole";
        lblzanr.innerHTML = "Zanr:";
        zanr.appendChild(lblzanr);

        var input = document.createElement("select");
        input.className = "labeleKontrole";

        let tip = ["Za decu", "Lektira", "Price", "Poezija", "Roman"];

        let opcija;
        var j = 0;

        tip.forEach(s => {

            opcija = document.createElement("option");
            opcija.innerHTML = s;
            opcija.value = j++;
            input.appendChild(opcija);
        })

        zanr.appendChild(input);

        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var prikazi = document.createElement("button");
        prikazi.innerHTML = "Prikazi";
        prikazi.className = "Dodaj";
        Btns.appendChild(prikazi);

        prikazi.onclick = (ev) => {
            this.prikaziKnjigeZanr(host, input.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = "Odustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.crtajKontroleKnjiga(host);
    }

    prikaziKnjigeZanr(host, zanr) {

        this.removeAllChildNodes(host);

        this.listaKnjiga = [];

        fetch("https://localhost:5001/Knjiga/Prikazi_knjige_odabranog_zanra/" + zanr)
            .then(p => {
                p.json().then(knjige => {
                    knjige.forEach(K => {
                        console.log(K);
                        var knjiga = new Knjiga(K.naslov, K.autor, K.zanr, K.brojPrimeraka, K.brojStrana);
                        this.listaKnjiga.push(knjiga);
                    });

                    let forma = document.createElement("div");
                    forma.className = "zaPrikaz";
                    host.appendChild(forma);

                    this.crtajHeader(forma, "Lista knjiga");

                    var knjigeTabela = document.createElement("table");
                    knjigeTabela.className = "tabelaKnjige";
                    forma.append(knjigeTabela);

                    var tabelaheader = document.createElement("thead");
                    knjigeTabela.appendChild(tabelaheader);

                    var tr = document.createElement("tr");
                    tabelaheader.appendChild(tr);

                    let th;
                    var zaglavlje = ["Naslov", "Autor", "Zanr", "Broj primeraka", "Broj strana"];
                    zaglavlje.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })
                    var tabelabody = document.createElement("tbody");
                    tabelabody.className = "knjigePodaci";
                    knjigeTabela.appendChild(tabelabody);

                    this.listaKnjiga.forEach(K => {
                        K.crtaj(knjigeTabela);
                    })
                });
            }
            )
    }
    //#endregion

    //#region Autor

    prikaziAutore(host) {
        this.removeAllChildNodes(host);

        this.listaAutora = [];

        fetch("https://localhost:5001/Autor/Svi_autori")
            .then(p => {
                p.json().then(autori => {
                    autori.forEach(A => {
                        var autor = new Autor(A.ime, A.prezime, A.godinaRodjenja, A.godinaSmrti);
                        this.listaAutora.push(autor);
                    });

                    let forma = document.createElement("div");
                    forma.className = "zaPrikaz";
                    host.appendChild(forma);

                    this.crtajHeader(forma, "Lista autora");

                    var autoriTabela = document.createElement("table");
                    autoriTabela.className = "tabelaAutori";
                    forma.append(autoriTabela);

                    var tabelaheader = document.createElement("thead");
                    autoriTabela.appendChild(tabelaheader);

                    var tr = document.createElement("tr");
                    tabelaheader.appendChild(tr);

                    let th;
                    var zaglavlje = ["Ime", "Prezime", "Godina rodjenja", "Godina smrti"];
                    zaglavlje.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })
                    var tabelabody = document.createElement("tbody");
                    tabelabody.className = "autoriPodaci";
                    autoriTabela.appendChild(tabelabody);

                    this.listaAutora.forEach(A => {
                        A.crtaj(autoriTabela);
                    })

                    let FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.crtajKontroleAutor(FormaKontrole);
                })
            });
    }
    crtajKontroleAutor(host) {
        this.removeAllChildNodes(host);

        var rblab = ["Dodaj autora", "Dodaj knjigu autoru", "Prikazi sve knjige autora"];
        var rbniz = [];
        var i = 1;

        var novidiv;


        rblab.forEach(d => {

            novidiv = document.createElement("div");
            novidiv.className = "rbStil";

            var rblbl = document.createElement("label");
            rblbl.innerHTML = d;
            novidiv.appendChild(rblbl);

            var rb = document.createElement("input");
            rb.type = "radio";
            rb.value = i++;
            rb.name = "rbName";

            novidiv.appendChild(rb);

            rbniz.push(rb);
            host.appendChild(novidiv);
        })

        rbniz[0].onclick = (ev) => this.crtajDijalogDodajAutora(host);
        rbniz[1].onclick = (ev) => this.crtajDijalogDodajKnjiguAutoru(host);
        rbniz[2].onclick = (ev) => this.crtajDijalogPrikaziKnjigeAutora(host);
    }

    crtajDijalogDodajKnjiguAutoru(host) {
        this.removeAllChildNodes(host);
        this.crtajHeader(host, "Dodaj knjigu autoru");

        var i = 0;
        var polja = ["Ime", "Prezime", "Knjiga"];

        var ime, prezime, knjiga;
        var divniz = [ime, prezime, knjiga];

        var lbime, lbprezime, lbknjiga;
        var labeleTekst = ["Ime:", "Prezime:", "Knjiga:"];
        var labele = [lbime, lbprezime, lbknjiga];

        var inpime, inpprezime, inpknjiga
        var inputs = [inpime, inpprezime, inpknjiga];

        var poljeKontrole = document.createElement("div");
        host.appendChild(poljeKontrole);

        polja.forEach(D => {

            divniz[i] = document.createElement("div");
            poljeKontrole.appendChild(divniz[i]);

            labele[i] = document.createElement("label");
            labele[i].className = "labeleKontrole";
            labele[i].innerHTML = labeleTekst[i];
            divniz[i].appendChild(labele[i]);

            inputs[i] = document.createElement("input");
            inputs[i].setAttribute("type", "text");
            inputs[i].className = "InputKontrole";
            divniz[i].appendChild(inputs[i]);

            i++;

        })
        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];
        var DugmiciKlase = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = DugmiciKlase[i];
            Btns.appendChild(Dugmici[i]);

            i++;
        })
        Dugmici[0].onclick = (ev) => {
            if (inputs[0].value == "")
                alert("Morate uneti ime autora");

            if (inputs[1].value == "")
                alert("Morate uneti prezime autora");

            if (inputs[2].value == "")
                alert("Morate uneti naslov knjige");

            this.dodajKnjiguAutoru(inputs[0].value, inputs[1].value, inputs[2].value);
        }
        Dugmici[1].onclick = (ev) => this.crtajKontroleAutor(host);

    }
    dodajKnjiguAutoru(ime, prezime, naslov) {
        fetch("https://localhost:5001/Autor/Dodaj_Knjigu_Autoru/" + ime + "/" + prezime + "/" + naslov,
            {
                method: 'PUT',
                body: JSON.stringify({
                    "Ime": ime,
                    "Prezime": prezime,
                    "Naslov": naslov,

                })
            }).then(Response => {

                console.log("Uspesno dodata knjiga");

            });
    }

    crtajDijalogDodajAutora(host) {
        this.removeAllChildNodes(host);
        this.crtajHeader(host, "Dodaj autora");

        var i = 0;
        var polja = ["Ime", "Prezime", "Godina rodjenja", "Godina smrti"];

        var ime, prezime, godR, godS;
        var divniz = [ime, prezime, godR, godS];

        var lbime, lbprezime, lbgodR, lbgodS;
        var labeleTekst = ["Ime:", "Prezime:", "Godina rodjenja:", "Godina smrti:"];
        var labele = [lbime, lbprezime, lbgodR, lbgodS];

        var inpime, inpprezime, inpgodR, inpgodS;
        var inputs = [inpime, inpprezime, inpgodR, inpgodS];

        var poljeKontrole = document.createElement("div");
        host.appendChild(poljeKontrole);

        polja.forEach(D => {

            divniz[i] = document.createElement("div");
            poljeKontrole.appendChild(divniz[i]);

            labele[i] = document.createElement("label");
            labele[i].className = "labeleKontrole";
            labele[i].innerHTML = labeleTekst[i];
            divniz[i].appendChild(labele[i]);

            inputs[i] = document.createElement("input");
            inputs[i].setAttribute("type", "text");
            inputs[i].className = "InputKontrole";
            divniz[i].appendChild(inputs[i]);

            i++;

        })
        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];
        var DugmiciKlase = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = DugmiciKlase[i];
            Btns.appendChild(Dugmici[i]);

            i++;
        })
        Dugmici[0].onclick = (ev) => {
            if (inputs[0].value == "")
                alert("Morate uneti ime autora");

            if (inputs[1].value == "")
                alert("Morate uneti prezime autora");
            this.dodajAutora(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
        }
        Dugmici[1].onclick = (ev) => this.crtajKontroleAutor(host);
    }
    dodajAutora(ime, prezime, godinaRodjenja, godinaSmrti) {

        fetch("https://localhost:5001/Autor/Dodaj_Autora/" + ime + "/" + prezime + "/" + godinaRodjenja + "/" + godinaSmrti,
            {
                method: 'POST',
                body: JSON.stringify({
                    "ime": ime,
                    "prezime": prezime,
                    "godina_rodjenja": godinaRodjenja,
                    "godina_smrti": godinaSmrti,
                })
            }).then(Response => {

                let levaforma = this.container.querySelector(".levaForma");
                this.prikaziAutore(levaforma);
            });
    }

    crtajDijalogPrikaziKnjigeAutora(host) {
        this.removeAllChildNodes(host);
        this.crtajHeader(host, "Odaberite autora");

        var i = 0;
        var polja = ["Ime", "Prezime"];

        var ime, prezime;
        var divniz = [ime, prezime];

        var lbime, lbprezime;
        var labeleTekst = ["Ime:", "Prezime:"];
        var labele = [lbime, lbprezime];

        var inpime, inpprezime;
        var inputs = [inpime, inpprezime];

        var poljeKontrole = document.createElement("div");
        host.appendChild(poljeKontrole);

        polja.forEach(D => {

            divniz[i] = document.createElement("div");
            poljeKontrole.appendChild(divniz[i]);

            labele[i] = document.createElement("label");
            labele[i].className = "labeleKontrole";
            labele[i].innerHTML = labeleTekst[i];
            divniz[i].appendChild(labele[i]);

            inputs[i] = document.createElement("input");
            inputs[i].setAttribute("type", "text");
            inputs[i].className = "InputKontrole";
            divniz[i].appendChild(inputs[i]);
            i++;
        })
        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Primeni, Odustani;
        var Dugmici = [Primeni, Odustani];
        var DugmiciLabele = ["Primeni", "Odustani"];
        var DugmiciKlase = ["Dodaj", "Odustani"];

        var i = 0;
        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = DugmiciKlase[i];
            Btns.appendChild(Dugmici[i]);
            i++;
        })
        Dugmici[0].onclick = (ev) => {
            if (inputs[0].value == "")
                alert("Morate uneti ime autora");

            if (inputs[1].value == "")
                alert("Morate uneti prezime autora");

            this.prikaziKnjigeAutora(host, inputs[0].value, inputs[1].value);
        }
        Dugmici[1].onclick = (ev) => this.crtajKontroleAutor(host);
    }
    prikaziKnjigeAutora(host, ime, prezime) {
        this.removeAllChildNodes(host);

        this.listaKnjiga = [];

        fetch("https://localhost:5001/Autor/Knjige_Autora/" + ime + "/" + prezime)
            .then(p => {
                p.json().then(knjige => {
                    knjige.forEach(K => {
                        console.log(K);
                        var knjiga = new Knjiga(K.naslov, K.autor, K.zanr, K.brojPrimeraka, K.brojStrana);
                        this.listaKnjiga.push(knjiga);
                    });

                    let forma = document.createElement("div");
                    forma.className = "zaPrikaz";
                    host.appendChild(forma);

                    this.crtajHeader(forma, "Lista knjiga odabranog autora");

                    var knjigeTabela = document.createElement("table");
                    knjigeTabela.className = "tabelaKnjige";
                    forma.append(knjigeTabela);

                    var tabelaheader = document.createElement("thead");
                    knjigeTabela.appendChild(tabelaheader);

                    var tr = document.createElement("tr");
                    tabelaheader.appendChild(tr);

                    let th;
                    var zaglavlje = ["Naslov", "Autor", "Zanr", "Broj primeraka", "Broj strana"];
                    zaglavlje.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })
                    var tabelabody = document.createElement("tbody");
                    tabelabody.className = "knjigePodaci";
                    knjigeTabela.appendChild(tabelabody);

                    this.listaKnjiga.forEach(K => {
                        K.crtaj(knjigeTabela);
                    })
                });
            }
            )
    }
    //#endregion

    //#region Clan

    prikaziClanove(host) {
        this.removeAllChildNodes(host);

        this.listaClanova = [];

        fetch("https://localhost:5001/Clan/Svi_clanovi")
            .then(p => {
                p.json().then(clanovi => {
                    clanovi.forEach(A => {
                        var clan = new Clan(A.ime, A.prezime, A.adresa, A.telefon, A.clanskaKarta);
                        this.listaClanova.push(clan);
                    });

                    let forma = document.createElement("div");
                    forma.className = "zaPrikaz";
                    host.appendChild(forma);

                    this.crtajHeader(forma, "Lista clanova");

                    var clanoviTabela = document.createElement("table");
                    clanoviTabela.className = "tabelaClanovi";
                    forma.append(clanoviTabela);

                    var tabelaheader = document.createElement("thead");
                    clanoviTabela.appendChild(tabelaheader);

                    var tr = document.createElement("tr");
                    tabelaheader.appendChild(tr);

                    let th;
                    var zaglavlje = ["Ime", "Prezime", "Adresa", "Broj telefona", "Broj clanske karte"];
                    zaglavlje.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })
                    var tabelabody = document.createElement("tbody");
                    tabelabody.className = "clanoviPodaci";
                    clanoviTabela.appendChild(tabelabody);

                    this.listaClanova.forEach(A => {
                        A.crtaj(clanoviTabela);
                    })

                    let FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "FormaKontrole";
                    host.appendChild(FormaKontrole);

                    this.crtajKontroleClan(FormaKontrole);
                })
            });
    }
    crtajKontroleClan(host) {
        this.removeAllChildNodes(host);

        var rblab = ["Dodaj clana", "Ukloni clana", "Izmeni podatke o clanu"];
        var rbniz = [];
        var i = 1;

        var novidiv;

        rblab.forEach(d => {

            novidiv = document.createElement("div");
            novidiv.className = "rbStil";

            var rblbl = document.createElement("label");
            rblbl.innerHTML = d;
            novidiv.appendChild(rblbl);

            var rb = document.createElement("input");
            rb.type = "radio";
            rb.value = i++;
            rb.name = "rbName";

            novidiv.appendChild(rb);

            rbniz.push(rb);
            host.appendChild(novidiv);
        })

        rbniz[0].onclick = (ev) => this.crtajDijalogDodajClana(host);
        rbniz[1].onclick = (ev) => this.crtajDijalogUkloniClana(host);
        rbniz[2].onclick = (ev) => this.crtajDijalogIzmeniClana(host);
    }

    crtajDijalogDodajClana(host) {
        this.removeAllChildNodes(host);
        this.crtajHeader(host, "Dodaj clana");

        var i = 0;
        var polja = ["Ime", "Prezime", "Adresa", "Telefon", "Broj clanske karte"];

        var ime, prezime, adr, tel, brk;
        var divniz = [ime, prezime, adr, tel, brk];

        var lbime, lbprezime, lbadr, lbtel, lbbrk;
        var labeleTekst = ["Ime:", "Prezime:", "Adresa:", "Telefon:", "Broj clanske karte:"];
        var labele = [lbime, lbprezime, lbadr, lbtel, lbbrk];

        var inpime, inpprezime, inpadr, inptel, inpbrk;
        var inputs = [inpime, inpprezime, inpadr, inptel, inpbrk];

        var poljeKontrole = document.createElement("div");
        host.appendChild(poljeKontrole);

        polja.forEach(D => {

            divniz[i] = document.createElement("div");
            poljeKontrole.appendChild(divniz[i]);

            labele[i] = document.createElement("label");
            labele[i].className = "labeleKontrole";
            labele[i].innerHTML = labeleTekst[i];
            divniz[i].appendChild(labele[i]);

            inputs[i] = document.createElement("input");
            inputs[i].setAttribute("type", "text");
            inputs[i].className = "InputKontrole";
            divniz[i].appendChild(inputs[i]);

            i++;

        })
        var Btns = document.createElement("div");
        Btns.className = "Meni";
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];
        var DugmiciKlase = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = DugmiciKlase[i];
            Btns.appendChild(Dugmici[i]);

            i++;
        })
        Dugmici[0].onclick = (ev) => {
            if (inputs[0].value == "")
                alert("Morate uneti ime clana");

            if (inputs[1].value == "")
                alert("Morate uneti prezime clana");

            if (inputs[2].value == "")
                alert("Morate uneti adresu");

            this.dodajClana(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value);
        }
        Dugmici[1].onclick = (ev) => this.crtajKontroleClan(host);
    }
    dodajClana(Ime, Prezime, Adresa, Telefon, brojkarte) {
        fetch("https://localhost:5001/Clan/Upisi_clana/" + Ime + "/" + Prezime + "/" + Adresa + "/" + Telefon + "/" + brojkarte,
            {
                method: 'POST',
                body: JSON.stringify({
                    "Ime": Ime,
                    "Prezime": Prezime,
                    "Adresa": Adresa,
                    "Telefon": Telefon,
                    "brojKarte": brojkarte
                })
            }).then(Response => {

                let levaforma = this.container.querySelector(".levaForma");
                this.prikaziClanove(levaforma);
            });
    }

    crtajDijalogUkloniClana(host) {
        this.removeAllChildNodes(host);

        this.crtajHeader(host, "Ukloni clana");

        var poljeKontrole = document.createElement("div");
        host.appendChild(poljeKontrole);

        var divime = document.createElement("div");
        var divprezime = document.createElement("div");
        poljeKontrole.appendChild(divime);
        poljeKontrole.appendChild(divprezime);

        var lbime = document.createElement("label");
        var lbprezime = document.createElement("label");
        lbime.className = "labeleKontrole";
        lbprezime.className = "labeleKontrole";
        lbime.innerHTML = "Ime:";
        lbprezime.innerHTML = "Prezime:";

        divime.appendChild(lbime);
        divprezime.appendChild(lbprezime);

        var inputIme = document.createElement("input");
        var inputPrezime = document.createElement("input");
        inputIme.setAttribute("type", "text");
        inputPrezime.setAttribute("type", "text");
        inputIme.className = "InputKontrole";
        inputPrezime.className = "InputKontrole";
        divime.appendChild(inputIme);
        divprezime.appendChild(inputPrezime);


        var Btns = document.createElement("div");
        host.appendChild(Btns);

        var Obrisi = document.createElement("button");
        Obrisi.innerHTML = "Ukloni";
        Obrisi.className = "Dodaj";
        Btns.appendChild(Obrisi);

        Obrisi.onclick = (ev) => {

            if (inputIme.value == "")
                alert("Morate uneti ime clana");

            if (inputPrezime.value == "")
                alert("Morate uneti prezime clana");
            this.ukloniClana(host, inputIme.value, inputPrezime.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = "Odustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.crtajKontroleClan(host);
    }

    ukloniClana(host, Ime, Prezime) {
        this.removeAllChildNodes(host);

        fetch("https://localhost:5001/Clan/Ukloni_clana/" + Ime + "/" + Prezime,
            {
                method: 'DELETE',
                body: JSON.stringify({
                    "Ime": Ime,
                    "Prezime": Prezime
                })
            }).then(Response => {

                let levaforma = this.container.querySelector(".levaForma");
                this.prikaziClanove(levaforma);
            });
    }

    crtajDijalogIzmeniClana(host) {
        this.removeAllChildNodes(host);

        this.crtajHeader(host, "Izmeni podatke o clanu:");

        var poljeKontrole = document.createElement("div");
        host.appendChild(poljeKontrole);

        var ime = document.createElement("div");
        poljeKontrole.appendChild(ime);

        var prezime = document.createElement("div");
        poljeKontrole.appendChild(prezime);

        var br = document.createElement("div");
        poljeKontrole.appendChild(br);

        var lbime = document.createElement("label");
        lbime.className = "labeleKontrole";
        lbime.innerHTML = "Ime:";
        ime.appendChild(lbime);

        var lbprezime = document.createElement("label");
        lbprezime.className = "labeleKontrole";
        lbprezime.innerHTML = "Prezime:";
        prezime.appendChild(lbprezime);

        var lbbr = document.createElement("label");
        lbbr.className = "labeleKontrole";
        lbbr.innerHTML = "Novi broj telefona:";
        br.appendChild(lbbr);

        var inputIme = document.createElement("input");
        inputIme.type = "text";
        var inputPrezime = document.createElement("input");
        inputPrezime.type = "text";
        var inputBr = document.createElement("input");
        inputBr.type = "text";

        ime.appendChild(inputIme);
        prezime.appendChild(inputPrezime);
        br.appendChild(inputBr);

        var Btns = document.createElement("div");
        host.appendChild(Btns);

        var Izmeni = document.createElement("button");
        Izmeni.innerHTML = "Izmeni";
        Izmeni.className = "Dodaj";
        Btns.appendChild(Izmeni);

        Izmeni.onclick = (ev) => {
            if (inputIme.value == "")
                alert("Morate uneti ime clana!");

            if (inputPrezime.value == "")
                alert("Morate uneti prezime clana!");

            this.izmeniPodatkeClan(inputIme.value, inputPrezime.value, inputBr.value);
        }
        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = "Odustani"
        Btns.appendChild(Odustani);

        Odustani.onclick = (ev) => this.crtajKontroleClan(host);
    }
    izmeniPodatkeClan(ime, prezime, novibroj) {
        fetch("https://localhost:5001/Clan/Promeni_podatke_clan/" + ime + "/" + prezime + "/" + novibroj,
            {
                method: 'PUT',
                body: JSON.stringify({
                    "Ime": ime,
                    "Prezime": prezime,
                    "noviBrojTelefona": novibroj,

                })
            }).then(Response => {

                console.log("Uspesno promenjen podatak");

                let levaforma = document.querySelector(".levaForma");
                this.prikaziClanove(levaforma);

            });
    }

    //#endregion 

    //#region Clanska karta
    prikaziClanskeKarte(host) {
        this.removeAllChildNodes(host);

        this.listaKarte = [];

        fetch("https://localhost:5001/ClanskaKarta/Sve_karte")
            .then(p => {
                p.json().then(karte => {
                    karte.forEach(A => {
                        console.log(A);
                        var karta = new ClanskaKarta(A.brojKarte, A.tip, A.clanarina, A.datumIzdavanja, A.datumVazenja);
                        this.listaKarte.push(karta);
                    });

                    let forma = document.createElement("div");
                    forma.className = "zaPrikaz";
                    host.appendChild(forma);

                    this.crtajHeader(forma, "Clanske karte");

                    var karteTabela = document.createElement("table");
                    karteTabela.className = "tabelaKarte";
                    forma.append(karteTabela);

                    var tabelaheader = document.createElement("thead");
                    karteTabela.appendChild(tabelaheader);

                    var tr = document.createElement("tr");
                    tabelaheader.appendChild(tr);

                    let th;
                    var zaglavlje = ["Broj clanske karte", "Tip", "Clanarina", "Datum izdavanja", "Datum vazenja"];
                    zaglavlje.forEach(el => {
                        th = document.createElement("th");
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })
                    var tabelabody = document.createElement("tbody");
                    tabelabody.className = "kartePodaci";
                    karteTabela.appendChild(tabelabody);

                    this.listaKarte.forEach(A => {
                        A.crtaj(karteTabela);
                    })

                    let FormaKontrole = document.createElement("div");
                    FormaKontrole.className = "formaDugmici";
                    host.appendChild(FormaKontrole);

                    this.crtajKontroleKarta(FormaKontrole);
                })
            });
    }
    crtajKontroleKarta(host) {
        this.removeAllChildNodes(host);

        var dugmelab = ["Napravi clansku kartu", "Ukloni clansku kartu", "Izmeni clansku kartu"];
        var dugmeniz = [];

        dugmelab.forEach(d => {
            var btn = document.createElement("button");
            btn.innerHTML = d;
            btn.className = "dugmiciKontrole";
            dugmeniz.push(btn);
            host.appendChild(btn);
        })

        dugmeniz[0].onclick = (ev) => this.crtajDijalogDodajKartu(host);
        dugmeniz[1].onclick = (ev) => this.crtajDijalogObrisiKartu(host);
        dugmeniz[2].onclick = (ev) => this.crtajDijalogIzmeniKartu(host);
    }

    crtajDijalogDodajKartu(host) {
        this.removeAllChildNodes(host);
        this.crtajHeader(host, "Dodaj clansku kartu");

        var i = 0;
        var polja = ["Broj karte", "Tip", "Datum izdavanja", "Datum vazenja"];

        var brk, tip, datizd, datvaz;
        var divniz = [brk, tip, datizd, datvaz];

        var lbbrk, lbtip, lbdatizd, lbdatvaz;
        var labeleTekst = ["Broj karte:", "Tip:", "Datum izdavanja:", "Datum vazenja:"];
        var labele = [lbbrk, lbtip, lbdatizd, lbdatvaz];

        var inpbrk, inptip, inpdatiz, inpdatvaz;
        var inputs = [inpbrk, inptip, inpdatiz, inpdatvaz];

        var poljeKontrole = document.createElement("div");
        host.appendChild(poljeKontrole);

        polja.forEach(D => {

            divniz[i] = document.createElement("div");
            poljeKontrole.appendChild(divniz[i]);

            labele[i] = document.createElement("label");
            labele[i].className = "labeleKontrole";
            labele[i].innerHTML = labeleTekst[i];
            divniz[i].appendChild(labele[i]);

            inputs[i] = document.createElement("input");
            inputs[i].type = "text";
            inputs[i].className = "InputKontrole";
            divniz[i].appendChild(inputs[i]);

            i++;
        })
        var Btns = document.createElement("div");
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciLabele = ["Dodaj", "Odustani"];
        var DugmiciKlase = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = DugmiciKlase[i];
            Btns.appendChild(Dugmici[i]);
            i++;
        })
        Dugmici[0].onclick = (ev) => {
            if (inputs[0].value < 1 || inputs[0].value > 10000)
                alert("Morate uneti vrednost izmedju 1 i 10000");
            if (inputs[1].value != "Standardna" || inputs[1].value != "Djacka" || inputs[1].value != "Studentska" || inputs[1].value != "Penzionerska")
                alert("Neispravan tip clanske karte!");
            this.dodajClanskuKartu(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
        }
        Dugmici[1].onclick = (ev) => this.crtajKontroleKarta(host);
    }
    dodajClanskuKartu(brojKarte, tipKarte, vaziOd, vaziDo) {
        fetch("https://localhost:5001/ClanskaKarta/Dodeli_clansku_kartu/" + brojKarte + "/" + tipKarte + "/" + vaziOd + "/" + vaziDo,
            {
                method: 'POST',
                body: JSON.stringify({
                    "brojKarte": brojKarte,
                    "tipKarte": tipKarte,
                    "VaziOd": vaziOd,
                    "VaziDo": vaziDo
                })
            }).then(Response => {

                let levaforma = this.container.querySelector(".levaForma");
                this.prikaziClanskeKarte(levaforma);
            });
    }

    crtajDijalogIzmeniObrisiKartu(host, param) {
        this.removeAllChildNodes(host);

        if (param === 1) {
            this.crtajHeader(host, "Produzi clansku kartu");
        }
        else {
            this.crtajHeader(host, "Ukloni clansku kartu");
        }

        var produzi = document.createElement("div");
        host.appendChild(produzi);

        var lblbrojkarte = document.createElement("label");
        lblbrojkarte.className = "labeleKontrole";
        lblbrojkarte.innerHTML = "Broj clanske karte:";
        produzi.appendChild(lblbrojkarte);

        var inputUnos = document.createElement("input");
        produzi.appendChild(inputUnos);

        var btn = document.createElement("div");
        host.appendChild(btn);

        var dugmePromeni = document.createElement("button");

        if (param === 1) {
            dugmePromeni.innerHTML = "Produzi";
        }
        else {
            dugmePromeni.innerHTML = "Ukloni";
        }

        dugmePromeni.className = "Dodaj";
        btn.appendChild(dugmePromeni);

        var dugmeOdustani = document.createElement("button");
        dugmeOdustani.innerHTML = "Odustani";
        dugmeOdustani.className = "Odustani";
        btn.appendChild(dugmeOdustani);

        if (param === 1) {
            dugmePromeni.onclick = (ev) => {
                if (inputUnos.value < 1 || inputUnos.value > 10000)
                    alert("Morate uneti vrednost izmedju 1 i 10000");
                this.produziClanskuKartu(inputUnos.value);
            }
        }
        else {
            dugmePromeni.onclick = (ev) => {
                if (inputUnos.value < 1 || inputUnos.value > 10000)
                    alert("Morate uneti vrednost izmedju 1 i 10000");
                this.obrisiClanskuKartu(host, inputUnos.value);
            }
        }

        dugmeOdustani.onclick = (ev) => this.crtajKontroleKarta(host);

    }

    crtajDijalogIzmeniKartu(host) {
        this.crtajDijalogIzmeniObrisiKartu(host, 1);
    }
    crtajDijalogObrisiKartu(host) {
        this.crtajDijalogIzmeniObrisiKartu(host, 2);
    }

    produziClanskuKartu(brojKarte) {
        fetch("https://localhost:5001/ClanskaKarta/Produzi_clansku_kartu/" + brojKarte,
            {
                method: 'PUT',
                body: JSON.stringify({
                    "brojkarte": brojKarte
                })
            }).then(Response => {

                console.log("Uspesno produzena clanska karta");
                let levaforma = document.querySelector(".levaForma");
                this.prikaziClanskeKarte(levaforma);

            });
    }
    obrisiClanskuKartu(host, brojKarte) {
        this.removeAllChildNodes(host);

        fetch("https://localhost:5001/ClanskaKarta/Oduzmi_clansku_kartu/" + brojKarte,
            {
                method: 'DELETE',
                body: JSON.stringify({
                    "brojkarte": brojKarte
                })
            }).then(Response => {

                console.log("Uspesno obrisana clanska karta");
                let levaforma = this.container.querySelector(".levaForma");
                this.prikaziClanskeKarte(levaforma);
            });
    }
    //#endregion Clanska karta

    //#region Iznajmljivanja
    crtajIznajmljivanja(host) {
        this.removeAllChildNodes(host);
        var tabela = document.createElement("div");
        tabela.className = "IznajmljivanjeTabela";
        host.appendChild(tabela);

        var kontrole = document.createElement("div");
        kontrole.className = "Kontrole";
        host.appendChild(kontrole);

        this.prikaziIznajmljivanja(tabela);
    }
    prikaziIznajmljivanja(host) {
        this.removeAllChildNodes(host);

        this.listaIznajmljivanja = [];
        fetch("https://localhost:5001/Iznajmljivanje/Sva_iznajmljivanja")
            .then(p => {
                p.json().then(izn => {
                    izn.forEach(A => {
                        console.log(A);
                        var iznm = new Iznajmljivanje(A.id_iznajmljivanje, A.datumIznajmljivanja, A.datumVracanja, A.knjiga, A.clan, A.bibliotekar);

                        this.listaIznajmljivanja.push(iznm);
                    });

                    var iznmTabela = document.createElement("table");
                    iznmTabela.className = "iznmTabela";
                    host.append(iznmTabela);

                    var tabelaheader = document.createElement("thead");
                    iznmTabela.appendChild(tabelaheader);

                    var tr = document.createElement("tr");
                    tr.className = "iznZaglavlje";
                    tabelaheader.appendChild(tr);

                    let th;
                    var zaglavlje = ["Clan", "Knjiga", "Datum uzimanja", "Datum vracanja", "Bibliotekar", "Novi datum vracanja", ""];
                    zaglavlje.forEach(el => {
                        th = document.createElement("th");
                        th.className = "tdIznm";
                        th.innerHTML = el;
                        tr.appendChild(th);
                    })
                    var tabelabody = document.createElement("tbody");
                    tabelabody.className = "iznmPodaci";
                    iznmTabela.appendChild(tabelabody);

                    this.listaIznajmljivanja.forEach(A => {
                        A.crtaj(iznmTabela);
                    })

                    this.container.querySelectorAll(".RedIznajmljivanje").forEach(I => {
                        console.log(I);

                        var elDatum = document.createElement("td");
                        elDatum.className = "tdIznm";
                        var dtp = document.createElement("input");
                        dtp.setAttribute("type", "date");
                        dtp.className = "datapicker";
                        elDatum.appendChild(dtp);
                        I.appendChild(elDatum);

                        var elDugme = document.createElement("td");
                        elDugme.className = "tdIznm";
                        var btn = document.createElement("button");
                        btn.className = "iznmBtn";

                        let rbr = I.querySelector(".RedniBroj");
                        console.log(rbr);
                        let datum = I.querySelector(".datapicker");
                        btn.innerHTML = "+";

                        btn.onclick = (ev) => this.vratiKnjigu(rbr.innerHTML, datum.value);
                        elDugme.appendChild(btn);
                        I.appendChild(elDugme);
                    })

                    var dugme = document.createElement("button");
                    dugme.className = "dugmeIzn";
                    dugme.innerHTML = "Dodaj iznajmljivanje";
                    dugme.onclick = (ev) => this.crtajKontroleIznajmljivanje(host);
                    host.appendChild(dugme);
                })

            });


    }

    vratiKnjigu(rbr, datum) {
        fetch("https://localhost:5001/Iznajmljivanje/Vracanje_knjige/" + rbr + "/" + datum,
            {
                method: 'PUT',
                body: JSON.stringify({
                    "Id": rbr,
                    "Datum": datum,

                })
            }).then(Response => {

                console.log("Uspesno promenjen datum");
                let desniProzor = document.querySelector(".desniProzor");
                this.crtajIznajmljivanja(desniProzor);

            });
    }

    crtajKontroleIznajmljivanje(host) {
        this.removeAllChildNodes(host);
        this.crtajHeader(host, "Dodaj novo iznajmljivanje");

        var i = 0;
        var polja = ["Bibliotekar", "Clan", "Knjiga", "Datum"];

        var b, c, k, d;
        var divniz = [b, c, k, d];

        var lbb, lbc, lbk, lbd;
        var labeleTekst = ["Bibliotekar:", "Clan:", "Knjiga:", "Datum:"];
        var labele = [lbb, lbc, lbk, lbd];

        var inpb, inpc, inpk, inpd;
        var inputs = [inpb, inpc, inpk, inpd];

        var poljeKontrole = document.createElement("div");
        host.appendChild(poljeKontrole);

        polja.forEach(D => {

            divniz[i] = document.createElement("div");
            divniz[i].className = "divIzn";
            poljeKontrole.appendChild(divniz[i]);

            labele[i] = document.createElement("label");
            labele[i].className = "labeleKontrole";
            labele[i].innerHTML = labeleTekst[i];
            divniz[i].appendChild(labele[i]);

            inputs[i] = document.createElement("input");
            inputs[i].type = "text";
            inputs[i].className = "InputKontrole";
            divniz[i].appendChild(inputs[i]);

            i++;
        })
        var Btns = document.createElement("div");
        host.appendChild(Btns);

        var Dodaj, Odustani;
        var Dugmici = [Dodaj, Odustani];
        var DugmiciKlase = ["Dodaj", "Odustani"];
        var DugmiciLabele = ["Dodaj", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = D;
            Dugmici[i].className = DugmiciKlase[i];
            Btns.appendChild(Dugmici[i]);
            i++;
        })
        Dugmici[0].onclick = (ev) =>{
            let b=0;
            let c=0;
            let k=0;

            this.listaBibliotekara.forEach(p=>{
                if(p.brojKnjizice===inputs[0].value) b=1;
                if(b) return;
            })

            if(b===0) alert("Ne postoji bibliotekar s tim brojem radne knjizice");

            this.listaClanova.forEach(p=>{
                if(p.brojkarte===inputs[1].value) c=1;
                if(c) return;
            })

            if(c===0) alert("Ne postoji clan s tim brojem clanske karte");

            this.listaKnjiga.forEach(p=>{
                if(p.naslov===inputs[2].value)  k=1;
                if(k) return;
                })

            if(k===0) alert("Ne postoji knjiga s tim naslovom");

            this.dodajIznajmljivanje(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
        }
        Dugmici[1].onclick = (ev) => this.crtajIznajmljivanja(host);
    }

    dodajIznajmljivanje(bibliotekar, clan, knjiga, datum) {
        fetch("https://localhost:5001/Iznajmljivanje/Novo_iznajmljivanje/" + datum + "/" + bibliotekar + "/" + knjiga + "/" + clan,
            {
                method: 'POST',
                body: JSON.stringify({
                    "datum": datum,
                    "bibliotekar": bibliotekar,
                    "knjiga": knjiga,
                    "clan": clan
                })
            }).then(Response => {

                let desnaforma = this.container.querySelector(".desniProzor");
                this.crtajIznajmljivanja(desnaforma);
            });
    }
    //#endregion
}