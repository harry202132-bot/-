import React, { useState, useEffect } from 'react';
import { PlusIcon, ArrowsPointingOutIcon, XMarkIcon } from './icons';
import { GoogleGenAI, Type } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import UIFlowCanvas, { FlowData } from './UIFlowCanvas';

interface ChangeLog {
  id: number;
  date: string;
  title: string;
  description: string;
  diagram?: FlowData;
}

interface GeneratedLog {
    title: string;
    description: string;
    diagram: FlowData;
}

interface ChangeLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUserAction?: string | null;
  onAddDebugLog?: (title: string, content: string, type: 'request' | 'response' | 'error') => void;
}

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => (
    <div className="prose prose-sm max-w-none text-gray-700">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-3" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-lg font-semibold my-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-base font-semibold my-2" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-base font-semibold my-2" {...props} />,
                p: ({ node, ...props }) => <p className="mb-3" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-3" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                code: ({node, ...props}) => <code className="bg-gray-200 text-gray-800 rounded px-1 py-0.5 text-xs" {...props} />,
            }}
        >
            {content}
        </ReactMarkdown>
    </div>
);


const ChangeLogModal: React.FC<ChangeLogModalProps> = ({ isOpen, onClose, initialUserAction, onAddDebugLog }) => {
  const [logs, setLogs] = useState<ChangeLog[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLog, setGeneratedLog] = useState<GeneratedLog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagramToView, setDiagramToView] = useState<FlowData | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialUserAction) {
        setUserInput(initialUserAction);
        setIsFormVisible(true);
        handleGenerateLog(initialUserAction);
      } else {
         try {
            const storedLogs = localStorage.getItem('devChangeLogs');
            if (storedLogs) {
              setLogs(JSON.parse(storedLogs));
            }
          } catch (error) {
            console.error("無法從 localStorage 讀取變更紀錄", error);
          }
      }
    }
  }, [isOpen, initialUserAction]);

  const saveLogs = (updatedLogs: ChangeLog[]) => {
    try {
      localStorage.setItem('devChangeLogs', JSON.stringify(updatedLogs));
      setLogs(updatedLogs);
    } catch (error) {
      console.error("無法儲存變更紀錄至 localStorage", error);
    }
  };
  
  const handleGenerateLog = async (action?: string) => {
    const finalUserInput = action || userInput;
    if (!finalUserInput.trim()) {
        setError('請輸入您的需求變更描述。');
        return;
    }
    setIsLoading(true);
    setGeneratedLog(null);
    setError(null);
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `你是一位專業的前端工程師與 UI/UX 設計師。請根據以下使用者提出的需求變更，產生一份專業的需求變更紀錄與 UI 流程圖。
需求描述： "${finalUserInput}"

**Component & Flow 規則:**
1.  **元件字典**: 流程圖中的 'nodes' 只能使用以下 'componentName': "Login", "MyAccountContent", "TicketManagementContent", "AddVoucherContent", "BasicSettingsContent", 以及一個特殊的互動元件 "SuccessModal"。
2.  **流程邏輯**: 
    - 箭頭 'edge' 的 'label' **必須**精準對應觸發流程的 UI 元件名稱（例如按鈕的文字）。
    - 當一個動作（如儲存）會觸發一個彈出式視窗時，你**必須**為該視窗建立一個獨立的 'node'，其 'componentName' 為 "SuccessModal"。
    - 從 "SuccessModal" 節點出發的箭頭，其 'label' **必須是**該視窗上使用者會點擊以繼續流程的按鈕文字。
3.  **範例流程**: 使用者在 'BasicSettingsContent' 頁面點擊 '儲存' 按鈕後，流程應為：'BasicSettingsContent' --(儲存)--> 'SuccessModal' --(前往步驟二：新增票券)--> 'TicketManagementContent'。
4.  **座標排版**: 此 UI 為桌面版介面，節點寬度較大。請妥善安排 'position' 的 x, y 座標，確保節點之間有足夠的水平間距（建議 x 軸間距至少 900）以避免重疊。

你的回覆必須是一個**單一且完整的 JSON 物件**，嚴格遵守指定的 schema。`;

        // Log the request
        onAddDebugLog?.('AI Request Prompt', prompt, 'request');

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: {
                            type: Type.STRING,
                            description: '為這個需求變更產生一個簡潔、專業的標題。'
                        },
                        description: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: '詳細描述這個需求變更的內容、原因與目的，使用 Markdown 格式。請將每個段落、標題或列表項作為一個獨立的字串，並放入此陣列中。'
                        },
                        diagram: {
                            type: Type.OBJECT,
                            description: '產生一個描述 UI 流程的 JSON 物件，包含 "nodes" 和 "edges"。請嚴格遵守 "Component & Flow 規則"。',
                            properties: {
                                nodes: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            id: { type: Type.STRING, description: "節點的唯一識別碼" },
                                            title: { type: Type.STRING, description: "節點的標題，通常是頁面名稱或視窗標題" },
                                            componentName: { type: Type.STRING, description: '必須是元件字典中提供的值之一: "Login", "MyAccountContent", "TicketManagementContent", "AddVoucherContent", "BasicSettingsContent", "SuccessModal"' },
                                            props: {
                                                type: Type.OBJECT,
                                                properties: {
                                                    isBasicSettingsComplete: {
                                                        type: Type.BOOLEAN,
                                                        description: "模擬「基本設定」步驟是否已完成的狀態。"
                                                    },
                                                    isVoucherCreationComplete: {
                                                        type: Type.BOOLEAN,
                                                        description: "模擬「建立票券」步驟是否已完成的狀態。"
                                                    },
                                                    title: { type: Type.STRING, description: "（限 SuccessModal）視窗的標題文字。" },
                                                    message: { type: Type.STRING, description: "（限 SuccessModal）視窗的內文訊息。" },
                                                    buttons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "（限 SuccessModal）視窗中的按鈕文字列表。" },
                                                }
                                            },
                                            position: {
                                                type: Type.OBJECT,
                                                properties: {
                                                    x: { type: Type.NUMBER },
                                                    y: { type: Type.NUMBER },
                                                }
                                            }
                                        }
                                    }
                                },
                                edges: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            from: { type: Type.STRING, description: "來源節點的 id" },
                                            to: { type: Type.STRING, description: "目標節點的 id" },
                                            label: { type: Type.STRING, description: "觸發此流程的 UI 元件名稱（例如按鈕文字）" }
                                        }
                                    }
                                }
                            }
                        },
                    },
                    required: ["title", "description", "diagram"]
                },
            },
        });

        const resultText = response.text.trim();
        
        // Log the raw response
        onAddDebugLog?.('AI Raw Response', resultText, 'response');

        const parsedData = JSON.parse(resultText);

        const logData: GeneratedLog = {
            ...parsedData,
            description: Array.isArray(parsedData.description) 
                ? parsedData.description.join('\n') 
                : parsedData.description,
        };
        
        setGeneratedLog(logData);
    } catch (err) {
        console.error("Error generating log:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`生成紀錄時發生錯誤：${errorMessage}`);
        onAddDebugLog?.('AI Error', errorMessage, 'error');
    } finally {
        setIsLoading(false);
    }
  };

  const handleSaveGeneratedLog = () => {
    if (!generatedLog) return;

    const newLog: ChangeLog = {
        id: Date.now(),
        date: new Date().toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        title: generatedLog.title,
        description: generatedLog.description,
        diagram: generatedLog.diagram,
    };
    const updatedLogs = [newLog, ...logs];
    saveLogs(updatedLogs);
    setLogs(updatedLogs); // Immediately update state
    
    setIsFormVisible(false);
    setGeneratedLog(null);
    setUserInput('');
    setError(null);
  };

  const handleDiscard = () => {
    setGeneratedLog(null);
    setError(null);
  };

  const resetForm = () => {
    setIsFormVisible(false);
    setGeneratedLog(null);
    setUserInput('');
    setError(null);
    setIsLoading(false);
  }

  const openFullscreenDiagram = (diagram: FlowData) => {
    setDiagramToView(diagram);
  };

  const closeFullscreenDiagram = () => {
      setDiagramToView(null);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-[100] flex justify-center items-center ${isOpen ? 'visible' : 'invisible'}`}
        aria-labelledby="changelog-modal-title"
        role="dialog"
        aria-modal="true"
        onClick={() => { onClose(); resetForm(); }}
      >
        <div
          className="bg-white w-screen h-screen flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center shrink-0">
            <h3 className="text-lg font-semibold text-gray-900" id="changelog-modal-title">
              需求變更紀錄
            </h3>
            <button
              onClick={() => { onClose(); resetForm(); }}
              className="text-gray-400 hover:text-gray-600"
              aria-label="關閉"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            {isFormVisible ? (
              <div className="max-w-4xl mx-auto">
                {!generatedLog && !isLoading && (
                    <div className="space-y-4">
                        <h4 className="font-bold text-gray-700">透過對話生成紀錄</h4>
                        <div>
                            <label htmlFor="logPrompt" className="block text-sm font-medium text-gray-700 mb-1">
                                請描述您想記錄的需求變更：
                            </label>
                            <textarea
                                id="logPrompt"
                                rows={4}
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="例如：請針對B-01頁面，為新手引導加入完成兩個步驟的提示..."
                            ></textarea>
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <div className="flex justify-end space-x-3">
                            <button onClick={resetForm} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300">取消</button>
                            <button onClick={() => handleGenerateLog()} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">生成紀錄</button>
                        </div>
                    </div>
                )}
                {isLoading && (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">正在為您生成紀錄，請稍候...</p>
                    </div>
                )}
                {generatedLog && !isLoading && (
                    <div className="space-y-4">
                        <h4 className="font-bold text-gray-700">已生成紀錄預覽</h4>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-4">
                            <div>
                                <h5 className="font-bold text-gray-800 text-xl mb-4">{generatedLog.title}</h5>
                            </div>
                            <div>
                                <MarkdownRenderer content={generatedLog.description} />
                            </div>
                            {generatedLog.diagram && (
                                <div className="mt-4 p-4 bg-white border rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <h6 className="text-sm font-semibold text-gray-600">流程圖</h6>
                                        <button 
                                            onClick={() => openFullscreenDiagram(generatedLog.diagram!)}
                                            className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200 transition-colors"
                                            aria-label="全螢幕預覽"
                                        >
                                            <ArrowsPointingOutIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                     <div className="h-[70vh] w-full bg-slate-100 rounded-lg overflow-hidden">
                                          <UIFlowCanvas flowData={generatedLog.diagram} />
                                     </div>
                                </div>
                            )}
                        </div>
                        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                        <div className="flex justify-end space-x-3 pt-2">
                            <button onClick={handleDiscard} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300">重新生成</button>
                            <button onClick={handleSaveGeneratedLog} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">儲存此紀錄</button>
                        </div>
                    </div>
                )}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={() => setIsFormVisible(true)}
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                  >
                    <PlusIcon className="w-5 h-5 mr-1" />
                    新增紀錄
                  </button>
                </div>
                
                {logs.length > 0 ? (
                  <div className="space-y-4">
                    {logs.map(log => (
                      <div key={log.id} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-gray-800 text-lg">{log.title}</h5>
                          <span className="text-xs text-gray-500">{log.date}</span>
                        </div>
                        <MarkdownRenderer content={log.description} />
                        {log.diagram && (
                            <div className="mt-4 p-4 bg-white border rounded-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h6 className="text-sm font-semibold text-gray-600">流程圖</h6>
                                    <button 
                                        onClick={() => openFullscreenDiagram(log.diagram!)}
                                        className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200 transition-colors"
                                        aria-label="全螢幕預覽"
                                    >
                                        <ArrowsPointingOutIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="h-[70vh] w-full bg-slate-100 rounded-lg overflow-hidden">
                                  <UIFlowCanvas flowData={log.diagram} />
                                </div>
                            </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>目前沒有任何變更紀錄。</p>
                    <p className="mt-1">點擊「新增紀錄」來建立第一筆吧！</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {diagramToView && (
          <div className="fixed inset-0 bg-black/80 z-[110] flex flex-col p-4" aria-modal="true" role="dialog">
              <div className="flex justify-end mb-2">
                  <button 
                      onClick={closeFullscreenDiagram}
                      className="text-white hover:text-gray-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="關閉全螢幕"
                  >
                      <XMarkIcon className="w-7 h-7" />
                  </button>
              </div>
              <div className="flex-1 bg-slate-100 rounded-lg overflow-hidden">
                  <UIFlowCanvas flowData={diagramToView} />
              </div>
          </div>
      )}
    </>
  );
};

export default ChangeLogModal;