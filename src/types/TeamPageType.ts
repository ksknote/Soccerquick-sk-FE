export interface Applicant {
  id: string;
  name: string;
  phone_number: string;
  gender: string;
  position: string;
  level: string;
  contents: string;
  status: string;
}

export interface TeamDataType {
  group_id: string;
  title: string;
  leader: {
    leader_id: string;
    leader_name: string;
    leader_phone_number: string;
  };
  contents: string;
  region: string;
  city: string;
  status: string;
  gk_count: number;
  gk_current_count: number;
  player_count: number;
  player_current_count: number;
  recruitment_count: {
    gk_count: number;
    gk_current_count: number;
    player_count: number;
    player_current_count: number;
  };
  random_matched?: string;
  applicant: Applicant[];
  accept: Accept[];
  // [key: string]: string | number | undefined | Applicant[] | Accept[];
}

export interface DropdownList {
  option: string[];
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export type FilteringOptionType = {
  [key: string]: string | null;
};

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
  phone_number: string;
  position: string;
  level: string;
  gender: string;
  contents: string;
}

export interface AcceptedModalProps {
  setAcceptModal: React.Dispatch<React.SetStateAction<boolean>>;
  accept: Accept[];
  total: number;
  now: number;
}
