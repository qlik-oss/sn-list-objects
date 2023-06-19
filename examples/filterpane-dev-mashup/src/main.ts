import { stardust } from '@nebula.js/stardust';
import embed from './configure';
import connect from './connect';

function render(nuked: stardust.Embed, filterPaneOptionsElement: HTMLElement, filterPaneResizeElement: HTMLElement) {
  nuked.render({
    element: filterPaneOptionsElement,
    type: 'filterpane',
    fields: [
      {
        // See https://qlik.dev/apis/javascript/nebula-listbox-properties for all properties
        // @ts-ignore
        qListObjectDef: {
          qDef: { qFieldDefs: ['Dim1'] },
          qFrequencyMode: 'P',
        },
        checkboxes: false,
        histogram: true,
        layoutOptions: {
          dense: true,
          dataLayout: 'singleColumn',
          layoutOrder: 'row',
        },
      },
    ],
  });

  nuked.render({
    element: filterPaneResizeElement,
    type: 'filterpane',
    fields: ['Dim1', 'Dim2', 'Dim3'],
  });
}

async function run() {
  const app = await connect({
    url: 'http://localhost:9076', // 'xxxx.us.qlik.com' or 'http://localhost:9076'
    webIntegrationId: '<Qlik web integration id>', // 'xxx-xxxxxxx-xxxxxxxx',
    appId: 'apps/filter-pane2.qvf', // 'xxxx-xxx-xxx-xxx-xxxxxxx' or 'apps/Ctrl-00.qvf',
  });

  const toolbarElement = document.querySelector('.toolbar') as HTMLElement;
  const filterPaneOptionsElement = document.querySelector('.fpOptions') as HTMLElement;
  const filterPaneResizeElement = document.querySelector('.fpResize') as HTMLElement;

  if (!toolbarElement || !filterPaneOptionsElement || !app) {
    console.error('Element missing');
    return;
  }

  const nuked = embed(app);
  (await nuked.selections()).mount(toolbarElement);
  render(nuked, filterPaneOptionsElement, filterPaneResizeElement);
}

run();
