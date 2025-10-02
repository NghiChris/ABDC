import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { KhoaHocPage } from "../pages/KhoaHocPage";
import { SuKienPage } from "../pages/SuKienPage";
import { ThongTinKhoaPage } from "../pages/ThongTinKhoaPage";

test.describe("Test function course", () => {
    let dashboard: DashboardPage; //khai báo biến KhoaHocPage
    let khoaHocPage: KhoaHocPage;
    let suKienPage: SuKienPage;
    let thongTinKhoa: ThongTinKhoaPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        khoaHocPage = new KhoaHocPage(page);
        suKienPage = new SuKienPage(page);
        thongTinKhoa = new ThongTinKhoaPage(page);
        await dashboard.goToHomePage();
        await dashboard.openKhoaHoc();
    });


    test("isAtKhoaHocPage", async () => {
        await dashboard.isAtKhoaHocPage();
        // await expect(page.locator("h3").first()).toHaveText("Khóa học");
    });

    test("Open Page 2", async ({ page }) => {
        await suKienPage.scrollToBottom();
        await khoaHocPage.openPage2();
        await expect(page.getByRole('button', { name: 'Page 2 is your current page' })).toBeVisible();
    })

    test("Open Page Ẩn", async ({ page }) => {
        await suKienPage.scrollToBottom();
        await khoaHocPage.openPageAn();
        await khoaHocPage.openPageAn();
        await expect(page.getByRole('button', { name: 'Page 7 is your current page' })).toBeVisible();
        await suKienPage.scrollToBottom();
    })

    test("Click Button Trước vs Sau", async () => {
        await suKienPage.scrollToBottom();
        await khoaHocPage.moPageAn.click();
        await khoaHocPage.nutTruoc.click();
        await khoaHocPage.nutSau.click();
    })

    test("Bugs quay về trang đầu", async ({ page }) => {
        await khoaHocPage.openPage2();
        await khoaHocPage.page2Card1.click();
        await page.goBack();
        // await expect(page.getByRole('button', { name: 'Page 2 is your current page' })).toBeVisible();
        await khoaHocPage.isAtKhoaHocPage2();
    })

    test("Bugs lưu giữ trang trước khoá học", async ({ page }) => {
        await khoaHocPage.pageCard5.click();
        await page.goBack();
        const titleOnCard4 = await khoaHocPage.titleCard4.innerText();
        console.log("📄 Tiêu đề trên card:", titleOnCard4);
        await khoaHocPage.pageCard4.click();
        await dashboard.waitForDomLoaded();
        const titleOnDetail4 = await thongTinKhoa.getCourseTitleText(khoaHocPage.titleDetail4);
        console.log("🔍 Tiêu đề trên chi tiết:", titleOnDetail4);
    })
});