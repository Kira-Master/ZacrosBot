cmd.on('eval',['>','=>'],['owner'],async(msg,res) => {
let parse = res.command.includes('=>') ? res.text.replace('=>','return ') : res.text.replace('>','')
try{
let evaluate = await eval(`;(async () => {${parse} })()`).catch(e => { return e });
return client.reply(msg,functions.util.format(evaluate));
} catch(e){
return res.client.reply(msg,functions.util.format(e));
}
},{owner:'--noresp',usedPrefix:false});

cmd.on('exec',['$'],['owner'],async(msg,res) => {
try{
functions.exec(`${res.query}`,(err,out) => {
if (err) return client.reply(msg,functions.util.format(err));
client.reply(msg,functions.util.format(out));
});
} catch(e){
 return res.client.reply(msg,functions.util.format(e));
}
},{owner:'--noresp',usedPrefix:false})

cmd.on('bc',['broadcast'],['owner'],(msg,{query,client}) => {
let sender = msg.sender.vname
let anu = client.chats.all()
for (let _ of anu) {
client.sendText(_.jid, ` *General Bot Broadcast*\n\n${query}\n\nBroadcast message sender : ${sender}`)}
},{owner:'Only owner',query:'Isi query!'});

cmd.on('bcbutt',['bcbutton'],['owner'],(msg,{query,client}) => {
let sender = msg.sender.vname
let anu = client.chats.all()
for (let _ of anu) {
client.sendButton(_.jid,Buffer.alloc(0),'documentMessage',[{id:'.menu',text:'MENU'},{id:'.info',text:'INFO'}],{mimetype:'application/octet-stream',filename:` *General Bot Broadcast* `,content:`${query}\n\n_Broadcast message sender : ${sender}_`,footer:'Powered by Kira-Master',contextInfo:{ externalAdReply: { title: 'Kira-Master', "body": `Multipurpose Whatsapp bot using library baileys!`,thumbnailUrl: `https://i.pinimg.com/736x/d9/dd/05/d9dd0569752b0cd67919d4b4053d8347.jpg`,sourceUrl: 'wa.me/6282322153431'}}})
}
},{owner:'Only owner',query:'Isi query!',param: functions.needed('teks')});
