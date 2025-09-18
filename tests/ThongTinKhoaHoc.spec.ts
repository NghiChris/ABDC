import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { KhoaHocPage } from "../pages/KhoaHocPage";
import { ThongTinKhoaPage } from "../pages/ThongTinKhoaPage";

test.describe("Test function course", () => {
    let dashboard: DashboardPage; //khai báo biến 
    let khoaHocPage: KhoaHocPage;
    let thongTinKhoa: ThongTinKhoaPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        khoaHocPage = new KhoaHocPage(page);
        thongTinKhoa = new ThongTinKhoaPage(page);
        await dashboard.goToHomePage();
        await dashboard.openKhoaHoc();
    });

    test("Mở Khoá học Javascriptt thành công + comeBack", async () => {
        await khoaHocPage.openJavascriptt();
        await dashboard.waitForDomLoaded();
        await khoaHocPage.backHome();
    })

    test("Mở Khoá Học Lập trình web thành công", async () => {
        await thongTinKhoa.openLapTrinhWeb();
        await thongTinKhoa.isAtThongTinTitle();
    })

    test("Nội dung Khoá Học", async ({ page }) => {
        await thongTinKhoa.openLapTrinhWeb();
        await khoaHocPage.scrollToElement(thongTinKhoa.buttonXemTruoc);
        await thongTinKhoa.noiDungKhoaHoc();
        // await expect(page.locator(".courseContent h6")).toHaveText("Nội dung khóa học");
        await expect(page.getByText("Nội dung khóa học")).toBeVisible();
    })

    test("Thông tin Khoá Học Đăng Ký" , async ({ page }) => {
        await thongTinKhoa.openLapTrinhWeb();
        await thongTinKhoa.nutDangKy();
        await page.goBack({ waitUntil: 'domcontentloaded' });
        await thongTinKhoa.inputMa("asdsadf");
    })
});