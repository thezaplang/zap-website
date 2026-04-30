# Requirements Document

## Introduction

Projekt polega na stworzeniu szczegółowej, profesjonalnej dokumentacji języka programowania Zap, zintegrowanej z istniejącą stroną Astro Starlight (`src/content/docs/`). Dokumentacja ma zastąpić i znacznie rozszerzyć obecne szkicowe strony w `src/content/docs/guides/` i `src/content/docs/std/`, oferując wyczerpujące opisy składni, typów danych, struktur kontrolnych, klas, modułów, zarządzania pamięcią, generics, obsługi błędów, FFI i unsafe — wszystko poparte bogatymi, działającymi przykładami kodu zaczerpniętymi z `zap/example/`.

Dokumentacja jest skierowana do dwóch grup: programistów znających Go lub Rust, którzy chcą poznać Zap, oraz do obecnych użytkowników Zap szukających szczegółowego opisu konkretnych funkcji języka.

## Glossary

- **Zap**: Kompilowany język programowania systemowego z backendem LLVM, modelem pamięci ARC i nowoczesną składnią.
- **Starlight**: Framework dokumentacyjny oparty na Astro, używany do renderowania strony `src/content/docs/`.
- **ARC**: Automatic Reference Counting — mechanizm zarządzania pamięcią stosowany przez Zap dla obiektów klasy.
- **Failable_Function**: Funkcja, której typ zwracany ma postać `T!ErrorEnum`, sygnalizując możliwość niepowodzenia.
- **Guide_Page**: Strona dokumentacji w katalogu `src/content/docs/guides/` opisująca konkretną funkcję języka.
- **Std_Page**: Strona dokumentacji w katalogu `src/content/docs/std/` opisująca moduł biblioteki standardowej.
- **Getting_Started_Page**: Strona `src/content/docs/getting-started/index.md` będąca punktem wejścia dla nowych użytkowników.
- **Sidebar**: Nawigacja boczna skonfigurowana w `astro.config.mjs`.
- **Code_Block**: Blok kodu Markdown z podświetlaniem składni dla języka `zap`.
- **Frontmatter**: Sekcja YAML na początku pliku Markdown zawierająca `title` i `description`.
- **Doc_Author**: Osoba tworząca lub aktualizująca dokumentację.
- **Reader**: Programista korzystający z dokumentacji Zap.

---

## Requirements

### Requirement 1: Strona Getting Started

**User Story:** As a Reader, I want a comprehensive getting-started page, so that I can install Zap, write my first program, and understand the basic workflow within minutes.

#### Acceptance Criteria

1. THE Getting_Started_Page SHALL contain sekcję instalacji opisującą kompilację ze źródeł oraz instalację przez skrypt `install-latest.sh`.
2. THE Getting_Started_Page SHALL zawierać kompletny przykład programu `Hello, Zap!` z importem `std/io`, funkcją `main() Int` i instrukcją `return 0;`.
3. THE Getting_Started_Page SHALL opisywać polecenie kompilacji `zapc` wraz z flagą `--allow-unsafe` i opcją `-o`.
4. WHEN Reader przegląda Getting_Started_Page, THE Getting_Started_Page SHALL prezentować przykłady w Code_Block z oznaczeniem języka `zap`.
5. THE Getting_Started_Page SHALL zawierać linki do kolejnych sekcji dokumentacji (Variables, Functions, Control Flow).

---

### Requirement 2: Dokumentacja zmiennych i typów

**User Story:** As a Reader, I want a detailed variables and types guide, so that I can understand all primitive types, variable declarations, constants, globals, and type aliases available in Zap.

#### Acceptance Criteria

1. THE Guide_Page dla zmiennych SHALL opisywać deklarację `var` z jawną adnotacją typu oraz możliwość deklaracji bez inicjalizacji.
2. THE Guide_Page dla zmiennych SHALL wymieniać wszystkie typy prymitywne: `Int`, `Int8`, `Int16`, `Int32`, `Int64`, `UInt`, `UInt8`, `UInt16`, `UInt32`, `UInt64`, `Float`, `Float32`, `Float64`, `Bool`, `Char`, `String`, `Void`.
3. THE Guide_Page dla zmiennych SHALL opisywać `const` z zasadą obowiązkowej inicjalizacji i zakazem ponownego przypisania.
4. THE Guide_Page dla zmiennych SHALL opisywać `global var` jako mutowalny stan na poziomie modułu.
5. THE Guide_Page dla zmiennych SHALL opisywać `alias` jako mechanizm tworzenia nazw dla istniejących typów.
6. WHEN Reader szuka informacji o wskaźnikach, THE Guide_Page dla zmiennych SHALL zawierać wzmiankę o typach wskaźnikowych `*Type` i odesłanie do strony Unsafe.
7. THE Guide_Page dla zmiennych SHALL zawierać co najmniej trzy Code_Block z działającymi przykładami dla każdej z kategorii: `var`, `const`, `global var`, `alias`.

