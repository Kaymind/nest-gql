import { CreatePetInput } from './dto/create-pet.input';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Pet } from './entities/pet.entity';
import { PetsService } from './pets.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query((returns) => Pet)
  petById(@Args('id') id: number): Promise<Pet> {
    return this.petsService.find(id);
  }

  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }

  @Mutation((returns) => Pet)
  createPets(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }
}
