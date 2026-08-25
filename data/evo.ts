import snapshot from "./altegio-snapshot.json";

export type Lang = "ru" | "en" | "vi";
export type Localized = Record<Lang,string>;
export type Service = {id:string;altegioId:number;categoryId:string;name:Localized;description:Localized;price:Localized;duration:number|null;image:string;specialistIds:string[]};
export type Category = {id:string;altegioId:number;name:Localized;note:Localized;image:string};
export type Specialist = {id:string;name:Localized;role:Localized;bio:Localized;image:string;serviceIds:string[];demo:boolean;altegioId?:number;bookable?:boolean};
export type Location = {id:string;name:string;address:string;phone:string;email:string;altegioCompanyId:number;bookingUrl:string;mapUrl:string};

const MEDIA="https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/111003/";
const categoryUi:Record<number,{name:Localized;note:Localized;image:string}>={
  13249482:{name:{ru:"Консультация косметолога",en:"Cosmetology consultation",vi:"Tư vấn thẩm mỹ"},note:{ru:"Оценка состояния кожи и подбор процедур",en:"Skin assessment and treatment planning",vi:"Đánh giá da và lựa chọn liệu trình"},image:MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png"},
  13275856:{name:{ru:"Биоревитализация",en:"Biorevitalization",vi:"Biorevitalization"},note:{ru:"Увлажнение и улучшение качества кожи",en:"Hydration and skin-quality treatments",vi:"Cấp ẩm và cải thiện chất lượng da"},image:MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png"},
  13249484:{name:{ru:"Мезотерапия",en:"Mesotherapy",vi:"Mesotherapy"},note:{ru:"Программы для лица, волос и локальных зон",en:"Programs for face, hair and local areas",vi:"Chương trình cho mặt, tóc và vùng cục bộ"},image:MEDIA+"94d7bd02-6642-4860-81fe-20537e7a0731.webp"},
  13275874:{name:{ru:"Плацентарная терапия",en:"Placental therapy",vi:"Liệu pháp nhau thai"},note:{ru:"Восстановительные программы",en:"Restorative programs",vi:"Chương trình phục hồi"},image:MEDIA+"93f4a6b9-eaa3-4854-b4fb-05f4ce8d3f54.png"},
  13249481:{name:{ru:"Коллагенотерапия",en:"Collagen therapy",vi:"Liệu pháp collagen"},note:{ru:"Процедуры для качества и восстановления кожи",en:"Skin-quality and restorative treatments",vi:"Liệu trình hỗ trợ chất lượng và phục hồi da"},image:MEDIA+"c5f881a9-0318-45df-ade1-933aa68aeea3.png"},
  13249480:{name:{ru:"Коллагеностимуляция",en:"Collagen stimulation",vi:"Kích thích collagen"},note:{ru:"Стимуляция собственного коллагена",en:"Natural collagen stimulation",vi:"Kích thích collagen tự nhiên"},image:MEDIA+"c5f881a9-0318-45df-ade1-933aa68aeea3.png"},
  13275871:{name:{ru:"Инфузионная терапия",en:"Infusion therapy",vi:"Liệu pháp truyền dịch"},note:{ru:"Восстановительные инфузионные программы",en:"Restorative infusion programs",vi:"Chương trình truyền dịch phục hồi"},image:MEDIA+"eb71391b-8d70-47ec-b769-384fba5e42d3.png"},
  13275870:{name:{ru:"Ботулинотерапия",en:"Botulinum therapy",vi:"Liệu pháp botulinum"},note:{ru:"Коррекция мимической активности",en:"Expression-line treatments",vi:"Điều chỉnh hoạt động cơ biểu cảm"},image:MEDIA+"6d50a4c0-43fa-4bd8-9d52-af2e539e81f6.webp"},
  13275872:{name:{ru:"Контурная пластика",en:"Contour correction",vi:"Tạo đường nét"},note:{ru:"Инъекционная коррекция контуров лица",en:"Injectable facial contour correction",vi:"Điều chỉnh đường nét khuôn mặt bằng tiêm"},image:MEDIA+"b6040595-5b9a-4de2-8676-b835b5fbf79c.jpg"},
  13275925:{name:{ru:"Нитевой лифтинг",en:"Thread lifting",vi:"Căng chỉ"},note:{ru:"Нитевые методики лифтинга",en:"Thread-based lifting techniques",vi:"Kỹ thuật nâng cơ bằng chỉ"},image:MEDIA+"4349a451-6388-4f69-8e82-83b1e70c1f9b.png"},
  13249446:{name:{ru:"Эстетические процедуры",en:"Aesthetic cosmetology",vi:"Thẩm mỹ da"},note:{ru:"Уходовые и эстетические процедуры",en:"Professional care and aesthetic treatments",vi:"Chăm sóc da và liệu trình thẩm mỹ"},image:MEDIA+"d0719a5c-c5bf-40b4-a29d-47fd959e0bcd.png"},
  13323823:{name:{ru:"Микроигольчатый RF-лифтинг",en:"Microneedle RF lifting",vi:"RF vi kim"},note:{ru:"RF-процедуры для лица и тела",en:"RF treatments for face and body",vi:"Liệu trình RF cho mặt và cơ thể"},image:MEDIA+"5550bb7b-ccf0-4686-8eb3-ee9ef80db99b.jpg"},
  13440628:{name:{ru:"Плазмотерапия",en:"Plasma therapy",vi:"Liệu pháp huyết tương"},note:{ru:"Плазмотерапия по показаниям специалиста",en:"Plasma therapy when indicated",vi:"Liệu pháp huyết tương theo chỉ định"},image:MEDIA+"93f4a6b9-eaa3-4854-b4fb-05f4ce8d3f54.png"},
  13361493:{name:{ru:"Удаление новообразований",en:"Skin lesion removal",vi:"Loại bỏ tổn thương da"},note:{ru:"После консультации специалиста",en:"After specialist consultation",vi:"Sau khi tư vấn chuyên gia"},image:MEDIA+"d0719a5c-c5bf-40b4-a29d-47fd959e0bcd.png"}
};

const formatPrice=(min:number,max:number,lang:Lang):string=>{
  if(!min&&!max)return lang==="ru"?"Уточнить в EVO":lang==="vi"?"Liên hệ EVO":"Ask EVO";
  const money=(value:number)=>`${new Intl.NumberFormat("vi-VN").format(value*1000)} ₫`;
  if(max>min)return `${money(min)}–${money(max)}`;
  if(min>0&&max===0)return `${lang==="ru"?"от ":lang==="vi"?"từ ":"from "}${money(min)}`;
  return money(min||max);
};

export const catalogMeta={...snapshot.meta,snapshotStats:snapshot.stats};
export const locations:Location[]=[{
  id:"north",name:snapshot.location.title,address:snapshot.location.address,phone:snapshot.location.phone,
  email:snapshot.location.email||"evo.beauty.space@gmail.com",altegioCompanyId:snapshot.location.id,
  bookingUrl:`https://n1324284.alteg.io/company/${snapshot.location.id}/personal/menu?o=`,
  mapUrl:`https://www.google.com/maps/search/?api=1&query=${snapshot.location.lat},${snapshot.location.lon}`
}];

export const categories:Category[]=snapshot.categories.map(raw=>{
  const fallback=categoryUi[raw.id]||{name:{ru:raw.title,en:raw.title,vi:raw.title},note:{ru:"EVO",en:"EVO",vi:"EVO"},image:MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png"};
  return {id:`altegio-${raw.id}`,altegioId:raw.id,...fallback};
});

const snapshotSpecialistIds=new Set(snapshot.specialists.map(item=>item.id));
const fallbackSpecialistId="evo-online-team";
export const services:Service[]=snapshot.services.map(raw=>{
  const category=categoryUi[raw.categoryId];
  const official:Localized={ru:raw.title,en:raw.title,vi:raw.title};
  const mapped=raw.specialistIds.filter(id=>snapshotSpecialistIds.has(id)).map(id=>`altegio-staff-${id}`);
  return {
    id:`altegio-${raw.id}`,altegioId:raw.id,categoryId:`altegio-${raw.categoryId}`,name:official,
    description:category?.note||{ru:"Процедура EVO",en:"EVO treatment",vi:"Dịch vụ EVO"},
    price:{ru:formatPrice(raw.priceMin,raw.priceMax,"ru"),en:formatPrice(raw.priceMin,raw.priceMax,"en"),vi:formatPrice(raw.priceMin,raw.priceMax,"vi")},
    duration:raw.durationSeconds?Math.round(raw.durationSeconds/60):null,image:category?.image||MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png",
    specialistIds:mapped.length?mapped:[fallbackSpecialistId]
  };
});

export const specialists:Specialist[]=[...snapshot.specialists.map(raw=>({
  id:`altegio-staff-${raw.id}`,altegioId:raw.id,name:{ru:raw.name,en:raw.name,vi:raw.name},
  role:{ru:raw.position||raw.specialization||"Специалист EVO",en:raw.specialization||raw.position||"EVO specialist",vi:raw.specialization||raw.position||"Chuyên gia EVO"},
  bio:{ru:"Профиль и перечень процедур получены из публичного каталога Altegio EVO NORTH.",en:"Profile and treatment links are sourced from the public EVO NORTH Altegio catalog.",vi:"Hồ sơ và danh sách dịch vụ được lấy từ danh mục Altegio công khai của EVO NORTH."},
  image:raw.avatar||MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png",serviceIds:raw.serviceIds.map(id=>`altegio-${id}`),demo:false,bookable:raw.bookable
})),{
  id:fallbackSpecialistId,name:{ru:"Специалист EVO — выбор при записи",en:"EVO specialist — select when booking",vi:"Chuyên gia EVO — chọn khi đặt lịch"},
  role:{ru:"Официальная онлайн-запись",en:"Official online booking",vi:"Đặt lịch trực tuyến chính thức"},
  bio:{ru:"Для части процедур snapshot Altegio не вернул прямую связь со специалистом. Доступный специалист выбирается в официальной форме EVO.",en:"For some treatments the Altegio snapshot did not return a direct staff mapping. Choose an available specialist in EVO's official booking form.",vi:"Với một số dịch vụ, snapshot Altegio chưa trả về liên kết trực tiếp với chuyên gia. Hãy chọn chuyên gia khả dụng trong biểu mẫu đặt lịch chính thức của EVO."},
  image:MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png",serviceIds:services.filter(service=>service.specialistIds.includes(fallbackSpecialistId)).map(service=>service.id),demo:true,bookable:true
}];

export const getCategory=(id:string)=>categories.find(item=>item.id===id);
export const getService=(id:string)=>services.find(item=>item.id===id);
export const getSpecialist=(id:string)=>specialists.find(item=>item.id===id);
