from pathlib import Path

p=Path('app/page.tsx')
s=p.read_text(encoding='utf-8')
s=s.replace('import { FormEvent, useEffect, useMemo, useState } from "react";','import { useEffect, useMemo, useState } from "react";')
s=s.replace('import { addAppointment, makeAppointmentId, readAppointments, removeAppointment, type DemoAppointment } from "../lib/storage";','import { addAppointment, makeAppointmentId, readAppointments, removeAppointment, type DemoAppointment } from "../lib/storage";\nimport DemoAiConsultant from "./demo-ai-consultant";\nimport DemoAdmin from "./demo-admin";')
for line in [
'  const [query,setQuery]=useState("");\n',
'  const [answer,setAnswer]=useState<string[]>([]);\n',
'  const [broadcast,setBroadcast]=useState("");\n',
'  const [broadcastSaved,setBroadcastSaved]=useState(false);\n']:
    s=s.replace(line,'')
start=s.index('  const askCatalog=')
end=s.index('\n\n  return <main',start)
s=s[:start]+s[end:]
ai_start=s.index('      {screen==="ai"&&')
ai_end=s.index('\n\n      {screen==="profile"',ai_start)
s=s[:ai_start]+'      {screen==="ai"&&<DemoAiConsultant lang={lang} onOpenService={openService} onBookService={(id)=>startBooking(id)}/>}'+s[ai_end:]
admin_start=s.index('      {screen==="admin"&&')
admin_end=s.index('\n    </section>',admin_start)
s=s[:admin_start]+'      {screen==="admin"&&<DemoAdmin lang={lang} appointments={appointments} onBack={()=>nav("profile")}/>}'+s[admin_end:]
p.write_text(s,encoding='utf-8')
print('patched',p,len(s))
