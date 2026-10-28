# Signaler un problème de sécurité

La version publiée est une bêta. Elle n’a pas été auditée par un organisme indépendant ; les tests et revues de développement ne constituent pas une certification.

## Signalement privé

Utilisez [le signalement privé de GitHub](https://github.com/A-Arnaud/Savoir/security/advisories/new). Ne publiez pas de jeton, mot de passe, cookie, code de connexion ou données personnelles dans une issue, une capture ou une pull request.

Décrivez la version, le scénario minimal, l’impact et le comportement attendu. Une preuve peut utiliser uniquement des comptes/valeurs de test. Nous ne promettons pas de délai de réponse ni de programme de récompense.

Si le formulaire privé n’est pas disponible, n’ouvrez pas une issue publique avec les détails exploitables : attendez l’ouverture d’un canal privé par le mainteneur.

## Périmètre sensible

Authentification OpenAI, validation du callback et des jetons, stockage DPAPI, Native Messaging, contrôle du contexte vidéo/source, contenu non fiable des transcriptions, annulation et installateur Windows.

Le produit ne doit jamais reprendre une session/cookie ChatGPT, exposer des jetons dans la page YouTube, lancer une commande arbitraire reçue du navigateur ou basculer vers une API payante sans choix explicite.

## Si un secret a été exposé

Révoquez-le chez le fournisseur et déconnectez le compte. Supprimer une issue ou un commit ne révoque pas un secret et ne garantit pas la disparition de toutes les copies. Ne nous envoyez pas le secret pour prouver qu’il fonctionne.
