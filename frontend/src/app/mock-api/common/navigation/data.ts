/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/dashboard'
    },
    {
        id   : 'transaction',
        title: 'Transaction',
        type : 'collapsable',
        icon : 'heroicons_outline:chart-pie',
        link : '/transaction',
        children: [
            {
                id   : 'transaction.sales',
                title: 'Sales',
                type : 'basic',
                link : '/transaction/sales'
            },
            {
                id   : 'transaction.sales',
                title: 'Customers',
                type : 'collapsable',
                link : '/transaction/sales',
                children: [
                    {
                        id   : 'transaction.sales',
                        title: 'Members',
                        type : 'basic',
                        link : '/transaction/sales'
                    },
                    {
                        id   : 'transaction.sales',
                        title: 'History',
                        type : 'basic',
                        link : '/transaction/sales'
                    }
                ]
            },
            {
                id   : 'transaction.sales',
                title: 'Employee',
                type : 'basic',
                link : '/transaction/sales'
            }
        ]
    },
    {
        id   : 'example',
        title: 'Branches',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example',
    },
    {
        id   : 'example',
        title: 'Franchise',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example',
    },
    {
        id   : 'example',
        title: 'User Management',
        type : 'collapsable',
        icon : 'heroicons_outline:chart-pie',
        children: [
            {
                id   : 'transaction.sales',
                title: 'Users',
                type : 'basic',
                link : '/transaction/sales'
            },
            {
                id   : 'transaction.sales',
                title: 'Roles',
                type : 'basic',
                link : '/transaction/sales'
            }
        ]
    },
    {
        id   : 'example',
        title: 'Reports',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example',
    },
    {
        id   : 'example',
        title: 'Customize',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example',
    },
    {
        id   : 'example',
        title: 'Activity Logs',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example',
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
