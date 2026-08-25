import snapshot from "./altegio-snapshot.json";
import { serviceTranslations } from "./service-translations";

export type Lang = "ru" | "en" | "vi";
export type Localized = Record<Lang,string>;
export type Service = {id:string;altegioId:number;categoryId:string;name:Localized;description:Localized;price:Localized;duration:number|null;image:string;specialistIds:string[]};
export type Category = {id:string;altegioId:number;groupId:string;name:Localized;note:Localized;image:string};
export type ServiceGroup = {id:string;name:Localized;note:Localized;image:string;categoryIds:string[]};
export type Specialist = {id:string;name:Localized;role:Localized;bio:Localized;image:string;serviceIds:string[];demo:boolean;altegioId?:number;bookable?:boolean};
export type Location = {id:string;name:string;address:string;phone:string;email:string;altegioCompanyId:number;bookingUrl:string;mapUrl:string;telegramUrl:string};

const MEDIA="https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/111003/";
export const brandLogoUrl=MEDIA+"2ae8cc03-27cf-4fc8-a187-507c0d31ea4b.webp";
export const brandTelegramUrl="https://t.me/evo_vn";
const OFFICIAL_BOOKING_COMPANY_ID=1258225;

const groupUi:Record<string,{name:Localized;note:Localized;image:string}>={
  "hair":{name:{ru:"Волосы и барбер",en:"Hair & barber",vi:"Tóc & barber"},note:{ru:"Стрижки, укладки, окрашивание, уходы и барбер-сервис",en:"Cuts, styling, coloring, treatments and barber services",vi:"Cắt, tạo kiểu, nhuộm, chăm sóc tóc và barber"},image:MEDIA+"b6040595-5b9a-4de2-8676-b835b5fbf79c.jpg"},
  "nails":{name:{ru:"Ногти и подология",en:"Nails & podology",vi:"Móng & podology"},note:{ru:"Маникюр, педикюр и профессиональная работа со стопами",en:"Manicure, pedicure and professional foot care",vi:"Manicure, pedicure và chăm sóc bàn chân chuyên sâu"},image:MEDIA+"d0719a5c-c5bf-40b4-a29d-47fd959e0bcd.png"},
  "laser":{name:{ru:"Лазерная эпиляция",en:"Laser hair removal",vi:"Triệt lông laser"},note:{ru:"Женские и мужские зоны, комплексы и все тело",en:"Women’s and men’s zones, combos and full body",vi:"Vùng nữ/nam, combo và toàn thân"},image:MEDIA+"5550bb7b-ccf0-4686-8eb3-ee9ef80db99b.jpg"},
  "brows-pmu":{name:{ru:"Брови, ресницы и PMU",en:"Brows, lashes & PMU",vi:"Chân mày, mi & PMU"},note:{ru:"Оформление, ламинирование, наращивание и перманентный макияж",en:"Shaping, lamination, extensions and permanent makeup",vi:"Tạo dáng, uốn, nối mi và phun xăm thẩm mỹ"},image:MEDIA+"4349a451-6388-4f69-8e82-83b1e70c1f9b.png"},
  "tattoo-body":{name:{ru:"Тату и эстетика тела",en:"Tattoo & body aesthetics",vi:"Tattoo & thẩm mỹ cơ thể"},note:{ru:"Художественные тату, дермопигментация и лазерное удаление",en:"Art tattoos, dermopigmentation and laser removal",vi:"Tattoo nghệ thuật, dermopigmentation và xóa tattoo laser"},image:MEDIA+"93f4a6b9-eaa3-4854-b4fb-05f4ce8d3f54.png"},
  "cosmetology":{name:{ru:"Косметология",en:"Cosmetology",vi:"Thẩm mỹ da"},note:{ru:"Инъекционные, аппаратные и уходовые процедуры",en:"Injectable, device-based and skin-care treatments",vi:"Liệu trình tiêm, công nghệ cao và chăm sóc da"},image:MEDIA+"ffe7d30c-70f2-4ac5-ba21-39f11674f304.png"},
  "massage":{name:{ru:"Массаж",en:"Massage",vi:"Massage"},note:{ru:"Лечебные, спортивные, лимфодренажные и расслабляющие программы",en:"Therapeutic, sports, lymphatic and relaxing massage",vi:"Massage trị liệu, thể thao, dẫn lưu bạch huyết và thư giãn"},image:MEDIA+"eb71391b-8d70-47ec-b769-384fba5e42d3.png"},
  "academy":{name:{ru:"Обучение",en:"Training",vi:"Đào tạo"},note:{ru:"Профессиональные программы EVO",en:"Professional EVO programs",vi:"Chương trình đào tạo chuyên nghiệp EVO"},image:MEDIA+"6d50a4c0-43fa-4bd8-9d52-af2e539e81f6.webp"}
};

