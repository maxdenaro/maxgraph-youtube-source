import React from 'react';

function getChildren(children) {
  var slides = [];
  var slots = {
    'container-start': [],
    'container-end': [],
    'wrapper-start': [],
    'wrapper-end': []
  };

  function processChildren(c) {
    React.Children.toArray(c).forEach(function (child) {
      if (child.type === React.Fragment && child.props.children) {
        processChildren(child.props.children);
        return;
      }

      if (child.type && child.type.displayName === 'SwiperSlide') {
        slides.push(child);
      } else if (child.props && child.props.slot && slots[child.props.slot]) {
        slots[child.props.slot].push(child);
      } else {
        slots['container-end'].push(child);
      }
    });
  }

  processChildren(children);
  return {
    slides: slides,
    slots: slots
  };
}

export { getChildren };