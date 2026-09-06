const themeButton=document.getElementById("themeButton");
const savedTheme=localStorage.getItem("portfolio-theme");
if(savedTheme==="dark"){document.body.classList.add("dark");themeButton.textContent="☀️";}
themeButton.addEventListener("click",()=>{
document.body.classList.toggle("dark");
const dark=document.body.classList.contains("dark");
themeButton.textContent=dark?"☀️":"🌙";
localStorage.setItem("portfolio-theme",dark?"dark":"light");
});
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("show");});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
document.getElementById("year").textContent=new Date().getFullYear();

/* Scroll progress bar */
const scrollBar=document.getElementById("scrollBar");
window.addEventListener("scroll",()=>{
const h=document.documentElement;
const scrolled=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
scrollBar.style.width=scrolled+"%";
});

/* Dropdown menus (nav + hero download buttons) */
document.querySelectorAll(".dropdown").forEach(dd=>{
const trigger=dd.querySelector(".dl-trigger");
trigger.addEventListener("click",e=>{
e.stopPropagation();
document.querySelectorAll(".dropdown").forEach(other=>{if(other!==dd)other.classList.remove("open");});
dd.classList.toggle("open");
});
});
document.addEventListener("click",()=>{
document.querySelectorAll(".dropdown").forEach(dd=>dd.classList.remove("open"));
});

/* Toast + close dropdown on resume download click */
const toast=document.getElementById("toast");
let toastTimer;
document.querySelectorAll('a[download]').forEach(link=>{
link.addEventListener("click",()=>{
document.querySelectorAll(".dropdown").forEach(dd=>dd.classList.remove("open"));
const fileName=link.getAttribute("href").split("/").pop();
toast.textContent="Downloading "+fileName+" …";
toast.classList.add("show");
clearTimeout(toastTimer);
toastTimer=setTimeout(()=>toast.classList.remove("show"),2500);
});
});

/* Back to top button */
const backToTop=document.getElementById("backToTop");
window.addEventListener("scroll",()=>{
backToTop.classList.toggle("show",window.scrollY>500);
});
backToTop.addEventListener("click",()=>{
window.scrollTo({top:0,behavior:"smooth"});
});

/* Active nav link on scroll */
const sections=document.querySelectorAll("main .section, .hero");
const navLinks=document.querySelectorAll(".nav-links a");
const navObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const id=entry.target.getAttribute("id");
navLinks.forEach(link=>{
link.classList.toggle("active",link.getAttribute("href")==="#"+id);
});
}
});
},{rootMargin:"-45% 0px -50% 0px"});
sections.forEach(sec=>navObserver.observe(sec));

/* Typewriter effect for hero role */
const roles=["Java & Backend Developer","Spring Boot Enthusiast","AI/ML Intern","Aspiring Full Stack Developer"];
const typewriterEl=document.getElementById("typewriter");
let roleIndex=0,charIndex=0,deleting=false;
function typeLoop(){
const current=roles[roleIndex];
if(!deleting){
charIndex++;
typewriterEl.textContent=current.slice(0,charIndex);
if(charIndex===current.length){deleting=true;setTimeout(typeLoop,1400);return;}
}else{
charIndex--;
typewriterEl.textContent=current.slice(0,charIndex);
if(charIndex===0){deleting=false;roleIndex=(roleIndex+1)%roles.length;}
}
setTimeout(typeLoop,deleting?45:85);
}
typeLoop();
