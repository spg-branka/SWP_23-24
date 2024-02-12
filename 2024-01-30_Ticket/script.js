const zieleUndPreise = {
    Salzburg: 30,
    Innsbruck: 45,
    Klagenfurt: 40,
    Graz: 25,
    Bregenz: 60,
};

class TicketAutomat {
    constructor(initialGeld) {
        this.einnahmenGesamt = initialGeld;
        this.eingeworfen = 0;
        this.ziel = undefined;
        this.anzahlPersonen = 1;
    }

    einwerfen(geld) {
        this.eingeworfen += geld;
        document.getElementById('guthabenAnzeige').innerText = this.eingeworfen;
        this.updateFahrpreis();
    }

    zielEinstellen(ziel) {
        this.ziel = ziel;
        this.updateFahrpreis();
    }

    anzahlEinstellen(wieviele) {
        if (wieviele < 1 || wieviele > 10) {
            throw new Error('falsche Anzahl Personen');
        }
        this.anzahlPersonen = wieviele;
        this.updateFahrpreis();
    }

    ticketKaufen() {
        if (this.eingeworfen < zieleUndPreise[this.ziel] * this.anzahlPersonen) {
            document.getElementById('ticketOutput').innerText = `Es fehlen noch ${zieleUndPreise[this.ziel] * this.anzahlPersonen - this.eingeworfen}€ damit ich das Ticket drucken kann.`;
            return;
        }

        const ticket = new Ticket(
            this.anzahlPersonen,
            this.ziel,
            this.eingeworfen
        );
        this.einnahmenGesamt += ticket.summe;
        document.getElementById('einnahmenGesamt').innerText = this.einnahmenGesamt;
        document.getElementById('ticketOutput').innerText = ticket.toString();
        this.eingeworfen = 0;
        document.getElementById('guthabenAnzeige').innerText = this.eingeworfen;
    }

    updateFahrpreis() {
        if (this.ziel) {
            const fahrpreis = zieleUndPreise[this.ziel] * this.anzahlPersonen;
            document.getElementById('fahrpreis').innerText = fahrpreis;
        }
    }
}

class Ticket {
    constructor(anzahl, ziel, gegeben) {
        this.anzahlPersonen = anzahl;
        this.ziel = ziel;
        this.gegeben = gegeben;
        this.summe = zieleUndPreise[this.ziel] * this.anzahlPersonen;
        if (this.gegeben < this.summe) {
            throw new Error('nicht genug gegeben');
        }
    }

    toString() {
        return `===============================
=== Fahrkarte nach ${this.ziel} ===
===============================
Einzelpreis: € ${zieleUndPreise[this.ziel]} .-
Anzahl der Fahrgäste: ${this.anzahlPersonen}
===============================
Summe: € ${this.summe} .-
===============================
gegeben: € ${this.gegeben} .-
Restgeld: € ${this.gegeben - this.summe},-
===============================`;
    }
}

const automat = new TicketAutomat(150);

document.getElementById('eingeworfen').addEventListener('change', function() {
    automat.einwerfen(parseInt(this.value));
});

document.getElementById('ziel').addEventListener('change', function() {
    automat.zielEinstellen(this.value);
});

document.getElementById('anzahlPersonen').addEventListener('change', function() {
    automat.anzahlEinstellen(parseInt(this.value));
});

document.getElementById('button').addEventListener('click', function() {
    automat.ticketKaufen();
});