const categoryNames:Partial<Record<number,Localized>>={
  13293803:{ru:"Ресницы",en:"Lashes",vi:"Mi"},
  10410331:{ru:"Наращивание ресниц",en:"Lash extensions",vi:"Nối mi"},
  13249483:{ru:"Коррекция перманентного макияжа",en:"Permanent makeup correction",vi:"Chỉnh sửa PMU"},
  13310361:{ru:"Брови",en:"Brows",vi:"Chân mày"},
  13275873:{ru:"Перманентный макияж",en:"Permanent makeup",vi:"Phun xăm thẩm mỹ"},
  13249479:{ru:"Женская эпиляция",en:"Women’s laser hair removal",vi:"Triệt lông laser nữ"},
  13275875:{ru:"Эстетика тела",en:"Body aesthetics",vi:"Thẩm mỹ cơ thể"},
  13249485:{ru:"Мужская эпиляция",en:"Men’s laser hair removal",vi:"Triệt lông laser nam"},
  12262315:{ru:"Педикюр",en:"Pedicure",vi:"Pedicure"},
  12262298:{ru:"Маникюр",en:"Manicure",vi:"Manicure"},
  12262320:{ru:"Стрижки / Укладки",en:"Haircuts / Styling",vi:"Cắt / tạo kiểu tóc"},
  12262322:{ru:"Уходы с укладкой",en:"Hair treatments & styling",vi:"Chăm sóc tóc & tạo kiểu"},
  12262321:{ru:"Дополнительные уходы для волос",en:"Add-on hair treatments",vi:"Chăm sóc tóc bổ sung"},
  12263464:{ru:"Окрашивание / Тонирование",en:"Hair coloring / Toning",vi:"Nhuộm / cân bằng màu tóc"},
  12262316:{ru:"Сложное окрашивание",en:"Complex hair coloring",vi:"Nhuộm tóc kỹ thuật cao"},
  12262318:{ru:"Сложное яркое окрашивание",en:"Creative bright coloring",vi:"Nhuộm màu sáng sáng tạo"},
  12262317:{ru:"AirTouch / Shatush / Total Blond",en:"AirTouch / Shatush / Total Blond",vi:"AirTouch / Shatush / Total Blond"},
  12263463:{ru:"Коррекция Total Blond",en:"Total Blond correction",vi:"Chỉnh Total Blond"},
  12262319:{ru:"Снятие цвета",en:"Hair color removal",vi:"Tẩy màu tóc"},
  12263465:{ru:"Total Blond для мужчин",en:"Total Blond for men",vi:"Total Blond nam"},
  10411306:{ru:"Барбер",en:"Barber",vi:"Barber"},
  13249482:{ru:"Консультация косметолога",en:"Cosmetology consultation",vi:"Tư vấn thẩm mỹ"},
  13275856:{ru:"Биоревитализация",en:"Biorevitalization",vi:"Biorevitalization"},
  13249484:{ru:"Мезотерапия",en:"Mesotherapy",vi:"Mesotherapy"},
  10410407:{ru:"Мезотерапия — дополнительные препараты",en:"Mesotherapy — additional products",vi:"Mesotherapy — sản phẩm bổ sung"},
  13275874:{ru:"Плацентарная терапия",en:"Placental therapy",vi:"Liệu pháp nhau thai"},
  13249481:{ru:"Коллагенотерапия",en:"Collagen therapy",vi:"Liệu pháp collagen"},
  13249480:{ru:"Коллагеностимуляция",en:"Collagen stimulation",vi:"Kích thích collagen"},
  13275871:{ru:"Инфузионная терапия",en:"Infusion therapy",vi:"Liệu pháp truyền dịch"},
  13275870:{ru:"Ботулинотерапия",en:"Botulinum therapy",vi:"Liệu pháp botulinum"},
  13275872:{ru:"Контурная пластика",en:"Contour correction",vi:"Tạo đường nét"},
  13275925:{ru:"Нитевой лифтинг",en:"Thread lifting",vi:"Căng chỉ"},
  13249446:{ru:"Эстетические процедуры",en:"Aesthetic cosmetology",vi:"Thẩm mỹ da"},
  10764912:{ru:"Обучение",en:"Training",vi:"Đào tạo"},
  13073185:{ru:"Подология",en:"Podology",vi:"Podology"},
  11568788:{ru:"Массаж",en:"Massage",vi:"Massage"},
  12892505:{ru:"Удаление тату лазером",en:"Laser tattoo removal",vi:"Xóa tattoo bằng laser"},
  13323823:{ru:"Микроигольчатый RF-лифтинг",en:"Microneedle RF lifting",vi:"RF vi kim"},
  13361493:{ru:"Удаление новообразований",en:"Skin lesion removal",vi:"Loại bỏ tổn thương da"},
  13440628:{ru:"Плазмотерапия",en:"Plasma therapy",vi:"Liệu pháp huyết tương"}
};

