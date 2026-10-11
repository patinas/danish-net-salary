import {salary} from './salary.js';import {copy} from './i18n.js';
const l=document.documentElement.lang,t=copy[l],$=id=>document.getElementById(id),fields=['gross','rate','deduction','pension','atp','yearOfBirth','card'];
function read(){const v={};for(const k of fields){const e=$(k);if(k==='card')v[k]=e.value;else{if(k==='deduction' && $('card').value==='secondary'){v[k]=0;continue}if(e.value.trim()==='')throw new Error('empty');v[k]=Number(e.value)}}return v}
const fmt=v=>new Intl.NumberFormat(l==='da'?'da-DK':'en-GB',{minimumFractionDigits:2,maximumFractionDigits:2}).format(v);
function clearResult(){ $('result').hidden=true;$('ready').hidden=false;$('error').hidden=true;for(const k of ['gross','employeePension','atp','am','incomeTax','appliedDeduction','taxable'])$('out-'+k).textContent='';}
$('calculator').addEventListener('input',clearResult);
$('calculator').addEventListener('submit',e=>{e.preventDefault();$('error').hidden=true;try{const v=read(),r=salary(v);$('net').textContent=fmt(r.net);$('ready').hidden=true;$('result').hidden=false;for(const k of ['gross','employeePension','atp','am','incomeTax','appliedDeduction','taxable'])$('out-'+k).textContent=fmt(r[k]);}catch{$('result').hidden=true;$('ready').hidden=false;$('error').textContent=t.error;$('error').hidden=false;$('error').focus()}});
$('example').addEventListener('click',()=>{const v={gross:30000,rate:38,deduction:5000,pension:0,atp:0,yearOfBirth:1990,card:'main'};for(const k of fields)$(k).value=v[k];$('calculator').requestSubmit()});
$('card').addEventListener('change',()=>{$('deduction').disabled=$('card').value==='secondary'});
// Preserve form in this tab only when the visitor explicitly changes language.
try{const saved=JSON.parse(sessionStorage.getItem('salary-language-form')||'null');if(saved){for(const k of fields)if(saved[k]!=null)$(k).value=saved[k];sessionStorage.removeItem('salary-language-form');$('card').dispatchEvent(new Event('change'));}}catch{}
$('language').addEventListener('change',e=>{try{const v={};for(const k of fields)v[k]=$(k).value;sessionStorage.setItem('salary-language-form',JSON.stringify(v))}catch{}location.href='/'+e.target.value+'/'});
