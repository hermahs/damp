[![coverage report](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-29/project_4/badges/main/coverage.svg)](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-29/project_4/-/commits/main) 

# Prosjekt 3 - IT2810 Webutvikling

Prosjektet går ut på å hente data fra en database og implementere søk og interaksjon for å visualisere dataen. Vi har valgt å kalle applikasjonen vår Damp, som har som hensikt å hente ut ulike spill for PC. Til dette har vi valgt å bruke et datasett som inneholder over 40.000 spillobjekter.

## Kommandoer

Se README i backend og frontend for videre kommandoer for å kjøre prosjektet. Begge må kjøre for at applikasjonen skal fungere.

### How to test - rask guide

* Vanlige tester
    - Backend -> `cd backend && npm run test`
    - Frontend -> `cd frontend && npm run test`
* E2E
    1. Start backend -> `cd backend && npm run dev`. Dette starter backend i test modus
    2. kjør cypress -> `cd frontend && npm run cypress` *For at dette skal fungere riktig så kan ikke frontend kjøre samtidig som dette kalles*

## Innhold

Applikasjonen har en side, SPA, og er en liste med spill fra spillplattformen Steam. Når man klikker på et spill, kommer det opp en modal med mer detaljert informasjon om det spesifikke spillet. Applikasjonen er optimalisert for mobil, men fungerer vel så godt på større skjermer. Applikasjonen har også funksjonalitet for søking, filtrering og sortering. Man kan søke på spill ved å skrive inn i søkefeltet og søke på navn på spillet, utvikler eller utgiver. Filtreringen fungerer ved at man velger en eller flere filtre, for så å få opp spill som tilfredstiller disse. Filtrene man kan velge mellom er sjanger, lanseringsdato, pris, prestasjoner eller tags. Tags er forskjellige emneknagger Steam bruker på spillene sine, som 3D, base building, bmx osv. Sorteringen sorterer på enten navn, pris eller lanseringsdato, og man kan selv velge om sorteringen skal være stigende eller synkende. Pagineringen på siden fungerer sånn at det lastes inn 15 spill om gangen, og når man blar nedover så lastes det inn 15 spill til hver gang du når bunnen av siden. Brukere har mulighet til å legge igjen kommentarer på de ulike spillene på siden, sammen med en stjernerangering. Disse lagres persistent på databaseserveren.


## Frontend

Applikasjonen er laget ved hjelp av React og skrevet i TypeScript, og hensikten med den er å kunne søke på og filtrere spill fra nettbutikken Steam.


### Apollo Client

Vi brukte apollo client til å koble dataen i backend fra databasen sammen med frontend så vi kan bruke det i applikasjonen. Apollo client gir tilgang til hooken useQuery, som lar oss spørre etter data fra databasen til komponentene. Den "cacher" også automatisk spørringene, så vi raskere kan hente inn dataen fra GraphQL. Den inneholder også funksjonalitet for automatisk oppdatering av grensesnittet.

### Global state management - Mobx

I dette prosjektet har vi valgt å benytte oss av Mobx for å håndtere global state management. Grunnen til det er at Mobx på mange måter er ganske enkelt å bruke og bygd opp på en lite komplisert måte. Dette kommer av at man definerer hvilke tilstander vi ønskaer å lagre lokalt, for så å enkelt benytte seg av disse i andre komponenter. 

Gruppen satt opp flere *stores* for de forskjellige dataene og tilstandene vi ønsket å holde styr på. Vi endte opp med 3 stores, en for data, en for filter, og en for dataen i modalen. Storene blir eksportert i en kjernestore, til oss kalt *rootStore*; og får å gjøre den tilgjengelig for komponentene hadde vi dem i en react context. For at stores i Mobx skal kunne snakke sammen, må de ha en rootStore som passer på at de alle er initialisert før man henter data fra de.

En ulempe med å bruke mobx er at det ikke er like godt innebygd i React som redux og recoil, men fungerer veldig bra med utvidelsen **mobx-react** som de har laget.

