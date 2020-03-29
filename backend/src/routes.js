const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Login
routes.post('/sessions', SessionController.create);

// ONGS
routes.get('/ongs', OngController.index); // Listar ONG`s
routes.post('/ongs', OngController.create); // Criar ONG`s

// Profile
routes.get('/profile', ProfileController.index);

// Incidents
routes.get('/incidents', IncidentController.index); // Listar incicents
routes.post('/incidents', IncidentController.create); // Criar incicents
routes.delete('/incidents/:id', IncidentController.delete); // Deletar incicents

module.exports = routes;
