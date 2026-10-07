# MySteamGames — Steam Workspace
## Design system et déclinaisons d’écrans · v1.0

7 octobre 2026 · Livrable pour Timothé et Codex

Ce document complète les spécifications UX/UI validées en révision 0.3. La direction graphique, Insights, le scroll infini, les jaquettes jointives, les jeux manuels, les skeletons et l’alternance des lignes sont acquis. Cette v1.0 fournit les choix détaillés pour leur implémentation ; elle ne prétend pas qu’un frontend a été développé ou testé. Les règles métier des specs restent applicables.

Les quatre planches visuelles livrées dans la conversation illustrent Insights, Picker, Wishlist et la fiche jeu. Leurs valeurs et visuels de jeux sont des exemples. Les dimensions, composants et comportements écrits ci-dessous font référence pour l’implémentation.

## 1. Identité et hiérarchie

Une bibliothèque personnelle dense, calme et lisible. Fond marine, texte clair, cyan pour les actions et la navigation. Les jaquettes apportent l’essentiel de la couleur. Pas de grands dégradés décoratifs, néons, flou de fond ou ombres sur chaque ligne.

Navigation exacte : **Games · Insights · Picker · Wishlist**. Textes fonctionnels en français. Nom temporaire MySteamGames. Une seule direction sombre ; pas de mode clair à maintenir pour le POC.

Hiérarchie : titre de page → contexte et filtres → contenu → actions secondaires. Un bouton primaire par zone de décision, pas une grille de boutons cyan. Le statut, l’accès et la note sont des informations distinctes.

## 2. Tokens utilisables

Bloc CSS de référence à adapter aux conventions du dépôt. Ces tokens ne constituent pas une nouvelle bibliothèque de composants.

```css
:root {
  color-scheme: dark;
  --msg-bg: #101822;
  --msg-surface: #182431;
  --msg-surface-hover: #223447;
  --msg-row-odd: #16222F;
  --msg-row-even: #1C2B3B;
  --msg-row-hover: #263D52;
  --msg-border: #35495E; /* séparateur décoratif */
  --msg-control-border: #7892AA; /* contour significatif */
  --msg-text: #F1F5F9;
  --msg-muted: #A9BACB;
  --msg-accent: #67C8F5;
  --msg-accent-hover: #8CD8FA;
  --msg-accent-pressed: #49B3E1;
  --msg-on-accent: #101822;
  --msg-selected: #193C50;
  --msg-success: #77D5AD;
  --msg-success-bg: #143A32;
  --msg-warning: #F5C66A;
  --msg-warning-bg: #3A301E;
  --msg-danger: #FF9CA8;
  --msg-danger-bg: #402631;
  --msg-skeleton: #304459;
  --msg-skeleton-highlight: #3B536B;
  --msg-overlay: rgb(3 9 15 / 64%);
  --msg-space-1: 4px;
  --msg-space-2: 8px;
  --msg-space-3: 12px;
  --msg-space-4: 16px;
  --msg-space-6: 24px;
  --msg-space-8: 32px;
  --msg-space-12: 48px;
  --msg-radius-sm: 4px;
  --msg-radius: 6px;
  --msg-control-height: 44px;
  --msg-sidebar-width: 216px;
  --msg-row-height: 72px;
  --msg-cover-width: 152px;
  --msg-drawer-width: 440px;
  --msg-motion-fast: 120ms;
  --msg-motion-panel: 180ms;
  --msg-shadow-overlay: 0 12px 32px rgb(0 0 0 / 32%);
}
```

Le contraste faible du séparateur décoratif est intentionnel ; ne pas utiliser `--msg-border` seul pour rendre un champ ou un focus reconnaissable. Les champs utilisent `--msg-control-border`. Pas de baisse d’opacité globale du texte secondaire pour obtenir un gris supplémentaire.

Vérification numérique des couleurs opaques, sur les fonds row-odd, row-even, row-hover et surface : contraste minimal du texte principal 10,24:1 ; secondaire 5,65:1 ; cyan 5,96:1. Texte du bouton primaire sur cyan : 9,49:1. Ces mesures ne certifient pas l’interface complète : vérifier également les tailles, opacités, superpositions et focus dans le rendu réel.

### Typographie

