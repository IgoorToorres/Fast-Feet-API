import { ValueObject } from '../../../../../core/entities/value-objects';

export type DeliveryPersonStatusValue = 'ACTIVE' | 'INACTIVE';

interface DeliveryPersonStatusProps {
  value: DeliveryPersonStatusValue;
}

export class DeliveryPersonStatus extends ValueObject<DeliveryPersonStatusProps> {
  private constructor(props: DeliveryPersonStatusProps) {
    super(props);
  }

  static create(status: string): DeliveryPersonStatus {
    const normalized = status.trim().toUpperCase();

    if (!DeliveryPersonStatus.isValid(normalized)) {
      throw new Error('Invalid delivery person status');
    }

    return new DeliveryPersonStatus({
      value: normalized,
    });
  }

  static active(): DeliveryPersonStatus {
    return new DeliveryPersonStatus({ value: 'ACTIVE' });
  }

  static inactive(): DeliveryPersonStatus {
    return new DeliveryPersonStatus({ value: 'INACTIVE' });
  }

  get value(): DeliveryPersonStatusValue {
    return this.props.value;
  }

  isActive(): boolean {
    return this.props.value === 'ACTIVE';
  }

  isInactive(): boolean {
    return this.props.value === 'INACTIVE';
  }

  toString(): string {
    return this.props.value;
  }

  private static isValid(status: string): status is DeliveryPersonStatusValue {
    return status === 'ACTIVE' || status === 'INACTIVE';
  }
}
