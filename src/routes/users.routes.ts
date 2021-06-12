import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()




usersRouter.get('/', async (request,response) => {

})

usersRouter.post('/', async (request, response) => { 

    try {

        const { name, email, password} = request.body

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        })

        user.password = '********'
        //lembrar de deletar isso aq !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        return response.status(201).json(user)

        
    } catch (error) {
        return response.status(400).json({ error : error.message})
    }

})

export default usersRouter;