# Confidentialité et circulation des données

[← Accueil](../README.md)

## En une phrase

Savoir récupère une transcription à votre demande et transmet le texte nécessaire à OpenAI seulement lorsque vous demandez un résumé ou envoyez une question. Le traitement de texte distant n’est donc pas un mode 100 % hors ligne.

## Ce qui quitte votre PC

| Action | Destination et données |
| --- | --- |
| Regarder une vidéo sans ouvrir Savoir | Aucun traitement IA déclenché par Savoir. YouTube conserve son propre fonctionnement. |
| Ouvrir Savoir | Le navigateur démarre le connecteur local et lit l’état de connexion. |
| Charger une transcription | Requêtes publiques vers YouTube pour les sous-titres. |
| Coller une transcription | Texte stocké localement jusqu’à une demande de résumé/question. |
| Résumer ou envoyer une question | Texte de la source ou passages pertinents, question et historique terminé nécessaire envoyés à OpenAI. |
| Continuer avec ChatGPT | Flux officiel OpenAI, avec consentement dans le navigateur. Un serveur de callback temporaire écoute uniquement sur loopback pendant cette opération. |

Savoir n’envoie pas de télémétrie applicative. Les services externes ont leurs propres journaux et politiques ; l’absence de télémétrie Savoir ne signifie pas l’absence de toute donnée réseau ou de conservation par ces services.

## Connexion et secrets

- Aucun mot de passe ou cookie ChatGPT n’est récupéré par Savoir.
- Les jetons restent dans le connecteur et sont protégés pour l’utilisateur Windows par DPAPI.
- L’extension et la page YouTube ne reçoivent pas ces jetons.
- Les appels Responses utilisent `store:false`. Ce paramètre n’est pas une promesse d’absence de conservation côté fournisseur ; les conditions d’OpenAI restent applicables.
- Aucun accès implicite aux anciennes conversations ou à la mémoire ChatGPT.

## Données conservées localement

Le chemin historique est volontairement conservé pour la compatibilité :

```text
%LOCALAPPDATA%\CypherYouTube
```

Il contient les enregistrements de connexion protégés et `videos.db` : transcriptions, imports et résumés terminés. L’historique de discussion terminé se trouve dans le stockage local de l’extension, lié à la vidéo et au hash de sa source. Les imports ne remplacent pas le cache public d’un autre panneau.

N’importez pas de données sensibles que vous n’êtes pas autorisé à transmettre au fournisseur. Contrôlez les données avant de demander une génération.

## Effacer et se déconnecter

Dans les réglages du panneau, **Effacer cette discussion** supprime l’historique local de la vidéo, pas tous les caches. **Déconnecter ChatGPT** retire la connexion locale et tente la révocation prévue par le fournisseur ; une erreur réseau de révocation ne peut pas garantir un résultat côté serveur.

Pour un effacement complet volontaire : déconnectez le compte, fermez tous les panneaux et options Savoir, retirez l’extension puis supprimez le dossier historique ci-dessus. Sa suppression retire aussi les caches et sauvegardes de migration de cette extension. Ne supprimez pas le dossier d’un autre produit nommé Savoir. La désinstallation seule conserve ces données pour ne pas les détruire sans choix explicite.

## Captures et signalements

Les images de démonstration utilisent du contenu original fictif, sans compte personnel. Les captures d’installation masquent les chemins personnels lorsqu’ils sont visibles. Avant de signaler un bug, masquez emails, chemins personnels, transcriptions privées, codes et jetons. Pour une vulnérabilité, suivez [SECURITY.md](../SECURITY.md), pas une issue publique contenant un secret.

## Dépendances et affiliation

Consultez les [licences tierces](../THIRD_PARTY_NOTICES.md). Savoir est indépendant d’OpenAI, Google et YouTube. Leur nom décrit une intégration, pas un partenariat ni une certification.
