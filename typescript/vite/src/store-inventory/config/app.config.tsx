import {
  LayoutGrid,
  Settings,
} from 'lucide-react';
import { MenuConfig } from './types';

export const MENU_SIDEBAR: MenuConfig = [
  {
    title: 'Dashboards',
    icon: LayoutGrid,
    children: [
      { title: 'Dashboard', path: '/store-inventory/dashboard' },
      { title: 'Dark Sidebar', path: '/store-inventory/dark-sidebar' }
    ],
  },
  { heading: 'Store Analytics' },
  {
    title: 'Inventory',
    icon: Settings,
    children: [
      {
        title: 'All Stock',
        path: '/store-inventory/all-stock',
      }, 
    ],
  },
  {
    title: 'Products',
    icon: Settings,
    children: [
      {
        title: 'Product List',
        path: '/store-inventory/product-list',
      }, 
      { title: 'Create Product', 
        path: '/store-inventory/create-product' 
      },
    ],
  }
];
