
export default class ResponsiveBackgrounds {

  constructor(selector) {
    this.currentBreakpoint = null;
    this.selector = selector || '.cover';
    this.resizeDebounceTime = 20;
    this.resizeTimeout = null;
    // process cover images on page load
    this.processCoverBackgrounds();
    // update cover images on browser resize
    document.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.processCoverBackgrounds();
      }, this.resizeDebounceTime);
    });
  }

  processCoverBackgrounds() {
    // get all of the cover images that need to be processed
    let images = document.querySelectorAll(this.selector);

    // process all cover images
    for (let i = 0; i < images.length; i++) {
      let sources = this.getElSources(images[i]);
      let src = this.getBgSource(sources, images[i].clientWidth);
      this.setSource(images[i], src);
    }
  }

  getElSources(element) {
    let sources = [];
    if (element.getAttribute('data-src-xxs'))
      sources.push({url: element.getAttribute('data-src-xxs'), breakpoint: 320});
    if (element.getAttribute('data-src-xs'))
      sources.push({url: element.getAttribute('data-src-xs'), breakpoint: 480});
    if (element.getAttribute('data-src-sm'))
      sources.push({url: element.getAttribute('data-src-sm'), breakpoint: 768});
    if (element.getAttribute('data-src-md'))
      sources.push({url: element.getAttribute('data-src-md'), breakpoint: 992});
    if (element.getAttribute('data-src-lg'))
      sources.push({url: element.getAttribute('data-src-lg'), breakpoint: 1200});
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

  setSource(el, src) {
    if (!this.currentBreakpoint || src.breakpoint > this.currentBreakpoint) {
      el.style.backgroundImage = 'url(' + src.url + ')';
      this.currentBreakpoint = src.breakpoint;
    }
  }
}
