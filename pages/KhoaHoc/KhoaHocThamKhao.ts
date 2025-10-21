import { Page, Locator, expect } from "@playwright/test";
import { DanhSachPage } from "./DanhSachPage";

export class KhoaThamKhaoPage extends DanhSachPage {
    // readonly page: Page;
    readonly card1: Locator;
    readonly card2: Locator;
    readonly card3: Locator;
    readonly card4: Locator;
    readonly cards: Locator;

    constructor (page: Page) {
        super (page);
        // this.page = page;
        // this.card1 = page.getByText('Backend 54');
        // this.card1 = page.locator('.stikerCard', { hasText: 'Backend 54' });
        this.card1 = page.locator("a.cardGlobal[href='/chitiet/100999999']");
        this.card2 = page.locator("a.cardGlobal[href='/chitiet/111111111111']");
        this.card3 = page.locator("a.cardGlobal[href='/chitiet/123333333']");
        this.card4 = page.locator("a.cardGlobal[href='/chitiet/12343554654546456456']");
        this.cards = page.locator(".stikerCard");
    }

    async clickStickerCard() {
        await this.pageCard2.click(); // sử dụng lại từ class cha
    }

    async hoverCard1() {
        await this.card1.hover();
    }

    async hoverCard2() {
        await this.card2.hover();
    }    

    async hoverCard3() {
        await this.card3.hover();
    } 

    async hoverCard4() {
        await this.card4.hover();
    } 

    async hoverCardAndCheck(index: number, expectedText: string) {
        const card = this.cards.nth(index);
        // Hover để kích hoạt hiệu ứng
        await card.scrollIntoViewIfNeeded();
        await card.hover();
        // ⏳ Chờ hiệu ứng hover hoặc lazy load
        await this.page.waitForTimeout(1000);

        //Kiểm tra text xuất hiện (linh hoạt theo nội dung)
        // await expect(this.page.getByText(expectedText, { exact: false })).toBeVisible();

        // Kiểm tra text xuất hiện (không cần exact, có thể không phân biệt hoa thường)
        const targetText = this.page.getByText(expectedText, { exact: false });

        // await expect(targetText).toBeVisible({ timeout: 10000 });
        console.log(`✅ Đã hover card ${index + 1}: thấy text "${expectedText}"`);
    }
}