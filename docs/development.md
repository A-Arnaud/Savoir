# Développer Savoir

[← Accueil](../README.md)

## Prérequis

- Windows x64 pour le connecteur, DPAPI et l’installateur.
- Node.js **24 ou plus récent**, npm et [uv](https://docs.astral.sh/uv/).
- Python 3.12, que `uv` peut installer. Aucun modèle IA local.
- NSIS 3 pour produire l’installateur. Playwright Chromium pour les tests navigateur.

## Démarrer depuis les sources

```powershell
git clone https://github.com/A-Arnaud/Savoir.git
cd Savoir
npm ci
uv sync --project services/native_host --python 3.12 --no-install-project
npm test
npm run typecheck
.\services\native_host\.venv\Scripts\python.exe -m pytest -c services/native_host/pyproject.toml services/native_host/tests -q
npm run build
```

Le build de l’extension est dans `dist/extension`. Elle nécessite aussi le connecteur installé pour fonctionner réellement.

## Construire l’installateur Windows

Installez NSIS 3 et rendez `makensis.exe` accessible dans le PATH, ou indiquez son emplacement :

```powershell
$env:SAVOIR_MAKENSIS = 'C:\Program Files (x86)\NSIS\makensis.exe'
.\services\native_host\.venv\Scripts\python.exe scripts/package-native.py
```

Résultat : `release/native-0.2.0/Savoir-Setup-0.2.0.exe` et `release-manifest.json`. Le script construit `SavoirConnector.exe`, rassemble les licences Python/npm et appelle NSIS. Il ne signe pas le binaire. Le champ `installer` du manifeste local contient votre chemin absolu : ne publiez pas ce fichier sans examiner son contenu.

`--skip-connector` réutilise exclusivement un connecteur déjà construit dans ce dossier de release ; il n’est pas adapté après modification du code natif.

Pour distribuer, publiez l’installateur et un `SHA256SUMS.txt` contenant son nom de fichier et son hash, pas le dossier de développement.

## Vérifications navigateur et installation

Installez le paquet construit, puis :

```powershell
node node_modules/@playwright/test/cli.js install chromium
npm run test:e2e
```

Deux cas sont distingués :

1. Véritable host installé : démarrage au clic, import original, état sans compte et arrêt à fermeture.
2. Interface réelle et bridge avec un compte/transport explicitement synthétique : résumé, question, lien source et réponse tardive après navigation. Cela ne valide pas une inférence OpenAI réelle.

Ces tests utilisent des profils et dossiers de données isolés. Aucun login réel ni appel OpenAI n’est requis. Ils ne doivent pas réutiliser un profil personnel.

```powershell
python tools/check-windows-install.py
```

Ce dernier contrôle est réservé à un environnement de test : il installe une copie A temporaire, restaure l’installation B par défaut, désinstalle A et vérifie que B garde ses inscriptions/raccourcis. Il écrit dans HKCU et restaure B dans un `finally` ; ce n’est pas un simple contrôle en lecture seule.

## Architecture

```text
YouTube : bouton Savoir
    → panneau React chargé au clic
    → service worker MV3 : contexte de l’onglet, routage, annulation
    → Chrome Native Messaging : stdio encadré, actions autorisées
    → connecteur Windows : source, cache SQLite, OAuth/DPAPI
    → endpoints officiels OpenAI, après une action explicite
```

| Dossier | Rôle |
| --- | --- |
| `apps/extension` | Extension, panneau, popup et options. |
| `services/native_host` | Authentification, secrets protégés, protocole, sources et génération. |
| `services/companion/src/cypher` | Uniquement les schémas et lecteurs de sous-titres/imports réutilisés ; aucun serveur HTTP ou moteur local dans ce dépôt. |
| `packages/contracts` | Types et validateurs communs. |
| `installer` / `scripts/package-native.py` | Installateur utilisateur et guide inclus. |
| `tests` / `tools` | Régressions, validation et captures reproductibles. |

Les identifiants techniques `com.cypher.youtube`, `jpikchfngegijdlhpadbahgkaiaihgpi`, le namespace `cypher_native` et le dossier de données `CypherYouTube` sont conservés par compatibilité. Le nom visible est Savoir ; le dépôt du widget Cypher et l’ancien projet local Savoir ne font pas partie de cette publication.

## Contrats importants

- Chaque génération exige un hash de source et une vidéo correspondant à un instantané immuable ; les imports ne remplacent pas le cache public.
- L’historique non vide exige aussi la même vidéo et le même hash. Seuls les échanges terminés sont réutilisés.
- Les segments longs sont découpés avant sélection. Pas d’envoi silencieux d’un contexte vide.
- Aucune relance automatique de requête d’inférence. Une annulation non honorée après deux secondes déconnecte le host ; le client HTTP synchrone isolé n’a pas cette garantie à lui seul.
- Aucun jeton dans le navigateur ou les logs. Aucune récupération de cookies ChatGPT, aucun secours API payant.

## Captures et vérification de publication

```powershell
node tools/capture-docs.mjs
node tools/check-publication.mjs
```

Les captures d’interface utilisent du texte original de test. Les scènes avec compte/réponses synthétiques portent une mention dans l’image. Les captures sans compte et du guide utilisent le vrai logiciel installé ; les chemins personnels sont floutés. Relisez les images avant publication.

`check-publication` contrôle les liens locaux, les images requises, les artefacts interdits et quelques formats reconnaissables de secrets. Il ne remplace pas une revue manuelle des fichiers et ne garantit pas la détection de tout secret.

La CI teste/build sans compte réel. Un runner Windows ne constitue pas une certification sur un PC Windows 11 physique. Ne transformez pas un test mocké en affirmation de génération réelle.
