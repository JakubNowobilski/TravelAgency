export class Trip{
  key: string;
  name: string;
  country: string;
  dateStart: Date;
  dateEnd: Date;
  price: number;
  maxPlaces: number;
  bookedPlaces: number;
  description: string;
  imgURL: string;

  constructor(key: string, name: string, country: string, dateStart: Date, dateEnd: Date, price: number, maxPlaces: number,
              description: string, imgURL: string){
    this.key = key;
    this.name = name;
    this.country = country;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.price = price;
    this.maxPlaces = maxPlaces;
    this.bookedPlaces = 0;
    this.description = description;
    this.imgURL = imgURL;
  }
}
