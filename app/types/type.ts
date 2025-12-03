export interface Categories {
  id: string;
  slug: string;
  titre: string;
  description: string ;
  image: string ;
  articles?: Articles[];
  createdAt: Date;
  updatedAt: Date;
}


export interface Articles {
  id: string;
  titre: string;
  slug: string;
  description: string ;
  readTime: string ;
  imageUrl: string ;
  vues: number;
  tags: string;
  contenus: string ;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};
