import { create } from 'zustand';
import { CartLine, Drug } from '../types/drug';
import { useShallow } from 'zustand/react/shallow';

interface CartState {
  lines: Record<string, CartLine>;

  add: (drug: Drug, quantity?: number) => void;
  remove: (drugId: string) => void;
  increment: (drugId: string) => void;
  decrement: (drugId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  lines: {},

  add: (drug, quantity = 1) =>
    set((state) => {
      const existing = state.lines[drug.id];
      // Положить больше, чем есть в наличии, нельзя
      const next = Math.min((existing?.quantity ?? 0) + quantity, drug.stock);
      return {
        lines: {
          ...state.lines,
          [drug.id]: { drug, quantity: next },
        },
      };
    }),

  remove: (drugId) =>
    set((state) => {
      const { [drugId]: _removed, ...rest } = state.lines;
      return { lines: rest };
    }),

  increment: (drugId) =>
    set((state) => {
      const line = state.lines[drugId];
      if (!line || line.quantity >= line.drug.stock) return state;
      return {
        lines: {
          ...state.lines,
          [drugId]: { ...line, quantity: line.quantity + 1 },
        },
      };
    }),

  decrement: (drugId) =>
    set((state) => {
      const line = state.lines[drugId];
      if (!line) return state;
      // Если количество станет 0 — просто удаляем позицию
      if (line.quantity <= 1) {
        const { [drugId]: _removed, ...rest } = state.lines;
        return { lines: rest };
      }
      return {
        lines: {
          ...state.lines,
          [drugId]: { ...line, quantity: line.quantity - 1 },
        },
      };
    }),

  clear: () => set({ lines: {} }),
}));

// ---------- Селекторы ----------
// Всего упаковок в корзине
export const selectCartCount = (s: CartState): number =>
  Object.values(s.lines).reduce((sum, line) => sum + line.quantity, 0);

// Сколько разных препаратов в корзине
export const selectCartPositions = (s: CartState): number =>
  Object.keys(s.lines).length;

// Сколько препаратов в корзине отпускается только по рецепту
export const selectPrescriptionCount = (s: CartState): number =>
  Object.values(s.lines).filter((line) => line.drug.prescription_required)
    .length;

export const selectCartLines = (s: CartState): CartLine[] =>
  Object.values(s.lines);

// ---------- Хуки с shallow-сравнением ----------
export const useCartLines = () =>
  useCartStore(useShallow(selectCartLines));
