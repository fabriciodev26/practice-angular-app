interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  editing?: boolean;
}

type IFilterType = 'All' | 'Completed' | 'No Completed';

export { IFilterType, ITodo };
