import { LocationInfo, VehicleType } from "../interfaces/ride.interface";

export const VEHICLE_TYPES : VehicleType[] = [
  {
    label: 'Motor Cycle',
    value: 1,
  },
  {
    label: 'Car Sedan',
    value: 2,
  },
  {
    label: 'Car Hatchback',
    value: 3,
  },
  {
    label: 'Car SUV',
    value: 4,
  },
  {
    label: 'Car MPV',
    value: 5,
  },
];


export const LOCATIONS : LocationInfo[] = [{
  label : 'Embassy Marathalli',
  id : crypto.randomUUID(),
  type : 'PICK'
},{
  label : 'Indiranagar Metro',
  id : crypto.randomUUID(),
  type : 'DROP'
},{
  label : 'Whitefield ITPL',
  id : crypto.randomUUID(),
  type : 'PICK'
},{
  label : 'KR Puram Metro',
  id : crypto.randomUUID(),
  type : 'DROP'
},
]