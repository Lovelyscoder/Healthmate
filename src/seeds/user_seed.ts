import { AppDataSource } from '../config/dbConfig';
import { User } from '../models/User';

export const seedUsers = async () =>{
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);

  const users =[
    { name: 'Lovely', email: 'lovelysingh@xyz.com'},
    { name: 'John', email:'jhon@example.com '}
  ];

  await userRepo.save(users);
  console.log("Users seeded successfully");

  await AppDataSource.destroy();
};
seedUsers();
