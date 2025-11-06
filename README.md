# HsH Sprachschule – Projektbeschreibung (DE)

Dieses Projekt ist eine kleine Web‑App für eine Sprachschule. Nutzer können Kurse ansehen, Details lesen, Preise prüfen, einen Kurs in den Warenkorb legen und neue Kurse anlegen.

## Kurzüberblick

- Seiten: Start (Home), Kursliste, Kursdetails, Preisliste, Warenkorb, Kurs hinzufügen
- Komponenten: Navbar (mit Warenkorb‑Badge), Footer
- Persistenz: IndexedDB im Browser (Kurse und Warenkorb)
- Styling: Zentrales `src/App.css` + Bootstrap 5 + Bootstrap Icons
- Routing: React Router (Client‑Side Routing)

## Technische Daten (Stack)

- React 18 (Create React App 5)
- TypeScript
- React Router DOM 7
- Bootstrap 5, Bootstrap Icons
- IndexedDB (eigene Helper in `src/utils/db.ts`)

## Architektur und Dateien

- `src/App.tsx`: App‑Shell, Routing, Seed der Default‑Daten (IndexedDB)
- `src/index.tsx`: Einstieg, bindet Bootstrap CSS/JS und Icons ein
- `src/components/Navbar.tsx`: Navigation, Warenkorb‑Icon mit Badge; hört auf Event `cart:updated`
- `src/components/Footer.tsx`: Footer mit Links
- `src/pages/Home.tsx`: Startseite, “beliebte Kurse” Übersicht
- `src/pages/CourseList.tsx`: Alle Kurse als Karten
- `src/pages/CourseDetail.tsx`: Details zu einem Kurs (ID aus Route)
- `src/pages/PriceList.tsx`: Kurs auswählen, Personenanzahl, optional Apartment (+500€), in Warenkorb legen
- `src/pages/Cart.tsx`: Warenkorb als Tabelle, Position entfernen/alles leeren, Gesamtsumme
- `src/pages/AddCourse.tsx`: Formular, um neuen Kurs anzulegen (schreibt in IndexedDB)
- `src/utils/db.ts`: IndexedDB‑Abstraktion (Kurse/Warenkorb), Typen und CRUD‑Funktionen

## Datenmodell (TypeScript)

```
type CourseRecord = {
	course_id: number;
	title: string;
	description: string;
	image: string;      // Datei unter public/img
	price: number;      // Preis in €
	duration: number;   // Monate
};

type CartRecord = {
	cart_id?: number;        // Auto‑Increment
	course_id: number;       // Referenz auf CourseRecord
	price: number;           // Einzelpreis
	people_qty: number;      // Personenanzahl
	needs_appartment: boolean; // Apartment benötigt
	total: number;           // Gesamtpreis je Position
};
```

## IndexedDB‑Schema

- Datenbank: `hsh_sprachschule_db`, Version 2
- Stores:
  - `courses` (keyPath `course_id`, Index `title`)
  - `shopping_cart` (keyPath `cart_id`, autoIncrement, Index `course_id`)

Wichtige Funktionen (`src/utils/db.ts`):

- Kurse: `addCourse`, `getAllCourses`, `getAllCoursesEnsured`, `clearCourses`, `seedDefaultCoursesIfEmpty`
- Warenkorb: `addCartItem` (ersetzen gleicher Kurs‑Einträge), `getCartItems`, `removeCartItem`, `clearCart`

## Routing (Seiten)

- `/` → Home
- `/courses` → Kursliste
- `/course/:courseId` → Kursdetails
- `/prices` → Preisliste / Auswahl
- `/cart` → Warenkorb
- `/add-course` → Kurs hinzufügen

## Props & Hooks (Überblick)

- Props:
  - `pages/Cart.tsx`: optional `{ cartId?: number }` (filtert auf eine Position)
  - andere Seiten: keine speziellen Props
- Hooks (häufig):
  - `useState`, `useEffect` für Zustand & Laden
  - `useMemo` in Cart (Mapping & Summe)
  - `useParams` in CourseDetail (ID aus URL)
  - `useNavigate` in AddCourse (Navigation nach Speichern)

## Events

- Eigenes Browser‑Event: `cart:updated`
  - Gesendet nach Änderungen am Warenkorb (PriceList: Add/Update; Cart: Remove/Clear)
  - Empfangen in Navbar, um die Badge‑Zahl aktuell zu halten

## Styling & Assets

- Einheitliches Layout (max. Breite ~1200px) über CSS‑Hilfsklassen
- Bilder unter `public/img/` (z. B. `deutschkurs.jpg`, `home_1.jpg`)
- Preise mit Euro‑Zeichen `€` in Preisliste und Warenkorb

## Lokale Entwicklung (Windows PowerShell)

```powershell
npm install
npm start
```

Öffne http://localhost:3000 im Browser. Hot‑Reload ist aktiviert.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# hsh_sprachschule
