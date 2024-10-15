# Utiliser une image de base Node.js
FROM node:14

# Créer un répertoire de travail
WORKDIR /usr/src/app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 5000

# Démarrer l'application
CMD ["node", "server.js"]  
