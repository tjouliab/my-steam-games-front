# MySteamGames — roadmap d’implémentation

Dernier suivi : 8 octobre 2026

Ce document est la source de vérité de l’avancement de la migration vers le design system Steam Workspace et de l’implémentation des fonctionnalités du POC.

## Utilisation de la roadmap

Statuts autorisés :

- **À faire** : aucune implémentation validée n’est en cours.
- **En cours** : jalon principal de l’intervention active. Un seul jalon principal peut porter ce statut.
- **Bloqué** : le travail ne peut pas avancer sans décision, contrat ou changement externe identifié.
- **Terminé** : toutes les tâches et le critère de sortie du jalon ont été vérifiés.

Règles de mise à jour :

1. Marquer le jalon concerné **En cours** au début de son implémentation.
2. Cocher une tâche uniquement lorsqu’elle est implémentée et vérifiée.
3. Inscrire les blocages et contrats manquants sous la tâche concernée.
4. Reporter les commandes ou recettes effectuées dans la section Validation du jalon.
5. Passer un jalon à **Terminé** uniquement lorsque son critère de sortie est satisfait.
6. Mettre à jour la date de dernier suivi à chaque modification d’avancement.

## Répartition du travail

- **Codex** : design, responsive, accessibilité, styles, états UI et intégration du SDK.
- **Timothé** : architecture Angular, logique composants et algorithmique, modèle Drizzle, migrations SQLite, logique métier Nest et intégration Steam.
- **Ensemble** : contrats frontend/backend, arbitrages métier et recette de chaque jalon.

Chaque changement backend affectant les contrats se termine par la régénération du SDK, puis par la compilation du frontend. Les URL HTTP existantes sont conservées et complétées.

## Vue d’ensemble

| Étape | Statut | Responsable principal | Dépend de |
|---|---|---|---|
| Acquis — socle global du design system | Terminé | Codex | — |
| Jalon 0 — Sécuriser le point de départ | À faire | Ensemble | Acquis |
| Jalon 1 — Identité durable et contrat Games | À faire | Timothé | Jalon 0 |
| Jalon 2 — Shell responsive et navigation | À faire | Codex | Jalon 0 |
| Jalon 3 — Games complet | À faire | Codex | Jalons 1 et 2 |
| Jalon 4 — Synchronisation persistante | À faire | Ensemble | Jalons 1 à 3 |
| Jalon 5 — Fiche et jeux manuels | À faire | Ensemble | Jalons 1 à 4 |
| Jalon 6 — Picker | À faire | Codex | Jalon 5 |
| Jalon 7 — Wishlist | À faire | Ensemble | Jalons 4 et 5 |
| Jalon 8 — Insights | À faire | Ensemble | Jalons 4, 5 et 7 |
| Jalon 9 — Famille et données par joueur | À faire | Timothé | Jalons 1 à 8 |
| Jalon 10 — Recette et suppression du legacy | À faire | Ensemble | Jalons 1 à 9 |

## Acquis — socle global du design system

**Statut : Terminé**

- [x] Lire les spécifications UX/UI v1.0 et le design system v1.0.
- [x] Ajouter les couleurs Steam Workspace sous forme de tokens CSS `--msg-*`.
- [x] Ajouter les tokens de typographie, espacements, dimensions, mouvements et z-index.
- [x] Ajouter les breakpoints de 768 px et 1 100 px et les valeurs responsives associées.
- [x] Exposer les couleurs et breakpoints utiles à Tailwind.
- [x] Configurer Angular Material en thème sombre cyan.
- [x] Utiliser la pile de polices système et supprimer le chargement de Roboto.
- [x] Ajouter les styles globaux de focus et de réduction des animations.
- [x] Passer la langue racine du document HTML en français.

Validation effectuée :

- [x] `pnpm build` le 7 octobre 2026.
- [x] Build réussi avec les avertissements connus sur le budget initial et `jsbi` CommonJS.

## Jalon 0 — Sécuriser le point de départ

**Statut : À faire**

- [ ] Préserver et isoler les changements utilisateur déjà présents.
- [ ] Cartographier les composants legacy qui seront remplacés et leurs comportements encore utiles.
- [ ] Créer les premiers tests frontend pour les règles pures : tri, filtrage, alternance et éligibilité Picker.
- [ ] Introduire progressivement l’organisation `core/layout`, `core/sync`, `features/*` et `shared/ui` sans déplacement massif anticipé.
- [ ] Confirmer les commandes de validation frontend et backend réelles.
- [ ] Documenter les avertissements de build déjà présents afin de distinguer les régressions.

