# MySteamGames — Guidelines UX/UI et spécifications

Version 0.3 · 7 octobre 2026 · Document de cadrage pour Timothé et Codex

**Décisions validées :** direction A « Steam Workspace », onglet Insights, scroll infini sans pagination, jaquettes jointives sur toute la hauteur des lignes, distinction possession / jeu via la famille, ajout de jeux hors Steam avec données manuelles. Les détails d'interaction ci-dessous restent des propositions de conception. Le nom de fichier historique est conservé ; cette révision remplace la v0.1.

## 1. Intention et périmètre

Un espace personnel pour comprendre sa bibliothèque Steam, exprimer ses goûts, profiter du partage familial et choisir son prochain jeu. POC réservé à son propriétaire. Pas de landing page, réseau social, onboarding commercial, gestion d'abonnement ou interface d'administration multi-utilisateur.

Le développeur garde la main sur le code et la logique. Ce document décrit les écrans et les règles UX sans imposer un nouveau framework ou reconstruire le projet. Les champs et capacités absents du backend doivent être identifiés, jamais simulés en production.

Priorités : bibliothèque utile avec environ 1 000 jeux ; édition personnelle évidente ; synchronisation longue non bloquante ; utilisation sur iPhone en portrait ; statistiques dont le sens et la provenance sont explicites.

## 2. Direction graphique retenue — Steam Workspace

Marine sombre, accent cyan, interface dense et jaquettes colorées. La direction A est retenue ; B est abandonnée. Conserver les contrôles d'édition explicites et accessibles au tap. Pas de deuxième thème pour le POC.

Les concepts sont illustratifs, jamais des données importables ni une spécification pixel-perfect. La maquette révisée doit montrer une colonne de jaquettes sans espacement vertical, le scroll infini, la provenance et le bouton Ajouter un jeu. Les premières maquettes avec pagination sont obsolètes sur ces points.

## 3. Architecture de navigation

Navigation retenue : **Games · Insights · Picker · Wishlist**.

- Games : bibliothèque, recherche, filtres, annotations, fiche jeu.
- Insights : fusion de Stats et Charts ; onglets « Synthèse » et « Graphiques » partageant profil et période.
- Picker : tirage d'un jeu inédit, exclusion et essai d'une heure.
- Wishlist : liste de souhaits avec hype personnelle.

Sidebar desktop fixe de 216 px ; marque en haut, module Synchronisation juste dessous, navigation puis profil en bas. Pas de page d'accueil supplémentaire : Games est l'entrée.

Sur mobile : en-tête avec menu ouvrant un tiroir de navigation ; le suivi de synchronisation reste visible sous l'en-tête même quand le menu est fermé. Pas de dépendance au survol. Retour de navigation préservant recherche, tri, quantité révélée et ancre de défilement.

Le sélecteur de périmètre propose Moi, Famille et un membre identifié, seulement si les données correspondantes sont disponibles. Famille affiche des jeux uniques avec leurs propriétaires ; ne pas confondre propriétaire et joueur. Un ami extérieur sans données disponibles n'est pas présenté comme consultable.

## 4. Games — bibliothèque

### Composition desktop

1. Titre Games, nombre de résultats, sélecteur de périmètre et bouton « Ajouter un jeu ».
2. Recherche par nom, boutons Genres, Statut, filtres avancés ; action Réinitialiser uniquement si nécessaire.
3. Filtres actifs sous forme de chips supprimables.
4. Tableau à en-tête fixe avec défilement infini ; aucune pagination ni sélection de taille de page.
5. Compteur discret « 100 affichés sur 1 000 » ; à la fin « Tous les jeux sont affichés ».

| Colonne principale | Contenu | Interaction |
|---|---|---|
| Jeu | Jaquette bord à bord dans sa cellule sur toute la hauteur, nom et plateforme | Bouton ou lien de fiche explicite |
| Accès | « Possédé », « Famille », « Non possédé » ou « Inconnu » ; provenance de jeu séparée | Filtres et détails |
| Temps | Heures et minutes, alignées à droite | Tri |
| Ma note | 1–10 ou « Noter + », crayon visible | Édition et tri |
| Statut | Badge texte et chevron | Édition et tri |
| Mon avis | Texte sur une ligne ou « Ajouter un avis » | Édition ; texte complet en fiche |
| Actions | Menu nommé « Actions pour [jeu] » | Masquer, détails |

Colonnes facultatives via « Colonnes » : Metacritic, avis Steam, prix payé, coût/h, dernière session, genres, détail des propriétaires. Éviter de tout afficher par défaut. Le prix payé est édité en fiche, pas en double-clic dans le tableau, pour respecter la demande de trois champs en édition directe.

