import { GroupPost } from './SearchMyPost/SearchMyTeamPost';
import { DomReviewType, ReviewPost } from './SearchMyPost/SearchMyReviewPost';

export const changeGroupObjectToArray = (item: GroupPost): Array<string> => {
  return [
    'teamPage',
    item.leader_name,
    `${item.title}`,
    `[${item.applicant.length}]`,
    item.location,
    item.status,
    `${item.player_current_count}/${item.player_count}`,
    `${item.gk_current_count}/${item.gk_count}`,
    item.group_id,
  ];
};

export const changeMyApplicantObjectToArray = (
  item: GroupPost
): Array<string> => {
  return [
    'teamPage',
    item.leader_name,
    `${item.title}`,
    `[${item.applicant.length}]`,
    item.location,
    item.accept.length === 1 ? '수락됨' : '신청중',
    `${item.player_current_count}/${item.player_count}`,
    `${item.gk_current_count}/${item.gk_count}`,
    item.group_id,
  ];
};

export const changeReviewObjectToArray = (
  domInfo: DomReviewType,
  myReview: ReviewPost
): Array<string> => {
  return [
    'ground',
    myReview.user_name,
    myReview.contents,
    '',
    domInfo.title,
    domInfo.address.area,
    `${myReview.likedreviews.length}`,
    domInfo.dom_id,
  ];
};