Critère de sortie : le point de départ est reproductible, les changements utilisateur sont préservés et les premières règles métier frontend sont couvertes.

Validation : _à renseigner_.

## Jalon 1 — Identité durable des jeux et contrat Games

**Statut : À faire**

### Modèle et migration

- [ ] Transformer `games.id` en identifiant interne auto-incrémenté.
- [ ] Ajouter `steamAppId`, nullable et unique.
- [ ] Migrer l’identifiant Steam actuel vers `steamAppId` sans perdre les relations.
- [ ] Ajouter `source: Steam | Manual`.
- [ ] Ajouter une plateforme explicite.
- [ ] Rendre nullables les données pouvant être inconnues : temps manuel, date de sortie, prix de référence, images et scores externes.
- [ ] Ajouter une information Steam distincte permettant de différencier jeu gratuit et prix inconnu.
- [ ] Conserver temporairement note, avis, statut, visibilité et temps personnels dans `games`.
- [ ] Faire référencer les items de synchronisation Steam par `steamAppId`.
- [ ] Conserver un DTO frontend aplati et stable en prévision de la normalisation familiale.

### Sécurité de migration

- [ ] Sauvegarder la base SQLite avant migration réelle.
- [ ] Exécuter la migration sur une copie.
- [ ] Comparer le nombre de jeux avant/après.
- [ ] Comparer les relations genres et tags avant/après.
- [ ] Vérifier la conservation des notes, avis, statuts et visibilités.
- [ ] Régénérer le SDK Nestia.
- [ ] Adapter les types frontend sans contournement du typage.

Critère de sortie : tous les jeux existants disposent d’un identifiant interne et d’un `steamAppId` correct, sans perte de données, et le frontend compile avec le SDK régénéré.

Validation : _à renseigner_.

## Jalon 2 — Shell responsive et navigation Angular

**Statut : À faire**

- [ ] Remplacer le rendu direct de `<app-table>` par un shell avec `router-outlet`.
- [ ] Construire la sidebar desktop de 216 px.
- [ ] Ajouter la marque, le module Synchronisation, la navigation et le profil « Moi ».
- [ ] Construire le header mobile de 56 px.
- [ ] Construire le tiroir modal mobile et rendre le focus au bouton d’ouverture après fermeture.
- [ ] Ajouter la navigation exacte Games, Insights, Picker et Wishlist.
- [ ] Ajouter `aria-current` à l’entrée active.
- [ ] Créer les routes Angular listées dans la section Contrats de navigation.
- [ ] Utiliser des routes enfants pour conserver Games sous la fiche et l’ajout manuel.
- [ ] Afficher un état explicite « Fonctionnalité à venir » pour les pages non implémentées.
- [ ] Migrer le shell vers les tokens et utilitaires Tailwind du design system.
- [ ] Vérifier qu’une seule zone de défilement principale existe sur mobile.

Critère de sortie : les quatre destinations sont navigables au clavier et au tap, la route active est identifiable et le shell fonctionne à 375, 1 024 et 1 440 px.

Validation : _à renseigner_.

## Jalon 3 — Games complet

**Statut : À faire**

### Liste et responsive

- [ ] Créer l’en-tête Games avec titre, compteur et action Ajouter un jeu.
- [ ] Ajouter recherche, filtres, tri, filtres actifs et réinitialisation.
- [ ] Appliquer recherche, filtres et tri à toutes les données avant révélation.
- [ ] Révéler les résultats par lots internes de 50.
- [ ] Ajouter le scroll infini sans pagination visible.
- [ ] Ajouter un bouton accessible « Afficher la suite » comme repli.
- [ ] Utiliser MatTable sur desktop.
- [ ] Utiliser une vraie liste compacte sous 768 px.
- [ ] Afficher les colonnes principales Jeu, Accès, Temps, Ma note, Statut, Mon avis et Actions.
- [ ] Ajouter le choix des colonnes facultatives sur desktop.
- [ ] Appliquer les jaquettes jointives et `object-fit: cover`.
- [ ] Calculer l’alternance depuis l’index filtré et trié, y compris entre les lots.
- [ ] Mettre recherche, tri et filtres stables dans les query params.
- [ ] Conserver la quantité révélée et l’ancre par identifiant pendant la session.

