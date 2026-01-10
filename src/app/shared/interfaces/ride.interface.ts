export interface LocationInfo {
  label: string;
  id: string;
  type: 'PICK' | 'DROP';
}

export interface UserData{
  emp_id : string,
  rides ?: RideData[],
  trips ?: RideData[]
}

export interface RideData extends TripData {
    id : string;
}

export interface TripData {
  emp_id: string | null;
  vehicle_type: string | null;
  vehicle_no: string | null;
  capacity: number | null;
  time: string | null;
  pick_up: string | null;
  destination: string | null;
  passengers ?: UserData[]
}