Filtres POC : recherche, genres, statut, joué / jamais joué / inconnu, noté / non noté, visibles / masqués / tous, plateforme, source Steam / Manuel, possession et jeu via famille. Extensions : tags, propriétaire précis, intervalle de score. Entre familles de filtres : ET. Plusieurs genres sélectionnés : OU par défaut, explicitement nommé « Au moins un ». Appliquer filtre puis tri à l'ensemble des données, puis révéler progressivement les résultats. Une modification de recherche, filtre ou tri remet en haut de la nouvelle liste et réinitialise la quantité révélée. Valeurs nulles en fin de tri, dans les deux sens. Tri initial proposé : nom A–Z.

### Scroll infini et jaquettes jointives

Charger le jeu de données disponible, puis révéler les lignes par lots internes de 50 au voisinage du bas de liste. Ce découpage est invisible pour l'utilisateur et ne nécessite pas de pagination serveur. Recherche et tri portent toujours sur toutes les données, y compris les lignes non révélées. Pas de faux loader réseau pour un simple affichage local. Un bouton « Afficher la suite » sert uniquement de repli accessible si le déclenchement automatique ne fonctionne pas.

Conserver la position et la quantité révélée au retour d'une fiche ou d'un autre onglet. Lors d'une édition ou d'un rafraîchissement, préserver une ancre par identifiant stable ; ne pas remonter brutalement en haut. Une virtualisation peut limiter les lignes présentes dans le DOM si nécessaire, sans changer le comportement de scroll infini ; vérifier les éditeurs et le focus clavier avant de l'adopter. Pas de double scroll vertical sur mobile.

**Jaquette = 100 % de la cellule image et 100 % de la hauteur de ligne**, pas un fond étiré sur toute la largeur du tableau. Zéro padding, marge, gap ou arrondi entre deux jaquettes successives. Les images se touchent verticalement. Séparateurs de lignes uniquement dans la zone texte, jamais à travers la colonne image. `object-fit: cover`, sans déformation ; recadrage permis. Cible desktop : colonne de 152 px et ligne de 72 px ; cible mobile : colonne de 96 px sur la hauteur réelle de la ligne. Le padding de 12–16 px commence dans la cellule texte. En mobile, une ligne plus haute recadre davantage l'image, sans ajouter de bandes vides.

Réserver la taille des images pour éviter les sauts de défilement ; un fallback sans jaquette remplit la même surface. Angular MatTable peut être conservée si elle permet ces comportements sans fragilité. Le choix du composant reste au développeur.

### Édition

Les trois champs directs sont `personnalScore`, `personnalNotes` et le statut, via le contrat réel d'edit-one. Les noms historiques `personnal*` sont conservés jusqu'à une migration volontaire ; ne pas les renommer implicitement en `personal*`.

- Desktop : double-clic sur la valeur ouvre l'éditeur ; un bouton crayon / chevron fonctionne aussi au clic simple et au clavier.
- Mobile : un tap sur le contrôle ouvre le même formulaire en panneau bas ou dialogue adapté.
- Score : choix entier de 1 à 10, valeur null pour « Non noté », bouton Effacer. Jamais 0 pour représenter l'absence de note. Pas d'étoiles pour ce score : les étoiles sont réservées à la hype.
- Avis : textarea ; ne pas inventer de limite incompatible avec le backend. Afficher sa limite réelle si elle existe. Entrée ajoute une ligne ; Enregistrer explicite, raccourci Ctrl/Cmd+Entrée facultatif.
- Statut : liste issue du backend. Null = « Non défini ». Ne pas déduire un statut de complétion à partir du temps de jeu. « Jamais joué » est un filtre dérivé distinct.
- Enregistrer : requête limitée aux champs autorisés ; état « Enregistrement… », puis confirmation discrète. Échap annule. Fermer un formulaire modifié demande d'abandonner ou de revenir.
- En cas d'échec : conserver le brouillon et proposer Réessayer ; ne pas afficher une sauvegarde réussie avant confirmation. Éviter deux sauvegardes concurrentes pour la même cellule.
- Une édition modifiant le tri ou le filtre prend effet après sauvegarde ; prévenir si la ligne sort des résultats. Le refresh de synchronisation ne doit pas écraser un brouillon actif.

### Fiche jeu

Panneau latéral desktop d'environ 440 px ; pleine largeur sur mobile. Jaquette, titre, données Steam en lecture seule, score / avis / statut personnels, prix payé, genres/tags et visibilité. Le background Steam peut servir de bandeau très assombri, jamais de fond derrière un tableau ou du texte dense.

Pour les jeux manuels, toutes les métadonnées sont éditables dans la fiche ; seuls les trois champs personnels restent éditables directement dans la liste.

