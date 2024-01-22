// So liegt der Normalwert bei Männern laut Deutscher Gesellschaft für Ernährung
// im Intervall von 20 bis 25 kg / m², während er sich
// bei Frauen im Intervall von 19 bis 24 kg / m² befindet.

//TODO
// -   Klasse erweitern auf Geschlecht -
// -   Unter / Normal / Übergewicht ausgeben -
// -   toString Methode mit backticks -
// -   Eingabemaske mit "berechnen" button -


const button = document.getElementById("button").addEventListener("click", berechneBMI);

class Person {
    /* Gewicht in kg, Größe in m */
    #name;
    #gewicht;
    #groesse;
    #geschlecht;
    constructor(namePar, gewichtPar, groessePar, geschlechtPar) {
        this.name = namePar;
        this.gewicht = gewichtPar;
        this.groesse = groessePar;
        this.geschlecht = geschlechtPar;
    }

    set name(namePar) {
        if (typeof namePar !== 'string') {
            throw new Error('ungültiger Name');
        }
        if (namePar.length < 3) {
            throw new Error('Name zu kurz');
        }
        this.#name = namePar;
    }

    set gewicht(gewichtPar) {
        // gewicht in kg
        if (gewichtPar < 10 || gewichtPar > 500) {
            throw new Error('ungültiges Gewicht');
        }
        this.#gewicht = gewichtPar;
    }
    get gewicht() {
        return this.#gewicht;
    }

    set groesse(groessePar) {
        if (groessePar < 0.5 || groessePar > 3.0) {
            throw new Error('ungültige Groesse');
        }
        this.#groesse = groessePar;
    }

    set geschlecht(geschlechtPar) {
        if (typeof geschlechtPar !== 'string' && geschlechtPar !== 'w' && geschlechtPar !== 'm') {
            throw new Error('ungültiges Geschlecht');
        }
        this.#geschlecht = geschlechtPar;
    }

    get bmi() { //gibt den bmi aus
        const nmbr = this.#gewicht / (this.#groesse * this.#groesse);
        return Math.round(nmbr * 10) / 10;
    }

    get ausgabeGewicht() { //gibt aus, in welchem bereich der bmi liegt
        const bmi = this.bmi;
        if (this.#geschlecht === 'm' && bmi >= 20 && bmi <= 25) {
            return 'Normalgewicht';
        } else if (this.#geschlecht === 'w' && bmi >= 19 && bmi <= 24) {
            return 'Normalgewicht';
        } else if (bmi < 20) {
            return 'Untergewicht';
        } else {
            return 'Übergewicht';
        }
    }


    toString() {
        // return (
        //     'Name: ' +
        //     this.#name +
        //     ' Gewicht: ' +
        //     this.#gewicht +
        //     ' Größe: ' +
        //     this.#groesse +
        //     ' Geschlecht: ' +
        //     this.#geschlecht +
        //     ' BMI: ' +
        //     this.bmi
        // );

        // mit Backticks
        return `Name: ${this.#name}   Gewicht: ${this.#gewicht}   Größe: ${this.#groesse}   Geschlecht: ${this.#geschlecht}  BMI: ${this.bmi}`;
    }
}

function berechneBMI() {
    //console.log("button works ^-^");
    const inputName = document.getElementById("inputName").value;
    const inputGewicht = document.getElementById("inputGewicht").value;
    const inputGroesse = document.getElementById("inputGroesse").value;
    const inputGeschlecht = document.getElementById("inputGeschlecht").value;

    const person = new Person(inputName, inputGewicht, inputGroesse, inputGeschlecht);
    console.log(person.bmi);

    const ausgabeGewicht = person.ausgabeGewicht;
    console.log(ausgabeGewicht);

    console.log(person.toString());
 }

// a = [
//     ['Peta', 90, 1.7, 'w'],
//     ['Lisa', 50, 3.5, 'w'], //Wie schaffe ich es, dass hier ein Fehler geworfen wird?
//     ['Roland', 70, 1.7, 'w'],
//     ['Hans', 80, 1.8, 'w'],
// ];

// b = a.map((arr) => {
//     try {
//         return new Person(...arr);
//     } catch (e) {
//         console.log(e.message);
//         return null;
//     }
// }); // jetzt ist b ein Personen-Array
// b.forEach((p) => console.log(p + ''));
