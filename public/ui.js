'use strict';

let icons = {};

icons['medicalEmergency'] = new H.map.Icon(
    '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="#000" fill="#ce2029" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="22" font-size="22pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="#fff">+</text></svg>'
)

icons['routineTransfer'] = new H.map.Icon(
    '<svg height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 632 512"><defs><style>.cls-1{fill:#ce2029;}.cls-2{fill:#fff;}</style></defs><title>ambulance</title><g id="Layer_2" data-name="Layer 2"><rect class="cls-1" x="246" y="35" width="354" height="354"/><circle class="cls-2" cx="152.5" cy="416.5" r="57.5"/><circle class="cls-2" cx="472.5" cy="416.5" r="57.5"/><polygon class="cls-2" points="167 119 52 235 52 389 246 389 246 119 167 119"/></g><g id="Layer_1" data-name="Layer 1"><path d="M592,0H272a48,48,0,0,0-48,48V96H179.88a48,48,0,0,0-33.94,14.06L46.06,209.94A48,48,0,0,0,32,243.88V368H20A12,12,0,0,0,8,380v24a12,12,0,0,0,12,12H64a96,96,0,0,0,192,0H384a96,96,0,0,0,192,0h16a48,48,0,0,0,48-48V48A48,48,0,0,0,592,0ZM160,464a48,48,0,1,1,48-48A48.05,48.05,0,0,1,160,464Zm64-119.55A96,96,0,0,0,80,362.93v-119L179.88,144H224ZM480,464a48,48,0,1,1,48-48A48.05,48.05,0,0,1,480,464Zm112-96H563.15a96,96,0,0,0-166.31,0H272V48H592Z" transform="translate(-8)"/><path class="cls-2" d="M432,96H400a12,12,0,0,0-12,12v56H332a12,12,0,0,0-12,12v32a12,12,0,0,0,12,12h56v56a12,12,0,0,0,12,12h32a12,12,0,0,0,12-12V220h56a12,12,0,0,0,12-12V176a12,12,0,0,0-12-12H444V108A12,12,0,0,0,432,96Z" transform="translate(-8)"/><polygon points="184 256 184 176 104 256 184 256"/></g></svg>'
);

Object.assign(window, {icons});