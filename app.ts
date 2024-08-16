// Interfacce

interface IPartecipante{
    nome: string;
    cognome: string;
    paeseOrigine: string;
    livelloIstruzione: number;
    competenzeLinguistiche: string;
    ambitoInteresse: string;

    iscrivitiCorso(corso: ICorso): void;
}

interface ICorso{
    titolo: string;
    descrizione: string;
    settore: string;
    durata: number; 
    elencoIscritti: IPartecipante[];

    aggiungiPartecipante(partecipante: IPartecipante): void;
    stampaElencoIscritti(): void;
}

interface IAzienda{
    nome: string;
    settore: string;
    descrizione: string;
    posizioniAperte: string[];

    offriPosizione(partecipante: IPartecipante, posizione: string): void;
}

// Classi

class Partecipante implements IPartecipante(){
    nome: string;
    cognome: string;
    paeseOrigine: string;
    livelloIstruzione: number;
    competenzeLinguistiche: string;
    ambitoInteresse: string;

    iscrizioni: ICorso[] = [];

    constructor(nome: string, cognome: string, paeseOrigine: string, livelloIstruzione: number, competenzeLinguistiche: string, ambitoInteresse: string){
        this.nome = nome;
        this.cognome = cognome;
        this.paeseOrigine = paeseOrigine;
        this.livelloIstruzione = livelloIstruzione;
        this.competenzeLinguistiche = competenzeLinguistiche;
        this.ambitoInteresse = ambitoInteresse;
    }

    iscrivitiCorso(corso: ICorso): void{
        corso.aggiungiPartecipante(this);
        this.iscrizioni.push(corso);
        console.log(`${this.nome} ${this.cognome} è ora iscritto al corso: "${corso.titolo}".`);
    }
}

class Corso implements ICorso {
    titolo: string;
    descrizione: string;
    settore: string;
    durata: number;

    elencoIscritti: IPartecipante[] = [];

    constructor(titolo: string, descrizione: string, settore: string, durata: number) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.settore = settore;
        this.durata = durata;
    }

    aggiungiPartecipante(partecipante: IPartecipante): void {
        this.elencoIscritti.push(partecipante);
             console.log(`${partecipante.nome} ${partecipante.cognome} è stato aggiunto al corso: "${this.titolo}".`);
    }
  stampaElencoIscritti(): void {
        let output = `Elenco degli iscritti al corso "${this.titolo}": `;
        for (let i = 0; i < this.elencoIscritti.length; i++) {
            output += `${this.elencoIscritti[i].nome} ${this.elencoIscritti[i].cognome}`;
            if (i < this.elencoIscritti.length - 1) {
                output += ', ';
            } else {
                output += '.';
            }
        }
        console.log(output);
    }
}

class Azienda implements IAzienda {
    nome: string;
    settore: string;
    descrizione: string;
    posizioniAperte: string[];

    constructor(nome: string, settore: string, descrizione: string, posizioniAperte: string[]) {
        this.nome = nome;
        this.settore = settore;
        this.descrizione = descrizione;
        this.posizioniAperte = posizioniAperte;
    }
    
    offriPosizione(partecipante: IPartecipante, posizione: string): void {
        console.log(`L'azienda ${this.nome} offre una posizione come ${posizione} a ${partecipante.nome} ${partecipante.cognome}.`);
    }
}

//Istanze e testing

const migrante1 = new Partecipante('Anna', 'Antonyuk', 'Ucraina', 8, 'Buone', 'Informatica');
const migrante2 = new Partecipante('Barbara', 'Bondarenko', 'Ucraina', 7, 'Ottime', 'Sartoria');
const migrante3 = new Partecipante('Christian', 'Chumak', 'Ucraina', 6, 'Sufficienti', 'Informatica');


const corsoInformatica = new Corso('Programmazione base', 'Studio delle basi della programmazione', 'Informatica', 100);
const corsoSartoria = new Corso('Cucito e modellistica', 'Studio e confezione base del capo sartoriale', 'Sartoria', 150);

const WebCompany = new Azienda('Web Company', 'Informatica', 'Sviluppo Software e siti Web.', ['Developer Junior', 'Marketing Specialist']);
const IlFilo = new Azienda('Il Filo', 'Sartoria', 'Produzione artigianale di abiti per donna, uomo e bambino.', ['Cucitore Junior', 'Addetto allo stiro'])

migrante1.iscrivitiCorso(corsoInformatica);
migrante2.iscrivitiCorso(corsoSartoria);
migrante3.iscrivitiCorso(corsoInformatica);

WebCompany.offriPosizione(migrante1, 'Developer Junior');
IlFilo.offriPosizione(migrante2, 'Cucitore Junior');

corsoInformatica.stampaElencoIscritti();
