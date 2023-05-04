export class User {
  firstName!: string;
  lastName!: string;
  birthDate!: number;
  street!: string;
  city!: string;
  zipCode!: number;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName: '';
    this.lastName = obj ? obj.lastName: '';
    this.birthDate = obj ? obj.birthDate: '';
    this.street = obj ? obj.street: '';
    this.city = obj ? obj.city: '';
    this.zipCode = obj ? obj.zipCode: '';
  }


  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      street: this.street,
      city: this.city,
      zipCode: this.zipCode
    }
  }
}