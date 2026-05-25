import { AggregateRoot } from '../../../../core/entities/aggregate-root';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { DeliveryPhoto } from './value-objects/delivery-photo';
import { PackageStatus } from './value-objects/package-status';

export interface PackageProps {
  code: string;
  description: string;
  recipientId: UniqueEntityID;
  deliveryPersonId?: UniqueEntityID | null;
  status: PackageStatus;
  deliveryPhoto?: DeliveryPhoto | null;
  availableForPickupAt?: Date | null;
  pickedUpAt?: Date | null;
  deliveredAt?: Date | null;
  returnedAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date;
}

export class Package extends AggregateRoot<PackageProps> {
  static create(props: PackageProps, id?: UniqueEntityID) {
    if (!Package.isFilled(props.code)) throw new Error('Invalid package code');
    if (!Package.isFilled(props.description))
      throw new Error('Invalid package description');

    const packageEntity = new Package(
      {
        ...props,
        code: props.code.trim(),
        description: props.description.trim(),
      },
      id,
    );

    if (!packageEntity.props.updatedAt) {
      packageEntity.props.updatedAt = new Date();
    }

    return packageEntity;
  }

  get code() {
    return this.props.code;
  }

  get description() {
    return this.props.description;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get deliveryPersonId() {
    return this.props.deliveryPersonId;
  }

  get status() {
    return this.props.status;
  }

  get deliveryPhoto() {
    return this.props.deliveryPhoto;
  }

  get availableForPickupAt() {
    return this.props.availableForPickupAt;
  }

  get pickedUpAt() {
    return this.props.pickedUpAt;
  }

  get deliveredAt() {
    return this.props.deliveredAt;
  }

  get returnedAt() {
    return this.props.returnedAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  markAsWaitingPickup() {
    if (!this.props.status.isCreated()) {
      throw new Error(
        'Package cannot be marked as waiting pickup from current status',
      );
    }

    this.props.status = PackageStatus.waitingPickup();
    this.props.availableForPickupAt = new Date();
    this.touch();
  }

  pickUp(deliveryPersonId: UniqueEntityID) {
    if (!this.canBePickedUp()) {
      throw new Error('Package is not available for pickup');
    }

    this.props.deliveryPersonId = deliveryPersonId;
    this.props.status = PackageStatus.pickedUp();
    this.props.pickedUpAt = new Date();
    this.touch();
  }

  markAsDelivered(
    deliveryPersonId: UniqueEntityID,
    deliveryPhoto: DeliveryPhoto,
  ) {
    if (!this.canBeDeliveredBy(deliveryPersonId)) {
      throw new Error(
        'Only the assigned delivery person can deliver this package',
      );
    }

    if (this.requiresDeliveryPhoto(deliveryPhoto)) {
      throw new Error('Delivery photo is required');
    }

    this.props.status = PackageStatus.delivered();
    this.props.deliveryPhoto = deliveryPhoto;
    this.props.deliveredAt = new Date();
    this.touch();
  }

  markAsReturned() {
    if (this.isDelivered()) {
      throw new Error('Delivered package cannot be returned');
    }

    this.props.status = PackageStatus.returned();
    this.props.returnedAt = new Date();
    this.touch();
  }

  assignDeliveryPerson(deliveryPersonId: UniqueEntityID) {
    this.props.deliveryPersonId = deliveryPersonId;
    this.touch();
  }

  removeDeliveryPerson() {
    this.props.deliveryPersonId = null;
    this.touch();
  }

  canBePickedUp() {
    return this.props.status.isWaitingPickup() && !this.props.pickedUpAt;
  }

  canBeDeliveredBy(deliveryPersonId: UniqueEntityID) {
    if (!this.props.status.isPickedUp()) return false;
    if (!this.props.deliveryPersonId) return false;

    return this.props.deliveryPersonId.equals(deliveryPersonId);
  }

  requiresDeliveryPhoto(deliveryPhoto?: DeliveryPhoto | null) {
    return !deliveryPhoto;
  }

  isDelivered() {
    return this.props.status.isDelivered();
  }

  isReturned() {
    return this.props.status.isReturned();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  private static isFilled(value: string) {
    return value.trim().length > 0;
  }
}
