import React, { useState, useRef, useEffect, FC } from 'react';
import { componentRegistry } from './componentRegistry';
import ScreenWrapper from './ScreenWrapper';
import FlowArrow from './FlowArrow';

export interface FlowNode {
  id: string;
  title: string;
  componentName: keyof typeof componentRegistry;
  props: any;
  position: { x: number; y: number };
}

export interface FlowEdge {
  from: string;
  to: string;
  label: string;
}

export interface FlowData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

interface UIFlowCanvasProps {
  flowData: FlowData;
}

const UIFlowCanvas: FC<UIFlowCanvasProps> = ({ flowData }) => {
  const [transform, setTransform] = useState({ scale: 0.7, translateX: 50, translateY: 50 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodesReady, setNodesReady] = useState(false);
  const nodeElements = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const safeFlowData = {
    nodes: flowData?.nodes || [],
    edges: flowData?.edges || [],
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleAmount = -e.deltaY * 0.001;
    const newScale = Math.max(0.2, Math.min(2, transform.scale + scaleAmount));

    const rect = canvasRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newTranslateX = mouseX - (mouseX - transform.translateX) * (newScale / transform.scale);
    const newTranslateY = mouseY - (mouseY - transform.translateY) * (newScale / transform.scale);

    setTransform({
      scale: newScale,
      translateX: newTranslateX,
      translateY: newTranslateY,
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;
    setTransform(prev => ({
      ...prev,
      translateX: prev.translateX + dx,
      translateY: prev.translateY + dy,
    }));
    setPanStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  useEffect(() => {
    // This effect reliably waits for node DOM elements to be registered
    // before attempting to render the edges that depend on their positions.
    setNodesReady(false);
    
    // Using requestAnimationFrame ensures we run this check after the browser
    // has had a chance to paint the new nodes from the latest render.
    const frameId = requestAnimationFrame(() => {
        const allNodesMounted = safeFlowData.nodes.length === 0 || 
                                safeFlowData.nodes.every(node => nodeElements.current[node.id]);
        if (allNodesMounted) {
            setNodesReady(true);
        }
    });

    return () => cancelAnimationFrame(frameId);
  }, [flowData]);


  return (
    <div
      ref={canvasRef}
      className="w-full h-full cursor-grab relative overflow-hidden bg-dots"
      style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, #d1d5db 1px, rgba(0,0,0,0) 1px)' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute"
        style={{
          transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
        }}
      >
        {safeFlowData.nodes.map(node => {
          if (!node.position) {
            console.error(`Node "${node.title}" (id: ${node.id}) is missing position data and will not be rendered.`);
            return null;
          }

          const Component = componentRegistry[node.componentName]?.component;
          const defaultProps = componentRegistry[node.componentName]?.defaultProps || {};
          
          if (!Component) {
            return (
              <div key={node.id} style={{ position: 'absolute', left: node.position.x, top: node.position.y }}>
                <ScreenWrapper title={node.title}>
                  <div className="p-4 text-red-500">Component "{node.componentName}" not found.</div>
                </ScreenWrapper>
              </div>
            );
          }

          return (
            <div
              key={node.id}
              ref={el => { nodeElements.current[node.id] = el; }}
              style={{
                position: 'absolute',
                left: node.position.x,
                top: node.position.y,
                width: '800px', // Adjusted for desktop view
              }}
            >
              <ScreenWrapper title={node.title}>
                <Component {...defaultProps} {...node.props} />
              </ScreenWrapper>
            </div>
          );
        })}

        {nodesReady && safeFlowData.edges.map((edge, index) => {
          const fromNodeEl = nodeElements.current[edge.from];
          const toNodeEl = nodeElements.current[edge.to];
          
          if (!fromNodeEl || !toNodeEl || !canvasRef.current) return null;

          const fromRect = fromNodeEl.getBoundingClientRect();
          const toRect = toNodeEl.getBoundingClientRect();
          const containerRect = canvasRef.current.getBoundingClientRect();

          // A rect with 0 width can indicate the element is not yet visible or laid out.
          if (fromRect.width === 0 || toRect.width === 0) {
            return null;
          }

          const from = {
            x: (fromRect.right - containerRect.left) / transform.scale - transform.translateX / transform.scale,
            y: (fromRect.top + fromRect.height / 2 - containerRect.top) / transform.scale - transform.translateY / transform.scale
          };

          const to = {
            x: (toRect.left - containerRect.left) / transform.scale - transform.translateX / transform.scale,
            y: (toRect.top + toRect.height / 2 - containerRect.top) / transform.scale - transform.translateY / transform.scale
          };

          return <FlowArrow key={`${edge.from}-${edge.to}-${index}`} from={from} to={to} label={edge.label} />;
        })}
      </div>
    </div>
  );
};

export default UIFlowCanvas;