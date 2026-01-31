import { Page, Locator, expect, APIRequestContext } from "@playwright/test";
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
    readonly titleDetailCourse: Locator;
    readonly coursePrice: Locator;
    readonly courseImage: Locator;
    readonly description: Locator;/////////// 

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
        this.titleDetailCourse = page.locator("h4.titleDetailCourse");
        this.coursePrice = page.locator(".sideBarCourseDetail .coursePrice p");
        this.courseImage = page.locator(".sideBarCourseDetail img"); 
        this.description = page.locator("p.textDiscripts");
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
    async getAllTitleText(title: Locator): Promise<string> {
        await title.waitFor({ state: 'visible' });
        return await title.innerText();
    }

    // Hàm lấy text tiêu đề khóa học hiện tại
    // async getCourseTitleText(): Promise<string> {
    //     await this.titleDetailCourse.waitFor({ state: "visible" });
    //     const text = (await this.titleDetailCourse.innerText()).trim();
    //     console.log(`Tiêu đề chi tiết khóa học: ${text}`);
    //     return text;
    // }

    async getCourseTitleText(): Promise<string> {
        await this.titleDetailCourse.waitFor({ state: 'visible' });
        return (await this.titleDetailCourse.innerText()).trim();
    }
   
    // async getCourseTitleText(): Promise<string> {
    // await this.page.waitForLoadState("domcontentloaded");
    // await this.titleDetailCourse.waitFor({ state: "visible", timeout: 30000 });
    // const text = (await this.titleDetailCourse.innerText()).trim();
    // // console.log(`🔍 Tiêu đề chi tiết khóa học: ${text}`);
    // return text;
    // }


    async getCourseTitle() {
        await this.page.waitForLoadState('domcontentloaded');
        return (await this.titleDetailCourse.textContent())?.trim();
    }

    async getKhoaHocPrice() {
        const text = await this.coursePrice.innerText();
        return text.replace(/\s+/g, "").trim();
    }

//       async verifyCourseImage(): Promise<boolean> {
//         // await expect(this.courseImage).toBeVisible();
//         await this.courseImage.first().waitFor({ state: "attached", timeout: 8000 });
//  // Kiểm tra có ảnh hiển thị hay không
//     const isVisible = await this.courseImage.isVisible();
//     const imgSrc = await this.courseImage.getAttribute("src");

//     if (isVisible && imgSrc) {
//       console.log("✅ Có ảnh khóa học hiển thị.");
//     } else {
//       console.log("❌ Không có ảnh khóa học .");
//     }
//     return false;
// }

//cách 1: kiểm tra ảnh hiển thị trên màn hình khi ảnh bị ẩn, khai báo locator, test ko cần khai báo locator
async verifyCourseImage(): Promise<boolean> {
  try {
    const img = this.courseImage.first();
    await img.waitFor({ state: "visible", timeout: 5000 });

    const src = await img.getAttribute("src");
    expect(src).not.toBeNull();

    const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
    expect(isLoaded).toBeTruthy();

    console.log("\n ✅ Ảnh khóa học hiển thị bình thường.");
    return true;
  } catch (err) {
    console.log("\n ❌ Ảnh khóa học lỗi hoặc không hiển thị:");
    return false;
  }
}

//cách 2: kiểm tra ảnh hiển thị trên màn hình khi ảnh bị ẩn, ko cần locator, test fai khai báo
async verifyImageVisible(img: Locator): Promise<boolean> {
  try {
    await img.waitFor({ state: "visible", timeout: 5000 });
    await img.scrollIntoViewIfNeeded();

    return await img.evaluate((el: HTMLImageElement) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      const loaded = el.complete && el.naturalWidth > 0;
      return inView && loaded;
    });
  } catch {
    return false;
  }
}
    //phần giới thiệu
    async verifyIntroText(expectedText: string) {
        await expect(this.description).toContainText(expectedText);
    }


}
