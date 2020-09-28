function getChildren(originalSlots, slidesRef, oldSlidesRef) {
  if (originalSlots === void 0) {
    originalSlots = {};
  }

  var slides = [];
  var slots = {
    'container-start': [],
    'container-end': [],
    'wrapper-start': [],
    'wrapper-end': []
  };

  var getSlidesFromElements = function getSlidesFromElements(els, slotName) {
    els.forEach(function (vnode) {
      var isFragment = typeof vnode.type === 'symbol';
      if (slotName === 'default') slotName = 'container-end';

      if (isFragment && vnode.children) {
        getSlidesFromElements(vnode.children, 'default');
      } else if (vnode.type && vnode.type.name === 'SwiperSlide') {
        slides.push(vnode);
      } else if (slots[slotName]) {
        slots[slotName].push(vnode);
      }
    });
  };

  Object.keys(originalSlots).forEach(function (slotName) {
    var els = originalSlots[slotName]();
    getSlidesFromElements(els, slotName);
  });
  oldSlidesRef.value = slidesRef.value;
  slidesRef.value = slides;
  return {
    slides: slides,
    slots: slots
  };
}

export { getChildren };