| Rôle | Taille / interligne | Graisse |
|---|---|---|
| Titre de page | 28 / 36 px desktop ; 24 / 32 mobile | 650 ou 600 |
| Titre de section | 18 / 26 px | 600 |
| Titre de widget | 16 / 24 px | 600 |
| Texte / tableau | 14 / 20 px | 400 ; titre jeu 600 |
| Champ de saisie | 16 / 24 px | 400 |
| Label / aide | 13 / 18 px | 400 ou 500 |
| KPI | 32 / 40 px ; 28 / 36 mobile | 650 ou 600 |
| Timer | 48 / 56 px | 600 |

Police système : `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`. Conserver Inter si le projet l’utilise déjà. Chiffres tabulaires pour notes, temps, prix et progression. Pas de police monospace généralisée. Un titre de jeu ne disparaît jamais sans moyen de lire son nom complet.

### Icônes et mouvement

Icônes cohérentes de 20 px, trait régulier, navigation 22–24 px. Réutiliser la bibliothèque existante. Une icône seule a un nom accessible et une zone de 44 × 44 px. Les étoiles sont réservées à la hype ; la note personnelle s’écrit `9/10`.

Transitions de couleur 120 ms, ouverture de panneau 180 ms ; aucune animation pour retarder un tirage ou des données déjà prêtes. Avec réduction des animations, supprimer translation et pulsation. Éviter toute animation continue hors skeleton ou progression réellement active.

## 3. Grille et shell

| Largeur disponible | Composition |
|---|---|
| ≥ 1 100 px | Sidebar 216 px, marge contenu 24 px, widgets sur 2 colonnes |
| 768–1 099 px | Sidebar en tiroir, marge 24 px, colonnes secondaires réduites ; widgets sur 1 ou 2 colonnes selon leur largeur |
| < 768 px | Menu en tiroir, marge 16 px, listes compactes, widgets sur 1 colonne |

Le contenu utilise la largeur disponible jusqu’à 1 600 px environ, puis se centre. La grille ne doit pas forcer un tableau trop large : masquer d’abord les colonnes facultatives, puis Mon avis derrière sa fiche/son bouton. À 375 px, aucun scroll horizontal global.

Sidebar : marque, espace 24 px, module de synchronisation, espace 24 px, navigation, profil ancré en bas. Élément de navigation : hauteur 44 px, icône + texte, sélection avec fond selected et barre cyan de 3 px. Ne pas utiliser seulement la couleur pour l’état actif (`aria-current`).

Mobile : en-tête 56 px, menu nommé, titre produit ; bande compacte de synchronisation de 48–56 px quand un job est actif. Une seule zone de défilement principale. Le tiroir de navigation est modal, se ferme après sélection et rend le focus au déclencheur.

Z-index relatifs : contenu 0, en-tête sticky 10, mini-timer 20, overlay modal 40, dialogue 50, menu interne au dialogue 60, notifications 70. Un menu ouvert depuis une modale doit rester dans sa couche et son périmètre de focus.

## 4. Composants communs

| Composant | Anatomie et règles |
|---|---|
| Bouton primaire | 44 px min, padding horizontal 16 px, fond accent, texte on-accent, rayon 6 px |
| Bouton secondaire | Fond surface, contour control-border, texte principal ; hover surface-hover |
| Action discrète | Texte secondaire ou cyan selon importance ; cible 44 px même si visuel plus petit |
| Champ / select | Label au-dessus, gap 8 px, hauteur 44 px min, contour control-border, fond bg, aide dessous |
| Textarea | Hauteur initiale 96 px, redimensionnement vertical permis desktop, pas de limite arbitraire inventée |
| Chip filtre | 32 px visuels dans une cible de 44 px, texte explicite, croix nommée si suppression |
| Onglets | Hauteur 44 px, actif texte clair et trait cyan de 2 px ; focus indépendant |
| Carte KPI | Padding 16–24 px, label puis valeur puis contexte/couverture ; hauteur min 124 px |
| Widget | En-tête 48–56 px, contenu padding 16 px, zone graphique min 240 px, taille stable pendant le chargement |
| Badge | Texte 13 px + icône facultative, hauteur visuelle 24–28 px ; cible 44 px s’il est interactif |
| Menu actions | Largeur min 200 px, items 44 px, noms explicites ; ne pas imbriquer plusieurs sous-menus |
| Toast | Confirmation brève, action Annuler si réversible ; ne remplace jamais l’erreur inline |
| Dialogue | 560 px max hors fiche, marge viewport 16 px, en-tête et pied identifiables, contenu scrollable |

