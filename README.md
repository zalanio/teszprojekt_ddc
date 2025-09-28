# Projekt Nyilvántartó App

Egyszerű, reszponzív Vue 3 alkalmazás, amellyel projekteket lehet hozzáadni, módosítani, törölni és listázni.

## Funkciók

- Vue 3 + Vite alapon
- Pinia állapotkezelés
- Projekt hozzáadás / módosítás / törlés
- Keresőmező a lista nézeten
- Dátum és költségvetés formázása `Intl.DateTimeFormat` és `Intl.NumberFormat` segítségével
- Toast üzenetek a műveletek után
- LocalStorage-ban tárolás (újratöltés után is megmarad)
- Reszponzív, mobilbarát felület Tailwind utility-osztályokkal
- Újrafelhasználható komponensek (AppTextInput, ProjectTable)
- Alap egységtesztek Vitest-tel (validáció és storage logika)

## Projektstruktúra

projekt-nyilvantarto/
## Projektstruktúra

```text
projekt-nyilvantarto/
├─ README.md
├─ package.json
├─ vite.config.js
├─ public/
│  └─ favicon.ico
└─ src/
   ├─ App.vue                     # fő alkalmazás layout
   ├─ main.js                    # belépési pont (Pinia + Router + Toast)
   ├─ router/
   │  └─ index.js                # útvonalak
   ├─ components/
   │  ├─ Navbar.vue              # felső navigáció
   │  ├─ AppTextInput.vue        # újrafelhasználható input mező
   │  └─ ProjectTable.vue        # projektlista táblázatos megjelenítése
   ├─ composables/
   │  ├─ useProjectStorage.js    # LocalStorage logika (CRUD)
   │  ├─ useFilters.js           # keresőmező / szűrés logika
   │  ├─ useValidation.js        # űrlapvalidáció logika
   │  └─ useNotify.js            # egységes toast üzenetek
   ├─ utils/
   │  ├─ formatDate.js           # dátum formázás Intl-lel
   │  └─ formatCurrency.js       # pénznem formázás Intl-lel
   ├─ views/
   │  ├─ ProjectList.vue         # projektlista oldal
   │  └─ ProjectForm.vue         # új projekt / módosítás oldal
   └─ tests/
      ├─ useValidation.test.js   # egységteszt validációhoz
      └─ useProjectStorage.test.js # egységteszt storage logikához


## Telepítés és futtatás

```bash
git clone https://github.com/zalanio/teszprojekt_ddc.git
cd "teszprojekt_ddc"
npm install
npm run dev
