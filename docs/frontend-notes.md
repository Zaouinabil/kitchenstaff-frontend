# Frontend Notes - Kitchenstaff

Ce document présente les premières notes concernant le frontend Angular du projet Kitchenstaff.

## Objectif du frontend

Le frontend permet de fournir une interface utilisateur simple pour utiliser l’API Kitchenstaff.

Les objectifs principaux sont :

- permettre à l’utilisateur de se connecter ;
- récupérer le token JWT après connexion ;
- afficher les tâches de mise en place ;
- permettre de commencer ou terminer une tâche ;
- afficher un dashboard simple ;
- améliorer l’utilisation du backend avec une interface visuelle.

## Technologie choisie

Le frontend est développé avec Angular.

Angular a été choisi pour sa structure claire et professionnelle :

- composants ;
- services ;
- routing ;
- formulaires ;
- HttpClient ;
- organisation adaptée à une application connectée à une API REST.

## Backend utilisé

Le frontend communiquera avec le backend Spring Boot disponible localement à l’adresse :

```text
http://localhost:8080/api/v1