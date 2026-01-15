export interface Vacancy {
  id: number;
  profession: string;
  firm_name: string;
  payment_from: number;
  payment_to: number;
  currency: string;
  type_of_work: string;
  vacancyRichText: string;
  town: string;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: number;
  vacancyId: number;
  vacancy: Vacancy;
  createdAt: string;
  updatedAt: string;
}

export interface VacancyFilters {
  keyword?: string;
  payment_from?: number;
  payment_to?: number;
  catalogues?: string;
}

export interface VacancyCardProps {
  vacancy: Vacancy;
  onFavoriteClick?: (vacancyId: number) => void;
  isFavorite?: boolean;
}