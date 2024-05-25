# TravelAgency - Projektowanie Aplikacji Internetowych

![Trips listing](pics/trips-listing.png)

---

## Spis treści
* [Przegląd](#Przegląd)
* [Technologie](#Technologie)
* [Kluczowe komponenty](#Kluczowe-komponenty)
* [Kluczowe funkcjonalności](#Kluczowe-funkcjonalności)
* [Dokumentacja techniczna](#Dokumentacja-techniczna)
* [Setup](#Setup)
* [Stan rozwoju aplikacji](#Stan-rozwoju-aplikacji)
* [Licencja](#Licencja)

## Przegląd
[TravelAgency](https://github.com/JakubNowobilski/TravelAgency) powstał jako część projektu zaliczeniowego z przedmiotu
Wprowadzenie do Aplikacji Internetowych. Oryginalnie aplikacja korzystała z bazy danych w chmurze:
Google [Firebase Realtime Database](https://firebase.google.com/docs/database). Na potrzeby przedmiotu
Projektowanie Aplikacji Internetowych zrezygnowane z tego rozwiązania i wprowadzono bardziej standardowe rozwiązanie
oparte o bazę dokumentową [MongoDB](https://www.mongodb.com/) oraz backend aplikacji zrealizowany w
[NodeJS](https://nodejs.org/en).
Aplikacja dostarcza funkcjonalność prostej agencji podróży. Pozwala na przeglądanie wycieczek oraz dokonywanie
rezerwacji. Funkcjonalności administratora obejmują dodawanie nowych wycieczek oraz ustawienie tryb persystencji
uwierzytelniania. Wszystkie oryginalne wymagania wobec aplikacji znajdują się w [wymaganiach projektu](project_requirements.txt).


## Technologie
* [Angular 11.2.11](https://v11.angular.io/docs)
* [AngularFire 6.1.4](https://github.com/angular/angularfire)
* [MongoDB](https://www.mongodb.com/)
* [NodeJS](https://nodejs.org/en)
* [Express](https://expressjs.com/)
* [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/)
* [Firebase Authentication](https://firebase.google.com/docs/auth)
* [Firebase Cloud Storage](https://firebase.google.com/docs/storage)

## Kluczowe komponenty
### Listing wycieczek
![tips-listing](pics/trips-listing.png)
   
### Szczegóły wycieczki
![trip-details](pics/trip-details.png)

### Ekran logowania
![sign-in](pics/sign-in.png)

### Dodanie nowej wycieczki
![add-trip](pics/add-trip.png)

### Koszyk
![basket](pics/basket.png)

## Kluczowe funkcjonalności
* **Dostawca danych** - dane przechowywane są w dokumentowej bazie danych [MongoDB](https://www.mongodb.com/).
Przechowuje ona dane dotyczące wycieczek oraz użytkowników i ich ról. Obrazy przechowywane są w usłudze
[Firebase Cloud Storage](https://firebase.google.com/docs/storage).
* **Użytkownicy oraz uwierzytelnianie** - Użytkownicy uwierzytelniani są za pomocą usługi
[Firebase Authentication](https://firebase.google.com/docs/auth). Istnieją 4 rodzaje ról użytkownika:
  * **Gość** (użytkownik niezalogowany) - posiada najmniej uprawnień. Może jedynie przeglądać wycieczki.
  * **Czytelnik** (użytkownik zalogowany) - regularny użytkownik. Może przeglądać wycieczki oraz dokonywać rezerwacji.
Każdy może zarejestrować się jako ten typ użytkownika.
  * **Pracownik** (agencji podróży) - może dodawać nowe wycieczki. Wycieczki mogą być stworzone wyłącznie ręcznie.
  * **Administrator** - posiada wszystkie uprawnienia jak Pracownik. Dodatkowo może usuwać wycieczki oraz zarządzać
persystencją uwierzytelniania.
* **Widoki kontekstowe** - dodatkowe panele menu, przyciski oraz inne komponenty widocznej jedynie dla odpowiednich
typów użytkowników.

  | ![guest-navbar](pics/guest-navbar.png) |
  |:--------------------------------------:|
  |        *Panel nawigacji Gościa*        |

  | ![guest-navbar](pics/admin-navbar.png) |
  |:--------------------------------------:|
  |    *Panel nawigacji Administratora*    |

* **Strażnicy (Guards)** - strażnicy są skonfigurowani aby blokować dostęp do niektórych komponentów aplikacji
przed nieautoryzowanymi użytkownikami. Przykładowo Goście (niezalogowani użytkownicy) nie mają dostępu do widoku koszyka,
a jeśli spróbują przejść do strony koszyka poprzez wpisanie adresu URL koszyka zostaną przekierowani do strony
<em>nieznaleziono</em>.

## Dokumentacja techniczna

Aplikacja ma typową trójwarstwową architekturę. Składa się z bazy danych MongoDB, backendu zaimplementowanego w NodeJS
oraz frontendu zaimplementowanego w Angularze. Komunikacje między frontendem a backendem jest zrealizowana za pomocą
REST API.

![system-architecture](pics/system-architecture.png)

### Baza danych
Wykorzystana w projekcie baza danych to dokumentowa baza danych [MongoDB](https://www.mongodb.com/).
Składa się z dwóch kolekcji **trips** oraz **users**. Nie posiada ona ustalonego schematu danych, ale obiekty tych
kolekcji składają się z następujących pól:
#### trips
    {
        _id: string,
        name: string,
        country: string,
        dateStart: Date,
        dateEnd: Date,
        price: number,
        maxPlaces: number,
        bookedPlaces: number,
        description: string,
        imgURL: string
    }

#### users
    {
        _id: string,
        email: string,
        role: string
    }

### Backend
Backend aplikacji stanowi serwer HTTP napisany w [NodeJS](https://nodejs.org/en). Do obsługi zapytań wykorzystywana jest
biblioteka [Express](https://expressjs.com/). Aplikacja składa się z dwóch kontrolerów: **trpis_controller** oraz
**users_controller**. Każdy z nich odpowiada za obsługiwanie żądań HTTP dla odpowiednich końcówek. Serwer obsługuje
typowe zapytania CRUD dla obydwu kontrolerów: Create, Read, Update, Delete.
Połączenie z bazą danych jest zrealizowane za pomocą sterownika
[MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/).

![backend-schema](pics/backend-schema.png)

Dodatkowo, backend zawiera skrypt pomocniczy, który pozwoli załadować dane demo do bazy danych:
[drop_update_demo.js](../backend/src/drop_update_demo.js)

### Frontend
Frontend aplikacji został zaimplementowany przy użyciu popularnego frameworku [Angular](https://v11.angular.io/docs).
Kod został typowo pogrupowany w moduły wydzielając logicznie funkcje każdego z nich:

* **model** - zawiera reprezentację modelu biznesowego aplikacji. Składa się z dwóch klas: **trip** oraz **user**
* **components** - zawiera re-używalne komponenty Angulara - małe fragmenty aplikacji internetowej
* **pages** - zawiera główne strony aplikacji w formie komponentów Angulara
* **services** - zawiera serwisy aplikacji pozwalające na komunikację się między komponentami oraz dostęp do danych:
  * **auth** - serwis realizujący logikę uwierzytelniania
  * **trips** - serwis dostępu do danych związanych z wycieczkami
  * **users** - serwis dostępu do danych związanych z użytkownikami
* **navigation** - komponent Angulara będący głównym paskiem nawigacji w aplikacji
* **guard** - zawiera strażników obsługujących logikę kontroli dostępu do poszczególnych części aplikacji

## Setup
Jeśli chcesz samodzielnie użytkować aplikację, jest kilka kroków, które musisz wykonać aby uruchomić ją na swoim
urządzeniu.
1. Zarejestruj się do [Google Firebase](https://firebase.google.com/).
2. Skonfiguruj magazynowanie (cloud storage) i prześlij [przykładowe obrazy](assets/sample-pics).
3. W konsoli Firebase przejdź do ustawień projektu, znajdź odpowiednią konfigurację SDK i skopiuj ją do
[environment.ts](../src/environments/environment.ts) oraz [environment.prod.ts](../src/environments/environment.prod.ts).
4. Uruchom serwer MongoDB na porcie 27017
5. Przejdź do folderu [backend](../backend) i uruchom **npm install**
6. Aby dodać dane demo ([sample data](assets/sample-data.json)) uruchom **node drop_update_demo.js**
7. Uruchom serwer aplikacji za pomocą **node travel_agency_server.js**
8. Przejdź do folderu [fronted](../frontend) i uruchom **npm install**
9. Uruchom **ng serve**
10. Otwórz aplikację w przeglądarce pod adresem [localhost:4200](http://localhost:4200/)

## Stan rozwoju aplikacji

Praca nad projektem jest zakończona, ale poniżej przedstawionych jest kilka możliwość rozwoju aplikacji:
* Filtrowanie oraz sortowanie wycieczek
* Implementacja RWD (Responsive Web Design)
* Implementacja indywidualnych koszyków użytkownika
* Implementacja systemu ocen wycieczek  
* Przesyłanie obrazów wycieczek
* Stworzenie procesu rezerwacji wycieczek

## Licencja

Projekt jest licencjonowany pod warunkami [licencji](LICENSE.md) MIT.
