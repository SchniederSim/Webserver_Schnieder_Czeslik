Dies ist das Web-Shop Projekt von Simon Schnieder und Jonas Czeslik, erstellt im Rahmen der Projektarbeit fürs Web- und Multimediatechnologien Modul.

!!!!WICHTIG!!!!
Für die leichtere Versionsverwaltung der Datenbank hatten wir eine Datenbank auf bzw. mit remotemysql.com erstellt.
DIESE IST LEIDER NICHT MEHR ERREICHBAR.

Um sich trotzdem manuell ein Benutzen/testen zu ermöglichen, befindet sich die sql der Datenbank mit in diesem Repository.

DAHER MUSS DIE DATENBANK-KONFIGURATION IM NODE WEBSERVER INDEX.JS, Z. 13-19 ENTSPRECHEND ANGEPASST WERDEN.


Starten des WebServers: Im Projektordner über cmd 'node index.js' aufrufen.
                        Bei fehlermeldung "Cannot find module 'modulname'" ggf. 'npm i modulname' ausführen.
                        Bei fehlermeldung "connect ECONNREFUSED". s.o: Bitte Datenbank Konfiguration in index.js Z.13-19 anpassen.
                        
Zugriff im Browser über localhost:3000
