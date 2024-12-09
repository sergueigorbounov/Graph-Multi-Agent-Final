# Test Technique Développeur Fullstack - README Étendu

---

### **Résumé du Projet**

Ce projet illustre la conception d'une application backend avec **NestJS** et la librairie innovante **LangGraph**. Il s'agit de créer une architecture multi-agent orchestrée autour d'une gestion de panier d'achat enrichie par des recherches intelligentes en ligne.  

L'objectif est de mettre en avant des compétences techniques solides tout en proposant une expérience utilisateur immersive et conviviale, agrémentée d'une interface graphique dynamique et d'un Easter egg musical pour rendre l'exploration plus agréable.  

Accédez à l'application déployée ici :  
[**Graph Multi-Agent - Déploiement Vercel**](https://graph-iaf4xjib0-sergueis-projects-5c54ca99.vercel.app)

---

### **Agents Implémentés**

1. **Agent de Gestion de Panier :**  
   - Permet l'ajout, la suppression et l'affichage des produits.  
   - Les données sont stockées dans un fichier JSON pour simplifier la gestion.  

2. **Agent Tavily :**  
   - Effectue des recherches sur Internet (utilisant l'API Tavily).  
   - Sert à enrichir le panier avec des recommandations ou informations pertinentes.  

3. **Agent Coordinateur :**  
   - Orchestrateur principal des actions entre les agents.  
   - Synthétise les réponses des agents pour générer une réponse finale conviviale.  

---

### **Objectif Technique et Stratégie**

#### **Approche Adoptée :**
- J'ai utilisé la documentation officielle de **LangGraph** et l'API **LangSmith** pour orchestrer les agents et visualiser leurs interactions.
- J'ai expérimenté avec des modèles de coordination avancés, notamment en utilisant un **Agent Supervisor**, qui délègue intelligemment les tâches aux différents agents en fonction des besoins exprimés par l'utilisateur.

#### **Étapes Clés :**
1. **Définir l'État :**  
   - Création d'une structure d'état partagé pour gérer les messages entre les agents et enregistrer les actions effectuées.

2. **Création des Outils :**  
   - Agent Tavily pour les recherches.  
   - Outil de gestion de panier pour gérer les produits.

3. **Orchestration Supervisée :**  
   - Implémentation d'un **Agent Supervisor** pour router les tâches.  
   - Gestion des messages avec des résumés utilisateurs.

4. **Améliorations Graphiques :**  
   - Ajout d'une interface visuelle interactive pour afficher les logs des actions.
   - Intégration d'un Easter egg musical avec un lecteur Spotify intégré.  

5. **Utilisation de LangSmith Studio :**  
   - Configuration de **LangSmith Studio** pour observer les communications entre agents et optimiser les flux.  

---

### **Fonctionnalités Techniques**

1. **Endpoint Unique :**  
   - **Route API :** `/invoke?query={user_query}`  
   - L'utilisateur formule ses requêtes sous forme de texte libre (exemple : *"Recherche un sapin chez Ikea et ajoute-le au panier."*).

2. **Agents Collaboratifs :**  
   - Collaboration dynamique entre les agents grâce à **LangGraph**.
   - Résultats contextualisés pour chaque action.

3. **Visualisation des Logs :**  
   - Interface HTML interactive affichant les logs en temps réel.  
   - Animation graphique et effets visuels pour enrichir l'expérience.

4. **Déploiement et Accessibilité :**  
   - Application déployée sur **Vercel** :  
     [https://graph-iaf4xjib0-sergueis-projects-5c54ca99.vercel.app](https://graph-iaf4xjib0-sergueis-projects-5c54ca99.vercel.app)

---

### **Requêtes Exemples**

1. **Ajout d'un Produit au Panier :**
   ```
   GET /invoke?query=Ajoute un sapin de Noël à mon panier
   ```

   **Réponse :**  
   ```
   Le produit "Sapin de Noël" a été ajouté au panier.
   ```

2. **Rechercher un Produit et l'Ajouter :**
   ```
   GET /invoke?query=Recherche un sapin de Noël chez Ikea et ajoute-le au panier
   ```

   **Réponse :**  
   ```
   Le produit "Sapin IKEA" a été trouvé et ajouté à votre panier.
   ```

3. **Afficher le Panier :**
   ```
   GET /invoke?query=Affiche mon panier
   ```

   **Réponse :**  
   ```
   Votre panier contient :
   - Sapin de Noël - [Lien IKEA](https://www.ikea.com)
   ```

---

### **Expérience et Ambition**

Ce projet m'a permis de découvrir la puissance de **LangGraph Studio**, un outil extraordinaire pour modéliser et orchestrer des systèmes multi-agents. J'ai exploré des fonctionnalités avancées comme la visualisation des communications via LangSmith, qui se révèle être un atout majeur pour le débogage et l'optimisation.

### **Pour Impressionner l'Équipe Edtake**

1. **Innovation et Originalité :**  
   - Ajout d'éléments visuels et interactifs pour rendre l'expérience utilisateur mémorable.  

2. **Travail Rigoureux :**  
   - Utilisation d'outils de pointe pour structurer un workflow efficace entre les agents.  

3. **Engagement Personnel :**  
   - Inclusion d'un Easter egg musical pour partager un moment de joie et de festivité.  

---

🎄 **Joyeux Noël et Bonne Année !**  
Avec tout mon respect et mon enthousiasme,  
**Sergueï Gorbounov**
