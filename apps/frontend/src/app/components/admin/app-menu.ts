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
    link: '/admin/lesson',
  },
  {
    title: 'Sinh viên',
    icon: { icon: 'people-outline' },
    link: '/admin/exam-pack-manager',
  },
  {
    title: 'Quản lí giảng viên',
    icon: { icon: 'people-outline' },
    children: [
      {
        title: 'Đề trắc nghiệm',
        link: '/admin/exam-manager/exam',
      },
      {
        title: 'Câu hỏi trắc nghiệm',
        link: '/admin/exam-manager/question',
      },
      {
        title: 'Bài đọc',
        link: '/admin/exam-manager/reading-content',
      },
      {
        title: 'Kết quả',
        link: '/admin/test-session-manager',
      },
    ],
  },
  {
    title: 'Quản lí môn học',
    icon: { icon: 'people-outline' },
    link: '/admin/user',
  },
  {
    title: 'Quản lí điểm',
    icon: { icon: 'people-outline' },
    link: '/admin/review-manager',
  },
  {
    title: 'Quản lí điểm danh',
    icon: { icon: 'email-outline' },
    link: '/admin/contact',
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
