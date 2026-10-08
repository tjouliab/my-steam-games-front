# MySteamGames — consignes pour Codex

## Projet et objectif

MySteamGames est le nom temporaire d’un POC personnel de gestion et d’analyse de bibliothèque de jeux. Il sert uniquement à Timothé pour le moment. Une éventuelle ouverture au public est hors périmètre : ne pas concevoir spontanément un SaaS, un réseau social, un onboarding commercial ou une architecture multi-tenant.

Le projet couvre une bibliothèque Steam d’environ 1 000 jeux, l’accès familial, les notes et avis personnels, les statistiques, le choix d’un prochain jeu et une wishlist d’environ 400 jeux. Des jeux hors Steam (par exemple PS5) peuvent aussi être ajoutés avec saisie manuelle.

Timothé est développeur FullStack. Il aime coder et concevoir la logique métier ; il souhaite surtout être aidé sur le design et sa mise en œuvre. Répondre en français, avec des explications techniques directes, sans reprendre les bases inutilement.

## Rôle attendu

- Pour une demande d’implémentation, réaliser le travail demandé jusqu’à un résultat vérifiable. Pour une question, expliquer sans modifier spontanément le projet.
- Par défaut, concentrer les interventions sur l’interface, les composants, les styles et leur intégration aux contrats existants.
- Ne pas étendre une tâche UI à une refonte du backend, du modèle de données, des jobs ou de l’authentification. Si la demande inclut explicitement ces éléments, les traiter dans son périmètre.
- Prendre les décisions locales réversibles cohérentes avec les documents ; éviter les confirmations répétées pour du padding ou un composant déjà spécifié.
- Demander un arbitrage seulement lorsqu’un choix manquant change significativement le comportement produit, le contrat public ou l’architecture. Avancer sur les parties indépendantes en attendant.
- Signaler les limites ou incohérences concrètes et proposer une solution simple ; ne pas improviser une fonctionnalité manquante pour compléter une maquette.

## À chaque nouvelle session

1. Lire la demande actuelle et les instructions applicables aux fichiers concernés, y compris les éventuels AGENTS.md plus locaux.
2. Inspecter l’état du dépôt et les changements en cours ; préserver le travail existant de l’utilisateur.
3. Lire `docs/IMPLEMENTATION-ROADMAP.md` avant toute implémentation et repérer le premier jalon pertinent non terminé.
4. Consulter README, manifests, lockfile et scripts pertinents pour identifier la stack, les versions et les commandes réelles. Ne pas les déduire de ce seul document.
5. Pour une tâche UI, lire les références de conception ci-dessous et les composants concernés avant d’écrire du code.
6. Annoncer brièvement le périmètre de travail ; avancer par modifications ciblées. Ne pas reconstruire toute l’application à partir des maquettes.

Ne pas supposer que les conversations précédentes sont disponibles. Le dépôt et sa documentation versionnée portent le contexte durable. Ce fichier décrit les intentions et contraintes, pas la liste des fonctionnalités déjà implémentées.

## Documents de référence

Emplacement prévu : `docs/design-system/:version`. Prendre en priorité la version de dossier la plus élevée.

| Document | Rôle |
|---|---|
| `IMPLEMENTATION-ROADMAP.md` | Roadmap d’implémentation et source de vérité de l’avancement |
| `MySteamGames-UX-UI-Specs-v1.0.md` | Spécifications fonctionnelles |
| `MySteamGames-Design-System-v1.0.md` | Tokens, dimensions, composants, états, responsive et déclinaisons d’écrans |
| Maquettes disponibles dans `docs/design-system/:version` | Intention visuelle et hiérarchie, pas contrats de données |

La demande actuelle de Timothé précise le périmètre et peut faire évoluer ces décisions. Les spécifications écrites priment sur les images. Le design system précise les choix visuels et corrige explicitement certains écarts des maquettes ; ses corrections prévalent sur les anciennes propositions graphiques des specs. En cas de contradiction métier non résolue, la signaler.

Ne pas confondre absence de document et liberté de réinventer le design : avancer sur le socle décrit ici et identifier les précisions manquantes. Ne pas déclarer avoir consulté un fichier absent.

