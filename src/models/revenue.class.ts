export class Revenue {
  january!: number;
  february!: number;
  march!: number;
  april!: number;
  may!: number;
  june!: number;
  july!: number;
  august!: number;
  september!: number;
  october!: number;
  november!: number;
  december!: number;

  constructor(obj?: any) {
    this.january = obj ? obj.january : 0;
    this.february = obj ? obj.february : 0;
    this.march = obj ? obj.march : 0;
    this.april = obj ? obj.april : 0;
    this.may = obj ? obj.may : 0;
    this.june = obj ? obj.june : 0;
    this.july = obj ? obj.july : 0;
    this.august = obj ? obj.august : 0;
    this.september = obj ? obj.september : 0;
    this.october = obj ? obj.october : 0;
    this.november = obj ? obj.november : 0;
    this.december = obj ? obj.december : 0;
  }

  public toJSON() {
    return {
      january: this.january,
      february: this.february,
      march: this.march,
      april: this.april,
      may: this.may,
      june: this.june,
      july: this.july,
      august: this.august,
      september: this.september,
      october: this.october,
      november: this.november,
      december: this.december
    }
  }
}