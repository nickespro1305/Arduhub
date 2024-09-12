# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu frontend
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de tu frontend
COPY . .

# Expone el puerto en el que corre Vite
EXPOSE 5173

# Comando para correr Vite en modo de desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
