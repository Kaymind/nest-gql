import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Pet } from 'src/pets/entities/pet.entity';

@Resolver((of) => Owner)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Mutation((returns) => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Query((returns) => [Owner], { name: 'owners' })
  findAll() {
    return this.ownersService.findAll();
  }

  @Query((returns) => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.findOne(id);
  }

  @Mutation((returns) => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
    return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation((returns) => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.remove(id);
  }
}
