export class User {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  birthDate!: string;
  street!: string;
  city!: string;
  zipCode!: number;
  phoneNumber!: number;
  deals!: number;
  dealSales!: number;
  photoURL!: string;

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.city = obj ? obj.city : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.phoneNumber = obj ? obj.phoneNumber : '';
    this.deals = obj ? obj.deals : 0;
    this.dealSales = obj ? obj.dealSales : 0;
    this.photoURL = obj ? obj.photoURL : '';
  }


  public toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      city: this.city,
      zipCode: this.zipCode,
      phoneNumber: this.phoneNumber,
      deals: this.deals,
      dealSales: this.dealSales,
      photoURL: this.photoURL,
    }
  }
}