import { Page, Locator, expect } from "@playwright/test";
import { KhoaHocPage } from "./KhoaHocPage";

export class KhoaThamKhaoPage extends KhoaHocPage {
    // readonly page: Page;
    readonly card1: Locator;
    readonly card2: Locator;
    readonly card3: Locator;
    readonly card4: Locator;

    constructor (page: Page) {
        super (page);
        // this.page = page;
        // this.card1 = page.getByText('Backend 54');
        this.card1 = page.locator('.stikerCard', { hasText: 'Backend 54' });
        this.card2 = page.getByText('Backend9');
        this.card3 = page.locator("a.cardGlobal[href='/chitiet/13454']");
        this.card4 = page.locator("a.cardGlobal[href='/chitiet/13485']");
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

}