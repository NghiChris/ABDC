import { Page, Locator } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly khoaHocMenu: Locator;
    readonly title: Locator;
    readonly suKienMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.khoaHocMenu = page.getByRole('link', { name: "Khóa học" }).first();
        // // this.khoaHocMenu = page.locator("a[href='/khoahoc']").first();
        this.title = page.locator("h3").first();
        this.suKienMenu = page.getByRole('link', { name: "Sự kiện" }).first();
    }

    async goToHomePage() {
        // await this.page.goto(process.env.BASE_URL || '', {
       await this.page.goto('/', {
            waitUntil: "domcontentloaded", //chờ đến khi trang load hết
            timeout: 15000,
        });
    }    

       // /** Chờ load khi đã ở trang mới */
    async waitForDomLoaded() {
        await this.page.waitForLoadState("domcontentloaded", { timeout: 15000 });
    }
    
    /** Dùng cho bất kỳ link nào, luôn chờ load sau khi click */
    // async clickAndWaitForLoad(selector: string | Locator) {
    //     await Promise.all([
    //     this.page.waitForLoadState("domcontentloaded", { timeout: 15000 }),
    //     typeof selector === 'string' ? this.page.click(selector) : selector.click(),
    //     ]);
    // }
    
    async openKhoaHoc() {
        await this.khoaHocMenu.click();
        // console.log(await this.khoaHocMenu.allTextContents());
    }

    async isAtKhoaHocPage(): Promise<boolean> {
        return await this.title.isVisible();
    }
    
    async openSuKien() {
        await this.suKienMenu.click(); // cách 1
        // await this.clickAndWaitForLoad(this.suKienMenu); // cách 2
    }  
    
    async hoverMouse() {
        await this.suKienMenu.hover()
    }
 
    
}        