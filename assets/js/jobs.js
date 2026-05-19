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

function renderJobs(list) {
  const container = document.getElementById('jobsList');
  if (!container) return;
  container.innerHTML = '';
  list.forEach((job) => {
    const card = document.createElement('article');
    card.className = 'job-card';
    card.innerHTML = `
      <div class="job-header">
        <h3>${job.title}</h3>
        <span class="badge">${job.dept}</span>
      </div>
      <p class="muted">${job.loc} • ${job.type}</p>
      <p>${job.desc}</p>
      <p><strong>Requirements:</strong> ${job.req.join(', ')}</p>
      <div class="job-actions"><a class="btn primary" href="mailto:alphamindplus@outlook.com?subject=Application: ${encodeURIComponent(job.title)}">Apply Now</a></div>
    `;
    container.appendChild(card);
  });
}

function populateFilters() {
  const select = document.getElementById('deptFilter');
  if (!select) return;
  const departments = ['All'];
  JOBS.forEach((job) => {
    if (!departments.includes(job.dept)) departments.push(job.dept);
  });
  departments.forEach((dept) => {
    const option = document.createElement('option');
    option.value = dept.toLowerCase();
    option.textContent = dept;
    select.appendChild(option);
  });
}

function filterJobs() {
  const search = document.getElementById('jobSearch');
  const select = document.getElementById('deptFilter');
  let filtered = [...JOBS];
  const query = search?.value.trim().toLowerCase() || '';
  const department = select?.value || 'all';
  if (department && department !== 'all') {
    filtered = filtered.filter((job) => job.dept.toLowerCase() === department);
  }
  if (query) {
    filtered = filtered.filter((job) => (`${job.title} ${job.dept} ${job.desc} ${job.req.join(' ')}`.toLowerCase().includes(query)));
  }
  renderJobs(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  renderJobs(JOBS);
  populateFilters();

  const search = document.getElementById('jobSearch');
  const select = document.getElementById('deptFilter');
  const clear = document.getElementById('clearFilters');

  search?.addEventListener('input', filterJobs);
  select?.addEventListener('change', filterJobs);
  clear?.addEventListener('click', () => {
    if (search) search.value = '';
    if (select) select.value = 'all';
    filterJobs();
  });
});