### Édition directe

- [ ] Rendre `personnalScore`, `personnalNotes` et le statut éditables.
- [ ] Supporter explicitement les valeurs nulles.
- [ ] Supprimer les valeurs par défaut implicites actuelles pour une note ou un statut absent.
- [ ] Ajouter double-clic desktop, bouton visible, clavier et tap.
- [ ] Conserver le brouillon lors d’une erreur de sauvegarde.
- [ ] Empêcher deux sauvegardes concurrentes de la même cellule.
- [ ] Appliquer le repositionnement d’une ligne triée seulement après confirmation.
- [ ] Prévenir lorsqu’une sauvegarde fait sortir la ligne des résultats.

### États

- [ ] Ajouter les skeletons initiaux aux dimensions finales.
- [ ] Conserver les données lors d’un refresh du même contexte.
- [ ] Distinguer liste vide, filtre sans résultat, erreur réseau et donnée indisponible.
- [ ] Ajouter le fallback permanent des images en erreur.
- [ ] Respecter `prefers-reduced-motion`.

Critère de sortie : environ 1 000 jeux restent filtrables et triables sur l’ensemble des résultats, le scroll est continu, les trois éditions sont accessibles et tous les états sont distincts.

Validation : _à renseigner_.

## Jalon 4 — Synchronisation persistante

**Statut : À faire**

### Backend et contrats

- [ ] Distinguer pending, running, retry pending, succeeded, skipped et failed définitivement.
- [ ] Retourner le job existant si une synchronisation est déjà active.
- [ ] Faire retourner un résumé de job par `POST /games/populate-table`.
- [ ] Ajouter les routes de lecture des jobs listées plus bas.
- [ ] Exposer total, réussis, ignorés, retries, échecs, dates et ETA nullable.
- [ ] Ne pas proposer d’annulation tant que le backend ne la supporte pas réellement.

### Frontend

- [ ] Créer un service de suivi unique au niveau du shell.
- [ ] Poller le job actif à intervalle raisonnable pendant son exécution.
- [ ] Arrêter le polling sur un état terminal.
- [ ] Reprendre le suivi après navigation ou rechargement sans relancer le POST.
- [ ] Distinguer attente de retry, déconnexion du suivi et échec terminal.
- [ ] Afficher une ETA uniquement lorsqu’elle est fiable.
- [ ] Ajouter le module persistant dans la sidebar et la bande compacte mobile.
- [ ] Ajouter le panneau de détail du job.
- [ ] Garder la bibliothèque utilisable pendant les synchronisations longues.

### Historisation préparatoire

- [ ] Enregistrer après succès un snapshot du temps par `steamPlayerId` et jeu.
- [ ] Limiter la collecte à un snapshot pertinent par jour.
- [ ] Ne jamais reconstruire artificiellement le passé.

Critère de sortie : un job reste visible et retrouvable pendant toute la navigation, sans doublon ni faux succès, et les compteurs reflètent les vrais états backend.

Validation : _à renseigner avec des fixtures ; ne pas lancer un import Steam réel pour la recette UI_.

## Jalon 5 — Fiche jeu et jeux manuels

**Statut : À faire**

### Fiche

- [ ] Construire le drawer de 440 px sur desktop.
- [ ] Construire l’écran modal pleine largeur sur mobile.
- [ ] Ajouter les sections dans l’ordre du design system.
- [ ] Garder les métadonnées Steam en lecture seule.
- [ ] Éditer note, avis, statut, prix payé, devise, date d’achat et tags personnels.
- [ ] Distinguer prix payé, prix de référence, gratuit et inconnu.
- [ ] Ajouter les actions séparées Masquer et Exclure du Picker.
- [ ] Conserver le brouillon et le focus utile en cas d’erreur.
- [ ] Confirmer l’abandon seulement si le formulaire a été modifié.

### Jeux manuels

- [ ] Créer le formulaire « Ajouter un jeu hors Steam ».
- [ ] Rendre titre et plateforme obligatoires.
- [ ] Supporter PS5, PS4, Xbox, Switch, PC hors Steam et Autre avec libellé.
- [ ] Supporter possession, mode d’accès et temps manuel facultatifs.
- [ ] Distinguer temps inconnu et zéro.
- [ ] Autoriser les autres métadonnées manuelles facultatives.
- [ ] Utiliser le fallback d’image ; l’upload de jaquette reste reporté.
- [ ] Signaler un doublon titre + plateforme sans fusion automatique.
- [ ] Créer le jeu puis ouvrir `/games/:gameId`.
- [ ] Garantir qu’une synchronisation Steam ne modifie pas un jeu manuel.

