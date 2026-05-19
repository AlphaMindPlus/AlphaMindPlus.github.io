// Jobs data and UI for careers page
const JOBS = [
  {id:1,title:'AI Engineering Intern',dept:'Artificial Intelligence',loc:'Remote - Europe',type:'Internship',desc:'Work on ML models and pipelines.',req:['Python','ML basics','team player']},
  {id:2,title:'Cloud Computing Intern',dept:'Cloud Infrastructure',loc:'Remote - Europe',type:'Internship',desc:'Assist in cloud deployments and cost optimisation.',req:['Linux','Docker','Cloud fundamentals']},
  {id:3,title:'Software Engineering Intern',dept:'Engineering',loc:'Remote - Europe',type:'Internship',desc:'Build full-stack features and APIs.',req:['JS','React or similar','git']},
  {id:4,title:'Cybersecurity Intern',dept:'Security',loc:'Remote - Europe',type:'Internship',desc:'Support security assessments and monitoring.',req:['Security basics','scripting','curiosity']},
  {id:5,title:'FinTech Analyst Intern',dept:'Finance & Technology',loc:'Remote - Europe',type:'Internship',desc:'Analyse fintech product performance and trends.',req:['Excel','analytical skills','interest in finance']},
  {id:6,title:'DevOps Engineering Intern',dept:'Infrastructure',loc:'Remote - Europe',type:'Internship',desc:'Implement CI/CD and observability.',req:['CI/CD','Terraform or similar','linux']},
  {id:7,title:'UI/UX Design Intern',dept:'Product Design',loc:'Remote - Europe',type:'Internship',desc:'Design interfaces, prototypes and research.',req:['Figma','design thinking','communication']},
  {id:8,title:'Data Science Intern',dept:'Analytics & AI',loc:'Remote - Europe',type:'Internship',desc:'Build models and dashboards for insights.',req:['Python','statistics','data viz']},
  {id:9,title:'Digital Marketing Intern',dept:'Marketing',loc:'Remote - Europe',type:'Internship',desc:'Support growth campaigns and analytics.',req:['SEO basics','content','analytics']},
  {id:10,title:'Enterprise Architecture Intern',dept:'Architecture',loc:'Remote - Europe',type:'Internship',desc:'Assist in designing scalable architectures.',req:['system thinking','cloud basics','documentation']}
];

function renderJobs(list){const container=document.getElementById('jobsList');if(!container)return;container.innerHTML='';list.forEach(j=>{const el=document.createElement('article');el.className='job-card';el.innerHTML=`<h3>${j.title}</h3><div class="badge">${j.dept}</div><p class="muted">${j.loc} • ${j.type}</p><p>${j.desc}</p><p><strong>Requirements:</strong> ${j.req.join(', ')}</p><div style="margin-top:10px"><a class="btn primary" href="mailto:jobs@alphamindplus.com?subject=Application: ${encodeURIComponent(j.title)}">Apply Now</a></div>`;container.appendChild(el)});
}

function populateFilters(){const sel=document.getElementById('deptFilter');if(!sel)return;const depts=['All'];JOBS.forEach(j=>{if(!depts.includes(j.dept))depts.push(j.dept)});depts.forEach(d=>{const o=document.createElement('option');o.value=d.toLowerCase();o.textContent=d;o.selected=false;sel.appendChild(o)});
}

document.addEventListener('DOMContentLoaded',()=>{
  renderJobs(JOBS);populateFilters();
  const search=document.getElementById('jobSearch');const filter=document.getElementById('deptFilter');const clear=document.getElementById('clearFilters');
  function apply(){let res=JOBS.slice();const q=search.value.trim().toLowerCase();if(filter && filter.value && filter.value!=='all'){res=res.filter(j=>j.dept.toLowerCase()===filter.value)}if(q){res=res.filter(j=> (j.title+j.dept+j.desc+ j.req.join(' ')).toLowerCase().includes(q))}renderJobs(res)}
  if(search)search.addEventListener('input',apply);if(filter)filter.addEventListener('change',apply);if(clear)clear.addEventListener('click',()=>{if(search)search.value='';if(filter)filter.value='all';apply()});
});
