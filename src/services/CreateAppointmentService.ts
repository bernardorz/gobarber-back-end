import Appointment from '../models/Appointment'
import { getCustomRepository } from 'typeorm'
import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import AppError from '../errors/AppError';





/*recebimento de informações
Tratativa de erros e excessoes
acesso ao repositorio*/

interface Request {
    provider_id : string;
    date : Date;
}

class CreateAppointmentService{
   

    public async execute({ date, provider_id} : Request): Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointmentDate  = startOfHour(date)

        const findAppointmentInSameDate =  await appointmentsRepository.findByDate(appointmentDate);
      
    
        if(findAppointmentInSameDate){
            throw new AppError("This appointment is already booked")
        }
      
        
        const appointment =  appointmentsRepository.create({provider_id, date : appointmentDate})

        await appointmentsRepository.save(appointment)

        return appointment

    }

}


export default CreateAppointmentService