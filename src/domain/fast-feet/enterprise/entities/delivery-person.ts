import { AggregateRoot } from '../../../../core/entities/aggregate-root';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { CPF } from './value-objects/cpf';
import { CurrentLocation } from './value-objects/current-location';
import { DeliveryPersonStatus } from './value-objects/delivery-person-status';

export interface DeliveryPersonProps {
  userId: UniqueEntityID;
  name: string;
  cpf: CPF;
  currentLocation: CurrentLocation;
  status: DeliveryPersonStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export class DeliveryPerson extends AggregateRoot<DeliveryPersonProps> {
  static create(props: DeliveryPersonProps, id?: UniqueEntityID) {
    const deliveryPerson = new DeliveryPerson(props, id);

    if (!deliveryPerson.props.updatedAt) {
      deliveryPerson.props.updatedAt = new Date();
    }

    return deliveryPerson;
  }

  get userId() {
    return this.props.userId;
  }

  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get currentLocation() {
    return this.props.currentLocation;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  changeName(name: string) {
    this.props.name = name;
    this.touch();
  }

  changeCurrentLocation(currentLocation: CurrentLocation) {
    this.props.currentLocation = currentLocation;
    this.touch();
  }

  activate() {
    this.props.status = DeliveryPersonStatus.active();
    this.touch();
  }

  deactivate() {
    this.props.status = DeliveryPersonStatus.inactive();
    this.touch();
  }

  isActive() {
    return this.props.status.isActive();
  }

  isInactive() {
    return this.props.status.isInactive();
  }

  canPickUpPackage() {
    return this.isActive();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
