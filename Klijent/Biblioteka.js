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
        zaglavlje.className = "ZaglavljeStil";
        this.container.appendChild(zaglavlje);

        let img = document.createElement("img");
        img.src = "http://www.nbpi.org.rs/wordpress/wp-content/uploads/2020/03/%C4%8Citam-ne-skitam-Narodna-biblioteka-Pirot.jpg"

        img.height = "200";
        img.width = "500";
        zaglavlje.appendChild(img);


        let naslov = document.createElement("h2");
        naslov.className = "NaslovStil";
        naslov.innerHTML = "Biblioteka Pirot";
        zaglavlje.appendChild(naslov);


        let naslovlab = document.createElement("h2");
        naslovlab.className = "NaslovLabStil";
        naslovlab.innerHTML = "Upravljanje poslovanjem";
        zaglavlje.appendChild(naslovlab);

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

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = "dugmeZaposliOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })
        Dugmici[0].onclick = (ev) => {
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
        Obrisi.className = "dugmeZaposliOdustani";
        Btns.appendChild(Obrisi);

        Obrisi.onclick = (ev) => {
            this.obrisiBibliotekara(host, inputKnjizica.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = "dugmeZaposliOdustani"
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

        var dugmelab = ["Dodaj knjigu", "Prikazi knjige odredjenog zanra"];
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
        var DugmiciLabele = ["Dodaj knjigu", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = "dugmeZaposliOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })
        Dugmici[0].onclick = (ev) => {
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
        prikazi.className = "dugmeZaposliOdustani";
        Btns.appendChild(prikazi);

        prikazi.onclick = (ev) => {
            this.prikaziKnjigeZanr(host, input.value);
        }

        var Odustani = document.createElement("button");
        Odustani.innerHTML = "Odustani";
        Odustani.className = "dugmeZaposliOdustani"
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
        var DugmiciLabele = ["Dodaj knjigu autoru", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = "dugmeZaposliOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })
        Dugmici[0].onclick = (ev) => 
            this.dodajKnjiguAutoru(inputs[0].value, inputs[1].value, inputs[2].value);
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
        var DugmiciLabele = ["Dodaj autora", "Odustani"];

        var i = 0;

        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = "dugmeZaposliOdustani";
            Btns.appendChild(Dugmici[i]);

            i++;
        })
        Dugmici[0].onclick = (ev) => 
            this.dodajAutora(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
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

    crtajDijalogPrikaziKnjigeAutora(host) 
    { 
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

        var i = 0;
        DugmiciLabele.forEach(D => {
            Dugmici[i] = document.createElement("button");
            Dugmici[i].innerHTML = DugmiciLabele[i];
            Dugmici[i].className = "dugmeZaposliOdustani";
            Btns.appendChild(Dugmici[i]);
            i++;
        })
        Dugmici[0].onclick = (ev) => 
            this.prikaziKnjigeAutora(host,inputs[0].value, inputs[1].value);
        Dugmici[1].onclick = (ev) => this.crtajKontroleAutor(host);
    }

    prikaziKnjigeAutora(host, ime, prezime)
    {
        this.removeAllChildNodes(host);

        this.listaKnjiga = [];

        fetch("https://localhost:5001/Autor/Knjige_Autora/" + ime +"/" +prezime)
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
}