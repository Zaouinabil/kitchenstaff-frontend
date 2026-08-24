# Guide d’utilisation du frontend Kitchenstaff

Ce document présente les principales fonctionnalités du frontend Angular de Kitchenstaff. Il peut servir de support pendant une démonstration ou pour décrire l’utilisation de l’application dans le rapport de TFE.

## Ordre de lancement

Pour utiliser l’application en local, démarrer les différents composants dans cet ordre :

1. démarrer MySQL et vérifier que la base de données Kitchenstaff est disponible ;
2. démarrer le backend Spring Boot, accessible sur `http://localhost:8080` ;
3. démarrer le frontend Angular, accessible sur `http://localhost:4200`.

Ouvrir ensuite `http://localhost:4200` dans un navigateur.

## Comptes de test

| Rôle | Adresse e-mail | Mot de passe |
| --- | --- | --- |
| ADMIN | `admin@kitchenstaff.test` | `password` |
| CHEF | `chef@kitchenstaff.test` | `password` |
| COMMIS | `commis@kitchenstaff.test` | `password` |

Ces comptes permettent de présenter les différents niveaux d’accès. Les rôles `ADMIN` et `CHEF` disposent des fonctions de gestion des tâches. Le rôle `COMMIS` peut consulter ses tâches et mettre à jour leur progression, mais ne peut pas en créer.

## Connexion et informations utilisateur

Depuis la page de connexion :

1. saisir l’adresse e-mail d’un compte de test ;
2. saisir le mot de passe `password` ;
3. valider le formulaire de connexion.

Après une connexion réussie, l’application affiche l’utilisateur connecté ainsi que son rôle (`ADMIN`, `CHEF` ou `COMMIS`). Ces informations permettent de vérifier rapidement le compte utilisé et les fonctionnalités auxquelles il a accès.

## Consultation des tâches

La page principale affiche les tâches de mise en place sous forme de fiches. Chaque tâche indique notamment l’item à préparer, sa catégorie, sa quantité, sa priorité, l’utilisateur assigné, son commentaire et son statut.

Le bouton **Actualiser** recharge les données depuis le backend.

### Filtre par date

Le champ **Date** permet de consulter les tâches d’une journée précise. Par défaut, la date du jour est sélectionnée. Le bouton **Aujourd’hui** permet de revenir directement aux tâches du jour.

### Filtre par statut

Les tâches peuvent être filtrées selon leur état :

- toutes ;
- à faire ;
- en cours ;
- terminées ;
- annulées.

### Filtre par priorité

Le filtre de priorité limite l’affichage aux tâches de priorité `BASSE`, `NORMALE`, `HAUTE` ou `URGENTE`. L’option **Toutes** retire ce filtre.

### Recherche

Le champ **Rechercher une tâche** effectue une recherche dans l’item, la catégorie, l’utilisateur assigné et le commentaire. Le bouton **Effacer** vide la recherche et réaffiche les tâches correspondant aux autres filtres actifs.

## Gestion des tâches

### Créer une tâche

Avec un compte `ADMIN` ou `CHEF`, compléter le formulaire **Nouvelle tâche** :

1. sélectionner un item ;
2. sélectionner l’utilisateur assigné ;
3. indiquer la quantité ;
4. choisir la priorité ;
5. sélectionner la date ;
6. ajouter éventuellement un commentaire ;
7. cliquer sur **Créer la tâche**.

La nouvelle tâche apparaît ensuite dans la liste correspondant à sa date.

### Modifier une tâche

Avec un compte `ADMIN` ou `CHEF`, cliquer sur **Modifier** dans la fiche concernée. Les informations de la tâche sont chargées dans le formulaire. Après correction, cliquer sur **Mettre à jour la tâche**. Le bouton **Annuler la modification** permet de quitter le mode d’édition sans enregistrer les changements.

### Supprimer une tâche

Avec un compte `ADMIN` ou `CHEF`, cliquer sur **Supprimer** dans la fiche de la tâche, puis confirmer la suppression lorsque l’application le demande. La tâche est retirée de la liste après confirmation du backend.

## Actions sur le statut

Les boutons disponibles dépendent du statut actuel de la tâche et du rôle de l’utilisateur :

- **Démarrer** fait passer une tâche de `A_FAIRE` à `EN_COURS` ;
- **Terminer** fait passer une tâche de `EN_COURS` à `TERMINEE` ;
- **Annuler** fait passer une tâche active à `ANNULEE`. Cette action est réservée aux rôles `ADMIN` et `CHEF`.

Après chaque action, la liste des tâches et le résumé sont actualisés.

## Dashboard summary

Le résumé du dashboard affiche, pour la date sélectionnée :

- le nombre total de tâches ;
- le nombre de tâches à faire ;
- le nombre de tâches en cours ;
- le nombre de tâches terminées ;
- le nombre de tâches annulées.

Il permet d’obtenir une vue rapide de l’avancement de la mise en place. Le résumé est calculé pour la date choisie et reste indépendant de la recherche textuelle et du filtre de priorité.

## Scénario de démonstration

1. Démarrer MySQL, le backend Spring Boot et le frontend Angular dans cet ordre.
2. Se connecter avec le compte CHEF : `chef@kitchenstaff.test` / `password`.
3. Vérifier l’affichage de l’utilisateur connecté et du rôle `CHEF`.
4. Consulter les tâches du jour.
5. Filtrer les tâches par statut, par exemple **À faire**.
6. Créer une nouvelle tâche pour la date du jour.
7. Modifier une information de cette tâche.
8. Cliquer sur **Démarrer**, puis sur **Terminer**.
9. Vérifier que le dashboard summary reflète les changements de statut.
