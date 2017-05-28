
export default class ResponsiveBackgrounds {

  constructor(selector = '.cover', options = {}) {
    if (selector instanceof Array) {
      this.usingSelector = false;
      this.elements = selector;
      selector = null;
    }
    else {
      this.usingSelector = true;
    }
    if (selector instanceof Object) {
      options = selector;
      selector = '.cover';
    }
    let defaultOptions = {xxs: 320, xs: 480, sm: 768, md: 992, lg: 1200, xl: 1920};
    this.selector = selector;
    this.options = Object.assign(defaultOptions, options);
    this.currentBreakpoints = [];
    this.resizeDebounceTime = 20;
    this.resizeTimeout = null;
    // process cover images on page load
    this.processCoverBackgrounds();
    // update cover images on browser resize
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.processCoverBackgrounds();
      }, this.resizeDebounceTime);
    });
  }

  processCoverBackgrounds() {
    // get all of the cover images that need to be processed
    let images = this.usingSelector ? document.querySelectorAll(this.selector) : this.elements;

    // process all cover images
    for (let i = 0; i < images.length; i++) {
      let sources = this.getElSources(images[i]);
      let src = this.getBgSource(sources, images[i].clientWidth);
      this.setSource(images[i], src, i);
    }
  }

  getElSources(element) {
    let sources = [];
    if (element.getAttribute('data-src-xxs'))
      sources.push({url: element.getAttribute('data-src-xxs'), breakpoint: this.options.xxs});
    if (element.getAttribute('data-src-xs'))
      sources.push({url: element.getAttribute('data-src-xs'), breakpoint: this.options.xs});
    if (element.getAttribute('data-src-sm'))
      sources.push({url: element.getAttribute('data-src-sm'), breakpoint: this.options.sm});
    if (element.getAttribute('data-src-md'))
      sources.push({url: element.getAttribute('data-src-md'), breakpoint: this.options.md});
    if (element.getAttribute('data-src-lg'))
      sources.push({url: element.getAttribute('data-src-lg'), breakpoint: this.options.lg});
    if (element.getAttribute('data-src-xl'))
      sources.push({url: element.getAttribute('data-src-xl'), breakpoint: this.options.xl});
    if (sources.length === 0)
      throw new Error('No sources found on cover element:', element);
    else
      return sources;
  }

  getBgSource(sources, elWidth) {
    // find the smallest source that will cover the elements width
    for (let i = 0; i < sources.length; i++) {
      if (sources[i].breakpoint >= elWidth) {
        return sources[i];
      }
      else if (i + 1 === sources.length) {
        // there is not a source large enough
        return sources[i];
      }
    }
  }

  setSource(el, src, i) {
    if (!this.currentBreakpoints[i] || src.breakpoint > this.currentBreakpoints[i]) {
      el.style.backgroundImage = 'url(' + src.url + ')';
      this.currentBreakpoints[i] = src.breakpoint;
    }
  }
}
