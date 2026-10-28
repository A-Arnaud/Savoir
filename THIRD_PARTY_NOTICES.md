# Notices des dépendances

La licence MIT de `LICENSE` couvre le code original de Savoir et les modules internes réutilisés de Cypher, dont les mentions d’origine sont conservées. Elle ne remplace pas les licences des dépendances.

## Extension

React, React DOM et Scheduler sont sous licence MIT. Ajv et ses dépendances de validation conservent leurs licences propres. Les versions sont verrouillées dans `package-lock.json`. Les textes de licence des dépendances npm de production installées sont copiés dans le sous-dossier `licenses/npm` du paquet Windows, avec un index.

## Connecteur Windows autonome

Le paquet embarque un runtime CPython et ses dépendances, notamment httpx, Pydantic, PyJWT, cryptography et yt-dlp. Leurs conditions et celles des sous-composants s’appliquent indépendamment : CPython/PSF, httpx/BSD, Pydantic et PyJWT/MIT, cryptography/Apache-2.0 ou BSD, yt-dlp/Unlicense avec les licences spécifiques de ses composants. Ces indications sont un repère, pas une nouvelle licence collective ; les textes exacts distribués font foi.

Le build copie `PYTHON-LICENSE.txt`, les notices de distributions Python et leurs métadonnées dans `licenses`, ainsi que les licences npm ci-dessus. PyInstaller conserve sa licence avec exception de distribution ; utiliser son packager ne signifie pas que le code original devient GPL.

Les bibliothèques natives du runtime ont aussi leurs notices : `licenses/native` contient notamment libffi, OpenSSL 3, SQLite, zlib, bzip2, liblzma, Expat et mpdecimal. Les textes sont conservés verbatim avec leur provenance/hash dans `sources.json` ; un index associe les DLL réellement distribuées à leur hash et notice. Les références Microsoft Visual C++ Runtime restent distinctes et ne sont pas assimilées à une licence MIT. Lors d’un changement de runtime, les notices et tout nouveau nom de DLL doivent être réexaminés.

## Outils de développement

Vite, esbuild, TypeScript, Vitest, Playwright, pytest, uv et NSIS sont des outils de build ou de test. Chromium est téléchargé séparément pour les tests et n’est pas livré dans l’installateur. Le guide développeur n’accorde aucun droit supplémentaire sur ces projets.

## Visuels, modèles et contenus

L’icône SVG et les exemples de documentation ont été créés pour Savoir. Les captures de démonstration utilisent du texte original fictif et un transport de test clairement signalé. Aucun média YouTube, transcription privée, police propriétaire, résultat d’analyse d’un logiciel tiers ou identifiant de compte n’est redistribué dans ce dépôt.

Aucun poids de modèle IA/ASR, Ollama, FFmpeg ou autre moteur local historique n’est inclus. OpenAI, Google et YouTube sont cités pour décrire l’intégration ; Savoir n’est ni affilié ni certifié par ces sociétés.
