# KitchenStaff — Audit de l’interface FR / EN / NL

Date : **13 novembre 2026**. Mission documentaire ; frontend examiné en lecture seule.

**Verdict : le code courant ne satisfait pas l’exigence d’une interface disponible en français, anglais et néerlandais.** Il présente une interface essentiellement française, sans sélecteur, ressources de traduction ou préférence linguistique mémorisée. Les versions Alpha et Beta ne sont pas identifiées séparément : leur conformité individuelle reste non vérifiable.

## Périmètre et méthode

- Examen des sources Angular, des modèles HTML, services, configurations, tests existants, documentation et références Git locales.
- Le périmètre implémenté comprend la connexion/session et la gestion des tâches ; les routes sont vides et aucun menu de navigation séparé n’est présent.
- Les sources utilisées par la compilation sont les fichiers TypeScript : `angular.json:20` et `tsconfig.app.json`. Les `.js` voisins, plus anciens, ne constituent pas des versions Alpha/Beta identifiées.
- Aucun code de l’application, configuration, dépendance ou donnée métier n’a été modifié dans cette mission. Seuls les livrables documentaires sont concernés.
- Les preuves ci-dessous sont des chemins relatifs à la racine du dépôt, suivis du numéro de ligne observé.

## Résultat par langue

| Langue | Disponible | Manquant | Reste à vérifier |
|---|---|---|---|
| **FR** | Connexion/session, formulaires de tâches, filtres, recherche, résumés, boutons, états de chargement/absence de résultat, validations et erreurs applicatives écrits en français. | Ressources de traduction structurées ; sélection et mémorisation de langue ; libellés lisibles et cohérents des statuts, priorités et rôles ; langue HTML correcte. | Rendu réel de tous les parcours et rôles, contrôles natifs, formats, données serveur et exhaustivité après externalisation. |
| **EN** | Termes isolés partagés (« Email », « Item ») et attribut HTML `lang="en"` ; aucune interface anglaise complète. | Traduction de tous les écrans, formulaires, boutons, statuts, priorités, rôles, erreurs, confirmations, états et textes d’accessibilité ; sélection et mémorisation. | Recette complète EN après implémentation ; basculement et rechargement actuellement impossibles à valider. |
| **NL** | Aucun écran ou texte d’interface néerlandais identifié. | Traduction complète des mêmes catégories ; sélection et mémorisation. | Recette complète NL après implémentation ; basculement et rechargement actuellement impossibles à valider. |

Le français est largement présent, mais ce constat ne vaut pas validation d’une couverture française complète ni de l’exigence trilingue.

## Couverture des catégories demandées

| Catégorie | Constat dans le code courant | Preuves |
|---|---|---|
| Écrans et navigation | Connexion toujours rendue, tâches conditionnées à l’authentification ; aucun menu ni sélecteur de langue. | `src/app/app.html:2`, `src/app/app.html:4`, `src/app/app.routes.ts:3` |
| Connexion et session | Titres, mot de passe, aide, connexion/déconnexion en FR ; rôle affiché tel que reçu. | `src/app/pages/login/login.html:4`, `:17`, `:22`, `:27`, `:32`, `:40`, `:43` |
| Formulaires | Création/modification, labels, options, placeholders, chargement et boutons en FR. | `src/app/pages/tasks/tasks.html:23`, `:38`, `:57`, `:76`, `:91`, `:103`, `:116`, `:133`, `:142` |
| Recherche et filtres | Recherche, effacement, date et filtres en FR. | `src/app/pages/tasks/tasks.html:185`, `:190`, `:205`, `:221`, `:227`, `:231` |
| Boutons des tâches | Modifier, Démarrer, Terminer, Annuler et Supprimer en FR. | `src/app/pages/tasks/tasks.html:294`, `:300`, `:306`, `:312`, `:318` |
| Statuts | Résumés/filtres humanisés en FR ; cartes affichant directement les codes API (`A_FAIRE`, `EN_COURS`, `TERMINEE`, `ANNULEE`). | `src/app/pages/tasks/tasks.html:155`, `:160`, `:165`, `:170`, `:266` ; `src/app/pages/tasks/tasks.ts:58` |
| Priorités et rôles | Priorités du formulaire en FR ; filtres/cartes et rôles exposés sous leur valeur brute. | `src/app/pages/tasks/tasks.ts:42`, `:66` ; `src/app/pages/tasks/tasks.html:67`, `:279` ; `src/app/pages/login/login.html:40` |
| Erreurs et validations | Messages figés en FR : champs requis, identifiants, réseau/serveur, chargement, droits et opérations. | `src/app/pages/login/login.ts:37`, `:61`, `:63`, `:65` ; `src/app/pages/tasks/tasks.ts:185`, `:196`, `:202`, `:208`, `:214`, `:220`, `:226`, `:336`, `:383`, `:396`, `:414`, `:443` |
| Succès, confirmation et états | Succès, suppression confirmée, résultats vides et chargement en FR. | `src/app/pages/login/login.ts:55` ; `src/app/pages/tasks/tasks.ts:93`, `:257`, `:425`, `:439` ; `src/app/pages/tasks/tasks.html:238` |
| Accessibilité et document | Textes `aria-label` en FR ; document déclaré en anglais malgré l’interface française. | `src/app/pages/tasks/tasks.html:148`, `:230` ; `src/index.html:2` |

## Sélection, traduction et conservation du choix

