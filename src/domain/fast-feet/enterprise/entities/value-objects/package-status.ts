import { ValueObject } from '../../../../../core/entities/value-objects';

export type PackageStatusValue =
  | 'CREATED'
  | 'WAITING_PICKUP'
  | 'PICKED_UP'
  | 'DELIVERED'
  | 'RETURNED';

interface PackageStatusProps {
  value: PackageStatusValue;
}

export class PackageStatus extends ValueObject<PackageStatusProps> {
  private constructor(props: PackageStatusProps) {
    super(props);
  }

  static create(status: string): PackageStatus {
    const normalized = status.trim().toUpperCase();

    if (!PackageStatus.isValid(normalized)) {
      throw new Error('Invalid package status');
    }

    return new PackageStatus({ value: normalized });
  }

  static created(): PackageStatus {
    return new PackageStatus({ value: 'CREATED' });
  }

  static waitingPickup(): PackageStatus {
    return new PackageStatus({ value: 'WAITING_PICKUP' });
  }

  static pickedUp(): PackageStatus {
    return new PackageStatus({ value: 'PICKED_UP' });
  }

  static delivered(): PackageStatus {
    return new PackageStatus({ value: 'DELIVERED' });
  }

  static returned(): PackageStatus {
    return new PackageStatus({ value: 'RETURNED' });
  }

  get value() {
    return this.props.value;
  }

  isCreated() {
    return this.props.value === 'CREATED';
  }

  isWaitingPickup() {
    return this.props.value === 'WAITING_PICKUP';
  }

  isPickedUp() {
    return this.props.value === 'PICKED_UP';
  }

  isDelivered() {
    return this.props.value === 'DELIVERED';
  }

  isReturned() {
    return this.props.value === 'RETURNED';
  }

  toString() {
    return this.props.value;
  }

  private static isValid(status: string): status is PackageStatusValue {
    return (
      status === 'CREATED' ||
      status === 'WAITING_PICKUP' ||
      status === 'PICKED_UP' ||
      status === 'DELIVERED' ||
      status === 'RETURNED'
    );
  }
}
