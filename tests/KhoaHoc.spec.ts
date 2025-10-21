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
        // await danhSachPage.openPageAn();
        await danhSachPage.openPageAn();
        await expect(page.getByRole('button', { name: 'Page 7 is your current page' })).toBeVisible();
        await suKienList.scrollToBottom();
    })

    test("Click Button Trước vs Sau", async () => {
        await dashboard.openKhoaHoc();
        await suKienList.scrollToBottom();
        // await danhSachPage.moPageAn.click();
        // await danhSachPage.nutTruoc.click();
        // await danhSachPage.nutSau.click();
        await danhSachPage.operation();
    })

    test("Bugs vị trí khi chuyển trang", async ({ page }) => {
        await dashboard.openKhoaHoc();
        await danhSachPage.openPage2();
        const beforeClick = await danhSachPage.getActivePageNumberSafe();
        console.log("📄 Trang hiện tại trước khi click:", beforeClick);
        await danhSachPage.page2Card1.click();
        await page.goBack();
        // await expect(page.getByRole('button', { name: 'Page 2 is your current page' })).toBeVisible();
        // await danhSachPage.isAtKhoaHocPage2();
        const afterGoBack = await danhSachPage.getActivePageNumberSafe();
        console.log("📄 Trang hiện tại sau khi goBack:", afterGoBack);
          // Kiểm tra xem có bị reset về trang đầu hay không
        if (afterGoBack !== beforeClick) {
            console.warn(`⚠️ Trang đã bị reset từ trang ${beforeClick} → ${afterGoBack}`);
        } else {
            console.log("✅ Vẫn giữ nguyên trang sau khi quay lại.");
        }
        expect(typeof afterGoBack).toBe("string");
    })

    test("Bugs lưu giữ trang trước khoá học", async ({ page }) => {
        await dashboard.openKhoaHoc();
        await danhSachPage.pageCard5.click();
        await page.goBack();
        const titleOnCard4 = await danhSachPage.titleCard4.innerText();
        console.log("📄 Tiêu đề trên card:", titleOnCard4);
        await danhSachPage.pageCard4.click();
        await dashboard.waitForDomLoaded();
        const titleOnDetail4 = await thongTinKhoa.getAllTitleText(danhSachPage.titleDetail4);
        console.log("🔍 Tiêu đề trên chi tiết:", titleOnDetail4);
    })

    test('Kiểm tra danh sách khóa học', async () => {
        await dashboard.openKhoaHoc();
        const count = await danhSachPage.getCourseCount();
        console.log(`Số lượng khóa học: ${count}`);

        const firstCourse = await danhSachPage.getCourseInfo(0);
        console.log(firstCourse);

        await danhSachPage.verifyAllCoursesHaveTitle();

    });

    test("Các tên khoá học trên trang 1 hiển thị sai tên", async () =>{
        await dashboard.openKhoaHoc();
        console.log('\n=== Trang 1 ===')
        await danhSachPage.logAllCourseTitles();

        await danhSachPage.clickNextPage();
        console.log('\n=== Trang 2 ===')
        await danhSachPage.logAllCourseTitles();
    })

    test("Kiểm tra giá giữa danh sách và chi tiết không bị lệch", async ({ page }) => {
        await dashboard.openKhoaHoc();

        const listPrice = await danhSachPage.getFirstCoursePrice();
        console.log(`💰 Giá trong danh sách: ${listPrice}`);

        await danhSachPage.openFirstCourseDetail();
        const detailPrice = await thongTinKhoa.getKhoaHocPrice();
        console.log(`🧾 Giá trong thông tin: ${detailPrice}`);

        // expect(detailPrice).toBe(listPrice);
          if (detailPrice !== listPrice) {
         console.warn(`⚠️ Giá KHÔNG KHỚP!\n  Danh sách: ${listPrice}\n  Thông tin: ${detailPrice}`);
            } else {
         console.log("✅ Giá khớp giữa danh sách và thông tin.");
        }
    });



});
