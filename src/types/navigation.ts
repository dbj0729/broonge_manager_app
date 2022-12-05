import {StackScreenProps} from '@react-navigation/stack';

export type AppStackParamList = {
  Map: undefined;
  Root: undefined;
};

export type AppStackProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>;

export type RootTabParamList = {
  Home: undefined;
  Favorite: undefined;
  Map: undefined | {type: string; coord: {latitude: number; longitude: number}};
  Point: undefined;
  My: undefined;
  Test: undefined;
  ActionCenter: undefined;
};