Prix payé : montant en euros saisi avec virgule acceptée, stocké selon le futur contrat en unité mineure ; « inconnu » distinct de 0 € (gratuit). Date d'achat facultative mais nécessaire pour les dépenses annuelles. Jeu d'un bundle : montant réparti manuellement si souhaité, sans compter le prix total du bundle sur chaque jeu.

Genres Steam en lecture seule par défaut. Tags personnels ajoutables / retirables quand le stockage existe ; distinguer source Steam et source personnelle. Une correction personnelle ne doit pas être écrasée au prochain import.

Masquer : action réversible avec Annuler, puis accès via filtre Masqués. Ne supprime ni le jeu ni ses annotations. Par défaut, masque la ligne de Games et l'exclut du Picker ; les statistiques conservent l'historique avec un filtre explicite « Inclure les jeux masqués » activé. Cette distinction évite de modifier silencieusement les dépenses historiques.

## 5. Insights — synthèse et graphiques

Barre de contexte commune : Moi / Famille / membre ; Mois / Année / Tout l'historique ; sélection du mois ou de l'année ; couverture des données visible. « Tout l'historique » est un libellé français plus clair que lifelong.

### Synthèse

Grille fixe : jeux possédés, jeux accessibles via la famille, jeux joués, heures cumulées, total des prix payés renseignés, coût/h. Puis répartition des statuts et liste des jeux les plus joués. Montrer le nombre de montants connus, par exemple « 320 € renseignés · 42/180 achats ». Une donnée absente apparaît « — » avec une raison, pas zéro.

### Graphiques

Grille fixe de deux colonnes desktop, une colonne mobile ; aucun déplacement ni redimensionnement de widget. Ordre proposé :

1. Activité dans le temps : barres mensuelles ou annuelles, uniquement avec historique disponible.
2. Dépenses par période : montants payés avec date connue, part non datée indiquée.
3. Genres/tags appréciés : barres horizontales, moyenne personnelle et nombre de jeux notés.
4. Mes notes et la critique : nuage de points pour score personnel × 10 versus Metacritic ; axes 0–100, seulement les paires disponibles.
5. Jeux partagés : tableau par membre, jeux empruntés et valeur estimée des achats évités.

Les valeurs exactes sont accessibles sans survol (tap ou tableau de données). Couleurs accompagnées de libellés ; axes et unités explicites. Préférer des barres aux camemberts avec beaucoup de catégories.

Le filtre de période ne doit pas donner l'illusion de filtrer une donnée cumulée. Sans historique, les widgets concernés restent en « Cumul disponible » et expliquent la limite ; ne pas répartir artificiellement les heures selon la dernière session. Pour les goûts, une note actuelle reste une note actuelle : suivre son évolution exige des versions datées. L'analyse de sentiment est hors POC et ne doit pas remplacer la note explicite.

### Définitions statistiques

| Indicateur | Règle proposée |
|---|---|
| Temps en heures | `playTime / 60` si l'unité minutes est confirmée |
| Coût/h d'un jeu | prix réellement payé en euros / heures ; — si prix inconnu ou durée nulle ; 0 €/h si gratuit et joué |
| Coût/h agrégé | somme des prix connus des jeux joués / somme des heures de ces mêmes jeux ; jamais la moyenne des ratios individuels |
| Avis Steam positifs | positifs / (positifs + négatifs) × 100 ; — si total nul |
| Genre préféré | moyenne des notes non nulles des jeux associés ; afficher n, signaler n < 3 ; un jeu multigenre participe à chaque genre |
| Écart critique | moyenne de (note personnelle × 10 − Metacritic), avec n ; ce n'est pas une mesure suffisante de corrélation |
| Jeux joués sur une période | nombre de jeux distincts avec activité observée sur cette période ; exige un historique |
| Famille : jeux accessibles | union dédupliquée par appId ; propriétaires conservés séparément |
| Famille : heures | somme des temps de chaque membre ; libeller « heures des membres », pas durée unique du jeu |
| Économie familiale | estimation par membre/jeu joué sans achat personnel, avec prix de référence et date indiqués ; ne jamais présenter cette valeur comme un gain réel certain |

Posséder un jeu ne prouve pas l'avoir acheté ; y avoir joué ne prouve pas l'avoir emprunté à tel membre. Si plusieurs membres possèdent le même jeu, ne pas attribuer arbitrairement le prêteur. Sans source d'emprunt, libeller « Jeu accessible via la famille ». Sans date d'accès/achat, les économies annuelles ne sont pas calculables de façon fiable.

## 6. Synchronisation longue

Module persistant en haut de sidebar ; déclencheur « Synchroniser » au repos. Pendant le job : barre de progression, nombre traité / total, nombre restant et temps estimé. Clic sur le module ouvre les détails sans bloquer la navigation.

