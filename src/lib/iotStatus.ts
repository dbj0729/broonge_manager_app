import { IotStatus } from '../types/iotStatus'
import standBy from '../assets/stand_by.png'
import malfuntion from '../assets/malfuntion.png'
import bike_error from '../assets/bike_error.png'
import rangeout from '../assets/range_out.png'
import directed from '../assets/directed.png'
import report from '../assets/reported.png'
import home from '../assets/home.png'

export const iotStatusStyle: any = {
  [IotStatus.STAND_BY]: {
    style: 'bg-green-500',
    status: '대기',
    marker: standBy,
  },
  [IotStatus.IN_USE]: {
    style: 'bg-black',
    status: '사용',
    marker: home,
  },
  [IotStatus.BIKE_ERROR]: {
    style: 'bg-orange-400',
    status: '에러',
    marker: bike_error,
  },
  [IotStatus.DIRECTED]: {
    style: 'bg-purple-600',
    status: '지시',
    marker: directed,
  },
  [IotStatus.REPORT]: { style: 'bg-yellow-300', status: '신고', marker: report },
  [IotStatus.RANGEOUT]: {
    style: 'bg-gray-300',
    status: '이탈',
    marker: rangeout,
  },
  [IotStatus.MALFUNCTION]: {
    style: 'bg-red-400',
    status: '고장',
    marker: malfuntion,
  },
}
