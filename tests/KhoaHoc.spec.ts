import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { KhoaHocPage } from "../pages/KhoaHocPage";
import { SuKienPage } from "../pages/SuKienPage";

test.describe("Test function course", () => {
    let dashboard: DashboardPage; //khai báo biến KhoaHocPage
    let khoaHocPage: KhoaHocPage;
    let suKienPage: SuKienPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        khoaHocPage = new KhoaHocPage(page);
        suKienPage = new SuKienPage(page);
        await dashboard.goToHomePage();
        await dashboard.openKhoaHoc();
    });


    test("isAtKhoaHocPage", async () => {
        await khoaHocPage.isAtKhoaHocPage();
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
});