import { AggregateRoot } from '../../../../core/entities/aggregate-root';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { PackageStatus } from './value-objects/package-status';
import { NotificationStatus } from './value-objects/notification-status';

export interface NotificationProps {
  packageId: UniqueEntityID;
  recipientId: UniqueEntityID;
  type: string;
  message: string;
  status: NotificationStatus;
  sentAt?: Date | null;
  createdAt?: Date;
}

export class Notification extends AggregateRoot<NotificationProps> {
  static create(props: NotificationProps, id?: UniqueEntityID) {
    if (!Notification.isFilled(props.type)) {
      throw new Error('Invalid notification type');
    }

    if (!Notification.isFilled(props.message)) {
      throw new Error('Invalid notification message');
    }

    const notification = new Notification(
      {
        ...props,
        type: props.type.trim(),
        message: props.message.trim(),
      },
      id,
    );

    if (!notification.props.createdAt) {
      notification.props.createdAt = new Date();
    }

    return notification;
  }

  get packageId() {
    return this.props.packageId;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get type() {
    return this.props.type;
  }

  get message() {
    return this.props.message;
  }

  get status() {
    return this.props.status;
  }

  get sentAt() {
    return this.props.sentAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  markAsSent() {
    this.props.status = NotificationStatus.sent();
    this.props.sentAt = new Date();
  }

  markAsFailed() {
    this.props.status = NotificationStatus.failed();
  }

  generateMessageByStatus(packageStatus: PackageStatus) {
    const status = packageStatus.value;

    switch (status) {
      case 'CREATED':
        this.props.message = 'Sua encomenda foi criada.';
        break;
      case 'WAITING_PICKUP':
        this.props.message = 'Sua encomenda esta aguardando retirada.';
        break;
      case 'PICKED_UP':
        this.props.message = 'Sua encomenda foi retirada pelo entregador.';
        break;
      case 'DELIVERED':
        this.props.message = 'Sua encomenda foi entregue.';
        break;
      case 'RETURNED':
        this.props.message = 'Sua encomenda foi devolvida.';
        break;
      default:
        this.props.message = 'Sua encomenda teve o status atualizado.';
    }
  }

  private static isFilled(value: string) {
    return value.trim().length > 0;
  }
}