---

### Requirement 3: Dokumentacja funkcji

**User Story:** As a Reader, I want a complete functions guide, so that I can declare, call, and compose functions using all supported parameter and return-type patterns.

#### Acceptance Criteria

1. THE Guide_Page dla funkcji SHALL opisywać składnię `fun name(params) ReturnType { ... }` z typem zwracanym po liście parametrów.
2. THE Guide_Page dla funkcji SHALL opisywać funkcje `Void` (bez jawnego typu zwracanego lub z `Void`).
3. THE Guide_Page dla funkcji SHALL opisywać parametry `ref` z obowiązkiem użycia słowa kluczowego `ref` zarówno w deklaracji, jak i w miejscu wywołania.
4. THE Guide_Page dla funkcji SHALL opisywać przeciążanie funkcji (overloading) z zasadą rozwiązywania niejednoznaczności.
5. THE Guide_Page dla funkcji SHALL opisywać nazwane argumenty (named args) z regułą, że argumenty pozycyjne nie mogą następować po nazwanych.
6. THE Guide_Page dla funkcji SHALL opisywać parametry variadyczne `...T` z dostępem przez `.len` i indeksowanie.
7. THE Guide_Page dla funkcji SHALL opisywać funkcje generyczne z parametrami typów `<T>` i wnioskowaniem typów.
8. THE Guide_Page dla funkcji SHALL zawierać przykład rekurencji (np. silnia lub Fibonacci).
9. WHEN Reader szuka informacji o metodach klas, THE Guide_Page dla funkcji SHALL zawierać odesłanie do strony Classes.

---

### Requirement 4: Dokumentacja struktur kontrolnych

**User Story:** As a Reader, I want a thorough control flow guide, so that I can use conditionals, loops, and expressions correctly with Zap's strict type rules.

#### Acceptance Criteria

1. THE Guide_Page dla control flow SHALL opisywać `if`, `else if`, `else` z wymogiem warunku typu `Bool`.
2. THE Guide_Page dla control flow SHALL opisywać pętlę `while` z opcjonalnymi nawiasami wokół warunku.
3. THE Guide_Page dla control flow SHALL opisywać `break` i `continue` z informacją, że użycie poza pętlą jest błędem semantycznym.
4. THE Guide_Page dla control flow SHALL opisywać operator trójargumentowy `?:` z wymogiem zgodności typów obu gałęzi.
5. THE Guide_Page dla control flow SHALL zawierać przykład pokazujący, że liczby i ciągi znaków NIE są niejawnie prawdziwe/fałszywe.
6. THE Guide_Page dla control flow SHALL opisywać zasięg blokowy `{ ... }` i widoczność zmiennych lokalnych.
7. THE Guide_Page dla control flow SHALL zawierać co najmniej cztery Code_Block z kompletnymi, działającymi przykładami.

---

### Requirement 5: Dokumentacja tablic

**User Story:** As a Reader, I want a detailed arrays guide, so that I can declare, initialize, and index fixed-size arrays correctly.

#### Acceptance Criteria

1. THE Guide_Page dla tablic SHALL opisywać składnię typu `[N]T` gdzie `N` jest rozmiarem czasu kompilacji.
2. THE Guide_Page dla tablic SHALL opisywać inicjalizację literałem `{e1, e2, ...}` z wymogiem zgodności typów elementów.
3. THE Guide_Page dla tablic SHALL opisywać indeksowanie od zera z wymogiem całkowitoliczbowego indeksu.
4. THE Guide_Page dla tablic SHALL opisywać tablice zagnieżdżone (np. `[2][2]Int`).
5. THE Guide_Page dla tablic SHALL zawierać przykład przekazywania tablicy do funkcji.
6. IF Reader użyje indeksu niebędącego liczbą całkowitą, THEN THE Guide_Page dla tablic SHALL opisywać diagnostykę `S2008`.

---

### Requirement 6: Dokumentacja struktur i rekordów

