const EVO_MEDIA = "https://274418.selcdn.ru/cv08300-33250f0d-0664-43fc-9dbf-9d89738d114e/uploads/111003/";

const services = [
  {
    id: "diagnostics",
    title: { ru: "Консультация косметолога", en: "Cosmetology consultation", vi: "Tư vấn thẩm mỹ" },
    note: { ru: "Подбор процедур под состояние кожи и ваши цели", en: "A treatment plan based on your skin and goals", vi: "Lựa chọn liệu trình theo tình trạng da và mục tiêu" },
    image: `${EVO_MEDIA}ffe7d30c-70f2-4ac5-ba21-39f11674f304.png`,
    items: [{ id: "consultation", name: { ru: "Консультация косметолога", en: "Cosmetology consultation", vi: "Tư vấn thẩm mỹ" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "Знакомство со специалистом и подбор подходящих процедур.", en: "Meet a specialist and choose suitable procedures.", vi: "Trao đổi với chuyên gia và lựa chọn liệu trình phù hợp." }, image: `${EVO_MEDIA}ffe7d30c-70f2-4ac5-ba21-39f11674f304.png` }]
  },
  {
    id: "hygiene",
    title: { ru: "Уход и обновление кожи", en: "Skin care & renewal", vi: "Chăm sóc & tái tạo da" },
    note: { ru: "Чистка лица и пилинг", en: "Facial cleansing and peeling", vi: "Làm sạch da mặt và peel da" },
    image: `${EVO_MEDIA}d0719a5c-c5bf-40b4-a29d-47fd959e0bcd.png`,
    items: [
      { id: "hygiene-adult", name: { ru: "Чистка лица", en: "Facial cleansing", vi: "Làm sạch da mặt" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "Процедура для улучшения цвета лица и более ровного тона кожи.", en: "A procedure aimed at improving complexion and creating a more even skin tone.", vi: "Liệu trình giúp cải thiện sắc da và làm đều màu da." }, image: `${EVO_MEDIA}d0719a5c-c5bf-40b4-a29d-47fd959e0bcd.png` },
      { id: "peeling", name: { ru: "Пилинг", en: "Peeling", vi: "Peel da" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "Обновление верхнего слоя кожи.", en: "Professional skin renewal.", vi: "Chăm sóc tái tạo lớp bề mặt của da." }, image: `${EVO_MEDIA}38ae4394-da85-4a80-9dce-5f04532a737d.jpg` }
    ]
  },
  {
    id: "whitening",
    title: { ru: "Аппаратная косметология", en: "Device-based cosmetology", vi: "Thẩm mỹ công nghệ cao" },
    note: { ru: "SMAS-лифтинг", en: "SMAS lifting", vi: "Nâng cơ SMAS" },
    image: `${EVO_MEDIA}5550bb7b-ccf0-4686-8eb3-ee9ef80db99b.jpg`,
    items: [{ id: "zoom4", name: { ru: "SMAS-лифтинг", en: "SMAS lifting", vi: "Nâng cơ SMAS" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "Аппаратная процедура, которую EVO описывает как способ стимулировать выработку нового коллагена.", en: "A device-based procedure EVO describes as stimulating new collagen production.", vi: "Liệu trình công nghệ cao được EVO mô tả là giúp kích thích sản sinh collagen mới." }, image: `${EVO_MEDIA}5550bb7b-ccf0-4686-8eb3-ee9ef80db99b.jpg` }]
  },
  {
    id: "treatment",
    title: { ru: "Инъекционная косметология", en: "Injectable cosmetology", vi: "Thẩm mỹ tiêm" },
    note: { ru: "Биоревитализация, мезотерапия и ботулинотерапия", en: "Biorevitalization, mesotherapy and botulinum therapy", vi: "Biorevitalization, mesotherapy và botulinum" },
    image: `${EVO_MEDIA}6d50a4c0-43fa-4bd8-9d52-af2e539e81f6.webp`,
    items: [
      { id: "caries", name: { ru: "Биоревитализация", en: "Biorevitalization", vi: "Biorevitalization" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "Процедура для глубокого увлажнения и омоложения кожи.", en: "A procedure for deep hydration and skin rejuvenation.", vi: "Liệu trình cấp ẩm sâu và hỗ trợ trẻ hóa da." }, image: `${EVO_MEDIA}ffe7d30c-70f2-4ac5-ba21-39f11674f304.png` },
      { id: "root-canal", name: { ru: "Мезотерапия", en: "Mesotherapy", vi: "Mesotherapy" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "Процедура для улучшения состояния кожи и омоложения.", en: "A procedure aimed at improving skin condition and rejuvenation.", vi: "Liệu trình nhằm cải thiện tình trạng da và hỗ trợ trẻ hóa." }, image: `${EVO_MEDIA}94d7bd02-6642-4860-81fe-20537e7a0731.webp` },
      { id: "build-up", name: { ru: "Ботулинотерапия", en: "Botulinum therapy", vi: "Liệu pháp botulinum" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "Косметологическая процедура для коррекции мимических морщин.", en: "A cosmetology procedure used to address expression lines.", vi: "Liệu trình thẩm mỹ hỗ trợ xử lý nếp nhăn biểu cảm." }, image: `${EVO_MEDIA}6d50a4c0-43fa-4bd8-9d52-af2e539e81f6.webp` }
    ]
  },
  {
    id: "aesthetics",
    title: { ru: "Контуры и качество кожи", en: "Contours & skin quality", vi: "Đường nét & chất lượng da" },
    note: { ru: "Контурная пластика и коллагеностимуляция", en: "Contour correction and collagen stimulation", vi: "Tạo đường nét và kích thích collagen" },
    image: `${EVO_MEDIA}b6040595-5b9a-4de2-8676-b835b5fbf79c.jpg`,
    items: [
      { id: "veneer-crown", name: { ru: "Контурная пластика", en: "Contour correction", vi: "Tạo đường nét" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "Процедура для гармонизации пропорций лица по индивидуальному плану специалиста.", en: "A procedure aimed at harmonizing facial proportions with an individualized specialist plan.", vi: "Liệu trình nhằm hài hòa tỷ lệ khuôn mặt theo kế hoạch cá nhân của chuyên gia." }, image: `${EVO_MEDIA}b6040595-5b9a-4de2-8676-b835b5fbf79c.jpg` },
      { id: "digital-smile", name: { ru: "Коллагеностимуляция", en: "Collagen stimulation", vi: "Kích thích collagen" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "Процедуры, направленные на стимуляцию естественной выработки коллагена.", en: "Procedures aimed at supporting the skin's natural collagen production.", vi: "Liệu trình hướng tới kích thích quá trình sản sinh collagen tự nhiên của da." }, image: `${EVO_MEDIA}c5f881a9-0318-45df-ade1-933aa68aeea3.png` }
    ]
  },
  {
    id: "surgery",
    title: { ru: "Нитевой лифтинг", en: "Thread lifting", vi: "Căng chỉ" },
    note: { ru: "Каркас и стимуляция коллагена", en: "Support structure and collagen stimulation", vi: "Tạo khung nâng đỡ và kích thích collagen" },
    image: `${EVO_MEDIA}4349a451-6388-4f69-8e82-83b1e70c1f9b.png`,
    items: [{ id: "implantation", name: { ru: "Нитевой лифтинг", en: "Thread lifting", vi: "Căng chỉ" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "Процедура для создания поддерживающего каркаса и стимуляции коллагена.", en: "A procedure designed to create a supporting framework and stimulate collagen.", vi: "Liệu trình nhằm tạo khung nâng đỡ và kích thích collagen." }, image: `${EVO_MEDIA}4349a451-6388-4f69-8e82-83b1e70c1f9b.png` }]
  },
  {
    id: "kids",
    title: { ru: "Восстановительные программы", en: "Restorative programs", vi: "Chương trình phục hồi" },
    note: { ru: "Плацентарная и инфузионная терапия", en: "Placental and infusion therapy", vi: "Liệu pháp nhau thai và truyền dịch" },
    image: `${EVO_MEDIA}93f4a6b9-eaa3-4854-b4fb-05f4ce8d3f54.png`,
    items: [
      { id: "kids-hygiene", name: { ru: "Плацентарная терапия", en: "Placental therapy", vi: "Liệu pháp nhau thai" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "EVO представляет эту процедуру как программу для стимуляции регенерации тканей.", en: "EVO presents this procedure as a program intended to support tissue regeneration.", vi: "EVO giới thiệu liệu trình này nhằm hỗ trợ quá trình tái tạo mô." }, image: `${EVO_MEDIA}93f4a6b9-eaa3-4854-b4fb-05f4ce8d3f54.png` },
      { id: "kids-caries", name: { ru: "Инфузионная терапия", en: "Infusion therapy", vi: "Liệu pháp truyền dịch" }, price: { ru: "Уточнить в EVO", en: "Ask EVO", vi: "Liên hệ EVO" }, desc: { ru: "EVO описывает направление как программу для восстановления баланса веществ.", en: "EVO describes this service as a program aimed at restoring nutrient balance.", vi: "EVO mô tả dịch vụ này là chương trình hỗ trợ khôi phục cân bằng các chất." }, image: `${EVO_MEDIA}eb71391b-8d70-47ec-b769-384fba5e42d3.png` }
    ]
  }
];

