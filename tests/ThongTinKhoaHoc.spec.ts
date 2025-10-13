import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { DanhSachPage } from "../pages/KhoaHoc/DanhSachPage";
import { ThongTinKhoaPage } from "../pages/KhoaHoc/ThongTinKhoaPage";
import { KhoaThamKhaoPage } from "../pages/KhoaHoc/KhoaHocThamKhao";

test.describe("Test function course information", () => {
    let dashboard: DashboardPage; //khai báo biến 
    let danhSachPage: DanhSachPage;
    let thongTinKhoa: ThongTinKhoaPage;
    let khoaThamKhao: KhoaThamKhaoPage;
    const expectedTitle = "LẬP TRÌNH FRONT-END CHUYÊN NGHIỆP";

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        danhSachPage = new DanhSachPage(page);
        thongTinKhoa = new ThongTinKhoaPage(page);
        khoaThamKhao = new KhoaThamKhaoPage(page);
        await dashboard.goToHomePage();
        await dashboard.openKhoaHoc();
    });

    test("Mở Khoá học 1 Javascriptt thành công + comeBack", async () => {
        await danhSachPage.openJavascriptt();
        await dashboard.waitForDomLoaded();
        await danhSachPage.backHome();
    })

    test("Mở Khoá Học 2 Lập trình web thành công", async () => {
        await danhSachPage.openLapTrinhWeb();
        await thongTinKhoa.isAtThongTinTitle();
    })

    test("Nội dung Khoá Học", async ({ page }) => {
        await danhSachPage.openLapTrinhWeb();
        await danhSachPage.scrollToElement(thongTinKhoa.buttonXemTruoc);
        await thongTinKhoa.noiDungKhoaHoc();
        // await expect(page.locator(".courseContent h6")).toHaveText("Nội dung khóa học");
        await expect(page.getByText("Nội dung khóa học")).toBeVisible();
    })

    test("Thông tin Khoá Học Đăng Ký" , async ({ page }) => {
        await danhSachPage.openLapTrinhWeb();
        await thongTinKhoa.nutDangKy();
        await page.goBack({ waitUntil: 'domcontentloaded' });//trở về trang trước
        await thongTinKhoa.inputMa("asdsadf");
    })

    test("Trang thông tin các khoá học tên trùng lặp Page 1", async ({ page }) => {
        // await khoaHocPage.openLapTrinhWeb();
        // await page.goBack({ waitUntil: 'domcontentloaded' });
        // await khoaHocPage.pageCard3.click();
        // await page.goBack({ waitUntil: 'domcontentloaded' });
        // await khoaHocPage.pageCard4.click();
        // await page.goBack({ waitUntil: 'domcontentloaded' });
        // await khoaHocPage.pageCard6.click();
        // await page.goBack({ waitUntil: 'domcontentloaded' });
        // await khoaHocPage.pageCard7.click();
        // await page.goBack({ waitUntil: 'domcontentloaded' });
        // await khoaHocPage.pageCard8.click();
        // await page.goBack({ waitUntil: 'domcontentloaded' });
        // await khoaHocPage.pageCard9.click();
        // await page.goBack({ waitUntil: 'domcontentloaded' });
        // await khoaHocPage.pageCard10.click();
        // await page.goBack({ waitUntil: 'domcontentloaded' });
        // await khoaHocPage.pageCard12.click();
        // await expect(page.locator("h4")).toHaveText("LẬP TRÌNH FRONT-END CHUYÊN NGHIỆP");
        const cardList = [
            danhSachPage.pageCard2,
            danhSachPage.pageCard3,
            danhSachPage.pageCard4,
            danhSachPage.pageCard6,
            danhSachPage.pageCard7,
            danhSachPage.pageCard8,
            // khoaHocPage.pageCard9,
            // khoaHocPage.pageCard10,
            // khoaHocPage.pageCard12,
        ];

        for (const card of cardList) {
            await thongTinKhoa.clickCardAndVerifyTitle(card, expectedTitle);
        }
    })

    test("So sánh tên khoá học giữa danh sách và trang chi tiết", async () => {
        await danhSachPage.openPage2();
        const titleOnCard = await danhSachPage.page2Card1.innerText();
        console.log("📄 Tiêu đề trên card:", titleOnCard);

        await danhSachPage.page2Card1.click();
        await dashboard.waitForDomLoaded();

        const titleOnDetailPage = await thongTinKhoa.getCourseTitleText(thongTinKhoa.titleKhoa1);
        console.log("🔍 Tiêu đề trang chi tiết:", titleOnDetailPage);

        expect(titleOnDetailPage).toBe(titleOnCard);
    })

    test("Bugs vị trí khi chuyển trang", async () => {
        await danhSachPage.pageCard3.click();
        await danhSachPage.scrollToTop();
    })
});