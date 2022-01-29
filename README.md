# YannickTranouez_7_24112021
P7 OpenClassrooms DevWeb Formation -- Groupomania

Projet ayant pour but la création d'un réseau social d'entreprise .

Technologies utilisées : 

-HTML / CSS / JavaScript / VueJS / Node.js / Express / MySQL / Sequelize / Axios / JWT

Cloner le repository puis ==>

I) Base de donnée : 
1) !! S'assurer d'avoir installé MySQL et sequelize !!
2) Dans le terminal (backend) : sequelize db:create (va créer la base de donnée dans MySQL à l'aide des informations contenues dans config.js)


II) Backend : 
Dans le terminal du dossier backend (si à la racine entrer cd backend) puis :
1) installer : npm install
2) Ne pas oublier de s'appoprier le .env (Modification du mot de passe de l'admin par exemple).


III) Frontend :
Dans le terminal du dossier frontend (si à la racine entrer cd frontend) puis :
1) Installer VueCLi : npm install -g @vue/cli
2) Installer : npm install


IV) Lancement : 
1) backend : npm run dev (créera automatiquement les tables users messages et comments dans la BDD).
2) frontend : npm run serve

NOTE : L'utilisateur Admin, sera crée dans un même temps que le premier utilisateur, son MDP est à créer/modifier dans un fichier .env (un fichier .env.sample fournit un exemple de configuration).






