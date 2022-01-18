
import { Biblioteka } from "./Biblioteka.js";

var listaAutora = [];
var listaBibliotekara = [];
var listaClanova = [];
var listaKnjiga = [];
var listaKarte = [];
var listaIznajmljivanja = [];


var biblioteka=new Biblioteka("Biblioteka Pirot",listaAutora,listaBibliotekara,listaKnjiga,listaClanova,listaKarte,listaIznajmljivanja);
biblioteka.crtaj(document.body);

var biblioteka2=new Biblioteka("Biblioteka Beograd",listaAutora,listaBibliotekara,listaKnjiga,listaClanova,listaKarte,listaIznajmljivanja);
biblioteka2.crtaj(document.body);