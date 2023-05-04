import embed from './configure';
import connect from './connect';

async function run() {
  const app = await connect({
    url: '<Host>', // 'xxxx.us.qlik.com' or 'http://localhost:9076'
    webIntegrationId: '<Qlik web integration id>', // 'xxx-xxxxxxx-xxxxxxxx',
    appId: '<AppId>', // 'xxxx-xxx-xxx-xxx-xxxxxxx' or 'apps/Ctrl-00.qvf',
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

  // create a session object
  nuked.render({
    element: filterPaneOptionsElement,
    type: 'filterpane',
    fields: [
      {
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

run();
