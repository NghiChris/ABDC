import { Page, Locator, expect } from "@playwright/test";
// import { KhoaHocPage } from "./KhoaHocPage";
import { DashboardPage } from "../Dashboard";

export class ThongTinKhoaPage extends DashboardPage {
    // readonly page: Page;
    // readonly stikerCard2: Locator;
    readonly thongTinTitle: Locator;
    readonly nameKhoa: Locator;
    readonly buttonXemTruoc: Locator;
    readonly buttonDangKy: Locator;
    readonly nhapMa: Locator;
    readonly titleKhoa1: Locator;

    constructor (page: Page) {
        super(page);
        // this.page = page;
        // this.stikerCard2 = page.locator("a[href='/chitiet/100999']");
        this.thongTinTitle = page.getByText('Thông tin khóa học');
        this.nameKhoa = page.locator("h4");
        this.buttonXemTruoc = page.locator(".btnPreview").first();
        this.buttonDangKy = page.getByRole('button', { name: "Đăng ký"});
        this.nhapMa = page.getByPlaceholder("Nhập mã");
        this.titleKhoa1 = page.locator('.titleDetailCourse', { hasText: "Javascript nâng cao cấp abc" });
        // this.titleKhoa1 = page.locator('.titleDetailCourse', { hasText: "Khóa học python cho người mới bắt đầu" });

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

    async clickCardAndVerifyTitle(card: Locator, expectedTitle: string) {
        await card.click();
        // Chờ selector tiêu đề xuất hiện lại và có nội dung mới
        const titleLocator = this.nameKhoa;
         // Đợi đến khi tiêu đề KHÁC tiêu đề cũ (nếu cần)
        // await titleLocator.waitFor({ state: 'visible', timeout: 5000 });
        await this.waitForDomLoaded();
        //Lấy tiêu đề sau khi chắc chắn đã load xong
        const title = await titleLocator.innerText();
        console.log("⛳ Tiêu đề trang hiện tại:", title);
        expect(title).toBe(expectedTitle);
        await this.page.goBack({ waitUntil: 'domcontentloaded' });
    }

    // Lấy tiêu đề của khóa học hiện tại - cách 1
    // async getCourseTitleText(): Promise<string> { 
    //     await this.titleKhoa1.waitFor({ state: 'visible' });
    //     return await this.titleKhoa1.innerText();
    // }

    // Lấy tiêu đề của khóa học hiện tại - cách 2: tái sử dụng
    async getCourseTitleText(title: Locator): Promise<string> {
        await title.waitFor({ state: 'visible' });
        return await title.innerText();
    }
}