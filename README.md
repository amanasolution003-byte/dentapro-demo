# DentaPro Distribution — Site vitrine (démo)

Site vitrine responsive de **distributeur de matériel paramédical dentaire** (échantillon client).
Hébergé sur GitHub Pages : <https://amanasolution003-byte.github.io/cabinet-dentaire-demo/>

## Contenu

- Hero + marquee d'activités
- Chiffres clés animés
- Le distributeur (promesse & avantages)
- 6 gammes produits (fauteuils, imagerie, stérilisation, instruments, consommables, mobilier)
- Marques partenaires
- Services en 4 étapes (devis → livraison → installation → SAV)
- Équipe
- Avis clients (carrousel)
- FAQ (accordéon)
- Formulaire de demande de devis (démo, front-end uniquement)

## Stack

HTML / CSS / JavaScript natif — aucune dépendance, aucun build.
Polices : Fraunces & Manrope (Google Fonts).

## Personnalisation rapide

| Élément | Où |
| --- | --- |
| Nom de l'enseigne | `index.html` (rechercher `DentaPro`) |
| Téléphone / e-mail / adresse | sections Contact & Footer de `index.html` |
| Couleurs principales | variables `--teal`, `--pine`, `--gold` dans `styles.css` |
| Marques partenaires | section `#marques` de `index.html` |
| Gammes produits | section `#produits` de `index.html` |

## Tester en local

```bash
cd cabinet-dentaire-demo
npx serve .
```

## Licence

Échantillon de démonstration — à affiner avec le client avant toute mise en production.