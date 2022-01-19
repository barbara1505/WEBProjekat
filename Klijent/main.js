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
                var autor = new Autor(A.ime, A.prezime, A.godinaRodjenja, A.godinaSmrti);
                listaAutora.push(autor);
            });

        })
        fetch("https://localhost:5001/Bibliotekar/Svi_bibliotekari")
            .then(p => {
                p.json().then(Bibliotekari => {
                    Bibliotekari.forEach(B => {
                        var bibliotekar = new Bibliotekar(B.ime, B.prezime, B.brojKnjizice, B.pol, B.smena);
                        listaBibliotekara.push(bibliotekar);
                    });
                })

                fetch("https://localhost:5001/Clan/Svi_clanovi")
                    .then(p => {
                        p.json().then(Clanovi => {

                            Clanovi.forEach(C => {
                                var clan = new Clan(C.ime, C.prezime, C.adresa, C.telefon, C.clanskaKarta.brojKarte);
                                listaClanova.push(clan);
                            });

                        })
                        fetch("https://localhost:5001/Knjiga/Sve_knjige")
                            .then(p => {
                                p.json().then(Knjige => {
                                    Knjige.forEach(K => {
                                        var knjiga = new Knjiga(K.naslov, K.autor, K.zanr, K.brojPrimeraka, K.brojStrana);
                                        listaKnjiga.push(knjiga);
                                    });
                                })
                                fetch("https://localhost:5001/ClanskaKarta/Sve_karte")
                                    .then(p => {
                                        p.json().then(Karte => {
                                            Karte.forEach(K => {
                                                var karta = new ClanskaKarta(K.brojKarte, K.tip, K.clanarina, K.datumIzdavanja, K.datumVazenja);
                                                listaKarte.push(karta);
                                            });
                                        })
                                    })
                                })
                            })
                        })
                    })

var biblioteka=new Biblioteka("Biblioteka Pirot",listaAutora,listaBibliotekara,listaKnjiga,listaClanova,listaKarte,listaIznajmljivanja);
biblioteka.crtaj(document.body);

var biblioteka2=new Biblioteka("Biblioteka Beograd",listaAutora,listaBibliotekara,listaKnjiga,listaClanova,listaKarte,listaIznajmljivanja);
biblioteka2.crtaj(document.body);