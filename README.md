# Sklep Pati

Projekt "Sklep Pati" — blog i platforma E-lerningowa stworzona w Next.js + Prisma. Aplikacja zawiera panel użytkownika, blog, integracje płatności oraz zarządzanie artykułami i multimediami.

## Technologie

- Next.js (app directory)
- TypeScript
- Prisma (Postgres/SQLite - konfigurowalne)
- CSS Modules / global CSS
- NextAuth

## Funkcje

- Rejestracja i logowanie użytkowników
- Zarządzanie kontem użytkownika
- Strona blogowa z możliwością dodawania i edycji artykułów za pomocą dedykowanego CMS
- Sklep / zakupy (integracja płatności)
- Panel użytkownika (zakupy, filmy, ustawienia)
- usługi VOD

## Struktura projektu (skrót)

- `app/` — główne strony i routing (Next.js App Router)
- `components/` — komponenty UI i moduły
- `api/` — API routes (server actions / API endpoints)
- `lib/` — helpery, konfiguracje (np. `prisma.ts`, `nextAuth.ts`)
- `prisma/` — schema i migracje Prisma
- `public/` — zasoby statyczne (obrazy, wideo)
