interface AuthorType {
  id: string;
  fullName: string;
  penName: string;
  genres?: string[];
  averageRating?: number;
}

export type {
  AuthorType
}