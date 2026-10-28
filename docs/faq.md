# Questions fréquentes

[← Accueil](../README.md)

## Est-ce que je dois installer un modèle IA ?

Non. Aucun Ollama, poids de modèle ou reconnaissance audio n’est nécessaire. Le petit connecteur Windows est inclus dans l’installateur et lancé par le navigateur à la demande.

## Est-ce gratuit ?

Le code Savoir est sous licence MIT. Son usage distant dépend des accès, autorisations et quotas de votre compte ChatGPT et des conditions d’OpenAI. Nous ne promettons pas une génération gratuite ou illimitée. Aucun achat, secours API facturé séparément ou passage automatique à une offre payante n’est activé par Savoir.

## Puis-je connecter n’importe quel compte ChatGPT ?

Ce n’est pas garanti. Le flux officiel utilisé vise les applications locales/open source compatibles ; il peut être limité selon le compte et le déploiement du fournisseur. La connexion et l’inférence réelles ne sont pas encore validées sur un compte utilisateur dans cette bêta. En cas d’erreur, ne transmettez ni jeton, cookie ni mot de passe dans une issue.

## Est-ce la page ChatGPT intégrée à YouTube ?

Non. C’est l’interface de Savoir, avec la transcription de la vidéo comme contexte. Elle n’importe pas implicitement vos anciennes conversations, votre mémoire ChatGPT ou les cookies du site.

## Pourquoi activer le mode développeur ?

L’extension n’est pas encore publiée sur le Chrome Web Store. GitHub fournit les fichiers, pas une activation silencieuse dans Chrome. Le [guide](installation.md) montre comment charger le dossier une fois.

## « Connecteur introuvable »

Installez Savoir avant de charger l’extension, vérifiez que vous utilisez le dossier de l’installation actuelle, puis fermez et rouvrez le panneau. Le nom interne de l’hôte reste `com.cypher.youtube` pour la compatibilité ; ce n’est pas un service HTTP à démarrer. Si le problème reste présent, ouvrez une issue en précisant Windows, navigateur et version, sans secrets.

## Aucun bouton Savoir sous la vidéo

Actualisez une page vidéo normale `https://www.youtube.com/watch?v=...`. Vérifiez que Savoir est activé dans la page des extensions et qu’une ancienne copie n’intervient pas. L’interface Shorts et les lecteurs intégrés hors YouTube ne sont pas garantis par cette version.

## Les sous-titres sont indisponibles

Certaines vidéos n’en ont pas ; YouTube peut aussi bloquer l’accès automatisé. Collez une transcription dans le panneau. Savoir ne télécharge pas un modèle audio en arrière-plan pour contourner ce cas.

## Les longues vidéos sont-elles entièrement envoyées ?

Le résumé traite la source par passages et assemble leurs synthèses. Les questions utilisent les passages jugés pertinents lorsque la source dépasse le contexte ; le panneau l’indique. Cette sélection est lexicale et peut manquer un passage. N’interprétez pas une réponse comme la preuve que chaque détail de la vidéo a été étudié.

## Pourquoi les liens temporels manquent-ils ?

Ils ne sont proposés que si la transcription fournit des horaires vérifiables. Un texte collé sans horaires ne reçoit pas de temps inventés. Un repère mène au passage source ; il ne prouve pas que l’affirmation du modèle est exacte.

## Les captures montrent-elles une vraie réponse de ChatGPT ?

Les scènes Résumé/Discussion utilisent le vrai panneau avec un transport de test et un contenu original fictif, explicitement signalés dans l’image et sa légende. Les écrans d’installation et de connexion sont des captures du logiciel réel. Aucune de ces images ne prouve une connexion ou une génération réelle avec un compte OpenAI.

## Pourquoi voit-on encore « cypher » dans le code ?

Savoir conserve des identifiants techniques existants pour ne pas invalider l’extension, le stockage chiffré ou les données locales. Le nom visible est Savoir. Le dépôt du widget Cypher est un autre projet et n’est pas concerné.

## macOS, Linux, Firefox, Windows 11 ?

Le connecteur de cette bêta utilise Windows DPAPI et l’installateur Windows x64. Chrome/Edge sont les cibles actuelles. Les essais locaux Windows 10 et les tests CI ne constituent pas une validation physique Windows 11. Les autres plateformes ne sont pas livrées.
