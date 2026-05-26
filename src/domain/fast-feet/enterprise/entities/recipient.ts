import { AggregateRoot } from '../../../../core/entities/aggregate-root';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { Address } from './value-objects/address';

export interface RecipientProps {
  name: string;
  document: string;
  email: string;
  phone: string;
  address: Address;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Recipient extends AggregateRoot<RecipientProps> {
  static create(props: RecipientProps, id?: UniqueEntityID) {
    if (!Recipient.isFilled(props.name))
      throw new Error('Invalid recipient name');
    if (!Recipient.isFilled(props.document))
      throw new Error('Invalid recipient document');
    if (!Recipient.isValidEmail(props.email))
      throw new Error('Invalid recipient email');
    if (!Recipient.isFilled(props.phone))
      throw new Error('Invalid recipient phone');

    const recipient = new Recipient(
      {
        ...props,
        name: props.name.trim(),
        document: props.document.trim(),
        email: props.email.trim().toLowerCase(),
        phone: props.phone.trim(),
      },
      id,
    );

    if (!recipient.props.createdAt) {
      recipient.props.createdAt = new Date();
    }

    if (!recipient.props.updatedAt) {
      recipient.props.updatedAt = new Date();
    }

    return recipient;
  }

  get name() {
    return this.props.name;
  }

  get document() {
    return this.props.document;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }

  get address() {
    return this.props.address;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  changeAddress(newAddress: Address) {
    this.props.address = newAddress;
    this.touch();
  }

  changeContact(email: string, phone: string) {
    if (!Recipient.isValidEmail(email))
      throw new Error('Invalid recipient email');
    if (!Recipient.isFilled(phone)) throw new Error('Invalid recipient phone');

    this.props.email = email.trim().toLowerCase();
    this.props.phone = phone.trim();
    this.touch();
  }

  hasValidAddress() {
    return this.props.address.isComplete();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  private static isFilled(value: string) {
    return value.trim().length > 0;
  }

  private static isValidEmail(email: string) {
    const normalized = email.trim();
    return normalized.length > 3 && normalized.includes('@');
  }
}
