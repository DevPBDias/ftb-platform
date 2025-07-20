// ...existing code...
export interface TeamData {
  id: string;
  teamName: string;
  logo?: string;
  image?: string;
  founded?: string | number;
  description?: string;
  location?: string; //
  stats?: {
    players?: number;
    victories?: number;
    founded?: number;
  };
  championships?: Array<{
    id: number;
    name: string;
    years?: number[];
    quantity: number;
    category: string;
  }>;
  admins?: Array<{
    name: string;
    role: string;
    image?: string;
  }>;
  contact?: string;
}