## Stack et conventions

Contexte communiqué : frontend Angular avec une MatTable existante ; backend NestJS/TypeScript, SQLite avec Drizzle, validation Zod, utilisation de branding sur les Ids de DB, jobs d’import et retries planifiés. Ce documents est à utiliser uniquement pour la partie frontend, mais donne du contexte sur l'ensemble du projet.

- Réutiliser architecture, composants, services API, conventions et dépendances en place.
- Conserver Angular Material si pertinent ; ne pas migrer vers React ou une autre table pour reproduire une image.
- Respecter TypeScript, DTO, types brandés, validation et gestion des erreurs existants. Ne pas contourner le typage pour accélérer l’intégration.
- Préserver les noms réels des champs, notamment `personnalScore` et `personnalNotes`. Ne pas les corriger implicitement.
- Vérifier le contrat d’édition réel : le nom fonctionnel « gameStatus » ne prouve pas qu’un tel champ existe dans le payload.
- Utiliser le gestionnaire de paquets et les scripts du dépôt ; ne pas inventer de commande de test ou de build.
- Ne pas ajouter de dépendance, abstraction générique ou refactoring transversal sans besoin concret lié à la tâche.
- Utiliser les routes et types du SDK autant que possible, sinon prévenir l'utilisateur d'une fonctionnalité backend manquante qu'il devra implémenter.

## Décisions UX/UI validées

### Direction et navigation

Direction **Steam Workspace** : sombre, marine et cyan, dense mais lisible, inspirée de Steam/SteamDB avec une organisation d’outil analytique. Navigation exacte : **Games, Insights, Picker, Wishlist**. Insights fusionne Stats et Charts, avec Synthèse et Graphiques.

Socle : fond `#101822`, surface `#182431`, texte `#F1F5F9`, secondaire `#A9BACB`, accent `#67C8F5`. Lignes impaires `#16222F`, paires `#1C2B3B`, survol `#263D52`. Utiliser les tokens complets du design system, pas des couleurs dispersées dans les composants.

### Listes et édition

- **Scroll infini, jamais de pagination visible**, dans Games et Wishlist. Recherche, filtres et tri portent sur toutes les données, pas seulement les lignes révélées.
- Filtrage local pour le POC ; pas d’architecture serveur supplémentaire sans nécessité constatée.
- Jaquettes jointives verticalement : pleine hauteur de ligne et pleine largeur de leur cellule, aucun padding, gap ou arrondi entre images. Recadrage autorisé, déformation interdite.
- Alternance calculée depuis l’index dans les résultats filtrés/triés, continue entre lots et compatible avec une éventuelle virtualisation.
- Préserver l’ancre de scroll au retour de fiche et lors des actualisations pertinentes.
- Édition directe de note, avis et statut : double-clic desktop comme raccourci, avec bouton visible utilisable au clic, au clavier et au tap.
- Note personnelle de 1 à 10 ; null = non noté. Hype de wishlist de 1 à 5 étoiles ; null = non classé. Ne pas mélanger ces deux contrôles.
- Les autres champs éditables, notamment le prix réellement payé, sont dans la fiche jeu.

### Responsive et états

- Utilisable à 375 px en portrait, sans scroll horizontal global. Liste compacte sur mobile, pas un tableau desktop miniaturisé.
- Cibles tactiles au moins 44 px ; champs mobiles de 16 px ; focus visible. Aucune action réservée au hover ou au double-clic.
- Skeletons adaptés aux lignes, images, KPI et widgets, avec dimensions stables et animation discrète respectant la réduction des animations.
- Conserver les données lors d’une actualisation du même contexte. Ne pas afficher les valeurs d’un ancien profil sous un nouveau filtre.
- Distinguer chargement, vide, indisponible et erreur. Aucun faux loader lors d’un traitement local instantané.
- Erreur de sauvegarde : conserver le brouillon, expliquer et permettre de réessayer.

## Règles produit à préserver

