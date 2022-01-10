import { Autor } from "./Autor.js";
import { Bibliotekar } from "./Bibliotekar.js";
import { Clan } from "./Clan.js";
import { Knjiga } from "./Knjiga.js";
import { ClanskaKarta } from "./ClanskaKarta.js"
import { Iznajmljivanje } from "./Iznajmljivanje.js"
import { Biblioteka } from "./Biblioteka.js";

var listaAutora = [];
var listaBibliotekara = [];
var listaClanova = [];
var listaKnjiga = [];
var listaKarte = [];
var listaIznajmljivanja = [];

fetch("https://localhost:5001/Autor/Svi_autori")
    .then(p => {
        p.json().then(Autori => {

            Autori.forEach(A => {

                //console.log(A);

                var autor = new Autor(A.ime, A.prezime, A.godinaRodjenja, A.godinaSmrti);
                listaAutora.push(autor);

                //console.log(autor);

            });

        })

        fetch("https://localhost:5001/Bibliotekar/Svi_bibliotekari")
            .then(p => {
                p.json().then(Bibliotekari => {

                    Bibliotekari.forEach(B => {

                        //console.log(C);

                        var bibliotekar = new Bibliotekar(B.ime, B.prezime, B.brojKnjizice, B.pol, B.smena);
                        listaBibliotekara.push(bibliotekar);

                        //console.log(bibliotekar);

                    });

                })

                fetch("https://localhost:5001/Clan/Svi_clanovi")
                    .then(p => {
                        p.json().then(Clanovi => {

                            Clanovi.forEach(C => {

                                console.log(C);

                                var clan = new Clan(C.ime, C.prezime, C.adresa, C.telefon, C.clanskaKarta.brojKarte);
                                listaClanova.push(clan);

                                //console.log(clan);

                            });

                        })

                        fetch("https://localhost:5001/Knjiga/Sve_knjige")
                            .then(p => {
                                p.json().then(Knjige => {

                                    Knjige.forEach(K => {

                                        //console.log(K);

                                        var knjiga = new Knjiga(K.naslov, K.autor, K.zanr, K.brojPrimeraka, K.brojStrana);
                                        listaKnjiga.push(knjiga);

                                        //console.log(knjiga);

                                    });

                                })

                                fetch("https://localhost:5001/ClanskaKarta/Sve_karte")
                                    .then(p => {
                                        p.json().then(Karte => {

                                            Karte.forEach(K => {

                                                console.log(K);

                                                var karta = new ClanskaKarta(K.brojKarte, K.tip, K.clanarina, K.datumIzdavanja, K.datumVazenja);
                                                listaKarte.push(karta);

                                                // console.log(karta);

                                            });

                                        })

                                        fetch("https://localhost:5001/Iznajmljivanje/Sva_iznajmljivanja")
                                            .then(p => {
                                                p.json().then(Iznajmljivanja => {

                                                    Iznajmljivanja.forEach(I => {

                                                        //console.log(I);

                                                        var iznajmljivanje = new Iznajmljivanje(I.datumIznajmljivanja, I.datumVracanja, I.knjiga, I.autor, I.bibliotekar);
                                                        listaIznajmljivanja.push(iznajmljivanje);

                                                        //console.log(iznajmljivanje);

                                                    });

                                                })
                                            })
                                    })
                            })
                    })
            })
    })
var biblioteka=new Biblioteka("Biblioteka Pirot",listaAutora,listaBibliotekara,listaKnjiga,listaClanova,listaKarte,listaIznajmljivanja);
biblioteka.crtaj(document.body);
//console.log(biblioteka);