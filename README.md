https://graph-iaf4xjib0-sergueis-projects-5c54ca99.vercel.app

### README - **Test Technique Développeur Fullstack**

---

#### **Description du Projet**
Ce projet est une application backend construite avec **NestJS** et utilisant la librairie **Langgraph** pour orchestrer la collaboration entre différents agents. L'objectif est de gérer un panier d'achat avec des fonctionnalités enrichies par des recherches en ligne.

L'application expose un **endpoint unique** pour permettre à l'utilisateur d'interagir avec trois agents interconnectés :

1. **Agent de Gestion de Panier** :
   - Ajoute, supprime et affiche les produits dans le panier.
   - Les données sont stockées dans un fichier JSON pour simplifier le stockage.

2. **Agent Tavily** :
   - Effectue des recherches en ligne pour trouver des produits ou informations pertinentes selon les besoins exprimés par l'utilisateur.

3. **Agent Coordinateur** :
   - Ordonne les appels entre les agents, collecte leurs réponses et synthétise une réponse finale destinée à l'utilisateur.

---

#### **Fonctionnalités Principales**
- Ajouter un produit au panier.
- Supprimer un produit du panier.
- Afficher les produits présents dans le panier.
- Rechercher des produits via l'agent Tavily.
- Générer une réponse structurée et conviviale pour l'utilisateur à travers un seul endpoint.

---

#### **Pré-requis**
Avant de lancer le projet, assurez-vous d'avoir installé les outils suivants :
- **Node.js** (v18 ou supérieur)
- **npm** (v9 ou supérieur)
- **NestJS CLI** (si besoin pour des modifications)
- Une clé API valide pour **OpenAI** (utilisée par Langgraph).

---

#### **Installation**

1. **Cloner le dépôt :**
   ```bash
   git clone <lien_du_dépôt>
   cd <nom_du_dossier>
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement :**
   - Créez un fichier `.env` à la racine du projet.
   - Ajoutez les informations suivantes :
     ```env
     OPENAI_API_KEY=your_openai_api_key
     ```

4. **Lancer l'application :**
   ```bash
   npm run start
   ```

   Par défaut, l'application sera accessible sur `http://localhost:3000`.

---

#### **Utilisation**

##### **1. Endpoint unique**
- **Route :**
  ```
  GET /invoke?query={user_query}
  ```
- **Exemples :**

  **Ajouter un produit au panier :**
  ```bash
  curl "http://localhost:3000/invoke?query=Ajoute un sapin de Noël à mon panier"
  ```

  **Rechercher et ajouter un produit :**
  ```bash
  curl "http://localhost:3000/invoke?query=Recherche un sapin de Noël chez Ikea et ajoute-le au panier"
  ```

  **Afficher le contenu du panier :**
  ```bash
  curl "http://localhost:3000/invoke?query=Affiche mon panier"
  ```

---

#### **Structure du Projet**
- **`src/`**
  - **`app.controller.ts`** : Point d'entrée principal pour gérer les requêtes utilisateur via `/invoke`.
  - **`app.service.ts`** : Logique de traitement des requêtes utilisateur.
  - **`agents/`**
    - **`cartManager.agent.ts`** : Gère les actions liées au panier (ajout, suppression, affichage).
    - **`tavily.agent.ts`** : Réalise des recherches en ligne pour enrichir les produits du panier.
    - **`supervisor.agent.ts`** : Coordonne les appels entre agents et retourne une réponse à l'utilisateur.
  - **`cart.json`** : Stockage des données du panier (produits ajoutés).

---

#### **Approche de Développement**
1. **Analyse des exigences :**
   - Identifier les responsabilités de chaque agent.
   - Structurer l'application pour permettre la collaboration entre les agents via Langgraph.

2. **Mise en place des agents :**
   - Création de l'agent de gestion de panier (Cart Manager).
   - Implémentation de l'agent Tavily pour les recherches.
   - Développement de l'agent Coordinateur pour orchestrer les actions.

3. **Orchestration via Langgraph :**
   - Utilisation de Langgraph pour structurer le workflow entre les agents.
   - Configuration de la limite de récursion et gestion des résumés d'actions.

4. **Endpoint unique :**
   - Implémentation d'une route unique (`/invoke`) pour traiter toutes les requêtes utilisateur.

5. **Test et Validation :**
   - Validation des cas d'utilisation tels que l'ajout, la suppression et l'affichage des produits.
   - Vérification de l'interaction entre agents et du flux des données.

---

#### **Exemples de Scénarios Testés**

1. **Ajout de produit :**
   - Requête : `Ajoute un sapin de Noël à mon panier`
   - Réponse : `Le produit "Sapin de Noël" a été ajouté au panier.`

2. **Affichage du panier :**
   - Requête : `Affiche mon panier`
   - Réponse :
     ```
     Votre panier contient :
     - Sapin de Noël - [Lien](https://www.ikea.com)
     ```

3. **Recherche et ajout :**
   - Requête : `Recherche un sapin chez Ikea et ajoute-le au panier.`
   - Réponse : `Le produit "Sapin IKEA" a été trouvé et ajouté à votre panier.`

---

#### **Améliorations Possibles**
- Intégration de tests unitaires pour valider les fonctionnalités critiques.
- Support d'un stockage plus robuste (par exemple, une base de données relationnelle comme PostgreSQL).
- Ajout d'une interface utilisateur pour simplifier les interactions avec l'API.
- Gestion avancée des erreurs pour des cas spécifiques.








