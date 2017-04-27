import chai from 'chai';
import ResponsiveBackgrounds from '../lib/responsive-backgrounds.min.js';
const jsdom = require('jsdom');

chai.expect();

const expect = chai.expect;
const doc = `
  <!DOCTYPE>
  <html>
  <body>
    <div class="cover"
         data-src-sm="/assets/atget-full-small.jpg" 
         data-src-sm="/assets/atget-full-medium.jpg" 
         data-src-sm="/assets/atget-full-large.jpg">
    </div>
  </body>
  </html>
`;

let dom;
let lib;
let el;

describe('Given an instance of this library', () => {

  before(() => {
    dom = (new jsdom.JSDOM(doc)).window;
    global.window = dom;
    global.document = dom.document;
    lib = new ResponsiveBackgrounds();
    el = dom.window.document.createElement('DIV');
  });

  describe('when loaded', () => {

    it('should add a background-image style', () => {
      let respBgs = new ResponsiveBackgrounds('.cover');
      let backgroundEl = dom.window.document.querySelectorAll('.cover');
      expect(backgroundEl[0].style.backgroundImage).to.equal('url(/assets/atget-full-small.jpg)');
    });

    it('should throw error if no sources are found on image', () => {
      let fn = () => lib.getElSources(el);
      expect(fn).to.throw(Error);
    });

    it('should return an array of sources if they exist', () => {
      el.setAttribute('data-src-sm', '/assets/atget-full-small.jpg');
      el.setAttribute('data-src-md', '/assets/atget-full-medium.jpg');
      el.setAttribute('data-src-lg', '/assets/atget-full-large.jpg');
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
      let width = 1200;
      let sources = lib.getElSources(el);
      let src = lib.getBgSource(sources, width);
      lib.setSource(el, src);
      expect(el.style.backgroundImage).to.equal('url(/assets/atget-full-large.jpg)');
      width = 300;
      sources = lib.getElSources(el);
      src = lib.getBgSource(sources, width);
      lib.setSource(el, src);
      expect(el.style.backgroundImage).to.equal('url(/assets/atget-full-large.jpg)');
    });

  });
});
