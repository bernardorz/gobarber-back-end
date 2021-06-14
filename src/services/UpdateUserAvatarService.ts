import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import User from '../models/User'
import uploadConfig from '../config/upload'
import AppError from '../errors/AppError';


interface Request{
    user_id : string;
    avatarFilename : string;
}

export default class updateUserAvatarService{
    public async execute({ user_id, avatarFilename}: Request) : Promise<User>{

        const userRepository = getRepository(User);


        const user = await userRepository.findOne(user_id)

        if(!user){
            throw new AppError('Only authenticated users can change avatar', 401)
        }

        if(user.avatar){
            //Deletar avatar anteior

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

            const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath)

            if(userAvatarFileExist){
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFilename

        await userRepository.save(user)


        user.password = "********"

        return user

    }
}