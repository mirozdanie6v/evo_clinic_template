import { expect, test } from "@playwright/test";

async function openRu(page:any){
  const errors:string[]=[];
  page.on("console",(message:any)=>{if(message.type()==="error")errors.push(message.text())});
  page.on("pageerror",(error:any)=>errors.push(error.message));
  await page.goto("/");
  await page.evaluate(()=>localStorage.setItem("evo-lang","ru"));
  await page.reload();
  await expect(page.getByTestId("topbar")).toBeVisible();
  await expect(page.locator(".bottomNav")).toContainText("Услуги");
  return errors;
}

test("home is mobile-safe and exposes full EVO directions and official contacts", async ({page})=>{
  const errors=await openRu(page);
  await expect(page.locator(".brandLogo")).toHaveAttribute("src",/2ae8cc03-27cf-4fc8-a187-507c0d31ea4b/);
  await expect(page.getByTestId("service-group-grid")).toContainText("Волосы и барбер");
  await expect(page.getByTestId("service-group-grid")).toContainText("Ногти и подология");
  await expect(page.getByTestId("service-group-grid")).toContainText("Тату и эстетика тела");
  await expect(page.getByRole("link",{name:/@evo_vn/})).toBeVisible();
  await expect(page.getByRole("link",{name:"Altegio"})).toHaveAttribute("href",/company\/1258225\/personal\/menu/);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});

test("full catalog filters hair, nails, tattoo and searches RU EN", async ({page})=>{
  const errors=await openRu(page);
  await page.locator(".bottomNav button").nth(1).click();
  const search=page.getByTestId("service-search");
  await expect(search).toHaveAttribute("placeholder","Поиск по 257 услугам");

  await page.getByTestId("group-filter").getByRole("button",{name:"Волосы и барбер"}).click();
  await search.fill("AirTouch");
  await expect(page.getByText(/AirTouch \/ Shatush/).first()).toBeVisible();

  await search.fill("");
  await page.getByTestId("group-filter").getByRole("button",{name:"Ногти и подология"}).click();
  await expect(page.getByText("Маникюр",{exact:true}).first()).toBeVisible();
  await expect(page.getByText("Подология",{exact:true}).first()).toBeVisible();

  await page.getByTestId("group-filter").getByRole("button",{name:"Тату и эстетика тела"}).click();
  await search.fill("тату");
  await expect(page.getByText(/Художественная татуировка/).first()).toBeVisible();
  await expect(page.getByText(/Удаление тату лазером/).first()).toBeVisible();

  await page.getByTestId("group-filter").getByRole("button",{name:"Косметология"}).click();
  await search.fill("Ботокс");
  await expect(page.getByText("Ботокс Full Face",{exact:true})).toBeVisible();
  await page.getByRole("button",{name:"EN"}).click();
  await expect(search).toHaveAttribute("placeholder","Search 257 services");
  await search.fill("forehead");
  await expect(page.getByText("Botulinum therapy — forehead",{exact:true})).toBeVisible();
  expect(errors).toEqual([]);
});

test("demo booking survives through profile with full catalog enabled", async ({page})=>{
  const errors=await openRu(page);
  await page.locator(".bottomNav button").nth(2).click();
  await expect(page.getByTestId("booking-group-filter")).toContainText("Волосы и барбер");
  await expect(page.getByTestId("booking-group-filter")).toContainText("Косметология");
  await page.getByTestId("booking-search").fill("Hyaron");
  await page.getByTestId("booking-service-list").getByRole("button",{name:/Hyaron/}).click();
  await page.locator(".dateGrid button").first().click();
  await page.locator(".timeGrid button").first().click();
  await page.getByLabel("Имя").fill("EVO Test");
  await page.getByLabel("Телефон / Telegram").fill("+84900000000");
  await page.getByLabel("Email").fill("e2e@example.com");
  await page.getByRole("button",{name:"Продолжить"}).click();
  await page.getByRole("button",{name:"Создать демо-запись"}).click();
  await expect(page.getByText("Демо-запись создана",{exact:true})).toBeVisible();
  await page.locator(".successCard").getByRole("button",{name:"Профиль",exact:true}).click();
  await expect(page.getByText("Hyaron",{exact:true})).toBeVisible();
  await expect(page.getByText("EVO Test",{exact:true})).toBeVisible();
  expect(errors).toEqual([]);
});

test("manual language selection persists after reload", async ({page})=>{
  const errors=await openRu(page);
  await page.getByRole("button",{name:"VI"}).click();
  await expect(page.locator(".bottomNav")).toContainText("Dịch vụ");
  await page.reload();
  await expect(page.locator(".bottomNav")).toContainText("Dịch vụ");
  await expect(page.locator("html")).toHaveAttribute("lang","vi");
  expect(errors).toEqual([]);
});
