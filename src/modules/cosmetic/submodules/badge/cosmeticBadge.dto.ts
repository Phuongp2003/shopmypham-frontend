import type { BadgeType } from './cosmeticBadge.types';

export type CosmeticBadgeCreateReq = {
    badgeType: BadgeType;
    title: string;
    icon?: string;
    color?: string;
    isActive?: boolean;
    orderIndex?: number;
};

export type CosmeticBadgeUpdateReq = Partial<CosmeticBadgeCreateReq>;

export type CosmeticBadgeDto = {
    id: string;
    badgeType: BadgeType;
    title: string;
    icon?: string;
    color?: string;
    isActive: boolean;
    orderIndex: number;
    createdAt: Date;
    updatedAt: Date;
};
