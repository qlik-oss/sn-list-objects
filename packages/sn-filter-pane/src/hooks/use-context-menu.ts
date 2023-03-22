// @ts-ignore  TODO: remove tag when onContextMenu is declared in nebula/stardust
import { onContextMenu } from '@nebula.js/stardust';

interface IContextMenuItem {
  translation: string;
  tid: string;
  icon?: string;
  select: () => void;
}

interface IContextMenu {
  addItem(item: IContextMenuItem, index?: number): void;
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

function isInRowOrColumn(target: HTMLElement | null) {
  while (target) {
    const role = target.getAttribute('role');
    if (role === 'column' || role === 'row') {
      return true;
    }
    // eslint-disable-next-line no-param-reassign
    target = target.parentElement;
  }
  return false;
}

export default function useContextMenu() {
  onContextMenu?.((menu: IContextMenu, event: Event) => {
    const target = event.target as HTMLElement;
    if (!target || !isInRowOrColumn(target)) {
      return;
    }
    const text = target.innerText;
    if (!text) {
      return;
    }
    const tid = 'copy-cell-context-item';
    // @ts-ignore
    if (menu.items.filter((item) => item.tid === tid).length) {
      return;
    }
    menu.addItem({
      translation: 'contextMenu.copyCellValue',
      icon: 'lui-icon lui-icon--copy',
      tid,
      select: async () => {
        copyToClipboard(text);
      },
    });
  });
}
