/**
 * German pages (/de/apps/<slug>) for the apps that can actually be used in
 * German. Only add an app here once the app itself speaks German, otherwise a
 * German page sends people to an app they cannot use.
 *
 * Fields override the English entry in appData.ts; anything left out (links,
 * screenshots, ratings) comes from there.
 */
import type { AppFAQ, AppFeature } from './appData';

export interface AppDe {
  tagline: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  longDescription: string[];
  features: AppFeature[];
  faqs: AppFAQ[];
  /** Always-visible notice, like the English NOTICE map */
  notice?: string;
  /** Shown under the download button */
  languageNote: string;
}

export const appsDe: Record<string, AppDe> = {
  'tidehook-fishing-tides': {
    tagline: 'Wissen, wann die Fische beißen, überall und ohne Netz',
    description:
      'Gezeiten, Beißzeiten nach Sonne und Mond und der richtige Köder für 85 Arten, berechnet direkt auf deinem iPhone aus 3.996 harmonischen Stationen. Funktioniert auch ohne Empfang am Wasser.',
    metaTitle: 'TideHook: Gezeiten-App zum Angeln, offline auf dem iPhone',
    metaDescription:
      'Echte harmonische Gezeitenvorhersagen von 3.996 Stationen, solunare Beißzeiten, Köder für 85 Arten und 1.339 Angelplätze. Funktioniert komplett offline, auf Deutsch.',
    longDescription: [
      'TideHook sagt dir, wann die Fische beißen, überall auf der Welt und ohne einen einzigen Balken Empfang. Gezeiten, solunare Fresszeiten und der passende Köder für 85 Arten werden direkt auf deinem iPhone berechnet. Die App funktioniert also auch am Ende eines Feldwegs an der Steilküste, wo sonst nichts mehr geht.',
      'Die Gezeiten sind echte Vorhersagen. Jede wird harmonisch aus 3.996 Stationen berechnet, mit derselben Mathematik wie die offiziellen Gezeitentafeln, und der Rechenkern wurde gegen die veröffentlichten Vorhersagen der NOAA geprüft: auf 1,7 cm genau. Du siehst die komplette Kurve für heute und die kommende Woche.',
      'Dazu kommt, was über einen guten Angeltag entscheidet: Beißzeiten aus Sonne und Mond, damit du das beste Zwei-Stunden-Fenster kennst, bevor du losfährst. Ein Köder- und Montagenführer für 85 Arten. Eine Karte mit 1.339 Angelplätzen in 166 Ländern, filterbar nach Zielfisch, mit Vorschau auf die nächsten 24 Stunden. Lange auf die Karte drücken liefert die Gezeiten für jeden Punkt, den keine App kennt.',
      'Das Fangbuch speichert Gezeitenstand, Mond und Koeffizient zu jedem Fisch und zeigt dir, unter welchen Bedingungen du selbst am besten fängst. Widgets, Gezeitenalarme und 27 Sprachen sind dabei. Nur die Kartenkacheln brauchen eine Verbindung. TideHook ist ein Werkzeug zum Angeln, kein Navigationshilfsmittel.',
    ],
    features: [
      { title: 'Echte harmonische Gezeiten', text: '3.996 Stationen, direkt auf dem Gerät berechnet und gegen die NOAA auf 1,7 cm genau geprüft.' },
      { title: 'Beißzeiten nach Sonne und Mond', text: 'Das beste Zwei-Stunden-Fenster des Tages, bevor du die Fahrt antrittst.' },
      { title: 'Köder und Montagen für 85 Arten', text: 'Mit der Montage und dem Gezeitenstand, die zu jedem Fisch passen.' },
      { title: '1.339 Angelplätze in 166 Ländern', text: 'Nach Zielfisch filtern und sehen, wo die Gezeit gerade passt.' },
      { title: 'Ein Fangbuch, das mitdenkt', text: 'Zeigt dir aus deinen eigenen Fängen den besten Gezeitenstand, die beste Tageszeit und den besten Köder.' },
      { title: 'Funktioniert ohne Netz', text: 'Gezeiten, Sonne und Mond, Artenführer und Angelplätze liegen auf deinem iPhone.' },
    ],
    faqs: [
      { q: 'Funktioniert TideHook offline?', a: 'Ja. Gezeiten, solunare Berechnungen, Artenführer und Angelplätze werden auf dem iPhone berechnet. Nur die Kartenkacheln brauchen eine Verbindung.' },
      { q: 'Was kostet TideHook?', a: 'Der Download ist kostenlos und startet mit einer Testphase. Danach brauchst du ein Abo oder den einmaligen Lifetime-Kauf. Eine kostenlose Version ohne Testphase gibt es nicht. Die Preise siehst du in der App, bevor du kaufst.' },
      { q: 'Ist die App auf Deutsch?', a: 'Ja, TideHook ist in 27 Sprachen verfügbar, darunter Deutsch. Die Beschreibung im App Store ist derzeit auf Englisch.' },
      { q: 'Kann ich TideHook zur Navigation verwenden?', a: 'Nein. TideHook ist ein Werkzeug zur Planung beim Angeln, kein Navigationshilfsmittel. Nutze es nie für die Törnplanung oder die Sicherheit auf See.' },
    ],
    notice: 'TideHook ist ein Werkzeug zum Planen beim Angeln, kein Navigationshilfsmittel. Nutze es nie für die Törnplanung oder die Sicherheit auf See.',
    languageNote: 'App auf Deutsch · Store-Beschreibung auf Englisch',
  },

  'baby-growth-tracker-pro': {
    tagline: 'WHO-Wachstumskurven, Impftermine und alle Antworten an einem Ort',
    description:
      'Vom ersten positiven Test bis zur letzten Impfung im Kleinkindalter: WHO-Perzentilen, der Impfplan deines Landes, Erinnerungen fürs Füttern und Schlafen und 100 Antworten auf die Fragen, die Eltern nachts um drei googeln.',
    metaTitle: 'Baby Growth Tracker Pro: WHO-Perzentilen & Impfplan als App',
    metaDescription:
      'Trage Gewicht, Länge und Kopfumfang auf echten WHO-Kurven ein, behalte Impftermine im Blick und plane Mahlzeiten, Schlaf und Meilensteine. Auf Deutsch, ohne Konto.',
    longDescription: [
      'Vom ersten positiven Test bis zur letzten Impfung im Kleinkindalter hält Baby Growth Tracker Pro alle Antworten an einem Ort bereit. Du siehst dieselbe WHO-Wachstumskurve, die auch deine Kinderärztin liest, weißt, welche Impfung wann fällig ist, und planst den Tag ohne nächtliche Suche im Netz. Es sind Bildungsinhalte, keine medizinische Beratung.',
      'Die Schwangerschaft begleitet die App Woche für Woche: Größe und Entwicklung deines Babys, Untersuchungen zum Abhaken, Tritte zählen und die Warnzeichen, bei denen du noch am selben Tag anrufen solltest. Nach der Geburt trägst du ein Gewicht ein und siehst sofort die Perzentile auf den WHO Child Growth Standards für Gewicht, Länge und Kopfumfang, von der Geburt bis fünf Jahre, mit korrigiertem Alter für Frühchen.',
      'Wähle den Impfplan für Portugal, Großbritannien oder die USA, oder die WHO-Vorlage, und sieh jede Dosis mit Fälligkeitsdatum, wovor sie schützt und was danach zu erwarten ist. Füttern, Medikamente, Schlaf und Arzttermine kommen als Erinnerungen, die du direkt vom Sperrbildschirm abhaken kannst.',
      'Dazu: kurze, belegte Antworten auf 100 Fragen, die Eltern nachts stellen, Meilensteine mit Normalbereichen statt Stichtagen, Notizen und Fotos für jedes Kind und ein Wechsel zwischen Geschwistern. Kein Konto, kein Tracking, alles bleibt auf deinem iPhone.',
    ],
    features: [
      { title: 'Echte WHO-Perzentilen', text: 'Gewicht, Länge und Kopfumfang von der Geburt bis fünf Jahre, mit korrigiertem Alter für Frühchen.' },
      { title: 'Impfungen mit Datum', text: 'Pläne für Portugal, Großbritannien und die USA oder die WHO-Vorlage, jede Dosis mit Fälligkeit.' },
      { title: 'Schwangerschaft Woche für Woche', text: 'Entwicklung, Untersuchungen, Tritte zählen und die Warnzeichen, die einen Anruf brauchen.' },
      { title: 'Erinnerungen für den Alltag', text: 'Füttern, Medikamente, Schlaf und Termine, abhakbar direkt vom Sperrbildschirm.' },
      { title: '100 Fragen, die Eltern stellen', text: 'Kurze, belegte Antworten und ein verständlicher Leitfaden für jede Phase.' },
      { title: 'Privat von Anfang an', text: 'Kein Konto, kein Tracking. Alles bleibt auf deinem Gerät.' },
    ],
    faqs: [
      { q: 'Ist Baby Growth Tracker Pro kostenlos?', a: 'Der Download ist kostenlos. Ein Plus-Abo schaltet die Kurven für Länge und Kopfumfang frei, monatlich oder jährlich und jederzeit kündbar.' },
      { q: 'Gibt es den deutschen Impfplan?', a: 'Noch nicht. Die App enthält die Impfpläne für Portugal, Großbritannien und die USA sowie die WHO-Vorlage. Für Deutschland gilt der Impfkalender der STIKO; sprich mit deiner Kinderarztpraxis.' },
      { q: 'Ist das medizinische Beratung?', a: 'Nein. Die App erklärt, sie stellt keine Diagnosen. Entscheidungen über dich und dein Baby gehören zu deiner Ärztin oder deinem Arzt.' },
      { q: 'Ist die App auf Deutsch?', a: 'Ja, die App ist auf Deutsch verfügbar. Die Beschreibung im App Store ist derzeit auf Englisch.' },
    ],
    notice: 'Bildungsinhalte, keine medizinische Beratung. Entscheidungen über dich und dein Baby gehören zu deiner Ärztin oder deinem Arzt.',
    languageNote: 'App auf Deutsch · Store-Beschreibung auf Englisch',
  },

  'kids-science-explorer': {
    tagline: 'Echte Wissenschaft für Kinder von 4 bis 12',
    description:
      'Dreizehn Welten echter Wissenschaft, vom Sonnensystem über Dinosaurier bis zum menschlichen Körper. Jede Seite wird vorgelesen, alles funktioniert offline, ohne Werbung und ohne Datensammeln.',
    metaTitle: 'Kids Science Explorer: Wissenschafts-App für Kinder, offline',
    metaDescription:
      'Wissenschaft für Kinder von 4 bis 12: 13 Welten, 10 Lernspiele und 12 Experimente für den Küchentisch. Auf Deutsch vorgelesen, offline, ohne Werbung.',
    longDescription: [
      'Bildschirmzeit, bei der du kein schlechtes Gewissen haben musst. Kids Science Explorer gibt neugierigen Kindern dreizehn Welten echter Wissenschaft in die Hand, vom Sonnensystem über Dinosaurier bis zum menschlichen Körper. Jede Seite wird vorgelesen, deshalb kann auch ein Kind, das noch nicht lesen kann, die ganze App allein erkunden.',
      'Zehn Spiele, bei denen Kinder wirklich etwas lernen: Planeten auf ihre Umlaufbahn ziehen, einen Körper Organ für Organ zusammensetzen, herausfinden, ob ein Dinosaurier Fleisch oder Pflanzen fraß, und echte Sterne zu echten Sternbildern verbinden. Dazu zwölf Experimente mit Dingen, die ohnehin im Küchenschrank stehen, in klaren Schritten zum gemeinsamen Ausprobieren.',
      'Die App wächst mit: Drei Lesestufen sorgen dafür, dass ein Vierjähriges und ein Elfjähriges dasselbe Thema in der passenden Tiefe erleben. Neun Sprachen sind eingebaut, darunter Deutsch, jeweils mit einer freundlichen Stimme, die jede Seite vorliest.',
      'Gemacht fürs Auto, den Flieger und das Wartezimmer: komplett offline, nichts zu laden, nichts, was ohne Netz abbricht. Keine Werbung, keine Datensammlung, kein Chat und keine Links ins offene Internet. Ein Abo deckt über die Familienfreigabe die ganze Familie ab.',
    ],
    features: [
      { title: 'Dreizehn Welten', text: 'Weltraum, Nachthimmel, Erde, Natur, Dinosaurier, Körper, Wasser, Feuer, Energie, Schwerkraft, Maschinen, Chemie und ein Heimlabor.' },
      { title: 'Zehn Lernspiele', text: 'Jedes Spiel bringt etwas Wahres bei, statt Punkte fürs Tippen zu verteilen.' },
      { title: 'Zwölf Küchenexperimente', text: 'Mit Dingen aus dem Schrank, Schritt für Schritt gemeinsam mit einem Erwachsenen.' },
      { title: 'Drei Lesestufen', text: 'Dasselbe Thema in der richtigen Tiefe für jedes Alter von 4 bis 12.' },
      { title: 'Auf Deutsch vorgelesen', text: 'Neun Sprachen, jede mit einer Stimme, die jede Seite vorliest.' },
      { title: 'Sicher gebaut', text: 'Offline, keine Werbung, keine Daten, kein Chat, keine Links nach draußen.' },
    ],
    faqs: [
      { q: 'Für welches Alter ist die App?', a: 'Für Kinder von 4 bis 12 Jahren. Drei Lesestufen passen die Tiefe an das Alter an.' },
      { q: 'Ist die App auf Deutsch?', a: 'Ja. Deutsch ist eine von neun eingebauten Sprachen, und jede Seite wird auf Deutsch vorgelesen. Die Beschreibung im App Store ist derzeit auf Englisch.' },
      { q: 'Braucht die App Internet?', a: 'Nein. Alles funktioniert offline, ideal für Auto, Flugzeug und Wartezimmer.' },
      { q: 'Was kostet sie?', a: 'Der Download ist kostenlos. Ein Abo schaltet alles frei und gilt über die Familienfreigabe für die ganze Familie. Kündbar jederzeit in den Einstellungen deines Apple-Accounts.' },
    ],
    languageNote: 'App auf Deutsch · Store-Beschreibung auf Englisch',
  },

  'learn-spanish-with-lola': {
    tagline: 'Spanisch lernen, wie man es in Spanien spricht',
    description:
      'Das Spanisch, das man in Spanien wirklich spricht, mit dem Land dahinter: über 1.000 Wörter mit kastilischer Aussprache, 50 Verben, 30 Slang-Ausdrücke und alle 17 Regionen. Die App erklärt alles auf Deutsch.',
    metaTitle: 'Lola: Spanisch lernen für Spanien, auf Deutsch erklärt',
    metaDescription:
      'Lerne kastilisches Spanisch mit über 1.000 Wörtern mit Audio, 50 Verben, Slang, 10 Spielen und allen 17 Regionen Spaniens. Die App spricht Deutsch, ohne Konto.',
    longDescription: [
      'Learn Spanish with Lola bringt dir das Spanisch bei, das man in Spanien wirklich spricht, und das Land dahinter. Die meisten Apps setzen auf lateinamerikanisches Spanisch; Lola ist auf kastilische Aussprache, Wortschatz und die Alltagsgewohnheiten aufgebaut, die die Sprache verständlich machen, sobald du gelandet bist.',
      'Über 1.000 Wörter und Sätze mit echter kastilischer Aussprache, Lautschrift und Beispielsatz, 50 wichtige Verben in Gegenwart, Vergangenheit und Zukunft und 30 Slang-Ausdrücke, die im Lehrbuch fehlen. Die Gespräche spielen dort, wo du sie brauchst: im Restaurant, im Taxi, im Hotel, im Laden.',
      'Karteikarten holen die Wörter zurück, die du falsch hattest, zehn Spiele entstehen aus deinem eigenen Wortschatz, und ein Aussprachetest hört zu und bewertet dich. Die ganze App kann auf Deutsch genutzt werden.',
      'Die andere Hälfte ist Spanien selbst: alle 17 Regionen mit Städten, Essen und Geschichte, dazu Fiestas, Flamenco, Tapas, Fußball und warum das Abendessen erst um zehn beginnt. Kein Konto, kein Tracking, dein Fortschritt bleibt auf dem Gerät. Die App startet mit einer kostenlosen Testphase und läuft danach als Abo.',
    ],
    features: [
      { title: 'Echtes kastilisches Spanisch', text: 'Über 1.000 Wörter und Sätze mit Aussprache, Lautschrift und Beispielsatz.' },
      { title: '50 Verben in drei Zeiten', text: 'Die wichtigsten Verben, vollständig konjugiert.' },
      { title: 'Slang und echte Gespräche', text: '30 Ausdrücke, die im Lehrbuch fehlen, und Dialoge für Restaurant, Taxi, Hotel und Laden.' },
      { title: '10 Spiele und ein Aussprachetest', text: 'Spiele aus deinem eigenen Wortschatz und ein Test, der zuhört.' },
      { title: 'Alle 17 Regionen Spaniens', text: 'Städte, Essen, Geschichte und Gewohnheiten, von der Alhambra bis Galicien.' },
      { title: 'Auf Deutsch erklärt', text: 'Die ganze App spricht zehn Sprachen, darunter Deutsch.' },
    ],
    faqs: [
      { q: 'Lerne ich Spanisch aus Spanien oder Lateinamerika?', a: 'Aus Spanien. Lola ist auf kastilisches Spanisch aufgebaut: Aussprache, Wortschatz und Slang, wie du sie in Madrid, Málaga oder Bilbao hörst.' },
      { q: 'Kann ich die App auf Deutsch nutzen?', a: 'Ja. Die ganze App kann auf Deutsch genutzt werden. Die Beschreibung im App Store ist derzeit auf Englisch.' },
      { q: 'Was kostet Lola?', a: 'Der Download ist kostenlos und startet mit einer Testphase im Jahresabo. Danach läuft die App als Abo, kündbar jederzeit in den Einstellungen deines Apple-Accounts.' },
      { q: 'Brauche ich ein Konto?', a: 'Nein. Keine Anmeldung, keine E-Mail, keine Analyse. Dein Fortschritt bleibt auf deinem Gerät.' },
    ],
    languageNote: 'App auf Deutsch · Store-Beschreibung auf Englisch',
  },
};

export const deSlugs = Object.keys(appsDe);
