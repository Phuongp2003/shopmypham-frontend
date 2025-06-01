export function statusColor(status: string) {
    switch (status) {
        case 'PENDING':
        case 'COD':
            return 'neutral';
        case 'PROCESSING':
        case 'CASH':
            return 'info';
        case 'SHIPPED':
        case 'BANK':
            return 'warning';
        case 'DELIVERED':
        case 'MOMO':
        case 'COMPLETED':
            return 'success';
        case 'CANCELLED':
        case 'FAILED':
            return 'error';
        default:
            return 'neutral';
    }
}