- Possession actuelle, accès actuel et provenance des sessions sont distincts. « Possédé » peut coexister avec « Joué via famille ». Ne pas inventer le prêteur.
- Masquer un jeu le retire de Games et du picker par défaut, sans supprimer son historique. L’exclusion du picker seule ne masque pas Games. Les deux actions sont réversibles.
- Picker : accès confirmé, temps connu égal à zéro, jeu visible et non exclu ; respecter les statuts incompatibles avec « jamais joué ». Évaluer pour le joueur sélectionné, pas pour toute la famille indifféremment.
- Essai d’une heure : un seul timer actif, aucun changement automatique de temps joué ou de statut. Ne pas garantir une sonnerie sur iPhone en arrière-plan.
- Jeux manuels : identifiant interne indépendant d’un appId Steam, plateforme explicite et données modifiables. Ne jamais les écraser durant un import Steam.
- Jeu importé : « Steam ». Jeu hors Steam : par exemple « PS5 · Manuel ». Des annotations personnelles ne rendent pas un jeu Steam « Manuel ».
- Prix de référence ≠ prix payé. Prix inconnu ≠ gratuit. Temps inconnu ≠ jamais joué. Zéro heure ne permet pas de calculer un coût/h.
- Temps cumulé et dernière session ne permettent pas de reconstruire une activité annuelle. `createdAt` d’import n’est pas une date d’achat. Ne pas fabriquer d’historique ou de montants.
- Économies familiales : estimations avec base explicite, jamais gains certains. Les jeux multi-plateformes ne se fusionnent pas sur leur seul nom.

## API et fonctionnalités non disponibles

L’action de synchronisation connue est `POST /populate-games-table` ; elle peut durer environ 15 minutes. Inspecter le contrat et le suivi existants avant intégration. Ne pas déclencher un import réel coûteux simplement pour vérifier le rendu.

Le suivi reste visible pendant la navigation : nombre traité/total, restants et estimation si fiable. Retrouver le job après rechargement au lieu de relancer le POST. Ne pas confondre déconnexion, attente de retry et échec définitif.

Les endpoints, champs et fonctionnalités décrits dans les documents ne sont pas nécessairement implémentés. Si une capacité manque, afficher un état explicite et identifier le contrat nécessaire. Pas d’endpoint inventé, de succès simulé ou de stockage local présenté comme une sauvegarde backend. Les fixtures sont réservées aux tests/previews et clairement séparées des données réelles. Ne pas exposer de clés ou tokens Steam dans le frontend ou les logs.

## Façon de livrer

Travailler écran ou fonctionnalité par écran selon la demande. Lors d’un démarrage UI sans autre priorité : tokens et shell, puis Games et ses états, avant d’étendre aux autres écrans. Ne pas transformer cet ordre suggéré en obligation de tout implémenter dans une session.

Pour toute tâche couverte par `IMPLEMENTATION-ROADMAP.md`, marquer un seul jalon principal En cours, mettre à jour sa checklist dans la même livraison que le code et reporter les validations réellement effectuées. Ne jamais cocher une tâche non testée, partielle ou seulement simulée. Documenter les blocages et contrats backend manquants sous la tâche concernée.

Vérifier les changements avec les commandes existantes et les tests pertinents. Pour une modification visuelle, inspecter si possible le rendu desktop et mobile, notamment les jaquettes, le scroll, les contrôles et les états. Ne pas annoncer une vérification visuelle ou un test qui n’a pas été effectué.

Terminer par un compte rendu concis indiquant le jalon concerné, ce qui a changé, comment cela a été vérifié, les limites restantes et les éventuels contrats manquants. La roadmap doit refléter le résultat réel de la livraison. Ne pas modifier des fichiers sans rapport ni écraser les changements de l’utilisateur. Maintenir les décisions durables dans la documentation concernée lorsqu’elles évoluent ; garder ce fichier synthétique et éviter les règles redondantes dans plusieurs documents.

## Cohérence HTML & CSS

Tailwind doit être utilisé en priorité pour gérer les styles. Si VRAIMENT c'est pas possible de faire autrement, alors ok tu peux utiliser du CSS. C'est notamment utile pour les propriétés spécifiques à Angular, par exemple :host et ::ng-deep.
Merci de ne pas englober un composant HTML par une div pour ajouter du style et d'utiliser le :host pour éviter de complexifier le DOM.
