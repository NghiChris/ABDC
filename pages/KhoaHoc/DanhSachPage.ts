import { Page, Locator, expect } from "@playwright/test";
import { TtPage } from "./TT";

export class DanhSachPage extends TtPage {
    // readonly page: Page;
    // readonly khoaHocTitle: Locator;
    readonly comeBack: Locator;
    readonly pageCard1: Locator;
    readonly pageCard2: Locator;
    readonly pageCard3: Locator;
    readonly pageCard4: Locator;
    readonly titleCard4: Locator;
    readonly titleDetail4: Locator;
    readonly pageCard5: Locator;
    readonly pageCard6: Locator;
    readonly pageCard7: Locator;
    readonly pageCard8: Locator;
    // readonly pageCard9: Locator;
    // readonly pageCard10: Locator;
    readonly pageCard12: Locator;
    readonly nextPage2: Locator;
    readonly moPageAn: Locator;
    readonly nutTruoc: Locator;
    readonly nutSau: Locator;
    readonly page2Card1: Locator;
    readonly atPage2: Locator;
    // readonly nextPage1: Locator;
    // readonly nextPage13: Locator;
    readonly pageLink: Locator;
    readonly courseCards: Locator;
    readonly courseTitles: Locator;
    // readonly khoaCards: Locator;// mới
    readonly khoaTitles: Locator;
    readonly khoaAuthors: Locator;
    readonly khoaPrices: Locator;
    readonly khoaRatings: Locator;
    readonly phanTrang: Locator;


   

    constructor (page: Page) {
        super(page)
        // this.page = page;
        // this.khoaHocMenu = page.locator("a[href='/khoahoc']").first();
        // this.khoaHocTitle = page.locator("h3").first();
        this.comeBack = page.getByRole('link', { name: "Quay về trang chủ" });
        this.pageCard1 = page.locator("a[href='/chitiet/']");
        this.pageCard2 = page.locator("a[href='/chitiet/100999']");
        this.pageCard3 = page.locator("a[href='/chitiet/1009991']");
        this.pageCard4 = page.locator("a[href='/chitiet/10099924']");
        this.titleCard4 = page.locator('.stikerCard', { hasText: 'Javascripttasaasdsazxcxz' });
        this.titleDetail4 = page.locator("h4");
        this.pageCard5 = page.locator("a[href='/chitiet/111111111111']");
        this.pageCard6 = page.locator("a[href='/chitiet/12343554654546456456']");
        this.pageCard7 = page.locator("a[href='/chitiet/12345']");
        this.pageCard8 = page.locator("a[href='/chitiet/100999999']");
        // this.pageCard9 = page.locator("a[href='/chitiet/123456y']");
        // this.pageCard10 = page.locator("a[href='/chitiet/13454']");
        this.pageCard12 = page.locator("a[href='/chitiet/15054']");
        this.nextPage2 = page.getByRole('button', { name: 'Page 2' });
        this.moPageAn = page.getByRole('button', { name: '...' });
        this.nutTruoc = page.getByRole('button', { name: 'Previous page' });
        this.nutSau = page.getByRole('button', { name: 'Next page' });
        // this.nutTruoc = page.locator('.paginationPages .pageLinkPages:has-text("Trước")');
        // this.nutSau = page.locator('.paginationPages .pageLinkPages:has-text("Sau")')
        this.page2Card1 = page.locator('.stikerCard', { hasText: 'Javascript nâng cao cấp abc' });
        this.atPage2 = page.getByRole('button', { name: 'Page 2 is your current page' });
        // this.nextPage1 = page.getByRole('button', { name: 'Page 1' });
        // this.nextPage13 = page.getByRole('button', { name: 'Page 13' });
        this.pageLink = page.locator(".pageLinkPages");
        this.courseCards = page.locator(".cardGlobalRes")
        this.courseTitles = page.locator(".cardGlobalRes .stikerCard")
        // this.khoaCards = page.locator('.cardGlobalRes'); // locator chính cho card mới
        this.khoaTitles = page.locator('.cardGlobalRes h6');
        this.khoaAuthors = page.locator('.cardGlobalRes .titleMaker .colorCardTitle');
        this.khoaPrices = page.locator('.cardGlobalRes .cardFooter div:first-child p:last-child');
        this.khoaRatings = page.locator('.cardGlobalRes .cardFooter span.textStar');
        this.phanTrang = page.locator('.paginationPages .pageLinkPages');

    }
    
