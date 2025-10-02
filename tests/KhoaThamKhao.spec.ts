import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { KhoaHocPage } from "../pages/KhoaHocPage";
import { ThongTinKhoaPage } from "../pages/ThongTinKhoaPage";
import { KhoaThamKhaoPage } from "../pages/KhoaHocThamKhao";
import { SuKienPage } from "../pages/SuKienPage";

test.describe("Test function reference course", () => {
    let dashboard: DashboardPage; //khai báo biến 
    // let khoaHocPage: KhoaHocPage;
    // let thongTinKhoa: ThongTinKhoaPage;
    let khoaThamKhao: KhoaThamKhaoPage;
    // let suKienPage: SuKienPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        // khoaHocPage = new KhoaHocPage(page);
        // thongTinKhoa = new ThongTinKhoaPage(page);
        khoaThamKhao = new KhoaThamKhaoPage(page);
        // suKienPage = new SuKienPage(page);
        await dashboard.goToHomePage();
        await dashboard.openKhoaHoc();
    });

    test("Khoá Tham Khảo 1", async ({ page }) => {
        await khoaThamKhao.clickStickerCard();
        await khoaThamKhao.hoverCard1();
        // await khoaThamKhao.hoverCard2();
        // await khoaThamKhao.hoverCard3();
        // await khoaThamKhao.hoverCard4();
        await expect(page.getByText("Khóa học tham khảo")).toBeVisible();
    })

        test("Khoá Tham Khảo 2", async ({ page }) => {
        await khoaThamKhao.clickStickerCard();
        // await khoaThamKhao.hoverCard1();
        await khoaThamKhao.hoverCard2();
        // await khoaThamKhao.hoverCard3();
        // await khoaThamKhao.hoverCard4();
        await expect(page.getByText("Yêu thích").nth(1)).toBeVisible();
    })

        test("Khoá Tham Khảo 3", async ({ page }) => {
        await khoaThamKhao.clickStickerCard();
        // await khoaThamKhao.hoverCard1();
        // await khoaThamKhao.hoverCard2();
        await khoaThamKhao.hoverCard3();
        // await khoaThamKhao.hoverCard4();
        await expect(page.getByText("Elun Musk Ricard").nth(2)).toBeVisible();
    })

        test("Khoá Tham Khảo 4", async ({ page }) => {
        await khoaThamKhao.clickStickerCard();
        // await khoaThamKhao.hoverCard1();
        // await khoaThamKhao.hoverCard2();
        // await khoaThamKhao.hoverCard3();
        await khoaThamKhao.hoverCard4();
        await expect(page.getByText("BOOTCAMP - LẬP TRÌNH FULL STACK TỪ ZERO ĐẾN CÓ VIỆC").nth(3)
        ).toBeVisible();
    })
});