### Material UI

Vi har brukt biblioteket material UI til flere av komponentene våre. Vi har brukt dette biblioteket før, og synes det er enkelt å jobbe med og at det skalerer bra som gir et responsivt design. Vi har hatt litt problemer med testing av materialUI komponentene, men den tiden vi sparer på å gjenbruke det har vært verdt det så vi har hatt tid til å fokusere mer på hoveddelen av oppgaven.

## Backend

Vi fant en database med alle spillene i Steam sin nettbutikk i [Kaggle](https://www.kaggle.com/datasets/trolukovich/steam-games-complete-dataset?resource=download), og har selv manuelt lagt til bilde (URL) til alle spillene i databasen. Vi hadde fra starten lyst til å bruke et datasett med bilder, da vi mener dette gjør applikasjonen mer tilgjengelig og estetisk god. Vi har brukt MongoDB som databaseserveren vår, i deres skytjeneste MongoDB Atlas. Her har vi også brukt mongoose til å koble sammen MongoDB og node.js. Mongoose er et ODM (Object Data Modeling) bibliotek for MongoDB. Vi har også brukt GraphQL som i henhold til oppgavebeskrivelsen, samt Express web-rammeverket og Apollo til å sette opp serveren.

I backenden har vi brukt graphql som query språk, med apolloServer som kjører på express og mongodb for datalagringen. Apollo har fungert ganske bra og gjorde det lett å sette opp graphql definisjoner og endepunkter.

Vi har valgt å bruke mongodb siden det er ganske *plug-n'-play*.

## Testing

Enhetstesting av single page application SPA - React client application

### Frontend

For frontend testing har vi brukt React Testing Library. Dette har vi brukt til å flere av komponentene våre. Her ønkser vi å trekke frem Filter.test.tsx. Her har vi testet at de visuelle elementene til komponentene fungere som det skal når brukeren velger ulike filtre. Vi har også testet filterStore.ts filen gjennom komponent testen. Her fikk vi sørget filtrene lagres i filterStore ettersom brukeren velger ulike filtere.

e2e testing er gjort ved hjelp av Cypress. Her har vi testet ut ulike funksjonaliteter vi ser for oss en bruker ville gjort på nettsiden. For eksempel å sjekke ratingen et spill har fått eller å gå inn å legge inn en kommentar på et spill. Den viktigste testfilen vi ønsker å trekke frem her er e2e.cy.js. Vi har også laget et eget test environment som kan startes ved å taste "npm run mock" i backenden.

### Backend

Testet oppsett av server, testet søking, men det er såpass liten logikk i backend at vi ikke prioriterte å teste det så mye direkte. Gjort mer gjennom frontend og end-2-end.

## Web accessibility - Universell utforming

Web accessibility handler om at web applikasjoner skal være tilgjengelig for alle, uavhengig av funksjonsevne, utdanning og alder. Dette er hovedsakelig aspekter som fornuftig design som gir mening, og som er lett å forstå. I Norge har vi en lov, som heter "diskriminerings- og tilgjengelighetesloven". Denne forbyr diskriminering på grunnlag av nedsatt funksjonsevne. Det har også kommet en forskrift om universell utforming av IKT-løsninger, som stiller krav om at 35 av 61 suksesskriterier skal oppfylles. Disse kriteriene er presentert i WCAG 2.0 standarden.

Vi har forsøkt å følge de fire prinsipper for tilgjengelighet i webinnhold på følgende måter i vår applikasjon.

- Mulig å oppfatte: Det eneste innoldet som ikke er i tekstform er bildene, som applikasjonen fungerer like fint uten. De er kun for estetikk og tilgjengelighet for de med dårligere syn. Brukergrensesnittet er svært oversiktlig og har gode kontraster og skiller mellom listeelementer.
- Mulig å betjene: Hele applikasjonen kan brukes kun ved bruk av tastaturet. Ingen ting går fort eller blinker fort, og det er alltid oversiktlig å vite hvor man befinner seg da det kun er en side med modaler.
- Forståelig: I mobilformat er applikasjonen lettest å forstå da tekstene er store og lettleselige, med en oversiktlig og forutsigbar layout. Når man har større skjerm blir teksten liten, og dette kunne vært forbedret for å ha en enda mer tilgjengelig applikasjon.
- Robust: Vi har etterstrebet å skrive applikasjonen på en måte som gjør at koden er oversiktlig og intuitiv, og at den skal være kompatibel med brukeragenter nå med ny teknologi som kommer.

### Tilpasninger vi har gjort:

- Synsproblemer - vi har brukt gode kontraster, og har store fonter på spilltitlene.

- Motorikk - vi har brukt store knapper for spillene som gjør det enkelt å klikke riktig, og bruken av modaler gjør det også enkelt å komme seg ut av et spill når man først har klikket seg inn på det.

- Kognisjon - applikasjonen har ikke mange forstyrrelser, så det er lett å forstå hvor du skal klikke når du ønsker å gjøre noe.

## Bærekraftige avgjørelser

> Løsningen skal demonstrere aspekter ved bærekraftig webutvikling (enten gjennom valg som gjøres i design eller kritisk diskusjon i dokumentasjonen)

Da vi har valgt et datasett med over 40 000 spill, er det mange fallgruver vi måtte passe oss for. Om man alltid skulle lastet inn alle 40 000 spillene hver gang en handling ble utført i applikasjonen, ville dette potensielt kunne ført til mye unødvendig bruk av energi og tid. I det store bildet er ikke 40 000 så mye, men i mange andre situasjoner vil datasett kunne være utrolig mye større.
Vi har brukt mobx og apollo client til å lagre tilstanden fortløpende så vi ikke trenger å laste inn alt hver gang en handling utføres. Apollo hjelper oss for eksempel ved at det har innebygd caching, som sparer oss for å måtte kalle på samme spill flere ganger. Vi har også brukt pagination, som gjør at bare de første 15 spillene vises i applikasjonen om gangen, og dersom man ønsker å se flere kan man scrolle videre ned. Begge disse tiltakene reduserer energibruken kraftig, noe som bidrar til økt bærekraft. Vi har også få elementer på siden, takket være pagination og begrenset funksjonalitet, som gjør at det blir mindre datatrafikk og gir en bedre brukeropplevelse med mindre rot.

### Hva kunne vi gjort bedre?

- Farger koster i energibruk, og hvit krever mye lys som igjen krever mye energi. Om vi hadde hatt en mørk bakgrunn eller en dark mode, så kunne vi spart mer energi.

- Bilder, videoer og animasjoner koster. Vi har ingen videoer eller animasjoner, noe som er bra. Men vi har valgt å legge til bilder til alle spillene i databasen. Dersom vi ikke hadde lagt til dette, så hadde en god del energi blitt spart. Vi kunne også valgt et bildeformat som er mer effektivt, som for eksempel AVIF.

- Vi har brukt TypeScript i applikasjonen vår, som bruker mye mer energi enn JavaScript. Vi brukte TypeScript da dette var et krav til oppgaven og det skalerer bedre enn JavaScript, men i en så liten applikasjon som dette kunne man tenkt mer bærekraftig og brukt JavaScript.

Hovedpoenget med å vurdere bærekraft i webutvikling er ikke at det enkelte prosjektet har så mye å si, men at om alle er mer oppmerksomme på konsekvensene og hvordan man kan forebygge det, så kan den totale summen få stor utteling. I så godt som alle applikasjoner er det rom for å tenke bærekraftig, uten at det skal gå på bekostning av funksjonalitet, design eller brukervennlighet. Bærekraftsmålene handler ikke om at en handling skal være en fullstendig løsning, men at hvis alle bidrar har vi en bedre sjanse sammen.
