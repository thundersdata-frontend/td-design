export type Route = {
  key: string;
  icon?: string;
  title?: string;
};

export type Scene<T extends Route> = {
  route: T;
};

export type NavigationState<T extends Route> = {
  index: number;
  routes: T[];
};
