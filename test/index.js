const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const writeFile = promisify(fs.writeFile);

const excels = [
    'bailin',
    'baoma',
    'chengxuyuan',
    'daiyezhe',
    'nongcun',
    'taobaoke',
    'weishang',
    'xuesheng',
    'zhuanqiansiwei',
    'zimeiti',
];
async function createData() {
    let allData = [];
    for (let ii = 0; ii < excels.length; ii++) {
        const list = xlsx.readFile(`./excel/${excels[ii]}.xlsx`).Sheets.test_sheet1;
        const keys = Object.keys(list).filter(
            key =>
                key.includes('A') ||
                key.includes('B') ||
                key.includes('C') ||
                key.includes('D') ||
                key.includes('E') ||
                key.includes('F') ||
                key.includes('G') ||
                key.includes('H')
        );
        const items = [];
        let loopNum = 0;
        for (let i = 8; i < keys.length; i += 8) {
            loopNum += 1;
            const currentArray = keys.slice(i, i + 8);
            const item = {};
            currentArray.forEach(key => {
                const v = list[key].v;
                // item.id = loopNum;
                if (key.includes('B')) {
                    item.key = v;
                } else if (key.includes('D')) {
                    item.title = v;
                    item.id = md5(v);
                } else if (key.includes('E')) {
                    const w = list[key].w.trim();
                    if (w.includes('/')) {
                        item.date = [20, ...w.split('/').splice(0, 2)].join('-');
                    } else {
                        item.date = w;
                    }
                } else if (key.includes('F')) {
                    item.author = v;
                } else if (key.includes('G')) {
                    item.content = v;
                    // 封面图
                    // const images = v.match(/(?<=<img.*?src=").*?(?=">)/g);
                    // item.cover = images ? images[0] : '';
                    // 简短描述
                    const des = v
                        .replace(/<[^>]+>/g, '')
                        .replace(/\s/g, '')
                        .trim()
                        .substr(0, 100);
                    item.des = des;
                } else if (key.includes('C')) {
                    item.description = v;
                } else if (key.includes('H')) {
                    v && (item.cover = v);
                }
            });
            if (item.id) {
                items.push(item);
            }
        }

        // (async () => {
        try {
            const data = items.reverse();
            allData = [...allData, ...data];
            // 移除所有文件
            await execAsync(
                `rm ${path.resolve(__dirname, './data/' + excels[ii] + '/article-detail/*.json')}`
            ).catch(e => {});
            await execAsync(`rm ${path.resolve(__dirname, './data/all/article-detail/*.json')}`).catch(e => {});
            await execAsync(`rm ${path.resolve(__dirname, './article-list/*.json')}`).catch(e => {});
            // 创建文件夹
            await execAsync(`cd data && mkdir ${excels[ii]}`).catch(() => {});
            await execAsync(`cd data && mkdir all`).catch(() => {});
            await execAsync(`cd data && cd ${excels[ii]} && mkdir article-detail`).catch(() => {});
            await execAsync(`cd data && cd ${excels[ii]} && mkdir article-list`).catch(() => {});
            await execAsync(`cd data && cd all && mkdir article-detail`).catch(() => {});
            // 创建文件
            for (let i = 0; i < data.length; i++) {
                if (data[i - 1]) {
                    data[i].preId = data[i - 1].id;
                }
                if (data[i + 1]) {
                    data[i].nextId = data[i + 1].id;
                }
                const filePath = path.resolve(__dirname, `./data/all/article-detail/${data[i].id}.json`);
                // 移除文件
                await execAsync(`rm ${filePath}`).catch(() => {});
                await writeFile(filePath, JSON.stringify(data[i]));
            }
            // 创建索引文件
            for (let i = 0; i < data.length; i += 10) {
                const filePath = path.resolve(__dirname, `./data/${excels[ii]}/article-list/${i / 10 + 1}.json`);
                await execAsync(`rm ${filePath}`).catch(() => {});
                await writeFile(filePath, JSON.stringify(data.slice(i, i + 10)));
            }
            console.log('执行成果');
        } catch (e) {
            console.log(e);
        }
        // })();
    }
    let seo = allData.map(item => ({ path: '/pages/news/NewsDetail', query: `id=${item.id}` }));
    await writeFile(
        path.resolve(__dirname, '../seo.json'),
        JSON.stringify({
            pages: [{ path: '/Index' }, ...seo],
        })
    );
}

createData();
