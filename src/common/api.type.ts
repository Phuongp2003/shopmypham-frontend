export interface ApiResponse<T> {
    data: T;
    message: string;
    code: number;
}

export interface ApiResponseV2 {
    message?: string;
    statusCode: number;
}

export interface Paginated {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface QueryParams {
    page?: number;
    limit?: number;
    sortOrder?: 'asc' | 'desc';
    search?: string;
}

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}
