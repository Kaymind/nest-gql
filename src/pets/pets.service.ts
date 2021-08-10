import { OwnersService } from './../owners/owners.service';
import { CreatePetInput } from './dto/create-pet.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { Owner } from '../owners/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    private ownerService: OwnersService,
  ) {}

  findAll(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  find(id: number): Promise<Pet> {
    return this.petRepository.findOneOrFail({ id });
  }

  create(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petRepository.create(createPetInput);

    return this.petRepository.save(newPet);
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownerService.findOne(ownerId);
  }
}
