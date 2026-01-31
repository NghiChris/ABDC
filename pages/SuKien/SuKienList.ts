import { Page, Locator, expect } from "@playwright/test";
import { DashboardPage } from "../Dashboard";

// export class SuKienList { //cách 1
export class SuKienList extends DashboardPage {  //cách 2 (command lại readonly page, super(page)bật lên)
    // readonly page: Page;
    // readonly suKienMenu: Locator;
    readonly lastYear: Locator;
    readonly giangSinh: Locator;
    readonly noel: Locator;
    readonly errorBug: Locator;
    readonly backTop: Locator;

    constructor (page: Page) {
        super(page);
        // this.page = page;
        // this.suKienMenu = page.getByRole('link', { name: "Sự kiện" }).first();
        this.lastYear = page.getByRole('link', { name: "Sự kiện Sale Cuối Năm" }).first();
        this.giangSinh = page.getByRole('link', { name: "Sự kiện Giáng sinh" }).first();
        this.noel = page.getByRole('link', { name: "Sự kiện Noel" }).first();
        // this.comeBack = page.getByRole('link', { name: "Quay về trang chủ" }); *
        // this.comeBack = page.locator('a', { hasText: 'Quay về trang chủ' });
        // this.comeBack = page.locator('text=Quay về trang chủ');
        this.errorBug = page.locator("h1.text404");
        this.backTop = page.locator("btn.backTop");
    }    


    // async openSuKien() {
    //     await this.suKienMenu.click(); // cách 1
    //     // await this.clickAndWaitForLoad(this.suKienMenu); // cách 2
    // }  
    
    // async hoverMouse() {
    //     await this.suKienMenu.hover()
    // }

    async openLastYearEvent() {
        // await this.suKienMenu.hover(); //Di chuyển chuột vào Sự kiện để hiển thị bảng Menu
        await this.lastYear.click();
        // await this.clickAndWaitForLoad(this.lastYear);
    }

    async openGiangSinhEvent() {
        await this.suKienMenu.hover();
        await this.giangSinh.click();
        // await this.clickAndWaitForLoad(this.giangSinh);
    }
    
    async openNoelEvent() {
        await this.suKienMenu.hover();
        await this.noel.click();
        // await this.clickAndWaitForLoad(this.noel);
    }

    async isAtErrorBug () {
        await expect(this.errorBug).toBeVisible();
    }

    async headPage() {
        await this.backTop.click();
    }

        /** Kiểm tra đang ở đúng URL */
    async expectAtUrl(regex: RegExp) {
        await expect(this.page).toHaveURL(regex);
    }
    
    //cuộn nhanh xuống cuối trang
    async scrollToBottom() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        })
    }


}