Action connue : `POST /populate-games-table`. Le contrat de réponse et le moyen de retrouver un job actif doivent être confirmés. Après lancement, suivre l'identifiant du job ; se reconnecter au job existant après rechargement. Ne jamais relancer automatiquement le POST pour retrouver la progression. Le backend doit empêcher les doublons, au-delà du simple bouton désactivé.

| État UX | Affichage et actions |
|---|---|
| Repos | Dernière synchronisation connue ; Synchroniser |
| Démarrage | « Préparation… » ; action désactivée ; total éventuellement inconnu |
| En cours | « 642 / 1 000 traités · 358 restants · environ 5 min » |
| Attente de retry | « En attente · nouvelle tentative prévue… » si l'horaire est connu ; pas d'ETA trompeuse |
| Suivi déconnecté | « Suivi interrompu · reconnexion… » ; ne pas affirmer que le job est arrêté |
| Succès | Date, compte des réussites et éléments ignorés ; dernier état conservé |
| Fin avec erreurs | Nombre d'erreurs et action de retry seulement si disponible |
| Échec global | Message compréhensible, détails, action autorisée par le contrat |

Définir les compteurs : réussis, ignorés définitivement, en attente, actifs, à retenter. « Traités » compte les éléments définitivement terminés (réussis + ignorés + échecs définitifs) ; un item en retry n'est pas terminé. 100 % signifie fin du traitement, pas 100 % de réussite. Ne pas déduire la sémantique métier du seul nom `Failed` ou `Canceled`.

Temps restant : estimation d'après le débit observé, affichée après un échantillon suffisant ; afficher « Estimation en cours » au début, « En attente » pendant une limitation. Choisir WebSocket ou polling selon l'existant ; ne pas imposer les deux. Conserver les données déjà disponibles durant les 15 minutes. Un bouton Annuler n'est affiché que si une vraie annulation est supportée.

## 7. Picker

Écran calme : titre « À quoi jouer ? », périmètre Moi / Famille, nombre de candidats, filtres de genre facultatifs, action « Tirer un jeu ». Pas de roue animée ni attente artificielle.

Éligibilité par défaut pour le joueur sélectionné : accès connu, temps connu égal à zéro, jeu visible, non exclu du picker. Temps inconnu = exclusion avec explication dans les diagnostics. Exclure aussi les statuts explicitement terminés / 100 % / abandonnés si une incohérence de temps indique zéro. Pour la famille, ne pas exclure un jeu simplement parce qu'un autre membre y a joué.

Résultat : grande jaquette, titre, genres, provenance de l'accès ; actions « Essayer 1 h », « Un autre », menu « Ne plus proposer ». Tirage uniforme parmi les candidats, sans répétition dans la session jusqu'à épuisement ; afficher « Tous les candidats ont été proposés » puis proposer de recommencer. Aucun candidat : expliquer les filtres et offrir de les réinitialiser.

« Ne plus proposer » ajoute une exclusion personnelle du picker, réversible dans une liste dédiée. Cette action ne masque pas automatiquement le jeu de Games. « Masquer dans ma bibliothèque » reste une autre action du menu.

Essai : timer démarré explicitement, heure de fin persistée, pause / reprendre / arrêter, mini-timer global visible si navigation. À la fin : « Tu as essayé ce jeu. Tu peux t'arrêter ici. » puis noter / changer le statut / fermer. Ne jamais marquer Terminé automatiquement.

Le navigateur sur iPhone peut suspendre l'onglet et empêcher une sonnerie à l'heure prévue. Concevoir le timer comme une aide tant que l'application est active ; recalculer à partir de l'heure de fin au retour. Ne pas promettre une alarme fiable écran verrouillé. Tester le son après un geste utilisateur et proposer une alerte visuelle ; notification optionnelle, jamais requise pour utiliser le picker.

## 8. Wishlist

Même structure que Games, moins de colonnes : Jeu, Hype, Sortie, Prix actuel si disponible, Actions. Recherche par nom ; filtres genre, hype, non classés et disponibilité. Tri proposé : hype décroissante, puis nom ; valeurs non classées en fin.

Hype : 1 à 5 étoiles, boutons accessibles au tap et au clavier ; libellé « Hype 4 sur 5 », action « Effacer la hype ». Null = non classé, distinct d'une étoile. Sur mobile, chaque cible mesure au moins 44 × 44 px ; déplacer les cinq étoiles sur une ligne dédiée ou ouvrir un sélecteur si nécessaire.

Pas de confusion entre étoiles de hype et score d'appréciation /10. Pour 400 jeux, mêmes règles de scroll infini, jaquettes jointives et filtres locaux. Le passage de wishlist vers bibliothèque ne transforme pas la hype en note et ne supprime rien sans comportement défini par la source de données.

