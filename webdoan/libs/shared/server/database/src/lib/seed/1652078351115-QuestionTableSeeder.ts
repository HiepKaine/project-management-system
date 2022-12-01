import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class QuestionTableSeeder1652078351115 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        "STT": "1",
        "question": "Theo hiến pháp năm 2013 Nước Cộng hoà xã hội chủ nghĩa Việt Nam là một nước ",
        "category": "Hiến pháp 2013",
        "answerA": "Độc lập, có chủ quyền, thống nhất và toàn vẹn lãnh thổ, bao gồm đất liền, hải đảo, vùng biển và vùng trời",
        "answerB": "Có chủ quyền, thống nhất và toàn vẹn lãnh thổ, bao gồm đất liền, hải đảo, vùng biển và vùng trời",
        "answerC": "Dân chủ ,có chủ quyền, thống nhất và toàn vẹn lãnh thổ, bao gồm đất liền, hải đảo, vùng biển và vùng trời",
        "answerD": "Độc lập dân tộc dân chủ nhân dân, có chủ quyền, thống nhất và toàn vẹn lãnh thổ, bao gồm đất liền, hải đảo, vùng biển và vùng trời",
        "correctAnswer": "1",
        "note": "Điều 1"
      },
      {
        "STT": "2",
        "question": "Theo  hiến pháp năm 2013 nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam là nhà nước",
        "category": "Hiến pháp 2013",
        "answerA": "Xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân",
        "answerB": "Xã hội chủ nghĩa hoạt động của Nhân dân, do Nhân dân, vì Nhân dân",
        "answerC": "Pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân",
        "answerD": "Pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân và vị Độc lập, Tự do dân tộc",
        "correctAnswer": "3",
        "note": " Khoản 1 Điều 2"
      },
      {
        "STT": "3",
        "question": "Theo hiến pháp năm 2013  Nước Cộng hòa xã hội chủ nghĩa Việt Nam do ",
        "category": "Hiến pháp 2013",
        "answerA": "Cả dân tộc Việt Nam làm chủ",
        "answerB": "Nhân dân làm chủ",
        "answerC": "Người dân Việt Nam làm chủ",
        "answerD": "Do Đảng cộng sản làm chủ",
        "correctAnswer": "2",
        "note": "khoản 2 điều 2"
      },
      {
        "STT": "4",
        "question": "Theo hiến pháp năm 2013 tất cả quyền lực Nhà nước thuộc về",
        "category": "Hiến pháp 2013",
        "answerA": "Nhân dân mà nền tảng là liên minh giữa giai cấp vô sản và đội ngũ trí thức",
        "answerB": "Nhân dân mà nền tảng là liên minh giữa giai cấp công nhân với giai cấp nông dân và đội ngũ công chức",
        "answerC": "Nhân dân mà nền tảng là liên minh giữa giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức",
        "answerD": "Nhân dân mà nền tảng là liên minh giữa giai cấp công nhân với giai cấp công dân và đội ngũ trí thức",
        "correctAnswer": "3",
        "note": "khoản 2 điều 2"
      },
      {
        "STT": "5",
        "question": "Theo hiến pháp năm 2013 quyền lực Nhà nước là",
        "category": "Hiến pháp 2013",
        "answerA": "Thống nhất, có sự phân công, phối hợp, kiểm soát giữa các cơ quan nhà nước trong việc thực hiện các quyền lập pháp, hành pháp, tư pháp",
        "answerB": "Có sự phân công, phối hợp, kiểm soát giữa các cơ quan nhà nước trong việc thực hiện các quyền lập pháp, hành pháp, tư pháp",
        "answerC": "Có sự phân công, phối hợp, kiểm soát giữa các cơ quan nhà nước trong việc thực hiện các quyền lập pháp, lập quy",
        "answerD": " Thống nhất, có sự phân công, phối hợp, kiểm soát giữa các cơ quan nhà nước trong việc thực hiện các quyền lập pháp, lập quy",
        "correctAnswer": "1",
        "note": "Khoản 3 Điều 2"
      },
      {
        "STT": "6",
        "question": "Theo hiến pháp năm 2013 Nước Cộng hoà xã hội chủ nghĩa Việt Nam là một nước ",
        "category": "Hiến pháp 2013",
        "answerA": "Xã hội chủ nghĩa hoạt động của Nhân dân, do Nhân dân, vì Nhân dân",
        "answerB": "Xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân",
        "answerC": "Độc lập, có chủ quyền, thống nhất và toàn vẹn lãnh thổ, bao gồm đất liền, hải đảo, vùng biển và vùng trời",
        "answerD": "Độc lập dân tộc dân chủ nhân dân, có chủ quyền, thống nhất và toàn vẹn lãnh thổ, bao gồm đất liền, hải đảo, vùng biển và vùng trời",
        "correctAnswer": "3",
        "note": "Điều 1"
      },
      {
        "STT": "7",
        "question": "Theo luật hiến pháp năm 2013 nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam là nhà nước",
        "category": "Hiến pháp 2013",
        "answerA": "Xã hội chủ nghĩa hoạt động của Nhân dân, do Nhân dân, vì Nhân dân",
        "answerB": "Pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân",
        "answerC": "Độc lập, có chủ quyền, thống nhất và toàn vẹn lãnh thổ, bao gồm đất liền, hải đảo, vùng biển và vùng trời",
        "answerD": "Độc lập dân tộc dân chủ nhân dân, có chủ quyền, thống nhất và toàn vẹn lãnh thổ, bao gồm đất liền, hải đảo, vùng biển và vùng trời",
        "correctAnswer": "2",
        "note": " Khoản 1 Điều 2"
      },
      {
        "STT": "8",
        "question": "Theo hiến pháp năm 2013 nhà nước đảm bảo và pháp huy quyền nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": "Quyền cầm quyền của Nhân dân",
        "answerB": "Quyền lực thuộc về Nhân dân",
        "answerC": "Quyền làm chủ của Nhân dân",
        "answerD": "Quyền lập pháp, hành pháp, tư pháp của Nhân dân",
        "correctAnswer": "3",
        "note": "Điều 3"
      },
      {
        "STT": "9",
        "question": "Theo hiến pháp năm 2013 nhà nước đảm bảo và pháp huy quyền nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": "Quyền lập hiến của Nhân dân",
        "answerB": "Quyền lập pháp của Nhân dân",
        "answerC": "Quyền hành pháp của Nhân dân",
        "answerD": "Cả ba đáp án trên đều sai",
        "correctAnswer": "4",
        "note": " Điều 3"
      },
      {
        "STT": "10",
        "question": "Theo hiến pháp năm 2013 nhà nước đảm bảo và pháp huy quyền nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": "Quyền tư pháp của Nhân dân",
        "answerB": "Quyền hành pháp của Nhân dân",
        "answerC": "Quyền làm chủ của Nhân dân",
        "answerD": "Cả đáp án 1 và 2 đều đúng",
        "correctAnswer": "3",
        "note": "Điều 3"
      },
      {
        "STT": "11",
        "question": "Theo hiến pháp năm 2013 nhà nước đảm bảo nội dung nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": "Công nhận, tôn trọng, bảo vệ và bảo đảm quyền con người, quyền công dân",
        "answerB": "Thực hiện mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh, mọi người có cuộc sống ấm no, tự do, hạnh phúc, có điều kiện phát triển toàn diện",
        "answerC": "Quyền làm chủ của Nhân dân",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "4",
        "note": "Điều 3"
      },
      {
        "STT": "12",
        "question": "Theo hiến pháp năm 2013 nhà nước đảm bảo nội dung nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": "Quyền lực thuộc về Nhân dân",
        "answerB": "Công nhận, tôn trọng, bảo vệ và bảo đảm quyền sống còn của Nhân dân",
        "answerC": "Quyền lập hiến của Nhân dân",
        "answerD": "Cả ba đáp án trên đều sai",
        "correctAnswer": "4",
        "note": "Điều 3"
      },
      {
        "STT": "13",
        "question": "Theo hiến pháp năm 2013 đâu không phải là nôi dung nhà nước đảm bảo ",
        "category": "Hiến pháp 2013",
        "answerA": "Thực hiện mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh, mọi người có cuộc sống ấm no, tự do, hạnh phúc, có điều kiện phát triển toàn diện",
        "answerB": "Công nhận, tôn trọng, bảo vệ và bảo đảm quyền con người, quyền công dân",
        "answerC": "Quyền lập hiến của Nhân dân",
        "answerD": "Cả ba đáp án trên đều sai",
        "correctAnswer": "3",
        "note": "Điều 3"
      },
      {
        "STT": "14",
        "question": "Theo  hiến pháp năm 2013 đâu không phải là nôi dung nhà nước đảm bảo ",
        "category": "Hiến pháp 2013",
        "answerA": "Quyền lực thuộc về Nhân dân",
        "answerB": "Thực hiện mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh, mọi người có cuộc sống ấm no, tự do, hạnh phúc, có điều kiện phát triển toàn diện",
        "answerC": "Công nhận, tôn trọng, bảo vệ và bảo đảm quyền con người, quyền công dân",
        "answerD": "Cả ba đáp án trên đều sai",
        "correctAnswer": "1",
        "note": "Điều 3"
      },
      {
        "STT": "15",
        "question": "Theo  hiến pháp năm 2013 Đảng Cộng sản Việt Nam là",
        "category": "Hiến pháp 2013",
        "answerA": "Đội tiên phong của giai cấp công nhân",
        "answerB": "Đội tiên phong của giai cấp nông dân",
        "answerC": "Đội tiên phong của giai cấp vô sản",
        "answerD": "Đội tiên phong của đội ngũ trí thức",
        "correctAnswer": "1",
        "note": "Khoản 1 Điều 4"
      },
      {
        "STT": "16",
        "question": "Theo hiến pháp năm 2013 Đảng Cộng sản Việt Nam là",
        "category": "Hiến pháp 2013",
        "answerA": "Đội tiên phong của Nhân dân lao động và của dân tộc Việt Nam",
        "answerB": "Đội tiên phong của giai cấp công nhân",
        "answerC": "Đội tiên phong của giai cấp vô sản",
        "answerD": "Cả đáp án 1 và 2 đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 1 Điều 4"
      },
      {
        "STT": "17",
        "question": "Theo hiến pháp năm 2013 Đảng Cộng sản Việt Nam là",
        "category": "Hiến pháp 2013",
        "answerA": "Đội tiên phong của Nhân dân lao động  Việt Nam",
        "answerB": "Đội tiên phong của Nhân dân lao động và của dân tộc Việt Nam",
        "answerC": "Đội tiền phong của Nhân dân lao động và của dân tộc Việt Nam",
        "answerD": "Đội tiền phong của Nhân dân lao động  Việt Nam",
        "correctAnswer": "2",
        "note": "Khoản 1 Điều 4"
      },
      {
        "STT": "18",
        "question": "Theo  hiến pháp năm 2013 Đảng Cộng sản Việt Nam là",
        "category": "Hiến pháp 2013",
        "answerA": "Đội tiên phong của giai cấp nông dân",
        "answerB": "Đội tiên phong của Nhân dân lao động và của dân tộc Việt Nam",
        "answerC": "Đại biểu trung thành lợi ích của giai cấp công nhân, nhân dân lao động và của cả dân tộc",
        "answerD": "Cả đáp án 2 và 3 đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 1 Điều 4"
      },
      {
        "STT": "19",
        "question": "Theo luật hiến pháp năm 2013 Đảng Cộng sản Việt Nam là",
        "category": "Hiến pháp 2013",
        "answerA": "Đại biểu trung thành lợi ích của giai cấp công nhân, nhân dân lao động và của cả dân tộc",
        "answerB": "Đội tiên phong của Nhân dân lao động và của dân tộc Việt Nam",
        "answerC": "Đại biểu trung thành lợi ích của giai cấp công nhân, nhân dân lao động và của cả dân tộc",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 1 Điều 4"
      },
      {
        "STT": "20",
        "question": " Theo hiến pháp năm 2013 Đảng Cộng sản Việt Nam thực hiện",
        "category": "Hiến pháp 2013",
        "answerA": "Gắn bó mật thiết với Nhân dân, phục vụ Nhân dân, chịu sự giám sát của Nhân dân, chịu trách nhiệm trước Nhân dân về những quyết định của mình",
        "answerB": "Phục vụ Nhân dân, chịu sự giám sát của Nhân dân, chịu trách nhiệm trước Nhân dân về những quyết định của mình",
        "answerC": "Gắn bó mật thiết với Nhân dân, phục vụ Nhân dân, chịu sự kiểm tra của Nhân dân, chịu trách nhiệm trước Nhân dân về những quyết định của mình",
        "answerD": "Gắn bó mật thiết với Nhân dân, phục vụ Nhân dân, chịu sự kiểm sát của Nhân dân, chịu trách nhiệm trước Nhân dân về những quyết định của mình",
        "correctAnswer": "1",
        "note": "Khoản 2 Điều 4"
      },
      {
        "STT": "21",
        "question": " Theo hiến pháp năm 2013 các tổ chức của Đảng và đảng viên Đảng Cộng sản Việt Nam hoạt động trong khuôn khổ của",
        "category": "Hiến pháp 2013",
        "answerA": "Hiến pháp và pháp luật",
        "answerB": "Sự kiểm tra, giám sát của Nhân dân",
        "answerC": "Điều lệ Đảng và pháp luật",
        "answerD": "Cả đáp án 1 và 3 đều đúng",
        "correctAnswer": "1",
        "note": "Khoản 3 Điều 4"
      },
      {
        "STT": "22",
        "question": " Theo điều 5 hiến pháp năm 2013 Nước cộng hoà xã hội chủ nghĩa Việt Nam là ",
        "category": "Hiến pháp 2013",
        "answerA": "Xã hội chủ nghĩa hoạt động của Nhân dân, do Nhân dân, vì Nhân dân",
        "answerB": "Quốc gia thống nhất của các dân tộc cùng sinh sống trên đất nước Việt Nam",
        "answerC": "Cả dân tộc Việt Nam làm chủ",
        "answerD": "Quốc gia nhỏ bé, kiên cường bất khuất chông giặt ngoại xâm",
        "correctAnswer": "2",
        "note": "Khoản 1 Điều 5"
      },
      {
        "STT": "23",
        "question": "Theo hiến pháp năm 2013 các dân tộc Việt nam thực hiện",
        "category": "Hiến pháp 2013",
        "answerA": "Bình đẳng, đoàn kết, tôn trọng và giúp nhau cùng phát triển",
        "answerB": "Bình đẳng, tự lực , tự cường, đoàn kết, tôn trọng và giúp nhau cùng phát triển",
        "answerC": "Không chia rẽ nội bộ dân tộc, tao cơ hội cho kẻ xấu làm loạn",
        "answerD": "Chính sách giúp đỡ nhau cùng phát triển",
        "correctAnswer": "1",
        "note": "Khoản 2 Điều 5"
      },
      {
        "STT": "24",
        "question": "Theo hiến pháp năm 2013 ngôn ngữ Quốc gia là",
        "category": "Hiến pháp 2013",
        "answerA": "Tiếng Việt",
        "answerB": "Tiếng Việt là chính",
        "answerC": "Tiếng dân tộc",
        "answerD": "Tiếng Đông Nam Á",
        "correctAnswer": "1",
        "note": "Khoản 3 Điều 5"
      },
      {
        "STT": "25",
        "question": "Theo hiến pháp năm 2013 các dân tộc có quyền nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": "Tự ý thay đổi ngôn ngữ, chữ viết của mình để phù hợp với xu thế hội nhập mà không làm mất đị văn hoá dân tộc mình",
        "answerB": "Lên tiếng nghiêm cấm mọi hành vi kỳ thị, chia rẽ dân tộc",
        "answerC": "Dùng tiếng nói, chữ viết, giữ gìn bản sắc dân tộc, phát huy phong tục, tập quán, truyền thống và văn hóa tốt đẹp của mình",
        "answerD": "Dùng hoặc không dùng tiếng nói, chữ viết, giữ gìn bản sắc dân tộc, phát huy phong tục, tập quán, truyền thống và văn hóa tốt đẹp của mình",
        "correctAnswer": "3",
        "note": "Khoản 3 Điều 5"
      },
      {
        "STT": "26",
        "question": "Theo hiến pháp năm 2013 Nhà nước thực hiện chính sách nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": " Phát triển toàn cầu và tạo điều kiện để các dân tộc thiểu số phát huy nội lực, cùng phát triển với đất nước",
        "answerB": " Phát triển toàn diện và tạo điều kiện để các dân tộc thiểu số phát huy nội lực, cùng phát triển với đất nước",
        "answerC": " Phát triển toàn diện và tạo điều kiện để các dân tộc thiểu số phát huy nội lực và ngoại lực cùng phát triển với đất nước",
        "answerD": "Cả ba đáp án trên đều sai",
        "correctAnswer": "2",
        "note": "Khoản 4 Điều 5"
      },
      {
        "STT": "27",
        "question": "Theo hiến pháp năm 2013 Nhà nước thực hiện chính sách nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": "Pháp triển toàn diện tạo đầy đủ điều kiện cho các dan tộc đêu được tiếp xúc và phát triển toàn diện cả về kinh tế, chính trị, văn hoá và xã hội",
        "answerB": " Phát triển toàn cầu và tạo điều kiện để các dân tộc thiểu số phát huy nội lực, cùng phát triển với đất nước",
        "answerC": " Phát triển toàn diện và tạo điều kiện để các dân tộc thiểu số phát huy nội lực và ngoại lực cùng phát triển với đất nước",
        "answerD": "Cả ba đáp án trên đều sai",
        "correctAnswer": "4",
        "note": "Khoản 4 Điều 5"
      },
      {
        "STT": "28",
        "question": "Theo hiến pháp năm 2013 nhân dân thực hiện quyền lực nhà nước bằng  phương pháp nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": "Bằng Hội đồng nhân dân và thông qua các cơ quan khác của Nhà nước",
        "answerB": "Bằng dân chủ đại diện thông qua Quốc hội",
        "answerC": "Dân chủ trực tiếp",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "4",
        "note": "Điều 6"
      },
      {
        "STT": "29",
        "question": "Theo hiến pháp năm 2013 đâu không phải là phương pháp nhân dân thực hiện quyền lực nhà nước",
        "category": "Hiến pháp 2013",
        "answerA": "Dân chủ công khai",
        "answerB": "Bằng Hội đồng nhân dân và thông qua các cơ quan khác của Nhà nước",
        "answerC": "Dân chủ trực tiếp",
        "answerD": "Cả ba đáp án trên đều sai",
        "correctAnswer": "1",
        "note": "Điều 6"
      },
      {
        "STT": "30",
        "question": "Theo hiến pháp năm 2013 đâu không phải là phương pháp nhân dân thực hiện quyền lực nhà nước",
        "category": "Hiến pháp 2013",
        "answerA": "Bằng Hội đồng nhân dân và thông qua các cơ quan khác của Nhà nước",
        "answerB": "Bằng dân chủ đại diện thông qua Quốc hội",
        "answerC": "Bằng dân chủ đại diện cho tâm tư , nguyện vọng của nhân dân",
        "answerD": "Cả ba đáp án trên đều sai",
        "correctAnswer": "3",
        "note": "Điều 6"
      },
      {
        "STT": "31",
        "question": "Theo hiến pháp năm 2013 đâu không phải là phương pháp nhân dân thực hiện quyền lực nhà nước",
        "category": "Hiến pháp 2013",
        "answerA": "Dân chủ trực tiếp",
        "answerB": "Dân chủ bình đẳng",
        "answerC": "Bằng dân chủ đại diện thông qua Quốc hội",
        "answerD": "Cả ba đáp án trên đều sai",
        "correctAnswer": "2",
        "note": "Điều 6"
      },
      {
        "STT": "32",
        "question": "Theo hiến pháp năm 2013 đâu không phải là phương pháp nhân dân thực hiện quyền lực nhà nước",
        "category": "Hiến pháp 2013",
        "answerA": "Dân chủ trực tiếp",
        "answerB": "Dân chủ bình đẳng",
        "answerC": "Dân chủ công khai",
        "answerD": "Cả đán án 2 và 3 đều sai",
        "correctAnswer": "4",
        "note": "Điều 6"
      },
      {
        "STT": "33",
        "question": "Theo hiến pháp năm 2013 đâu không phải là nguyên tắc của việc bầu cử đại biểu Quốc hội và đại biểu Hội đồng nhân dân",
        "category": "Hiến pháp 2013",
        "answerA": "Phổ thông",
        "answerB": "Trực tiếp",
        "answerC": "Bình đẳng",
        "answerD": "Không bỏ phiếu trống",
        "correctAnswer": "4",
        "note": "Khoản 1 Điều 7"
      },
      {
        "STT": "34",
        "question": "Theo hiến pháp năm 2013 đâu không phải là nguyên tắc của việc bầu cử đại biểu Quốc hội và đại biểu Hội đồng nhân dân",
        "category": "Hiến pháp 2013",
        "answerA": "Bỏ phiếu kín",
        "answerB": "Trực tiếp",
        "answerC": "Dân chủ",
        "answerD": "Bình đẳng",
        "correctAnswer": "3",
        "note": "Khoản 1 Điều 7"
      },
      {
        "STT": "35",
        "question": "Theo hiến pháp năm 2013 đâu là nguyên tắc của việc bầu cử đại biểu Quốc hội và đại biểu Hội đồng nhân dân",
        "category": "Hiến pháp 2013",
        "answerA": "Bỏ phiếu kín",
        "answerB": "Dân chủ",
        "answerC": "Tư nguyện",
        "answerD": "Tự do ý chí",
        "correctAnswer": "1",
        "note": "Khoản 1 Điều 7"
      },
      {
        "STT": "36",
        "question": "Theo hiến pháp năm 2013 đâu là nguyên tắc của việc bầu cử đại biểu Quốc hội và đại biểu Hội đồng nhân dân",
        "category": "Hiến pháp 2013",
        "answerA": "Tư nguyện",
        "answerB": "Trực tiếp",
        "answerC": "Không bỏ phiếu trống",
        "answerD": "Dân chủ",
        "correctAnswer": "2",
        "note": "Khoản 1 Điều 7"
      },
      {
        "STT": "37",
        "question": "Theo hiến pháp năm 2013 Đại biểu Quốc hội, đại biểu Hội đồng nhân dân bị cử tri hoặc Quốc hội, Hội đồng nhân dân bãi nhiệm khi nào",
        "category": "Hiến pháp 2013",
        "answerA": "Không còn xứng đáng với các lá phiếu bầu của Nhân dân",
        "answerB": "Không còn xứng đáng với sự tín nhiệm của Nhân dân",
        "answerC": "Phát hiện có hành vi tham nhũng gây thất thoát nghiêm trọng ngân sách Nhà nước",
        "answerD": "Cả đáp án 2 và 3 đều đúng",
        "correctAnswer": "2",
        "note": "Khoản 2 Điều 7"
      },
      {
        "STT": "38",
        "question": "Theo hiến pháp năm 2013 Đại biểu Quốc hội, đại biểu Hội đồng nhân dân bị cử tri hoặc Quốc hội, Hội đồng nhân dân bãi nhiệm khi nào",
        "category": "Hiến pháp 2013",
        "answerA": "Không còn xứng đáng với sự tín nhiệm của Nhân dân",
        "answerB": "Tiến hành lấy phiếu tín nhiệm trong cuộc họp Quốc hội",
        "answerC": "Tiến hành bỏ phiếu tín nhiệm trong cuộc họp Quốc hội",
        "answerD": "Cả đáp án 2 và 3 đều đúng",
        "correctAnswer": "1",
        "note": "Khoản 2 Điều 7"
      },
      {
        "STT": "39",
        "question": "Theo hiến pháp năm 2013 Nhà nước được tổ chức và hoạt động theo ",
        "category": "Hiến pháp 2013",
        "answerA": "Hiến pháp và pháp luật ",
        "answerB": "Hiến pháp và các Điều ươc quốc tế",
        "answerC": "Hiến pháp và điều lệ Đảng",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "1",
        "note": "Khoản 1 Điều 8"
      },
      {
        "STT": "40",
        "question": "Theo hiến pháp năm 2013 Nhà nước quản lý xã hội bằng",
        "category": "Hiến pháp 2013",
        "answerA": "Hiến pháp và các văn bản pháp luật có giá trị pháp lý thấp hơn, thực hiện nguyên tắc tập trung dân chủ",
        "answerB": "Hiến pháp và pháp luật, thực hiện nguyên tắc tập trung dân chủ",
        "answerC": "Hiến pháp và các quy phạm pháp luật , thực hiện nguyên tắc dân chủ tập trung",
        "answerD": "Hiến pháp và các quy phạm pháp luật , thực hiện nguyên tắc dân chủ tập trung",
        "correctAnswer": "2",
        "note": "Khoản 1 Điều 8"
      },
      {
        "STT": "41",
        "question": "Theo hiến pháp năm 2013 Nhà nước quản lý xã hội bằng",
        "category": "Hiến pháp 2013",
        "answerA": "Hiến pháp và các Điều ươc quốc tế",
        "answerB": "Hiến pháp và điều lệ Đảng",
        "answerC": "Hiến pháp và các văn bản pháp luật có giá trị pháp lý thấp hơn, thực hiện nguyên tắc tập trung dân chủ",
        "answerD": "Cả ba đáp án trên đều sai",
        "correctAnswer": "4",
        "note": "Khoản 1 Điều 8"
      },
      {
        "STT": "42",
        "question": "Theo hiến pháp năm 2013 Nhà nước quản lý xã hội bằng",
        "category": "Hiến pháp 2013",
        "answerA": "Hiến pháp và pháp luật, thực hiện nguyên tắc tập trung dân chủ",
        "answerB": "Hiến pháp và các Điều ươc quốc tế",
        "answerC": "Hiến pháp và pháp luật, thực hiện nguyên tắc tập trung dân chủ",
        "answerD": "Hiến pháp và các quy phạm pháp luật , thực hiện nguyên tắc dân chủ tập trung",
        "correctAnswer": "1",
        "note": "Khoản 1 Điều 8"
      },
      {
        "STT": "43",
        "question": "Theo hiến pháp năm 2013 các cơ quan nhà nước, cán bộ, công chức, viên chức phải ",
        "category": "Hiến pháp 2013",
        "answerA": "Tôn trọng Nhân dân",
        "answerB": "Tận tụy phục vụ Nhân dân",
        "answerC": "Liên hệ chặt chẽ với Nhân dân",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 2 Điều 8"
      },
      {
        "STT": "44",
        "question": "Theo hiến pháp năm 2013 các cơ quan nhà nước, cán bộ, công chức, viên chức phải ",
        "category": "Hiến pháp 2013",
        "answerA": "Lắng nghe ý kiến và chịu sự giám sát của Nhân dân",
        "answerB": "Kiên quyết đấu tranh chống tham nhũng, lãng phí và mọi biểu hiện quan liêu, hách dịch, cửa quyền",
        "answerC": "Tôn trọng Nhân dân",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 2 Điều 8"
      },
      {
        "STT": "45",
        "question": "Theo hiến pháp năm 2013 các cơ quan nhà nước, cán bộ, công chức, viên chức phải ",
        "category": "Hiến pháp 2013",
        "answerA": "Tận tụy phục vụ Nhân dân",
        "answerB": "Liên hệ chặt chẽ với Nhân dân",
        "answerC": "Lắng nghe ý kiến và chịu sự giám sát của Nhân dân",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 2 Điều 8"
      },
      {
        "STT": "46",
        "question": "Theo hiến pháp năm 2013 các cơ quan nhà nước, cán bộ, công chức, viên chức phải ",
        "category": "Hiến pháp 2013",
        "answerA": "Hằng năm có trách nhiệm báo cáo kết quả hoạt động đến với toàn thể nhân dân",
        "answerB": "Lắng nghe ý kiến và chịu sự giám sát của Nhân dân",
        "answerC": "Liên hệ chặt chẽ với Nhân dân",
        "answerD": "Cả đáp án 2 và 3 đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 2 Điều 8"
      },
      {
        "STT": "47",
        "question": "Theo hiến pháp năm 2013 các cơ quan nhà nước, cán bộ, công chức, viên chức không phải ",
        "category": "Hiến pháp 2013",
        "answerA": "Tôn trọng Nhân dân",
        "answerB": "Hằng năm có trách nhiệm báo cáo kết quả hoạt động đến với toàn thể nhân dân",
        "answerC": "Tận tụy phục vụ Nhân dân",
        "answerD": "Liên hệ chặt chẽ với Nhân dân",
        "correctAnswer": "2",
        "note": "Khoản 2 Điều 8"
      },
      {
        "STT": "48",
        "question": "Theo hiến pháp năm 2013 các cơ quan nhà nước, cán bộ, công chức, viên chức không phải ",
        "category": "Hiến pháp 2013",
        "answerA": "Liên tục vi hành đến các địa bàn sinh sống của nhân dân",
        "answerB": "Liên hệ chặt chẽ với Nhân dân",
        "answerC": "Tận tụy phục vụ Nhân dân",
        "answerD": "Kiên quyết đấu tranh chống tham nhũng, lãng phí và mọi biểu hiện quan liêu, hách dịch, cửa quyền",
        "correctAnswer": "1",
        "note": "Khoản 2 Điều 8"
      },
      {
        "STT": "49",
        "question": "Theo hiến pháp năm 2013  Mặt trận Tổ quốc Việt Nam là",
        "category": "Hiến pháp 2013",
        "answerA": "Tổ chức liên minh chính trị, liên hiệp tự nguyện của tổ chức chính trị, các tổ chức chính trị - xã hội, tổ chức xã hội và các cá nhân tiêu biểu trong các giai cấp, tầng lớp xã hội, dân tộc, tôn giáo, người Việt Nam định cư ở nước ngoài",
        "answerB": "Liên hiệp tự nguyện của tổ chức chính trị, các tổ chức chính trị - xã hội, tổ chức xã hội và các cá nhân tiêu biểu trong các giai cấp, tầng lớp xã hội, dân tộc, tôn giáo, người Việt Nam định cư ở nước ngoài",
        "answerC": "Tổ chức liên minh chính trị, liên hiệp tự nguyện của tổ chức chính trị, các tổ chức kinh tế - xã hội, tổ chức xã hội và các cá nhân tiêu biểu trong các giai cấp, tầng lớp xã hội, dân tộc, tôn giáo, người Việt Nam định cư ở nước ngoài",
        "answerD": "Tổ chức liên hiệp chính trị, liên hiệp tự nguyện của tổ chức chính trị, các tổ chức chính trị - xã hội, tổ chức xã hội và các cá nhân tiêu biểu trong các giai cấp, tầng lớp xã hội, dân tộc, tôn giáo, người Việt Nam định cư ở nước ngoài",
        "correctAnswer": "1",
        "note": "Điều 9"
      },
      {
        "STT": "50",
        "question": "Theo hiến pháp năm 2013  Mặt trận Tổ quốc Việt Nam là ",
        "category": "Hiến pháp 2013",
        "answerA": "Cơ sở chính trị - kinh tếcủa chính quyền nhân dân",
        "answerB": "Cơ sở chính trị của chính quyền nhân dân",
        "answerC": "Cơ sở chính trị- xã hội của chính quyền nhân dân",
        "answerD": "Cơ sở chính trị- kinh tế- xã hội của chính quyền nhân dân",
        "correctAnswer": "2",
        "note": "Điều 9"
      },
      {
        "STT": "51",
        "question": "Theo hiến pháp năm 2013  Mặt trận Tổ quốc Việt Nam là ",
        "category": "Hiến pháp 2013",
        "answerA": "Đại diện, bảo vệ quyền và lợi ích hợp pháp, chính đáng của Nhân dân",
        "answerB": "Tập hợp, phát huy sức mạnh đại đoàn kết toàn dân tộc, thực hiện dân chủ, tăng cường đồng thuận xã hội",
        "answerC": "Liên hiệp tự nguyện của tổ chức chính trị, các tổ chức chính trị - xã hội, tổ chức xã hội và các cá nhân tiêu biểu trong các giai cấp, tầng lớp xã hội, dân tộc, tôn giáo, người Việt Nam định cư ở nước ngoài",
        "answerD": "Cả đáp án 1 và 2 đều đúng",
        "correctAnswer": "4",
        "note": "Điều 9"
      },
      {
        "STT": "52",
        "question": "Theo hiến pháp năm 2013 đâu là các tổ chức chính trị - xã hội được thành lập trên cơ sở tự nguyện, đại diện và bảo vệ quyền, lợi ích hợp pháp, chính đáng của thành viên, hội viên tổ chức mình",
        "category": "Hiến pháp 2013",
        "answerA": "Công đoàn Việt Nam",
        "answerB": "Hội nông dân Việt Nam",
        "answerC": "Hội cựu chiến binh Việt Nam",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 2 Điều 9"
      },
      {
        "STT": "53",
        "question": "Theo hiến pháp năm 2013 đâu là các tổ chức chính trị - xã hội được thành lập trên cơ sở tự nguyện, đại diện và bảo vệ quyền, lợi ích hợp pháp, chính đáng của thành viên, hội viên tổ chức mình",
        "category": "Hiến pháp 2013",
        "answerA": "Đoàn thanh niên cộng sản Hồ Chí Minh",
        "answerB": "Hội thiếu niên nhi đồng Việt Nam",
        "answerC": "Hội người cao tuổi Việt Nam",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "1",
        "note": "Khoản 2 Điều 9"
      },
      {
        "STT": "54",
        "question": "Theo hiến pháp năm 2013 đâu là các tổ chức chính trị - xã hội được thành lập trên cơ sở tự nguyện, đại diện và bảo vệ quyền, lợi ích hợp pháp, chính đáng của thành viên, hội viên tổ chức mình",
        "category": "Hiến pháp 2013",
        "answerA": "Hội nông dân Việt Nam",
        "answerB": "Hội chăn nuôi Việt Nam",
        "answerC": "Hội kinh doanh Việt Nam",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "1",
        "note": "Khoản 2 Điều 9"
      },
      {
        "STT": "55",
        "question": "Theo hiến pháp năm 2013 đâu không phải là các tổ chức chính trị - xã hội được thành lập trên cơ sở tự nguyện, đại diện và bảo vệ quyền, lợi ích hợp pháp, chính đáng của thành viên, hội viên tổ chức mình",
        "category": "Hiến pháp 2013",
        "answerA": "Công đoàn Việt Nam",
        "answerB": "Hội người cao tuổi Việt Nam",
        "answerC": "Hội cựu chiến binh Việt Nam",
        "answerD": "Hội nông dân Việt Nam",
        "correctAnswer": "2",
        "note": "Khoản 2 Điều 9"
      },
      {
        "STT": "56",
        "question": "Theo hiến pháp năm 2013 đâu không phải là các tổ chức chính trị - xã hội được thành lập trên cơ sở tự nguyện, đại diện và bảo vệ quyền, lợi ích hợp pháp, chính đáng của thành viên, hội viên tổ chức mình",
        "category": "Hiến pháp 2013",
        "answerA": "Hợp tác xã Việt Nam",
        "answerB": "Hội người cao tuổi Việt Nam",
        "answerC": "Hội cựu chiến binh Việt Nam",
        "answerD": "Cả đáp án 1 và 2 đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 2 Điều 9"
      },
      {
        "STT": "57",
        "question": "Theo hiến pháp năm 2013 Hội nông dân Việt Nam là tổ chức nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": "Kinh tế - xã hội",
        "answerB": "Chính trị- xã hội",
        "answerC": "Kinh tế- chính trị",
        "answerD": "Kinh tế- chính trị- xã hội",
        "correctAnswer": "2",
        "note": "Khoản 2 Điều 9"
      },
      {
        "STT": "58",
        "question": "Theo hiến pháp năm 2013 Đoàn thanh niên cộng sản Hồ Chí Minh là tổ chức nào sau đây",
        "category": "Hiến pháp 2013",
        "answerA": "Chính trị- văn hoá",
        "answerB": "Chính trị- xã hội",
        "answerC": "Chính trị",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "2",
        "note": "Khoản 2 Điều 9"
      },
      {
        "STT": "59",
        "question": "Theo hiến pháp năm 2013 Công đoàn Việt Nam là tổ chức gì",
        "category": "Hiến pháp 2013",
        "answerA": "Chính trị - xã hội của giai cấp công nhân và của người lao động được thành lập trên cơ sở tự nguyện, đại diện cho người lao động, chăm lo và bảo vệ quyền, lợi ích hợp pháp, chính đáng của người lao động",
        "answerB": "Chính trị - xã hội của giai cấp công nhân và của toàn thể nhân dân được thành lập trên cơ sở tự nguyện, đại diện cho nhân dân, chăm lo và bảo vệ quyền, lợi ích hợp pháp, chính đáng của nhân dân",
        "answerC": "Kinh tế - xã hội của giai cấp công nhân và của người lao động được thành lập trên cơ sở tự nguyện, đại diện cho người lao động, chăm lo và bảo vệ quyền, lợi ích hợp pháp, chính đáng của người lao động",
        "answerD": "Kinh tế - xã hội của giai cấp công nhân và toàn thể nhân dân được thành lập trên cơ sở tự nguyện, đại diện cho nhân dân chăm lo và bảo vệ quyền, lợi ích hợp pháp, chính đáng của nhân dân",
        "correctAnswer": "1",
        "note": "Điều 10"
      },
      {
        "STT": "60",
        "question": "Theo hiến pháp năm 2013 đâu là hoạt động của tổ chức Công đoàn Việt Nam",
        "category": "Hiến pháp 2013",
        "answerA": "Tham gia quản lý nhà nước, quản lý kinh tế - xã hội; tham gia kiểm tra, thanh tra, giám sát hoạt động của cơ quan nhà nước, tổ chức, đơn vị, doanh nghiệp về những vấn đề liên quan đến quyền, nghĩa vụ của người lao động",
        "answerB": "Tuyên truyền, vận động người lao động học tập, nâng cao trình độ, kỹ năng nghề nghiệp, chấp hành pháp luật, xây dựng và bảo vệ Tổ quốc",
        "answerC": "Đại diện cho người lao động, chăm lo và bảo vệ quyền, lợi ích hợp pháp, chính đáng của người lao động",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "4",
        "note": "Điều 10"
      },
      {
        "STT": "61",
        "question": "Theo hiến pháp năm 2013 đâu là hoạt động của tổ chức Công đoàn Việt Nam",
        "category": "Hiến pháp 2013",
        "answerA": "Đại diện cho người lao động, chăm lo và bảo vệ quyền, lợi ích hợp pháp, chính đáng của người lao động",
        "answerB": "Tham gia quản lý nhà nước, quản lý kinh tế - xã hội; tham gia kiểm tra, thanh tra, giám sát hoạt động của cơ quan nhà nước, tổ chức, đơn vị, doanh nghiệp về những vấn đề liên quan đến quyền, nghĩa vụ của người lao động",
        "answerC": "Tập hợp, phát huy sức mạnh đại đoàn kết toàn dân tộc, thực hiện dân chủ, tăng cường đồng thuận xã hội",
        "answerD": "Cả đáp án 1 và 2 đều đúng",
        "correctAnswer": "4",
        "note": "Điều 10"
      },
      {
        "STT": "62",
        "question": "Theo hiến pháp năm 2013 đâu không phải là hoạt động của tổ chức Công đoàn Việt Nam",
        "category": "Hiến pháp 2013",
        "answerA": "Tham gia quản lý nhà nước, quản lý kinh tế - xã hội; tham gia kiểm tra, thanh tra, giám sát hoạt động của cơ quan nhà nước, tổ chức, đơn vị, doanh nghiệp về những vấn đề liên quan đến quyền, nghĩa vụ của người lao động",
        "answerB": "Tập hợp, phát huy sức mạnh đại đoàn kết toàn dân tộc, thực hiện dân chủ, tăng cường đồng thuận xã hội",
        "answerC": "Tuyên truyền, vận động người lao động học tập, nâng cao trình độ, kỹ năng nghề nghiệp, chấp hành pháp luật, xây dựng và bảo vệ Tổ quốc",
        "answerD": "Cả đáp án 1 và 2 đều đúng",
        "correctAnswer": "2",
        "note": "Điều 10"
      },
      {
        "STT": "63",
        "question": "Theo hiến pháp năm 2013 đâu không phải là hoạt động của tổ chức Công đoàn Việt Nam",
        "category": "Hiến pháp 2013",
        "answerA": "Đại diện, bảo vệ quyền và lợi ích hợp pháp, chính đáng của Nhân dân",
        "answerB": "Đại diện cho người lao động, chăm lo và bảo vệ quyền, lợi ích hợp pháp, chính đáng của người lao động",
        "answerC": "Tuyên truyền, vận động người lao động học tập, nâng cao trình độ, kỹ năng nghề nghiệp, chấp hành pháp luật, xây dựng và bảo vệ Tổ quốc",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "1",
        "note": "Điều 10"
      },
      {
        "STT": "64",
        "question": "Theo hiến pháp năm 2013 Tổ quốc Việt Nam là",
        "category": "Hiến pháp 2013",
        "answerA": "Là thiêng liêng, bất khả xâm phạm",
        "answerB": "Là linh thiêng, bất khả xâm phạm",
        "answerC": "Là của cả dân tộc Việt Nam",
        "answerD": "Cả đáp án 1 và 3 đều đúng",
        "correctAnswer": "1",
        "note": "Điều 11"
      },
      {
        "STT": "65",
        "question": "Theo hiến pháp năm 2013  mọi hành vi chống lại độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ, chống lại sự nghiệp xây dựng và bảo vệ Tổ quốc đều bị",
        "category": "Hiến pháp 2013",
        "answerA": "Pháp luật trừng trị ",
        "answerB": "Pháp luật định tội",
        "answerC": "Nghiêm trị",
        "answerD": "Xử lý theo quy định của pháp luật",
        "correctAnswer": "3",
        "note": "Điều 11"
      },
      {
        "STT": "66",
        "question": "Theo hiến pháp năm 2013 nước cộng hoà xã hội chủ nghĩa Việt Nam thực hiện",
        "category": "Hiến pháp 2013",
        "answerA": "Nhất quán đường lối đối ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển",
        "answerB": "Đa phương hóa, đa dạng hóa quan hệ, chủ động và tích cực hội nhập, hợp tác quốc tế trên cơ sở tôn trọng độc lập, chủ quyền và toàn vẹn lãnh thổ, không can thiệp vào công việc nội bộ của nhau, bình đẳng, cùng có lợi",
        "answerC": "Tuân thủ Hiến chương Liên hợp quốc và điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "4",
        "note": "Điều 12"
      },
      {
        "STT": "67",
        "question": "Theo hiến pháp năm 2013 nước cộng hoà xã hội chủ nghĩa Việt Nam thực hiện",
        "category": "Hiến pháp 2013",
        "answerA": "Là bạn, đối tác tin cậy và thành viên có trách nhiệm trong cộng đồng quốc tế vì lợi ích quốc gia, dân tộc, góp phần vào sự nghiệp hòa bình, độc lập dân tộc, dân chủ và tiến bộ xã hội trên thế giới",
        "answerB": "Đa phương hóa, đa dạng hóa quan hệ, chủ động và tích cực hội nhập, hợp tác quốc tế trên cơ sở tôn trọng độc lập, chủ quyền và toàn vẹn lãnh thổ, không can thiệp vào công việc nội bộ của nhau, bình đẳng, cùng có lợi",
        "answerC": "Nhất quán đường lối đối ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "4",
        "note": "Điều 12"
      },
      {
        "STT": "68",
        "question": "Theo hiến pháp năm 2013 nước cộng hoà xã hội chủ nghĩa Việt Nam thực hiện",
        "category": "Hiến pháp 2013",
        "answerA": "Tuân thủ Hiến chương Liên hợp quốc và điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên",
        "answerB": "Nhất quán đường lối đối ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển",
        "answerC": "Là bạn, đối tác tin cậy và thành viên có trách nhiệm trong cộng đồng quốc tế vì lợi ích quốc gia, dân tộc, góp phần vào sự nghiệp hòa bình, độc lập dân tộc, dân chủ và tiến bộ xã hội trên thế giới",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "4",
        "note": "Điều 12"
      },
      {
        "STT": "69",
        "question": "Theo hiến pháp năm 2013 nước cộng hoà xã hội chủ nghĩa Việt Nam thực hiện",
        "category": "Hiến pháp 2013",
        "answerA": "Tuân thủ Hiến chương Liên hợp quốc và điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên",
        "answerB": "Nhất quán đường lối đối ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển",
        "answerC": "Là bạn, đối tác tin cậy và thành viên có trách nhiệm trong cộng đồng ASEAN vì lợi ích quốc gia, dân tộc, góp phần vào sự nghiệp hòa bình, độc lập dân tộc, dân chủ và tiến bộ xã hội trên thế giới",
        "answerD": "Cả đáp án 1 và 2 đều đúng",
        "correctAnswer": "4",
        "note": "Điều 12"
      },
      {
        "STT": "70",
        "question": "Theo hiến pháp năm 2013 nước cộng hoà xã hội chủ nghĩa Việt Nam thực hiện",
        "category": "Hiến pháp 2013",
        "answerA": "Nhất quán đường lối đối ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển",
        "answerB": "Tuân thủ Hiến pháp Liên hợp quốc và điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên",
        "answerC": "Đa phương hóa, đa dạng hóa quan hệ, chủ động và tích cực hội nhập, hợp tác quốc tế trên cơ sở tôn trọng độc lập, chủ quyền và toàn vẹn lãnh thổ, không can thiệp vào công việc nội bộ của nhau, bình đẳng, cùng có lợi",
        "answerD": "Cả đáp án 1 và 3 đều đúng",
        "correctAnswer": "4",
        "note": "Điều 12"
      },
      {
        "STT": "71",
        "question": "Theo hiến pháp năm 2013 nước cộng hoà xã hội chủ nghĩa Việt Nam thực hiện",
        "category": "Hiến pháp 2013",
        "answerA": "Tuân thủ Hiến pháp Liên hợp quốc và điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên",
        "answerB": "Là bạn, đối tác tin cậy và thành viên có trách nhiệm trong cộng đồng ASEAN vì lợi ích quốc gia, dân tộc, góp phần vào sự nghiệp hòa bình, độc lập dân tộc, dân chủ và tiến bộ xã hội trên thế giới",
        "answerC": "Nhất quán đường lối đối ngoại độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển",
        "answerD": "Cả ba đáp án trên đều đúng",
        "correctAnswer": "3",
        "note": "Điều 12"
      },
      {
        "STT": "72",
        "question": "Theo hiến pháp năm 2013 nước cộng hoà xã hội chủ nghĩa Việt Nam thực hiện",
        "category": "Hiến pháp 2013",
        "answerA": "Đa phương hóa, đa dạng hóa quan hệ, chủ động và tích cực hội nhập, hợp tác quốc tế trên cơ sở tôn trọng độc lập, chủ quyền và toàn vẹn lãnh thổ, không can thiệp vào công việc nội bộ của nhau, bình đẳng, cùng có lợi",
        "answerB": "Là bạn, đối tác tin cậy và thành viên có trách nhiệm trong cộng đồng Liên hợp quốc vì lợi ích quốc gia, dân tộc, góp phần vào sự nghiệp hòa bình, độc lập dân tộc, dân chủ và tiến bộ xã hội trên thế giới",
        "answerC": "Tuân thủ Hiến pháp Liên hợp quốc và điều ước quốc tế mà Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên",
        "answerD": "Cả đáp án 1 và 3 đều đúng",
        "correctAnswer": "1",
        "note": "Điều 12"
      },
      {
        "STT": "73",
        "question": "Theo hiến pháp năm 2013 ý nào sau đây đúng khi  quy định Quốc kỳ nước Cộng hòa xã hội chủ nghĩa Việt Nam ",
        "category": "Hiến pháp 2013",
        "answerA": "Hình chữ nhật",
        "answerB": "Chiều rộng bằng hai phần ba chiều dài",
        "answerC": "Nền đỏ, ở giữa có ngôi sao vàng năm cánh",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 1 Điều 13"
      },
      {
        "STT": "74",
        "question": "Theo hiến pháp năm 2013 ý nào sau đây đúng khi  quy định Quốc kỳ nước Cộng hòa xã hội chủ nghĩa Việt Nam ",
        "category": "Hiến pháp 2013",
        "answerA": "Hình chữ nhật",
        "answerB": "Chiều rộng bằng ba phần hai chiều dài",
        "answerC": "Nền đỏ, ở giữa có ngôi sao vàng năm cánh",
        "answerD": "Cả đáp án 1 và 3 đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 1 Điều 13"
      },
      {
        "STT": "75",
        "question": "Theo hiến pháp năm 2013 ý nào sau đây đúng khi  quy định Quốc kỳ nước Cộng hòa xã hội chủ nghĩa Việt Nam ",
        "category": "Hiến pháp 2013",
        "answerA": "Hình chữ nhật đứng",
        "answerB": "Chiều rộng bằng ba phần hai chiều dài",
        "answerC": "Nền đỏ, ở giữa có ngôi sao vàng năm cánh",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "3",
        "note": "Khoản 1 Điều 13"
      },
      {
        "STT": "76",
        "question": "Theo hiến pháp năm 2013 ý nào sau đây đúng khi  quy định Quốc kỳ nước Cộng hòa xã hội chủ nghĩa Việt Nam ",
        "category": "Hiến pháp 2013",
        "answerA": "Chiều rộng bằng ba phần hai chiều dài",
        "answerB": "Hình chữ nhật",
        "answerC": "Nền đỏ, ở giữa có ngôi sao năm cánh",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "2",
        "note": "Khoản 1 Điều 13"
      },
      {
        "STT": "77",
        "question": "Theo hiến pháp năm 2013 ý nào sau đây đúng khi  quy định Quốc huy nước Cộng hòa xã hội chủ nghĩa Việt Nam",
        "category": "Hiến pháp 2013",
        "answerA": "Hình tròn",
        "answerB": "Nền đỏ, ở giữa có ngôi sao vàng năm cánh, xung quanh có bông lúa",
        "answerC": "Ở dưới có nửa bánh xe răng và dòng chữ Cộng hòa xã hội chủ nghĩa Việt Nam",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 2 Điều 13"
      },
      {
        "STT": "78",
        "question": "Theo hiến pháp năm 2013 ý nào sau đây đúng khi  quy định Quốc huy nước Cộng hòa xã hội chủ nghĩa Việt Nam",
        "category": "Hiến pháp 2013",
        "answerA": "Hình tròn",
        "answerB": "Nền đỏ, ở giữa có ngôi sao năm cánh, xung quanh có bông lúa",
        "answerC": "Ở dưới có nửa bánh xe răng và dòng chữ Cộng hòa xã hội chủ nghĩa Việt Nam",
        "answerD": "Cả đáp án 1 và 3 đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 2 Điều 13"
      },
      {
        "STT": "79",
        "question": "Theo hiến pháp năm 2013 ý nào sau đây đúng khi  quy định Quốc huy nước Cộng hòa xã hội chủ nghĩa Việt Nam",
        "category": "Hiến pháp 2013",
        "answerA": "Hình tròn",
        "answerB": "Nền đỏ, ở giữa có ngôi sao năm cánh, xung quanh có bông lúa",
        "answerC": "Ở dưới có răng bánh xe răng và dòng chữ Cộng hòa xã hội chủ nghĩa Việt Nam",
        "answerD": "Cả ba đán án trên đều đúng",
        "correctAnswer": "1",
        "note": "Khoản 2 Điều 13"
      },
      {
        "STT": "80",
        "question": "Theo hiến pháp năm 2013 ý nào sau đây đúng khi  quy định Quốc huy nước Cộng hòa xã hội chủ nghĩa Việt Nam",
        "category": "Hiến pháp 2013",
        "answerA": "Hình tròn",
        "answerB": "Nền đỏ, ở giữa có ngôi sao vàng năm cánh, xung quanh có bông lúa",
        "answerC": "Ở dưới có răng bánh xe răng và dòng chữ Cộng hòa xã hội chủ nghĩa Việt Nam",
        "answerD": "Cả đáp án 1 và 2 đều đúng",
        "correctAnswer": "4",
        "note": "Khoản 2 Điều 13"
      }
    ];
    const query = queryRunner.manager.createQueryBuilder()
      .insert()
      .into('question')


    let answers = [];
    for (const item of items) {
      const result = await query.values({ question: item.question, note: item.note }).execute();
      const qId = result.raw.insertId;
      answers = [...answers, ...[[
        { answer: item.answerA, questionId: qId, isCorrect: item.correctAnswer === '1' },
        { answer: item.answerB, questionId: qId, isCorrect: item.correctAnswer === '2' },
        { answer: item.answerC, questionId: qId, isCorrect: item.correctAnswer === '3' },
        { answer: item.answerD, questionId: qId, isCorrect: item.correctAnswer === '4' },
      ]]];
    }
    for (const item of answers.flat()) {
      await queryRunner.manager.createQueryBuilder()
        .insert()
        .into('answer')
        .values(item)
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('question');
    await queryRunner.clearTable('answer');
  }

}
