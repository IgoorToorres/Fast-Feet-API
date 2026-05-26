import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { CPF } from './value-objects/cpf';
import { UserRole } from './value-objects/user-role';

export interface UserProps {
  name: string;
  cpf: CPF;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: UniqueEntityID) {
    if (!User.isFilled(props.name)) throw new Error('Invalid user name');
    if (!User.isFilled(props.password)) throw new Error('Invalid user password');

    const user = new User(props, id);

    if (!user.props.createdAt) {
      user.props.createdAt = new Date();
    }

    if (!user.props.updatedAt) {
      user.props.updatedAt = new Date();
    }

    return user;
  }

  get name() {
    return this.props.name;
  }

  get password() {
    return this.props.password;
  }

  get cpf() {
    return this.props.cpf;
  }

  get role() {
    return this.props.role;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set name(name: string) {
    if (!User.isFilled(name)) throw new Error('Invalid user name');
    this.props.name = name;
    this.touch();
  }

  set password(password: string) {
    if (!User.isFilled(password)) throw new Error('Invalid user password');
    this.props.password = password;
    this.touch();
  }

  set role(role: UserRole) {
    this.props.role = role;
    this.touch();
  }

  changePassword(newPassword: string) {
    if (!User.isFilled(newPassword)) throw new Error('Invalid user password');
    this.props.password = newPassword;
    this.touch();
  }

  validatePassword(password: string) {
    return this.props.password === password;
  }

  isAdmin() {
    return this.props.role.isAdmin();
  }

  isDeliveryPerson() {
    return this.props.role.isDeliveryman();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  private static isFilled(value: string) {
    return value.trim().length > 0;
  }
}
