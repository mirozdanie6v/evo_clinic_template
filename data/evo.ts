export type Lang = "ru" | "en" | "vi";
export type Localized = Record<Lang, string>;

export type Service = {
  id: string;
  categoryId: string;
  name: Localized;
  description: Localized;
  price: Localized;
  duration: number;
  image: string;
  specialistIds: string[];
  altegioId?: number;
};

export type Category = {
  id: string;
  name: Localized;
  note: Localized;
  image: string;
};

export type Specialist = {
  id: string;
  name: Localized;
  role: Localized;
  bio: Localized;
  image: string;
  serviceIds: string[];
  demo: boolean;
  altegioId?: number;
};

export type Location = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  altegioCompanyId: number;
  bookingUrl: string;
  mapUrl: string;
};

const MEDIA = "https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/111003/";

export const locations: Location[] = [
  {
    id: "bac-son",
    name: "EVO Beauty Space · Bắc Sơn",
    address: "40 Đ. Bắc Sơn, Vĩnh Hải, Nha Trang",
    phone: "+84 905 080 200",
    email: "evo.beauty.space@gmail.com",
    altegioCompanyId: 1258225,
    bookingUrl: "https://n1324284.alteg.io/company/1258225/personal/menu?o=",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=40%20Bac%20Son%20Nha%20Trang"
  }
];

