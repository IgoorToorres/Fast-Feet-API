// src/domain/fast-feet/enterprise/entities/value-objects/user-role.ts
import { ValueObject } from '../../../../../core/entities/value-objects';

export type UserRoleValue = 'ADMIN' | 'DELIVERYMAN';

interface UserRoleProps {
  value: UserRoleValue;
}

export class UserRole extends ValueObject<UserRoleProps> {
  private constructor(props: UserRoleProps) {
    super(props);
  }

  static create(role: string): UserRole {
    const normalized = role.trim().toUpperCase();

    if (!UserRole.isValid(normalized)) {
      throw new Error('Invalid user role');
    }

    return new UserRole({ value: normalized });
  }

  static admin(): UserRole {
    return new UserRole({ value: 'ADMIN' });
  }

  static deliveryman(): UserRole {
    return new UserRole({ value: 'DELIVERYMAN' });
  }

  get value(): UserRoleValue {
    return this.props.value;
  }

  isAdmin(): boolean {
    return this.props.value === 'ADMIN';
  }

  isDeliveryman(): boolean {
    return this.props.value === 'DELIVERYMAN';
  }

  toString(): string {
    return this.props.value;
  }

  private static isValid(role: string): role is UserRoleValue {
    return role === 'ADMIN' || role === 'DELIVERYMAN';
  }
}