    // mở danh sách khoá học
    async openJavascriptt() {
        await this.pageCard1.click();
        // await this.backTrangChu.click();
        // console.log(await this.khoaHocMenu.allTextContents());
    }
    
    async backHome() {
        await this.comeBack.click();
    }

    async openLapTrinhWeb() {
        await this.pageCard2.click();
    }

    async openPage2() {
        await this.nextPage2.click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForSelector(".cardGlobalRes", { state: "visible" });
    }

    async openPageAn() {
        await this.moPageAn.click();
    }
    
    // Chuyển trang theo số (ví dụ: 1, 13) cách 1, do nút trước vs sau ko chuyển hướng nên ko dùng code này
    // async goToPage(pageNumber: number) {
    //     await this.pageLink.locator(`text="${pageNumber}"`).click();
    // }

    // Chuyển trang theo số (VD: 1, 8) cách 2, nút trước sau ko chuyển hướng dùng code này
    async goToPage(pageNumber: number) {
        // Đợi phần tử phân trang xuất hiện
        await this.page.waitForSelector(".pageLinkPages", { state: "visible" });
        // Tìm page có text tương ứng
        const target = this.pageLink.filter({ hasText: pageNumber.toString() });
        
        const count = await target.count();
        if (count === 0) {
            console.warn(`⚠️ Không tìm thấy nút trang ${pageNumber}. Bỏ qua thao tác.`);
            return;
        }
        const targetEl = target.first();
        await targetEl.scrollIntoViewIfNeeded();
        await expect(targetEl).toBeVisible();

        // Kiểm tra trạng thái có disabled không
        const ariaDisabled = await targetEl.getAttribute("aria-disabled");
        if (ariaDisabled === "true") {
            console.warn(`⚠️ Trang ${pageNumber} bị vô hiệu hóa (aria-disabled=true).`);
            return;
        }

        await targetEl.click();
        console.log(`📄 Đã chuyển đến trang ${pageNumber}`);

        // Đợi load trang xong (tùy trang)
        await this.page.waitForLoadState("networkidle");
    
    }

    //Kiểm tra nút có thể click hay không
    async clickIfEnabled(locator: Locator, label: string) {
        if(await locator.isEnabled() && !(await locator.getAttribute("aria-disabled") === "true")) {
            await locator.click();
            console.log(`✅ Click nút ${label} thành công`);
        } else {
            console.log(`⚠️ Nút ${label} đang bị vô hiệu hóa, bỏ qua.`);
        }
    }

    async operation() {
        await this.openPageAn();
        await this.clickIfEnabled(this.nutTruoc, "Trước");
        await this.goToPage(13);
        await this.clickIfEnabled(this.nutSau, "Sau");
        await this.goToPage(1);
        await this.clickIfEnabled(this.nutTruoc, "Trước");
    }

    // kiểm tra bắt buộc ở trang 2, ko khớp sẽ trả về faile .toBeVisible
    // async isAtKhoaHocPage2() {
    //     await expect(this.atPage2).toBeVisible();
    // }

    //Promise<boolean> bắt buộc trả về true và false
    async isAtKhoaHocPage2(): Promise<boolean> {
        return await this.atPage2.isVisible();
    }

