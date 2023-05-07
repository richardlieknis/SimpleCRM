export class User {
  firstName!: string;
  lastName!: string;
  email!: string;
  birthDate!: string;
  street!: string;
  city!: string;
  zipCode!: number;
  id!: number;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName: '';
    this.lastName = obj ? obj.lastName: '';
    this.email = obj ? obj.email: '';
    this.birthDate = obj ? obj.birthDate: '';
    this.street = obj ? obj.street: '';
    this.city = obj ? obj.city: '';
    this.zipCode = obj ? obj.zipCode: '';
    this.id = obj ? obj.id: '';
  }


  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      city: this.city,
      zipCode: this.zipCode,
      id: this.id
    }
  }
}