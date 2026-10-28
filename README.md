# PMP Formula Calculator - Hướng Dẫn Sử Dụng & Đánh Giá Kết Quả

Công cụ tính toán công thức Quản lý Dự án chuẩn PMP (Project Management Professional) được xây dựng dưới dạng ứng dụng web đơn file (`pmp-calculator.html`), thuần HTML/CSS/JavaScript (Vanilla JS), chạy offline 100%, không phụ thuộc thư viện ngoài (zero CDN/network dependency).

---

## 1. Hướng Dẫn Khởi Chạy

Bạn có thể chạy ứng dụng theo 2 cách:

* **Cách 1 (Mở trực tiếp):** Nhấp đúp chuột vào file `index.html` hoặc `pmp-calculator.html` bằng bất kỳ trình duyệt nào.
* **Cách 2 (Chạy qua Local Web Server):** 
  ```powershell
  npm start
  ```
  Sau đó truy cập: **http://localhost:3000**
* **Cách 3 (Triển khai Online miễn phí lên Vercel):**
  1. Kho mã nguồn đã được cấu hình sẵn tệp `vercel.json` và file đích `index.html`.
  2. Truy cập [https://vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
  3. Chọn **Add New...** -> **Project**.
  4. Chọn repository **`mrbit4578/pmp-calculator-2026`** và bấm **Deploy**.
  5. Vercel sẽ tự động cấp một tên miền HTTPS toàn cầu (ví dụ: `https://pmp-calculator-2026.vercel.app`) để truy cập từ bất kỳ thiết bị nào (máy tính, điện thoại, tablet).
  6. Mọi commit / push mới lên GitHub sẽ tự động được Vercel build & cập nhật trực tuyến tức thì.

---

## 2. Quy Tắc Giao Diện & Tính Năng Trọng Tâm

* **Hệ sinh thái Trợ lý AI Kép (Dual-AI Platform: River.ai & Experiential Labs):**
  * **1. River.ai (Logic Toán học, Kế toán Quản trị & Đối chiếu):**
    * Tích hợp model **`moonshotai/Kimi-K3`** (khuyến nghị cho suy luận logic và tính toán số học phức tạp), ngoài ra hỗ trợ tùy chọn **`deepseek-ai/DeepSeek-V4.1-Flash`**, **`Qwen/Qwen3.8-27B-FP8`**, **`GLM-5.3`** qua API chuẩn OpenAI (`https://api.river.ai/v1`).
    * **Nút `[ 🤖 Tham vấn AI ]` (1-Click Tab Audit):** Tự động gom toàn bộ tham số đầu vào và số liệu tính toán của Tab hiện tại, gửi đến AI để:
      * Đối chiếu tính toán số học, phát hiện các trường hợp dữ liệu bất thường hoặc phép tính vô lý.
      * Phân tích ý nghĩa tài chính kế toán quản trị, giải thích công thức dưới góc độ dòng tiền và ngân sách.
      * Gợi ý phương án khắc phục (Fast-tracking, Crashing, Value Engineering).
  * **2. Experiential Labs (GPT-6 Luna Decisions - Thẩm định Quyết định Dự án):**
    * Tích hợp model **`gpt-6-luna-decisions`** (tại `https://api.experientiallabs.ai/v1/decisions`, nền tảng [platform.experientiallabs.ai](https://platform.experientiallabs.ai/models/gpt-6-luna-decisions)).
    * **Nút `[ ⚖️ Quyết định GPT-6 ]` (1-Click Governance Gate):** Đóng vai trò Ban Quản trị Thay đổi (Change Control Board - CCB) hoặc Hội đồng Tài chính Dự án để đưa ra phán quyết quản trị chính thức:
      * `✅ ACCEPT (PHÊ DUYỆT)`: Dự án/Phương án khả thi, số liệu đạt chuẩn kiểm soát rủi ro.
      * `❌ REJECT (TỪ CHỐI)`: Dự án bội chi nghiêm trọng, NPV âm nặng hoặc rủi ro vượt ngưỡng chịu đựng.
      * `⚠️ REVIEW (CẦN GIẢI TRÌNH THÊM)`: Dữ liệu chưa đủ tin cậy, thiếu dòng tiền hoặc có biến động bất thường cần thẩm tra bổ sung.
      * Hiển thị kèm **Giải trình quyết định (Rationale)** và **Độ tin cậy mô hình (%)**.
  * **Cài đặt API bảo mật tuyệt đối:**
    * Bấm nút **`[ ⚙️ Cài đặt AI ]`** trên thanh điều hướng để mở bảng cấu hình 2 tab riêng biệt cho River.ai và Experiential Labs.
    * Tích hợp nút **`🔌 Kiểm tra kết nối`** để ping thử API trực tiếp trước khi sử dụng.
    * Toàn bộ API Key chỉ lưu trong trình duyệt người dùng (`localStorage`), không bao giờ bị lưu vào file mã nguồn hay commit lên GitHub.
* **Đa ngôn ngữ (English / Tiếng Việt / 中文):**
  * Chuyển đổi linh hoạt 3 ngôn ngữ ngay trên thanh tiêu đề qua 3 nút: **`[ EN ]`**, **`[ Tiếng Việt ]`**, **`[ 中文 ]`**.
  * Chuyển đổi tự động toàn bộ tiêu đề, nhãn bảng, nút bấm, hướng dẫn và mô tả mà không làm gián đoạn dữ liệu đang nhập hay định dạng kiểm thử.
* **Sơ đồ tư duy trực quan (Mindmap):**
  * Nút **`[ 🗺️ Sơ đồ Mindmap ]`** / **`[ Mindmap ]`** mở cửa sổ pop-up sơ đồ tư duy toàn diện 12 vùng kiến thức PMP.
  * Mỗi nút phân nhánh tóm tắt công thức cốt lõi và tích hợp nút nhảy nhanh **`👉 Đến Tab ...`** giúp chuyển đổi tức thì đến công cụ mong muốn.
* **Cẩm nang đọc thông số kết quả (Result Guide):**
  * Nút **`[ 📖 Hướng dẫn kết quả ]`** / **`[ Result Guide ]`** mở cẩm nang tra cứu ý nghĩa thực tế của các chỉ số:
    * **CPI / SPI:** Thế nào là tiết kiệm chi phí ($> 1.0$), vượt ngân sách ($< 1.0$), vượt tiến độ hoặc chậm tiến độ.
    * **TCPI:** Ngưỡng khả thi và khi nào ngân sách mục tiêu là phi thực tế ($> 1.2$).
    * **CPM Float:** Ý nghĩa của $Total\ Float = 0$ (Đường găng sống còn của dự án).
    * **Six Sigma DPMO & CoQ:** Mức 3.4 DPMO đẳng cấp 6-Sigma và cách phân bổ Chi phí phòng ngừa vs Thất thoát bên ngoài.
    * **Tài chính & Lợi ích:** Phân tích quy tắc chọn dự án theo $NPV > 0$, $IRR > WACC$, điểm hòa vốn Make vs Buy.
* **Giao diện:** Dark Theme chuẩn GitHub (`#0d1117` nền, `#c9d1d9` chữ, `#58a6ff` điểm nhấn, font Monospace).
* **Nút bấm trên mỗi Tab:**
  * **Compute / Tính toán:** Tính toán toàn bộ công thức của tab hiện tại.
  * **Copy / Sao chép:** Sao chép toàn bộ khối kết quả đầu ra vào Clipboard.
  * **Reset / Đặt lại:** Xóa trắng toàn bộ ô nhập liệu và kết quả của tab đó.
  * **🤖 Tham vấn AI:** Gửi số liệu đến Kimi-K3 để phân tích kế toán và đối chiếu số học.
  * **⚖️ Quyết định GPT-6:** Gửi số liệu đến GPT-6 Luna Decisions để thẩm định phê duyệt/từ chối.
* **Xử lý ngoại lệ:** Khi ô nhập bị trống hoặc phép chia cho 0, dòng công thức tương ứng sẽ hiển thị `INVALID INPUT` mà không làm gián đoạn các phép tính khác.

---

## 3. Chi Tiết 12 Tab: Cách Nhập Liệu & Đánh Giá Kết Quả

---

### Tab 1: Earned Value Management (EVM - Quản lý giá trị thu được)

#### Cách nhập liệu:
* **EV (Earned Value):** Giá trị thu được từ công việc thực tế hoàn thành.
* **AC (Actual Cost):** Chi phí thực tế đã chi trả.
* **PV (Planned Value):** Giá trị kế hoạch dự kiến đạt được đến thời điểm báo cáo.
* **BAC (Budget at Completion):** Tổng ngân sách ban đầu phê duyệt cho toàn dự án.

#### Công thức & Kết quả:
* $CV = EV - AC$ (Cost Variance)
* $SV = EV - PV$ (Schedule Variance)
* $CPI = EV / AC$ (Cost Performance Index)
* $SPI = EV / PV$ (Schedule Performance Index)
* $EAC = BAC / CPI$ (Dự báo chi phí hoàn thành theo hiệu suất CPI hiện tại)
* $EAC_{AC} = AC + (BAC - EV)$ (Dự báo chi phí khi sai lệch chi phí trong quá khứ là bất thường)
* $EAC_{CPI \times SPI} = AC + \frac{BAC - EV}{CPI \times SPI}$ (Dự báo khi cả chi phí và tiến độ đều ảnh hưởng)
* $ETC = EAC - AC$ (Chi phí cần thêm để hoàn thành dự án)
* $VAC = BAC - EAC$ (Độ lệch ngân sách lúc kết thúc dự án)
* $TCPI_{BAC} = \frac{BAC - EV}{BAC - AC}$ (Chỉ số hiệu suất cần đạt để về đích đúng ngân sách BAC)
* $TCPI_{EAC} = \frac{BAC - EV}{EAC - AC}$ (Chỉ số hiệu suất cần đạt để về đích theo ngân sách sửa đổi EAC)

#### Đánh giá số liệu sau khi chạy:
* **$CV > 0$, $CPI > 1$:** Dự án đang **dưới ngân sách** (tiết kiệm chi phí, rất tốt).
* **$CV < 0$, $CPI < 1$:** Dự án đang **vượt ngân sách** (đang lỗ chi phí, cần kiểm soát gắt gao).
* **$SV > 0$, $SPI > 1$:** Dự án đang **vượt tiến độ** (nhanh hơn kế hoạch).
* **$SV < 0$, $SPI < 1$:** Dự án đang **chậm tiến độ** (cần xem xét fast-tracking hoặc crashing).
* **$TCPI > 1$:** Cần làm việc khẩn trương và năng suất cao hơn mức bình thường thì mới đạt mục tiêu. $TCPI > 1.2$ thường bị xem là phi thực tế, cần xem xét điều chỉnh lại BAC thành EAC.

---

### Tab 2: Critical Path Method (CPM - Phương pháp đường găng)

#### Cách nhập liệu:
* Nhập danh sách công việc dạng bảng động:
  * **Name:** Mã công việc (ví dụ: `A`, `B`, `C`, `D`).
  * **Dur:** Thời lượng thực hiện (số nguyên hoặc số thập phân).
  * **Preds:** Các công việc tiên quyết, phân cách bằng dấu phẩy (ví dụ: `A,B`). Nếu là công việc bắt đầu dự án, nhập `-` hoặc để trống.
* Nút **+ Add Row** / **- Remove Row** để thêm/bớt công việc linh hoạt.

#### Kết quả hiển thị:
* Bảng tiến độ tính toán tự động qua 2 lượt:
  * **Lượt đi (Forward pass):** $ES$ (Early Start), $EF = ES + Dur$ (Early Finish).
  * **Lượt về (Backward pass):** $LF$ (Late Finish), $LS = LF - Dur$ (Late Start).
  * **Độ trễ:** $TF = LS - ES$ (Total Float), $FF = \min(ES_{\text{successors}}) - EF$ (Free Float).
* **Project Duration:** Tổng thời gian hoàn thành dự án.
* **Critical Path:** Chuỗi đường găng (ví dụ: `A->B->D`).

#### Đánh giá số liệu sau khi chạy:
* Công việc nằm trên đường găng có **$TF = 0$**. Bất kỳ sự chậm trễ nào của các công việc này đều làm trễ toàn bộ ngày kết thúc của dự án.
* Công việc có **$TF > 0$** có khoảng đệm an toàn để điều phối tài nguyên sang cứu đường găng nếu cần.

---

### Tab 3: Cost Management (Quản lý chi phí)

#### Cách nhập liệu:
* Nhập các chỉ số kế hoạch và thực tế: **Planned Value (PV)**, **Actual Cost (AC)**, **Earned Value (EV)**, **Budget (BAC)**, cùng với tài nguyên **Available (Sẵn có)** và **Used (Đã sử dụng)**.

#### Đánh giá số liệu sau khi chạy:
* **Budget Variance ($BV = Budget - Actual$):** Số tiền ngân sách còn dư lại tại thời điểm hiện tại.
* **Resource Utilization ($RU\% = \frac{Used}{Available} \times 100$):**
  * $RU\% > 100\%$: Tài nguyên đang bị quá tải (Over-allocated), có rủi ro kiệt sức hoặc chi phí phạt tăng ca.
  * $RU\% < 70\%$: Tài nguyên nhàn rỗi (Under-utilized), lãng phí chi phí cố định.

---

### Tab 4: Quality Management (Quản lý chất lượng)

#### Cách nhập liệu:
* **Defects:** Số lượng lỗi phát hiện.
* **Units:** Số lượng sản phẩm/mẫu kiểm tra.
* **Opportunities/Unit:** Số cơ hội phát sinh lỗi trên mỗi đơn vị sản phẩm.
* **Good Units / Total Units:** Số sản phẩm đạt chuẩn / Tổng sản phẩm xuất xưởng.
* **Chi phí chất lượng (CoQ):** Gồm Prevention (Chi phí phòng ngừa), Appraisal (Chi phí thẩm định/đo kiểm), Internal Failure (Lỗi nội bộ phát hiện trước khi giao), External Failure (Lỗi phát hiện sau khi khách hàng nhận sản phẩm).

#### Đánh giá số liệu sau khi chạy:
* **Defect Density ($DD$):** Mật độ lỗi trung bình trên một sản phẩm.
* **DPMO (Defects Per Million Opportunities):** Số lỗi trên 1 triệu cơ hội.
  * $DPMO \approx 3.4 \implies$ Đạt cấp độ chất lượng 6 Sigma.
  * $DPMO > 66,807 \implies$ Chất lượng dưới mức 3 Sigma, quy trình sản xuất kém ổn định.
* **Yield%:** Tỷ lệ sản lượng xuất xưởng đạt chuẩn (mục tiêu thường $\ge 95\% - 99\%$).
* **Cost of Quality (CoQ):** Tỷ trọng chi phí phòng ngừa/thẩm định nên cao hơn nhiều so với chi phí sửa lỗi (đặc biệt là External Failure - chi phí đắt đỏ nhất về bảo hành và uy tín).

---

### Tab 5: Risk Management (Quản lý rủi ro)

#### Cách nhập liệu:
* Rủi ro đơn lẻ: **Probability (0 - 1)** và **Impact (Tiền tệ hoặc ngày công)**.
* **EMV Pairs:** Danh sách các kịch bản xác suất, nhập dạng chuỗi `xác suất,giá trị;...` (ví dụ: `0.3,1000;0.5,2000`).
* FMEA: **Severity (Mức nghiêm trọng 1-10)**, **Occurrence (Khả năng xuất hiện 1-10)**, **Detection (Khả năng phát hiện 1-10)**.
* **Decision Tree (Cây quyết định):** Chuỗi `Nhánh,Xác suất,Giá trị thu được;...` (ví dụ: `A,0.6,10000;B,0.4,-2000`).

#### Đánh giá số liệu sau khi chạy:
* **Risk Exposure ($RE$) & Expected Monetary Value ($EMV$):** Giá trị tài chính kỳ vọng để chuẩn bị quỹ dự phòng rủi ro (Contingency Reserve).
* **RPN (Risk Priority Number):** Điểm ưu tiên rủi ro từ 1 đến 1000.
  * $RPN \ge 100 \implies$ Rủi ro cấp cao, bắt buộc phải có kế hoạch ứng phó chi tiết (Risk Response Plan).

---

### Tab 6: Procurement Management (Quản lý mua sắm)

#### Cách nhập liệu:
* TCO: **Purchase Price** (Giá mua), **Maintenance/yr** (Bảo trì/năm), **Operating/yr** (Vận hành/năm), **Years** (Số năm sử dụng).
* Phân tích Tự làm hay Mua (Make vs Buy): **Make Fixed** (Chi phí cố định tự sản xuất), **Make Var/unit** (Chi phí biến đổi trên 1 đơn vị), **Units** (Số lượng cần), **Buy Price** (Giá mua ngoài trọn gói).
* Hiệu suất nhà cung cấp: **Delivered** (Số lượng đã giao đạt chuẩn), **Committed** (Số lượng cam kết).

#### Đánh giá số liệu sau khi chạy:
* **TCO (Total Cost of Ownership):** Đánh giá tổng chi phí vòng đời thiết bị, tránh bẫy giá mua rẻ nhưng chi phí bảo dưỡng quá cao.
* **Decision (MAKE vs BUY):** Khuyến nghị tự động chọn phương án có tổng chi phí thấp hơn (`MAKE` nếu chi phí tự làm < mua ngoài, ngược lại chọn `BUY`).
* **Supplier SPI:** Chỉ số hiệu suất nhà thầu/nhà cung cấp. $SPI < 1.0$ thể hiện nhà cung cấp đang chậm giao hàng so với hợp đồng.

---

### Tab 7: Stakeholder Management (Quản lý các bên liên quan)

#### Cách nhập liệu:
* **Influence:** Mức độ ảnh hưởng (thang điểm 1 - 5).
* **Interest:** Mức độ quan tâm (thang điểm 1 - 5).
* **Impact & Engagement:** Mức độ tác động và trạng thái gắn kết hiện tại (0 - 1).

#### Đánh giá số liệu sau khi chạy:
* **Quadrant (Góc phần tư ma trận):**
  * `High/High`: **Manage Closely** (Cần quản lý chặt chẽ, tham vấn thường xuyên).
  * `High/Low`: **Keep Satisfied** (Giữ cho họ hài lòng).
  * `Low/High`: **Keep Informed** (Cung cấp thông tin đầy đủ).
  * `Low/Low`: **Monitor** (Theo dõi với nguồn lực tối thiểu).
* **Stakeholder Influence Index (SII) & Engagement Index (EI):** Điểm số định lượng để ưu tiên thời gian tiếp cận stakeholder chủ chốt.

---

### Tab 8: Communication Management (Quản lý truyền thông)

#### Cách nhập liệu:
* **Stakeholders (N):** Số lượng người tham gia giao tiếp trong dự án.
* **Clarity (Độ rõ ràng 0-1)**, **Feedback (Mức độ phản hồi 0-1)**.
* **Sent (Số thông điệp gửi đi)**, **Processed (Số thông điệp được xử lý hiệu quả)**.

#### Đánh giá số liệu sau khi chạy:
* **Communication Channels ($CH = \frac{N(N-1)}{2}$):** Thể hiện sự phức tạp của luồng giao tiếp. Khi thêm 1 người vào nhóm, số kênh giao tiếp tăng theo hàm bậc hai.
* **Effectiveness ($Eff$):** Đo lường chất lượng truyền tải thông tin hai chiều.
* **Overload Index ($OI = Sent / Processed$):**
  * $OI > 1.0$: Đang xảy ra hiện tượng quá tải thông tin (Information Overload), người nhận không kịp xử lý số lượng thông điệp nhận được.

---

### Tab 9: Benefit Analysis (Phân tích lợi ích dự án)

#### Cách nhập liệu:
* **Initial Investment:** Vốn đầu tư ban đầu (dương).
* **Discount Rate:** Tỷ suất chiết khấu hàng năm (ví dụ `0.10` tương đương 10%).
* **Cash Flows:** Dòng tiền thu về các năm, phân cách bằng dấu phẩy (ví dụ: `3000,4000,5000,2000`).

#### Đánh giá số liệu sau khi chạy:
* **ROI (Tỷ suất hoàn vốn %):** Càng cao càng tốt.
* **BCR (Tỷ lệ lợi ích / chi phí):** $BCR > 1.0 \implies$ Lợi nhuận lớn hơn chi phí đầu tư.
* **Payback Period (Thời gian hoàn vốn):** Số năm cần thiết để thu hồi vốn (nội suy tuyến tính). Thời gian hoàn vốn càng ngắn thì rủi ro thanh khoản càng thấp.
* **NPV (Giá trị hiện tại thuần):** $NPV > 0 \implies$ Dự án tạo ra giá trị thặng dư cho doanh nghiệp sau khi đã tính đến chi phí cơ hội của dòng tiền.

---

### Tab 10: PERT Estimation (Ước lượng PERT 3 điểm)

#### Cách nhập liệu:
* Nhập 3 ước lượng thời gian/chi phí:
  * **Optimistic (O):** Kịch bản lạc quan nhất.
  * **Most Likely (M):** Kịch bản có khả năng xảy ra cao nhất.
  * **Pessimistic (P):** Kịch bản bi quan nhất.

#### Đánh giá số liệu sau khi chạy:
* **Beta Distribution:** Thích hợp khi kịch bản hầu như chắc chắn rơi quanh giá trị $M$ (trọng số $M$ gấp 4 lần).
* **Triangular Distribution:** Thích hợp khi thiếu dữ liệu lịch sử hoặc các kịch bản có khả năng phân bố đều nhau.
* **Độ lệch chuẩn (SD):** Đo lường mức độ rủi ro/biến động của công việc. Khoảng tin cậy:
  * $\pm 1 \sigma \approx 68.26\%$
  * $\pm 2 \sigma \approx 95.46\%$
  * $\pm 3 \sigma \approx 99.73\%$

---

### Tab 11: NPV & Finance (Tài chính dự án & Tỷ suất sinh lời nội bộ IRR)

#### Cách nhập liệu:
* **Discount Rate:** Tỷ suất chiết khấu (ví dụ `0.10`).
* **Cash Flows:** Dãy dòng tiền phân cách dấu phẩy, **bao gồm cả vốn ban đầu mang dấu âm** (ví dụ: `-10000,3000,4000,5000,2000`).

#### Đánh giá số liệu sau khi chạy:
* **NPV:** Đánh giá tính khả thi tài chính của dự án tại tỷ suất chiết khấu đã chọn.
* **IRR (Internal Rate of Return):** Tỷ suất sinh lời nội bộ mà tại đó $NPV = 0$.
  * Nếu $IRR > \text{Discount Rate}$: Dự án sinh lời tốt hơn chi phí sử dụng vốn $\implies$ **Chấp thuận đầu tư**.
  * Nếu $IRR < \text{Discount Rate}$: Dự án sinh lời thấp hơn lãi suất kỳ vọng $\implies$ **Từ chối đầu tư**.

---

### Tab 12: Reference (Bảng tra cứu công thức)

* Bảng tĩnh tổng hợp toàn bộ ký hiệu, công thức toán học và biểu thức diễn giải chuẩn PMP cho tất cả 11 nhóm chủ đề trên để người dùng tra cứu nhanh trong lúc làm việc hoặc ôn luyện thi chứng chỉ.

---

## 4. Chạy Kiểm Thử Tự Động (Playwright)

Bộ kiểm thử tự động `run_validate.js` kiểm tra độ chính xác của toàn bộ 47 giá trị test vector theo tiêu chuẩn sai số $\le 10^{-4}$:

```powershell
# Chạy kiểm thử tự động không giao diện (headless)
node run_validate.js
```

Kết quả chuẩn:
```text
PASS 47/47
```