Critère de sortie : une fiche Steam et une fiche manuelle sont consultables et modifiables selon leurs droits respectifs, et un jeu manuel survit intact à une synchronisation.

Validation : _à renseigner_.

## Jalon 6 — Picker

**Statut : À faire**

- [ ] Calculer localement les candidats depuis tous les jeux chargés.
- [ ] Exiger accès confirmé, temps connu à zéro, jeu visible et non exclu.
- [ ] Exclure les statuts incompatibles avec « jamais joué ».
- [ ] Ajouter les filtres plateforme et genres.
- [ ] Effectuer un tirage uniforme.
- [ ] Éviter les répétitions jusqu’à épuisement de la session.
- [ ] Implémenter les états initial, aucun candidat, épuisé, actif, pause et terminé.
- [ ] Persister localement le jeu actif, l’échéance et la pause.
- [ ] Recalculer le temps depuis l’échéance au retour d’onglet.
- [ ] Afficher le mini-timer global pendant la navigation.
- [ ] Limiter à un seul essai actif.
- [ ] Persister les exclusions via le backend.
- [ ] Ne modifier automatiquement ni temps de jeu ni statut.
- [ ] Afficher l’avertissement sur la fiabilité de l’alerte en arrière-plan.

Critère de sortie : le Picker ne propose que les jeux éligibles du joueur courant, ne répète pas un candidat avant épuisement et conserve correctement un essai pendant la navigation.

Validation : _à renseigner_.

## Jalon 7 — Wishlist

**Statut : À faire**

### Données et import

- [ ] Créer une table de wishlist liée à l’identifiant interne du jeu.
- [ ] Stocker état actif/inactif, hype nullable, dates de synchronisation et ordre Steam disponible.
- [ ] Isoler l’endpoint Steam Store non documenté dans un adaptateur backend.
- [ ] Ajouter un import JSON de secours contenant une liste de `steamAppId` positifs.
- [ ] Upsert les entrées présentes lors d’une synchronisation.
- [ ] Passer les entrées absentes en inactif sans les supprimer.
- [ ] Conserver la hype lors d’un retrait ou d’un retour.
- [ ] Réutiliser la même entrée jeu lorsqu’un jeu de wishlist rejoint la bibliothèque.
- [ ] Ne jamais convertir la hype en note personnelle.

### Interface

- [ ] Construire la liste Wishlist avec recherche, filtres, tri et scroll infini.
- [ ] Appliquer les mêmes règles de jaquettes, alternance et responsive que Games.
- [ ] Afficher Jeu, Ma hype, Sortie, Prix actuel et Actions.
- [ ] Distinguer hype null et une étoile.
- [ ] Implémenter cinq cibles de 44 px dans le sélecteur.
- [ ] Sauvegarder immédiatement avec pending, confirmation et réessai.
- [ ] Repositionner une ligne triée seulement après confirmation.
- [ ] Ne pas ajouter de création manuelle depuis Wishlist.

Critère de sortie : environ 400 jeux restent navigables sans pagination, l’import est récupérable par fichier et aucune synchronisation ne détruit la hype locale.

Validation : _à renseigner_.

## Jalon 8 — Insights

**Statut : À faire**

### Synthèse

- [ ] Construire le parent Insights et ses filtres communs.
- [ ] Construire l’onglet Synthèse.
- [ ] Calculer localement les indicateurs cumulés disponibles depuis Games.
- [ ] Afficher possession, jeux joués, temps, statuts, prix payés renseignés et coût/h.
- [ ] Afficher le nombre de valeurs connues pour les agrégats incomplets.
- [ ] Utiliser la formule agrégée correcte du coût/h.
- [ ] Distinguer donnée absente et valeur zéro.

### Graphiques et historique

