export type CosmeticBadge = {
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

export type BadgeType =
    | 'MADE_IN'
    | 'QUALITY'
    | 'SHIPPING'
    | 'RETURN_POLICY'
    | 'WARRANTY'
    | 'CERTIFICATION';
