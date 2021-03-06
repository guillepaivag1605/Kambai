const functions = require('firebase-functions')

// FUNCTIONS
const { incrementarCantidadCliente, decrementarCantidadCliente } = require('./src/functions/cliente')
const { incrementarCantidadPaciente, decrementarCantidadPaciente } = require('./src/functions/paciente')
const { indexAlgoliaClientes } = require('./src/functions/algoliaClientes')
const { indexAlgoliaPacientes } = require('./src/functions/algoliaPacientes')

// REST-API DE KAMBAI
const kambaiApi = require('./kambaiApi')

// REST-API de Kambai
exports.kambaiApi = functions.region('southamerica-east1').https.onRequest(kambaiApi)

// Funciones de Cloud Functions
exports.incrementarCantidadCliente = incrementarCantidadCliente
exports.incrementarCantidadPaciente = incrementarCantidadPaciente
exports.decrementarCantidadCliente = decrementarCantidadCliente
exports.decrementarCantidadPaciente = decrementarCantidadPaciente

exports.indexAlgoliaClientes = indexAlgoliaClientes
exports.indexAlgoliaPacientes = indexAlgoliaPacientes