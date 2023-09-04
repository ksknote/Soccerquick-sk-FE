export interface UserData {
  admin_id?: string;
  user_id: string;
  name: string;
  nick_name: string;
  email: string;
  phone_number: string;
  role: string;
  gender: string;
  createdAt: string;
  login_banned: boolean;
  login_banEndDate: string | null;
  community_banned: boolean;
  community_banEndDate: string | null;
}

export interface DedatilModalProps {
  showManagementModal: boolean;
  setShowManagementModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: UserData;
}