## 9. Données disponibles et manquantes

| Champ fourni | Usage / prudence |
|---|---|
| id, name | Identité et titre |
| imgIconUrl | Malgré son nom, l'exemple contient une jaquette header ; respecter le ratio réel, fallback si erreur |
| backgroundUrl | Bandeau facultatif en fiche |
| genres | Objets id/description ; distincts des tags |
| playTime | Hypothèse : minutes, à confirmer ; 1753 → 29 h 13, 347 → 5 h 47, 277 → 4 h 37 |
| lastTimePlayed | Hypothèse : Unix en secondes ; dernière session connue, pas historique |
| releaseDate | Date civile YYYY-MM-DD ; éviter un décalage de jour par conversion de fuseau |
| initialPrice | Hypothèse : centimes EUR, à confirmer ; prix de référence, jamais montant effectivement payé |
| personnalScore / personnalNotes | Avis personnels ; null / vide distincts de zéro |
| metacriticScore | Note critique ou null |
| positiveReviews / negativeReviews | Compteurs d'avis Steam |
| visibility | Respecter les IDs et la distinction masquage manuel / par défaut |
| status | Objet nullable ; mapper le vrai contrat d'édition, sans inventer gameStatus dans le payload |
| createdAt / updatedAt | Dates de la fiche importée ; ni date d'achat ni historique d'activité |

À ajouter pour les fonctionnalités retenues : identifiant interne indépendant de Steam, source Steam / Manuel, plateforme, possession actuelle, provenance de jeu et sa fiabilité ; prix payé + devise + date d'achat ; propriétaire(s) et accès familial ; temps par joueur ; tags avec origine ; wishlist + hype ; exclusion du picker par joueur ; historique d'activité ; données de job consultables après refresh.

Les notes, statuts, prix et exclusions sont logiquement liés à un joueur et un jeu. Même avec un seul utilisateur dans le POC, ne pas écraser ses annotations en affichant le profil d'un membre. Les données d'autres membres sont en lecture seule sauf capacité explicite.

Les snapshots quotidiens de temps peuvent fournir des différences à partir de leur mise en place, mais ne reconstruisent pas le passé ni l'heure exacte des sessions. Les séries doivent indiquer « Suivi depuis le… » et leurs trous de collecte.

## 10. Socle visuel — direction A

Ces tokens sont des points de départ. Vérifier les contrastes lors de l'implémentation avant de les figer.

| Token | Valeur |
|---|---|
| background | #101822 |
| surface | #182431 |
| surface-hover | #223447 |
| row-odd | #16222F |
| row-even | #1C2B3B |
| row-hover | #263D52 |
| skeleton-base | #304459 |
| skeleton-highlight | #3B536B |
| border | #35495E |
| text-primary | #F1F5F9 |
| text-secondary | #A9BACB |
| accent | #67C8F5 |
| on-accent | #101822 |

Échelle d'espacement : 4, 8, 12, 16, 24, 32, 48 px. Marges de page : 24 desktop / 16 mobile. Grille de widgets : gap 16–24 px. Rayon : 6 px pour les contrôles et panneaux ; 0 pour les jaquettes de liste. Ombre réservée aux panneaux flottants ; surfaces surtout séparées par bordures. Pas de néons, glassmorphism ou grands dégradés décoratifs.

Typographie : sans-serif système au POC, alternative Inter si déjà disponible. Texte/table 14 px desktop ; contrôles de saisie mobile 16 px ; secondaire 12–13 px ; titres 24–28 px. Chiffres tabulaires pour durées, prix, compteurs. Tableau : lignes de référence 72 px ; mobile : lignes extensibles, pas de hauteur fixe qui coupe un titre.

États de composants à spécifier dans la version finale : repos, hover, focus visible, pressé, désactivé, chargement, erreur, succès, valeur absente, données périmées. Le focus doit se distinguer de la sélection. Statuts combinant texte et couleur ; pas de score exprimé uniquement par rouge/vert.

## 11. Responsive et accessibilité

- ≥ 1 100 px : sidebar fixe, tableau complet principal, graphiques en deux colonnes.
- 768–1 099 px : navigation repliable, colonnes secondaires retirées, contrôles pouvant revenir à la ligne.
- < 768 px : navigation en tiroir, liste compacte à la place du tableau, panneau d'édition pleine largeur, graphiques empilés.
- Cible minimale : viewport de 375 px en portrait, sans scroll horizontal global. Aucune obligation de passer en paysage.
- Chaque ligne mobile contient titre, jaquette jointive, plateforme/accès, temps, note et statut ; les avis et détails restent accessibles par la fiche.
- Cibles tactiles de 44 px minimum, champs mobiles 16 px, respect des zones sûres du téléphone.
- Contraste à contrôler : 4,5:1 pour le texte courant, 3:1 pour grands textes et éléments UI significatifs. Respect du zoom et de la réduction des animations.
- Navigation clavier ; dialogues avec focus contenu, fermeture Échap et retour du focus au déclencheur. Boutons icônes nommés. Pas d'action uniquement au double-clic ou au hover.
- Progression annoncée avec parcimonie aux technologies d'assistance ; éviter une annonce par item.

