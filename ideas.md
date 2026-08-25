# Direction artistique — Naboth Devis

## Trois pistes initiales

### Piste 1 — Bureau de confiance
Une interface claire et structurée, inspirée des produits SaaS B2B modernes, avec beaucoup d’espace blanc, une navigation latérale et des accents bleu marine, jaune et rouge issus du logo Naboth Corporation. L’intention est de rendre la gestion commerciale rassurante, lisible et immédiatement opérationnelle.

**Probability:** 0.07

### Piste 2 — Flux en mouvement
Une expérience plus expressive inspirée de la mise en scène de ngrok : grands titres, lignes de connexion, cartes flottantes et transitions qui suggèrent le passage du devis vers le client. La palette reste lumineuse et institutionnelle, avec des tracés jaunes et rouges comme signes de circulation et de validation.

**Probability:** 0.04

### Piste 3 — Atelier éditorial
Une interface éditoriale chaleureuse, dominée par des fonds ivoire, des blocs bleu profond et une typographie plus expressive. Les devis sont présentés comme des documents importants, avec une hiérarchie typographique proche d’un rapport professionnel.

**Probability:** 0.08

## Approche retenue — Flux en mouvement

### Design Movement
SaaS éditorial contemporain, inspiré des interfaces d’infrastructure de ngrok et de la signalétique des systèmes connectés, mais réinterprété dans une identité commerciale plus humaine et plus accessible.

### Core Principles
1. **Clarté d’action :** chaque écran doit répondre immédiatement à la question « quelle est la prochaine action ? ».
2. **Connexion visible :** les lignes, points et transitions représentent le chemin entre marchand, devis et client.
3. **Confiance documentaire :** les informations financières restent calmes, alignées et lisibles, sans effets décoratifs excessifs.
4. **Accent maîtrisé :** le bleu structure, le jaune attire l’attention positive et le rouge signale les actions sensibles ou urgentes.

### Color Philosophy
Le bleu marine du logo devient la couleur de confiance et de structure. Un bleu plus clair porte les surfaces interactives sans rendre l’interface froide. Le jaune orangé représente l’élan et les actions de création ou d’envoi. Le rouge corail est réservé aux alertes, refus et états nécessitant une attention. L’ensemble est posé sur un fond ivoire très clair afin de garder l’application lumineuse et éloignée d’un tableau de bord trop technique.

**Signature Brand Color:** `#F5B43C` — jaune Naboth, utilisé comme signal d’action et de progression.

### Layout Paradigm
La structure privilégie une barre latérale persistante pour l’espace marchand, une large zone de travail décalée et des cartes asymétriques. La page d’accueil publique s’inspire de ngrok avec un hero en deux temps : message de valeur à gauche, visualisation de flux à droite. Les écrans internes utilisent une composition 12 colonnes, des panneaux latéraux contextuels et des tableaux respirants plutôt qu’une succession de cartes identiques.

### Signature Elements
- Un motif de « route de devis » composé de points reliés par des lignes fines bleu clair, visible dans le hero et dans les états de suivi.
- Des accents en ruban jaune-orangé pour les actions clés : créer, envoyer, valider.
- Des pastilles d’état inspirées de nœuds réseau : Brouillon, Envoyé, Consulté, Accepté, Refusé.

### Interaction Philosophy
Les interactions doivent donner l’impression d’un système qui accompagne le marchand. Les boutons répondent immédiatement, les statuts se mettent à jour avec une transition courte, les panneaux apparaissent depuis leur zone d’origine et les actions destructives demandent une confirmation claire. Les fonctions non disponibles affichent un message explicite plutôt qu’un bouton silencieux.

### Animation
Les éléments de flux entrent avec une légère translation et une opacité progressive. Les boutons utilisent un retour de pression bref. Les listes apparaissent par groupes avec un décalage de 40 à 60 ms. Les transitions restent sous 280 ms et utilisent une courbe de sortie vive. Les animations non essentielles sont désactivées lorsque `prefers-reduced-motion` est actif.

### Typography System
- **Titres :** Space Grotesk, 600–700, pour donner une présence contemporaine proche des interfaces produit.
- **Interface et données :** Manrope, 400–700, pour une lecture nette des montants, tableaux et formulaires.
- **Hiérarchie :** H1 56–72 px sur la page d’accueil, H2 30–38 px, titres de modules 18–22 px, texte courant 14–16 px, données tabulaires 13–14 px.

### Brand Essence
**Naboth Devis aide les marchands à transformer une proposition en décision, sans perdre le fil entre leurs clients, leurs produits et leurs documents.**

Personnalité : **fiable, fluide, volontaire**.

### Brand Voice
Les titres sont directs et orientés résultat. Les CTA utilisent des verbes d’action concrets. Les microcopies rassurent sans devenir infantilisantes.

Exemple de titre : **« Du premier montant à la décision client. »**

Exemple de CTA : **« Créer un devis qui avance. »**

### Wordmark & Logo
Le symbole existant Naboth Corporation est conservé comme marque principale. Dans l’interface, il est accompagné d’un mot-symbole typographique « Naboth Devis » en Space Grotesk semi-bold, avec un petit point jaune relié par une ligne bleue au mot « Devis ». Le symbole graphique reste la signature visuelle et doit être présent dans l’en-tête, la page de connexion et le favicon.

## Règle de décision

À chaque choix de composant, de couleur ou de mise en page, vérifier : **« Est-ce que cette décision rend le parcours de devis plus clair et plus fluide, ou est-ce qu’elle ajoute seulement de la décoration ? »**

## Style Decisions

- Le motif « route de devis » doit apparaître sur chaque écran clé de l’application, sous forme de lignes fines et de nœuds reliant préparation, proposition, envoi et décision.
- L’identité Naboth reste présente dans l’espace marchand avec le symbole, le mot-symbole « Naboth Devis » et le point jaune relié, y compris dans les états internes et sur mobile.
- Le jaune `#F5B43C` est réservé aux actions qui font progresser le devis, aux états de progression et aux chiffres clés positifs ; il ne sert pas de décoration générique.
