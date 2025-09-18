import { Page, Locator, expect } from "@playwright/test";

export class ThongTinKhoaPage {
    readonly page: Page;
    readonly stikerCard2: Locator;
    readonly thongTinTitle: Locator;
    readonly buttonXemTruoc: Locator;
    readonly buttonDangKy: Locator;
    readonly nhapMa: Locator;

    constructor (page: Page) {
        this.page = page;
        this.stikerCard2 = page.locator("a[href='/chitiet/100999']");
        this.thongTinTitle = page.getByText('Thông tin khóa học');
        this.buttonXemTruoc = page.locator(".btnPreview").first();
        this.buttonDangKy = page.getByRole('button', { name: "Đăng ký"});
        this.nhapMa = page.getByPlaceholder("Nhập mã");

    }

    async openLapTrinhWeb() {
        await this.stikerCard2.click();
    }

    async noiDungKhoaHoc() {
        await this.buttonXemTruoc.click();
    }

    async inputMa(ma:string) {
        await this.nhapMa.fill(ma);
    }

    async nutDangKy() {
        await this.buttonDangKy.click();
    }

    async isAtThongTinTitle() {
        await expect(this.thongTinTitle).toBeVisible();
    }

}