## 12. États transversaux

Chargement initial : skeleton de structure stable. Bibliothèque vide : action Synchroniser. Aucun résultat de filtre : conserver les filtres visibles et proposer Réinitialiser. Erreur réseau : message contextualisé et Réessayer, sans remplacer une liste déjà chargée par un vide. Image absente : bloc neutre sans casser la ligne. Statistique indisponible : raison et donnée requise.

Les filtres et préférences de colonnes peuvent être conservés localement ; annotations et exclusions durables doivent utiliser leur source backend quand disponible. Les données de démonstration sont clairement séparées et étiquetées. Aucun chiffre inventé pour remplir un dashboard réel.

## 13. Ordre de réalisation proposé

1. Décisions acquises : A et Insights ; intégrer les retours de cette v0.2 dans les maquettes.
2. Décliner la direction retenue sur Insights, Picker, Wishlist, fiche jeu et états clés ; livrer le design system final.
3. Implémenter le shell, Games, édition et sync avec les données réelles existantes.
4. Ajouter les jeux manuels, les prix payés, la synthèse cumulée et le picker ; étendre les contrats uniquement avec accord du développeur.
5. Ajouter wishlist/hype et vues familiales quand les sources sont disponibles.
6. Instrumenter l'historique pour les séries temporelles futures. Analyse de sentiment ultérieure, hors POC.

## 14. Critères de recette utiles

- Avec 1 000 jeux, recherche + filtres + tri sont cohérents sur tous les résultats, y compris les lignes non encore révélées.
- Note null, Metacritic null, statut null, prix inconnu et temps nul ont chacun un rendu correct.
- Les trois éditions fonctionnent au double-clic, au clic explicite, au clavier et au tap. Une erreur conserve le brouillon.
- Un jeu masqué est retrouvable et restaurable ; une exclusion du picker ne masque pas involontairement la bibliothèque.
- Une synchronisation se poursuit pendant la navigation ; un refresh retrouve son état sans créer un doublon.
- Un retry ou une déconnexion ne produit pas un faux succès ni une ETA certaine.
- Le picker n'inclut ni jeu déjà joué par le joueur ciblé, ni jeu masqué, ni exclusion personnelle.
- À 375 px, recherche, tri, édition, hype et navigation restent utilisables sans zoom manuel.
- Tout indicateur monétaire indique sa provenance ; aucune donnée cumulée n'est présentée comme une mesure annuelle sans historique.

## 15. Consignes de transmission à Codex

Lire ce document avant de modifier le frontend, puis inspecter les composants, contrats et conventions du dépôt. Ne pas remplacer Angular Material ni introduire une bibliothèque sans besoin validé. Appliquer la direction A validée et les règles de jaquettes jointives et de scroll infini. Respecter les noms réels des DTO et les routes connues ; ne pas inventer de endpoints pour les fonctionnalités futures.

Traiter le document comme une spécification de comportement ; les images illustrent l'ambiance. En cas de conflit, appliquer les règles écrites puis signaler la divergence. Conserver le backend et la logique métier sous le contrôle du développeur. Réaliser les écrans progressivement avec les états absents/erreur, puis vérifier sur desktop et iPhone. Le livrable suivant attendu est le design system de la direction retenue, pas une réécriture automatique du projet.


## 16. Possession, accès et jeu via la famille

Ces informations répondent à trois questions différentes : « À qui appartient le jeu ? », « Comment puis-je y accéder maintenant ? » et « Comment y ai-je joué ? ». Ne pas réduire ces axes à un seul booléen.

| Situation du joueur sélectionné | Libellés dans Games |
|---|---|
| Possède le jeu, provenance historique non renseignée | « Possédé » |
| Ne le possède pas, accès familial disponible, pas encore joué | « Famille · jamais joué » |
| Ne le possède pas, a joué via la famille (confirmé ou déclaré) | « Non possédé » + « Joué via famille » |
| Le possède maintenant mais avait joué via la famille | « Possédé » + « Joué via famille » |
| Accès familial présent, heures connues, origine des heures inconnue | « Famille » + « Provenance de jeu inconnue » en fiche |
| Aucun accès actuel mais historique conservé | « Non accessible » ; conserver temps, note et avis |