const categoryGroup:Record<number,string>={
  13293803:"brows-pmu",10410331:"brows-pmu",13249483:"brows-pmu",13310361:"brows-pmu",13275873:"brows-pmu",
  13249479:"laser",13249485:"laser",
  13275875:"tattoo-body",12892505:"tattoo-body",
  12262315:"nails",12262298:"nails",13073185:"nails",
  12262320:"hair",12262322:"hair",12262321:"hair",12263464:"hair",12262316:"hair",12262318:"hair",12262317:"hair",12263463:"hair",12262319:"hair",12263465:"hair",10411306:"hair",
  13249482:"cosmetology",13275856:"cosmetology",13249484:"cosmetology",10410407:"cosmetology",13275874:"cosmetology",13249481:"cosmetology",13249480:"cosmetology",13275871:"cosmetology",13275870:"cosmetology",13275872:"cosmetology",13275925:"cosmetology",13249446:"cosmetology",13323823:"cosmetology",13361493:"cosmetology",13440628:"cosmetology",
  11568788:"massage",10764912:"academy"
};

const cleanTitle=(value:string)=>value.replace(/^_+/,"").trim();
const fallbackLocalized=(value:string):Localized=>({ru:cleanTitle(value),en:cleanTitle(value),vi:cleanTitle(value)});

const formatPrice=(min:number,max:number,lang:Lang):string=>{
  if(!min&&!max)return lang==="ru"?"Уточнить в EVO":lang==="vi"?"Liên hệ EVO":"Ask EVO";
  const money=(value:number)=>`${new Intl.NumberFormat("vi-VN").format(value*1000)} ₫`;
  if(max>min)return `${money(min)}–${money(max)}`;
  if(min>0&&max===0)return `${lang==="ru"?"от ":lang==="vi"?"từ ":"from "}${money(min)}`;
  return money(min||max);
};

const specialistRole=(position?:string,specialization?:string):Localized=>{
  const source=position||specialization||"Специалист EVO";
  const value=`${position||""} ${specialization||""}`.toLowerCase();
  if(value.includes("врач косметолог"))return {ru:source,en:"Cosmetologist physician",vi:"Bác sĩ thẩm mỹ"};
  if(value.includes("косметолог"))return {ru:source,en:"Cosmetologist",vi:"Chuyên gia thẩm mỹ"};
  if(value.includes("подолог"))return {ru:source,en:"Podologist",vi:"Chuyên gia podology"};
  if(value.includes("барбер"))return {ru:source,en:"Barber",vi:"Barber"};
  if(value.includes("парикмах")||value.includes("стилист"))return {ru:source,en:"Hair stylist",vi:"Chuyên gia tóc"};
  if(value.includes("маник")||value.includes("nail"))return {ru:source,en:"Nail specialist",vi:"Chuyên gia móng"};
  if(value.includes("бров")||value.includes("перманент"))return {ru:source,en:"Brow / PMU specialist",vi:"Chuyên gia chân mày / PMU"};
  if(value.includes("массаж"))return {ru:source,en:"Massage specialist",vi:"Chuyên gia massage"};
  if(value.includes("лазерной эпиляции"))return {ru:source,en:"Laser hair removal specialist",vi:"Chuyên gia triệt lông laser"};
  return {ru:source,en:"EVO specialist",vi:"Chuyên gia EVO"};
};

