export interface Drug {
  id: string;
  name: string;
  latin_name: string;
  active_substance: string;
  category: string;
  form: string;
  dosage: string;
  manufacturer: string;
  prescription_required: boolean;
  description: string;
  stock: number;
}

// Строка корзины: сам препарат + количество упаковок
export interface CartLine {
  drug: Drug;
  quantity: number;
}
