import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { KhoaHocPage } from "../pages/KhoaHocPage";
import { ThongTinKhoaPage } from "../pages/ThongTinKhoaPage";
import { KhoaThamKhaoPage } from "../pages/KhoaHocThamKhao";

test.describe("Test function course information", () => {
    let dashboard: DashboardPage; //khai báo biến 
    let khoaHocPage: KhoaHocPage;
    let thongTinKhoa: ThongTinKhoaPage;
    let khoaThamKhao: KhoaThamKhaoPage;
    const expectedTitle = "LẬP TRÌNH FRONT-END CHUYÊN NGHIỆP";

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        khoaHocPage = new KhoaHocPage(page);
        thongTinKhoa = new ThongTinKhoaPage(page);
        khoaThamKhao = new KhoaThamKhaoPage(page);
        await dashboard.goToHomePage();
        await dashboard.openKhoaHoc();
    });

    test("Mở Khoá học 1 Javascriptt thành công + comeBack", async () => {
        await khoaHocPage.openJavascriptt();
        await dashboard.waitForDomLoaded();
        await khoaHocPage.backHome();
    })

    test("Mở Khoá Học 2 Lập trình web thành công", async () => {
        await khoaHocPage.openLapTrinhWeb();
        await thongTinKhoa.isAtThongTinTitle();
    })

    test("Nội dung Khoá Học", async ({ page }) => {
        await khoaHocPage.openLapTrinhWeb();
        await khoaHocPage.scrollToElement(thongTinKhoa.buttonXemTruoc);
        await thongTinKhoa.noiDungKhoaHoc();
        // await expect(page.locator(".courseContent h6")).toHaveText("Nội dung khóa học");
        await expect(page.getByText("Nội dung khóa học")).toBeVisible();
    })

    test("Thông tin Khoá Học Đăng Ký" , async ({ page }) => {
        await khoaHocPage.openLapTrinhWeb();
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
            khoaHocPage.pageCard2,
            khoaHocPage.pageCard3,
            khoaHocPage.pageCard4,
            khoaHocPage.pageCard6,
            khoaHocPage.pageCard7,
            khoaHocPage.pageCard8,
            khoaHocPage.pageCard9,
            khoaHocPage.pageCard10,
            khoaHocPage.pageCard12,
        ];

        for (const card of cardList) {
            await thongTinKhoa.clickCardAndVerifyTitle(card, expectedTitle);
        }
    })

    test("So sánh tên khoá học giữa danh sách và trang chi tiết", async () => {
        await khoaHocPage.openPage2();
        const titleOnCard = await khoaHocPage.page2Card1.innerText();
        console.log("📄 Tiêu đề trên card:", titleOnCard);

        await khoaHocPage.page2Card1.click();
        await dashboard.waitForDomLoaded();

        const titleOnDetailPage = await thongTinKhoa.getCourseTitleText(thongTinKhoa.titleKhoa1);
        console.log("🔍 Tiêu đề trang chi tiết:", titleOnDetailPage);

        expect(titleOnDetailPage).toBe(titleOnCard);
    })

});