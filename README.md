# Foglio Casse

App web per pianificare i turni delle casse e del punto accoglienza, a mezz'ore dalle 07:00 a mezzanotte.

- Assegna le casse in automatico secondo regole fisse: cassa 1 solo emergenze, casse 5 e 11 mai, chi chiude a mezzanotte in cassa 2 o 3, cambio turno sulla stessa cassa.
- Controlla la copertura del punto accoglienza dalle 07:00 alle 21:00.
- Esporta il PDF del giorno in A4 orizzontale.
- Legge la foto dell'orario (giorno o settimana) con l'API di Claude, usando la chiave inserita nelle impostazioni.

## Dati

Questa pagina non contiene dati di nessuno. Turni, nomi, regole personali e chiave API restano nel browser del dispositivo. Il piano passa da un dispositivo all'altro solo con il file esportato dall'app ("Esporta piano" / "Apri piano").

## Installazione

Apri l'indirizzo dell'app nel browser e usa "Aggiungi a schermata Home" (Safari: tasto Condividi; Chrome: menu). Dopo la prima apertura funziona anche senza connessione, tranne la lettura delle foto.
