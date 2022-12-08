export enum IotStatus {
  STAND_BY = 'stand_by',
  BIKE_ERROR = 'bike_error',
  MALFUNCTION = 'malfunction',
  RANGEOUT = 'range_out',
  DIRECTED = 'directed',
  REPORT = 'report',
}

export interface Iot {
  bike_id: string
  battery: string
  lat: string
  lng: string
  signal_strength: string
  led: string
  status: string
  point: Point
}

export interface Point {
  x: number
  y: number
}
