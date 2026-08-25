"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { brandLogoUrl, catalogMeta, categories, getCategory, getService, getSpecialist, locations, services, specialists, type Lang } from "../data/evo";
import { ui } from "../lib/i18n";
import { addAppointment, makeAppointmentId, readAppointments, removeAppointment, type DemoAppointment } from "../lib/storage";

type Screen = "home" | "services" | "service" | "specialists" | "specialist" | "booking" | "ai" | "profile" | "admin";
type BookingDraft = { serviceId:string; specialistId:string; date:string; time:string; name:string; phone:string; email:string };

const emptyBooking = ():BookingDraft => ({serviceId:"",specialistId:"",date:"",time:"",name:"",phone:"",email:""});
const TIMES = ["10:00","12:30","15:00","17:30"];

function browserLang():Lang {
  if (typeof navigator === "undefined") return "ru";
  const value = navigator.language.toLowerCase();
  return value.startsWith("vi") ? "vi" : value.startsWith("en") ? "en" : "ru";
}

function formatDate(value:string, lang:Lang) {
  if (!value) return "";
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : lang === "vi" ? "vi-VN" : "en-US", {weekday:"short",day:"numeric",month:"short"}).format(new Date(`${value}T12:00:00`));
}

function normalize(value:string){return value.trim().toLocaleLowerCase();}