**User Story:** As a Reader, I want a complete structs and records guide, so that I can model data with named fields using both `struct` and `record` syntax.

#### Acceptance Criteria

1. THE Guide_Page dla structs SHALL opisywać składnię `struct Name { field: Type, ... }` z separatorem przecinkowym.
2. THE Guide_Page dla structs SHALL opisywać składnię `record Name { field: Type, ... }` jako alternatywną formę.
3. THE Guide_Page dla structs SHALL opisywać literały struktury `Name{ field: value, ... }` z wymogiem inicjalizacji wszystkich pól.
4. THE Guide_Page dla structs SHALL opisywać dostęp do pól przez operator `.`.
5. THE Guide_Page dla structs SHALL zawierać przykład użycia struct jako parametru i wartości zwracanej funkcji.
6. THE Guide_Page dla structs SHALL opisywać generyczne struktury `struct Name<T> { ... }` z przykładem instancjacji.

---

### Requirement 7: Dokumentacja enumów i aliasów

**User Story:** As a Reader, I want a detailed enums and aliases guide, so that I can model closed sets of values and create readable type names.

#### Acceptance Criteria

1. THE Guide_Page dla enumów SHALL opisywać składnię `enum Name { Variant1, Variant2, ... }` z opcjonalnym przecinkiem końcowym.
2. THE Guide_Page dla enumów SHALL opisywać dostęp do wariantów przez `EnumName.Variant`.
3. THE Guide_Page dla enumów SHALL opisywać porównywanie wartości enum operatorem `==`.
4. THE Guide_Page dla enumów SHALL opisywać atrybut `@error` dla enumów używanych w Failable_Function.
5. THE Guide_Page dla enumów SHALL opisywać `alias` z przykładem `alias UserId = Int`.
6. THE Guide_Page dla enumów SHALL zawierać przykład enumu używanego w instrukcji `if` do rozgałęziania logiki.

---

### Requirement 8: Dokumentacja klas

**User Story:** As a Reader, I want a comprehensive classes guide, so that I can define heap-allocated types with methods, visibility, inheritance, and lifecycle hooks.

#### Acceptance Criteria

1. THE Guide_Page dla klas SHALL opisywać deklarację klasy z polami, metodami i `self`.
2. THE Guide_Page dla klas SHALL opisywać alokację przez `new ClassName(args)` i rolę metody `init(...)`.
3. THE Guide_Page dla klas SHALL opisywać modyfikatory widoczności `pub`, `priv`, `prot` z zasadami dostępu.
4. THE Guide_Page dla klas SHALL opisywać dziedziczenie pojedyncze `class Child : Parent` z dynamiczną dyspozycją metod.
5. THE Guide_Page dla klas SHALL opisywać metody statyczne `static fun`.
6. THE Guide_Page dla klas SHALL opisywać metodę `deinit()` jako hook wywoływany przy zniszczeniu obiektu.
7. THE Guide_Page dla klas SHALL zawierać kompletny przykład klasy z `init`, `deinit`, polami prywatnymi i metodami publicznymi.
8. THE Guide_Page dla klas SHALL zawierać odesłanie do strony ARC and Weak Refs.

---

### Requirement 9: Dokumentacja ARC i słabych referencji

**User Story:** As a Reader, I want a thorough ARC and weak references guide, so that I can manage object lifetimes correctly and avoid reference cycles.

#### Acceptance Criteria

1. THE Guide_Page dla ARC SHALL opisywać model ARC: każdy obiekt ma licznik referencji, który jest inkrementowany przy kopiowaniu i dekrementowany przy wyjściu z zakresu.
2. THE Guide_Page dla ARC SHALL opisywać słabe referencje `weak ClassName` jako referencje nie-właścicielskie.
3. THE Guide_Page dla ARC SHALL opisywać funkcje `alive(weakRef)` i `lock(weakRef)` do bezpiecznego dostępu.
4. THE Guide_Page dla ARC SHALL opisywać problem cykli silnych referencji i mechanizm Cycle Collector w Zap.
5. THE Guide_Page dla ARC SHALL zawierać przykład wzorca parent/child z `weak` referencją do rodzica.
6. THE Guide_Page dla ARC SHALL zawierać przykład z `deinit()` demonstrujący deterministyczne zwalnianie pamięci.
7. THE Guide_Page dla ARC SHALL opisywać wzorce: drzewo z linkami do rodzica, rejestry obserwatorów, cache'e.

