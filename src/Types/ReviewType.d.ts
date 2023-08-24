//data type
export interface ReviewDataType {
  user_name?: string;
  user_icon?: string;
  review_id?: string;
  contents?: string;
  createdAt?: string;
  likedreviews: string[];
  image: string;
}

//props type
export interface ReviewProps {
  dom_id: string;
  review: ReviewDataType[];
}

export interface ReviewItemPropsType {
  reviewItem: ReviewDataType;
  reviewData: ReviewDataType[];
  setReviewData: React.Dispatch<React.SetStateAction<ReviewDataType[]>>;
  domId: string;
  index: number;
}

export interface WriteReviewPropsType {
  setReviewData: React.Dispatch<React.SetStateAction<ReviewDataType[]>>;
  domId: String;
}
