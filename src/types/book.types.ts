interface BookType {
  id: string;
  authorIds: string[];
  title: string;
  description: string;
  genre?: string;
  rating?: number;
}

export type {
  BookType
}