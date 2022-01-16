

![Logo](https://ems.vl6.spal.at/images/readme-logo.png)


# AmPm - Zeiterfassung auto-provisioniert

[![GitHub release](https://img.shields.io/badge/release-v1.0.0-blue)](https://git.mci4me.at/kt7926/AmPm/releases)

Die Idee dieser Applikation ist die Entwicklung einer unkomplizierten mobilen Arbeitszeiterfassung für größere Unternehmen, zur Entlastung der IT- bzw. Verwaltungs-Abteilung. Ziel dieses Projektes ist nicht, die hundertste Zeiterfassungs-Lösung aufzubauen, sondern primär das vereinfachte Bereitstellen durch die Administratorin oder den Administratoren.
Die App an sich soll ein gewohntes respektive klassisches UI, wie bei Mitbewerbern bieten. Hierbei soll jedoch keine herkömmliche Login-View existieren. Das Zuweisen eines Telefons zum Mitarbeiter passiert per Auto-Provisioning über einen QR Code, welcher als Art One-Time-Pad fungiert. Im Detail sollte der QR Code von der Verwaltung (neu-)generiert werden können und nach dem erstmaligen Einscannen entwertet werden. Die App selbst speichert sich dann automatisiert den Ziel Endpoint ab und fragt dort einen Token an. Die Gültigkeitsdauer der Tokens kann von Administrator:innen definiert werden.

## Funktionsweise

Sobald der Mitarbeiter den Code in der App gescannt hat und diese dann automatisch eingerichtet wurde, wird ein recht simples Interface angezeigt. Der Benutzer hat am „Dashboard“ genau einen einzigen Button. Der Button „Stempeln“. Zusätzlich dazu gibt es in einem Menü die Möglichkeit die eigenen täglichen Zeiten einzusehen und zu dem die Urlaubstage und Überstunden. Ein Wechsel des Profils (insbesondere bei Firmen-Telefonen) ist leicht möglich.

## Installation 
Nach dem Klonen muss einmal das Commandlet ```npm install``` ausgeführt werden.
Danach kann die App per Expo mittels ```expo start```  oder ```expo r -c``` gestartet werden.

## Testing

Die Provisionierung kann mit folgenden Tokens getestet werden.

**Infinite Token**

Dieser Token ist in der Datenbank als *infinite* hinterlegt und somit immer gültig. 

![Infinite Token](https://ems.vl6.spal.at/images/test/infinite.png)

**Invalid Token**

Dieser Token stellt einen entwerteten respektive ungültigen Token dar.

![Invalid Token](https://ems.vl6.spal.at/images/test/invalid.png)