Sur desktop, une colonne Accès reste visible ; une ligne secondaire ou un badge textuel indique « Joué via famille » lorsqu'on le sait. Sur mobile, ces informations passent sous le titre. Un pictogramme seul ne suffit pas. En vue Famille, les propriétaires sont accessibles en fiche avec leur nom ; ne pas afficher « Possédé » sans préciser le joueur de référence.

Ajouter les filtres « Possédés », « Non possédés », « Accès familial » et « Joués via famille ». Propriétaire et prêteur effectif restent distincts. Si la source n'expose pas la provenance d'une session, permettre une déclaration manuelle dans la fiche (« J'y ai joué via ma famille », prêteur facultatif), signalée « Déclaré manuellement ». Ne pas déduire une preuve d'emprunt à partir du seul temps de jeu et de la possession actuelle. Une synchronisation ne doit pas écraser cette déclaration.

Insights sépare jeux possédés, jeux accessibles et jeux joués via famille. Les économies restent estimées avec leur base de prix ; l'achat ultérieur ne doit pas effacer l'historique de provenance ni être compté deux fois. Une vue annuelle nécessite une date d'emprunt/session ou une déclaration datée.

## 17. Jeux manuels hors Steam

### Parcours d'ajout

Bouton « Ajouter un jeu » dans l'en-tête Games ; sur iPhone, bouton + nommé accessible. Ouvre « Ajouter un jeu hors Steam » en dialogue desktop ou plein écran mobile. Ce parcours est disponible sans lancer une synchronisation Steam.

Champs :

- Obligatoires : titre et plateforme (PS5, PS4, Xbox, Switch, PC hors Steam, Autre avec libellé).
- Jaquette facultative : image choisie par l'utilisateur ; aperçu et recadrage, fallback sinon. Ne pas bloquer l'ajout sans image.
- Possession actuelle : Oui / Non / Inconnue. Mode d'accès facultatif : achat personnel, prêt, abonnement, autre ; un abonnement console ne devient pas un partage familial Steam.
- Temps joué : saisie heures + minutes, facultative ; vide = inconnu, zéro = jamais joué. Pas de valeur zéro implicite.
- Ma note /10, avis, statut, genres, tags, prix payé, date d'achat, dernière session, date de sortie : facultatifs et entièrement manuels.
- Metacritic et prix de référence : facultatifs, avec indication de provenance manuelle et plateforme pour une comparaison pertinente. Les compteurs d'avis Steam ne s'appliquent pas à un jeu hors Steam.

Enregistrer crée le jeu et ouvre sa fiche, avec confirmation. Si le filtre courant le masque, proposer « Voir le jeu » sans supprimer silencieusement les filtres. Alerter sur un doublon titre + plateforme avec possibilité de continuer ; ne jamais fusionner automatiquement sur le seul nom.

### Comportement dans la bibliothèque

Même liste, mêmes notes, statuts, masquage et coût/h que les jeux Steam. Afficher « PS5 · Manuel » sous le titre, pas une catégorie isolée par défaut. Tout est éditable dans la fiche ; le double-clic du tableau reste limité à note, avis et statut. La synchronisation Steam ignore ces entrées et préserve leurs données.

Prévoir un identifiant interne distinct de l'appId Steam. `steamAppId` peut être absent pour un jeu manuel ; ne pas inventer un faux appId ni utiliser le titre comme clé. Le même titre sur PS5 et Steam peut rester deux entrées distinctes. Les heures et achats sont propres à l'entrée / plateforme / joueur ; une future association entre éditions sera explicite. Tant qu'aucun regroupement n'existe, Insights compte des « entrées de bibliothèque », pas forcément des œuvres uniques.

### Statistiques et picker

Insights propose Toutes les plateformes / Steam / plateforme choisie et indique la part saisie manuellement. Les notes, genres, dépenses connues et heures connues des jeux manuels participent aux mêmes calculs, avec les mêmes règles de données absentes. Un temps total saisi ne permet pas de remplir un graphique annuel. Pour une activité datée, proposer des sessions manuelles (date + durée) si cette fonctionnalité est implémentée ; ne pas additionner à nouveau ces sessions à un total qui les inclut déjà. Les dépenses datées, en revanche, peuvent utiliser directement la date d'achat saisie.

Un jeu manuel peut entrer dans le picker uniquement si un accès actuel est confirmé, un temps égal à zéro est renseigné et les autres règles d'éligibilité sont remplies. Ajouter un filtre plateforme au picker ; la vue famille Steam ne doit pas y introduire arbitrairement des jeux console.

### Recette complémentaire

- Les jaquettes sont jointives verticalement sur desktop et mobile, y compris pour une image manquante.
- Ni Games ni Wishlist ne présentent de numéros de page ; atteindre le bas révèle la suite sans perdre le focus ou les filtres.
- Un jeu possédé après un emprunt peut afficher les deux informations sans contradiction.
- Un jeu PS5 créé manuellement reste intact après une synchronisation Steam.
- Un temps inconnu n'est jamais confondu avec zéro ; un jeu manuel ne gonfle ni les avis Steam ni les économies de la famille Steam.

## 18. Skeletons — chargements initiaux et partiels

Ajout validé en v0.3 : prévoir des skeletons par composant, pour les listes, widgets, statistiques et images. Ils reprennent les dimensions du contenu attendu dans la palette marine. Ils représentent une attente réelle, jamais une erreur, un résultat vide ou une donnée indisponible.

| Élément | Skeleton prévu |
|---|---|
| Games / Wishlist | Lignes couvrant la hauteur visible (environ 8 desktop, adaptées au viewport mobile), blocs de jaquette, titre, métadonnées, score et statut aux dimensions finales |
| Jaquette / image | Rectangle pleine cellule, sans marge ni arrondi dans la liste ; seul ce rectangle reste en attente si le reste est disponible |
| Carte statistique | Titre connu conservé ; blocs à la place de la valeur et de son complément, sans faux zéro |
| Widget graphique | Cadre et titre conservés, zone de tracé réservée à hauteur stable ; blocs neutres, aucune courbe ni valeur fictive |
| Fiche jeu / picker | Emplacements des champs et images en attente uniquement ; informations connues immédiatement affichées |

- Réserver l'espace immédiatement ; afficher les skeletons après environ 150 ms si l'attente persiste pour éviter les flashs. Ne jamais retarder une réponse prête.
- Animation douce de luminosité sur environ 1,8 s entre skeleton-base et skeleton-highlight. Pas de balayage blanc ni de clignotement. Animation désactivée avec `prefers-reduced-motion` et hors écran.
- Chaque widget se résout indépendamment. Garder navigation, titres et contrôles indépendants utilisables.
- Lors d'un refresh du même contexte, conserver les données affichées et signaler « Actualisation… ». Si le profil ou la période change, montrer les skeletons dans les zones affectées plutôt que des valeurs de l'ancien contexte sous les nouveaux filtres.
- Le scroll infini sur données en mémoire ne déclenche pas de faux chargement. Si un futur fetch devient nécessaire, ajouter quelques lignes skeleton en bas, sans remplacer les lignes existantes ni déplacer l'ancre.
- Une image en erreur passe à un fallback permanent ; elle ne reste pas en animation. Une valeur absente passe à son état indisponible explicite.
- Après environ 10 secondes, accompagner l'attente de « Le chargement prend plus de temps que prévu ». Une erreur confirmée ou un timeout de requête conduit à l'état d'erreur avec Réessayer ; la durée seule ne prouve pas une panne.
- Pendant la synchronisation de 15 minutes, conserver la bibliothèque utilisable et le suivi de progression. Ne pas remplacer tout l'écran par des skeletons.
- Blocs décoratifs non focalisables et masqués aux lecteurs d'écran ; région concernée marquée `aria-busy`, une annonce de chargement puis de disponibilité, pas une annonce par bloc.

## 19. Lignes alternées — lisibilité Steam Workspace

Ajout validé en v0.3 : alternance subtile mais perceptible des fonds dans Games et Wishlist, desktop et iPhone.

| État | Fond |
|---|---|
| Ligne impaire (première ligne) | `#16222F` |
| Ligne paire | `#1C2B3B` |
| Survol souris | `#263D52` |
| Focus clavier | Fond conservé et contour cyan visible sur le contrôle actif |

L'alternance couvre toute la zone de données, sans teinter les jaquettes ni les badges sémantiques. Les images restent jointives ; aucune marge ou ombre entre lignes. Séparateurs fins uniquement dans la zone texte. Vérifier le contraste des textes sur les deux fonds et au survol.

Calculer la parité depuis l'index de la liste triée et filtrée, pas depuis l'identifiant du jeu. Continuer l'alternance entre lots du scroll infini. En virtualisation, utiliser l'index absolu du résultat et non celui du nœud DOM recyclé. Les lignes skeleton respectent également cette alternance.

Le survol ne représente pas une sélection ; le focus reste matérialisé par un contour. Une éventuelle sélection future utilisera aussi un marqueur explicite. Sur mobile, ne pas laisser de hover persistant après un tap.

### Recette complémentaire

- Réseau lent : structure stable lors de l'arrivée des textes, images et widgets.
- Chargement partiel : seul le contenu manquant affiche un skeleton ; le reste reste utilisable.
- Image absente, widget vide et erreur réseau ont des états finaux distincts du chargement.
- Réduction des animations : skeletons statiques mais état d'attente compréhensible.
- Tri, filtre, ajout de lot et retour de fiche préservent une alternance cohérente et des jaquettes jointives.
