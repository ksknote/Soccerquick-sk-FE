export interface DummyPostType {
  user_id: string;
  nick_name: string;
  profile: string;
  post_id: string;
  title: string;
  description: string;
  image: string[];
  notice: string;
  comments: CommentType[];
  createdAt: string;
}

export interface PostType {
  user_id: string;
  nick_name: string;
  profile: string;
  post_id: string;
  title: string;
  description: string;
  thumbnail: string;
  subject: string;
  hashTags: string[];
  notice: string;
  comments: CommentType[];
  createdAt: string;
}

export interface CommentType {
  comment_id: string;
  user_id: string;
  nick_name: string;
  post_id: string;
  content: string;
  createdAt: string;
  comments: ReplyType[];
}

export interface ReplyType {
  comment_id: string;
  user_id: string;
  nick_name: string;
  post_id: string;
  content: string;
  createdAt: string;
}
