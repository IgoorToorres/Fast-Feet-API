import { ValueObject } from '../../../../../core/entities/value-objects';

interface AddressProps {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export class Address extends ValueObject<AddressProps> {
  private constructor(props: AddressProps) {
    super(props);
  }

  static create(props: AddressProps): Address {
    if (!Address.isFilled(props.street)) throw new Error('Invalid street');
    if (!Address.isFilled(props.number)) throw new Error('Invalid number');
    if (!Address.isFilled(props.neighborhood))
      throw new Error('Invalid neighborhood');
    if (!Address.isFilled(props.city)) throw new Error('Invalid city');
    if (!Address.isFilled(props.state)) throw new Error('Invalid state');
    if (!Address.isFilled(props.zipCode)) throw new Error('Invalid zip code');

    if (!Address.isValidLatitude(props.latitude))
      throw new Error('Invalid latitude');
    if (!Address.isValidLongitude(props.longitude))
      throw new Error('Invalid longitude');

    return new Address({
      ...props,
      street: props.street.trim(),
      number: props.number.trim(),
      complement: props.complement?.trim(),
      neighborhood: props.neighborhood.trim(),
      city: props.city.trim(),
      state: props.state.trim().toUpperCase(),
      zipCode: props.zipCode.trim(),
    });
  }

  get street() {
    return this.props.street;
  }

  get number() {
    return this.props.number;
  }

  get complement() {
    return this.props.complement;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get city() {
    return this.props.city;
  }

  get state() {
    return this.props.state;
  }

  get zipCode() {
    return this.props.zipCode;
  }

  get latitude() {
    return this.props.latitude;
  }

  get longitude() {
    return this.props.longitude;
  }

  isComplete() {
    return (
      Address.isFilled(this.props.street) &&
      Address.isFilled(this.props.number) &&
      Address.isFilled(this.props.neighborhood) &&
      Address.isFilled(this.props.city) &&
      Address.isFilled(this.props.state) &&
      Address.isFilled(this.props.zipCode) &&
      Address.isValidLatitude(this.props.latitude) &&
      Address.isValidLongitude(this.props.longitude)
    );
  }

  private static isFilled(value: string): boolean {
    return value.trim().length > 0;
  }

  private static isValidLatitude(latitude: number): boolean {
    return Number.isFinite(latitude) && latitude >= -90 && latitude <= 90;
  }

  private static isValidLongitude(longitude: number): boolean {
    return Number.isFinite(longitude) && longitude >= -180 && longitude <= 180;
  }
}
