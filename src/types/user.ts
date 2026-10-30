export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  locale: 'tr' | 'en';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  wishlist: string[];
  addresses: Address[];
  orders: string[];
  notifications: NotificationPreferences;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  newsletter: boolean;
  promotions: boolean;
  orderUpdates: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
