import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { DanhSachPage } from "../pages/KhoaHoc/DanhSachPage";
import { SuKienList } from "../pages/SuKien/SuKienList";
import { ThongTinKhoaPage } from "../pages/KhoaHoc/ThongTinKhoaPage";

test.describe("Test function course", () => {
    let dashboard: DashboardPage; //khai báo biến KhoaHocPage
    let danhSachPage: DanhSachPage;
    let suKienList: SuKienList;
    let thongTinKhoa: ThongTinKhoaPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        danhSachPage = new DanhSachPage(page);
        suKienList = new SuKienList(page);
        thongTinKhoa = new ThongTinKhoaPage(page);
        await dashboard.goToHomePage();
        // await dashboard.openKhoaHoc();
    });


    test("isAtKhoaHocPage", async () => {
        await dashboard.openKhoaHoc();
        await dashboard.isAtKhoaHocPage();
        // await expect(page.locator("h3").first()).toHaveText("Khóa học");
    });

    test("Open Page 2", async ({ page }) => {
        await dashboard.openKhoaHoc();
        await suKienList.scrollToBottom();
        await danhSachPage.openPage2();
        await expect(page.getByRole('button', { name: 'Page 2 is your current page' })).toBeVisible();
    })

    test("Open Page Ẩn", async ({ page }) => {
        await dashboard.openKhoaHoc();
        await suKienList.scrollToBottom();
        await danhSachPage.openPageAn();
        await danhSachPage.openPageAn();
        await expect(page.getByRole('button', { name: 'Page 7 is your current page' })).toBeVisible();
        await suKienList.scrollToBottom();
    })

    test("Click Button Trước vs Sau", async () => {
        await dashboard.openKhoaHoc();
        await suKienList.scrollToBottom();
        await danhSachPage.moPageAn.click();
        await danhSachPage.nutTruoc.click();
        await danhSachPage.nutSau.click();
    })

    test("Bugs quay về trang đầu", async ({ page }) => {
        await dashboard.openKhoaHoc();
        await danhSachPage.openPage2();
        await danhSachPage.page2Card1.click();
        await page.goBack();
        // await expect(page.getByRole('button', { name: 'Page 2 is your current page' })).toBeVisible();
        await danhSachPage.isAtKhoaHocPage2();
    })

    test("Bugs lưu giữ trang trước khoá học", async ({ page }) => {
        await dashboard.openKhoaHoc();
        await danhSachPage.pageCard5.click();
        await page.goBack();
        const titleOnCard4 = await danhSachPage.titleCard4.innerText();
        console.log("📄 Tiêu đề trên card:", titleOnCard4);
        await danhSachPage.pageCard4.click();
        await dashboard.waitForDomLoaded();
        const titleOnDetail4 = await thongTinKhoa.getCourseTitleText(danhSachPage.titleDetail4);
        console.log("🔍 Tiêu đề trên chi tiết:", titleOnDetail4);
    })
});