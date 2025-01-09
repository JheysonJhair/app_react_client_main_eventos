export interface User  {
  UserId?: number;
  FirstName: string;
  LastName: string;
  UserType: boolean;
  Email?: string;
  Phone?: string;
  Barcode?: string;
  Fingerprint?: string; 
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}