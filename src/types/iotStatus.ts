export enum IotStatus {
  STAND_BY = 'stand_by',
  BIKE_ERROR = 'bike_error',
  MALFUNCTION = 'malfunction',
  RANGEOUT = 'range_out',
  DIRECTED = 'directed',
  REPORT = 'report',
  IN_USE = 'in-use',
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
  is_locked: string
}

export interface Point {
  x: number
  y: number
}
