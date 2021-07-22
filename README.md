# White Noise+

## Beschreibung

"White Noise+" ist eine Anwendung zum Erstellen beruhigender Klänge. Sie ist dazu gedacht sich mithilfe der vorhandenen Töne einen Loop zu erstellen, welcher entspannt und beruhigt. 

## Features

Folgend eine grobe Auflistung der Features:

![Picture of the Web App "White Noise+"](public/readme_files/WN1.jpg?raw=true "Überblick über die 'White Noise+' Web App")

### `1 Der Grid`

Der Grid ist der Bereich in den die verschiedenen Töne hineingezogen werden können. Es ist ein 4x4 Grid. Je weiter oben ein Sound ist, desto lauter wird er, je weiter rechts desto komplexer.

### `2 Die Töne`

In der Anwendung finden sich derzeit 5 Töne zur Auswahl. Diese lassen sich über Drag and Drop auf das Grid ziehen und ablegen. Mit Klick auf **Play** beginnen alle im Grid befindlichen Töne zu spielen. Mit **Reset** wird das Grid zurückgesetzt.

![GIF wie Töne in Grid gezogen werden](public/readme_files/WN2.gif?raw=true "Nutzung der Töne und des Grid")

### `3 Die Presets`

Über **Save Preset** lassen sich alle im Grid abgelegten Töne in der Session speichern. Es gibt 2 vorgefertigte Presets. **Reset Prestes** setzt die in der Session gespeicherten Presets zurück.

![GIF wie Töne in Presets gespeichert werden können](public/readme_files/WN3.gif?raw=true "Nutzung der Presets")

### `4 Die Noises`

Links neben dem Grid gibt es 3 verschiedene Noises, "White  Noise", "Brown Noise" und "Pink Noise". Diese werden über die Web Audio API erzeugt und können über die abgespielten Töne gelegt werden. Über den Regler lässt sich die Intensität der Noises einstellen. Mit einem Klick auf den Namen werden sie aktiviert, mit einem erneuten Klick deaktiviert. Über den Noises werden diese Visualisiert, je nach Intensität sind die angezeigten Wellen größer oder kleiner.

![GIF wie Noises genutzt werden](public/readme_files/WN4.gif?raw=true "Nutzung der Noises")

## Installation

Zum Starten der Anwendung wird [Node.js](https://nodejs.org/en/) benötigt. Bitte der Verlinkung zur Installation folgen, falls nötig. Ist Node.js installiert. Dann kann die Anwendung über die Eingabe des Befehls `npm start` in das Terminal gestartet werden. Meist öffnet sich der Browser automatisch, sollte dies nicht der Fall sein, so ist "White Noise+" über [http://localhost:3000](http://localhost:3000) aufrufbar. \
**Wir empfehlen den Browser Google Chrome, Chrome basierte Browser, oder Microsoft Edge zu nutzen** in anderen Browsern kann es sein, dass die Anwendung nicht richtig funktioniert.

```
git clone git@github.com:sunanmau5/avt-beleg.git (SSH) oder
git clone https://github.com/sunanmau5/avt-beleg.git (HTTPS)

npm install
npm start
open http://localhost:3000
```

## Autoren 

- Minh Anh Vu
- Sunan Regi Maunakea
- Susann Schöbel

## Projekt

"White Noise+" ist im Sommer Sem ter 2021 als Projekt im Modul "Multimedia Audio- und Videotechnik" entstanden. Als Inspiration haben wir "WhiteNoise+" aus dem App Store genutzt.

## Demo
https://sunanmau5.github.io/avt-beleg/

## genutzte Technologien

- [React](https://reactjs.org/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [react-dnd](https://github.com/react-dnd/react-dnd/)
- [react-howler](https://github.com/thangngoc89/react-howler)
- [Noises (White, Pink, Brown)](https://noisehack.com/generate-noise-web-audio-api/)
