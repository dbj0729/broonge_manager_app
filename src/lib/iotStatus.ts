import {IotStatus} from '../types/iotStatus';
import standBy from '../assets/stand_by.png';
import malfuntion from '../assets/malfuntion.png';
import bike_error from '../assets/bike_error.png';
import rangeout from '../assets/range_out.png';
import directed from '../assets/directed.png';
import report from '../assets/reported.png';

export const iotStatusStyle: any = {
  [IotStatus.STAND_BY]: {style: 'bg-green-400', marker: standBy},
  [IotStatus.BIKE_ERROR]: {style: 'bg-orange-400', marker: bike_error},
  [IotStatus.DIRECTED]: {style: 'bg-purple-600', marker: directed},
  [IotStatus.REPORT]: {style: 'bg-yellow-300', marker: report},
  [IotStatus.RANGEOUT]: {style: 'bg-gray-300', marker: rangeout},
  [IotStatus.MALFUNCTION]: {style: 'bg-blue-400', marker: malfuntion},
};
