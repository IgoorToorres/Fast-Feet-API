import { ValueObject } from '../../../../../core/entities/value-objects';

interface DeliveryPhotoProps {
  value: string;
}

export class DeliveryPhoto extends ValueObject<DeliveryPhotoProps> {
  private constructor(props: DeliveryPhotoProps) {
    super(props);
  }

  static create(value: string): DeliveryPhoto {
    const normalized = value.trim();

    if (!normalized) {
      throw new Error('Invalid delivery photo');
    }

    return new DeliveryPhoto({ value: normalized });
  }

  get value() {
    return this.props.value;
  }

  toString() {
    return this.props.value;
  }
}
