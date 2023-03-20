import { usePromise, useState } from '@nebula.js/stardust';

export class RenderTrackerService {
  resolveCallback?: () => void;

  itemsRendered: number;

  fullyRendered: boolean;

  numberOfListboxes?: number;

  renderedItemKeys: {[key: string]: boolean};

  constructor() {
    this.itemsRendered = 0;
    this.fullyRendered = false;
    this.renderedItemKeys = {};
  }

  public setResolveCallback(resolveCallback: () => void) {
    this.resolveCallback = resolveCallback;
  }

  public setNumberOfListboxes(listboxCount: number): void {
    this.numberOfListboxes = listboxCount;
  }

  public renderedCallback(key: string) {
    if (!this.fullyRendered) {
      this.renderedItemKeys[key] = true;
      this.itemsRendered = Object.keys(this.renderedItemKeys).length;
      this.fullyRendered = this.itemsRendered === this.numberOfListboxes;
      if (this.fullyRendered) {
        this.resolveCallback?.();
      }
    }
  }
}

const useRenderTrackerService = () => {
  const [renderTrackerService] = useState<RenderTrackerService>(new RenderTrackerService());

  usePromise(
    () => new Promise<void>((resolve) => {
      renderTrackerService.setResolveCallback(resolve);
    }),
    [],
  );

  return renderTrackerService;
};

export default useRenderTrackerService;
