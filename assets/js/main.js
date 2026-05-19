import './jobs.js';

// Main JS: loader, UI interactions, particles, counters
document.addEventListener('DOMContentLoaded',function(){
  // Year
  document.querySelectorAll('#year,#year2,#year3').forEach(el=>el.textContent=new Date().getFullYear());

  // Mobile toggle: toggles .open on header.nav for responsive menu
  const mtButtons = document.querySelectorAll('#mobileToggle');
  mtButtons.forEach(mt=>{
    mt.addEventListener('click',()=>{
      const header = mt.closest('.nav');
      const expanded = mt.getAttribute('aria-expanded') === 'true';
      mt.setAttribute('aria-expanded', String(!expanded));
      if(header){ header.classList.toggle('open'); }
    });
  });

  // Close mobile menu on Escape
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ document.querySelectorAll('.nav.open').forEach(n=>n.classList.remove('open')); document.querySelectorAll('#mobileToggle').forEach(b=>b.setAttribute('aria-expanded','false')); }});

  // Simple loader
  const loader=document.getElementById('loader');setTimeout(()=>loader && loader.remove(),700);

  // Counters
  document.querySelectorAll('.num').forEach(el=>{
    const t=parseInt(el.getAttribute('data-target')||'0',10);let c=0;const step=Math.max(1,Math.floor(t/60));
    const iv=setInterval(()=>{c+=step;if(c>=t){el.textContent=t;clearInterval(iv)}else el.textContent=c;},18);
  });

  // particles canvas
  const canvas=document.getElementById('particles');if(canvas){const ctx=canvas.getContext('2d');let w,h;function resize(){w=canvas.width=canvas.clientWidth;h=canvas.height=canvas.clientHeight;}resize();window.addEventListener('resize',resize);
    const particles=[];for(let i=0;i<60;i++){particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8+0.6,dx:(Math.random()-0.5)*0.4,dy:(Math.random()-0.5)*0.4})}
    function frame(){ctx.clearRect(0,0,w,h);ctx.globalCompositeOperation='lighter';particles.forEach(p=>{p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>w)p.dx*=-1;if(p.y<0||p.y>h)p.dy*=-1;ctx.beginPath();ctx.fillStyle='rgba(76,198,255,0.06)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();});requestAnimationFrame(frame)}frame();}
});

function contactMail(e){e.preventDefault();const form=e.target;const email=form.email.value||'';const msg=form.message.value||'';const href=`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Contact from AlphaMindPlus')}&body=${encodeURIComponent(msg)}`;window.location.href=href;return false}
