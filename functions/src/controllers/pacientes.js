const admin = require('../../firebase-service')
const Paciente = require("../models/Paciente")

const controller = {}

controller.crearPaciente = async (req, res) => {
    try {
        const { kambaiDatos, body } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { datosPaciente } = body

        // Agregar paciente
        const paciente = new Paciente(datosPaciente)
        await paciente.agregar(uidSolicitante)

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Se creo el paciente ${paciente.uid}.`,
            resultado: paciente.getDatosPaciente(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema.',
            resultado: error,
        })
    }
}

controller.verPaciente = async (req, res) => {
    try {
        const { kambaiDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { uidPaciente } = params

        const paciente = new Paciente()
        await paciente.importarDatos(uidSolicitante, uidPaciente)

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Se obtuvo los datos de forma correcta.`,
            resultado: paciente.getDatosPaciente(),
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema.',
            resultado: error,
        })
    }
}

controller.actualizarPaciente = async (req, res) => {
    try {
        const { kambaiDatos, params, body } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { uidPaciente } = params
        const { datosPaciente } = body
        
        // Borrar paciente
        const paciente = new Paciente()
        await paciente.importarDatos(uidSolicitante, uidPaciente)
        
        // Actualización normal de datos del paciente
        await paciente.actualizar(uidSolicitante, datosPaciente)

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Se actualizó el paciente de forma correcta.`,
            resultado: uidPaciente,
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema.',
            resultado: error,
        })
    }
}

controller.eliminarPaciente = async (req, res) => {
    try {
        const { kambaiDatos, params } = req
        const { uidSolicitante, datosAuthSolicitante } = kambaiDatos
        const { uidPaciente } = params
        
        // Borrar paciente
        const paciente = new Paciente()
        await paciente.importarDatos(uidSolicitante, uidPaciente)
        await paciente.borrar(uidSolicitante)

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Se elimino el paciente de forma correcta.`,
            resultado: paciente.getDatosPaciente(),
        })

    } catch (error) {
        console.log('error', error)

        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema.',
            resultado: error,
        })
    }
}

controller.importarDatos = async (req, res) => {

    const { kambaiDatos, body } = req
    const { datosPacientes } = body
    const { uidSolicitante, datosAuthSolicitante } = kambaiDatos

    try {

        datosPacientes.forEach( async (datoPaciente) => {

            let uidcliente = ""

            const {
                nombreCliente, direccion, telefono, correo, nombrePaciente, sexo, fechaNacimiento, //ver con guille
                especie, raza, pelaje, peso, chip, castrado, pedigree, fallecio, comida,
            } = datoPaciente

            // agreagamos a la collection clientes problemas
            let datosCliente = {
                nombreCliente: nombreCliente ? nombreCliente : "",
                direccion: direccion ? direccion : "",
                telefono: telefono ? telefono : "",
                correo: correo ? correo : "",
            }


            let clientesResultadoFirestore = await admin.firestore().collection('Usuarios').doc(uidSolicitante)
                                                .collection("Clientes")
                                                .where('nombre', '==', nombreCliente)
                                                .where('direccion', '==', direccion)
                                                .where('correo', '==', correo)
                                                .get()
            
            if ( clientesResultadoFirestore.docs.length === 1 ) {
                //agregamos sin drama

                uidCliente = clientesResultadoFirestore.docs[0].data().uid

                const paciente = new Paciente(datoPaciente)
                await paciente.agregar(uidSolicitante, uidCliente )


            } else if ( clientesResultadoFirestore.docs.length > 1 ) {

                //buscamos entre los elementos
                let seHallo = false

                //quitar espacios en blanco
                let telefonoCelularABuscar = datoPaciente.telefono.replace(/ /g, "")

                //los ultimos 9 caracteres
                telefonoCelularABuscar = telefonoCelularABuscar.slice(-9)

                clientesResultadoFirestore.docs.forEach( async (cliente) => {

                    if ( cliente.data().telefonoCelular.includes(telefonoCelularABuscar) && !seHallo) {

                        uidCliente = cliene.data.uid

                        const paciente = new Paciente(datoPaciente)
                        await paciente.agregar(uidSolicitante, uidCliente )
                        seHallo = true
                    }

                })

                if ( !seHallo ) {

                    // agregar en pacientes problemas
                    const documento = await admin.firestore().collection(`Usuarios`).doc(uidSolicitante)
                    .collection("PacientesProblemas").add({
                        datoPaciente
                    })

                    documento.update({
                        uid: documento.id
                    })
                }

            } else {

                // agregar en pacientes problemas

                const documento = await admin.firestore().collection(`Usuarios`).doc(uidSolicitante)
                .collection("PacientesProblemas").add({
                    datoPaciente
                })

                documento.update({
                    uid: documento.id
                })

            }

        })

        return res.status(200).json({
            codigo: 'Exito',
            mensaje: `Datos pacientes importados con exito.`,
            resultado: req.body.datosPacientes
        })

    } catch (error) {
        return res.status(500).json({
            codigo: 'ErrorServidor',
            mensaje: 'Hubo un problema al importar los pacientes.',
            resultado: error,
        })
    }

}

module.exports = controller