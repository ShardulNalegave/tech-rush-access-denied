
export interface IUser {
  id: number,
  name: string,
  email: string,
  bio: string,
  about: string,
  follower_count: number,
  following_count: number,
}

export interface IPost {
  id: number,
  caption: string,
  likes: number,
  posted_by: number,
  created_at: Date,
}

export interface ISearchPost {
  id: number,
  caption: string,
  posted_by: number,
}

export interface IComment {
  id: number,
  post_id: number,
  user_id: number,
  content: string,
}