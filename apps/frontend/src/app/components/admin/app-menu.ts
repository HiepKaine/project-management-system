import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Tổng quan',
    icon: { icon: 'home-outline' },
    link: '/admin/dashboard',
  },
  {
    title: 'Khoa',
    icon: { icon: 'book-outline' },
    link: '/admin/faculty',
  },
  {
    title: 'Lớp',
    icon: { icon: 'browser-outline' },
    link: '/admin/class',
  },
  {
    title: 'Quản lí sinh viên',
    icon: { icon: 'people-outline' },
    link: '/admin/student',
  },
  {
    title: 'Quản lí giảng viên',
    icon: { icon: 'people-outline' },
    link: '/admin/teacher'
  },
  {
    title: 'Quản lí môn học',
    icon: { icon: 'people-outline' },
    link: '/admin/subject',
  },
  {
    title: 'Quản lí điểm',
    icon: { icon: 'people-outline' },
    link: '/admin/score',
  },
  {
    title: 'Quản lí điểm danh',
    icon: { icon: 'email-outline' },
    link: '/admin/contact',
  },
  {
    title: 'Danh sách bộ môn',
    icon: { icon: 'email-outline' },
    link: '/admin/division',
  },
  {
    title: 'Thành viên',
    icon: { icon: 'question-mark-circle-outline' },
    link: '/admin/faq',
  },
  {
    title: 'Vài trò thanh viên',
    icon: { icon: 'menu-outline' },
    link: '/admin/slider',
  },
  {
    title: 'Bài viết điều khoản',
    icon: { icon: 'menu-outline' },
    link: '/admin/category',
  },
  {
    title: 'Cấu hình',
    icon: { icon: 'settings-2-outline' },
    link: '/admin/option',
  },
];
