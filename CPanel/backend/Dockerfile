# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu backend
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de tu backend
COPY . .

# Expone el puerto en el que corre tu backend

# Comando para correr el backend
CMD ["node", "server.js"] 

EXPOSE 3001