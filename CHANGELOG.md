# Changements

## 0.2.0 bêta 1 — première publication Savoir

### Utilisation

- Nom Savoir dans l’extension, le popup, les réglages, l’installateur et le guide.
- Résumé, discussion et transcription dans le panneau à côté d’une vidéo YouTube.
- Connecteur Windows autonome lancé à la demande par le navigateur ; aucun modèle local à installer.
- Connexion officielle OpenAI proposée, avec secrets conservés dans le connecteur et protégés par Windows DPAPI.
- Import de texte lorsque les sous-titres sont indisponibles ; liens temporels seulement quand la source les fournit.

### Fiabilité

- Instantanés immuables liés à la vidéo et au hash ; les imports sont isolés du cache public.
- Découpage des longs segments avant sélection du contexte ; pas de génération avec une sélection vide.
- Les réponses interrompues ne deviennent ni historique terminé ni résumé en cache ; la question reste réessayable.
- Annulation avec garde de déconnexion native après deux secondes, sans relance d’inférence automatique.
- Contrôle de propriété lors de la désinstallation d’anciennes copies.

### Publication

- README français, guide illustré, FAQ, confidentialité, contribution et sécurité.
- Captures reproductibles, scènes synthétiques explicitement signalées.
- Tests CI, sources minimales sans historique privé ni anciens moteurs locaux, licences tierces incluses dans le paquet.

### Limites de cette bêta

Connexion et génération avec un compte ChatGPT réel non encore validées ; accès et quotas conditionnels. Installateur non signé, extension non publiée au Chrome Web Store. Pas de certification Windows 11 physique ni de version macOS/Linux. Les erreurs de l’IA, l’indisponibilité des sous-titres et les limites de sélection de contexte restent possibles.