- [ ] Construire l’onglet Graphiques.
- [ ] Ajouter `GET /insights/activity` pour les snapshots historiques.
- [ ] Produire les graphiques simples en SVG/CSS Angular sans dépendance supplémentaire.
- [ ] Fournir les valeurs exactes dans un tableau de données accessible.
- [ ] Afficher couverture, nombre d’observations et période suivie.
- [ ] Utiliser la date d’achat pour les dépenses datées.
- [ ] Ne jamais utiliser `createdAt` comme date d’achat.
- [ ] Ne pas appliquer un filtre annuel à une donnée uniquement cumulative.
- [ ] Afficher un état indisponible avant le début de la collecte.

Critère de sortie : chaque indicateur explicite sa provenance et sa couverture, et aucune activité historique ou dépense n’est fabriquée.

Validation : _à renseigner_.

## Jalon 9 — Famille et normalisation par joueur

**Statut : À faire**

### Modèle

- [ ] Créer la table des joueurs.
- [ ] Créer la relation joueur-jeu pour note, avis, statut, temps, dernière session, visibilité, exclusion, prix payé et date d’achat.
- [ ] Ajouter séparément possession actuelle, accès actuel et provenance des sessions.
- [ ] Migrer toutes les valeurs existantes vers le joueur « Moi ».
- [ ] Conserver le contrat aplati utilisé par le frontend.

### Import et fonctionnalités

- [ ] Corriger l’import familial pour conserver tous les propriétaires.
- [ ] Conserver le temps de chaque joueur au lieu d’une valeur issue du premier propriétaire.
- [ ] Ne jamais déduire un prêteur sans source fiable.
- [ ] Ajouter le référentiel des joueurs.
- [ ] Ajouter les périmètres Moi, Famille et membre dans Games.
- [ ] Ajouter les périmètres dans Picker et évaluer l’éligibilité pour le joueur sélectionné.
- [ ] Ajouter les périmètres et indicateurs familiaux dans Insights.
- [ ] Limiter les écritures au joueur courant.
- [ ] Garder les autres membres en lecture seule.
- [ ] Garder Wishlist limitée au joueur courant tant qu’aucune union familiale n’est définie.

Critère de sortie : les données de chaque joueur sont isolées, possession, accès et provenance restent distincts et les calculs familiaux utilisent uniquement des informations justifiées.

Validation : _à renseigner_.

## Jalon 10 — Recette globale et suppression du legacy

**Statut : À faire**

- [ ] Supprimer l’ancienne table seulement lorsque Games couvre ses usages.
- [ ] Supprimer l’ancien dialogue seulement lorsque la fiche et les éditeurs couvrent ses usages.
- [ ] Éliminer les couleurs et dimensions locales restantes au fil des composants migrés.
- [ ] Vérifier le rendu à 1 440, 1 024 et 375 px.
- [ ] Vérifier le zoom texte et la réduction des animations.
- [ ] Vérifier clavier, focus, touch targets et retour du focus des dialogues.
- [ ] Vérifier les brouillons en erreur et les nouvelles tentatives.
- [ ] Vérifier l’absence de scroll horizontal global.
- [ ] Vérifier les contrastes sur les deux fonds de lignes et les surfaces.
- [ ] Effectuer la recette avec environ 1 000 jeux et 400 entrées de wishlist.
- [ ] Documenter les limites restantes.
- [ ] Exécuter les tests frontend et backend pertinents.
- [ ] Exécuter le build de production frontend.

Critère de sortie : aucun composant legacy inutile ne subsiste, les parcours principaux sont utilisables sur les trois largeurs cibles et toutes les limites restantes sont documentées.

Validation : _à renseigner_.

## Contrats de navigation Angular

- [ ] `/` redirige vers `/games`.
- [ ] `/games` affiche la bibliothèque.
- [ ] `/games/new` ouvre l’ajout manuel au-dessus de Games.
- [ ] `/games/:gameId` ouvre la fiche au-dessus de Games.
- [ ] `/insights` redirige vers `/insights/summary`.
- [ ] `/insights/summary` affiche Synthèse.
- [ ] `/insights/charts` affiche Graphiques.
- [ ] `/picker` affiche le Picker.
- [ ] `/picker/exclusions` affiche les jeux exclus.
- [ ] `/wishlist` affiche la wishlist du joueur courant.
- [ ] Une route inconnue redirige vers `/games`.

## Contrats HTTP

### Routes existantes à conserver et faire évoluer

- [x] `GET /games` existe.
  - [ ] Retourner la projection stable du contexte courant après migration.
- [x] `POST /games/edit-one` existe.
  - [ ] Autoriser `personnalScore`, `personnalNotes` et `statusId` nullables.
