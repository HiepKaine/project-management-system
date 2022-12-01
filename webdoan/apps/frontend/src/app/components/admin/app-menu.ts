import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Tổng quan',
    icon: { icon: 'home-outline' },
    link: '/admin/dashboard',
  },
  {
    title: 'Khoá học',
    icon: { icon: 'book-outline' },
    link: '/admin/course',
  },
  {
    title: 'Bài giảng',
    icon: { icon: 'browser-outline' },
    link: '/admin/lesson',
  },
  {
    title: 'Gói trắc nghiệm',
    icon: { icon: 'npm-outline' },
    link: '/admin/exam-pack-manager',
  },
  {
    title: 'Trắc nghiệm',
    icon: { icon: 'file-remove-outline' },
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
    title: 'Học viên',
    icon: { icon: 'people-outline' },
    link: '/admin/user',
  },
  {
    title: 'Đánh giá',
    icon: { icon: 'people-outline' },
    link: '/admin/review-manager',
  },
  {
    title: 'Liên hệ',
    icon: { icon: 'email-outline' },
    link: '/admin/contact',
  },
  {
    title: 'FAQs',
    icon: { icon: 'question-mark-circle-outline' },
    link: '/admin/faq',
  },
  {
    title: 'Slider',
    icon: { icon: 'menu-outline' },
    link: '/admin/slider',
  },
  {
    title: 'Danh mục',
    icon: { icon: 'menu-outline' },
    link: '/admin/category',
  },
  {
    title: 'Cấu hình',
    icon: { icon: 'settings-2-outline' },
    link: '/admin/option',
  },
];
