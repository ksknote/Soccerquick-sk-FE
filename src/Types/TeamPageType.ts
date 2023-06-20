export interface Applicant {
  id: string;
  position: string;
  level: string;
  contents: string;
}

export interface DataProps {
  group_id?: string;
  area: string;
  author: string;
  body: string;
  gender: string;
  num: number;
  position?: string;
  skill?: string;
  status: string;
  title: string;
  gk: number;
  gkNeed: number;
  player: number;
  playerNeed: number;
  location: string;
  gk_count: number;
  gk_current_count: number;
  player_count: number;
  player_current_count: number;
  random_matched?: string;
  applicant?: Applicant[];
  [key: string]: string | number | undefined | Applicant[];
}

// export interface filteredData {
//   group_id?: string;
//   area: string;
//   author: string;
//   body: string;
//   gender: string;
//   num: number;
//   position?: string;
//   skill?: string;
//   status: string;
//   title: string;
//   gk: number;
//   gkNeed: number;
//   player: number;
//   playerNeed: number;
//   location: string;
//   gk_count: number;
//   gk_current_count: number;
//   player_count: number;
//   player_current_count: number;
//   random_matched?: string;
//   applicant?: Applicant[];
//   [key: string]: string | number | undefined | Applicant[];
// }

export interface FindMemberFilter {
  status: string | null;
  area: string | null;
}
export interface DropdownList {
  option: string[];
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export interface BoardProps {
  dropdownList: DropdownList[];
  handleReset: () => void;
  filteredData: DataProps[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentData: DataProps[];
  // setCurrentData: React.Dispatch<React.SetStateAction<DataProps[]>>;
  totalPage: number;
}

export interface FindPageProps {
  findingTeam: boolean;
  findingMember: boolean;
  setFindingMember: React.Dispatch<React.SetStateAction<boolean>>;
  setFindingTeam: React.Dispatch<React.SetStateAction<boolean>>;
}

// Components

export interface FindingMemberProps {
  gk: number;
  gkNeed: number;
  player: number;
  playerNeed: number;
  setPlayer: React.Dispatch<React.SetStateAction<number>>;
  setGk: React.Dispatch<React.SetStateAction<number>>;
  setPlayerNeed: React.Dispatch<React.SetStateAction<number>>;
  setGkNeed: React.Dispatch<React.SetStateAction<number>>;
}

export interface SumbitModalProps {
  groupId: string | undefined;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SubmitApplicant {
  _id?: string;
  id: string;
  name: string;
  gender: string;
  position: string;
  level: string;
  contents: string;
}

export interface CommentProps {
  data: SubmitApplicant[];
  user: string;
}

export interface Accept {
  name: string;
  position: string;
  level: string;
  contents: string;
}

export interface AcceptedModalProps {
  setAcceptModal: React.Dispatch<React.SetStateAction<boolean>>;
  accept: Accept[];
  total: number;
  now: number;
}