- [x] `POST /games/populate-table` existe.
  - [ ] Retourner le job nouveau ou déjà actif au lieu de `void`.
- [x] `GET /game-status` existe.
  - [ ] Confirmer que les identifiants et libellés restent le contrat de référence.

### Games, référentiels et synchronisation

- [ ] `GET /games/:id` retourne la fiche complète.
- [ ] `POST /games/manual` crée un jeu manuel.
- [ ] `PATCH /games/:id` modifie les champs autorisés selon la source.
- [ ] `PATCH /games/:id/visibility` masque ou restaure un jeu.
- [ ] `PATCH /games/:id/picker-exclusion` exclut ou restaure un jeu dans le Picker.
- [ ] `GET /genres` retourne le référentiel des genres.
- [ ] `GET /tags` retourne les tags personnels.
- [ ] `POST /tags` crée un tag personnel.
- [ ] `GET /sync-jobs/active` retourne le job actif ou null.
- [ ] `GET /sync-jobs/:id` retourne le résumé persistant.
- [ ] `GET /sync-jobs/:id/items` retourne les détails, retries et erreurs.

Le résumé de synchronisation doit contenir au minimum : identifiant, type, statut, total, réussis, ignorés, retries, échecs définitifs, dates et ETA nullable.

### Wishlist et Insights

- [ ] `GET /wishlist` retourne la wishlist active du joueur courant.
- [ ] `POST /wishlist/sync` démarre ou retrouve la synchronisation Wishlist.
- [ ] `POST /wishlist/import` accepte l’import JSON de secours.
- [ ] `PATCH /wishlist/:gameId/hype` enregistre ou efface la hype.
- [ ] `GET /insights/activity?from=&to=&platform=` retourne l’activité observée et sa couverture.

### Famille

- [ ] `GET /players` retourne les joueurs disponibles.
- [ ] `GET /games?scope=me|family|player&playerId=...` retourne le périmètre demandé.

Aucun endpoint `/picker/draw` ou `/insights/summary` n’est prévu initialement : tirage, filtres et synthèse cumulative restent locaux tant que les données sont déjà chargées.

## Validation transversale

- [ ] Tester les services et repositories backend concernés.
- [ ] Valider chaque entrée API avec Zod et les types brandés existants.
- [ ] Exécuter `pnpm sdk:build` après tout changement de contrat backend.
- [ ] Inspecter le diff du SDK avant l’intégration frontend.
- [ ] Tester les règles pures et les états des composants avec Vitest.
- [ ] Tester explicitement null, zéro, gratuit, inconnu, Steam, manuel, masqué et exclu.
- [ ] Utiliser uniquement des fixtures pour les tests de synchronisation.
- [ ] Exécuter `pnpm build` pour chaque jalon frontend.
- [ ] Effectuer une recette visuelle aux trois largeurs de référence pour chaque écran modifié.

## Décisions verrouillées

- Games est la première page fonctionnelle à livrer.
- Le cœur solo est prioritaire.
- La séparation catalogue/joueur est reportée à la phase famille.
- L’identifiant interne du jeu est introduit avant les jeux manuels.
- Les URL HTTP existantes ne sont pas renommées pour des raisons cosmétiques.
- La wishlist utilise un endpoint Steam Store non documenté, isolé derrière un adaptateur et accompagné d’un import JSON de secours.
- L’upload de jaquette des jeux manuels est reporté ; un fallback est utilisé.
- Il n’y a ni authentification, ni multi-tenant, ni thème clair dans le POC actuel.
- Il n’y a pas de pagination visible dans Games ou Wishlist.
- Filtres, tris, tirage et synthèse cumulative restent locaux.
- Annotations, hype, exclusions, achats et synchronisations sont persistés par le backend.
- Les données fictives restent limitées aux tests et previews identifiées.
- Aucun historique antérieur à la première collecte n’est reconstruit.

## Limites connues

- L’import de wishlist personnelle ne repose pas sur une API Steam Web publique documentée et doit pouvoir échouer proprement.
- Les graphiques historiques ne seront disponibles qu’à partir du début des snapshots.
- Les données familiales fiables dépendent des informations réellement accessibles depuis Steam et des déclarations manuelles.
- Le build frontend présente actuellement des avertissements connus sur le budget initial et la dépendance CommonJS `jsbi`.