export const categories: Category[] = [
  {id:"consult",name:{ru:"Консультация",en:"Consultation",vi:"Tư vấn"},note:{ru:"Подбор процедур под состояние кожи и цели",en:"A treatment plan for your skin and goals",vi:"Lựa chọn liệu trình theo tình trạng da và mục tiêu"},image:MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png"},
  {id:"skin",name:{ru:"Уход и обновление кожи",en:"Skin care & renewal",vi:"Chăm sóc & tái tạo da"},note:{ru:"Чистка и пилинг",en:"Cleansing and peeling",vi:"Làm sạch và peel da"},image:MEDIA+"d0719a5c-c5bf-40b4-a29d-47fd959e0bcd.png"},
  {id:"device",name:{ru:"Аппаратная косметология",en:"Device cosmetology",vi:"Thẩm mỹ công nghệ cao"},note:{ru:"SMAS-лифтинг",en:"SMAS lifting",vi:"Nâng cơ SMAS"},image:MEDIA+"5550bb7b-ccf0-4686-8eb3-ee9ef80db99b.jpg"},
  {id:"inject",name:{ru:"Инъекционная косметология",en:"Injectable cosmetology",vi:"Thẩm mỹ tiêm"},note:{ru:"Биоревитализация, мезотерапия, ботулинотерапия",en:"Biorevitalization, mesotherapy, botulinum",vi:"Biorevitalization, mesotherapy, botulinum"},image:MEDIA+"6d50a4c0-43fa-4bd8-9d52-af2e539e81f6.webp"},
  {id:"contour",name:{ru:"Контуры и качество кожи",en:"Contours & skin quality",vi:"Đường nét & chất lượng da"},note:{ru:"Контурная пластика и коллагеностимуляция",en:"Contour correction & collagen stimulation",vi:"Tạo đường nét & kích thích collagen"},image:MEDIA+"b6040595-5b9a-4de2-8676-b835b5fbf79c.jpg"},
  {id:"threads",name:{ru:"Нитевой лифтинг",en:"Thread lifting",vi:"Căng chỉ"},note:{ru:"Поддерживающий каркас и стимуляция коллагена",en:"Support structure and collagen stimulation",vi:"Tạo khung nâng đỡ và kích thích collagen"},image:MEDIA+"4349a451-6388-4f69-8e82-83b1e70c1f9b.png"},
  {id:"restore",name:{ru:"Восстановительные программы",en:"Restorative programs",vi:"Chương trình phục hồi"},note:{ru:"Плацентарная и инфузионная терапия",en:"Placental & infusion therapy",vi:"Liệu pháp nhau thai & truyền dịch"},image:MEDIA+"93f4a6b9-eaa3-4854-b4fb-05f4ce8d3f54.png"}
];

const askPrice: Localized = {ru:"Уточнить в EVO",en:"Ask EVO",vi:"Liên hệ EVO"};

export const services: Service[] = [
  {id:"consultation",categoryId:"consult",name:{ru:"Консультация косметолога",en:"Cosmetology consultation",vi:"Tư vấn thẩm mỹ"},description:{ru:"Оценка состояния кожи, целей и противопоказаний с подбором подходящих процедур.",en:"Assessment of skin condition, goals and contraindications with a suitable treatment plan.",vi:"Đánh giá tình trạng da, mục tiêu và chống chỉ định để lựa chọn liệu trình phù hợp."},price:askPrice,duration:45,image:MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png",specialistIds:["skin-expert","aesthetic-expert"]},
  {id:"facial-cleansing",categoryId:"skin",name:{ru:"Чистка лица",en:"Facial cleansing",vi:"Làm sạch da mặt"},description:{ru:"Профессиональное очищение кожи для более ровного тона и текстуры.",en:"Professional cleansing for a more even skin tone and texture.",vi:"Làm sạch chuyên sâu giúp da đều màu và mịn hơn."},price:askPrice,duration:90,image:MEDIA+"d0719a5c-c5bf-40b4-a29d-47fd959e0bcd.png",specialistIds:["skin-expert"]},
  {id:"peeling",categoryId:"skin",name:{ru:"Пилинг",en:"Peeling",vi:"Peel da"},description:{ru:"Профессиональное обновление поверхностных слоёв кожи по показаниям.",en:"Professional renewal of superficial skin layers when indicated.",vi:"Tái tạo lớp bề mặt da theo chỉ định."},price:askPrice,duration:60,image:MEDIA+"38ae4394-da85-4a80-9dce-5f04532a737d.jpg",specialistIds:["skin-expert"]},
  {id:"smas",categoryId:"device",name:{ru:"SMAS-лифтинг",en:"SMAS lifting",vi:"Nâng cơ SMAS"},description:{ru:"Аппаратная процедура, которую EVO использует в программах лифтинга и стимуляции коллагена.",en:"A device-based procedure used by EVO for lifting and collagen stimulation programs.",vi:"Liệu trình công nghệ cao được EVO sử dụng trong chương trình nâng cơ và kích thích collagen."},price:askPrice,duration:90,image:MEDIA+"5550bb7b-ccf0-4686-8eb3-ee9ef80db99b.jpg",specialistIds:["device-expert","aesthetic-expert"]},
  {id:"biorevitalization",categoryId:"inject",name:{ru:"Биоревитализация",en:"Biorevitalization",vi:"Biorevitalization"},description:{ru:"Инъекционная процедура для увлажнения и улучшения качества кожи.",en:"An injectable procedure aimed at hydration and skin-quality improvement.",vi:"Liệu trình tiêm hỗ trợ cấp ẩm và cải thiện chất lượng da."},price:askPrice,duration:60,image:MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png",specialistIds:["aesthetic-expert"]},
  {id:"mesotherapy",categoryId:"inject",name:{ru:"Мезотерапия",en:"Mesotherapy",vi:"Mesotherapy"},description:{ru:"Инъекционная процедура для улучшения состояния кожи по индивидуальным показаниям.",en:"An injectable treatment for improving skin condition based on individual indications.",vi:"Liệu trình tiêm hỗ trợ cải thiện tình trạng da theo chỉ định cá nhân."},price:askPrice,duration:60,image:MEDIA+"94d7bd02-6642-4860-81fe-20537e7a0731.webp",specialistIds:["aesthetic-expert"]},
  {id:"botulinum",categoryId:"inject",name:{ru:"Ботулинотерапия",en:"Botulinum therapy",vi:"Liệu pháp botulinum"},description:{ru:"Процедура для коррекции мимической активности после консультации специалиста.",en:"A procedure for addressing expression activity after specialist consultation.",vi:"Liệu trình hỗ trợ xử lý hoạt động cơ biểu cảm sau khi tư vấn chuyên gia."},price:askPrice,duration:45,image:MEDIA+"6d50a4c0-43fa-4bd8-9d52-af2e539e81f6.webp",specialistIds:["aesthetic-expert"]},
  {id:"contour-correction",categoryId:"contour",name:{ru:"Контурная пластика",en:"Contour correction",vi:"Tạo đường nét"},description:{ru:"Гармонизация пропорций лица по индивидуальному плану специалиста.",en:"Facial proportion harmonization according to an individualized specialist plan.",vi:"Hài hòa tỷ lệ khuôn mặt theo kế hoạch cá nhân của chuyên gia."},price:askPrice,duration:60,image:MEDIA+"b6040595-5b9a-4de2-8676-b835b5fbf79c.jpg",specialistIds:["aesthetic-expert"]},
  {id:"collagen",categoryId:"contour",name:{ru:"Коллагеностимуляция",en:"Collagen stimulation",vi:"Kích thích collagen"},description:{ru:"Процедуры, направленные на поддержку естественной выработки коллагена.",en:"Procedures aimed at supporting natural collagen production.",vi:"Liệu trình hỗ trợ quá trình sản sinh collagen tự nhiên."},price:askPrice,duration:60,image:MEDIA+"c5f881a9-0318-45df-ade1-933aa68aeea3.png",specialistIds:["aesthetic-expert"]},
  {id:"thread-lifting",categoryId:"threads",name:{ru:"Нитевой лифтинг",en:"Thread lifting",vi:"Căng chỉ"},description:{ru:"Создание поддерживающего каркаса и стимуляция коллагена по показаниям.",en:"Creation of a support framework and collagen stimulation when indicated.",vi:"Tạo khung nâng đỡ và kích thích collagen theo chỉ định."},price:askPrice,duration:90,image:MEDIA+"4349a451-6388-4f69-8e82-83b1e70c1f9b.png",specialistIds:["thread-expert"]},
  {id:"placental",categoryId:"restore",name:{ru:"Плацентарная терапия",en:"Placental therapy",vi:"Liệu pháp nhau thai"},description:{ru:"Восстановительная программа, представленная EVO как поддержка процессов регенерации.",en:"A restorative program presented by EVO as supporting regeneration processes.",vi:"Chương trình phục hồi được EVO giới thiệu nhằm hỗ trợ quá trình tái tạo."},price:askPrice,duration:60,image:MEDIA+"93f4a6b9-eaa3-4854-b4fb-05f4ce8d3f54.png",specialistIds:["skin-expert","aesthetic-expert"]},
  {id:"infusion",categoryId:"restore",name:{ru:"Инфузионная терапия",en:"Infusion therapy",vi:"Liệu pháp truyền dịch"},description:{ru:"Восстановительная программа, которую EVO описывает как поддержку баланса веществ.",en:"A restorative program EVO describes as supporting nutrient balance.",vi:"Chương trình phục hồi được EVO mô tả là hỗ trợ cân bằng dưỡng chất."},price:askPrice,duration:60,image:MEDIA+"eb71391b-8d70-47ec-b769-384fba5e42d3.png",specialistIds:["aesthetic-expert"]}
];

export const specialists: Specialist[] = [
  {id:"skin-expert",name:{ru:"Специалист EVO · уход за кожей",en:"EVO specialist · skin care",vi:"Chuyên gia EVO · chăm sóc da"},role:{ru:"Косметология и уход",en:"Cosmetology & skin care",vi:"Thẩm mỹ & chăm sóc da"},bio:{ru:"Демо-карточка до синхронизации имён и профилей специалистов из Altegio.",en:"Demo profile until specialist names and profiles are synchronized from Altegio.",vi:"Hồ sơ demo cho đến khi đồng bộ tên và hồ sơ chuyên gia từ Altegio."},image:MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png",serviceIds:["consultation","facial-cleansing","peeling","placental"],demo:true},
  {id:"device-expert",name:{ru:"Специалист EVO · аппаратные процедуры",en:"EVO specialist · device treatments",vi:"Chuyên gia EVO · công nghệ cao"},role:{ru:"Аппаратная косметология",en:"Device cosmetology",vi:"Thẩm mỹ công nghệ cao"},bio:{ru:"Демо-карточка; реальные данные должны прийти из Altegio.",en:"Demo profile; real data should come from Altegio.",vi:"Hồ sơ demo; dữ liệu thực sẽ lấy từ Altegio."},image:MEDIA+"5550bb7b-ccf0-4686-8eb3-ee9ef80db99b.jpg",serviceIds:["smas"],demo:true},
  {id:"aesthetic-expert",name:{ru:"Специалист EVO · эстетическая косметология",en:"EVO specialist · aesthetic cosmetology",vi:"Chuyên gia EVO · thẩm mỹ"},role:{ru:"Инъекционные и эстетические процедуры",en:"Injectable & aesthetic procedures",vi:"Thẩm mỹ tiêm & thủ thuật thẩm mỹ"},bio:{ru:"Демо-карточка; реальные данные должны прийти из Altegio.",en:"Demo profile; real data should come from Altegio.",vi:"Hồ sơ demo; dữ liệu thực sẽ lấy từ Altegio."},image:MEDIA+"6d50a4c0-43fa-4bd8-9d52-af2e539e81f6.webp",serviceIds:["consultation","smas","biorevitalization","mesotherapy","botulinum","contour-correction","collagen","placental","infusion"],demo:true},
  {id:"thread-expert",name:{ru:"Специалист EVO · нитевой лифтинг",en:"EVO specialist · thread lifting",vi:"Chuyên gia EVO · căng chỉ"},role:{ru:"Нитевой лифтинг",en:"Thread lifting",vi:"Căng chỉ"},bio:{ru:"Демо-карточка; реальные данные должны прийти из Altegio.",en:"Demo profile; real data should come from Altegio.",vi:"Hồ sơ demo; dữ liệu thực sẽ lấy từ Altegio."},image:MEDIA+"4349a451-6388-4f69-8e82-83b1e70c1f9b.png",serviceIds:["thread-lifting"],demo:true}
];

export const getCategory = (id:string) => categories.find(x=>x.id===id);
export const getService = (id:string) => services.find(x=>x.id===id);
export const getSpecialist = (id:string) => specialists.find(x=>x.id===id);
