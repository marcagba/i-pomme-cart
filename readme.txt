Itunes Cart v15.04.19

MaJ
fix du problème de CORS
ajout du panier
ajout de commentaires dans le code
reorganisation mineure des dossiers
amelioration du du layout

Contenu
Une search box
Une liste de resultat
Un panier

Ca se lance ?
OUI
Ca fonctionne de bout en bout ?
OUI
Qu'est-ce je peux faire avec ?
Lancer une recherche, ajouter un resultat dans le panier,
lancer une autre recherche sans que le panier ne soit reset
Voir le total du panier se mettre à jour

Qu'est-ce qui est encore en construction ?
Pagination des resultats (je n'en montre que 10 par pure commodité de dev)
Css d'un item resultat de recherche
Suppression d' un item du panier
Mise à jour des quantités à acheter
Responsive design 

Lancement
Installer le dossier dans un serveur (http-server sous node fonctionne très bien). Acceder à l'url de index.html

Explication des fichiers

index.html: Squelette de l'application. La section "SearchWrapper" est censé accueillir une barre de recherche et une liste des resultats.
Le block aside "Cartwrapper" accueil le panier

styles/style.css: Mon unique css. Syntaxe inspirée de la méthodologie BEM : BlockName, BlockName-elementName, BlockName.modifierName

styles/style2.css: prototype de css.

templates: Emplacement de mes templates  html pour les différentes vues.

js/bower_components: Quelques bibliothèques installées via bower: backbone, underscore, jquery, requirejs pour l'aspect modulaire, handlebars pour les templates.

js/main.js : Contient la configuration de require et les directives de lancement de l'application.

js/collection/resultList.js: Une collection sensé accueillir les résultats renvoyés par l'API Itunes. Contient également l'url d'appel de l'API Itunes.

js/collection/cartList.js: Une collection sensé accueillir les items envoyés au panier.

js/models/resultItems.js: Contient un modèle  d'un résultat de recherche, et une fonction qui parse le résultat brut.

js/routes/router.js: permet de router le l'appuie sur le bouton search vers l'envoie d'une requête sur l'API Itunes au lieu de recharger la page.
Permet egalement d'ajouter un item au panier.

js/view/searchBoxView.js: S'occupe de générer la vue de la searchBox, et intercepte l'évènement submit pour que la page ne soit pas rechargée.

js/view/resultView.js: Génère la vue de la liste des résultats et gère la pagination.

js/view/resultListView.js: Génère la vue de la liste des résultats et gère la pagination. N'est plus utilisé dans la version actuelle.

js/view/cartView.js: Génère la vue du panier.

js/view/resultItemView.js Génère la vue d'un résultat.

js/view/cartItemView.js Génère la vue d'un item ajouté au panier.


sandbox/index.html: prototype d'UI.
sandbox/index2.html: prototype d'UI.
sandbox/index3.html: prototype d'UI.

Itunes Cart v15.04.13

Fait en  environ 4-5h: Une search box, une liste de résultats (vue, modèle et collections, css)
Ce qui manque: le panier d'achat
Ça se lance ? OUI
Ça fonctionne de bout en bout ? NON. La requête que j'envoie au serveur échoue à cause de CORS mal paramétrés.


Lancement:
Installer le dossier dans un serveur. Lancer index.html

Explication des fichiers:

index.html: Squelette de l'application. La section "SearchWrapper" est censé accueillir une barre de recherche et une liste des resultats

styles/styles.css: Mon unique css. Syntaxe inspirée de la méthodologie BEM : BlockName, BlockName-elementName, BlockName.modifierName

templates: Emplacement de mes templates  html pour les différentes vues. result-list  est inutile et cart-list n'a pas été développé.

bower_components: Quelques bibliothèques installées via bower: backbone, underscore, jquery, requirejs pour l'aspect modulaire, handlebars pour les templates.

js/main.js : Contient la configuration de require et les directives de lancement de l'application.

js/collection/resultList.js: Une collection sensé accueillir les résultats renvoyés par l'API Itunes. Contient également l'url d'appel de l'API Itunes.

js/models/resultItems.js: Contient un modèle  d'un résultat de recherche, et une fonction qui parse le résultat brut.

js/routes/router.js: permet de router le l'appuie sur le bouton search vers l'envoie d'une requête sur l'API Itunes au lieu de recharger la page.

js/view/searchBoxView.js: S'occupe de générer la vue de la searchBox, et intercepte l'évènement submit pour que la page ne soit pas rechargée.

js/view/resultListView.js: Génère la vue de la liste des résultats. Se met à jour à chaque fois qu'un évènement change est émis par un modèle de la collection associée.

js/view/resultItemView.js Génère la vue d'un résultat.

Améliorations:
Un code qui fonctionne
Le panier: une vue, éventuellement une collection et une fonction pour le calcul du total.
Passer le code en ES6
Gérer les erreurs
des transitions graphiques entre le moment où l'on fait une recherche et l'affichage des résultats
