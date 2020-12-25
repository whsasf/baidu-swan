const baoyou99 = require('./baoyou99');
const erjiermai = require('./erjiermai');
const mianmo = require('./mianmo');
const renqibaokuan = require('./renqibaokuan');
const shujuxian = require('./shujuxian');
const xihuqinjie = require('./xihuqinjie');
const xuexiwenju = require('./xuexiwenju');
const zhenxinzhentao = require('./zhenxinzhentao');
const zhiniaoku = require('./zhiniaoku');
const zhipinshijin = require('./zhipinshijin');
const fs = require('fs');

const files = [
    { baoyou99 },
    { erjiermai },
    { mianmo },
    { renqibaokuan },
    { shujuxian },
    { xihuqinjie },
    { xuexiwenju },
    { zhenxinzhentao },
    { zhiniaoku },
    { zhipinshijin },
];
files.forEach(v => {
    Object.keys(v).forEach(name => {
        const data = v[name];
        data.forEach(v1 => {
            const productImages = v1.detail.bak.replace(/\\/g, '/').match(/(?<=src=").*?(?=")/g) || [];
            v1.detail.productImages = productImages;
        });
        fs.writeFileSync(`./${name}.json`, JSON.stringify(data));
    });
});
