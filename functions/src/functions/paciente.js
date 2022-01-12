const functions = require('firebase-functions')
const admin = require('../../firebase-service')

const documentPath = 'Usuarios/{uidUsuario}/Clientes/{uidCliente}/Pacientes/{uidPaciente}'

const cf = {}

cf.incrementarCantidadPaciente = 
functions.region('southamerica-east1').firestore.document(documentPath).onWrite(async ( change, context ) => {
    
    const document = change.after.exists ? change.after.data() : null

    const { uidUsuario, uidCliente, uidPaciente } = context.params

    async function contadorDePaciente(uidUsuario, seAgrego) {
        const increment = admin.firestore.FieldValue.increment(1)
        const decrement = admin.firestore.FieldValue.increment(-1)
    
        const ref = admin.firestore().collection('Usuarios').doc(uidUsuario)
    
        await ref.update({
            cantidadPacientes: seAgrego ? increment : decrement
        })
    }

    return await contadorDePaciente(uidUsuario, !!document)
})

module.exports = cf