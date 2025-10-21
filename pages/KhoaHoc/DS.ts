import { Page, Locator, expect } from "@playwright/test";
import { TtPage } from "./TT";

export class DsPage extends TtPage {
//   readonly page: Page;
  readonly tenCards: Locator;
  readonly nextPageButton: Locator;
  readonly nextPage3: Locator;
  readonly courseTitle: Locator;
  readonly courseImage: Locator;


  constructor(page: Page) {
    super(page)
    // this.page = page;
    this.tenCards = page.locator('.cardGlobalRes');
    this.nextPageButton = page.getByRole('button', { name: 'Next page' });
    this.nextPage3 = page.getByRole('button', { name: 'Page 3' });
    this.courseTitle = page.locator(".stikerCard"); //trang danh sach da khai
    this.courseImage = page.locator(".cardGlobal > img");
  }


  async clickCourseAt(index: number): Promise<TtPage> {
    const card = this.tenCards.nth(index);
    await card.scrollIntoViewIfNeeded();
    await card.click();
    return new TtPage(this.page);
  }


  async getTenKhoaAt(index: number): Promise<string> {
    return await this.tenCards.nth(index).locator('.stikerCard').textContent().then(t => t?.trim() || '');
  //   const card = this.tenCards.nth(index);
  // const title = card.locator('.stikerCard');
  
  // // Chờ phần tử hiển thị
  // await expect(title).toBeVisible({ timeout: 10000 });
  
  // const text = await title.textContent();
  // return text?.trim() || '';
  }

  async getTongKhoa(): Promise<number> {
      // Chờ khi phần loader biến mất
      await this.page.waitForSelector('#preloader', { state: 'detached', timeout: 10000 });

      // Chờ khi phần tử khóa học xuất hiện
      await this.page.waitForSelector('.stikerCard', { state: 'visible', timeout: 10000 });

      // Trả về số lượng khóa học sau khi DOM sẵn sàng
      return await this.tenCards.count();
  }

  //Duyệt từng trang
  async isNextPageAvailable(): Promise<boolean> {
    if (!(await this.nextPageButton.isVisible())) return false;

    const ariaDisabled = await this.nextPageButton.getAttribute('aria-disabled');
    return ariaDisabled !== 'true';
  }

   async goToNextPage(): Promise<void> {
    const isClickable = await this.isNextPageAvailable();
    if (!isClickable) return;
    await this.nextPageButton.click();
    await this.page.waitForLoadState('networkidle');
  }

    async getTatCaKhoaHocTheoTrang(): Promise<string[][]> {
      const allCourses: string[][] = [];
      let pageNumber = 1;

      while (true) {
        const pageCourses: string[] = [];
        const count = await this.getTongKhoa();

        for (let i = 0; i < count; i++) {
        const name = await this.getTenKhoaAt(i);
        pageCourses.push(name);
        }

        console.log(`📄 Trang ${pageNumber}:`, pageCourses);
        allCourses.push(pageCourses);

        const hasNext = await this.isNextPageAvailable();
        if (!hasNext) break;

        await this.goToNextPage();
        pageNumber++;
      }
      return allCourses;
    }

  // Điều hướng tới trang cụ thể
  async goAllPage(pageNumber: number) {
    for (let i = 0; i < pageNumber; i++) {
      const nextBtn = this.page.getByRole('button', { name: 'Next page' });
      if (!(await nextBtn.isVisible())) throw new Error(`Không thể đến trang ${pageNumber}`);
      await nextBtn.click();
      await this.page.waitForLoadState('networkidle');
    }
    const current = await this.page.locator('.paginationPages .pageLinkPages[aria-current="page"]').textContent();
    expect(Number(current)).toBe(pageNumber);
    return pageNumber;
  }


  async getTieuDeKhoa(): Promise<string[]> {
    const moTaElements = await this.page.locator('.cardGlobalRes .cardBodyGlobal h6');
    const count = await moTaElements.count();
    const moTaList: string[] = [];

    for (let i = 0; i < count; i++) {
      const element = moTaElements.nth(i);
      await expect(element).toBeVisible({ timeout: 5000 }); // thêm kiểm tra hiển thị
      const text = await element.textContent();
      moTaList.push(text?.trim() || '');
    }
    return moTaList;
  }
 
  // Lấy danh sách khóa học (tên + link hình)
async getCourses() {
  await this.tenCards.first().waitFor({ state: "visible", timeout: 10000 }); // chờ phần tử đầu tiên hiện ra

  return await this.tenCards.evaluateAll(cards =>
    cards.map(c => ({
      title: c.querySelector(".stikerCard")?.textContent?.trim() || "",
      img: c.querySelector("img")?.getAttribute("src") || ""
    }))
  );
}


  // Tìm khóa trùng / không trùng hình
  async getDuplicateAndUniqueTitles() {
    const courses = await this.getCourses();
    const map: Record<string, string[]> = {};

    courses.forEach(c => {
      map[c.img] = map[c.img] || [];
      map[c.img].push(c.title);
    });

    const duplicates = Object.values(map).filter(t => t.length > 1).flat();
    const uniques = Object.values(map).filter(t => t.length === 1).flat();

    return { duplicates, uniques };
  }

    //Điều hướng tới card cụ thể
  async onlyCard(cardNumber: number) {
    const card = await this.tenCards.nth(cardNumber - 1);
    const tenKhoa = await card.locator('.stikerCard').innerText();
    // await card.scrollIntoViewIfNeeded();
    await card.click();
    return tenKhoa.trim();
  }
  
}

//tái sử dụng gom gọn các khóa học theo mô tả, phân loại 
export function logTheoMoTa(titles: string[], descriptions: string[]) {
  const moTaMap = new Map<string, string[]>();

  // Gom nhóm theo mô tả
  titles.forEach((ten, i) => {
    const moTa = descriptions[i]?.trim() || '[Không có mô tả]';
    if (!moTaMap.has(moTa)) moTaMap.set(moTa, []);
    moTaMap.get(moTa)!.push(ten?.trim() || `Không tên [${i}]`);
  });

   // Tính tổng khóa có mô tả trùng
  let countChungMoTa = 0;
  moTaMap.forEach((list) => {
    if (list.length > 1) countChungMoTa += list.length;
  });

  console.log(`📘 Tổng số khóa học có mô tả trùng nhau: ${countChungMoTa}\n`);

   // In khóa có mô tả trùng
  for (const [moTa, list] of moTaMap) {
    if (list.length > 1) {
      console.log(`✅ Chung mô tả: "${moTa}"`);
      list.forEach((title, i) => console.log(`  - [${i + 1}] ${title}`));
      console.log();
    }
  }

  // In khóa riêng biệt
  for (const [moTa, list] of moTaMap) {
    if (list.length === 1) {
      console.log(`❌ Riêng biệt: "${list[0]}" → "${moTa}"`);
    }
  }


}
