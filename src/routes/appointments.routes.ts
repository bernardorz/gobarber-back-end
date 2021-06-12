import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'



const appointmentsRouter = Router()


// const teste = (request : Request, response : Response, next : NextFunction) => {
//     console.log('oi')

//     return next()
// }

//Rota : receber a request, chamar outro arquivo. devolver uma resposta


appointmentsRouter.get('/' , async (request,response) => {

  const appointmentsRepository = getCustomRepository(AppointmentsRepository)

  const appointments = await appointmentsRepository.find()

  return response.status(200).json(appointments)
})

appointmentsRouter.post('/', async (request, response) => { 

    try {

        const { provider_id, date } = request.body

        const pasrsedDate =  parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment =  await createAppointment.execute({
            date : pasrsedDate,
            provider_id
        })

        return response.json(appointment)
        
    } catch (error) {
        return response.status(400).json({ error : error.message})
    }

})

export default appointmentsRouter;