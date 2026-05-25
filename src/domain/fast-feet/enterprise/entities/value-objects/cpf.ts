// src/domain/fast-feet/enterprise/entities/value-objects/cpf.ts
import { ValueObject } from '../../../../../core/entities/value-objects';

interface CPFProps {
  value: string;
}

export class CPF extends ValueObject<CPFProps> {
  private constructor(props: CPFProps) {
    super(props);
  }

  static create(raw: string): CPF {
    const normalized = CPF.normalize(raw);

    if (!CPF.isValid(normalized)) {
      throw new Error('Invalid CPF');
    }

    return new CPF({ value: normalized });
  }

  get value(): string {
    return this.props.value;
  }

  toString(): string {
    return this.props.value;
  }

  private static normalize(value: string): string {
    return value.replace(/\D/g, '');
  }

  private static isValid(cpf: string): boolean {
    if (!/^\d{11}$/.test(cpf)) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const digits = cpf.split('').map(Number);

    const calcDigit = (length: number): number => {
      const sum = digits
        .slice(0, length)
        .reduce((acc, digit, index) => acc + digit * (length + 1 - index), 0);

      const mod = (sum * 10) % 11;
      return mod === 10 ? 0 : mod;
    };

    const d1 = calcDigit(9);
    const d2 = calcDigit(10);

    return d1 === digits[9] && d2 === digits[10];
  }
}
