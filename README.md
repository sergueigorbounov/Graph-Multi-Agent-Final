# **README Étendu - Test Technique Développeur Fullstack**

---

### **🚀 [Application Déployée sur Vercel](https://graph-iaf4xjib0-sergueis-projects-5c54ca99.vercel.app)**  
Aucune installation nécessaire, testez directement l'application en ligne ! 🎄

---

## **Résumé du Projet**

Ce projet illustre la conception et la mise en œuvre d'une application backend avancée, exploitant **NestJS** et la librairie **LangGraph** pour créer un système orchestré basé sur des agents communicants. 

L'objectif était de démontrer une maîtrise technique approfondie et de mettre en œuvre des pratiques modernes d'ingénierie logicielle, en particulier dans le domaine des systèmes multi-agents et de l'intelligence artificielle. L'application propose une interface engageante et festive, intégrant des éléments interactifs tels qu'un Easter egg musical et une ambiance graphique joyeuse.

L'application est déployée avec succès sur **Vercel** et prête à être explorée ici :  
👉 **[Graph Multi-Agent sur Vercel](https://graph-iaf4xjib0-sergueis-projects-5c54ca99.vercel.app)** 👈

---

## **Objectifs Techniques et Approche**

### **Principales Innovations**

#### **1. Conception Graphique avec LangGraph**
- Création d’un **graphe multi-agents** orchestré avec des outils et workflows modernes.
- Gestion centralisée des états via des annotations LangGraph pour simplifier la collaboration entre agents.

#### **2. Utilisation de Technologies Avancées**
- **API intégrées** :
  - **LangChain** pour la gestion des prompts et outils avancés.
  - **Tavily** pour les recherches en ligne.
  - **OpenAI** pour les capacités LLM et le traitement de texte.
- **LangSmith Studio** : Outil utilisé pour visualiser les interactions entre agents et optimiser les flux.

#### **3. Pratiques d'Excellence**
- **Modularité et maintenabilité** :
  - Chaque agent et outil est isolé pour faciliter l'extensibilité.
- **Approche ReAct** : Coordination intelligente des agents pour réduire la complexité des interactions.

---

### **Étapes de Développement**

#### **1. Définir l’État**
- Structure partagée pour enregistrer les messages et actions des agents.
- Exemple en TypeScript :
  ```typescript
  const AgentState = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
      reducer: (x, y) => x.concat(y),
      default: () => [],
    }),
    next: Annotation<string>({
      reducer: (x, y) => y ?? x ?? END,
      default: () => END,
    }),
  });
  ```

#### **2. Création des Outils**
- **Agent Tavily** : Recherche sur Internet et partage des résultats.
- **Cart Manager** : Gestion des produits (ajout, suppression, affichage) via un fichier JSON.
- **Outils Dynamiques** : Génération de graphiques interactifs avec **D3.js**.

#### **3. Orchestration avec l'Agent Supervisor**
- Un **Agent Supervisor** gère la délégation des tâches et les interactions entre agents.
- Exemple d'orchestration :
  ```typescript
  const supervisorChain = formattedPrompt
    .pipe(llm.bindTools([routingTool], { tool_choice: "route" }))
    .pipe(new JsonOutputToolsParser())
    .pipe((x) => (x[0].args));
  ```

#### **4. Construction du Graphe**
- Création de nœuds pour chaque agent et définition des connexions.
- Exemple de graphe :
  ```typescript
  const workflow = new StateGraph(AgentState)
    .addNode("researcher", researcherNode)
    .addNode("cart_manager", cartManagerNode)
    .addNode("supervisor", supervisorChain)
    .addEdge(START, "supervisor")
    .addConditionalEdges("supervisor", (x) => x.next);
  ```

#### **5. Visualisation et Débogage avec LangSmith**
- Configuration pour observer les communications entre agents et ajuster les workflows.

---

## **Fonctionnalités Techniques**

1. **Endpoint Unique : `/invoke?query={user_query}`**
   - Simplifie l’interaction utilisateur en regroupant toutes les fonctionnalités via une seule route.

2. **Collaboration Multi-Agent** :
   - Coordination dynamique pour répondre précisément aux requêtes utilisateurs.

3. **Logs Visuels en Temps Réel** :
   - Interface HTML/CSS affichant les actions en direct avec des animations.

4. **Easter Egg et Ambiance Festive** :
   - Intégration d’une playlist musicale et d’un thème graphique de Noël.

---

## **Requêtes Exemples**

### **Ajouter un Produit :**
```bash
GET /invoke?query=Ajoute un sapin de Noël à mon panier
```
**Réponse :**  
```
Le produit "Sapin de Noël" a été ajouté à votre panier.
```

---

### **Rechercher un Produit et l’Ajouter :**
```bash
GET /invoke?query=Recherche un sapin de Noël chez Ikea et ajoute-le au panier
```
**Réponse :**  
```
Le produit "Sapin IKEA" a été trouvé et ajouté à votre panier.
```

---

### **Afficher le Panier :**
```bash
GET /invoke?query=Affiche mon panier
```
**Réponse :**  
```
Votre panier contient :
1. Sapin de Noël - [Lien IKEA](https://www.ikea.com)
```

---

## **Structure du Projet**

### **Répertoire Principal : `src/`**
- **`agents/`** : Contient les agents principaux.
  - `cartManager.agent.ts` : Gère les actions liées au panier.
  - `tavily.agent.ts` : Recherche des informations via API Tavily.
  - `supervisor.agent.ts` : Coordonne les interactions.
- **`tools/`** : Outils personnalisés pour les agents.
- **`state/`** : Gestion centralisée des états.
- **`workflow/`** : Orchestration des graphes.

### **Dossier Public : `public/`**
- Contient l’interface utilisateur avec animations et musique.

### **Dossier Data : `data/`**
- **`cart.json`** : Stockage des produits ajoutés au panier.

---

## **Installation**

### **Prérequis :**
- **Node.js** (v18 ou supérieur)
- **npm** (v9 ou supérieur)
- Une clé API OpenAI.

### **Étapes :**
1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/sergueigorbounov/Graph-Multi-Agent-Final.git
   cd Graph-Multi-Agent-Final
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   - Créez un fichier `.env` :
     ```env
     OPENAI_API_KEY=your_openai_api_key
     ```

4. **Lancer l'application** :
   ```bash
   npm run start
   ```

5. **Ou visitez l'application en ligne :**  
   👉 **[Graph Multi-Agent sur Vercel](https://graph-iaf4xjib0-sergueis-projects-5c54ca99.vercel.app)** 👈

---

## **Améliorations Futures**

1. **Stockage Persistant** :
   - Migration vers une base de données comme PostgreSQL.

2. **Tests Unitaires** :
   - Ajout de tests pour garantir la fiabilité des fonctionnalités.

3. **Interface Utilisateur Complète** :
   - Ajout d’un frontend intégral pour une meilleure expérience utilisateur.

4. **Optimisation des Performances** :
   - Réduction des temps de réponse dans les workflows.

---

🎄 **Joyeux Noël et Bonne Année !**  
Créé avec passion par **Sergueï Gorbounov**.  
[**Lien GitHub**](https://github.com/sergueigorbounov/Graph-Multi-Agent-Final) | [**Lien Déployé sur Vercel**](https://graph-iaf4xjib0-sergueis-projects-5c54ca99.vercel.app) 🎅