const translations = {
  ru: { nav: { home: "Главная", services: "Услуги", booking: "Запись", ai: "ИИ", profile: "Профиль" }, common: { book: "Записаться", details: "Подробнее", back: "Назад", next: "Продолжить", choose: "Выбрать", ask: "Спросить ИИ" }, home: { title: "Косметология EVO в Нячанге", lead: "Профессиональная косметология и эстетические процедуры в понятном мобильном формате.", open: "Запись доступна", quickServices: "Услуги косметологии", quickDoctors: "Наши специалисты", quickAI: "Спросить ИИ", popular: "Популярные процедуры", first: "Первый визит", consult: "Консультация косметолога", online: "Онлайн", clinic: "В EVO" }, services: { title: "Услуги косметологии", subtitle: "Выберите направление и откройте интересующую процедуру. Актуальную стоимость уточняйте у EVO.", featured: "SMAS-лифтинг", featuredNote: "Аппаратная процедура в направлении косметологии EVO" }, booking: { title: "Запись на процедуру", service: "Выберите услугу", doctor: "Выберите специалиста", date: "Выберите дату и время", contact: "Контактные данные", confirm: "Проверьте запись", success: "Демо-запись создана", demo: "Это технический прототип: запись сохраняется в демо-режиме и пока не отправляется в EVO." }, ai: { title: "ИИ-консультант", subtitle: "Поможет сориентироваться в направлениях EVO. Персональные медицинские рекомендации даст специалист на консультации.", placeholder: "Напишите вопрос…" }, profile: { title: "Профиль", upcoming: "Будущие записи", settings: "Настройки" }, doctors: { title: "Специалисты", subtitle: "Пока показаны направления специалистов без вымышленных имён. Реальные профили можно подключить после согласования с EVO." }, admin: { title: "Демо-админка", subtitle: "Сохранена структура управления MiniApp. Данные сейчас демонстрационные." } },
  en: { nav: { home: "Home", services: "Services", booking: "Book", ai: "AI", profile: "Profile" }, common: { book: "Book", details: "Details", back: "Back", next: "Continue", choose: "Choose", ask: "Ask AI" }, home: { title: "EVO cosmetology in Nha Trang", lead: "Professional cosmetology and aesthetic procedures in a clear mobile format.", open: "Booking available", quickServices: "Cosmetology services", quickDoctors: "Our specialists", quickAI: "Ask AI", popular: "Popular procedures", first: "First visit", consult: "Cosmetology consultation", online: "Online", clinic: "At EVO" }, services: { title: "Cosmetology services", subtitle: "Choose a category and open a procedure. Confirm current pricing directly with EVO.", featured: "SMAS lifting", featuredNote: "A device-based procedure in EVO's cosmetology service line" }, booking: { title: "Book a procedure", service: "Choose a service", doctor: "Choose a specialist", date: "Choose date and time", contact: "Contact details", confirm: "Review appointment", success: "Demo appointment created", demo: "This is a technical prototype: the appointment stays in demo mode and is not sent to EVO yet." }, ai: { title: "AI assistant", subtitle: "Helps navigate EVO service areas. A specialist will provide individualized medical guidance during consultation.", placeholder: "Type your question…" }, profile: { title: "Profile", upcoming: "Upcoming appointments", settings: "Settings" }, doctors: { title: "Specialists", subtitle: "The demo shows specialist roles without invented names. Real profiles can be added after EVO approval." }, admin: { title: "Demo admin", subtitle: "The MiniApp management structure is preserved. Data is currently demonstrational." } },
  vi: { nav: { home: "Trang chủ", services: "Dịch vụ", booking: "Đặt lịch", ai: "AI", profile: "Hồ sơ" }, common: { book: "Đặt lịch", details: "Chi tiết", back: "Quay lại", next: "Tiếp tục", choose: "Chọn", ask: "Hỏi AI" }, home: { title: "Thẩm mỹ EVO tại Nha Trang", lead: "Các dịch vụ thẩm mỹ và chăm sóc chuyên nghiệp trong một giao diện di động rõ ràng.", open: "Có thể đặt lịch", quickServices: "Dịch vụ thẩm mỹ", quickDoctors: "Chuyên gia", quickAI: "Hỏi AI", popular: "Liệu trình nổi bật", first: "Lần đầu", consult: "Tư vấn thẩm mỹ", online: "Trực tuyến", clinic: "Tại EVO" }, services: { title: "Dịch vụ thẩm mỹ", subtitle: "Chọn nhóm và mở liệu trình. Vui lòng xác nhận giá hiện tại trực tiếp với EVO.", featured: "Nâng cơ SMAS", featuredNote: "Liệu trình công nghệ cao trong nhóm thẩm mỹ của EVO" }, booking: { title: "Đặt lịch liệu trình", service: "Chọn dịch vụ", doctor: "Chọn chuyên gia", date: "Chọn ngày và giờ", contact: "Thông tin liên hệ", confirm: "Kiểm tra lịch hẹn", success: "Đã tạo lịch hẹn demo", demo: "Đây là nguyên mẫu kỹ thuật: lịch hẹn đang ở chế độ demo và chưa gửi đến EVO." }, ai: { title: "Trợ lý AI", subtitle: "Giúp định hướng các nhóm dịch vụ EVO. Tư vấn y khoa cá nhân sẽ do chuyên gia thực hiện khi thăm khám.", placeholder: "Nhập câu hỏi…" }, profile: { title: "Hồ sơ", upcoming: "Lịch hẹn sắp tới", settings: "Cài đặt" }, doctors: { title: "Chuyên gia", subtitle: "Bản demo hiển thị vai trò chuyên gia mà không tạo tên giả. Hồ sơ thật có thể thêm sau khi EVO xác nhận." }, admin: { title: "Quản trị demo", subtitle: "Giữ nguyên cấu trúc quản lý MiniApp. Dữ liệu hiện là minh họa." } }
};

