import { useEffect, useMemo, useRef, useState } from "react";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

interface ToastProps {
  message?: string;
  colorClass?: string;
  onClose?: () => void;
  onHistoryChange?: (history: any[]) => void;
}

export default function Toast({ message = "", colorClass = "alert-info", onClose, onHistoryChange }: ToastProps) {
  const [history, setHistory] = useState<any[]>([]);
  const notyfRef = useRef<Notyf | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined' && !notyfRef.current) {
      notyfRef.current = new Notyf({
        duration: 4000,
        dismissible: true,
        position: { x: 'right', y: 'bottom' },
        types: [
          { type: 'warning', background: '#F59E0B', icon: false },
          { type: 'info', background: '#3B82F6', icon: false }
        ]
      });
    }
    return () => {
      try { notyfRef.current?.dismissAll?.(); } catch (_) {}
    };
  }, []);
  useEffect(() => {
    const msgText = typeof message === 'string' ? message : (message && (message as any).message) ? (message as any).message : '';
    if (!msgText) return;

    let type = 'success';
    if (colorClass?.includes('error')) type = 'error';
    else if (colorClass?.includes('warning')) type = 'warning';
    else if (colorClass?.includes('success')) type = 'success';
    else if (colorClass?.includes('info')) type = 'info';
    if (type === 'success' || type === 'error') {
      (notyfRef.current as any)?.[type]?.(msgText);
    } else {
      const bg = type === 'warning' ? '#F59E0B' : type === 'info' ? '#3B82F6' : undefined;
      (notyfRef.current as any)?.open?.({ type, message: msgText, background: bg });
    }

    const item = { id: crypto.randomUUID?.() || String(Date.now()), message: msgText, colorClass, at: new Date().toISOString() };
    setHistory((prev) => {
      const next = [item, ...prev];
      if (onHistoryChange) onHistoryChange(next);
      return next;
    });

    try { if (onClose) onClose(); } catch (_) {}
  }, [message, colorClass, onHistoryChange, onClose]);

  return null;
}