export const catalogMeta={...snapshot.meta,snapshotStats:snapshot.stats};
export const locations:Location[]=[{
  id:"north",name:snapshot.location.title,address:snapshot.location.address,phone:snapshot.location.phone,
  email:snapshot.location.email||"evo.beauty.space@gmail.com",altegioCompanyId:snapshot.location.id,
  bookingUrl:`https://n1324284.alteg.io/company/${OFFICIAL_BOOKING_COMPANY_ID}/personal/menu?o=`,
  mapUrl:`https://www.google.com/maps/search/?api=1&query=${snapshot.location.lat},${snapshot.location.lon}`,
  telegramUrl:brandTelegramUrl
}];

export const categories:Category[]=snapshot.categories.map(raw=>{
  const groupId=categoryGroup[raw.id]||"cosmetology";
  const group=groupUi[groupId]||groupUi.cosmetology;
  return {
    id:`altegio-${raw.id}`,
    altegioId:raw.id,
    groupId,
    name:categoryNames[raw.id]||fallbackLocalized(raw.title),
    note:group.note,
    image:group.image
  };
});

export const groups:ServiceGroup[]=Object.entries(groupUi).map(([id,value])=>({
  id,...value,categoryIds:categories.filter(category=>category.groupId===id).map(category=>category.id)
})).filter(group=>group.categoryIds.length>0);

const snapshotSpecialistIds=new Set(snapshot.specialists.map(item=>item.id));
const fallbackSpecialistId="evo-online-team";
export const services:Service[]=snapshot.services.map(raw=>{
  const category=categories.find(item=>item.altegioId===raw.categoryId);
  const translated=serviceTranslations[raw.id];
  const official:Localized={ru:cleanTitle(raw.title),en:translated?.en||cleanTitle(raw.title),vi:translated?.vi||cleanTitle(raw.title)};
  const mapped=raw.specialistIds.filter(id=>snapshotSpecialistIds.has(id)).map(id=>`altegio-staff-${id}`);
  return {
    id:`altegio-${raw.id}`,altegioId:raw.id,categoryId:`altegio-${raw.categoryId}`,name:official,
    description:category?.note||{ru:"Услуга EVO",en:"EVO service",vi:"Dịch vụ EVO"},
    price:{ru:formatPrice(raw.priceMin,raw.priceMax,"ru"),en:formatPrice(raw.priceMin,raw.priceMax,"en"),vi:formatPrice(raw.priceMin,raw.priceMax,"vi")},
    duration:raw.durationSeconds?Math.round(raw.durationSeconds/60):null,image:category?.image||groupUi.cosmetology.image,
    specialistIds:mapped.length?mapped:[fallbackSpecialistId]
  };
});

export const specialists:Specialist[]=[...snapshot.specialists.map(raw=>({
  id:`altegio-staff-${raw.id}`,altegioId:raw.id,name:{ru:raw.name,en:raw.name,vi:raw.name},
  role:specialistRole(raw.position,raw.specialization),
  bio:{ru:"Профиль и перечень услуг получены из публичного каталога Altegio EVO NORTH.",en:"Profile and service links are sourced from the public EVO NORTH Altegio catalog.",vi:"Hồ sơ và danh sách dịch vụ được lấy từ danh mục Altegio công khai của EVO NORTH."},
  image:raw.avatar||brandLogoUrl,serviceIds:raw.serviceIds.map(id=>`altegio-${id}`),demo:false,bookable:raw.bookable
})),{
  id:fallbackSpecialistId,name:{ru:"Специалист EVO — выбор при записи",en:"EVO specialist — select when booking",vi:"Chuyên gia EVO — chọn khi đặt lịch"},
  role:{ru:"Официальная онлайн-запись",en:"Official online booking",vi:"Đặt lịch trực tuyến chính thức"},
  bio:{ru:"Для части услуг snapshot Altegio не вернул прямую связь со специалистом. Доступный специалист выбирается в официальной форме EVO.",en:"For some services the Altegio snapshot did not return a direct staff mapping. Choose an available specialist in EVO's official booking form.",vi:"Với một số dịch vụ, snapshot Altegio chưa trả về liên kết trực tiếp với chuyên gia. Hãy chọn chuyên gia khả dụng trong biểu mẫu đặt lịch chính thức của EVO."},
  image:brandLogoUrl,serviceIds:services.filter(service=>service.specialistIds.includes(fallbackSpecialistId)).map(service=>service.id),demo:true,bookable:true
}];

export const getCategory=(id:string)=>categories.find(item=>item.id===id);
export const getGroup=(id:string)=>groups.find(item=>item.id===id);
export const getService=(id:string)=>services.find(item=>item.id===id);
export const getSpecialist=(id:string)=>specialists.find(item=>item.id===id);
