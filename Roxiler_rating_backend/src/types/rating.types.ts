export interface CreateOrUpdateRatingDTO {
  storeId: number;
  value: number; //  1–5
}

export interface RatingFilters {
  userId?: number;
  storeId?: number;
}
