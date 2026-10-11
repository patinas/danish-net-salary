/** 2026 cash-salary estimate using an existing tax card. No annual tax calculation. */
export function salary({gross,rate,deduction,pension=0,atp=0,yearOfBirth=1990,card='main'}) {
 for(const [key,value] of Object.entries({gross,rate,deduction,pension,atp,yearOfBirth})) if(!Number.isFinite(value)) throw new RangeError(key);
 if(gross<0||gross>1000000||rate<0||rate>100||deduction<0||deduction>1000000||pension<0||pension>100||atp<0||atp>gross||!Number.isInteger(yearOfBirth)||yearOfBirth<1900||yearOfBirth>2026||!['main','secondary'].includes(card))throw new RangeError('Invalid inputs');
 const employeePension=gross*pension/100,base=gross-employeePension-atp;
 if(base<0)throw new RangeError('Deductions exceed salary');
 const am=yearOfBirth<=2008?base*0.08:0;
 const appliedDeduction=card==='secondary'?0:deduction;
 const taxable=Math.max(0,base-am-appliedDeduction),incomeTax=taxable*rate/100;
 return {gross,employeePension,atp,base,am,appliedDeduction,taxable,incomeTax,net:base-am-incomeTax};
}
