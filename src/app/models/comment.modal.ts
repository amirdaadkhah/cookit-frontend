export interface RecipeComment {
  id: string;
  recipeId: string;
  userName: string;
  userAvatar?: string | null;
  comment: string;
  createdAt: string;
}

export interface RecipeComment {
  id: string;
  recipeId: string;
  userId?: string;
  userName: string;
  userAvatar?: string | null;
  comment: string;
  parentCommentId?: string | null;
  createdAt: string;
}