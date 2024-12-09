# **README Étendu - Test Technique Développeur Fullstack**

---

## **Résumé du Projet**

Ce projet illustre la conception et la mise en œuvre d'une application backend avancée, exploitant **NestJS** et la librairie **LangGraph** pour créer un système orchestré basé sur des agents communicants. L'objectif principal était de démontrer une maîtrise technique approfondie tout en mettant en œuvre des pratiques d'ingénierie logicielle modernes, particulièrement dans le domaine de l'intelligence artificielle et des systèmes multi-agents.

L'application, orientée utilisateur, se concentre sur la gestion de panier d'achat enrichie par des recherches intelligentes et propose une interface engageante et festive. Elle est déployée avec succès sur [Vercel](https://graph-iaf4xjib0-sergueis-projects-5c54ca99.vercel.app), où elle intègre un Easter egg pour rendre l'expérience utilisateur plus agréable.

---

## **Objectifs Techniques et Approche**

### **Principales Innovations**
1. **Conception Graphique avec LangGraph** :
   - Création d’un graphe multi-agents exploitant des outils et des workflows modernes.
   - Orchestration des flux de données et gestion centralisée des états.

2. **Utilisation de Technologies Avancées** :
   - Intégration des API de **LangChain**, **Tavily**, et **OpenAI** pour des agents communicants.
   - Mise en place de workflows supervisés avec **LangSmith Studio** pour observer et améliorer les communications entre agents.

3. **Pratiques d'Excellence** :
   - Conformité avec les meilleures pratiques en matière de conception de logiciels : modularité, maintenabilité et extensibilité.
   - Utilisation d’outils comme **AgentExecutor** et d’approches comme ReAct pour simplifier et enrichir l’implémentation des agents.

---

### **Étapes de Développement**

1. **Définir l’État** :
   - Mise en place d’une structure partagée via **LangGraph** pour gérer les messages entre les agents et centraliser le suivi des actions effectuées.
   - Exemple de définition d'état en TypeScript :
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

2. **Création des Outils** :
   - **Agent de Gestion de Panier** : Gère les ajouts, suppressions et affichages de produits via un fichier JSON.
   - **Agent Tavily** : Recherche des informations en ligne et les transmet aux autres agents.
   - **Outils Dynamiques** : Ajout d’un générateur de graphiques interactifs avec **D3.js**.

3. **Orchestration avec l'Agent Supervisor** :
   - Utilisation d’un **Agent Supervisor** pour déléguer les tâches et superviser les interactions entre les agents.
   - Exemple d'orchestration :
     ```typescript
     const supervisorChain = formattedPrompt
       .pipe(llm.bindTools([routingTool], { tool_choice: "route" }))
       .pipe(new JsonOutputToolsParser())
       .pipe((x) => (x[0].args));
     ```

4. **Construction du Graphe** :
   - Création de nœuds pour chaque agent et définition des connexions entre eux.
   - Exemple de graphe :
     ```typescript
     const workflow = new StateGraph(AgentState)
       .addNode("researcher", researcherNode)
       .addNode("cart_manager", cartManagerNode)
       .addNode("supervisor", supervisorChain)
       .addEdge(START, "supervisor")
       .addConditionalEdges("supervisor", (x) => x.next);
     ```

5. **Visualisation et Débogage avec LangSmith** :
   - Configuration de **LangSmith Studio** pour observer les communications et ajuster les workflows.

---

## **Fonctionnalités Techniques**

1. **Endpoint Unique** :
   - **Route API** : `/invoke?query={user_query}`  
   - Simplifie l'interaction avec l'utilisateur via un point d'accès unique.

2. **Collaboration entre Agents** :
   - Orchestration dynamique entre les agents pour répondre aux besoins exprimés par l'utilisateur.
   - Résultats contextualisés et synthétisés par l’agent Supervisor.

3. **Logs Visuels en Temps Réel** :
   - Interface HTML/CSS affichant les logs en direct, enrichie par des animations.

4. **Easter Egg et Ambiance Festive** :
   - Intégration d’un Easter egg musical et d’un design festif pour engager l’utilisateur.

---

## **Requêtes Exemples**

### **Ajouter un Produit** :
```bash
GET /invoke?query=Ajoute un sapin de Noël à mon panier
```
**Réponse :**
```
Le produit "Sapin de Noël" a été ajouté à votre panier.
```

### **Rechercher un Produit et l’Ajouter** :
```bash
GET /invoke?query=Recherche un sapin de Noël chez Ikea et ajoute-le au panier
```
**Réponse :**
```
Le produit "Sapin IKEA" a été trouvé et ajouté à votre panier.
```

### **Afficher le Panier** :
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

- **`src/`** :
  - **`agents/`** : Agents principaux.
    - `cartManager.agent.ts` : Gestion des actions liées au panier.
    - `tavily.agent.ts` : Recherche d’informations via API Tavily.
    - `supervisor.agent.ts` : Orchestration et coordination des actions.
  - **`tools/`** : Outils spécifiques pour les agents.
  - **`state/`** : Gestion centralisée des états des agents.
  - **`workflow/`** : Construction et orchestration des graphes.

- **`public/`** : Fichiers statiques, y compris l’Easter egg visuel et musical.

- **`data/`** :
  - `cart.json` : Stockage simplifié des produits du panier.

---

## **Installation**

### **Prérequis** :
- **Node.js** (v18 ou supérieur)
- **npm** (v9 ou supérieur)
- Clé API OpenAI.

### **Étapes** :
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/sergueigorbounov/Graph-Multi-Agent-Final.git
   cd Graph-Multi-Agent-Final
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Configurer les variables d'environnement :
   - Créez un fichier `.env` :
     ```env
     OPENAI_API_KEY=your_openai_api_key
     ```

4. Lancer l'application :
   ```bash
   npm run start
   ```

---

## **Améliorations Futures**

1. **Stockage Persistant** :
   - Migration vers une base de données relationnelle (PostgreSQL) pour plus de robustesse.

2. **Tests Unitaires** :
   - Ajout de tests pour garantir la fiabilité des fonctionnalités.

3. **Expérience Utilisateur Avancée** :
   - Développement d'une interface utilisateur graphique intégrale.

4. **Optimisation des Workflows** :
   - Amélioration de l’orchestration pour réduire les temps de réponse.

---

🎄 **Joyeux Noël et Bonne Année !** 🎅  
Créé par **Sergueï Gorbounov**.  
[**Lien vers le Projet GitHub**](https://github.com/sergueigorbounov/Graph-Multi-Agent-Final)  
[**Application Déployée**](https://graph-iaf4xjib0-sergueis-projects-5c54ca99.vercel.app)  