### États de contrôle

| État | Rendu / comportement |
|---|---|
| Repos | Couleurs nominales |
| Hover | Éclaircissement du fond ; seulement sur pointeur compatible |
| Pressé | Couleur accent-pressed pour primaire, surface-hover pour secondaire |
| Focus visible | Contour accent 2 px avec espace 2 px ; focus jamais supprimé sans remplacement |
| Désactivé | Fond surface, texte secondaire ; raison accessible si non évidente ; ne reçoit pas de requête |
| Enregistrement | Libellé « Enregistrement… », largeur conservée, soumission du même formulaire désactivée |
| Erreur | Contour danger + message texte sous le champ ou le formulaire ; brouillon conservé |
| Succès | Retour au contrôle normal et confirmation « Enregistré » discrète |

Validation après interaction ou soumission, pas de formulaire rouge au premier affichage. Le bouton de fermeture respecte le brouillon : confirmer l’abandon seulement si des modifications existent. Un formulaire non modifié se ferme directement.

## 5. Liste partagée Games / Wishlist

Jaquette : colonne desktop 152 px, ligne de référence 72 px, image `cover` pleine hauteur. Zéro marge, padding, gap, rayon ou séparateur dans cette colonne. Le texte commence après 16 px. Les fonds alternent row-odd / row-even ; la parité utilise l’index de la liste filtrée et triée, y compris après les lots ou avec virtualisation.

Mobile : jaquette 96 px de large sur toute la hauteur réelle de ligne ; texte et contrôles à droite. La hauteur peut augmenter pour le titre et les contrôles, avec recadrage de l’image. Pas d’étirement de l’image. Pour les titres, deux lignes en aperçu, nom complet en fiche. Un bouton de fiche distinct évite le conflit entre ouvrir et éditer.

Scroll infini : lots d’affichage internes de 50, compteur descriptif, aucune pagination visible. Filtrer et trier tout le jeu de données avant révélation. Ne pas créer de faux délai ni de faux skeleton lors d’une simple extension de liste en mémoire. Garder l’ancre par identifiant en cas de rafraîchissement.

Games : Jeu, Accès, Temps, Ma note, Statut, Mon avis quand la largeur le permet, Actions. Avis toujours accessible et éditable via la fiche même si sa colonne n’est pas visible. Double-clic comme raccourci ; crayon/chevron et clavier/tap restent disponibles.

### Note, statut et accès

Note /10 : bouton valeur ou « Noter + » ; éditeur avec 10 boutons de 44 px minimum, disposés en deux rangées de cinq, choix effaçable. Fond selected + contour cyan pour la valeur choisie ; Enregistrer explicite. Pas d’étoile, pas de code couleur qui juge le goût de l’utilisateur.

Statuts : mapper les valeurs du contrat existant. Suggestions visuelles : 100 % = cyan/trophée ; Terminé = succès/coche ; Non terminé = secondaire/icône de progression ; Abandonné = warning/pause ; Non défini = neutre/tiret. Ne pas inventer un nouveau statut persistant « En cours » si le backend ne le prévoit pas.

Accès : Possédé (texte et coche), Famille (icône groupe), Non possédé ou Non accessible (neutre), Inconnu. La provenance « Joué via famille » est un second libellé : elle peut coexister avec Possédé. Source déclarative signalée dans les détails ; ne jamais attribuer un prêteur par déduction incertaine.

## 6. Écran Insights

### Disposition et filtres

En-tête : titre à gauche, sélecteur Moi / Famille / membre à droite. Rangée suivante : plateforme, période Mois / Année / Tout l’historique, sélecteur de date si nécessaire. Les contrôles passent à la ligne sur mobile ; aucune réduction sous leur largeur lisible.

Deux onglets : **Synthèse** et **Graphiques**. Les filtres sont partagés, persistants pendant le passage entre onglets. Indiquer « Cumul disponible » sur toute carte non filtrable dans le temps ; un changement de période ne réétiquette pas des totaux comme s’ils étaient annuels.

### Synthèse

Grille de KPI : 4 colonnes si chaque carte dispose d’au moins 180 px, sinon 2, puis 1 si nécessaire avec zoom. Les six indicateurs des specs peuvent occuper plusieurs rangées : possession, accès familial, jeux joués, temps, prix payés renseignés, coût/h. La planche montre un sous-ensemble de quatre pour illustrer la hiérarchie.

