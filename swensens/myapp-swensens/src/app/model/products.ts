export interface Products {
  message: string;
  data: Datum[];
}

export interface Datum {
  id: number;
  nameProducts: string;
  priceProducts: string;
  imageProducts?: any;
  category: string;
  descriptionProducts: string;
}