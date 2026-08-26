import {expect,test} from '@playwright/test';

test('EVO demo AI preset question leads to recommendations and booking',async({page})=>{
 const errors:string[]=[];page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await page.getByRole('button',{name:/AI|ИИ|Tư vấn/i}).last().click();
 await expect(page.getByTestId('demo-ai')).toBeVisible();
 await page.getByTestId('ai-question-hair-color').click();
 await expect(page.getByTestId('ai-recommendations')).toBeVisible();
 await page.locator('[data-testid^="ai-book-"]').first().click();
 await expect(page.getByText('EVO BOOKING')).toBeVisible();
 await expect(page.getByText(/Выберите специалиста|Choose a specialist|Chọn chuyên gia|Выберите дату|Choose a date|Chọn ngày/).first()).toBeVisible();
 expect(errors).toEqual([]);
});

test('EVO demo admin supports local status, client card and broadcast',async({page})=>{
 const errors:string[]=[];page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await page.getByRole('button',{name:/Профиль|Profile|Hồ sơ/}).click();
 await page.getByRole('button',{name:/Demo Admin|Демо-админ|Quản trị demo/i}).click();
 await expect(page.getByTestId('demo-admin')).toBeVisible();
 await page.getByTestId('admin-tab-appointments').click();
 const first=page.getByTestId('admin-appointments').locator('article').first();
 await first.getByRole('button',{name:/Подтвердить|Confirm|Xác nhận/}).click();
 await expect(first).toContainText(/Подтверждена|Confirmed|Đã xác nhận/);
 await page.getByTestId('admin-tab-clients').click();
 await page.getByTestId('admin-clients').locator('button').first().click();
 await expect(page.getByTestId('admin-client-card')).toBeVisible();
 await page.getByTestId('admin-client-card').getByRole('button',{name:'×'}).click();
 await page.getByTestId('admin-tab-broadcasts').click();
 const broadcast=page.getByTestId('admin-broadcast');
 await broadcast.locator('textarea').fill('EVO demo campaign');
 await broadcast.getByRole('button',{name:/DEMO/}).click();
 await expect(broadcast).toContainText(/подготовлена|prepared|đã chuẩn bị/i);
 expect(errors).toEqual([]);
});

test('demo AI and admin remain localized in VI and mobile-safe',async({page})=>{
 await page.goto('/');
 await page.getByTestId('topbar').getByRole('button',{name:'VI',exact:true}).click();
 await page.getByRole('button',{name:/Tư vấn/}).last().click();
 await expect(page.getByTestId('demo-ai')).toContainText('KHÔNG CÓ AI THẬT');
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBeTruthy();
 await page.getByRole('button',{name:/Hồ sơ/}).click();
 await page.locator('button.linkRow').last().click();
 await expect(page.getByTestId('demo-admin')).toContainText('Không gửi gì');
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBeTruthy();
});
