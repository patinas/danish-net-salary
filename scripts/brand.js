import {writeFile} from 'node:fs/promises';
// CalcFjord: original geometric F with an open channel and a small clay datum.
const icon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#183f3c" d="M8 8h48v12H22v10h27v12H22v14H8z"/><path fill="#a24f36" d="M32 50h24v6H32z"/></svg>`;
export function brandHeader(l,tool){return `<a class="brand" href="/${l}/" aria-label="CalcFjord - ${tool}"><img class="brand-mark" src="/brand-mark.svg" width="38" height="38" alt=""><span class="brand-name">CalcFjord<span class="brand-tool">${tool}</span></span></a>`;}
export async function writeBrand(out){
 await writeFile(new URL('brand-mark.svg',out),icon);
 await writeFile(new URL('favicon.svg',out),icon);
 await writeFile(new URL('logo.svg',out),`<svg xmlns="http://www.w3.org/2000/svg" width="410" height="80" viewBox="0 0 410 80"><path fill="#183f3c" d="M8 8h48v12H22v10h27v12H22v14H8z"/><path fill="#a24f36" d="M32 50h24v6H32z"/><text x="76" y="51" font-family="Georgia,serif" font-size="43" fill="#183f3c">CalcFjord</text></svg>`);
 await writeFile(new URL('social.svg',out),`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f6f4ee"/><path fill="#183f3c" d="M84 70h96v24H112v20h54v24h-54v28H84z"/><path fill="#a24f36" d="M132 154h48v12h-48z"/><text x="216" y="145" font-family="Georgia,serif" font-size="78" fill="#183f3c">CalcFjord</text><path d="M84 225h1032" stroke="#c9d0c8"/><text x="84" y="350" font-family="Georgia,serif" font-size="64" fill="#183f3c">Everyday calculations.</text><text x="84" y="435" font-family="Arial,sans-serif" font-size="35" fill="#4f615b">Working days and Danish salary after tax</text><text x="84" y="535" font-family="Arial,sans-serif" font-size="27" fill="#4f615b">English / Dansk</text></svg>`);
}
