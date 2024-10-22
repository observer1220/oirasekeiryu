interface SelectOptionType {
  key: string | number;
  label: string;
  value: string | number;
}

interface GetTodayProps {
  end?: boolean;
}

interface Cabin {
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: any;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

interface CabinAPI {
  created_at?: string | undefined;
  description?: string | undefined;
  discount?: number | undefined;
  id?: number | undefined;
  image?: any;
  maxCapacity?: number | undefined;
  name?: string | undefined;
  regularPrice?: number | undefined;
}
