import { fixture, assert, nextFrame, aTimeout } from '@open-wc/testing';
import { AmfLoader } from './amf-loader.js';
import '../api-headers-document.js';

describe('<api-headers-document>', function() {
  async function openedFixture() {
    return (await fixture(`<api-headers-document opened></api-headers-document>`));
  }

  async function narrowFixture() {
    return (await fixture(`<api-headers-document opened narrow></api-headers-document>`));
  }

  [
    ['Full AMF model', false],
    ['Compact AMF model', true]
  ].forEach((item) => {
    describe(item[0], () => {
      let element;
      let amf;
      let headers;

      describe('No data state', () => {
        it('Renders no-info when opened', async () => {
          element = await openedFixture();
          await aTimeout();
          const node = element.shadowRoot.querySelector('.no-info');
          assert.ok(node);
        });
      });

      describe('Model operations', () => {
        before(async () => {
          const data = await AmfLoader.load(0, 0, item[1]);
          amf = data[0];
          headers = data[1];
        });

        beforeEach(async () => {
          element = await openedFixture();
          element.amf = amf;
          element.headers = headers;
          await aTimeout();
        });

        it('api-type-document is rendered', () => {
          const panel = element.shadowRoot.querySelector('api-type-document');
          assert.ok(panel);
        });

        it('no-info is not rendered when has data', () => {
          const node = element.shadowRoot.querySelector('.no-info');
          assert.notOk(node);
        });

        it('Toggle button hides the table', async () => {
          const button = element.shadowRoot.querySelector('.section-title-area');
          button.click();
          await nextFrame();
          const collapse = element.shadowRoot.querySelector('iron-collapse');
          assert.isFalse(collapse.opened);
        });
      });

      describe('Narrow layout', () => {
        before(async () => {
          const data = await AmfLoader.load(0, 0, item[1]);
          amf = data[0];
          headers = data[1];
        });

        beforeEach(async () => {
          element = await narrowFixture();
          element.amf = amf;
          element.headers = headers;
          await aTimeout();
        });

        it('Has narrow attribute', () => {
          assert.isTrue(element.hasAttribute('narrow'));
        });

        it('no-info is not rendered when has data', () => {
          const node = element.shadowRoot.querySelector('.no-info');
          assert.notOk(node);
        });

        it('Narrow style is applied to the title', async () => {
          element.style.setProperty('--api-headers-document-title-narrow-font-size', '16px');
          const title = element.shadowRoot.querySelector('.headers-title');
          const fontSize = getComputedStyle(title).fontSize;
          assert.equal(fontSize, '16px');
        });
      });
    });
  });
});
