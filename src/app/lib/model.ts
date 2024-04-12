// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
/**
 * EXAMPLE:
 * export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
 */

export type User = {
    user_id: string;
    username: string;
    email: string;
    password: string;
}

export type Post = {
    id: string;
    user_id: string;
    title: string;
    image: string;
    content: string
    createdAt: Date;
    upvotes: number;
    comments: Comment[]
}

export type Comment = {

    user_id: string;
    postId: string;
    content: string;
    createdAt: Date;
}

export type Upvote = {
    userId: string;
    postId: string;
    createdAt: Date;
}

