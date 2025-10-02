import { test } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { SuKienPage } from "../pages/SuKienPage";
import { KhoaHocPage } from "../pages/KhoaHocPage";

test.describe("Test function event", () => {
    let dashboard: DashboardPage;
    let suKienPage: SuKienPage;
    let khoaHocPage: KhoaHocPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        suKienPage = new SuKienPage(page);
        khoaHocPage = new KhoaHocPage(page);
        await dashboard.goToHomePage();
    })

    test("Click Sự Kiện thành công", async () => {
        // cách 1: ko cần extends Dashboard ở .ts
        await dashboard.waitForDomLoaded();
        await suKienPage.openSuKien(); // cách 2 cần extends Dashboard vào .ts
        await suKienPage.scrollToBottom();
        await suKienPage.headPage();
   
    })

    test("Mở Event Sale Cuối Năm + Quay về", async () => {
        await dashboard.waitForDomLoaded();
        await suKienPage.hoverMouse();
        await suKienPage.openLastYearEvent();
        //Kiểm tra trang mở đúng
        await suKienPage.expectAtUrl(/\/sukien\/lastYear$/);
        await khoaHocPage.backHome();
    })

    test("Mở Event Giáng Sinh", async () => {
        await dashboard.waitForDomLoaded();
        await suKienPage.openGiangSinhEvent();
        await suKienPage.expectAtUrl(/\/sukien\/Noel$/);
        // await suKienPage.expectAtUrl(/\/sukien\/Giangsinh$/i); // i không phân biệt hoa thường
    })

    test("Mở Event Noel", async () => {
        await dashboard.waitForDomLoaded();
        await suKienPage.openNoelEvent();
        // await suKienPage.expectAtUrl(/\/sukien\/Noel$/);
        await suKienPage.isAtErrorBug();
    });



})
