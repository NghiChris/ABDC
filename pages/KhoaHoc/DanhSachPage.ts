import { Page, Locator } from "@playwright/test";

export class DanhSachPage {
    readonly page: Page;
    // readonly khoaHocTitle: Locator;
    readonly pageCard1: Locator;
    readonly pageCard2: Locator;
    readonly pageCard3: Locator;
    readonly pageCard4: Locator;
    readonly titleCard4: Locator;
    readonly titleDetail4: Locator;
    readonly pageCard5: Locator;
    readonly pageCard6: Locator;
    readonly pageCard7: Locator;
    readonly pageCard8: Locator;
    // readonly pageCard9: Locator;
    // readonly pageCard10: Locator;
    readonly pageCard12: Locator;
    readonly comeBack: Locator;
    readonly nextPage2: Locator;
    readonly moPageAn: Locator;
    readonly nutTruoc: Locator;
    readonly nutSau: Locator;
    readonly page2Card1: Locator;
    readonly atPage2: Locator;

    constructor (page: Page) {
        this.page = page;
        // this.khoaHocMenu = page.locator("a[href='/khoahoc']").first();
        // this.khoaHocTitle = page.locator("h3").first();
        this.pageCard1 = page.locator("a[href='/chitiet/']");
        this.comeBack = page.getByRole('link', { name: "Quay về trang chủ" });
        this.pageCard2 = page.locator("a[href='/chitiet/100999']");
        this.pageCard3 = page.locator("a[href='/chitiet/1009991']");
        this.pageCard4 = page.locator("a[href='/chitiet/10099924']");
        this.titleCard4 = page.locator('.stikerCard', { hasText: 'Javascripttasaasdsazxcxz' });
        this.titleDetail4 = page.locator("h4");
        this.pageCard5 = page.locator("a[href='/chitiet/111111111111']");
        this.pageCard6 = page.locator("a[href='/chitiet/12343554654546456456']");
        this.pageCard7 = page.locator("a[href='/chitiet/12345']");
        this.pageCard8 = page.locator("a[href='/chitiet/100999999']");
        // this.pageCard9 = page.locator("a[href='/chitiet/123456y']");
        // this.pageCard10 = page.locator("a[href='/chitiet/13454']");
        this.pageCard12 = page.locator("a[href='/chitiet/15054']");
        this.nextPage2 = page.getByRole('button', { name: 'Page 2' });
        this.moPageAn = page.getByRole('button', { name: '...' });
        this.nutTruoc = page.getByRole('button', { name: 'Previous page' });
        this.nutSau = page.getByRole('button', { name: 'Next page' });
        this.page2Card1 = page.locator('.stikerCard', { hasText: 'Javascript nâng cao cấp abc' });
        this.atPage2 = page.getByRole('button', { name: 'Page 2 is your current page' });
    }
    
    // mở danh sách khoá học
    async openJavascriptt() {
        await this.pageCard1.click();
        // await this.backTrangChu.click();
        // console.log(await this.khoaHocMenu.allTextContents());
    }
    
    async backHome() {
        await this.comeBack.click();
    }

    async openLapTrinhWeb() {
        await this.pageCard2.click();
    }

    async openPage2() {
        await this.nextPage2.click();
    }

    async openPageAn() {
        await this.moPageAn.click();
    }
    
    // kiểm tra bắt buộc ở trang 2, ko khớp sẽ trả về faile .toBeVisible
    // async isAtKhoaHocPage2() {
    //     await expect(this.atPage2).toBeVisible();
    // }

    //Promise<boolean> bắt buộc trả về true và false
    async isAtKhoaHocPage2(): Promise<boolean> {
        return await this.atPage2.isVisible();
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