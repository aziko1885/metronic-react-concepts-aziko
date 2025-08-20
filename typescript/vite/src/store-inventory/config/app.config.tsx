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
      {
        title: 'Billing',
        children: [
          { title: 'Billing - Basic', path: '#' },
          {
            title: 'Billing - Enterprise',
            path: '#',
          },
          { title: 'Plans', path: '#' },
          { title: 'Billing History', path: '#' },
        ],
      },
      {
        title: 'Security',
        children: [
          { title: 'Get Started', path: '#' },
          { title: 'Security Overview', path: '#' },
          {
            title: 'Allowed IP Addresses',
            path: '#',
          },
          {
            title: 'Privacy Settings',
            path: '#',
          },
          {
            title: 'Device Management',
            path: '#',
          },
          {
            title: 'Backup & Recovery',
            path: '#',
          },
          {
            title: 'Current Sessions',
            path: '#',
          },
          { title: 'Security Log', path: '#' },
        ],
      },
      {
        title: 'Members & Roles',
        children: [
          { title: 'Teams Starter', path: '#' },
          { title: 'Teams', path: '#' },
          { title: 'Team Info', path: '#' },
          {
            title: 'Members Starter',
            path: '#',
          },
          { title: 'Team Members', path: '#' },
          { title: 'Import Members', path: '#' },
          { title: 'Roles', path: '#' },
          {
            title: 'Permissions - Toggler',
            path: '#',
          },
          {
            title: 'Permissions - Check',
            path: '#',
          },
        ],
      },
      { title: 'Integrations', path: '#' },
      { title: 'Notifications', path: '#' },
      { title: 'API Keys', path: '#' },
      {
        title: 'More',
        collapse: true,
        collapseTitle: 'Show less',
        expandTitle: 'Show 3 more',
        children: [
          { title: 'Appearance', path: '#' },
          { title: 'Invite a Friend', path: '#' },
          { title: 'Activity', path: '#' },
        ],
      },
    ],
  }
];
