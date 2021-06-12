import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn , ManyToOne } from 'typeorm'
 

import User from './User'


/*

 Um para Um (OneToOne)

 Um para muitos (OneToMany)


 Muitos para muitos (ManyToMany)

   @JoinColumn({ name : "provider_id"})
*/

@Entity('appointments')
class Appointment{
 
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    provider : string;

    @Column('timestamp with time zone')
    date: Date;
}

export default Appointment;