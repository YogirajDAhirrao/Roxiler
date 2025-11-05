export interface CreateStoreDTO {
  name: string;
  email?: string;
  address?: string;
  ownerId?: number;
}

export interface UpdateStoreDTO {
  name?: string;
  email?: string;
  address?: string;
}

export interface StoreFilters {
  name?: string;
  address?: string;
  ownerId?: number;
}