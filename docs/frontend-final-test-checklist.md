# Checklist finale de test frontend

## Comptes de test

- ADMIN : `admin@kitchenstaff.test` / `password`
- CHEF : `chef@kitchenstaff.test` / `password`
- COMMIS : `commis@kitchenstaff.test` / `password`

## Préparation

- [ ] Vérifier que le backend est démarré et accessible.
- [ ] Vérifier que le frontend Angular démarre sans erreur.
- [ ] Vérifier que la console du navigateur ne contient pas d'erreur bloquante.
- [ ] Vérifier que les données de test nécessaires sont disponibles.
- [ ] Ouvrir l'application dans une fenêtre de navigation privée pour tester une session propre.

## Langues FR / EN / NL

- [ ] Vérifier le sélecteur avant puis après connexion avec chaque rôle.
- [ ] Passer de FR à EN, puis NL et FR ; vérifier formulaires, filtres, boutons, statuts, priorités, rôles et textes d’aide.
- [ ] Afficher une erreur puis changer de langue ; vérifier que le message déjà visible est traduit.
- [ ] Recharger dans chaque langue et vérifier que le choix est conservé, y compris après déconnexion.
- [ ] Vérifier la langue du document, les quantités et la lisibilité sur écran étroit.
- [ ] Vérifier que les noms, commentaires et valeurs envoyées à l’API ne changent pas avec la langue.

## Authentification

- [ ] Se connecter avec chacun des trois comptes de test.
- [ ] Vérifier qu'un identifiant ou un mot de passe incorrect affiche un message d'erreur clair.
- [ ] Vérifier que le nom ou l'adresse e-mail de l'utilisateur connecté est affiché.
- [ ] Vérifier que le rôle de l'utilisateur connecté est affiché correctement.
- [ ] Vérifier que le token JWT permet d'accéder aux pages protégées.
- [ ] Se déconnecter et vérifier que l'accès aux pages protégées n'est plus possible.

## Gestion des tâches

- [ ] Vérifier que la liste des tâches se charge correctement.
- [ ] Créer une tâche avec des données valides et vérifier son affichage dans la liste.
- [ ] Vérifier les validations des champs obligatoires lors de la création.
- [ ] Modifier une tâche et vérifier que les nouvelles valeurs sont affichées.
- [ ] Démarrer une tâche et vérifier le changement de statut.
- [ ] Terminer une tâche démarrée et vérifier le changement de statut.
- [ ] Annuler une tâche et vérifier le changement de statut.
- [ ] Supprimer une tâche de test et vérifier sa disparition de la liste.
- [ ] Vérifier qu'une erreur de l'API affiche un retour compréhensible et ne bloque pas l'interface.

### Scénario de test rapide

- [ ] Se connecter comme CHEF avec `chef@kitchenstaff.test` / `password`.
- [ ] Créer une tâche de test.
- [ ] Modifier la tâche créée.
- [ ] Démarrer la tâche.
- [ ] Terminer la tâche.
- [ ] Supprimer une tâche de test.
- [ ] Vérifier que les compteurs du dashboard correspondent aux tâches et à leurs statuts.

## Filtres et recherche

- [ ] Filtrer les tâches par date et vérifier les résultats.
- [ ] Filtrer les tâches par statut et vérifier les résultats.
- [ ] Filtrer les tâches par priorité et vérifier les résultats.
- [ ] Combiner plusieurs filtres et vérifier les résultats.
- [ ] Rechercher une tâche avec un terme présent dans ses informations.
- [ ] Vérifier qu'une recherche sans résultat affiche un état vide clair.
- [ ] Réinitialiser les filtres et la recherche, puis vérifier que toutes les tâches réapparaissent.

## Dashboard summary

- [ ] Vérifier que les compteurs du dashboard se chargent correctement.
- [ ] Vérifier que chaque compteur correspond aux tâches visibles et à leur statut.
- [ ] Créer, démarrer, terminer ou annuler une tâche, puis vérifier la mise à jour des compteurs.
- [ ] Vérifier que les compteurs restent corrects après la suppression d'une tâche de test.

## Rôles utilisateurs

- [ ] Avec le compte ADMIN, vérifier que toutes les actions autorisées sont visibles et fonctionnelles.
- [ ] Avec le compte CHEF, vérifier que les actions prévues pour ce rôle sont visibles et fonctionnelles.
- [ ] Avec le compte COMMIS, vérifier que seules les actions prévues pour ce rôle sont disponibles.
- [ ] Vérifier que les boutons interdits pour un rôle sont masqués ou désactivés.
- [ ] Vérifier qu'un utilisateur ne peut pas contourner les restrictions de rôle par navigation directe.

## Tests après refresh

- [ ] Se connecter, rafraîchir la page et vérifier que la session reste active.
- [ ] Vérifier que l'utilisateur connecté et son rôle restent affichés après le rafraîchissement.
- [ ] Rafraîchir la liste des tâches et vérifier que les données sont toujours chargées.
- [ ] Rafraîchir le dashboard et vérifier que les compteurs restent corrects.
- [ ] Vérifier le comportement des filtres et de la recherche après un rafraîchissement.
- [ ] Se déconnecter, rafraîchir la page et vérifier que la session ne réapparaît pas.

## Problèmes fréquents

- [ ] Si la connexion échoue, vérifier que le backend fonctionne et que l'URL de l'API est correcte.
- [ ] Si une requête retourne `401`, vérifier la présence et la validité du token JWT.
- [ ] Si une requête retourne `403`, vérifier le rôle du compte connecté et les autorisations attendues.
- [ ] Si les tâches ne s'affichent pas, vérifier les erreurs réseau et la réponse de l'API dans les outils du navigateur.
- [ ] Si les compteurs sont incorrects, rafraîchir les données et comparer avec les statuts des tâches.
- [ ] Si un filtre semble vide, réinitialiser les autres filtres et la recherche.
- [ ] Si une modification n'apparaît pas, vérifier la réponse de l'API puis recharger la liste.
- [ ] Noter toute anomalie avec les étapes de reproduction, le compte utilisé et une capture d'écran.
