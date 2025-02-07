


# **Ejercicio - Autenticación con Keycloak y Node.js**

**Universidad del Valle de Guatemala**  
**Facultad de Ingeniería**  
**Departamento de Ciencias de la Computación**  
**Seguridad en Sistemas de Computación**  

## **Integrantes**
- **José Auyón** - 201579  
- **María Ramírez** - 21342  
- **Gustavo González** - 21438  
- **Renatto Guzmán** - 21646  
- **Diego Leiva** - 21752  
- **Pablo Orellana** - 21970  

---

## 📌 **Descripción del Proyecto**
Este proyecto consiste en una API **segura** utilizando **Keycloak** como servidor de autenticación y protección de endpoints mediante **OAuth 2.0 y OpenID Connect**. Se implementó una API REST en **Node.js con Express** que gestiona autenticación y autorización mediante **JWT**.

---

## 📌 **Tecnologías Utilizadas**
- **Node.js** (Backend)
- **Express.js** (Framework para API REST)
- **Keycloak** (Servidor de autenticación)
- **Docker** (Para ejecutar Keycloak fácilmente)
- **JWT (JSON Web Tokens)** (Para validar sesiones)
- **Postman** (Para probar los endpoints)

---

## 📌 **Requisitos Previos**
Antes de ejecutar el proyecto, asegúrate de tener instalados:

1. **Node.js** (>= v14) y **npm**
2. **Docker** (para ejecutar Keycloak)
3. **Postman** o `cURL` (para probar la API)

---

## 🔹 **1. Configuración de Keycloak**
### **1.1. Ejecutar Keycloak con Docker**
Ejecuta el siguiente comando para obtener la imagen oficial de keycloak:
```bash
docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.1.1 start-dev
```
Luego abre keycloak desde Docker en el puerto 8080.

![alt text](<assets/docker keycloak start.jpg>)


### **1.2. Crear un Reino (Realm)**
1. Inicia sesión en **http://localhost:8080/** con:
   - Usuario: `admin`
   - Contraseña: `admin`
     
![alt text](<assets/keycloak sign in.jpg>)

2. Crea un nuevo **Reino** llamado: `CybersecurityRealm`.
   
   ![alt text](<assets/realm creation.jpg>)

### **1.3. Crear Cliente OAuth2**
1. Ve a **Clientes** > **Crear Cliente**.
2. **Client ID**: `api-client`
3. **Protocolo**: `OpenID Connect`
   
   ![alt text](<assets/keycloak create client.jpg>)

5. **Tipo de Acceso**: `Confidential`
6. **Habilita Direct Access Grants**
7. Guarda los cambios.
   
   ![alt text](<assets/keycloak client config.jpg>)

### **1.4. Crear un Usuario de Prueba**
1. Ve a **Usuarios** > **Agregar Usuario**.
2. **Username**: `testuser`
3. **Email**: `testuser@example.com`
4. **Email Verified**: ✅ **Activado**
   
   ![alt text](<assets/keycloak create user.jpg>)

6. **Contraseña**:
   - Ve a **Credenciales**, asigna una contraseña (`password`).
   - Desactiva **"Temporary Password"**.
     
      ![alt text](<assets/keycloak user credentials.jpg>)

---

## 🔹 **2. Instalación del Proyecto**
Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd secure-api
```

Instala las dependencias:

```bash
npm install
```

---

## 🔹 **3. Configuración de Variables de Entorno**
Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

- `PORT`: Puerto de la API.
- `KEYCLOAK_REALM`: Nombre del realm en Keycloak.
- `KEYCLOAK_CLIENT_ID`: Identificador del cliente en Keycloak.
- `KEYCLOAK_CLIENT_SECRET`: Secreto del cliente.
- `KEYCLOAK_SERVER_URL`: URL del servidor de Keycloak.

---

## 🔹 **4. Estructura del Proyecto**
El proyecto sigue esta estructura:

```
secure-api/
│── node_modules/
│── .env
│── .gitignore
│── package.json
│── server.js
```

---

## 🔹 **5. Pruebas con Postman**
### 📌 **5.1. Obtener un Token**
Para acceder a los endpoints protegidos, primero debes obtener un **token de acceso (`access_token`)** mediante una solicitud `POST` a Keycloak.

### 📌 **5.2. Probar los Endpoints**
| Endpoint    | Método | Requiere Token | Descripción |
|------------|--------|---------------|-------------|
| `/public`  | `GET`  | ❌ No         | Endpoint accesible sin autenticación. |
| `/private` | `GET`  | ✅ Sí         | Solo accesible con un token válido. |
| `/data`    | `POST` | ✅ Sí         | Recibe datos en JSON, requiere autenticación. |

---

## 🔹 **6. `.gitignore` (Evitar subir archivos sensibles)**
Crea un archivo `.gitignore` y asegúrate de incluir:

```
node_modules/
.env
logs/
package-lock.json
.vscode/
.DS_Store
```

---

