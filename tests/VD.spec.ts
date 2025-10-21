import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/Dashboard";
import { DanhSachPage } from "../pages/KhoaHoc/DanhSachPage";
import { SuKienList } from "../pages/SuKien/SuKienList";
import { ThongTinKhoaPage } from "../pages/KhoaHoc/ThongTinKhoaPage";
import { DsPage, logTheoMoTa } from "../pages/KhoaHoc/DS"
import { TtPage } from "../pages/KhoaHoc/TT"

test.describe("Test function course", () => {
    let dashboard: DashboardPage; //khai báo biến KhoaHocPage
    let danhSachPage: DanhSachPage;
    let suKienList: SuKienList;
    let thongTinKhoa: ThongTinKhoaPage;
    let dSPage: DsPage;
    let tTPage: TtPage;

    test.beforeEach(async ({ page }) => {
        dashboard = new DashboardPage(page);
        danhSachPage = new DanhSachPage(page);
        suKienList = new SuKienList(page);
        thongTinKhoa = new ThongTinKhoaPage(page);
        dSPage = new DsPage(page);
        tTPage = new TtPage(page);
        await dashboard.goToHomePage();
        await dashboard.openKhoaHoc();
    });

    // test('Log test', async () => {
    //     console.log('🔥 Đây là log test');    
    // });

    // test('Log Tên khóa học ở danh sách trang 1', async ({ page }) => {
    //     // await dashboard.openKhoaHoc();
    //     // console.log('🔥 Đây là log test');    

    //     const tongKhoa = await dSPage.getTongKhoa();
    //     console.log(`📦 Số lượng khoá học tìm được: ${tongKhoa}`);

    //     // for (let i = 0; i < tongKhoa; i++) {
    //     //     const tenKhoa = await dSPage.getTenKhoaAt(i);
    //     //     console.log(`Khóa ${i + 1}: ${tenKhoa}`);
    //     // }

    //     for (let i = 0; i < tongKhoa; i++) {
    //         // Lấy tiêu đề trong danh sách
    //         const titleInList = await dSPage.getTenKhoaAt(i);
    //         console.log(`🔍 [${i + 1}] Tên khóa học trong danh sách: "${titleInList}"`);
            
    //         // Click vào khóa học
    //         // const detailPage = await dSPage.clickCourseAt(i);

    //         // Lấy tiêu đề trang chi tiết
    //         // const titleInDetail = await detailPage.getKhoaTieuDe();
    //         // console.log(`📄 [${i + 1}] Tên khóa học trong trang chi tiết: "${titleInDetail}"`);

    //         // Kiểm tra khớp
    //         // expect(titleInDetail).toBe(titleInList);

    //         // Quay lại trang danh sách để kiểm tra khóa học tiếp theo
    //         // await page.goBack();

    //     }
    // });

//         test('Tên khóa học ở danh sách phải khớp với trang thông tin chi tiết', async ({ page }) => {
//         // await dashboard.openKhoaHoc();
//         // console.log('🔥 Đây là log test');    

//         const tongKhoa = await dSPage.getTongKhoa();
//         console.log(`📦 Số lượng khoá học tìm được: ${tongKhoa}`);

//         for (let i = 0; i < tongKhoa; i++) {
//             const tenKhoa = await dSPage.getTenKhoaAt(i);
//             console.log(`Khóa ${i + 1}: ${tenKhoa}`);
//         }

//         for (let i = 0; i < tongKhoa; i++) {
//             // Lấy tiêu đề trong danh sách
//             const titleInList = await dSPage.getTenKhoaAt(i);
//             console.log(`\n 🔍 [${i + 1}] Tên khóa học trong danh sách: "${titleInList}"`);
            
//             try {
//                 // Click vào khóa học
//                 // const detailPage = await danhSachPage.clickCourse(i);
//                 const detailPage = await dSPage.clickCourseAt(i);

//                 // Lấy tiêu đề trang chi tiết
//                 const titleInDetail = await detailPage.getKhoaTieuDe();
//                 if (!titleInDetail) {
//                     console.log(`❌ [${i + 1}] Không lấy được tiêu đề trang chi tiết hoặc lỗi 404`);
//                 } else if (titleInDetail !== titleInList) {
//                     console.log(`❌ [${i + 1}] KHÔNG TRÙNG:
//                         - Danh sách: "${titleInList}"
//                         - Thông Tin:  "${titleInDetail}"`);
//                 } else {
//                     console.log(`✅ [${i + 1}] Khớp tiêu đề`);
//                 }
//                 await page.goto('/khoahoc');
            
//                 // Quay lại trang danh sách để kiểm tra khóa học tiếp theo
//                 // await page.goto("/khoahoc");
                
//             } catch (e) {
//             console.log(`❌ [${i + 1}] Lỗi khi test khóa "${titleInList}":`, e instanceof Error ? e.message : e);
//             try {
//                 await page.goto("/khoahoc");
//             } catch (navErr) {
//                 console.log('⚠️ Lỗi khi chuyển về trang danh sách:', navErr instanceof Error ? navErr.message : navErr);
//             }    
//             continue;
//             }    
//         }
//     });

//     test('Log tất cả tên khóa học theo từng trang', async () => {

//   // Lấy tất cả tên khóa học theo trang
//   const danhSach = await dSPage.getTatCaKhoaHocTheoTrang();

//   // Log từng trang ra ngoài
// //   danhSach.forEach((khoaHoc, i) => {
// //     console.log(`📘 Trang ${i + 1}:`);
// //     khoaHoc.forEach((ten, index) => {
// //       console.log(`  - [${index + 1}] ${ten}`);
// //     });
// //   });

//       danhSach.forEach((khoaHocTrang, pageIndex) => {
//     console.log(`\n 📘 Trang ${pageIndex + 1}:`);
//     khoaHocTrang.forEach((tenKhoa, khoaIndex) => {
//       console.log(`Tên khoá học  - [${khoaIndex + 1}] ${tenKhoa}`);
//     });
//   });
// });

    test('Log tên khóa học của trang nhập tay', async ({ page }) => {
        const pageToLog = 6; // Set cứng số trang muốn log (ví dụ trang 3)

        await dSPage.goAllPage(pageToLog);
        console.log(`\n ---Trang ${pageToLog}:`);
        const tongKhoa = await dSPage.getTongKhoa();

        for (let i = 0; i < tongKhoa; i++) {
            const titleInList = await dSPage.getTenKhoaAt(i);
            console.log(`🔍 [${i + 1}] Tên khóa học trong danh sách: "${titleInList}"`);
        }
    });

    test ("Các khoá trùng tiêu đề", async () => {
        const pageToLog = 3; // Set cứng số trang muốn log (ví dụ trang 3)

        await dSPage.goAllPage(pageToLog);
        console.log(`\n ---Trang ${pageToLog}:`);
        const tongKhoa = await dSPage.getTongKhoa();
        const titles: string[] = [];
        const descriptions: string[] = [];
        const moTaList = await dSPage.getTieuDeKhoa();
        for (let i = 0; i < tongKhoa; i++) {
            const titleInList = await dSPage.getTenKhoaAt(i);
            // const moTa = await dSPage.getTieuDeKhoa();
            titles.push(titleInList);
            descriptions.push(moTaList[i]);
        }
        
        // ✅ Log kết quả nhóm
        logTheoMoTa(titles, descriptions);

    })

    test("Kiểm tra UI tầng khoá", async ({ page }) => {
        test.setTimeout(120_000);

        const pageToLog = await dSPage.goAllPage(6); //thay đổi trang thay luôn phần dưới
        
        const tongKhoa = await dSPage.getTongKhoa();

        // Log danh sách trang ra
        // for (let i = 0; i < tongKhoa; i++) {
        //     const tenKhoa = await dSPage.getTenKhoaAt(i);
        //     console.log(`[Trang 3][${i + 1}] Tên khóa: ${tenKhoa}`);
        // }
        console.log(`\n 📄 Trang ${pageToLog} tổng khoá học:`, tongKhoa);

        for(let i = 0; i < tongKhoa; i++) {

            try{
                const tenKhoa = await dSPage.getTenKhoaAt(i);
                console.log(`\n 👉 Đang kiểm tra khóa [${i + 1}]: ${tenKhoa}`);

                // await danhSachPage.clickCourse(i); // Click vào khóa học
                await dSPage.clickCourseAt(i);

                // Kiểm tra trang có hiển thị nội dung khóa học không (404 hay không)
                const contentVisible = await page.locator('.sideBarCourseDetail').isVisible({ timeout: 3000 });
                if (!contentVisible) {
                    console.log(`⚠️ [${i + 1}] Lỗi mở khóa học (404 hoặc không hiển thị)`);
                    await page.goto('/khoahoc');
                    continue;
                }

                // //kiểm tra ảnh
                // const takeImg = await thongTinKhoa.courseImage.first();
                // const hasImage = await thongTinKhoa.verifyImageVisible(takeImg);
                const hasImage = await thongTinKhoa.verifyCourseImage();
                if (hasImage) {
                    console.log(`✅ [${i + 1}]  Khoá học có ảnh`);
                }else {
                    console.log(`❌ [${i + 1}] Ảnh bị ẩn hoặc lỗi`);
                }
                await page.goto('/khoahoc',{ waitUntil: 'domcontentloaded' });
                await dSPage.goAllPage(6);
            } catch {
                console.log(`⚠️ [${i + 1}] Lỗi khi kiểm tra khóa học 404`);
                if (!page.isClosed()) {
                    await page.goto('/khoahoc'); // Đảm bảo luôn quay lại
                    await dSPage.goAllPage(6);
                }
                continue;
            }  
        }
    });

    test("Test các khoá UI trang danh sách", async () => {
        const pageToLog = await dSPage.goAllPage(6);
        const tongKhoa = await dSPage.getTongKhoa();
        console.log(`-- Trang ${pageToLog} tổng khoá học:`, tongKhoa);

        const { duplicates, uniques } = await dSPage.getDuplicateAndUniqueTitles();

        console.log("🔁 Khóa học TRÙNG hình:", duplicates);
        console.log("✅ Khóa học KHÔNG trùng hình:", uniques);
    })

    test("In danh sách mục và bài học trong khóa", async ({ page }) => {
        // await danhSachPage.openLapTrinhWeb();
        const tenKhoa = await dSPage.onlyCard(8);
        console.log(` ** Nội dung khoá học ${tenKhoa} :`)
        await tTPage.logCourseContent();
    });

    test("Log Những gì bạn sẽ học", async () => {
        const tenKhoa = await dSPage.onlyCard(3);
        console.log(`** Nội dung khoá học: ${tenKhoa}`);
  
        await tTPage.logCourseLearn();      // In phần “Những gì bạn sẽ học”
    });

    test("Log Giảng Viên", async () => {
        const tenKhoa = await dSPage.onlyCard(3);
        console.log(`** Tên khoá học: ${tenKhoa}`);
  
        await tTPage.logCourseIntro();      // In phần “Những gì bạn sẽ học”
    });


});    