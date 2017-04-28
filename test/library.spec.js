import chai from 'chai';
import ResponsiveBackgrounds from '../lib/responsive-backgrounds.js';
const jsdom = require('jsdom');

chai.expect();

const expect = chai.expect;
const doc = `
  <!DOCTYPE>
  <html>
  <body>
    <div class="cover"
         data-src-sm="/assets/atget-full-small.jpg" 
         data-src-md="/assets/atget-full-medium.jpg" 
         data-src-lg="/assets/atget-full-large.jpg">
    </div>
    <div class="cover"
         data-src-sm="/assets/atget-full-small-2.jpg" 
         data-src-md="/assets/atget-full-medium-2.jpg">
    </div>
  </body>
  </html>
`;

let dom;
let lib;
let el, el2;

describe('Given an instance of this library', () => {

  before(() => {
    dom = (new jsdom.JSDOM(doc)).window;
    global.window = dom;
    global.document = dom.document;
    lib = new ResponsiveBackgrounds('.cover');
    el = dom.window.document.querySelectorAll('.cover')[0];
    el2 = dom.window.document.querySelectorAll('.cover')[1];
  });

  describe('when loaded', () => {

    it('should add a background-image style', () => {
      // will always be small because jsdom has no width
      expect(el.style.backgroundImage).to.equal('url(/assets/atget-full-small.jpg)');
    });

    it('should throw error if no sources are found on image', () => {
      let emptyEl = dom.window.document.createElement('DIV');
      let fn = () => lib.getElSources(emptyEl);
      expect(fn).to.throw(Error);
    });

    it('should return an array of sources if they exist', () => {
      let sources = lib.getElSources(el);
      expect(sources).to.have.lengthOf(3);
    });

    it('should find the smallest image that\'s bigger than the elements width', () => {
      let width = 300;
      let sources = lib.getElSources(el);
      let src = lib.getBgSource(sources, width);
      expect(src.breakpoint).to.equal(768);
      width = 800;
      src = lib.getBgSource(sources, width);
      expect(src.breakpoint).to.equal(992);
      width = 4000;
      src = lib.getBgSource(sources, width);
      expect(src.breakpoint).to.equal(1200);
    });

    it('should never return a smaller image than previously returned', () => {
      // start with a large width
      let width = 1200;
      // this has to work for multiple elements
      [el, el2].forEach((e, i) => {
        let sources = lib.getElSources(e);
        let src = lib.getBgSource(sources, width);
        lib.setSource(e, src, i);
      });
      expect(el.style.backgroundImage).to.equal('url(/assets/atget-full-large.jpg)');
      expect(el2.style.backgroundImage).to.equal('url(/assets/atget-full-medium-2.jpg)');
      // scale down to a small width
      width = 300;
      [el, el2].forEach((e, i) => {
        let sources = lib.getElSources(e);
        let src = lib.getBgSource(sources, width);
        lib.setSource(e, src, i);
      });
      expect(el.style.backgroundImage).to.equal('url(/assets/atget-full-large.jpg)');
      expect(el2.style.backgroundImage).to.equal('url(/assets/atget-full-medium-2.jpg)');
    });

  });
});
