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
    user_id: number;
    username: string;
    email: string;
    password: string;
}

export type Post = {

    user_id: string;
    title: string;
    image: string;
    createdAt: Date;
    upvotes: number;
    comments: Comment[]
}

export type Comment = {

    user_id: string;
    userId: string;
    postId: string;
    content: string;
    createdAt: Date;
}

export type Upvote = {
    userId: string;
    postId: string;
    createdAt: Date;
}

