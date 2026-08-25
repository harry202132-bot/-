import React, { useState } from 'react';
import { elementToSVG, inlineResources } from 'dom-to-svg';
import { CameraIcon } from './icons';

interface ExportSvgButtonProps {
    onClick?: () => void;
}

const ExportSvgButton: React.FC<ExportSvgButtonProps> = ({ onClick }) => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (onClick) onClick();
        
        try {
            setIsExporting(true);
            const node = document.querySelector('main') as HTMLElement || document.body;

            // Temporarily hide fixed buttons
            const fixedContainer = document.querySelector('.fixed.bottom-6') as HTMLElement;
            if (fixedContainer) fixedContainer.style.display = 'none';
            
            // Save original styles for the node to restore later
            const originalPosition = node.style.position;
            const originalOverflowY = node.style.overflowY;
            const originalOverflowX = node.style.overflowX;
            const originalHeight = node.style.height;
            const originalMaxHeight = node.style.maxHeight;

            // Force the node to expand to its full scrollable height
            if (window.getComputedStyle(node).position === 'static') {
                node.style.position = 'relative';
            }
            node.style.overflowY = 'visible';
            node.style.overflowX = 'visible';
            node.style.height = `${node.scrollHeight}px`;
            node.style.maxHeight = 'none';

            // Also ensure we wait a macro-task for layout
            await new Promise(resolve => setTimeout(resolve, 50));

            // ==== PREPARE OVERLAYS FOR INPUTS/SELECTS ====
            // dom-to-svg misses <select> text and <input placeholder="...">
            const overlayContainer = document.createElement('div');
            overlayContainer.id = 'svg-capture-overlays';
            overlayContainer.style.position = 'absolute';
            overlayContainer.style.top = '0';
            overlayContainer.style.left = '0';
            overlayContainer.style.width = '100%';
            overlayContainer.style.height = '100%';
            overlayContainer.style.zIndex = '9999';

            const nodeRect = node.getBoundingClientRect();

            const fields = node.querySelectorAll('input, select, textarea') as NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
            
            fields.forEach(el => {
                const rect = el.getBoundingClientRect();
                const style = window.getComputedStyle(el);
                
                const textDiv = document.createElement('div');
                textDiv.style.position = 'absolute';
                textDiv.style.left = `${rect.left - nodeRect.left + node.scrollLeft}px`;
                textDiv.style.top = `${rect.top - nodeRect.top + node.scrollTop}px`;
                textDiv.style.width = style.width;
                textDiv.style.height = style.height;
                textDiv.style.boxSizing = 'border-box';
                
                textDiv.style.fontFamily = style.fontFamily;
                textDiv.style.fontSize = style.fontSize;
                textDiv.style.fontWeight = style.fontWeight;
                textDiv.style.lineHeight = style.lineHeight;
                textDiv.style.letterSpacing = style.letterSpacing;
                textDiv.style.paddingTop = style.paddingTop;
                textDiv.style.paddingRight = style.paddingRight;
                textDiv.style.paddingBottom = style.paddingBottom;
                textDiv.style.paddingLeft = style.paddingLeft;
                
                textDiv.style.display = 'flex';
                textDiv.style.alignItems = 'center';
                textDiv.style.justifyContent = style.textAlign === 'right' ? 'flex-end' : (style.textAlign === 'center' ? 'center' : 'flex-start');
                textDiv.style.whiteSpace = 'nowrap';
                
                let text = '';
                let isPlaceholder = false;
                
                if (el.tagName === 'SELECT') {
                    const sel = el as HTMLSelectElement;
                    text = sel.options[sel.selectedIndex]?.text || '';
                } else {
                    const input = el as HTMLInputElement | HTMLTextAreaElement;
                    if (input.value && input.type !== 'checkbox' && input.type !== 'radio') {
                        text = input.value;
                    } else if (input.placeholder) {
                        text = input.placeholder;
                        isPlaceholder = true;
                    }
                }
                
                textDiv.innerText = text;
                textDiv.style.color = isPlaceholder ? '#9ca3af' : style.color;
                
                if (text) {
                    overlayContainer.appendChild(textDiv);
                }
            });

            node.appendChild(overlayContainer);
            
            // Allow browser to calculate layout and styles for newly inserted overlay nodes
            await new Promise(resolve => setTimeout(resolve, 50));
            // ===========================================

            // Generate SVG string using dom-to-svg
            const svgDocument = elementToSVG(node as HTMLElement);
            await inlineResources(svgDocument.documentElement);
            const svgString = new XMLSerializer().serializeToString(svgDocument);
            
            // ==== RESTORE DOM ====
            node.removeChild(overlayContainer);
            node.style.position = originalPosition;
            node.style.overflowY = originalOverflowY;
            node.style.overflowX = originalOverflowX;
            node.style.height = originalHeight;
            node.style.maxHeight = originalMaxHeight;
            if (fixedContainer) fixedContainer.style.display = '';
            // =====================

            // Create a download link
            const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `export-${Date.now()}.svg`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
            
            // Restore fixed buttons
            if (fixedContainer) fixedContainer.style.display = '';

        } catch (error) {
            console.error('Error exporting SVG:', error);
            alert('匯出失敗，請稍後再試。');
        } finally {
            setIsExporting(false);
            
            // ==== RESTORE DOM (fallback if errored early) ====
            const node = document.querySelector('main') as HTMLElement || document.body;
            const overlayContainer = document.getElementById('svg-capture-overlays');
            if (overlayContainer && overlayContainer.parentNode === node) {
                node.removeChild(overlayContainer);
            }
            // We can't access original values here because they are not in scope, 
            // but we can assume 'main' is usually flex-1 with specific classes.
            // If it errored early, it might be stuck. To be safe, we can remove inline styles:
            node.style.position = '';
            node.style.overflowY = '';
            node.style.overflowX = '';
            node.style.height = '';
            node.style.maxHeight = '';
            
            const fixedContainer = document.querySelector('.fixed.bottom-6') as HTMLElement;
            if (fixedContainer) fixedContainer.style.display = '';
        }
    };

    return (
        <button 
            onClick={handleExport}
            disabled={isExporting}
            className="w-12 h-12 bg-white text-gray-700 rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 focus:outline-none transition-all disabled:opacity-50"
            title="匯出本頁畫面為真實 SVG (可置入Figma，物件獨立)"
        >
            {isExporting ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            ) : (
                <CameraIcon className="w-6 h-6" />
            )}
        </button>
    );
};

export default ExportSvgButton;