export default function App() {
  const [lang,setLang] = useState<Lang>("ru");
  const [screen,setScreen] = useState<Screen>("home");
  const [detailId,setDetailId] = useState("");
  const [booking,setBooking] = useState<BookingDraft>(emptyBooking);
  const [bookingStep,setBookingStep] = useState(0);
  const [success,setSuccess] = useState(false);
  const [appointments,setAppointments] = useState<DemoAppointment[]>([]);
  const [dates,setDates] = useState<string[]>([]);
  const [query,setQuery] = useState("");
  const [answer,setAnswer] = useState<string[]>([]);
  const [broadcast,setBroadcast] = useState("");
  const [broadcastSaved,setBroadcastSaved] = useState(false);
  const [serviceSearch,setServiceSearch] = useState("");
  const [categoryFilter,setCategoryFilter] = useState("all");
  const [bookingSearch,setBookingSearch] = useState("");

  useEffect(()=>{
    const saved = localStorage.getItem("evo-lang") as Lang | null;
    const resolved = saved && (["ru","en","vi"] as string[]).includes(saved) ? saved : browserLang();
    setLang(resolved);
    document.documentElement.lang = resolved;
    setAppointments(readAppointments());
    const now = new Date();
    const next = Array.from({length:6},(_,index)=>{
      const d = new Date(now);
      d.setDate(now.getDate()+index+1);
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    });
    setDates(next);
    const sync = ()=>setAppointments(readAppointments());
    window.addEventListener("evo-appointments-change",sync);
    return ()=>window.removeEventListener("evo-appointments-change",sync);
  },[]);

  const t = ui[lang];
  const location = locations[0];
  const selectedService = getService(detailId);
  const selectedSpecialist = getSpecialist(detailId);
  const bookingService = getService(booking.serviceId);
  const bookingSpecialist = getSpecialist(booking.specialistId);
  const availableSpecialists = useMemo(()=>bookingService ? specialists.filter(s=>bookingService.specialistIds.includes(s.id)) : specialists,[bookingService]);
  const uniqueClients = useMemo(()=>new Set(appointments.map(x=>x.phone || x.email).filter(Boolean)).size,[appointments]);

  const filteredServices = useMemo(()=>{
    const q=normalize(serviceSearch);
    return services.filter(service=>{
      if(categoryFilter!=="all"&&service.categoryId!==categoryFilter)return false;
      if(!q)return true;
      const category=getCategory(service.categoryId);
      const text=[...Object.values(service.name),...Object.values(service.description),...(category?Object.values(category.name):[])].join(" ").toLocaleLowerCase();
      return text.includes(q);
    });
  },[serviceSearch,categoryFilter]);

  const bookingServices = useMemo(()=>{
    const q=normalize(bookingSearch);
    if(!q)return services;
    return services.filter(service=>{
      const category=getCategory(service.categoryId);
      return [...Object.values(service.name),...(category?Object.values(category.name):[])].join(" ").toLocaleLowerCase().includes(q);
    });
  },[bookingSearch]);

  const visibleCategories=useMemo(()=>categories.filter(category=>filteredServices.some(service=>service.categoryId===category.id)),[filteredServices]);
  const catalogDate=useMemo(()=>new Intl.DateTimeFormat(lang==="ru"?"ru-RU":lang==="vi"?"vi-VN":"en-US",{day:"numeric",month:"short",year:"numeric"}).format(new Date(catalogMeta.extractedAt)),[lang]);

  const changeLang = (value:Lang) => {
    setLang(value);
    localStorage.setItem("evo-lang",value);
    document.documentElement.lang=value;
  };

  const openService = (id:string) => { setDetailId(id); setScreen("service"); window.scrollTo({top:0,behavior:"smooth"}); };
  const openSpecialist = (id:string) => { setDetailId(id); setScreen("specialist"); window.scrollTo({top:0,behavior:"smooth"}); };
  const openCategory = (id:string) => { setCategoryFilter(id); setServiceSearch(""); setScreen("services"); window.scrollTo({top:0,behavior:"smooth"}); };

  const startBooking = (serviceId="", specialistId="") => {
    const service = getService(serviceId);
    const normalizedSpecialist = specialistId || (service?.specialistIds.length===1 ? service.specialistIds[0] : "");
    setBooking({...emptyBooking(),serviceId,specialistId:normalizedSpecialist});
    setBookingStep(serviceId ? (normalizedSpecialist ? 2 : 1) : 0);
    setBookingSearch("");
    setSuccess(false);
    setScreen("booking");
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const chooseService = (id:string) => {
    const service = getService(id);
    const preferred=booking.specialistId&&service?.specialistIds.includes(booking.specialistId)?booking.specialistId:(service?.specialistIds.length===1?service.specialistIds[0]:"");
    setBooking(prev=>({...prev,serviceId:id,specialistId:preferred,date:"",time:""}));
    setBookingStep(preferred ? 2 : 1);
  };

  const submitAppointment = () => {
    if (!booking.serviceId || !booking.specialistId || !booking.date || !booking.time || !booking.name.trim() || !booking.phone.trim()) return;
    const item:DemoAppointment = {...booking,id:makeAppointmentId(),createdAt:new Date().toISOString()};
    addAppointment(item);
    setAppointments(readAppointments());
    setSuccess(true);
  };

  const repeatAppointment = (item:DemoAppointment) => {
    setBooking({serviceId:item.serviceId,specialistId:item.specialistId,date:"",time:"",name:item.name,phone:item.phone,email:item.email});
    setBookingStep(2);
    setSuccess(false);
    setScreen("booking");
  };

  const deleteAppointment = (id:string) => {
    removeAppointment(id);
    setAppointments(readAppointments());
  };

  const askCatalog = (event?:FormEvent) => {
    event?.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const tokens = q.split(/[^\p{L}\p{N}]+/u).filter(x=>x.length>2);
    const scored = services.map(service=>{
      const category = getCategory(service.categoryId);
      const haystack = [...Object.values(service.name),...Object.values(service.description),...(category?Object.values(category.name):[])].join(" ").toLowerCase();
      const score = tokens.reduce((sum,token)=>sum+(haystack.includes(token)?1:0),0);
      return {service,score};
    }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,3).map(x=>x.service.id);
    setAnswer(scored.length ? scored : [services.find(service=>service.categoryId==="altegio-13249482")?.id||services[0]?.id].filter(Boolean) as string[]);
  };

  const nav = (target:Screen) => { setScreen(target); setSuccess(false); window.scrollTo({top:0,behavior:"smooth"}); };
  const activeNav = screen==="service"||screen==="specialists"||screen==="specialist" ? "services" : screen==="admin" ? "profile" : screen;

  return <main className="shell">
    <header className="topbar" data-testid="topbar">
      <button className="brand" onClick={()=>nav("home")} aria-label="EVO Beauty Space home"><img className="brandLogo" src={brandLogoUrl} alt="EVO"/><span><b>EVO</b><small>BEAUTY SPACE · NHA TRANG</small></span></button>
      <div className="langs" aria-label="Language">{(["ru","en","vi"] as Lang[]).map(value=><button key={value} className={lang===value?"on":""} onClick={()=>changeLang(value)}>{value.toUpperCase()}</button>)}</div>
    </header>

    <section className="content">
      {screen==="home" && <>
        <section className="hero"><div className="heroShade"/><div className="heroText"><small>{t.home.eyebrow}</small><h1>{t.home.title}</h1><p>{t.home.lead}</p><div className="actions"><button className="primary light" onClick={()=>startBooking()}>{t.common.book}</button><button className="secondary light" onClick={()=>nav("services")}>{t.nav.services}</button></div></div></section>
        <button className="status" onClick={()=>startBooking(services.find(service=>service.categoryId==="altegio-13249482")?.id||"")}><i/><span><b>{t.home.open}</b><small>{t.home.consult}</small></span><em>→</em></button>
        <SectionTitle title={t.home.popular} action={t.home.all} onAction={()=>{setCategoryFilter("all");nav("services")}}/>
        <div className="categoryGrid">{categories.slice(0,4).map(category=><button className="categoryCard" key={category.id} onClick={()=>openCategory(category.id)}><img src={category.image} alt=""/><span><b>{category.name[lang]}</b><small>{category.note[lang]}</small></span></button>)}</div>
        <SectionTitle title={t.home.specialists} action={t.home.all} onAction={()=>nav("specialists")}/>
        <div className="specialistStrip">{specialists.slice(0,3).map(s=><button className="specialistMini" key={s.id} onClick={()=>openSpecialist(s.id)}><img src={s.image} alt=""/><span><b>{s.name[lang]}</b><small>{s.role[lang]}</small></span><em>→</em></button>)}</div>
        <section className="locationCard"><small>EVO NORTH · NHA TRANG</small><h2>{t.home.contacts}</h2><p>{location.address}</p><div className="contactLinks"><a href={`tel:${location.phone.replace(/\s/g,"")}`}>{location.phone}</a><a href={`mailto:${location.email}`}>{location.email}</a><a href={location.telegramUrl} target="_blank" rel="noreferrer">@evo_vn · {t.location.telegram}</a></div><div className="actions"><a className="primary" href={location.mapUrl} target="_blank" rel="noreferrer">{t.home.route}</a><a className="secondary" href={location.telegramUrl} target="_blank" rel="noreferrer">Telegram</a><a className="secondary" href={location.bookingUrl} target="_blank" rel="noreferrer">Altegio</a></div></section>
      </>}

      {screen==="services" && <section className="page"><PageHead eyebrow="EVO CARE · ALTEGIO" title={t.services.title} lead={t.services.lead}/><div className="catalogTools"><label className="catalogSearch"><span>⌕</span><input data-testid="service-search" value={serviceSearch} onChange={e=>setServiceSearch(e.target.value)} placeholder={t.services.search}/>{serviceSearch&&<button onClick={()=>setServiceSearch("")} aria-label={t.common.close}>×</button>}</label><div className="categoryChips" aria-label={t.services.allCategories}><button className={categoryFilter==="all"?"on":""} onClick={()=>setCategoryFilter("all")}>{t.common.all}</button>{categories.map(category=><button key={category.id} className={categoryFilter===category.id?"on":""} onClick={()=>setCategoryFilter(category.id)}>{category.name[lang]}</button>)}</div><small className="catalogCount">{t.services.found}: {filteredServices.length}</small></div>{filteredServices.length===0?<div className="emptyState"><b>{t.services.empty}</b></div>:<div className="serviceGroups">{visibleCategories.map(category=><section className="serviceGroup" key={category.id}><div className="groupHead"><div><h2>{category.name[lang]}</h2><p>{category.note[lang]}</p></div></div><div className="serviceList">{filteredServices.filter(s=>s.categoryId===category.id).map(service=><button className="serviceRow" key={service.id} onClick={()=>openService(service.id)}><img src={service.image} alt=""/><span><b>{service.name[lang]}</b><small>{service.description[lang]}</small><em>{service.price[lang]}{service.duration?` · ${service.duration} min`:""}</em></span><strong>→</strong></button>)}</div></section>)}</div>}<button className="linkRow" onClick={()=>nav("specialists")}>{t.specialists.title}<span>→</span></button></section>}

      {screen==="service" && selectedService && <section className="page"><button className="back" onClick={()=>nav("services")}>← {t.common.back}</button><div className="detailHero"><img src={selectedService.image} alt=""/></div><small>{getCategory(selectedService.categoryId)?.name[lang]}</small><h1>{selectedService.name[lang]}</h1><p>{selectedService.description[lang]}</p><div className="facts"><div><small>{t.services.price}</small><b>{selectedService.price[lang]}</b></div><div><small>{t.services.duration}</small><b>{selectedService.duration?`${selectedService.duration} min`:"—"}</b></div></div><h3>{t.services.specialists}</h3><div className="specialistStrip">{specialists.filter(s=>selectedService.specialistIds.includes(s.id)).map(s=><button className="specialistMini" key={s.id} onClick={()=>openSpecialist(s.id)}><img src={s.image} alt=""/><span><b>{s.name[lang]}</b><small>{s.role[lang]}</small></span><em>→</em></button>)}</div><button className="primary full" onClick={()=>startBooking(selectedService.id)}>{t.services.book}</button></section>}

      {screen==="specialists" && <section className="page"><PageHead eyebrow="EVO TEAM · ALTEGIO" title={t.specialists.title} lead={t.specialists.lead}/><div className="specialistGrid">{specialists.map(s=><button className="specialistCard" key={s.id} onClick={()=>openSpecialist(s.id)}><img src={s.image} alt=""/><span>{s.demo&&<em>{t.specialists.demo}</em>}<b>{s.name[lang]}</b><small>{s.role[lang]}</small></span></button>)}</div></section>}

      {screen==="specialist" && selectedSpecialist && <section className="page"><button className="back" onClick={()=>nav("specialists")}>← {t.common.back}</button><div className="detailHero specialistPhoto"><img src={selectedSpecialist.image} alt=""/></div><small>{selectedSpecialist.demo?t.specialists.demo:"EVO TEAM · ALTEGIO"}</small><h1>{selectedSpecialist.name[lang]}</h1><p>{selectedSpecialist.bio[lang]}</p><h3>{t.specialists.services}</h3><div className="compactList">{services.filter(s=>selectedSpecialist.serviceIds.includes(s.id)).map(service=><button key={service.id} onClick={()=>openService(service.id)}><span><b>{service.name[lang]}</b><small>{service.price[lang]}</small></span><em>→</em></button>)}</div><button className="primary full" onClick={()=>startBooking("",selectedSpecialist.id)}>{t.common.book}</button></section>}

      {screen==="booking" && <section className="page"><PageHead eyebrow="EVO BOOKING" title={t.booking.title} lead={t.booking.demo}/>{success ? <div className="successCard"><span>✓</span><h2>{t.booking.success}</h2><p>{t.booking.successNote}</p><button className="primary full" onClick={()=>nav("profile")}>{t.nav.profile}</button><a className="secondary full center" href={location.bookingUrl} target="_blank" rel="noreferrer">{t.booking.openAltegio}</a></div> : <div className="bookingFlow"><div className="stepper">{[t.booking.stepService,t.booking.stepSpecialist,t.booking.stepDate,t.booking.stepTime,t.booking.stepContact,t.booking.stepReview].map((label,index)=><span key={label} className={bookingStep===index?"on":bookingStep>index?"done":""}>{index+1}<small>{label}</small></span>)}</div>
        {bookingStep===0&&<div><h2>{t.booking.chooseService}</h2><label className="catalogSearch compact"><span>⌕</span><input data-testid="booking-search" value={bookingSearch} onChange={e=>setBookingSearch(e.target.value)} placeholder={t.booking.searchService}/>{bookingSearch&&<button onClick={()=>setBookingSearch("")} type="button" aria-label={t.common.close}>×</button>}</label><div className="choiceList" data-testid="booking-service-list">{bookingServices.map(service=><button key={service.id} onClick={()=>chooseService(service.id)}><img src={service.image} alt=""/><span><b>{service.name[lang]}</b><small>{service.price[lang]}</small></span><em>→</em></button>)}</div></div>}
        {bookingStep===1&&<div><h2>{t.booking.chooseSpecialist}</h2>{availableSpecialists.length?<div className="choiceList">{availableSpecialists.map(s=><button key={s.id} onClick={()=>{setBooking(prev=>({...prev,specialistId:s.id}));setBookingStep(2)}}><img src={s.image} alt=""/><span><b>{s.name[lang]}</b><small>{s.role[lang]}</small></span><em>→</em></button>)}</div>:<p>{t.booking.noSpecialists}</p>}<button className="back bottomGap" onClick={()=>setBookingStep(0)}>← {t.common.back}</button></div>}
        {bookingStep===2&&<div><h2>{t.booking.chooseDate}</h2><div className="dateGrid">{dates.map(date=><button className={booking.date===date?"on":""} key={date} onClick={()=>{setBooking(prev=>({...prev,date}));setBookingStep(3)}}><b>{formatDate(date,lang)}</b></button>)}</div><button className="back bottomGap" onClick={()=>setBookingStep(bookingService?.specialistIds.length===1?0:1)}>← {t.common.back}</button></div>}
        {bookingStep===3&&<div><h2>{t.booking.chooseTime}</h2><div className="timeGrid">{TIMES.map(time=><button className={booking.time===time?"on":""} key={time} onClick={()=>{setBooking(prev=>({...prev,time}));setBookingStep(4)}}>{time}</button>)}</div><button className="back bottomGap" onClick={()=>setBookingStep(2)}>← {t.common.back}</button></div>}
        {bookingStep===4&&<form className="contactForm" onSubmit={e=>{e.preventDefault();if(booking.name.trim()&&booking.phone.trim())setBookingStep(5)}}><h2>{t.booking.yourDetails}</h2><label>{t.booking.name}<input required autoComplete="name" value={booking.name} onChange={e=>setBooking(prev=>({...prev,name:e.target.value}))}/></label><label>{t.booking.phone}<input required inputMode="tel" autoComplete="tel" value={booking.phone} onChange={e=>setBooking(prev=>({...prev,phone:e.target.value}))}/></label><label>{t.booking.email}<input inputMode="email" autoComplete="email" value={booking.email} onChange={e=>setBooking(prev=>({...prev,email:e.target.value}))}/></label><div className="actions"><button type="button" className="secondary" onClick={()=>setBookingStep(3)}>{t.common.back}</button><button className="primary" type="submit">{t.common.next}</button></div></form>}
        {bookingStep===5&&<div><h2>{t.booking.review}</h2><div className="reviewCard"><ReviewRow label={t.booking.stepService} value={bookingService?.name[lang]||"—"}/><ReviewRow label={t.booking.stepSpecialist} value={bookingSpecialist?.name[lang]||"—"}/><ReviewRow label={t.booking.stepDate} value={formatDate(booking.date,lang)}/><ReviewRow label={t.booking.stepTime} value={booking.time}/><ReviewRow label={t.booking.name} value={booking.name}/><ReviewRow label={t.booking.phone} value={booking.phone}/></div><div className="actions"><button className="secondary" onClick={()=>setBookingStep(4)}>{t.common.back}</button><button className="primary" onClick={submitAppointment}>{t.booking.confirm}</button></div></div>}
      </div>}</section>}

      {screen==="ai" && <section className="page"><PageHead eyebrow="EVO AI · DEMO" title={t.ai.title} lead={t.ai.lead}/><div className="chat"><div className="bubble">{t.ai.hello}</div>{answer.length>0&&<div className="answerBox"><b>{t.ai.recommend}</b>{answer.map(id=>{const service=getService(id);return service?<button key={id} onClick={()=>openService(id)}><span><strong>{service.name[lang]}</strong><small>{service.description[lang]}</small></span><em>→</em></button>:null})}</div>}<form className="chatForm" onSubmit={askCatalog}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.ai.placeholder}/><button>{t.ai.ask}</button></form></div></section>}

      {screen==="profile" && <section className="page"><PageHead eyebrow="EVO CLIENT" title={t.profile.title}/><div className="profileCard"><img className="profileLogo" src={brandLogoUrl} alt="EVO"/><div><b>{appointments[0]?.name||t.profile.guest}</b><small>{t.profile.demo}</small></div></div><SectionTitle title={t.profile.appointments}/>{appointments.length===0?<div className="emptyState"><b>{t.profile.empty}</b><p>{t.profile.emptyNote}</p><button className="primary" onClick={()=>startBooking()}>{t.common.book}</button></div>:<div className="appointmentList">{appointments.map(item=>{const service=getService(item.serviceId);const specialist=getSpecialist(item.specialistId);return <article key={item.id}><small>{formatDate(item.date,lang)} · {item.time}</small><h3>{service?.name[lang]}</h3><p>{specialist?.name[lang]}</p><div className="actions"><button className="secondary small" onClick={()=>repeatAppointment(item)}>{t.profile.repeat}</button><button className="danger small" onClick={()=>deleteAppointment(item.id)}>{t.profile.delete}</button></div></article>})}</div>}<button className="linkRow" onClick={()=>nav("admin")}>{t.admin.title}<span>→</span></button></section>}

      {screen==="admin" && <section className="page"><button className="back" onClick={()=>nav("profile")}>← {t.common.back}</button><PageHead eyebrow="EVO INTERNAL · DEMO" title={t.admin.title} lead={t.admin.lead}/><div className="stats"><div><b>{appointments.length}</b><small>{t.admin.statsAppointments}</small></div><div><b>{uniqueClients}</b><small>{t.admin.statsClients}</small></div><div><b>{services.length}</b><small>{t.admin.statsServices}</small></div></div><div className="sourceCard"><small>{t.admin.source}</small><b>EVO NORTH · Altegio</b><span>{catalogDate} · {categories.length} / {services.length}</span></div><h2>{t.admin.appointments}</h2>{appointments.length===0?<div className="emptyState"><p>{t.admin.noAppointments}</p></div>:<div className="adminTable">{appointments.map(item=><div key={item.id}><span><b>{item.name}</b><small>{item.phone}</small></span><span><b>{getService(item.serviceId)?.name[lang]}</b><small>{formatDate(item.date,lang)} · {item.time}</small></span></div>)}</div>}<h2>{t.admin.broadcast}</h2><div className="broadcastBox"><label>{t.admin.broadcastText}<textarea value={broadcast} onChange={e=>{setBroadcast(e.target.value);setBroadcastSaved(false)}}/></label><button className="primary" onClick={()=>{if(broadcast.trim()){localStorage.setItem("evo-demo-broadcast",broadcast);setBroadcastSaved(true)}}}>{t.admin.broadcastDemo}</button>{broadcastSaved&&<small className="saved">✓ {t.admin.saved}</small>}</div></section>}
    </section>

    <nav className="bottomNav">{[["⌂",t.nav.home,"home"],["◇",t.nav.services,"services"],["＋",t.nav.booking,"booking"],["✦",t.nav.ai,"ai"],["○",t.nav.profile,"profile"]].map(([icon,label,id])=><button key={id} className={activeNav===id?"on":""} onClick={()=>id==="booking"?startBooking():nav(id as Screen)}><span>{icon}</span><small>{label}</small></button>)}</nav>
  </main>;
}

function PageHead({eyebrow,title,lead}:{eyebrow?:string;title:string;lead?:string}) { return <div className="pageHead">{eyebrow&&<small>{eyebrow}</small>}<h1>{title}</h1>{lead&&<p>{lead}</p>}</div> }
function SectionTitle({title,action,onAction}:{title:string;action?:string;onAction?:()=>void}) { return <div className="sectionTitle"><h2>{title}</h2>{action&&onAction&&<button onClick={onAction}>{action}</button>}</div> }
function ReviewRow({label,value}:{label:string;value:string}) { return <div><small>{label}</small><b>{value}</b></div> }
