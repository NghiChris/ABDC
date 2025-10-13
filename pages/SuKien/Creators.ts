import { Page, Locator, expect } from "@playwright/test";

export class CreatorsPage {
    readonly page: Page;
    readonly creatorTitle: Locator;
    readonly creatorCards: Locator;
    readonly creatorImages: Locator;
    readonly creatorNames: Locator;
    readonly creatorRoles: Locator;

    constructor (page: Page) {
        this.page = page;
        this.creatorTitle = page.locator("h6", { hasText: "Các nhà đồng sáng tạo" });
        this.creatorCards = page.locator(".speechDetail .cardSpeecher");
        this.creatorImages = this.creatorCards.locator("img");
        this.creatorNames = this.creatorCards.locator("h6");
        this.creatorRoles = this.creatorCards.locator("p");
    }

    async verifyCreatorsSection() {
        // Kiểm tra tiêu đề hiển thị
        await expect(this.creatorTitle).toBeVisible();

        const count = await this.creatorCards.count();
        console.log(`📊 Tổng số nhà đồng sáng tạo tìm thấy: ${count}`);
        expect(count).toBeGreaterThanOrEqual(8);

        
        // Duyệt qua từng card
        for (let i = 0; i < count; i++) {
            const img = this.creatorImages.nth(i);
            const nameEl = this.creatorNames.nth(i);
            const roleEl = this.creatorRoles.nth(i);

            // Kéo ảnh vào tầm nhìn để load (nếu lazy-load)
            await img.scrollIntoViewIfNeeded();
            await img.waitFor({ state: 'visible' });

            const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
            // console.log(`Ảnh ${i + 1}: naturalWidth = ${naturalWidth}`);
            expect(naturalWidth).toBeGreaterThan(0);
     
            // Lấy nội dung text
            const name = (await nameEl.textContent())?.trim() || "Không có tên";
            const role = (await roleEl.textContent())?.trim() || "Không có vai trò";

            // In log ra console thật tế
            // console.log(`👤 ${name} — ${role}`);
            // console.log(`Ảnh ${i + 1}: ${naturalWidth}px — ${name} (${role})`);
            console.log(`Ảnh ${i + 1}: ${naturalWidth}px\n   👤 ${name} (${role})`);
            
            // Kiểm tra nội dung hiển thị
            await expect(nameEl).toBeVisible();
            await expect(roleEl).toContainText(/Ceo TechViet Production/i);
        }
    }
}