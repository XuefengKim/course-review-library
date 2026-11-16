const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'page.html'),'utf8').replace('/*DATA*/',fs.readFileSync(path.join(__dirname,'data.js'),'utf8'));
fs.writeFileSync(path.resolve(__dirname,'../materials/复习题库.html'),html);
