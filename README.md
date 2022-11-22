[![coverage report](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-29/project_4/badges/main/coverage.svg)](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-29/project_4/-/commits/main) 

# Prosjekt 4 - IT2810 Webutvikling

## Kommandoer

Se README i backend og frontend for videre kommandoer for å kjøre prosjektet. Begge må kjøre for at applikasjonen skal fungere.

### How to test - rask guide

* Vanlige tester
    - Backend -> `cd backend && npm run test`
    - Frontend -> `cd frontend && npm run test`
* E2E
    1. Start backend -> `cd backend && npm run dev`. Dette starter backend i test modus
    2. start frontend -> `cd frontend && npm start`
    3. kjør cypress -> `cd frontend && npm run cypress`


## Oppgaven vi valgte 

Til prosjekt 4 har vi valgt å kombinere to av de mulige oppgavene. Vi valgte å forbedredre og systematisk enhetsteste backend og klient fra prosjekt 3 (oppgave b) og vi valgte å perfeksjonere klient og backend fra prosjekt 3 (oppgave c). Vi har tatt utgangspunkt i å løse all kritikk vi fikk i tilbakemeldingene fra prosjekt 3, samt å sikte oss inn på en testdekningsgrad av applikasjonen på 100%. 

## Tilbakemeldinger

* Reset page - mulighet til å tilbakestille nettsiden uten å laste inn siden på nytt
* Snapshot testing - benytte oss av snapshot tester
* Tabbing through the games - mulighet til å navigere hele nettsiden med tastaturet
* Display the games in a grid - benytte ubrukt plass på siden til forhåndsvisning av spill
* Dark mode for sustainability - mulighet for å velge darkmode
* Comments in the code - mer kommentarer i koden for å forklare komplisert funksjonalitet
* Disable sort button - ikke mulig å klikke på sorter-knappen når ingen parametre er valgt
* Dynamic loading of data - ikke vise reviews eller ratings dersom informasjonen mangler i databasen
* Problem with sorting on price - når man sorterer på pris (lav-høy) så skal man se de billigste spillene først, og ikke de som er gratis
* Improve size of tags box - forstørre listen man velger fra når man velger tags

### Hvordan har vi gått frem for å forbedre disse?

#### Frontend

Vi startet med å sette opp issues for alle tilbakemeldingene vi fikk, for å kunne forbedre applikasjonen fra et brukerperspektiv. Av enkle quick-fixes har vi gjort følgende: 
* Laget en knapp som tilbakestiller alle filtre og sorteringer man har valgt
* Deaktivert sorteringsknappen når ingen krav er valgt
* Endret størrelsen på tags-boksen så man lettere kan se alle tagsene man har å velge mellom.

Av mer krevende inngrep har vi innført funksjonalitet for å vise tre spill i bredden i grid-format når skjermen er bred nok. Selve spillkortet har også fått et nytt design som er mer estetisk og viser mer relevant informasjon. Vi har også fikset problematikk rundt at applikasjonen viste ratings og reviews, selvom denne informasjonen manglet fra databasen. Vi hadde også et problem med at om man sorterte på pris, ascending, kom de spillene som manglet pris opp først. Dette er jo ikke det man leter etter om man sorterer for billigste spill, og vi har fikset dette problemet. 

Nettsiden er nå gjort mulig å navigere kun gjennom tastaturet. Dette skriver vi mer om i Web tilgjengelighet.

#### Backend

Vi fikk ikke mye kommentarer på backenden vår, men vi har forbedret testingen i backend og har også måttet endre noe der så frontend skal fungere som vi vil. 

#### Web tilgjengelighet

En tilbakemelding vi fikk gikk på muligheten til å nagivere nettsiden gjennom tastaturet. I prosjekt 3 viste ikke netssiden hvilket spill som var i fokus når man tabbet gjennom spillene. Dette løste vi ved å endre fargen på spillkortene på onFocus til en gråfarge som fungerte fint for både vanlig og darkmode. Basert på tilbakemeldinger har vi også valgt å forbedre kommenteringen vår i koden. Dette gjør koden mer tilgjengelig for alle, og man kan også lettere forstå hvorfor den er bygget opp som den er. 

#### Bærekraftig webutvikling

Den største endringen vi har gjort i forhold til å gjøre applikasjonen mer bærekraftig er å implementere darkmode. Her har vi for å holde det enkelt valgt å bruke MaterialUI sitt "dark" tema, som fungerte vel. Vi har en enkel knapp i headeren til å bytte tema, som også forteller deg hva slags tema du bruker nå. Vi har også sjekket at fargene fungerer som de skal, og har noen steder i applikasjonen vært nødt til å endre enkelte tekstfarger slik at alt skal synes godt og fortsatt være tilgjengelig. Dark mode er ikke bare mindre anstrengende for øynene, men sparer også strøm. Vi valgte også å benytte os av localStorage til å huske brukerens valg, slik at valget ble persistent. At vi ikke hadde dark mode ble kommentert i flere av tilbakemeldingene våre, og vi så det hensiktsmessig å implementere det.

At vi nå viser tre spill i bredden er også mer bærekraftig, da vi benytter mer av plassen til å vise relevant innhold.

## Testing i prosjekt 4

### Dekningsgrad

[![coverage report](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-29/project_4/badges/main/coverage.svg)](https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-29/project_4/-/commits/main) 

Vi tester nå alt i applikasjonen som klarer å testes. Dette går fra alt som stores til komponenter og deres funskjoner. Som man ser på testdekningsgraden over er vi utrolig nærme 100%. Vi er klar over at dette ikke reflekterer at appen er perfekt dekket av tester, men vi har lært mange nye måter å teste funksjonalitet på som vi tidligere ikke har kunnet. Dette har også gjort at vi har vært nødt til å gå grundigere til verks og testet så godt som alt av edge-cases.

### Pipeline added 

### Komponenttesting

### Snapshottesting

Vi er kjent med at det er mye debatt i utviklingsmiljøet om nyttigheten av snapshottesting. I et virkelig prosjekt ville vi ikke nødvendigvis benyttet oss av dette. Vi har valgt i dette prosjektet å ta det med for å lære om hvordan man utfører det og for å vise kunnskap om utviklingen av snapshottesting. 

### Endpoint testing


