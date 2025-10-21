import { Page, Locator } from '@playwright/test';

export class TtPage {
  readonly page: Page;
  readonly courseTitle: Locator;
  readonly mucGioiThieu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.courseTitle = page.locator('h4.titleDetailCourse'); // cập nhật selector nếu khác
    this.mucGioiThieu = page.locator(".courseDetailItem");
  }

  // async getKhoaTieuDe(): Promise<string> {
  //   return await this.courseTitle.textContent().then(t => t?.trim() || '');
  // }

  async getKhoaTieuDe(): Promise<string> {
  try {
    const title = await this.page.locator('h4.titleDetailCourse').textContent({ timeout: 5000 });
    return title?.trim() || '';
  } catch {
    console.log('⚠️ Không tìm thấy tiêu đề khóa học chi tiết hoặc trang lỗi 404');
    return '';
  }
  }
    // 🧩 Lấy dữ liệu toàn bộ phần nội dung khóa học
  async logCourseContent() {

    const sections = this.page.locator(".courseDetailItem");
    const count = await sections.count();

    for (let i = 0; i < count; i++) {
      const section = sections.nth(i);
      const title = (await section.locator(".sectionCourse span").innerText()).trim();

      console.log(`📚 ${title}`);

      const lessons = section.locator(".lessonContainer .lessonContent");

      const lessonCount = await lessons.count();
      for (let j = 0; j < lessonCount; j++) {
        const lesson = lessons.nth(j);
        const name = (await lesson.locator("span:first-child").innerText()).trim().replace(/\s+/g, " ");
        const time = (await lesson.locator("span:last-child").innerText()).trim().replace(/\s+/g, " ");

        console.log(`   ${j + 1}. ${name} — 🕒 ${time}`);
      }
    }
  }

  // log phần "Những gì bạn sẽ học"
  async logCourseLearn() {
    const mucHoc = this.page.locator('.boxCourseLearn li a');
    const count = await mucHoc.count();

    console.log('\n🎯 NHỮNG GÌ BẠN SẼ HỌC:');
    for (let i = 0; i < count; i++) {
      const text = (await mucHoc.nth(i).innerText()).trim();
      console.log(`   ${i + 1}. ${text}`);
    }
  }

  // async logCourseIntro() {
  //   const introBlocks = this.page.locator('.detailCourseIntro');
  //   // Giảng viên
  //   const tenGv = await introBlocks.nth(0).locator('p').nth(0).innerText();
  //   const gv = await introBlocks.nth(0).locator('p').nth(1).innerText();
  
  //   // Lĩnh vực
  //   const lvLabel = await introBlocks.nth(1).locator('p').nth(0).innerText();
  //   const lvValue = await introBlocks.nth(1).locator('.instrutorTitle p:nth-child(2)').innerText();
  //   // const linhVucText = await introBlocks.nth(1).innerText();
  //   // const lvValue = linhVucText.split('\n').pop().trim() || '(Không có dữ liệu)';
  //   // const linhVucParas = await introBlocks.nth(1).locator('.instrutorTitle p').allInnerTexts();
  //   // const lvLabel = linhVucParas[0] || 'Lĩnh vực';
  //   // const lvValue = linhVucParas[1] || '(Chưa có dữ liệu)';

  //   // Đánh giá
  //   // const rating = await introBlocks.nth(2).locator('span').innerText();
  //   // const soDanhGia = await introBlocks.nth(2).locator('p').innerText();

  //   const danhGia = await introBlocks.nth(2).locator('span, p').allInnerTexts();
  //   const [rating, soDanhGia] = danhGia;

  //   console.log(` ${tenGv}: ${gv}`);
  //   console.log(` ${lvLabel}: ${lvValue}`);
  //   console.log(` ${rating}: (${soDanhGia})`);
  // }


  async logCourseIntro() {
  const introBlocks = this.page.locator('.detailCourseIntro');

  // 👨‍🏫 Giảng viên
  const gvParas = await introBlocks.nth(0).locator('p').allInnerTexts();
  const tenGv = gvParas[0] || 'Giảng viên';
  const gv = gvParas[1] || '(Chưa có dữ liệu)';

    // 🧭 Lĩnh vực (đọc toàn bộ block, rồi tách theo dòng)
  await this.page.waitForTimeout(5000);
  const lvLabel = await introBlocks.nth(1).locator('p').nth(0).innerText();
  const lv = (await introBlocks.nth(1).locator('.instrutorTitle p').nth(1).textContent())?.trim() || '(Chưa có dữ liệu)';


  // ⭐ Đánh giá
  const danhGia = await introBlocks.nth(2).locator('span, p').allInnerTexts();
  const rating = danhGia[0] || '0.0';
  const soDanhGia = danhGia[1] || '0 đánh giá';

  // 🧾 In kết quả
  console.log(` ${tenGv}: ${gv}`);
  console.log(` ${lvLabel}: ${lv}`);
  console.log(` ${rating}: (${soDanhGia})`);

//   const lvHTML = await introBlocks.nth(1).innerHTML();
// console.log('👉 Lĩnh vực HTML:', lvHTML);


}

}
