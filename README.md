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


## Oppgaven videre fra Prosjekt 3 
til oppgave 4 har vi valgt å kombinere oppgave b og c. Vi ønsker også å perfeksjonere frontend og backend fra prosjekt 3, og kombinere med å virkelig forbedre testingen av både frontend og backend. Vi har tatt utgangspunkt i å løse all kritikk vi fikk i tilbakemeldingene og sikter på en 100% testdekningsgrad av applikasjonen. 

## Tilbakemeldinger

* Reset page
* Snapshot testing
* Automatically add filter
* Tabbing through the games
* Display the games in a grid
* Dark mode for sustainability
* Comments in the code
* Disable sort button
* Not show review when no reviews
* Not show rating when no ratings
* Problem with sorting on price
* Improve size of tags box

### Hvordan har vi gått frem for å forbedre disse?

#### Frontend
Mye av forbedringsforslagene kom naturligvis på frontend, da det er det man selv møter som tilbakemelder 
på prosjektet og det er lettest å finne forbedringspotensiale i. 

Reset page knapp
Auto add filter
Displaying games in a grid
Disable sort button
Not show review when no reviews
Not show rating when no ratings
Problem with sorting on price
Size of tags box

#### Backend
Vi fikk ikke mye kommentarer på backenden vår, men vi har forbedret testingen i backend og har også måttet endre noe der så frontend skal fungere som vi vil. 

#### Testing
Forbedret og utviklet. Diskuteres i neste avsnitt.
Snapshot testing

#### Web tilgjengelighet
En tilbakemelding vi fikk på muligheten for å tabbe gjennom siden var at man ikke kunne se hvilket spill man var fokusert på når man tabbet gjennom spillene. Dette løste vi ved å endre fargen på spillkortene på onFocus til en gråfarge som fungerte fint for både vanlig og darkmode. Basert på tilbakemeldinger har vi også valgt å forbedre kommenteringen vår i koden. Dette gjør koden mer tilgjengelig for alle, og man kan også lettere forstå hvorfor den er bygget opp som den er. 

#### Bærekraftig webutvikling
Den største endringen vi har gjort i forhold til å gjøre applikasjonen mer bærekraftig er å implementere darkmode. Her har vi for å holde det enkelt valgt å bruke MaterialUI sitt "dark" tema, som fungerte vel. Vi har også sjekket at fargene fungerer som de skal, og har noen steder i applikasjonen blitt nødt til å endre enkelte tekstfarger så alt skal synes godt og fortsatt være tilgjengelig. Dark mode er ikke bare mindre anstrengende for øynene, men sparer også masse strøm da hvitt krever mest strøm. At vi ikke hadde dark mode ble kommentert i flere av tilbakemeldingene våre, og vi så det hensiktsmessig å implementere det.  

## Testing i prosjekt 4

### Dekningsgrad
Vi tester nå alt i applikasjonen, fra stores, knapper og komponenter. 

### Komponenttesting

### Snapshottesting

### Endpoint testing
