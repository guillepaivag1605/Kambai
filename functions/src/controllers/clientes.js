const admin = require('../../firebase-service')
const controller = {}
const Cliente = require('../models/Cliente')

controller.crearCliente = async (req, res) => {

    const { kambaiDatos, body } = req
    const { datosCliente } = body
    const { uidSolicitante, datosAuthSolicitante } = kambaiDatos

    try {

        const cliente = new Cliente(datosCliente)
        
        //agrgamos en la base de datos
        const resultado = await cliente.agregar(uidSolicitante)

        // Actualizar la cantidad
        const ref = admin.firestore().collection('Usuarios').doc(uidSolicitante)
        const data = (await ref.get()).data()

        //aumentamos la cantidad de clientes
        ref.update({
            cantidadClientes: data.cantidadClientes + 1
        })

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: 'Se creo el cliente de forma correcta.',
            resultado: resultado,
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema al crear el cliente.',
            resultado: error,
        })
    }
}

controller.actualizarCliente = async (req, res) => {

    try {
        const { kambaiDatos, params, body } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { uidCliente } = params
        const { datosCliente } = body

        const cliente = new Cliente(datosCliente)

        // Actualización normal de datos del paciente
        await cliente.actualizar(uidSolicitante, datosCliente)

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Se actualizó el cliente de forma correcta.`,
            resultado: {
                uidCliente: uidCliente,
            },
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema al actualizar cliente.',
            resultado: error,
        })
    }
}

controller.eliminarCliente = async (req, res) => {
    try {
        const { kambaiDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { uidCliente } = params

        let refUsuario = admin.firestore().collection('Usuarios').doc(uidSolicitante)
        let ref = refUsuario.collection('Clientes').doc(uidCliente)

        let cantidadPacientesEliminados = 0

        // Eliminar todos los documentos pacientes
        const docsPacientes = await ref.collection('Pacientes').get()

        docsPacientes.forEach(docPaciente => {
            docPaciente.ref.delete()
            cantidadPacientesEliminados = cantidadPacientesEliminados + 1
        })

        // Eliminar documento cliente
        ref.delete()

        // Actualizar la cantidad
        const data = (await refUsuario.get()).data()

        refUsuario.update({
            cantidadPacientes: data.cantidadPacientes - cantidadPacientesEliminados,
            cantidadClientes: data.cantidadClientes - 1
        })

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: 'Se eliminó el cliente de forma correcta y todas sus mascotas.',
            resultado: null,
        })
    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema al eliminar el cliente.',
            resultado: error,
        })
    }
}

controller.importarDatos = async (req, res) => {


    const { kambaiDatos, body } = req
    const { datosClientes } = body
    const { uidSolicitante, datosAuthSolicitante } = kambaiDatos

    try {

        datosClientes.forEach( async (datoCliente) => {

            const cliente = new Cliente(datoCliente)

            
            


            //agrgamos en la base de datos
            const resultado = await cliente.agregar(uidSolicitante)

            // Actualizar la cantidad
            const ref = admin.firestore().collection('Usuarios').doc(uidSolicitante)
            const data = (await ref.get()).data()

            //aumentamos la cantidad de clientes
            ref.update({
                cantidadClientes: data.cantidadClientes + 1
            })

        })


        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Datos clientes importados con exito.`,
            resultado: req.body.datosClientes
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema al importar los clientes.',
            resultado: error,
        })
    }

}

module.exports = controller