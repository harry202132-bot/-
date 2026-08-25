import React, { useState } from 'react';
import { 
  RequirementItem, 
  RequirementGroup,
  DEFAULT_REQUIREMENT_GROUPS, 
  ImpactedPage 
} from './requirementTypes';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Search, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Edit3, 
  Trash2, 
  X, 
  ExternalLink,
  Table,
  FolderKanban,
  FileText,
  Layers,
  Sparkles
} from 'lucide-react';

interface RequirementsListPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigatePage: (pageId: string) => void;
  selectedPageId?: string;
}

export const RequirementsListPanel: React.FC<RequirementsListPanelProps> = ({
  isOpen,
  onToggle,
  onNavigatePage,
  selectedPageId
}) => {
  const [groups, setGroups] = useState<RequirementGroup[]>(DEFAULT_REQUIREMENT_GROUPS);
  const [expandedGroupIds, setExpandedGroupIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [mainTitle, setMainTitle] = useState('需求規格總表');
  const [subtitle, setSubtitle] = useState('全站系統模組與需求規格總表 (User Stories 列表)');
  const [isEditingHeader, setIsEditingHeader] = useState(false);

  // Modal State for adding/editing a requirement item
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RequirementItem | null>(null);
  const [targetGroupId, setTargetGroupId] = useState<string>('group-b08');

  // Modal State for adding a new Module Group
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [newGroupCode, setNewGroupCode] = useState('');
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [newGroupCategory, setNewGroupCategory] = useState('分潤管理');

  // Form State for Requirement Item
  const [formTitle, setFormTitle] = useState('');
  const [formUserStory, setFormUserStory] = useState('');
  const [formImpactedPages, setFormImpactedPages] = useState<string>('');
  const [formSuggestions, setFormSuggestions] = useState<string>('');
  const [formCategory, setFormCategory] = useState('分潤管理');

  // Toggle Group Expansion
  const toggleGroupExpand = (groupId: string) => {
    setExpandedGroupIds(prev => 
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  // Categories
  const categories = ['全部', ...Array.from(new Set(groups.map(g => g.category))), '帳號/權限'].filter((v, i, a) => a.indexOf(v) === i);

  // Total metrics
  const totalGroupsCount = groups.length;
  const allRequirements = groups.flatMap(g => g.items);
  const totalRequirementsCount = allRequirements.length;
  const completedRequirementsCount = allRequirements.filter(r => r.status === 'completed').length;

  // Filter groups and items
  const filteredGroups = groups.map(group => {
    const matchesCategory = selectedCategory === '全部' || group.category === selectedCategory;
    const filteredItems = group.items.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userStory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.impactedPages.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.uiUxSuggestions.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const itemCategoryMatch = selectedCategory === '全部' || item.category === selectedCategory;
      return matchesSearch && itemCategoryMatch;
    });

    const matchesGroupTitle = group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              group.code.toLowerCase().includes(searchTerm.toLowerCase());

    return {
      ...group,
      matchesCategory,
      isVisible: matchesCategory && (filteredItems.length > 0 || matchesGroupTitle || !searchTerm),
      filteredItems
    };
  }).filter(g => g.isVisible);

  const handleOpenAddModal = (groupId: string = 'group-b08') => {
    setTargetGroupId(groupId);
    setEditingItem(null);
    setFormTitle('');
    setFormUserStory('');
    setFormImpactedPages('B-08_分潤對象管理');
    setFormSuggestions('');
    setFormCategory('分潤管理');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: RequirementItem, groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetGroupId(groupId);
    setEditingItem(item);
    setFormTitle(item.title);
    setFormUserStory(item.userStory);
    setFormImpactedPages(item.impactedPages.map(p => `${p.id}_${p.name.replace(/^[A-Z]-[0-9]+_?/, '')}`).join(', '));
    setFormSuggestions(item.uiUxSuggestions.join('\n'));
    setFormCategory(item.category || '分潤管理');
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId: string, groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('確定要刪除這項需求嗎？')) {
      setGroups(prev =>
        prev.map(g => g.id === groupId ? { ...g, items: g.items.filter(i => i.id !== itemId) } : g)
      );
    }
  };

  const handleSaveRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formUserStory.trim()) return;

    const parsedPages: ImpactedPage[] = formImpactedPages
      .split(/[,，]/)
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => {
        const parts = p.split('_');
        const id = parts[0] || p;
        return { id, name: p };
      });

    const parsedSuggestions = formSuggestions
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingItem) {
      setGroups(prev =>
        prev.map(g => ({
          ...g,
          items: g.items.map(item =>
            item.id === editingItem.id
              ? {
                  ...item,
                  title: formTitle,
                  userStory: formUserStory,
                  impactedPages: parsedPages.length > 0 ? parsedPages : [{ id: 'B-08', name: 'B-08_分潤對象管理' }],
                  uiUxSuggestions: parsedSuggestions.length > 0 ? parsedSuggestions : ['請補充 UI/UX 調整建議'],
                  category: formCategory
                }
              : item
          )
        }))
      );
    } else {
      const newReq: RequirementItem = {
        id: `req-${Date.now()}`,
        number: (groups.find(g => g.id === targetGroupId)?.items.length || 0) + 1,
        groupId: targetGroupId,
        title: formTitle,
        userStory: formUserStory,
        impactedPages: parsedPages.length > 0 ? parsedPages : [{ id: 'B-08', name: 'B-08_分潤對象管理' }],
        uiUxSuggestions: parsedSuggestions.length > 0 ? parsedSuggestions : ['請補充 UI/UX 調整建議'],
        status: 'completed',
        category: formCategory
      };

      setGroups(prev =>
        prev.map(g => g.id === targetGroupId ? { ...g, items: [...g.items, newReq] } : g)
      );

      if (!expandedGroupIds.includes(targetGroupId)) {
        setExpandedGroupIds(prev => [...prev, targetGroupId]);
      }
    }

    setIsModalOpen(false);
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupTitle.trim()) return;

    const groupCode = newGroupCode.trim() || `B-${groups.length + 8}`;
    const newGroupId = `group-${Date.now()}`;
    const newGroup: RequirementGroup = {
      id: newGroupId,
      code: groupCode,
      title: newGroupTitle.trim(),
      category: newGroupCategory,
      description: '新成立之需求模組',
      items: []
    };

    setGroups(prev => [...prev, newGroup]);
    setExpandedGroupIds(prev => [...prev, newGroupId]);
    setIsGroupModalOpen(false);
    setNewGroupCode('');
    setNewGroupTitle('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-1/2 left-0 z-30 transform -translate-y-1/2 bg-white text-indigo-600 border border-gray-200 border-l-0 rounded-r-xl shadow-lg p-2.5 hover:bg-indigo-50 hover:text-indigo-700 transition-all flex items-center space-x-1"
        title="展開需求總表"
      >
        <ChevronRight className="w-5 h-5" />
        <span className="text-xs font-bold [writing-mode:vertical-lr] tracking-wider py-1">需求總表</span>
      </button>
    );
  }

  return (
    <div className="w-[440px] shrink-0 h-full bg-[#f8fafc] border-r border-gray-200 flex flex-col shadow-sm relative z-20 transition-all duration-300">
      {/* Panel Top Header Bar */}
      <div className="p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
              <FolderKanban className="w-5 h-5" />
            </div>
            {isEditingHeader ? (
              <div className="flex-1">
                <input
                  type="text"
                  value={mainTitle}
                  onChange={e => setMainTitle(e.target.value)}
                  className="text-base font-bold text-gray-900 border-b border-indigo-500 focus:outline-none w-full"
                />
                <input
                  type="text"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                  className="text-xs text-gray-500 border-b border-gray-300 focus:outline-none w-full mt-1"
                  onBlur={() => setIsEditingHeader(false)}
                />
              </div>
            ) : (
              <div className="group cursor-pointer" onClick={() => setIsEditingHeader(true)}>
                <h2 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center space-x-1">
                  <span>{mainTitle}</span>
                  <Edit3 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-gray-400" />
                </h2>
                <p className="text-xs text-indigo-500 font-medium">{subtitle}</p>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsGroupModalOpen(true)}
              className="p-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center space-x-1 text-xs font-semibold"
              title="新增模組需求"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>模組</span>
            </button>
            <button
              onClick={onToggle}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="收合側欄"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2.5">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜尋模組、User Story 或調整建議..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-0.5 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        
        {/* ========================================================= */}
        {/* LOWER SECTION: 第一層分潤對象管理需求 (Accordions List)  */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-gray-400" />
              <span>模組需求層級 ( Expandable List )</span>
            </span>
            <span className="text-[11px] text-gray-400">點擊列可展開/收合細項</span>
          </div>

          {filteredGroups.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white rounded-xl border border-dashed border-gray-200">
              <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-500">查無符合搜尋的需求模組</p>
            </div>
          ) : (
            filteredGroups.map((group, index) => {
              const isExpanded = expandedGroupIds.includes(group.id);
              const itemsToDisplay = group.filteredItems;

              return (
                <div
                  id={`group-card-${group.id}`}
                  key={group.id}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs hover:shadow-xs transition-all overflow-hidden"
                >
                  {/* ========================================= */}
                  {/* 第一層 (Level 1): 模組標題列 Header       */}
                  {/* ========================================= */}
                  <div
                    onClick={() => toggleGroupExpand(group.id)}
                    className="p-4 bg-gradient-to-r from-gray-50/90 to-white hover:from-indigo-50/30 hover:to-white cursor-pointer border-b border-gray-100 flex items-center justify-between select-none transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <button 
                        className={`w-6 h-6 rounded-lg bg-gray-100 hover:bg-indigo-100 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 bg-indigo-50 text-indigo-600' : ''
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      <div>
                        <div className="flex items-center space-x-2">
                          {isExpanded && (
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-indigo-100 text-indigo-700">
                              {group.code}
                            </span>
                          )}
                          <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            EP{String(index + 1).padStart(3, '0')} {group.title}
                          </h3>
                        </div>
                        {group.description && (
                          <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                            {group.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {group.items.length} 項
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenAddModal(group.id);
                        }}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="在此模組下新增 User Story"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* ========================================= */}
                  {/* 展開後 (Level 2): 顯示此模組下的 User Stories */}
                  {/* ========================================= */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-50/50 space-y-4 border-t border-gray-100">
                      {itemsToDisplay.length === 0 ? (
                        <div className="text-center py-6 text-xs text-gray-400">
                          尚無 User Story 項目，點擊上方 + 號即可新增
                        </div>
                      ) : (
                        itemsToDisplay.map((req, idx) => (
                          <div
                            key={req.id}
                            className="bg-white rounded-xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 p-4 group/card relative"
                          >
                            {/* Card Edit / Delete Overlay */}
                            <div className="absolute top-3.5 right-3.5 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center space-x-1 bg-white/90 backdrop-blur-xs rounded-lg px-1 py-0.5 border border-gray-200">
                              <button
                                onClick={(e) => handleOpenEditModal(req, group.id, e)}
                                className="p-1 text-gray-400 hover:text-indigo-600 rounded-md transition-colors"
                                title="編輯"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => handleDeleteItem(req.id, group.id, e)}
                                className="p-1 text-gray-400 hover:text-rose-600 rounded-md transition-colors"
                                title="刪除"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* User Story Title */}
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2.5 pr-14 flex items-center space-x-1.5">
                              <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[11px] font-mono shrink-0">
                                {req.number || idx + 1}
                              </span>
                              <span>{req.title}</span>
                            </h4>

                            {/* User Story Box (黃色醒目區塊) */}
                            <div className="bg-[#fffbeb] border border-[#fde68a] text-[#92400e] rounded-xl p-3 text-xs sm:text-sm leading-relaxed mb-3 font-normal shadow-2xs">
                              {req.userStory}
                            </div>

                            {/* Impacted Pages */}
                            {req.impactedPages && req.impactedPages.length > 0 && (
                              <div className="mb-3">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                                  影響頁面
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {req.impactedPages.map((page) => {
                                    const isSelected = selectedPageId === page.id;
                                    return (
                                      <button
                                        key={page.id}
                                        onClick={() => onNavigatePage(page.id)}
                                        className={`text-xs font-mono font-medium px-2.5 py-1 rounded-md border transition-all flex items-center space-x-1 ${
                                          isSelected
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-500/20'
                                            : 'bg-blue-50/80 text-blue-600 border-blue-200/80 hover:bg-blue-100 hover:border-blue-300'
                                        }`}
                                        title={`前往頁面 ${page.name}`}
                                      >
                                        <span>{page.name}</span>
                                        <ExternalLink className="w-3 h-3 opacity-70" />
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* UI/UX Adjustment Suggestions */}
                            {req.uiUxSuggestions && req.uiUxSuggestions.length > 0 && (
                              <div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2.5">
                                  UI/UX 調整建議
                                </div>
                                <ul className="space-y-1.5">
                                  {req.uiUxSuggestions.map((suggestion, sIdx) => (
                                    <li key={sIdx} className="flex items-start space-x-2 text-xs text-gray-700 leading-relaxed">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                      <span>{suggestion}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal for Add / Edit Requirement Item */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                {editingItem ? '編輯 User Story 需求項目' : '新增 User Story 需求項目'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRequirement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  需求標題
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：分潤對象列表頁籤拆分"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  User Story 描述
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="作為系統管理者，我希望..."
                  value={formUserStory}
                  onChange={e => setFormUserStory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  影響頁面代號 (多個請用逗號隔開)
                </label>
                <input
                  type="text"
                  placeholder="例如：B-08_分潤對象管理"
                  value={formImpactedPages}
                  onChange={e => setFormImpactedPages(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  UI/UX 調整建議 (一行一項)
                </label>
                <textarea
                  rows={4}
                  placeholder="列表上方提供 [經營者] 與 [店家] 兩個 Tab 頁籤..."
                  value={formSuggestions}
                  onChange={e => setFormSuggestions(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                >
                  儲存 User Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Creating New Module Group */}
      {isGroupModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                <FolderKanban className="w-5 h-5 text-indigo-600" />
                <span>新增需求模組 (第一層)</span>
              </h3>
              <button
                onClick={() => setIsGroupModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  模組代號 (例如: B-08)
                </label>
                <input
                  type="text"
                  placeholder="例如：B-08"
                  value={newGroupCode}
                  onChange={e => setNewGroupCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  模組名稱 (第一層顯示)
                </label>
                <input
                  type="text"
                  required
                  placeholder="例如：分潤對象管理需求"
                  value={newGroupTitle}
                  onChange={e => setNewGroupTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  分類
                </label>
                <select
                  value={newGroupCategory}
                  onChange={e => setNewGroupCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                >
                  <option value="分潤管理">分潤管理</option>
                  <option value="帳號/權限">帳號/權限</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGroupModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
                >
                  建立需求模組
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequirementsListPanel;

