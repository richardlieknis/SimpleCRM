export class Deal {
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  dealSale!: number;

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.firstName = obj ? obj.firstName : '';
    this.email = obj ? obj.email : '';
    this.lastName = obj ? obj.lastName : '';
    this.dealSale = obj ? obj.dealSale : '';
  }


  public toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      dealSale: this.dealSale,
    }
  }
}