import { ValueObject } from '../../../../../core/entities/value-objects';

export type NotificationStatusValue = 'PENDING' | 'SENT' | 'FAILED';

interface NotificationStatusProps {
  value: NotificationStatusValue;
}

export class NotificationStatus extends ValueObject<NotificationStatusProps> {
  private constructor(props: NotificationStatusProps) {
    super(props);
  }

  static create(status: string): NotificationStatus {
    const normalized = status.trim().toUpperCase();

    if (!NotificationStatus.isValid(normalized)) {
      throw new Error('Invalid notification status');
    }

    return new NotificationStatus({
      value: normalized,
    });
  }

  static pending(): NotificationStatus {
    return new NotificationStatus({ value: 'PENDING' });
  }

  static sent(): NotificationStatus {
    return new NotificationStatus({ value: 'SENT' });
  }

  static failed(): NotificationStatus {
    return new NotificationStatus({ value: 'FAILED' });
  }

  get value(): NotificationStatusValue {
    return this.props.value;
  }

  isPending() {
    return this.props.value === 'PENDING';
  }

  isSent() {
    return this.props.value === 'SENT';
  }

  isFailed() {
    return this.props.value === 'FAILED';
  }

  toString() {
    return this.props.value;
  }

  private static isValid(status: string): status is NotificationStatusValue {
    return status === 'PENDING' || status === 'SENT' || status === 'FAILED';
  }
}
