require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const axios = require('axios');

const app = express();
app.use(express.json());

// Configuración de Keycloak
const keycloakIssuer = `${process.env.KEYCLOAK_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}`;
const jwksClient = jwksRsa({
    jwksUri: `${keycloakIssuer}/protocol/openid-connect/certs`
});

// Middleware para validar tokens JWT
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken) {
            return res.status(401).json({ error: "Token inválido" });
        }

        const key = await jwksClient.getSigningKey(decodedToken.header.kid);
        const publicKey = key.getPublicKey();

        jwt.verify(token, publicKey, { issuer: keycloakIssuer }, (err, decoded) => {
            if (err) return res.status(401).json({ error: "Token inválido" });
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(401).json({ error: "Error en la validación del token" });
    }
};

// Rutas
app.get('/public', (req, res) => {
    res.json({ message: "Este es un endpoint público." });
});

app.get('/private', verifyToken, (req, res) => {
    res.json({ message: "Este es un endpoint protegido.", user: req.user });
});

app.post('/data', verifyToken, (req, res) => {
    res.json({ message: "Datos recibidos correctamente.", data: req.body });
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
