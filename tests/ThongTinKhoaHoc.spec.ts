import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { DanhSachPage } from "../pages/KhoaHoc/DanhSachPage";
import { ThongTinKhoaPage } from "../pages/KhoaHoc/ThongTinKhoaPage";
import { KhoaThamKhaoPage } from "../pages/KhoaHoc/KhoaHocThamKhao";
import { SuKienList } from "../pages/SuKien/SuKienList";

test.describe("Test function course information", () => {
    let dashboard: DashboardPage; //khai báo biến 
    let danhSachPage: DanhSachPage;
    let thongTinKhoa: ThongTinKhoaPage;
    let khoaThamKhao: KhoaThamKhaoPage;
    let suKienList: SuKienList;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        danhSachPage = new DanhSachPage(page);
        thongTinKhoa = new ThongTinKhoaPage(page);
        khoaThamKhao = new KhoaThamKhaoPage(page);
        suKienList = new SuKienList(page);
        await dashboard.goToHomePage();
        await dashboard.openKhoaHoc();
    });

    test("Mở Khoá học 1 Javascriptt thành công + comeBack", async () => {
        await danhSachPage.openJavascriptt();
        await dashboard.waitForDomLoaded();
        await suKienList.expectAtUrl(/\/chitiet\/?$/i);
        await danhSachPage.backHome();
    })

    test("Nội dung Khoá Học", async ({ page }) => {
        await danhSachPage.openLapTrinhWeb();
        await thongTinKhoa.isAtThongTinTitle();
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
        const expectedTitle = "LẬP TRÌNH FRONT-END CHUYÊN NGHIỆP";
        
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

        const titleOnDetailPage = await thongTinKhoa.getAllTitleText(thongTinKhoa.titleKhoa1);
        console.log("🔍 Tiêu đề trang chi tiết:", titleOnDetailPage);

        expect(titleOnDetailPage).toBe(titleOnCard);
    })

    // test 1 trang for loop cho tên khoá và thông tin tên khoá
    test("So sánh tên khoá học giữa danh sách và trang thông tin", async ({ page }) => {
      await danhSachPage.openPage2();

        // ✅ Chờ cho danh sách khoá học hiển thị đầy đủ
        await page.waitForSelector(".cardGlobalRes .stikerCard", { state: "visible" });

        // Lấy số lượng thẻ hiện có (nếu chỉ muốn test 5 thẻ đầu)
        const count = await danhSachPage.courseCards.count();
        console.log(`📚 Có tổng cộng ${count} khóa học.`);
            
        for (let i = 0; i < count;i++) {
        //Lấy tên khoá học trên card
        const titleOnCard = await danhSachPage.getCourseTitle(i);
        console.log(`\n🟦 [${i + 1}] Tên trên card: ${titleOnCard}`);

        //Click mở chi tiết
        await danhSachPage.clickCourse(i);
        await dashboard.waitForDomLoaded();

        //Lấy tên trong trang thông tin
        const titleOnDetail = await thongTinKhoa.getCourseTitleText();
        console.log(`🟩 Tên trên trang thông tin: ${titleOnDetail}`);

        if (titleOnDetail.toLowerCase().includes(titleOnCard.toLowerCase())) {
        console.log("✅ Tên khoá thông tin khớp với tên trên card");
        } else {
          console.warn(`⚠️ Tên khoá học khác nhau:
            Danh sách: ${titleOnCard}
            Thông tin: ${titleOnDetail}`);
        }

        await page.goBack();
        await dashboard.waitForDomLoaded();

        // ✅ Quay về lại trang 2 nếu bị trở về trang 1
        const currentUrl = page.url();
        if (!currentUrl.includes("page=2")) {
        // console.log("🔄 Quay lại đúng trang 2...");
          await danhSachPage.openPage2();
          await dashboard.waitForDomLoaded();
        }
      }
    })

    test("Bugs quay về trang chủ", async ({ page }) => {
        await danhSachPage.moPageAn.click();
        const beforeClick = await danhSachPage.getActivePageNumberSafe();
        console.log("📄 Trang hiện tại trước khi click:", beforeClick);
        await page.goBack({ waitUntil: 'domcontentloaded', timeout: 10000 });
        await page.waitForTimeout(1500);
          // 👉 Lấy URL hiện tại
        const currentUrl = page.url();
        console.log("🌐 URL hiện tại sau khi goBack:", currentUrl);
          // 👉 Kiểm tra có phải đang ở trang danh sách khóa học không
        const isAtKhoaHoc = currentUrl.includes('/khoahoc');
        if (!isAtKhoaHoc) {
        console.error(`🚨 Bug: Sau khi quay lại không ở trang khóa học mà ở "${currentUrl}"`);
        return;
        }
        // await danhSachPage.pageCard3.click();
        const afterGoBack = await danhSachPage.getActivePageNumberSafe();
        console.log("📄 Trang hiện tại sau khi goBack:", afterGoBack);
          // Kiểm tra xem có bị reset về trang đầu hay không
        if (afterGoBack !== beforeClick) {
            console.warn(`⚠️ Trang đã bị reset từ trang ${beforeClick} → ${afterGoBack}`);
        } else {
            console.log("✅ Vẫn giữ nguyên trang sau khi quay lại.");
        }
        await danhSachPage.scrollToTop();
    })

    // test for loop tên card trùng nhau
    test("So sánh tên khoá học giữa danh sách và trang thông tin (chỉ lấy khoá trùng tên)", async ({ page }) => {
    await danhSachPage.openPage2();

    // // ✅ Chờ danh sách khoá học hiển thị đầy đủ
    await page.waitForSelector(".cardGlobalRes .stikerCard", { state: "visible" });

    const count = await danhSachPage.courseCards.count();
    console.log(`📚 Có tổng cộng ${count} khóa học trên trang 2.`);

    let matchCount = 0;
    for (let i = 0; i < count; i++) {
        // 🟦 Lấy tên khóa học trên card
        const titleOnCard = await danhSachPage.getCourseTitle(i);
        console.log(`\n🟦 [${i + 1}] Tên trên card: ${titleOnCard}`);

        // Click mở chi tiết
        await danhSachPage.clickCourse(i);
        await dashboard.waitForDomLoaded();

        // 🟩 Lấy tên trong trang thông tin
        const titleOnDetail = await thongTinKhoa.getCourseTitleText();
        console.log(`🟩 Tên trên trang thông tin: ${titleOnDetail}`);

        // ✅ Chỉ log nếu TRÙNG tên
        if (titleOnDetail.toLowerCase().includes(titleOnCard.toLowerCase())) {
            matchCount++;
            console.log(`\n✅ [${i + 1}] Tên trùng khớp!`);
            console.log(`🔹 Card: ${titleOnCard}`);
            console.log(`🔹 Chi tiết: ${titleOnDetail}`);
        }

        // Quay lại trang danh sách
        await dashboard.openKhoaHoc();
        await dashboard.waitForDomLoaded();

        // ✅ Quay về lại trang 2 nếu bị trở về trang 1
        const currentUrl = page.url();
        if (!currentUrl.includes("page=2")) {
            await danhSachPage.openPage2();
            await dashboard.waitForDomLoaded();
        }
        }

        console.log(`\n🎯 Tổng cộng ${matchCount}/${count} khóa học trùng tên!`);
    });

    test("Kiểm tra UI trang thông tin khóa học Vlearning", async () => {
        // await dashboard.openKhoaHoc();
        // await danhSachPage.openPage2();
        await danhSachPage.pageCard3.click();
        await thongTinKhoa.verifyCourseImage();

    })
    
    test("Giới thiệu thông tin khoá học", async () => {
      await danhSachPage.openPage2();
        // Step 4: Click vào một khóa học
        // await danhSachPage.clickCourseName(0);
    //  Step 5: Kiểm tra nội dung phần giới thiệu
      // await thongTinKhoa.verifyIntroText("React.js là thư viện JavaScript phổ biến nhất");
      await danhSachPage.clickAllCoursesInPage2();
    })



});