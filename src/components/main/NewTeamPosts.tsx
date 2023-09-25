import { useEffect, useState } from 'react';
import axios from 'axios';
import { TeamDataType } from '../../types/TeamPageType';
import { TeamRecruitContainer } from '../team/Styles/ViewsStyle';
import PostCard, { PostCardSkeleton } from '../team/feed/PostCard';
import styled from 'styled-components';
function NewTeamPosts() {
  const [postData, setPostData] = useState<TeamDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);

    const url = `${process.env.REACT_APP_API_URL}/groups`;
    const config = {
      withCredentials: true,
    };

    axios
      .get(url, config)
      .then((res) => {
        let newPosts = res.data.data;
        setPostData((prev) => [...prev, ...newPosts]);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (postData.length === 0 && !isLoading)
    return <Wrapper>게시글이 없습니다.</Wrapper>;

  return (
    <TeamRecruitContainer>
      {postData &&
        postData
          .slice(0, 4)
          .map((post: TeamDataType, index: number) => (
            <PostCard post={post} index={index} key={post.group_id} />
          ))}
      {isLoading &&
        Array.from({ length: 4 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
    </TeamRecruitContainer>
  );
}

export default NewTeamPosts;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: gray;
  padding-top: 10rem;
`;
