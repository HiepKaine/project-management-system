import { Component } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { chunk } from 'lodash-es';
import { HomeService } from './home.service';
import {
  ActivatedRoute, NavigationExtras,
  Router
} from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import { Dictionary } from '@frontend/models/dictionary.model';
import { Slide } from '@frontend/models/slide.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Option } from '@frontend/models/option.model';

enum PostType {
  congChuc = 1,
  vienChuc = 2,
  examPack = 3
}

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public dictionary!: Dictionary;
  public slides: Slide[] = [];
  public courses: Course[] = [];
  public officerCourse: Course[] = [];
  public officialCourse: Course[] = [];
  public courseFree: Course[] = [];
  public options: Option[] = [];
  public keyword!: string;
  public pagination!: ApiResponsePagination;
  public registers: Slide[] = [];
  public sidebarBanner: Option[] = [];
  public feedbacks = [
    {
      id: 1,
      icon: '/assets/images/icon-review-red.svg',
      description: 'Cảm nhận của em là Thầy có cách dạy rất khác, logic, sáng tạo khiến bất ngờ, dễ hiểu em tiếp thu nhanh mà không bị buồn ngủ. Đặc biệt lúc nào cũng là người truyền lửa hừng hực mặc dù đi làm về là vào dạy bọn em luôn không tỏ ra mệt mỏi. Chúc thầy có thật nhiều học viên đỗ như em!',
      avatar: '/assets/images/avatar1.png',
      name: 'Trần Thị Mỹ Linh',
      info: 'Kho bạc Nhà nước tỉnh Bình Thuận'
    },
    {
      id: 2,
      icon: '/assets/images/icon-review-yellow.svg',
      description: 'Thầy rất vui tính, cách truyền đạt của thầy rất khác bọt :)) học với thầy không hề thấy chán. Thật sự học mà không có những lúc "mất thời gian" như vậy thì buồn ngủ lắm ạ. Còn nữa là cách thầy dạy học thuộc luật, chữ suông mà thầy biến được thành thơ, nể thầy vãi :)))',
      avatar: '/assets/images/avatar2.png',
      name: 'Nguyễn Hoàng Thủy Ngân',
      info: 'Kho bạc Nhà nước tỉnh Cần Thơ'
    },
    {
      id: 3,
      icon: '/assets/images/icon-review-red.svg',
      avatar: '/assets/images/avatar3.png',
      description: 'Thầy là 1 người nhiệt huyết, là người luôn tràn đầy năng lượng truyền lửa đến chúng em. Em rất ấn tượng mỗi khi thầy giảng thầy nói chuyện rất cuốn hút đặc biệt là mỗi khi tụi em trả lời sai thầy mở cái bài nhạc: "trời ơi! cái qq j đây" thiệt sự là em cười như 1 con khùng...',
      name: 'Nguyễn Thị Thanh Nhàn',
      info: 'Kho bạc Nhà nước tỉnh Bình Phước'
    },
    {
      id: 4,
      icon: '/assets/images/icon-review-red.svg',
      description: 'Được biết thầy, theo học lớp của thầy, nhận được sự tư vấn, hỗ trợ về kiến thức của thầy khi đi thi là một may mắn đối với em,... Thầy rất trẻ và nhiệt huyết với lớp học, được gặp thầy cả trước và sau khi thi nên tinh thần của em thật sự tốt. Em cảm ơn thầy rất nhiều!',
      avatar: '/assets/images/avatar4.png',
      name: 'Nguyễn Thị Ngọc Loan',
      info: 'Cục Hải quan thành phố Hải Phòng'
    },
    {
      id: 5,
      icon: '/assets/images/icon-review-blue.svg',
      description: 'Vòng 1 em dk tài khoản trắc nghiệm. Vòng 2 thì mỗi video em chỉ xem thầy giảng 1 lần, nghe những cái thầy tóm tắt thì 1 lần là nhớ. Còn ấn tượng nhất thì chắc ở khiếu hài hước của thầy, thầy mà học sân khấu điện ảnh có khi bây giờ lại nổi tiếng ấy chứ haha :))))',
      avatar: '/assets/images/avatar5.png',
      name: 'Đỗ Văn Hiếu',
      info: 'Cục Hải quan tỉnh Thanh Hoá'
    },
    {
      id: 6,
      icon: '/assets/images/icon-review-yellow.svg',
      description: 'Ôi lớp hải quan của mình quá vui Thầy ạ, ...nhưng e vẫn ấn tượng là hôm kết thúc để thi vòng 1 ấy ạ, tối đó là e đang di chuyển ra HN để thi, mạng điện thoại thì yếu nhưng vẫn có gắng nghe hết buổi tâm sự của Thầy, thật sự rất xúc động và e khóc trên xe ngon lành',
      avatar: '/assets/images/avatar6.png',
      name: 'Hoàng Thị Mỹ Linh',
      info: 'Cục Hải quan tỉnh Quảng Trị'
    },
    {
      id: 7,
      icon: '/assets/images/icon-review-red.svg',
      description: 'Cảm nhận đầu tiên về Thầy là từ một buổi đầu vô tình vào xem thầy trên YouTube rất năng lượng và truyền cảm hứng. Nên em đã quyết tâm đăng ký khoá học. Đúng như mong muốn càng học càng say và kết quả đã nói lên tất cả. Em đứng thứ 2 (chỉ tiêu 04 người) trong danh sách trúng tuyển...',
      avatar: '/assets/images/avatar7.png',
      name: 'Bế Thị Lựu',
      info: 'Cục Hải quan tỉnh Lạng Sơn'
    },
    {
      id: 8,
      icon: '/assets/images/icon-review-blue.svg',
      description: 'Em thấy thầy là một người rất nhiệt tình tâm huyết, có cái nhìn tích cực và truyền được sự tích cực cũng như các kiến thức hữu ích cho học viên. Em ấn tượng thầy có sớm lấy vợ và gặp nhiều thành công!',
      avatar: '/assets/images/avatar8.png',
      name: 'Trần Ngọc Hải',
      info: 'Cục Thuế thành phố Hồ Chí Minh'
    },
    {
      id: 9,
      icon: '/assets/images/icon-review-yellow.svg',
      description: '...Mỗi lần em chùn bước mở bài giảng của thầy ra nghe thầy nói chuyện, chia sẻ em lại cố gắng tiếp tục học dù đã có tuổi rùi hiiii. Học thật khó nuốt, rùi công việc, con cái nhưng tin ở thầy nên em đã cố gắng và đã làm được. Thật sự khâm phục và tin tưởng ở thầy ',
      avatar: '/assets/images/avatar9.png',
      name: 'Hoàng Thị Bích Liên',
      info: 'Cục Dự trữ nhà nước khu vực Bắc Tây Nguyên'
    },
  ]
  public chunkedFeedbacks = chunk(this.feedbacks, 3)
  public teachers = [
    {
      image: '/assets/images/teacher1.png',
      name: 'CÔ TRỌNG',
      position: 'Giảng viên Tiếng Anh',
    },
    {
      image: '/assets/images/teacher2.png',
      name: 'THẦY TÀI TÂN TIẾN',
      position: 'Giảng viên cao cấp',
    },
    {
      image: '/assets/images/teacher1.png',
      name: 'CÔ TRỌNG',
      position: 'Giảng viên Tiếng Anh',
    },
    {
      image: '/assets/images/teacher1.png',
      name: 'CÔ TRỌNG',
      position: 'Giảng viên Tiếng Anh',
    },
    {
      image: '/assets/images/teacher1.png',
      name: 'CÔ TRỌNG',
      position: 'Giảng viên Tiếng Anh',
    },
    {
      image: '/assets/images/teacher2.png',
      name: 'THẦY TÀI TÂN TIẾN',
      position: 'Giảng viên cao cấp',
    },
  ]

  public chunkedTeachers = chunk(this.teachers, 3)
  constructor(
    private store: Store,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.store
      .select(ShellSelectors.getDictionary)
      .subscribe((dictionary: Dictionary | undefined) => {
        if (dictionary) {
          this.dictionary = plainToInstance(Dictionary, dictionary);
          this.options = dictionary.option;
          this.slides = this.dictionary.slider.filter(
            (item) => item.name === 'header'
          );
          this.registers = this.dictionary.slider.filter(
            (item) => item.name === 'register'
          );
          this.sidebarBanner = this.dictionary.option.filter(
            (item) => item.key === 'left-sidebar-banner'
          );
        }
      });

    this.getCourse()
    this.getOfficerCourse()
    this.getOfficalsCourse()
    this.getCourseFree()

  }

  private getCourse() {
    this.homeService.getCourse({ limit: 8 }).subscribe((result: ApiPaginateResponse<Course>) => {
      this.courses = plainToInstance(Course, result.data)
    })
  }

  private getOfficerCourse() {
    this.homeService.getCourse({ type: PostType.congChuc, limit: 4 }).subscribe((result: ApiPaginateResponse<Course>) => {
      this.officerCourse = plainToInstance(Course, result.data)
    })
  }

  private getOfficalsCourse() {
    this.homeService.getCourse({ type: PostType.vienChuc, limit: 4 }).subscribe((result: ApiPaginateResponse<Course>) => {
      this.officialCourse = plainToInstance(Course, result.data)
    })
  }

  private getCourseFree() {
    this.homeService.getCourse({ limit: 4, isFree: 1 }).subscribe((result: ApiPaginateResponse<Course>) => {
      this.courseFree = plainToInstance(Course, result.data)
    })
  }

  getOptionValueByKey(key: string): string {
    const item = this.options.find((item) => item.key === key);
    return item ? item.value : '';
  }


  gotoPage(page: number) {
    const params: NavigationExtras = { queryParams: { page }, relativeTo: this.activatedRoute };
    this.router.navigate([], params);
  }

  search() {
    const params: NavigationExtras = { queryParams: { keyword: this.keyword, } };
    this.router.navigate(['/', 'search'], params);
  }
}