Sous les KPI : répartition des statuts et jeux les plus joués ; aperçu des genres préférés avec lien « Voir les graphiques ». La section famille est affichée dans le périmètre Famille. Dans Moi, limiter la section au récapitulatif des emprunts du joueur sélectionné ; ne pas afficher un classement complet des autres membres sous ce filtre.

### Graphiques

Grille fixe de deux colonnes, puis une sur mobile. Ordre : activité, dépenses, genres/tags appréciés, notes versus critique, partage familial si applicable. Aucun drag-and-drop. En-tête : titre, unité, information sur le périmètre ; pied : couverture, nombre d’observations et accès « Voir les données ».

Barres horizontales pour genres, barres verticales pour périodes, nuage de points pour comparaison de notes. Palette de séries : cyan #67C8F5, vert #77D5AD, jaune #F5C66A, violet clair #B8A5F5. Compléter par labels et formes ; ne pas attribuer simultanément une signification de succès/erreur à ces séries. La sélection d’un point n’est pas uniquement disponible au survol.

Tout montant estimé porte le mot « estimé » et sa base de calcul est accessible. Les notes par genre affichent n. Une absence d’historique est un état d’indisponibilité, pas un graphique plat à zéro ni un skeleton permanent. Exemple : « Historique non disponible — Le suivi commence à la collecte des sessions. »

## 7. Écran Picker

En-tête « À quoi jouer ? », contexte joueur, plateforme et genres ; nombre de candidats et lien Jeux exclus. Panneau résultat centré, largeur max 760 px ; jaquette au ratio source, titre 24 px, tags et accès. Pas de score pour un jeu jamais joué.

Avant le premier tirage : illustration neutre ou zone simple avec « Tirer un jeu ». Après tirage : bouton primaire Essayer 1 h, secondaire Un autre, action discrète Ne plus proposer. Les règles d’éligibilité validées restent strictes : temps nul connu, accès actuel confirmé, visible, non exclu, statut cohérent.

| État | Composition |
|---|---|
| Aucun candidat | Explication + Modifier les filtres ; pas de résultat factice |
| Candidats épuisés | « Tous les jeux ont été proposés » + Recommencer |
| Essai actif | Timer lisible, Pause et Arrêter ; actions de nouveau tirage remplacées pour éviter deux essais concurrents |
| Pause | Temps conservé, Reprendre ; titre « Essai en pause » |
| Terminé | « Tu as essayé ce jeu. Tu peux t’arrêter ici. » ; Noter le jeu, Modifier le statut, Fermer |

Le timer persiste à la navigation sous forme de barre compacte, sans recouvrir les contrôles en bas d’écran. Un seul essai actif ; changement de jeu exige d’arrêter l’essai courant. « Arrêter » n’est pas une suppression de données : bouton secondaire neutre plutôt qu’alerte rouge systématique.

Temps calculé à partir de l’échéance persistée ; pas à partir d’un compteur de ticks. Retour d’onglet : recalculer, ne pas repartir d’une durée périmée. L’essai ne modifie ni le temps joué ni le statut automatiquement. Son et alerte visuelle au terme ; ne pas garantir la sonnerie iPhone écran verrouillé. Aide près du timer : « Gardez l’application active pour recevoir l’alerte. »

## 8. Écran Wishlist

Titre, nombre de résultats, recherche ; filtres Genres, Hype, Non classés et tri Hype décroissante. Colonnes Jeu, Ma hype, Sortie, Prix actuel, Actions. L’absence de date ou prix importé se présente « Non disponible », pas une invitation à éditer si le champ ne l’est pas.

La vue initiale est la wishlist du joueur sélectionné. Un périmètre Famille ne s’affiche que si une source de données et une sémantique d’union sont définies ; le POC n’invente pas de wishlist familiale. L’ajout manuel de jeux appartient à Games. Ne pas introduire de bouton Ajouter un jeu sur Wishlist sans fonctionnalité distincte validée.

Hype : cinq étoiles, jaune warning pour remplies, contour secondaire pour vides. Null = « Classer + » ; ne pas laisser croire que null vaut zéro étoile. Sélecteur au clic : cinq choix de 44 × 44 px et Effacer ; annonce « Hype 4 sur 5 ».