    //cuộn đến 1 phần tử cụ thể
    async scrollToElement(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    //cuộn lên đầu trang
    async scrollToTop() {
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
        });
    }

    async getCourseTitle(index: number): Promise<string> {
        const titleEl = this.courseTitles.nth(index);
        await titleEl.waitFor({ state: "visible" });
        return (await titleEl.innerText()).trim();
    }

    async clickCourse(index: number): Promise<TtPage> {
        const card = this.courseCards.nth(index).locator("a.cardGlobal");
        await card.scrollIntoViewIfNeeded();
        await card.click();
        // console.log(`Click vào khóa học thứ ${index + 1}`);
        return new TtPage(this.page);
    }

    async clickCard(index: number) {
  const card = this.courseCards.nth(index).locator("a.cardGlobal");

  // Lấy locator tĩnh trước khi trang có thể thay đổi
  const href = await card.getAttribute("href");

  if (href) {
    // Truy cập trực tiếp để tránh bị mất DOM
    await this.page.goto(href, { waitUntil: "domcontentloaded" });
  } else {
    // Dự phòng nếu không có href (hiếm gặp)
    await card.waitFor({ state: "visible", timeout: 10000 });
    await card.click({ force: true });
  }
}


    // async getCourseNameByIndex(index: number) {
    //     const name = await this.courseCards.nth(index).locator('.stikerCard').innerText();
    //     return name.trim();
    // }



    // Đếm số lượng khóa học trên trang
    async getCourseCount() {
        // await this.page.waitForLoadState("domcontentloaded");
        // // await this.page.waitForSelector(".cardGlobalRes", { state: "visible", timeout: 5000 });
        await this.courseCards.first().waitFor({ state: 'visible' });
        return await this.courseCards.count();
    }

    async getCourseInfo(index: number) {
        const title = await this.khoaTitles.nth(index).innerText();
        const author = await this.khoaAuthors.nth(index).innerText();
        const price = await this.khoaPrices.nth(index).innerText();
        const rating = await this.khoaRatings.nth(index).innerText();
        return { title, author, price, rating };
    }

    async clickNextPage() {
        await this.nutSau.click({ timeout: 10000 });
        // await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1500);
    }

  async clickPrevPage() {
    // await this.nutTruoc.scrollIntoViewIfNeeded();

    await this.nutTruoc.click({ timeout: 10000 });
    // await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1500);
  }

  // 🔹 Xác minh tất cả khóa học có tiêu đề
    async verifyAllCoursesHaveTitle() {
        const count = await this.getCourseCount();
        for (let i = 0; i < count; i++) {
            const title = await this.courseTitles.nth(i).innerText();
            expect(title.trim()).not.toBe('');
        }
    }

    // Log tên khoá học
    async logAllCourseTitles() {
      const count = await this.getCourseCount();
       console.log(`📚 Tổng số khóa học : ${count}`);

      for (let i = 0; i < count; i++) {
      const title = await this.courseTitles.nth(i).innerText();
      console.log(`   ${i + 1}. ${title.trim()}`);
      }
    }

    // async getActivePageNumber() {
    //   return await this.page.locator('.paginationPages .page-item.active').innerText();
    // }

    async getActivePageNumberSafe() {
  const activeLocator = this.page.locator('.paginationPages .page-item.active');
  if (await activeLocator.count() === 0) {
    return 'Không tìm thấy phân trang';
  }
  return await activeLocator.innerText();
}

    // Lấy giá của khóa học đầu tiên
  async getFirstCoursePrice() {
    const priceText = await this.khoaPrices.first().innerText();
    return priceText.replace(/\s+/g, "").trim();
  }

    async openFirstCourseDetail() {
    await this.pageCard2.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

    // async clickCourseByIndex(index: number) { //mới........
    //     const courseTen = await this.courseTitles.nth(index).innerText();
    //     await this.courseTitles.nth(index).click();
    //     await this.page.waitForLoadState('networkidle');
    //     // ✅ Return lại tiêu đề để test chính dùng
    //     return courseTen.trim();
    // }

    //     async clickCourseName(index: number) {
    //     const categoryName = await this.courseTitles.nth(index).innerText();
    //     console.log(`📂 Click vào danh mục: ${categoryName}`);
    //     await this.courseTitles.nth(index).click();
    //     await this.page.waitForLoadState("domcontentloaded");
    // }

//     async clickCourseByIndex(index: number) {
//   const courseLink = await this.courseTitles.nth(index).getAttribute("href");
//   const courseTen = await this.courseTitles.nth(index).innerText();
  
//   // mở tab mới thay vì click trong cùng tab
//   const [newPage] = await Promise.all([
//     this.page.context().waitForEvent("page"),
//     this.page.evaluate((href) => window.open(href, "_blank"), courseLink),
//   ]);

//   await newPage.waitForLoadState("domcontentloaded");
//   return { newPage, courseTen: courseTen.trim() };
// }
    //     async clickCourseByIndex(index: number) { //mới........
    //     try{
    //         const courseTen = await this.courseTitles.nth(index).innerText();
    //         await this.courseTitles.nth(index).click();
    //         await this.page.waitForLoadState('networkidle');
    //         // Kiểm tra xem có bị lỗi 404 / popup / trang rỗng không
    //         const bodyHTML = await this.page.content();
    //         const is404 =
    //             /404|not\sfound/i.test(bodyHTML) ||
    //             /Trang không tồn tại/i.test(bodyHTML) ||
    //             /swal2-title[^>]*>.*(Lỗi|Error)/i.test(bodyHTML);

    //         if (is404) {
    //             console.warn(`⚠️  Khóa "${courseTen}" bị lỗi 404 — quay lại danh sách.`);
    //             await this.page.goBack({ waitUntil: "domcontentloaded" });
    //             return null; // ⬅️ báo cho test biết bỏ qua khóa này
    //         }

    //         // ✅ Return lại tiêu đề để test chính dùng
    //         return courseTen.trim();
    //     } catch (error) {
    //         console.warn(`⚠️  Click khóa thứ ${index + 1} thất bại hoặc timeout.`);
    //         await this.page.goBack({ waitUntil: "domcontentloaded" }).catch(() => {});
    //         return null;
    //     }    
    // }


// Mở
async clickAllCoursesInPage2() {
    // await this.openPage2(); // Hàm bạn đã có sẵn

    const courseCount = await this.courseTitles.count();

    for (let i = 0; i < courseCount; i++) {
        // Phải lấy lại danh sách sau mỗi lần reload page
        const titles = this.courseTitles;
        const titleText = await titles.nth(i).innerText();
        console.log(`\n 📚 Đang mở khóa học thứ ${i + 1}: ${titleText}`);

        await titles.nth(i).click();
        await this.page.waitForLoadState("domcontentloaded");

        // Nếu muốn in ra mô tả:
        const courseKhoa = await this.page.locator('h4.titleDetailCourse').innerText();
        const description = await this.page.locator('p.textDiscripts').innerText();
        console.log(`Thông tin tên khoá học: ${courseKhoa}`);
        console.log(`📝 Mô tả: ${description.substring(0, 100)}...`);

        // Quay lại danh sách
        await this.page.goBack();
        await this.page.waitForLoadState("domcontentloaded");
    }
}

// async clickAllCoursesInPage2() {
//   await this.openPage2();

//   // Lấy tất cả locator thẻ <a> của các khóa học
//   const courseLinks = this.page.locator('.cardGlobalRes a.cardGlobal');
//   const count = await courseLinks.count();

//   for (let i = 0; i < count; i++) {
//   const courseItem = courseLinks.nth(i);
//   const titleText = await this.courseTitles.nth(i).innerText();
//   const href = await courseItem.getAttribute('href');

//   if (!href) {
//     console.log(`❌ Khóa học thứ ${i + 1} (${titleText}) không có href`);
//     continue;
//   }

//   // Log rõ ràng hơn
//   console.log(`\n📚 Khóa học #${i + 1}: `);
// //   console.log(`🔗 Link: ${href}`);
//   console.log(`📌 Tên hiển thị ở danh sách: ${titleText}`);

//   const url = new URL(href, this.page.url()).toString();

//   const [newPage] = await Promise.all([
//     this.page.context().waitForEvent('page'),
//     this.page.evaluate((url) => window.open(url, '_blank'), url),
//   ]);

//   await newPage.waitForLoadState('domcontentloaded');

//   const detailTitle = await newPage.locator('h4.titleDetailCourse').innerText();
//   const description = await newPage.locator('p.textDiscripts').innerText();

//   console.log(`🧾 Tiêu đề chi tiết: ${detailTitle}`);
// //   console.log(`📝 Mô tả: ${description.substring(0, 100)}...`);

//   await newPage.close();

//     // Quay về tab chính (không cần thao tác gì thêm vì đang thao tác trên this.page)
//   }
// }


}   

