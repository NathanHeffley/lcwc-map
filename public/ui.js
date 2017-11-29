'use strict';

let icons = {};

icons['medicalEmergency'] = new H.map.Icon(
    '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="red" fill="red" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="22" font-size="22pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">+</text></svg>'
)

Object.assign(window, {icons});