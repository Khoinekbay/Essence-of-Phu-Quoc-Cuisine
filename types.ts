
export interface Dish {
  id: string;
  name: string; // Vietnamese name
  englishName: string;
  description: string; // short
  story: string; // long cultural context
  price: number;
  imageUrl: string;
  category: 'Soup' | 'Rice' | 'Appetizer' | 'Coffee';
  region: 'North' | 'Central' | 'South';
  spicinessLevel: 0 | 1 | 2 | 3; // 0: none, 3: very spicy
  ingredients: string[];
}
