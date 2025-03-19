# Pokédex Next.js

Une application web moderne de Pokédex construite avec Next.js, TypeScript et Tailwind CSS. Cette application permet aux utilisateurs de consulter les informations détaillées des 151 premiers Pokémon.

## Fonctionnalités

- 🎯 Affichage des 151 premiers Pokémon
- 🔍 Recherche de Pokémon par ID
- 📱 Design responsive
- 🎨 Interface utilisateur moderne avec animations
- 📊 Statistiques détaillées des Pokémon
- 🌈 Types de Pokémon avec codes couleur
- 📝 Descriptions des Pokémon
- 🖼️ Images officielles des Pokémon

## Technologies utilisées

- Next.js 14
- TypeScript
- Tailwind CSS
- Axios pour les requêtes API
- PokeAPI

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/cesi-poke-api.git
```

2. Installez les dépendances :
```bash
cd cesi-poke-api
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
cesi-poke-api/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Page d'accueil
│   │   └── pokemon/
│   │       └── [id]/
│   │           └── page.tsx   # Page de détail du Pokémon
│   │   ├── components/            # Composants réutilisables
│   │   ├── services/             # Services API
│   │   ├── utils/               # Utilitaires et constantes
│   │   └── assets/              # Images et ressources statiques
│   ├── public/                  # Fichiers publics
│   └── package.json            # Dépendances et scripts
```

## API Utilisée

Ce projet utilise la [PokeAPI](https://pokeapi.co/) pour récupérer les données des Pokémon.

## Fonctionnalités principales

### Page d'accueil
- Liste des 151 premiers Pokémon
- Barre de recherche par ID
- Affichage des types et images des Pokémon
- Navigation vers les détails en cliquant sur un Pokémon

### Page de détail
- Informations détaillées du Pokémon
- Statistiques avec barres de progression
- Description du Pokémon
- Navigation entre les Pokémon avec les flèches
- Types avec codes couleur
- Poids et taille

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 