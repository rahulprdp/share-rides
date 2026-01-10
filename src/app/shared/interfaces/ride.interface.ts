export interface LocationInfo {
  label: string;
  id: string;
  type: 'PICK' | 'DROP';
}

export interface UserData extends Partial<PassengerInfo> {
  emp_id: string;
  rides?: RideData[];
  trips?: RideData[];
}

export interface RideData extends TripData {
  id: string;
}

export interface VehicleType {
  label: string;
  value: number;
}

export interface PassengerInfo {
  emp_id: string;
  time: string;
  pick_up?: LocationInfo;
  destination?: LocationInfo;
}

export interface TripData {
  emp_id: string;
  vehicle_type?: VehicleType;
  vehicle_no: string;
  capacity: number;
  time: string;
  pick_up?: LocationInfo;
  destination?: LocationInfo;
  passengers?: UserData[];
}
