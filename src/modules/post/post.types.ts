import type { User } from "@/modules/user/user.types";
import type { Comment } from "@/modules/comment/comment.types";

export type PostResponse = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
};


export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: Pick<User, 'id' | 'name' | 'email'>;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
};