Sur desktop large, les cinq étoiles peuvent être éditables dans la ligne. À 375 px, la colonne texte après jaquette peut être trop étroite : afficher une valeur compacte « ★ 4/5 » ouvrant un panneau bas avec les cinq grandes étoiles. Ne pas réduire leurs zones tactiles pour reproduire exactement la planche.

Sauvegarde de hype immédiate au choix, état pending puis confirmation ; erreur conserve le choix en brouillon et propose Réessayer. Si le tri change, repositionner seulement après confirmation, avec message indiquant la mise à jour ; ne pas déplacer une ligne pendant un hover d’étoile.

## 9. Fiche jeu et ajout manuel

Desktop : panneau modal latéral de 440 px ; overlay atténuant Games. En-tête avec titre et Fermer ; contenu scrollable ; pied sticky avec Annuler et Enregistrer pour l’édition. Mobile : écran modal pleine largeur, retour en haut, safe area en bas et marge pour que le pied ne cache aucun champ. À zoom élevé ou faible hauteur, laisser défiler le pied si nécessaire plutôt que bloquer le formulaire.

Ordre : jaquette, titre et plateforme/source → accès et provenance → Mon expérience → Temps et achat → Genres et tags → Données de référence → Visibilité et exclusions. Les sections basses restent accessibles par défilement ; ne pas tasser tout dans le premier écran.

| Section | Steam | Manuel |
|---|---|---|
| Titre / plateforme / image | Importés, lecture seule sauf future surcharge explicite | Éditables |
| Note / avis / statut | Éditables | Éditables |
| Temps de jeu | Importé, lecture seule | Heures + minutes ; vide reste inconnu |
| Prix réellement payé / date d’achat | Saisie personnelle | Saisie personnelle |
| Genres / tags | Genres importés ; tags personnels distingués | Genres et tags saisis |
| Critique / prix de référence | Source importée identifiée | Saisie facultative, source manuelle |
| Avis Steam | Lecture seule si disponibles | Non applicable |

Jeu manuel : badge « PS5 · Manuel ». Jeu importé : « Steam ». Une note personnelle ajoutée à un jeu Steam ne transforme pas la source de sa fiche en Manuel.

Prix payé : input monétaire avec label et devise, valeur vide autorisée, zéro explicite pour gratuit. Minutes 0–59 quand renseignées ; heures non négatives. Dates de formulaire civiles, format d’affichage localisé. Labels visibles, pas des placeholders seuls.

Ajout hors Steam : réutilise le formulaire dans un dialogue de 560 px desktop ou pleine largeur mobile. Titre et plateforme requis ; autres sections facultatives, regroupées pour ne pas imposer une longue saisie initiale. Enregistrer crée puis ouvre la fiche. Avertissement de doublon sans fusion automatique. Bouton de création « Ajouter le jeu », bouton d’édition « Enregistrer ».

Une erreur apparaît près des actions : « Impossible d’enregistrer. Vos modifications sont conservées. » avec Réessayer. Conserver le brouillon, replacer le focus sur la première erreur de validation le cas échéant, ne pas fermer le panneau. Les actions Masquer et Exclure du picker restent distinctes et réversibles.

## 10. Chargement, erreurs et données absentes

| Situation | Rendu de référence |
|---|---|
| Initialisation de liste | Skeletons sur la hauteur visible ; vraies dimensions de lignes et jaquettes jointives |
| Image seule en attente | Bloc image ; texte et contrôles déjà disponibles utilisables |
| KPI / graphique en attente | Titre conservé, skeleton valeur/tracé ; résolution indépendante |
| Refresh même contexte | Anciennes données conservées + Actualisation… |
| Changement de profil / période | Skeletons des zones affectées, aucune ancienne valeur sous un nouveau contexte |
| Donnée non collectée | Tiret + explication ; jamais zéro ou animation infinie |
| Liste vide | Message + action pertinente : Synchroniser ou Ajouter un jeu |
| Filtre sans résultat | Aucun résultat + Réinitialiser les filtres |
| Erreur réseau initiale | Erreur contextualisée + Réessayer |
| Erreur de refresh | Conserver les données et signaler leur ancienneté |
| Image échouée | Fallback permanent de mêmes dimensions |

Skeleton : délai d’apparition environ 150 ms, pulsation douce 1,8 s, pas de délai de disparition artificiel. Le fond des lignes reste alterné. Les placeholders de jaquette restent jointifs ; leur rayon est zéro. Les blocs de texte peuvent avoir un rayon de 4 px. Pas de contrôles factices focalisables. Région `aria-busy`, placeholders décoratifs ignorés par les technologies d’assistance.

