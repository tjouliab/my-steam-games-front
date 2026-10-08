# Jalon 0 — baseline technique et cartographie du legacy

Relevé effectué le 8 octobre 2026. Ce document décrit le point de départ ; les spécifications et le
design system restent les sources de vérité produit et visuelle.

## Changements utilisateur préservés

- Frontend : `todo.txt` était non suivi avant le jalon et n'a pas été modifié.
- Backend adjacent : `src/app/games/games.controller.ts` était modifié ; `all-games.json` et
  `todo.txt` étaient non suivis. Aucun de ces fichiers n'a été modifié par ce jalon.
- La migration structurelle validée déplace uniquement les fichiers existants et leurs imports ; elle
  ne modifie pas leurs comportements.

## Cartographie du frontend existant

| Zone | Comportements utiles à conserver | Limites à traiter dans les jalons suivants |
|---|---|---|
| `app.component.*` | Point d'entrée autonome, enregistrement des icônes Sigma et Moyenne | Rend directement la table ; aucune route ni shell |
| `features/games/components/games-table/*` | MatTable, tri Material, filtre local, en-tête et pied fixes, agrégats, ouverture de l'édition | Douze colonnes, dimensions en `vh`, scroll horizontal, aucun scroll infini ni rendu mobile dédié |
| `features/games/components/game-edit-dialog/*` | Formulaire typé, chargement des statuts, requête SDK, blocage durant l'enregistrement | Dialogue 1 440 × 810, valeurs nulles remplacées par 7 et statut 1, brouillon et erreur de sauvegarde non gérés |
| `features/games/services/*` | `resource` Angular avec signal d'abandon ; SDK Nestia utilisé pour lire et éditer | Absence de suivi de synchronisation |
| `features/games/types/*` | DTO dérivés directement du SDK | Contrat actuel encore lié à l'identifiant Steam et incomplet pour les futurs écrans |
| `features/games/utils/*`, `features/games/pipes/*` | Calculs et formatages existants identifiés | Plusieurs sémantiques à corriger : 0 prix = gratuit, 0 avis = division invalide, données inconnues peu distinguées |

Le retrait du tableau et du dialogue legacy attend leurs remplacements fonctionnels (jalon 10). Le
jalon 0 n'introduit pas de logique métier anticipée uniquement pour créer des tests.

## Contrats actuellement observés

- `GET /games` : liste aplatie consommée par le frontend.
- `POST /games/edit-one` : `id`, `personnalNotes`, `statusId`, `personnalScore`, tous les trois champs
  d'édition encore non nullables dans le body généré.
- `GET /game-status` : référentiel des statuts.
- `POST /games/populate-table` : route réelle actuelle de lancement, réponse `void`.

Le contrat d'édition actuel ne permet donc pas encore d'effacer une note ou un statut, contrairement
à la cible UX. Cette évolution appartient au jalon 1. Le suivi persistant du job n'est pas exposé.

## Comparaison avec la cible Wishlist

La planche `Tableau de wishlist jeux vidéo.png` confirme la direction sombre, la sidebar, la densité,
les jaquettes jointives, les lignes alternées et la liste compacte mobile. Les corrections écrites du
design system priment sur quatre écarts visibles : pas d'ajout manuel dans Wishlist, pas de périmètre
Famille sans contrat, pas de libellé `Steam · Manuel`, et un sélecteur mobile garantissant cinq cibles
de 44 px plutôt que des étoiles miniaturisées.

Le frontend actuel partage seulement MatTable, les jaquettes et l'alternance de lignes avec cette cible.
Le shell, la liste mobile, la recherche/filtres complets, le scroll infini et les états restent à livrer.

## Organisation validée

- `core/layout` : futur shell et navigation ; aucune implémentation anticipée.
- `core/sync` : futur suivi transversal d'un job existant ; aucune implémentation anticipée.
- `features/games` : composants, services, types, pipes et utilitaires actuellement consommés par Games.
- `shared/ui` : futurs composants de présentation ayant au moins deux consommateurs réels.

Les autres features seront créées au démarrage de leur jalon. Un fichier n'est déplacé dans `shared`
qu'après l'apparition d'un second usage concret. La migration de Games conserve la logique legacy en
l'état afin de ne pas mélanger réorganisation et refonte fonctionnelle.

## Baseline des avertissements

Avant les changements du jalon, `pnpm build` réussissait avec un bundle initial de 955,08 kB et deux
avertissements connus :

1. budget initial de 500 kB dépassé de 455,08 kB ;
2. module CommonJS `jsbi`, transitivement utilisé par `@js-temporal/polyfill`.
