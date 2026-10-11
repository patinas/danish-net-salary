import test from 'node:test';import assert from 'node:assert/strict';import {salary} from '../src/salary.js';
const input={gross:30000,rate:38,deduction:5000};
test('adult basic calculation',()=>assert.equal(salary(input).net,19012));
test('AM base after own pension and ATP',()=>{const r=salary({...input,pension:5,atp:100});assert.equal(r.am,2272);assert.equal(r.net,18099.36)});
test('year turning 18 owes AM for whole year',()=>assert.equal(salary({...input,yearOfBirth:2008}).am,2400));
test('year turning 17 is exempt',()=>assert.equal(salary({...input,yearOfBirth:2009}).net,20500));
test('secondary card ignores allowance',()=>assert.equal(salary({...input,card:'secondary'}).net,17112));
test('no negative income tax',()=>assert.equal(salary({...input,gross:1000}).net,920));
test('zero salary',()=>assert.equal(salary({...input,gross:0}).net,0));
test('full pension',()=>assert.equal(salary({...input,pension:100}).net,0));
test('reject bad inputs',()=>{for(const x of [{gross:-1},{rate:101},{gross:NaN},{yearOfBirth:2008.5},{card:'free'},{atp:30001},{pension:100,atp:1}])assert.throws(()=>salary({...input,...x}))});
// Skat live calculator checked 2026-10-11 with synthetic figures, no login.
// https://skat.dk/borger/forskudsopgoerelse/regn-ud-hvad-du-faar-udbetalt
// Hovedkort, monthly salary 30000, withholding 38%, allowance 5000.
test('Skat live calculator comparator 2026-10-11',()=>{const r=salary(input);assert.equal(r.net,19012);assert.equal(r.am,2400);assert.equal(r.incomeTax,8588)});
