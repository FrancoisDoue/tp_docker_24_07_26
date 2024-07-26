# Sujet de TP : Dockerisation d'une Application Fullstack Complète

## Objectif
L'objectif de ce TP est de dockeriser une application fullstack complète comprenant une base de données, un backend et un frontend. Chaque composant de l'application devra être contenu dans son propre projet avec un Dockerfile dédié. Un fichier `docker-compose.yml` à la racine du répertoire GitHub contiendra la configuration nécessaire pour lancer l'application dans son intégralité. En bonus, il faudra publier les images Docker sur DockerHub et fournir un script pour remplir la base de données avec un jeu de données de test. Vous devrez également proposer un autre fichier `docker-compose.yml` utilisant les images Docker publiées pour permettre de tester l'application sans avoir à télécharger le code source. Des README détaillés seront fournis pour chaque projet ainsi que pour l'ensemble du dépôt afin de bien présenter l'application et comment la tester avec Docker.

## Étapes du TP

### 1. Choix de la Stack Technologique
- **Base de données** : PostgreSQL, MySQL ou MongoDB
- **Backend** : Node.js (Express), Python (Django/Flask), Java (Spring Boot)
- **Frontend** : React, Angular, Vue.js

### 2. Création des Projets
- **Base de données** : Créer un projet avec un Dockerfile pour la base de données choisie.
- **Backend** : Développer le backend avec le framework choisi et créer un Dockerfile.
- **Frontend** : Développer le frontend avec le framework choisi et créer un Dockerfile.

### 3. Dockerisation de Chaque Projet
- Rédiger un Dockerfile pour chaque composant (base de données, backend, frontend).
- Exemple de structure de répertoire :
  ```
  /repo-github
  ├── database
  │   ├── Dockerfile
  │   └── ...
  ├── backend
  │   ├── Dockerfile
  │   └── ...
  ├── frontend
  │   ├── Dockerfile
  │   └── ...
  └── docker-compose.yml
  ```

### 4. Création d'un fichier `docker-compose.yml`
- À la racine du dépôt, créer un fichier `docker-compose.yml` pour orchestrer les services (base de données, backend, frontend).


### 5. Script de Remplissage de la Base de Données
- Fournir un script pour remplir la base de données avec un jeu de données de test.
- Bonus : Ce script doit être exécuté automatiquement lors du démarrage des services via Docker Compose.
- Exemple (script SQL ou script Python).

### 6. Publication des Images Docker sur DockerHub
- Publier les images Docker de chaque projet sur DockerHub.

### 7. Fichier `docker-compose.yml` pour Images DockerHub
- Créer un autre fichier `docker-compose.yml` pour utiliser les images Docker publiées.


### 8. Rédaction des README
- Fournir des README détaillés pour chaque projet (base de données, backend, frontend) expliquant comment construire et exécuter les conteneurs individuellement.
- Fournir un README à la racine du dépôt expliquant comment utiliser les `docker-compose.yml` pour lancer l'application complète.


### Commentaires et Documentation

En plus des README détaillés, ajoutez des commentaires explicatifs dans vos Dockerfile et votre fichier `docker-compose.yml`. Ces commentaires doivent clarifier les étapes de construction, les configurations, et les dépendances entre les services. Par exemple, expliquez les différentes phases dans les Dockerfile, comme l'installation des dépendances et la configuration des variables d'environnement. Cela aidera à comprendre et maintenir le projet plus facilement.

## Livraison
- **Dépôt GitHub** : Lien vers le dépôt GitHub contenant tous les fichiers et README.
- **Images DockerHub** : Liens vers les images Docker publiées sur DockerHub.

Bon courage et bonne dockerisation !