Après 10 s, ajouter une aide d’attente, sans déclarer l’échec prématurément. Respect de la réduction des animations. Pendant le job Steam long, garder les données consultables et le module de synchronisation visible ; ne pas masquer la bibliothèque derrière un loader général.

## 11. Synchronisation et retours globaux

Module sidebar : titre, action Synchroniser au repos ; barre, traités/total, restants, estimation pendant le traitement. Mobile : bande compacte cliquable vers les détails. Le panneau de détail distingue réussis, ignorés, retries et échecs définitifs.

Utiliser la progression réelle. Si total inconnu, état indéterminé ; si retry attendu, « En attente » plutôt qu’une estimation figée. Une déconnexion du suivi n’est pas un arrêt du job. Réouverture de l’application : retrouver le job, ne pas redéclencher le POST pour récupérer son état.

Les confirmations ne volent pas le focus. Une erreur qui exige une action reste visible. Les annonces de progression sont limitées aux étapes significatives, jamais une annonce par jeu.

## 12. Écarts des maquettes à ne pas reproduire

Les planches servent à juger l’ambiance et la hiérarchie ; leur génération comporte des écarts corrigés ici :

- Wishlist : supprimer le « Manuel » accolé à Steam, le bouton Ajouter un jeu et la vue Famille tant que celle-ci n’est pas supportée. Les données indisponibles portent le bon état de lecture seule. Le module sync mobile reste visible si un job est actif.
- Wishlist mobile : passer par un sélecteur de hype si cinq cibles de 44 px ne tiennent pas. Les petits skeletons d’image dessinés avec une marge doivent devenir jointifs à l’implémentation.
- Fiche : garder les noms Games et Wishlist dans la navigation ; le fond illustratif de la planche ne redéfinit pas les colonnes ou statuts. « Possédé » appartient à Accès, pas au statut de progression. Les notes du tableau ne prennent pas d’étoile.
- Insights : le tableau comparatif des membres appartient au périmètre Famille. Les barres illustratives ne constituent pas des données ni des proportions à recopier ; le rendu final calcule les longueurs depuis les valeurs et les axes.
- Picker : Arrêter est une action neutre, même si la planche la colore en rouge ; Noter ouvre le sélecteur /10, sans étoile de hype.

## 13. Transmission à Codex et vérification ciblée

Inspecter les composants et styles existants avant de travailler. Conserver Angular Material si présent ; adapter les tokens aux API de thème du projet sans remplacer la pile. Ne pas dépendre des noms de classes internes fragiles d’une bibliothèque. Les styles proposés sont une référence ; aucun nouveau contrat backend n’est implicite.

Ordre : tokens/shell → composants de base → ligne partagée et skeletons → fiche/éditeurs → Wishlist → Picker → Insights. Construire chaque composant avec ses états avant de multiplier les écrans. Utiliser les DTO réels, dont les noms `personnalScore` et `personnalNotes`. Données fictives isolées dans les previews, jamais substituées silencieusement aux appels réels.

Critères de validation visuelle et d’usage :

1. 1 440 px desktop, 1 024 px intermédiaire et 375 px iPhone : contrôles utilisables, pas de scroll horizontal global ; tester aussi zoom texte.
2. Tableau : alternance stable après tri/filtre/scroll ; jaquettes jointives ; retour de fiche conservant l’ancre.
3. Édition : clic explicite, double-clic, clavier et tap ; succès et erreur avec brouillon préservé.
4. Hype : 44 px par choix dans le sélecteur, null distinct de 1/5 ; aucune confusion avec /10.
5. Chargement : dimensions stables, image seule lente, widget indépendant, absence de clignotement et animation réduite.
6. Focus : visible sur les deux fonds alternés et les panneaux, jamais piégé hors du dialogue ; retour au déclencheur.
7. Données : nulls et informations non collectées explicites ; manuel/Steam distincts ; aucune fausse activité annuelle.
8. Sync et timer : navigation possible, suivi retrouvable, pas de doublon, pas de promesse de sonnerie arrière-plan.

Le développeur reste responsable de l’implémentation et de la logique métier. Ce livrable fournit les décisions visuelles et les interactions suffisamment précisément pour éviter de les réinventer écran par écran.
