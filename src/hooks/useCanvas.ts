import { useRef, useEffect, useCallback } from 'react';
import type { Stroke } from '../types';

export function useCanvas(strokes: Stroke[], currentStroke: Stroke | null) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (stroke.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    const points = stroke.points;
    if (points.length < 2) return;

    switch (stroke.tool) {
      case 'pen':
      case 'eraser': {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const midX = (points[i - 1].x + points[i].x) / 2;
          const midY = (points[i - 1].y + points[i].y) / 2;
          ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, midX, midY);
        }
        ctx.stroke();
        break;
      }
      case 'line': {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.stroke();
        break;
      }
      case 'rectangle': {
        const width = points[1].x - points[0].x;
        const height = points[1].y - points[0].y;
        ctx.strokeRect(points[0].x, points[0].y, width, height);
        break;
      }
      case 'circle': {
        const dx = points[1].x - points[0].x;
        const dy = points[1].y - points[0].y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, radius, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
    }

    ctx.globalCompositeOperation = 'source-over';
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    strokes.forEach((stroke) => drawStroke(ctx, stroke));
    if (currentStroke) {
      drawStroke(ctx, currentStroke);
    }
  }, [strokes, currentStroke, drawStroke]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        render();
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [render]);

  useEffect(() => {
    render();
  }, [render]);

  return { canvasRef };
}