---

### Requirement 10: Dokumentacja generics

**User Story:** As a Reader, I want a complete generics guide, so that I can write reusable, type-safe code using generic functions, types, and constraints.

#### Acceptance Criteria

1. THE Guide_Page dla generics SHALL opisywać generyczne funkcje `fun name<T>(param: T) T { ... }`.
2. THE Guide_Page dla generics SHALL opisywać wnioskowanie typów przy wywołaniu funkcji generycznej.
3. THE Guide_Page dla generics SHALL opisywać generyczne struktury i rekordy `struct Name<T> { ... }`.
4. THE Guide_Page dla generics SHALL opisywać generyczne klasy `class Name<T> { ... }`.
5. THE Guide_Page dla generics SHALL opisywać ograniczenia `where T: InterfaceName` z przykładem.
6. THE Guide_Page dla generics SHALL opisywać `iftype T == ConcreteType { ... }` jako rozgałęzianie czasu kompilacji.
7. THE Guide_Page dla generics SHALL zawierać przykład z wieloma parametrami typów `<A, B>`.
8. THE Guide_Page dla generics SHALL opisywać typowe błędy diagnostyczne związane z generics (niezgodność liczby argumentów, niespełnione ograniczenia).

---

### Requirement 11: Dokumentacja obsługi błędów (Failable Functions)

**User Story:** As a Reader, I want a detailed error handling guide, so that I can use failable functions to handle failures explicitly without exceptions.

#### Acceptance Criteria

1. THE Guide_Page dla error handling SHALL opisywać składnię `fun name(params) ReturnType!ErrorEnum { ... }`.
2. THE Guide_Page dla error handling SHALL opisywać instrukcję `fail ErrorEnum.Variant;` do sygnalizowania błędu.
3. THE Guide_Page dla error handling SHALL opisywać operator `?` do propagacji błędu w górę stosu wywołań.
4. THE Guide_Page dla error handling SHALL opisywać wyrażenie `or fallbackValue` do podania wartości domyślnej.
5. THE Guide_Page dla error handling SHALL opisywać wyrażenie `or err { ... }` do lokalnej obsługi błędu z dostępem do wartości `err`.
6. THE Guide_Page dla error handling SHALL opisywać atrybut `@error` na enumie błędów.
7. THE Guide_Page dla error handling SHALL zawierać kompletny przykład z łańcuchem failable functions i wszystkimi trzema wzorcami obsługi.

---

### Requirement 12: Dokumentacja modułów i importów

**User Story:** As a Reader, I want a complete modules and imports guide, so that I can organize code across files and use the standard library correctly.

#### Acceptance Criteria

1. THE Guide_Page dla modułów SHALL opisywać `import "module"` jako import całego modułu z dostępem przez `module.symbol`.
2. THE Guide_Page dla modułów SHALL opisywać `import "module" { sym1, sym2 }` jako selektywny import symboli.
3. THE Guide_Page dla modułów SHALL opisywać `import "module" as alias` jako import z aliasem przestrzeni nazw.
4. THE Guide_Page dla modułów SHALL opisywać `pub` jako modyfikator eksportu dla funkcji, typów i aliasów.
5. THE Guide_Page dla modułów SHALL opisywać import folderów jako mechanizm ładowania wielu plików `.zp`.
6. THE Guide_Page dla modułów SHALL zawierać przykład dwuplikowego projektu (`app.zp` + `math.zp`) z eksportem i importem.
7. THE Guide_Page dla modułów SHALL wymieniać wszystkie moduły biblioteki standardowej z krótkim opisem każdego.

---

### Requirement 13: Dokumentacja unsafe i FFI

**User Story:** As a Reader, I want a thorough unsafe and FFI guide, so that I can use raw pointers, manual memory allocation, and call C functions safely.

#### Acceptance Criteria

