import type { RouteObject } from 'react-router-dom';
import type { ItemType } from 'antd/es/menu/hooks/useItems';

export type AccessType =
  | (() => boolean | Promise<boolean>)
  | boolean
  | Promise<boolean>
  | undefined;

export type MetaType = {
  title?: string;
  access?: AccessType;
  menu?: ItemType;
};

type RouteObjectType = Omit<RouteObject, 'children'>;

export type RoutesType = RouteObjectType & {
  meta?: MetaType;
  children?: RoutesType[];
};
