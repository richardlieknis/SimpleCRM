export class Deal {
  fullName!: string;
  email!: string;
  dealSale!: number;
  dealName!: string;
  currentMonth!: string;
  currentYear!: number;

  constructor(obj?: any) {
    this.fullName = obj ? obj.fullName : '';
    this.email = obj ? obj.email : '';
    this.dealSale = obj ? obj.dealSale : '';
    this.dealName = obj ? obj.dealName : '';
    this.currentMonth = obj ? obj.currentMonth : this.getCurrentMonth();
    this.currentYear = obj ? obj.currentYear : new Date().getFullYear();
  }


  public toJSON() {
    return {
      fullName: this.fullName,
      email: this.email,
      dealSale: this.dealSale,
      dealName: this.dealName,
      currentMonth: this.currentMonth,
      currentYear: this.currentYear,
    }
  }

  getCurrentMonth() {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let currentMonth = new Date().getMonth();
    return (months[currentMonth]);
  }
}