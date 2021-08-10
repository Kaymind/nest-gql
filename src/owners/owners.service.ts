import { Owner } from 'src/owners/entities/owner.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerRepository.create(createOwnerInput);
    return this.ownerRepository.save(newOwner);
  }

  findAll() {
    return this.ownerRepository.find();
  }

  findOne(id: number): Promise<Owner> {
    return this.ownerRepository.findOne({ id });
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    const owner = this.findOne(id);
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }
    const updateOwner = Object.assign(owner, updateOwnerInput);
    return this.ownerRepository.save(updateOwner);
  }

  remove(id: number) {
    return this.ownerRepository.delete({ id });
  }
}
