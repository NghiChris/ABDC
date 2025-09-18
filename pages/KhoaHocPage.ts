import { Page, Locator, expect } from "@playwright/test";

export class KhoaHocPage {
    readonly page: Page;
    readonly khoaHocTitle: Locator;
    readonly stikerCard1: Locator;
    readonly backTrangChu: Locator;
    readonly nextPage2: Locator;
    readonly moPageAn: Locator;
    readonly nutTruoc: Locator;
    readonly nutSau: Locator;

    constructor (page: Page) {
        this.page = page;
        // this.khoaHocMenu = page.locator("a[href='/khoahoc']").first();
        this.khoaHocTitle = page.locator("h3").first();
        this.stikerCard1 = page.locator("a[href='/chitiet/']");
        this.backTrangChu = page.getByRole('link', { name: "Quay về trang chủ" });
        this.nextPage2 = page.getByRole('button', { name: 'Page 2' });
        this.moPageAn = page.getByRole('button', { name: '...' });
        this.nutTruoc = page.getByRole('button', { name: 'Previous page' });
        this.nutSau = page.getByRole('button', { name: 'Next page' });
    }
    // mở danh sách khoá học
    async openJavascriptt() {
        await this.stikerCard1.click();
        // await this.backTrangChu.click();
        // console.log(await this.khoaHocMenu.allTextContents());
    }
    
    async backHome() {
        await this.backTrangChu.click();
    }

    async isAtKhoaHocPage() {
        await expect(this.khoaHocTitle).toBeVisible();
    }

    async openPage2() {
        await this.nextPage2.click();
    }

    async openPageAn() {
        await this.moPageAn.click();
    }

    //cuộn đến 1 phần tử cụ thể
    async scrollToElement(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    //cuộn lên đầu trang
    async scrollToTop() {
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
        });
    }
}