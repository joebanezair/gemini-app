import nodemailer from 'nodemailer';
export async function POST(req){const {job}=await req.json();const base=new URL(req.url);const tr=await fetch(new URL('/api/tailor',base),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({job})});const {text}=await tr.json();
 if(!job.email)return Response.json({message:'No public email on this lead. Open the source to apply.',draft:text});
 if(!process.env.GMAIL_USER||!process.env.GMAIL_APP_PASSWORD)return Response.json({message:'Tailored email ready, but Gmail is not configured yet.',draft:text});
 const tx=nodemailer.createTransport({service:'gmail',auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_APP_PASSWORD}});const attachments=process.env.CV_URL?[{filename:'CV.pdf',path:process.env.CV_URL}]:[];await tx.sendMail({from:process.env.GMAIL_USER,to:job.email,subject:`Application – ${job.title}`,text,attachments});return Response.json({message:`Sent tailored CV to ${job.company}`})}