1. THE Guide_Page dla unsafe SHALL opisywać flagę kompilatora `--allow-unsafe` jako warunek konieczny.
2. THE Guide_Page dla unsafe SHALL opisywać blok `unsafe { ... }` i funkcję `unsafe fun`.
3. THE Guide_Page dla unsafe SHALL opisywać typy wskaźnikowe `*Type`, `*Void`, operator adresu `&`, dereferencję `*ptr` i arytmetykę wskaźnikową `ptr + i`.
4. THE Guide_Page dla unsafe SHALL opisywać rzutowanie `as` między typami wskaźnikowymi.
5. THE Guide_Page dla unsafe SHALL opisywać `std/mem` z funkcjami `malloc` i `free`.
6. THE Guide_Page dla unsafe SHALL opisywać deklaracje `ext fun` i `ext var` do wiązania z symbolami C.
7. THE Guide_Page dla unsafe SHALL opisywać atrybut `@repr("C")` dla struktur i enumów kompatybilnych z C ABI.
8. THE Guide_Page dla unsafe SHALL zawierać kompletny przykład alokacji, zapisu, odczytu i zwolnienia pamięci przez `std/mem`.
9. THE Guide_Page dla unsafe SHALL zawierać przykład FFI z `ext fun` i wywołaniem funkcji C.

---

### Requirement 14: Rozszerzona dokumentacja biblioteki standardowej

**User Story:** As a Reader, I want detailed standard library pages with API signatures and examples, so that I can quickly find and use the right function for each task.

#### Acceptance Criteria

1. THE Std_Page dla każdego modułu SHALL zawierać sekcję API z pełnymi sygnaturami funkcji w Code_Block.
2. THE Std_Page dla każdego modułu SHALL zawierać co najmniej jeden kompletny, działający przykład użycia.
3. THE Std_Page dla `std/io` SHALL dokumentować `println`, `printInt`, `printFloat`, `printBool`, `printChar`, `eprintln`, `getLn`, `printf`, `printfln`.
4. THE Std_Page dla `std/string` SHALL dokumentować `len`, `at`, `slice`, `eq`, `fromChar`, `pushChar`.
5. THE Std_Page dla `std/fs` SHALL dokumentować operacje na plikach: `readFile`, `writeFile`, `mkdirAll`.
6. THE Std_Page dla `std/path` SHALL dokumentować `join`, `basename`, `parent`.
7. THE Std_Page dla `std/math` SHALL dokumentować dostępne funkcje matematyczne.
8. THE Std_Page dla `std/convert` SHALL dokumentować funkcje konwersji typów.
9. THE Std_Page dla `std/mem` SHALL dokumentować `malloc`, `free` i powiązane funkcje.
10. THE Std_Page dla `std/process` SHALL dokumentować `argc`, `argv`, `cwd`, `exit`.
11. THE Std_Page dla `std/error` SHALL dokumentować mechanizm błędów i powiązane typy.
12. THE Std_Page dla `std/prelude` SHALL opisywać symbole automatycznie dostępne bez importu.

---

### Requirement 15: Spójność nawigacji i Sidebar

**User Story:** As a Reader, I want a well-organized sidebar navigation, so that I can find any topic quickly without searching.

#### Acceptance Criteria

1. THE Sidebar SHALL zawierać sekcję "Generics" z linkiem do nowej strony `guides/generics`.
2. THE Sidebar SHALL zawierać sekcję "Error Handling" z linkiem do nowej strony `guides/error_handling`.
3. THE Sidebar SHALL zawierać sekcję "FFI" lub rozszerzoną sekcję "Unsafe" z linkiem do strony `guides/unsafe`.
4. WHEN Doc_Author dodaje nową Guide_Page, THE Sidebar SHALL być zaktualizowany w `astro.config.mjs` o odpowiedni wpis.
5. THE Sidebar SHALL zachować istniejącą strukturę sekcji: Getting Started, Basics, Data model, Object model, Modules, Standard library.

---

### Requirement 16: Jakość i spójność dokumentacji

**User Story:** As a Doc_Author, I want clear quality standards for all documentation pages, so that the documentation is consistent, accurate, and maintainable.

#### Acceptance Criteria

1. THE Guide_Page SHALL zawierać Frontmatter z polami `title` i `description`.
2. THE Guide_Page SHALL używać Code_Block z oznaczeniem języka `zap` dla wszystkich przykładów kodu Zap.
3. THE Guide_Page SHALL zawierać co najmniej dwa Code_Block z kompletnymi, działającymi przykładami (nie fragmentami).
4. WHEN Guide_Page opisuje funkcję języka, THE Guide_Page SHALL zawierać sekcję opisującą typowe błędy diagnostyczne (kody `Pxxxx`, `Sxxxx`, `Wxxxx`) związane z tą funkcją.
5. THE Guide_Page SHALL używać spójnej terminologii zgodnej z Glossary niniejszego dokumentu.
6. IF Guide_Page opisuje funkcję powiązaną z inną stroną, THEN THE Guide_Page SHALL zawierać link do tej strony.
