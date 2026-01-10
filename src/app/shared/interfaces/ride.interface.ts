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

export interface VehicleType {label : string, value : string}

export interface TripData {
  emp_id: string;
  vehicle_type: {
    label : string,
    value : string
  };
  vehicle_no: string;
  capacity: number;
  time: string;
  pick_up?: LocationInfo;
  destination?: LocationInfo;
  passengers ?: UserData[];
}