const doctors = [
  { id: "therapy", title: { ru: "Специалист по косметологии", en: "Cosmetology specialist", vi: "Chuyên gia thẩm mỹ" }, note: { ru: "Консультации, уходовые, инъекционные и восстановительные процедуры", en: "Consultations, skin care, injectable and restorative procedures", vi: "Tư vấn, chăm sóc da, liệu trình tiêm và phục hồi" }, image: `${EVO_MEDIA}94d7bd02-6642-4860-81fe-20537e7a0731.webp`, tags: ["Косметология", "Уход", "Инъекции"] },
  { id: "aesthetic", title: { ru: "Специалист по эстетическим методикам", en: "Aesthetic procedures specialist", vi: "Chuyên gia thẩm mỹ chuyên sâu" }, note: { ru: "SMAS-лифтинг, контурная пластика и коллагеностимуляция", en: "SMAS lifting, contour correction and collagen stimulation", vi: "Nâng cơ SMAS, tạo đường nét và kích thích collagen" }, image: `${EVO_MEDIA}5550bb7b-ccf0-4686-8eb3-ee9ef80db99b.jpg`, tags: ["SMAS", "Контуры", "Коллаген"] },
  { id: "surgery", title: { ru: "Специалист по нитевым методикам", en: "Thread lifting specialist", vi: "Chuyên gia căng chỉ" }, note: { ru: "Нитевой лифтинг и индивидуальный подбор методики", en: "Thread lifting and individualized method selection", vi: "Căng chỉ và lựa chọn phương pháp phù hợp" }, image: `${EVO_MEDIA}4349a451-6388-4f69-8e82-83b1e70c1f9b.png`, tags: ["Нитевой лифтинг", "Лифтинг"] }
];

const assets = { "clinic-clean.jpg": `${EVO_MEDIA}ffe7d30c-70f2-4ac5-ba21-39f11674f304.png`, "consultation.jpg": `${EVO_MEDIA}ffe7d30c-70f2-4ac5-ba21-39f11674f304.png`, "team.jpg": `${EVO_MEDIA}94d7bd02-6642-4860-81fe-20537e7a0731.webp` };
const asset = (name) => !name ? `${EVO_MEDIA}ffe7d30c-70f2-4ac5-ba21-39f11674f304.png` : (name.startsWith("/") || /^https?:\/\//i.test(name) ? name : assets[name] || `${EVO_MEDIA}ffe7d30c-70f2-4ac5-ba21-39f11674f304.png`);

export { services, translations, doctors, asset };
