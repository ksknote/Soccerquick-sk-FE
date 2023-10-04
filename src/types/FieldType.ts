export interface FieldDataType {
  [key: string]: string | number | boolean | [] | {};
  address: { area: string; fullAddress: string };
  ball: boolean;
  beverage: boolean;
  bibs: boolean;
  dom_id: string;
  lat: number;
  lng: number;
  parking: boolean;
  parking_fee: string;
  parking_free: boolean;
  partnership: boolean;
  shoes: boolean;
  shower: boolean;
  source: string;
  stadiums: {
    id: number;
    info: string;
    inout_door: string;
    inout_door_nm: string;
    name: string;
    size_x: number;
    size_y: number;
    stadium_type: string;
    stadium_type_nm: string;
    _id: string;
    images: {
      id: number;
      image: string;
    }[];
  }[];
  title: string;
  toilet: boolean;
  url: string;
  usersFavorites: [];
  wear: string;
  _id: number;
  reviews: [];
}
