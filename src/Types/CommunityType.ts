export interface PostWithCommentsType {
  post: PostType;
  comments: CommentwithRepliesType[];
}

export interface PostType {
  user_id: string; //ObjectId
  userId: string;
  nick_name: string;
  profile: string;
  post_id: string;
  title: string;
  description: string;
  thumbnail: string;
  subject: string;
  hashTags: string[];
  notice: string;
  like: Array<string>;
  comments: CommentType[];
  createdAt: string;
}

export interface CommentwithRepliesType {
  comment: CommentType;
  replies: ReplyType[];
}

export interface CommentType {
  comment_id: string;
  user_id: string; //ObjectId
  userId: string;
  profile: string;
  nick_name: string;
  post_id: string;
  content: string;
  image: string;
  reply: ReplyType[];
  createdAt: string;
}

export interface ReplyType {
  reply_id: string;
  profile: string;
  user_id: string;
  userId: string;
  nick_name: string;
  post_id: string;
  content: string;
  image: string;
  comment_id: string;
  createdAt: string;
}
