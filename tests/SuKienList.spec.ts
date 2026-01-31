import { test } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { SuKienList } from "../pages/SuKien/SuKienList";
import { DanhSachPage } from "../pages/KhoaHoc/DanhSachPage";

test.describe("Test function event", () => {
    let dashboard: DashboardPage;
    let suKienList: SuKienList;
    let danhSachPage: DanhSachPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        suKienList = new SuKienList(page);
        danhSachPage = new DanhSachPage(page);
        await dashboard.goToHomePage();
        await dashboard.openSuKien();
    })

    // test("Click Sự Kiện thành công", async () => {
    //     // cách 1: ko cần extends Dashboard ở .ts
    //     await dashboard.waitForDomLoaded();
    //     await suKienList.openSuKien(); // cách 2 cần extends Dashboard vào .ts
    //     await suKienList.scrollToBottom();
    //     await suKienList.headPage();
   
    // })

    test("TNV-7,Mở Event Sale Cuối Năm + Quay về", async () => {
        await dashboard.waitForDomLoaded();
        await dashboard.hoverMouse();
        await suKienList.openLastYearEvent();
        //Kiểm tra trang mở đúng
        await suKienList.expectAtUrl(/\/sukien\/lastYear$/);
        await danhSachPage.backHome();
    })

    test("TNV-7,Mở Event Giáng Sinh", async () => {
        await dashboard.waitForDomLoaded();
        await suKienList.openGiangSinhEvent();
        await suKienList.expectAtUrl(/\/sukien\/Noel$/);
        // await suKienPage.expectAtUrl(/\/sukien\/Giangsinh$/i); // i không phân biệt hoa thường
    })

    test("TNV-7,Mở Event Noel", async () => {
        await dashboard.waitForDomLoaded();
        await suKienList.openNoelEvent();
        // await suKienPage.expectAtUrl(/\/sukien\/Noel$/);
        await suKienList.isAtErrorBug();
    });



})
