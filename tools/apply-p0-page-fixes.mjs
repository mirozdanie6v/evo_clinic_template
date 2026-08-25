import fs from 'node:fs/promises';

const file='app/page.tsx';
let text=await fs.readFile(file,'utf8');
const replacements=[
  ['onClick={()=>startBooking("consultation")}', 'onClick={()=>startBooking(services.find(service=>service.categoryId==="altegio-13249482")?.id||"")}'],
  ['<em>{service.price[lang]} · {service.duration} min</em>', '<em>{service.price[lang]}{service.duration?` · ${service.duration} min`:""}</em>'],
  ['<b>{selectedService.duration} min</b>', '<b>{selectedService.duration?`${selectedService.duration} min`:"—"}</b>'],
  ['setBooking(prev=>({...prev,serviceId:id,specialistId:service?.specialistIds.length===1?service.specialistIds[0]:"",date:"",time:""}));\n    setBookingStep(service?.specialistIds.length===1 ? 2 : 1);', 'const preferred=booking.specialistId&&service?.specialistIds.includes(booking.specialistId)?booking.specialistId:(service?.specialistIds.length===1?service.specialistIds[0]:"");\n    setBooking(prev=>({...prev,serviceId:id,specialistId:preferred,date:"",time:""}));\n    setBookingStep(preferred ? 2 : 1);'],
  ['setAnswer(scored.length ? scored : ["consultation"]);', 'setAnswer(scored.length ? scored : [services.find(service=>service.categoryId==="altegio-13249482")?.id||services[0]?.id].filter(Boolean) as string[]);']
];
for(const [from,to] of replacements){
  if(!text.includes(from)) throw new Error(`Expected source fragment not found: ${from.slice(0,80)}`);
  text=text.replace(from,to);
}
await fs.writeFile(file,text);
console.log('P0 page fixes applied');
