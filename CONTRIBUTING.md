# Contribuer à Savoir

Merci de garder Savoir simple : comprendre une vidéo sans changer de fenêtre, sans modèle local à gérer et sans collecte cachée.

## Avant de proposer un changement

- Cherchez d’abord une issue existante.
- Pour une grosse fonctionnalité, ouvrez une discussion dans une issue avant de développer.
- Pour une vulnérabilité ou un secret, utilisez [le canal sécurité](SECURITY.md), pas une issue publique.
- N’ajoutez ni cookies de navigateur, ni clé API, ni transcription privée, ni média tiers dont la redistribution n’est pas autorisée.

## Une petite contribution, de bout en bout

1. Forkez le dépôt et créez une branche ciblée.
2. Suivez le [guide développeur](docs/development.md).
3. Pour un bug, ajoutez un test qui reproduit le problème avant le correctif.
4. Lancez `npm test`, `npm run typecheck`, `npm run build` et les tests natifs indiqués dans le guide.
5. Si vous changez les noms, chemins ou l’installateur, vérifiez aussi le paquet et les tests Windows/navigateur.
6. Ouvrez une pull request courte : problème, changement, tests réellement exécutés et limites restantes.

Les captures de démonstration doivent rester signalées comme telles. N’annoncez pas de compatibilité plateforme, d’éligibilité de compte ou d’inférence réelle à partir d’un mock.

La licence MIT couvre le code original ; conservez les notices et licences des dépendances. Les identifiants techniques historiques ne doivent pas être renommés sans une stratégie explicite de migration.
