export interface ImpactedPage {
  id: string;
  name: string;
}

export interface RequirementItem {
  id: string;
  number: number;
  title: string;
  userStory: string;
  impactedPages: ImpactedPage[];
  uiUxSuggestions: string[];
  status?: 'todo' | 'in_progress' | 'completed';
  category?: string;
  groupId?: string;
}

export interface RequirementGroup {
  id: string;
  code: string;
  title: string;
  category: string;
  description?: string;
  items: RequirementItem[];
}

export const DEFAULT_REQUIREMENT_GROUPS: RequirementGroup[] = [
  {
    id: 'group-b08',
    code: 'B-08',
    title: '分潤對象管理需求',
    category: '分潤管理',
    description: '包含經營者與店家頁籤拆分、經營者無推薦人單純化、店家引薦歸屬關聯設定',
    items: [
      {
        id: 'req-b08-1',
        number: 1,
        groupId: 'group-b08',
        title: '分潤對象列表頁籤拆分 (經營者 vs 店家)',
        userStory: '作為系統管理者，我希望在分潤對象列表中透過「經營者」與「店家」兩個頁籤進行視圖切換，以便清晰區分經營者名單與店家的引薦歸屬關係。',
        impactedPages: [
          { id: 'B-08', name: 'B-08_分潤對象管理' }
        ],
        uiUxSuggestions: [
          '列表上方提供 [經營者] 與 [店家] 兩個 Tab 頁籤，並標示各自數據總數。',
          '經營者頁籤：僅顯示類型非「店家」的經營者資料（如分享者Lv1/Lv2、市場顧問、市場代理、區督導等）。',
          '店家頁籤：僅顯示類型為「店家」的資料。',
          '關鍵字與條件篩選器隨切換頁籤即時連動。'
        ],
        status: 'completed',
        category: '分潤管理'
      },
      {
        id: 'req-b08-2',
        number: 2,
        groupId: 'group-b08',
        title: '經營者管理 (簡化不需指定推薦人)',
        userStory: '作為系統管理者，我希望搜尋會員帳號並直接設定/提升為經營者，且不需選擇上級推薦人，讓經營者體系建立更為單純。',
        impactedPages: [
          { id: 'B-08', name: 'B-08_分潤對象管理' }
        ],
        uiUxSuggestions: [
          '經營者列表欄位：經營者姓名/手機、經營者類型、狀態、建立日期、操作。(已移除上級/推薦人欄位)',
          '新增經營者彈窗：僅需選擇經營者類型（分享者Lv1/Lv2、市場顧問等）並搜尋選擇會員帳號。',
          '編輯經營者彈窗：支援變更經營者類型與啟用/暫停狀態。'
        ],
        status: 'completed',
        category: '分潤管理'
      },
      {
        id: 'req-b08-3',
        number: 3,
        groupId: 'group-b08',
        title: '店家引薦管理 (記錄引薦經營者)',
        userStory: '作為系統管理者，我希望在店家頁籤中查看與設定各店家對應的引薦經營者，以便準確掌握店家開發歸屬。',
        impactedPages: [
          { id: 'B-08', name: 'B-08_分潤對象管理' }
        ],
        uiUxSuggestions: [
          '店家列表欄位：店家名稱/手機、引薦經營者、狀態、建立日期、操作。',
          '新增店家引薦彈窗：搜尋選擇店家帳號，並從下拉選單選擇引薦經營者。',
          '編輯店家引薦彈窗：支援重新指定引薦經營者與修改啟用/暫停狀態。'
        ],
        status: 'completed',
        category: '分潤管理'
      },
      {
        id: 'req-b08-4',
        number: 4,
        groupId: 'group-b08',
        title: 'EP002-新增手機號碼搜尋與移除上級手機選項',
        userStory: '移除原本關鍵字搜尋條件中的「上級手機號碼」選項，並新增「手機號碼」供搜尋對象的手機。',
        impactedPages: [
          { id: 'B-08', name: 'B-08_分潤對象管理' }
        ],
        uiUxSuggestions: [
          '關鍵字搜尋下拉選單保留：名稱、手機號碼。',
          '移除上級手機號碼選項。'
        ],
        status: 'completed',
        category: '分潤管理'
      }
    ]
  },
  {
    id: 'group-b24',
    code: 'B-24',
    title: '會員註冊來源獨立模組 (總後台專用)',
    category: '總後台專用',
    description: '限定總後台超級管理員權限，可於獨立的「註冊來源」頁面檢視並變更所有會員的註冊來源，並內建關係鏈迴圈自動檢測與防禦機制',
    items: [
      {
        id: 'req-b24-1',
        number: 1,
        groupId: 'group-b24',
        title: '獨立註冊來源列表與查詢',
        userStory: '作為總後台超級管理員，我能在獨立的【註冊來源】頁面中，透過複合關鍵字（會員名稱/手機、推薦人名稱/手機）來篩選並查看會員與其註冊來源（推薦人）的關聯資料。',
        impactedPages: [
          { id: 'B-24', name: 'B-24_註冊來源' }
        ],
        uiUxSuggestions: [
          '提供下拉選單選擇搜尋欄位 (會員名稱/帳號, 會員手機, 推薦人名稱, 推薦人手機) 並搭配輸入框。',
          '列表顯示會員資料、註冊時間、註冊來源(推薦人)以及操作按鈕。',
          '沒有推薦人時顯示「--」。'
        ],
        status: 'completed',
        category: '總後台專用'
      },
      {
        id: 'req-b24-2',
        number: 2,
        groupId: 'group-b24',
        title: '統一於獨立模組變更註冊來源',
        userStory: '作為總後台超級管理員，我可以在【註冊來源】列表中點擊變更按鈕，將選定會員指定新的推薦人（或清除為自行註冊）。(註: B-23 會員詳情已移除此變更按鈕)',
        impactedPages: [
          { id: 'B-24', name: 'B-24_註冊來源' }
        ],
        uiUxSuggestions: [
          '於列表右側操作欄位提供【變更註冊來源】按鈕。',
          '會員詳情 (B-23) 中僅提供檢視，不再提供變更按鈕。',
          '變更流程採兩階段確認：先進行第一層防呆，再跳出最後確認彈窗，且【確認變更】設計為連結而非按鈕以防誤觸。'
        ],
        status: 'completed',
        category: '總後台專用'
      },
      {
        id: 'req-b24-3',
        number: 3,
        groupId: 'group-b24',
        title: '關係鏈迴圈自動檢測與防禦機制',
        userStory: '作為系統，當總後台嘗試變更會員註冊來源時，必須自動追溯上線關係鏈進行迴圈檢測。若新選擇的推薦人屬於該會員的下線或團隊內部（即變更會導致無窮迴圈），系統必須擋下並禁止變更成功。',
        impactedPages: [
          { id: 'B-24', name: 'B-24_註冊來源' }
        ],
        uiUxSuggestions: [
          '選定新推薦人時即時觸發關係鏈迴圈檢查。',
          '若出現迴圈：禁用繼續按鈕，並以顯眼大紅警示框印出完整迴圈鏈路 (包含會員名稱與手機號碼)。',
          '若無迴圈：顯示綠色勾勾提示無迴圈風險。'
        ],
        status: 'completed',
        category: '總後台專用'
      },
      {
        id: 'req-b24-4',
        number: 4,
        groupId: 'group-b24',
        title: '匯出註冊來源報表',
        userStory: '作為總後台超級管理員，我需要將目前畫面上篩選出的註冊來源清單，匯出成 CSV 檔案以利離線分析或歸檔。',
        impactedPages: [
          { id: 'B-24', name: 'B-24_註冊來源' }
        ],
        uiUxSuggestions: [
          '提供「匯出註冊來源報表」綠色按鈕。',
          '產出的 CSV 包含 BOM 使 Excel 能正常開啟中文，欄位需包含會員及推薦人的詳細資料（無推薦人則留空）。'
        ],
        status: 'completed',
        category: '總後台專用'
      }
    ]
  }
];

export const DEFAULT_REQUIREMENTS: RequirementItem[] = DEFAULT_REQUIREMENT_GROUPS.flatMap(g => g.items);


