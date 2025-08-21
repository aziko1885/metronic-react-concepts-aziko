import {
  Boxes,
  LayoutGrid,
  Package,
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
    icon: Boxes,
    children: [
      {
        title: 'All Stock',
        path: '/store-inventory/all-stock',
      }, 
      {
        title: 'Current Stock',
        path: '/store-inventory/current-stock',
      }, 
      {
        title: 'Inbound Stock',
        path: '/store-inventory/inbound-stock',
      }, 
      {
        title: 'Outbound Stock',
        path: '/store-inventory/outbound-stock',
      }, 
      {
        title: 'Stock Planner',
        path: '/store-inventory/stock-planner',
      }, 
       {
        title: 'Per Product Stock',
        path: '/store-inventory/per-product-stock',
      },
      {
        title: 'Track Shipping',
        path: '/store-inventory/track-shipping',
      },
      {
        title: 'Create Shipping Label',
        path: '/store-inventory/create-shipping-label',
      },
    ],
  },
  {
    title: 'Products',
    icon: Package,
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
