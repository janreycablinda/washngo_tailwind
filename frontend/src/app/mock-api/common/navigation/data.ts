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
        id   : 'transactions',
        title: 'Transactions',
        type : 'collapsable',
        icon : 'heroicons_outline:switch-horizontal',
        link : '/transactions',
        children: [
            {
                id   : 'transaction.sales',
                title: 'Sales',
                type : 'basic',
                link : '/transactions/sales'
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
                title: 'Employees',
                type : 'basic',
                link : '/transaction/sales'
            }
        ]
    },
    {
        id   : 'example',
        title: 'Organization',
        type : 'collapsable',
        icon : 'heroicons_outline:office-building',
        link : '/example',
        children: [
            {
                id   : 'example',
                title: 'Franchises',
                type : 'basic',
                link : '/example',
            },
            {
                id   : 'transaction.sales',
                title: 'Branches',
                type : 'basic',
                link : '/transaction/sales'
            }
        ]
    },
    
    {
        id   : 'example',
        title: 'User Management',
        type : 'collapsable',
        icon : 'heroicons_outline:users',
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
        icon : 'mat_outline:book',
        link : '/example',
    },
    {
        id   : 'example',
        title: 'Customize',
        type : 'basic',
        icon : 'mat_outline:settings',
        link : '/example',
    },
    {
        id   : 'example',
        title: 'Activity Logs',
        type : 'basic',
        icon : 'mat_outline:av_timer',
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
