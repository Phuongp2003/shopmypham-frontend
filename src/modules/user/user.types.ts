import type { Post } from "@/modules/post/post.types";
import type { Comment } from "@/modules/comment/comment.types";
import type { Order } from "@/modules/order/order.types";
import type { Cart } from "@/modules/cart/cart.types";

export type User = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: string;
  googleId: string | null;
  secretKey: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  comments: Comment[];
  orders: Order[];
  cart: Cart | null;
}