- Aucun contrôle FR/EN/NL n’est présent dans les modèles HTML ni dans les composants examinés.
- Aucun catalogue, moteur de traduction ou configuration i18n n’a été identifié dans `src`, `public`, `package.json`, `angular.json` et `src/app/app.config.ts`.
- L’absence de dépendance spécialisée ne suffirait pas seule à conclure ; elle concorde ici avec les textes directement inscrits dans les modèles et composants et l’absence de mécanisme maison.
- `localStorage` conserve la session (`token`, `userName`, `userRole`, `userEmail`) : `src/app/services/auth.ts:35`. Aucune préférence de langue n’est enregistrée ou restaurée dans le code examiné.
- Les tests existants concernent l’authentification, la session et le chargement des tâches ; aucun scénario de changement ou conservation de langue n’a été identifié.

## Vérification dans l’application

**Non exécutée.** La tentative de connexion à `http://localhost:4200` avec `curl` a échoué ; aucun serveur n’a été repéré sur les ports 4200 et 8080 lors du contrôle. L’outil de navigateur était également inaccessible.

Le changement FR → EN → NL et la conservation après rechargement ne sont donc pas validés en exécution. Leur absence dans le code est constatée ; aucun résultat de test navigateur n’est revendiqué. Aucun serveur ni compilation n’a été lancé pour cette mission en lecture seule.

## Alpha et Beta

| Élément disponible | Identification | Conclusion pour l’exigence |
|---|---|---|
| Sources courantes | `main` / `origin/main`, commit `3a68574` ; version du paquet `0.0.0`. | **Non satisfaite dans ce code** : EN/NL et mécanisme de sélection absents. |
| Répertoire `dist` | Présent, sans rattachement établi à une livraison Alpha ou Beta. | Ne permet pas d’attribuer le verdict à une version nommée. |
| Alpha | Aucun tag, branche ou artefact Alpha identifié séparément. | **Non vérifiable individuellement** ; conformité non démontrée. |
| Beta | Aucun tag, branche ou artefact Beta identifié séparément. | **Non vérifiable individuellement** ; conformité non démontrée. |

Aucune archive Alpha/Beta n’a été identifiée dans les emplacements examinés : `Documents/Projet Ruth`, `Downloads` et le dépôt backend. Cette recherche ne prouve pas qu’aucune autre livraison n’existe ailleurs. Il faut rattacher chaque version à un commit, une archive ou une URL précise avant de certifier sa conformité ou sa non-conformité.

## Tâches ajoutées au travail 05

Ajoutées pour suivi dans `KitchenStaff_Travail_05_Organigramme.xlsx`, sans implémentation dans le cadre de cet audit :

| ID | Travail restant | Critère de validation |
|---|---|---|
| 6.7 | Externaliser les textes, créer les ressources linguistiques et définir le repli. | Inventaire couvrant modèles, composants, accessibilité et messages ; aucune clé manquante visible. |
| 6.8 | Compléter et harmoniser le français. | Tous les textes d’interface attendus disponibles en FR. |
| 6.9 | Traduire l’interface en anglais. | Même couverture fonctionnelle et textuelle en EN. |
| 6.10 | Traduire l’interface en néerlandais. | Même couverture fonctionnelle et textuelle en NL. |
| 6.11 | Ajouter le sélecteur FR/EN/NL. | Sélection accessible avant et après connexion, mise à jour de tous les textes concernés. |
| 6.12 | Conserver et restaurer le choix de langue. | Même langue après rechargement ; comportement initial et valeur invalide définis. |
| 6.13 | Traduire les libellés des statuts, priorités et rôles. | Libellés localisés dans cartes, filtres, formulaires et session ; codes API préservés. |
| 6.14 | Synchroniser la langue HTML et vérifier les formats. | `html lang` conforme au choix ; dates, nombres et contrôles natifs vérifiés. |
| 8.7 | Réaliser la recette des parcours dans les trois langues et les trois rôles. | Matrice FR/EN/NL × ADMIN/CHEF/COMMIS avec résultats et preuves. |
| 8.8 | Tester le basculement et le rechargement. | Changements successifs et restauration validés avant/après connexion. |
| 8.9 | Réaliser la recette linguistique Alpha et Beta. | Résultats distincts rattachés aux artefacts exacts des deux versions. |
| 9.7 | Identifier et rattacher les versions aux artefacts. | Commit, tag/archive ou URL et date de contrôle enregistrés pour Alpha et Beta. |

## Protocole de recette restant

1. Identifier l’artefact exact et l’environnement de chaque version Alpha/Beta ; relever la version et la date de test.
2. Pour FR, EN et NL, vérifier connexion, session/déconnexion, navigation disponible, formulaires, options, placeholders, boutons, recherche, filtres et textes d’accessibilité.
3. Pour ADMIN, CHEF et COMMIS, couvrir tous les écrans autorisés, les restrictions, les quatre statuts, les priorités et les rôles affichés.
4. Déclencher dans un environnement de test les validations, erreurs d’identifiants, indisponibilité réseau/serveur, refus de droits et erreurs d’opération ; vérifier aussi succès, confirmations, chargements et résultats vides.
5. Basculer FR → EN → NL → FR avant puis après connexion ; contrôler les textes déjà affichés, les nouveaux messages, les libellés et l’absence de mélange involontaire de langues.
6. Recharger après chaque choix ; vérifier la restauration de langue et `html lang`, puis le comportement sans préférence enregistrée ou avec une préférence invalide.
7. Vérifier formats de date/nombre, contrôles natifs, lisibilité et absence de débordement sur écran étroit ; consigner les limites liées au navigateur.
8. Distinguer interface et données métier : noms d’items/catégories/personnes, unités et commentaires sont reçus du serveur et affichés tels quels (`tasks.html:48`, `:258`, `:270`, `:274`, `:284`, `:288`). Une traduction automatique de ces données n’est ni constatée ni présumée.
9. Enregistrer les résultats, captures et anomalies par langue, rôle et version ; conclure seulement sur les parcours et artefacts effectivement vérifiés.
