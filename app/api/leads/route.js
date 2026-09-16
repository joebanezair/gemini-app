export async function GET(){
 try{
  const r=await fetch('https://remotive.com/api/remote-jobs?limit=100',{next:{revalidate:0}}); const d=await r.json();
  const jobs=(d.jobs||[]).slice(0,20).map(j=>{const text=(j.description||'').replace(/<[^>]*>/g,' ');const email=(text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)||[])[0]||'';return {id:String(j.id),title:j.title,company:j.company_name,location:j.candidate_required_location||'Remote',salary:j.salary||'Salary not listed',email,url:j.url,description:text.replace(/\s+/g,' ').trim(),published:j.publication_date}});
  return Response.json({leads:jobs});
 }catch(e){return Response.json({leads:[],error:'Lead source unavailable'},{status:200})}
}
