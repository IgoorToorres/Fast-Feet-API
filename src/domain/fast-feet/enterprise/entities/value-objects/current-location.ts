import { ValueObject } from '../../../../../core/entities/value-objects';

interface CurrentLocationProps {
  latitude: number;
  longitude: number;
}

export class CurrentLocation extends ValueObject<CurrentLocationProps> {
  private constructor(props: CurrentLocationProps) {
    super(props);
  }

  static create(latitude: number, longitude: number): CurrentLocation {
    if (!CurrentLocation.isValidLatitude(latitude)) {
      throw new Error('Invalid latitude');
    }

    if (!CurrentLocation.isValidLongitude(longitude)) {
      throw new Error('Invalid longitude');
    }

    return new CurrentLocation({ latitude, longitude });
  }

  get latitude(): number {
    return this.props.latitude;
  }

  get longitude(): number {
    return this.props.longitude;
  }

  toString(): string {
    return `${this.props.latitude},${this.props.longitude}`;
  }

  private static isValidLatitude(latitude: number): boolean {
    return Number.isFinite(latitude) && latitude >= -90 && latitude <= 90;
  }

  private static isValidLongitude(longitude: number): boolean {
    return Number.isFinite(longitude) && longitude >= -180 && longitude <= 180;
  }
}
