document.body.style.border = "5px solid red";
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" 
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" 
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ 
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i])
    }
}
 
removejscssfile("ks_kitoltes", "js")



var akt_feladat=0;var fv_type=1;var valaszErtekek=[];var aktualisIDk=[];var fvtype;var volteredmeny=0;var nincsmentes=false;var korabbiValaszokCacheFeltoltve=false;var maxansws=[];var megjelolt=[];var vidForMatching=[];var savedKids=[],savedBefore=[];var containers=[],placed=[],tasks=[];var mmaxh=[],mmaxw=[];var asked_for_temp_user_data=false;var asked_for_fb_data=false;var timer24=-1;var timer24next=30;var timer24allowed=true;var prevContentOnHold;var prevContent=new Array;var wordCounts=new Array;var solving_in_progress=false;window.addEventListener("beforeunload",function(event){if(solving_in_progress){event.preventDefault();event.returnValue='';}});
function openProvideSource(id,kid,vid){openPopupWindow(lang['provide_source'],24,600,'',{kid:kid,vid:vid},function(){gebi('closeSource').onclick=closepopup;gebi('withdrawSource').onclick=function(){var text=gebi('theSource').value;ajax2('markAsCancelled',{ks_id:ks_id,kid:kid,vid:vid,text:text},function(){var area=gebi('kif_'+id);area.value=prevContentOnHold;wordCount(area);saveEssays();closepopup();});}
gebi('saveSource').onclick=function(){var text=gebi('theSource').value;if(text&&text.length>2){ajax2('saveSource',{ks_id:ks_id,kid:kid,vid:vid,text:text},function(){closepopup();});}}});}
function safeSetDisplay(id,val){var elem=document.getElementById(id);if(elem)elem.style.display=val;}
function refreshFeladatOptions(){redlog('refresh_tasks');aktualisIDk=[];$.Metro.initHints();setupDraggable();setupSorrend();var igaz=document.getElementsByClassName('igaz');var hamis=document.getElementsByClassName('hamis');var fv=document.getElementsByClassName('feleletvalasztos_valasz');if(document.getElementById('vissza')){if(akt_feladat<=1)safeSetDisplay('vissza','none');else safeSetDisplay('vissza','block');}
if(akt_feladat>0){safeSetDisplay('swsw',"block");safeSetDisplay('navbar',"block");safeSetDisplay('navbar-back',"block");safeSetDisplay('tovabb',"block");}
if(volteredmeny){safeSetDisplay('swsw',"none");safeSetDisplay('navbar',"none");safeSetDisplay('navbar-back',"none");}
var c=aktualisIDk.length;var vanmultiple=0;for(var i=0;i<igaz.length;i++){igaz[i].onclick=function(){var akt_feladat_id=getTheKid(this);var akt_feladat_vid=this.parentNode.getAttribute('id').split('_')[0];var fvtype=this.parentNode.parentNode.getElementsByClassName('fv_type')[0].innerHTML;if(!nincsmentes){savedKids[akt_feladat_id]=0;}
valaszErtekek[akt_feladat_id+'|'+fvtype+'|'+akt_feladat_vid]="igaz";this.parentNode.getElementsByClassName('hamis')[0].setAttribute('class','hamis');this.setAttribute('class',this.getAttribute('class')+' activeValasz');kesleltetettmentes();}
aktualisIDk[c]=igaz[i].parentNode.getAttribute('id').split('_')[0];c++;}
for(var i=0;i<hamis.length;i++){hamis[i].onclick=function(){var akt_feladat_id=getTheKid(this);var akt_feladat_vid=this.parentNode.getAttribute('id').split('_')[0];var fvtype=this.parentNode.parentNode.getElementsByClassName('fv_type')[0].innerHTML;if(!nincsmentes){savedKids[akt_feladat_id]=0;}
valaszErtekek[akt_feladat_id+'|'+fvtype+'|'+akt_feladat_vid]="hamis";this.parentNode.getElementsByClassName('igaz')[0].setAttribute('class','igaz');this.setAttribute('class',this.getAttribute('class')+' activeValasz');kesleltetettmentes();}}
var multiples=new Array;for(var i=0;i<fv.length;i++){var fvtype=fv[i].parentNode.parentNode.parentNode.getElementsByClassName('fv_type')[0].innerHTML;if(fvtype=='2'){var kid=getTheKid(fv[i]);multiples[kid]=kid;vanmultiple++;}
fv[i].onclick=function(){var akt_feladat_id=getTheKid(this);var akt_feladat_vid=this.getAttribute('id').split('_')[0];var fvtype=this.parentNode.parentNode.parentNode.getElementsByClassName('fv_type')[0].innerHTML;if(!nincsmentes){savedKids[akt_feladat_id]=0;}
var thisTask=taskBlock(akt_feladat_id).getElementsByClassName('feleletvalasztos_valasz');if(fvtype=='1'){for(var j=0;j<thisTask.length;j++){thisTask[j].setAttribute('class','feleletvalasztos_valasz');valaszErtekek[akt_feladat_id+'|'+fvtype+'|'+thisTask[j].getAttribute('id').split('_')[0]]=0;}}
if(!megjelolt[akt_feladat_id]){megjelolt[akt_feladat_id]=0;}
if(this.getAttribute('class')=='feleletvalasztos_valasz'){if(fvtype=='2'){megjelolt[akt_feladat_id]++;}
if(megjelolt[akt_feladat_id]>maxansws[akt_feladat_id]&&maxansws[akt_feladat_id]>0){megjelolt[akt_feladat_id]--;redalert(lang['too_much_answ']+": "+maxansws[akt_feladat_id]);return false;}
valaszErtekek[akt_feladat_id+'|'+fvtype+'|'+akt_feladat_vid]=1;this.setAttribute('class',this.getAttribute('class')+' activeValasz');}else{if(fvtype=='2'){megjelolt[akt_feladat_id]--;}
valaszErtekek[akt_feladat_id+'|'+fvtype+'|'+akt_feladat_vid]=0;this.setAttribute('class','feleletvalasztos_valasz');}
kesleltetettmentes();}
aktualisIDk[c]=fv[i].getAttribute('id').split('_')[0];c++;}
var temp_user_skip=document.getElementById('temp_user_skip');if(temp_user_skip)temp_user_skip.onclick=function(){kerdesTovabb(1);};var temp_user_submit=document.getElementById('temp_user_submit');if(temp_user_submit)temp_user_submit.onclick=saveTempUserData;if(vanmultiple){var params={};params['ks_id']=ks_id;var kids="";for(x in multiples){kids+="|"+multiples[x];}
params['kids']=kids.substr(1);ajax("getMaxAnsws",params,function(response){if(response!="OK"){var json=JSON.parse(response);for(x in json){maxansws[x]=json[x]['maxans'];}}},"","",true);}
if(akt_feladat==1&&!korabbiValaszokCacheFeltoltve){ksKorabbiValaszok();}
nincsmentes=true;ksMegjelolFromCache();nincsmentes=false;wordCountAndTextareasSetup();egyszavasEll();setupFeladatkep();}
function taskBlock(kid){return document.getElementById("kidbase_"+kid);}
function getTheKid(_this){var found=false;var kid=0;var c=0;do{if(_this.getAttribute('id')){if(_this.getAttribute('id').substr(0,7)=="kidbase"){found=true;kid=_this.getAttribute('id').substr(8);}else{_this=_this.parentNode;c++;}}else{_this=_this.parentNode;c++;}}while(!found&&c<50);return kid;}
function kesleltetettmentes(thetime){if(!thetime)thetime=1600;clearTimeout(timer);if(!nincsmentes){timer=setTimeout(function(){ksKiertekel();},thetime);}}
function megjelol(id,type,igaze){if(document.getElementById(id)){if(type==1||type==2){document.getElementById(id).onclick();}else if(type==3){document.getElementById(id).getElementsByClassName(igaze)[0].onclick();}}}
function ksMegjelolFromCache(){for(var id in valaszErtekek){var data=id.split('|');if(valaszErtekek[id]!=0)megjelol(data[2]+'_'+data[0],data[1],valaszErtekek[id]);if(data[1]==4){var elem=document.getElementById("kif_"+data[2]+"_"+data[0]);if(elem){elem.innerHTML=valaszErtekek[id];wordCount(elem);}}
if(data[1]==5){var elem=document.getElementById("egy_"+data[2]+"_"+data[0]);if(elem){elem.value=valaszErtekek[id];}}
if(data[1]==7){if(valaszErtekek[id]!=-1){var vidm=-1;for(var im in vidForMatching){if(vidForMatching[im]==data[2]&&im.split('_')[1]==data[0]){vidm=im.split('_')[0];}}
var theid=vidm+"_"+data[0];var theid2=valaszErtekek[id]+"_"+data[0];placed[theid2]=theid;}}}
rePlaceDraggable();placeSorrendInSorrend();}
function ksKorabbiValaszok(){var params={};params['ks_id']=ks_id;ajax("ksGetValaszok",params,ksMegjelol,"","",true);}
function ksMegjelol(response){var json=JSON.parse(response);var real_tasks=[];for(x in json){if(!inArray(json[x]['kid'],real_tasks)){real_tasks.push(json[x]['kid']);}
if(json[x]['megjelol']!=0||json[x]['type']==7||json[x]['type']==8){valaszErtekek[json[x]['kid']+'|'+json[x]['type']+'|'+json[x]['vid']]=json[x]['megjelol'];savedBefore[json[x]['kid']]=1;}
if(json[x]['type']==4){if(json[x]['valasz']){valaszErtekek[json[x]['kid']+'|'+json[x]['type']+'|'+json[x]['vid']]=json[x]['valasz'];savedBefore[json[x]['kid']]=1;}else{valaszErtekek[json[x]['kid']+'|'+json[x]['type']+'|'+json[x]['vid']]="";}}
if(json[x]['type']==5){valaszErtekek[json[x]['kid']+'|'+json[x]['type']+'|'+json[x]['vid']]=json[x]['sajatvalasz'];savedBefore[json[x]['kid']]=1;}
savedKids[json[x]['kid']]=1;}
var sw_tovabb=false;if(ks_id==24242424){if(real_tasks.length>0){sw_tovabb=true;akt_feladat=real_tasks.length;}
if(typeof(Storage)!=="undefined"){if(parseInt(localStorage.akt_feladat)>1){sw_tovabb=true;akt_feladat=parseInt(localStorage.akt_feladat);localStorage.timer24=-1;}}
if(sw_tovabb){kerdesTovabb(1);}}
korabbiValaszokCacheFeltoltve=true;}
function saveTempUserData(){var tempu_email='';var tempu_firstname=document.getElementById('temp_user_firstname').value;var tempu_lastname=document.getElementById('temp_user_lastname').value;if(tempu_email.length||tempu_firstname.length||tempu_lastname.length){params={"email":tempu_email,"firstname":tempu_firstname,"lastname":tempu_lastname};ajax("saveTempUserDatas",params,afterSaveTempUserData,"","",true);}else{redlog("no_input_data");}}
function afterSaveTempUserData(response){if(response=="ok"){asked_for_temp_user_data=true;if(!volteredmeny){kerdesTovabb(1);}else{safeSetDisplay('temp_user_form',"none");}}else if(response=="login"){var vege="&tmp";if(!volteredmeny){vege=vege+"&redirect="+encodeURIComponent(window.location)}
window.location='?login'+vege;}else{json=JSON.parse(response);redalert(json[1]);}}
function displayTempUserFormOrNext(asNewUser,atTheBeginning){asNewUser=typeof asNewUser!=='undefined'?asNewUser:0;atTheBeginning=typeof atTheBeginning!=='undefined'?atTheBeginning:1;closeinfobar();k_tovabb=true;params={};params['ks_id']=ks_id;params['asNewUser']=asNewUser;params['atTheBeginning']=atTheBeginning;ajax("getTempUserForm",params,function(response){if(ks_id==24242424){if(response=='ok'){kerdesTovabb(1);return false;}
kerdesFeltolt(response);if(ks_id==24242424&&document.getElementById('fb_login')){safeSetDisplay('fb_login',"block");document.getElementById('feladatBazis').innerHTML="";asked_for_fb_data=true;}
safeSetDisplay('navbar',"none");safeSetDisplay('navbar-back',"none");asked_for_temp_user_data=true;}else{if(response=='ok'){kerdesTovabb(1);return false;}else if(response=='force'||response=='ok_u'){asked_for_temp_user_data=true;kerdesTovabb(1);return false;}
kerdesFeltolt(response);if(ks_id==24242424&&document.getElementById('fb_login')){safeSetDisplay('fb_login',"block");document.getElementById('feladatBazis').innerHTML="";asked_for_fb_data=true;}
safeSetDisplay('navbar',"none");safeSetDisplay('navbar-back',"none");if(!atTheBeginning){asked_for_temp_user_data=true;}}},"","",true);}
function kerdesTovabb(next,alreadyLejart){if(ks_id==24242424)next=1;if(ww>800)window.scrollTo(0,45);else window.scrollTo(0,270);for(x in megjelolt){megjelolt[x]=0;}
if(akt_feladat+next<=pages){var params={};params["ks_id"]=ks_id;params["page"]=akt_feladat+next-1;if(akt_feladat>0){ksKiertekel();if(next>0||ks_id==24242424)ajax("getKerdesBlokk_new",params,kerdesTovabbAjax,"","",true);else ajax("getKerdesBlokk_new",params,kerdesVisszaAjax,"","",true);}else{ajax("ksStart",params,function(response){if(response=="OK"){solving_in_progress=true;if(document.getElementById("ksKitIdolimit")){setNewTimer();}
if(ks_id==24242424){sw_timer();}
var params={};params["ks_id"]=ks_id;params["page"]=akt_feladat;ajax("getKerdesBlokk_new",params,kerdesTovabbAjax,"","",true);}},"","",true);}}else if(akt_feladat>0){if(!alreadyLejart){ksKiertekel();}
var params={};params["ks_id"]=ks_id;timer24allowed=false;if(ks_id==24242424){if(akt_feladat<=pages&&!asked_for_fb_data){volteredmeny=true;displayTempUserFormOrNext(0,0);}else{ajax("ksEredmeny",params,kerdesEredmenyAjax,"","",true);safeSetDisplay('navbar',"none");safeSetDisplay('navbar-back',"none");safeSetDisplay('fb_login',"none");}}else{if(akt_feladat==pages){ajax("ksSummary",params,kerdesTovabbAjax,"","",true);safeSetDisplay('navbar',"block");safeSetDisplay('navbar-back',"block");}else if(!asked_for_temp_user_data){displayTempUserFormOrNext(0,0);}else if(akt_feladat>=pages){ajax("ksEredmeny",params,kerdesEredmenyAjax,"","",true);safeSetDisplay('navbar',"none");safeSetDisplay('navbar-back',"none");}}}}
function kerdesTovabbAjax(response){if(response=="redirect")location.reload(true);akt_feladat++;if(typeof(Storage)!=="undefined"){if(akt_feladat>localStorage.akt_feladat){localStorage.akt_feladat=akt_feladat;}}
kerdesFeltolt(response);}
function kerdesVisszaAjax(response){if(response=="redirect")location.reload(true);akt_feladat--;kerdesFeltolt(response);}
function ksLejart(already){akt_feladat=pages+1;kerdesTovabb(1,already);}
function kerdesFeltolt(response){if(response=="LEJART"){ksLejart();}else{document.getElementById("feladatBazis").innerHTML=response;if(akt_feladat<=pages)document.getElementById("hanyadik").innerHTML=akt_feladat;else document.getElementById("hanyadik").innerHTML=pages;refreshFeladatOptions();refreshSettings();resize();setupFeladatkep();}}
function kerdesEredmenyAjax(response){if(typeof(Storage)!=="undefined"){localStorage.akt_feladat=0;localStorage.timer24=-1;}
volteredmeny=1;solving_in_progress=false;safeSetDisplay('navbar',"none");safeSetDisplay('navbar-back',"none");document.getElementById("feladatBazis").innerHTML=response;refreshFeladatOptions();refreshSettings();resize();voteInit();$.Metro.initPanels();}
function ksErtekek(){var ajax_help="";for(var key in valaszErtekek){var kid=key.split('|')[0];var type=key.split('|')[1];var vid=key.split('|')[2];if(inArray(vid,aktualisIDk)&&((valaszErtekek[key]!=0&&valaszErtekek[key])||type==2||type==7||type==8)&&savedKids[kid]<1){ajax_help+=key+'='+valaszErtekek[key]+'&';}}
if(ajax_help.length){ajax_help=ajax_help.substr(0,ajax_help.length-1);}
return ajax_help;}
function ksKiertekel(){saveEssays();saveEgyszavas();ajax_help=ksErtekek();if(!ajax_help.length){return;}
var params={};params["ks_id"]=ks_id;ajax("ksKiertekel",params,function(res){if(res.substr(0,6)=="LEJART"){redalert(res.substr(7));ksLejart(true);return;}
if(res.substr(0,2).toLowerCase()!="ok"){json=JSON.parse(res);updateSavedKids(json);}},"",ajax_help,true);}
function saveEgyszavas(){var elemek=document.getElementsByClassName('valasz_egyszavas');if(elemek.length>0){var params={};params["ks_id"]=ks_id;var needtosave=false;for(i=0;i<elemek.length;i++){var id=elemek[i].getAttribute('id').split('_')[1];var kid=getTheKid(elemek[i]);if(!savedBefore[kid]&&elemek[i].value.length<1){continue;}
if(!savedKids[kid]){needtosave=true;valaszom=elemek[i].value;if(valaszom=="0")valaszom="-"+valaszom;params["vid"+i]=id;params["kid"+i]=kid;params["valasz"+i]=encodeURIComponent(valaszom);valaszErtekek[kid+'|5|'+id]=valaszom;}}
if(needtosave){ajax("ksSaveEgyszavas",params,function(res){json=JSON.parse(res);updateSavedKids(json);},"","",true);}}}
function saveEssays(draft){var elemek=document.getElementsByTagName("textarea");if(elemek.length>0){var params={};params["ks_id"]=ks_id;var kif_c=0;for(i=0;i<elemek.length;i++){if(elemek[i].getAttribute("class")=="kif_t"){var id=elemek[i].getAttribute('id').split('_')[1];var kid=getTheKid(elemek[i]);if(!savedBefore[kid]&&elemek[i].value.length<1){continue;}
if(!savedKids[kid]){kif_c++;params["text_"+id+"_"+kid]=encodeURIComponent(elemek[i].value);valaszErtekek[kid+'|4|'+id]=elemek[i].value;}else if(elemek[i].value.length>0&&draft){sikeresMentes();}}}
if(kif_c){ajax("ksSaveEssays",params,function(res){json=JSON.parse(res);updateSavedKids(json);if(draft){sikeresMentes();}},"","",true);}}}
function updateSavedKids(json){for(x in json){savedKids[x]=json[x];savedBefore[x]=json[x];}}
function egyszavasEll(){var elemek=document.getElementsByClassName('valasz_egyszavas');if(elemek.length>0){for(i=0;i<elemek.length;i++){elemek[i].onkeyup=function(){if(!document.getElementById("onlyn_"+this.id.substr(4))){return false;}
document.getElementById("onlyn_"+this.id.substr(4)).style.color="black";if(this.getAttribute("type")=="number"&&this.value.length==0){document.getElementById("onlyn_"+this.id.substr(4)).style.color="red";}}}}}
function wordCountAndTextareasSetup(){var elemek=document.getElementsByTagName("textarea");for(i=0;i<elemek.length;i++){if(elemek[i].getAttribute("class")=="kif_t"){elemek[i].onkeyup=function(){var kid=getTheKid(this);savedKids[kid]=0;kesleltetettmentes(8000);wordCount(this);};elemek[i].onchange=function(){var kid=getTheKid(this);savedKids[kid]=0;kesleltetettmentes(1200);};var id=elemek[i].id.substr(4);document.getElementById("save_"+id).onclick=function(){saveEssays(1);};document.getElementById("source_"+id).onclick=function(){var id=this.id.substr(7);var text=gebi("kif_"+id).value;provideSource(id,text);};}}
var elems=document.getElementsByClassName("valasz_egyszavas");for(var i=0;i<elems.length;i++){elems[i].onkeypress=function(){var kid=getTheKid(this);savedKids[kid]=0;kesleltetettmentes(8000);};elems[i].onchange=function(){var kid=getTheKid(this);savedKids[kid]=0;kesleltetettmentes();};}}
function wordCount(elem){var string=elem.value;var id=elem.id.substr(4);var wdc=0;var max=0;if(document.getElementById("max_"+id))max=document.getElementById("max_"+id).innerHTML;else if(document.getElementById("szl_"+id))max=document.getElementById("szl_"+id).innerHTML;max=parseInt(max);if(string.length>0)wdc=1;for(i=0;i<string.length-1;i++){if(string[i]==' '&&string[i+1]!=' '){wdc++;}
if(string[i]=='\n'&&string[i+1]!='\n'){wdc++;}}
if(max<wdc&&max>0)wdc='<span style="color: red">'+wdc+'</span>';document.getElementById("wdc_"+id).innerHTML=wdc;if(!wordCounts[id]){wordCounts[id]=wdc;prevContent[id]=string;}else{if(wdc-wordCounts[id]>=5){provideSource(id,prevContent[id],string);}else{prevContent[id]=string;}
wordCounts[id]=wdc;}}
function delTempUserSess(){ajax2("deleteTempUserSession",{},function(response){window.location.reload();},"",true);}
function setupDraggable(){if(!document.getElementsByClassName("match_container")){return false;}
$(".match_r div").draggable({scroll:false,containment:"#redmenta",start:function(event,ui){$(ui.helper[0]).addClass("onmove");},drag:function(event,ui){for(var i=0,max=containers.length;i<max;i++){var id=tasks[i];var kid=tasks[i].split("_")[1];if(containers[i][0]<event.pageX&&containers[i][0]+mmaxw[kid]>event.pageX&&containers[i][1]<event.pageY&&containers[i][1]+mmaxh[kid]>event.pageY&&kid==ui.helper[0].id.split("_")[1]){$("#mpc"+id).addClass("prob_pair");}else{$("#mpc"+id).removeClass("prob_pair");}}
var itemPos=ui.helper.context.getBoundingClientRect().top+ui.helper.context.clientHeight/2+1;var windowH=window.innerHeight;if(itemPos>=(windowH-50)){window.scrollBy(0,10);}
if(itemPos<=50){window.scrollBy(0,-10);}},stop:function(event,ui){$(ui.helper[0]).removeClass("onmove");var pair=$(".prob_pair");if(pair[0]){var id=pair[0].id.substr(3);var id_r=ui.helper[0].id.substr(3);var kid1=id.split("_")[1];var kid2=id_r.split("_")[1];if(kid1!=kid2){draggableDefault(ui.helper[0]);return true;}
draggableSetplace(ui.helper[0],pair[0])
$("#mpc"+id).removeClass("prob_pair");for(var i=0,max=containers.length;i<max;i++){var id_t=tasks[i];if(gebi("mpr"+id_t).offsetTop==ui.helper[0].offsetTop&&id_t!=id_r){draggableDefault(gebi("mpr"+id_t));}}}else{draggableDefault(ui.helper[0]);}
var id=ui.helper[0].id.substr(3);var kid=id.split("_")[1];savedKids[kid]=0;rePlaceDraggable();draggableContainers();setDraggableAnswerCache();kesleltetettmentes();}});$('img').bind('load',function(){rePlaceDraggable();});setTimeout(rePlaceDraggable,200);setTheTasks();setTheHeight();setTheWidth();draggableContainers();setTimeout(draggableContainers,200);}
function setTheTasks(){placed=new Array;tasks=new Array;containers=new Array;var elems=document.getElementsByClassName("match_container");var c=0;for(var i=0;i<elems.length;i++){var elems2=elems[i].getElementsByClassName("first");for(var o=0,max=elems2.length;o<max;o++){var id=elems2[o].id.substr(3);var vid=gebi("fmc"+id).value;placed[id]=-1;vidForMatching[id]=vid;aktualisIDk[c]=vid;tasks[c]=id;c++;}}}
function draggableSetplace(div,reference){var id_r=div.id.substr(3);var id=reference.id.substr(3);div.style.position="absolute";div.style.top=reference.offsetTop+"px";div.style.left=reference.offsetLeft+"px";placed[id_r]=id;}
function draggableDefault(div){var id_r=div.id.substr(3);placed[id_r]=-1;div.style.position="relative";div.style.top="0px";div.style.left="0px";}
function draggableContainers(){for(var i=0,max=tasks.length;i<max;i++){var id=tasks[i];containers[i]=[document.getElementById("mpc"+id).offsetLeft,document.getElementById("mpc"+id).offsetTop];}}
function setTheWidth(){for(var i=0,max=tasks.length;i<max;i++){var kid=tasks[i].split("_")[1];mmaxw[kid]=-1;}
for(var i=0,max=tasks.length;i<max;i++){var kid=tasks[i].split("_")[1];if(mmaxw[kid]<gebi("mpl"+tasks[i]).offsetWidth){mmaxw[kid]=gebi("mpl"+tasks[i]).offsetWidth;}}
for(var i=0,max=tasks.length;i<max;i++){var id=tasks[i];var kid=tasks[i].split("_")[1];document.getElementById("mpr"+id).style.width=mmaxw[kid]+"px";}}
function setTheHeight(){for(var i=0,max=tasks.length;i<max;i++){var kid=tasks[i].split("_")[1];mmaxh[kid]=-1;}
for(var i=0,max=tasks.length;i<max;i++){var kid=tasks[i].split("_")[1];setDivHeightToDefault("mpl"+tasks[i]);setDivHeightToDefault("mpr"+tasks[i]);if(mmaxh[kid]<gebi("mpl"+tasks[i]).offsetHeight){mmaxh[kid]=gebi("mpl"+tasks[i]).offsetHeight;}
if(mmaxh[kid]<gebi("mpr"+tasks[i]).offsetHeight){mmaxh[kid]=gebi("mpr"+tasks[i]).offsetHeight;}}
for(var i=0,max=tasks.length;i<max;i++){var id=tasks[i];var kid=tasks[i].split("_")[1];setDivHeight("mpc"+id,mmaxh[kid]);setDivHeight("mpl"+id,mmaxh[kid]);setDivHeight("mpr"+id,mmaxh[kid]);document.getElementById("mpr"+id).style.cursor="pointer";}}
function setLeftRightHeight(){var elems=document.getElementsByClassName("match_container");for(var i=0;i<elems.length;i++){var elems2=elems[i].getElementsByClassName("first");for(var o=0,max=elems2.length;o<max;o++){var id=elems2[o].id.substr(3);if(gebi("mpl"+id).offsetHeight<gebi("mpr"+id).offsetHeight){setDivHeight("mpl"+id,gebi("mpr"+id).offsetHeight);}else if(gebi("mpl"+id).offsetHeight>gebi("mpr"+id).offsetHeight){setDivHeight("mpr"+id,gebi("mpl"+id).offsetHeight);}}}}
function setDivHeightToDefault(id){document.getElementById(id).style.paddingTop=(10)+"px";document.getElementById(id).style.paddingBottom=(10)+"px";document.getElementById(id).style.height="auto";}
function setDivHeight(id,mh){var melem=document.getElementById(id);if(!melem)return false;if(id.substr(0,3)!="mpc"){setDivHeightToDefault(id);var padding=(mh-melem.offsetHeight)/2;melem.style.paddingTop=(padding+10)+"px";melem.style.paddingBottom=(padding+10)+"px";melem.style.height=mh+"px";}else{melem.style.height=mh+"px";}}
function draggableResize(){setTheWidth();setTheHeight();draggableContainers();rePlaceDraggable();setupSorrendHeight();}
function rePlaceDraggable(){for(var i=0,max=tasks.length;i<max;i++){var id=tasks[i];if(placed[id]!=-1){draggableSetplace(gebi("mpr"+id),gebi("mpc"+placed[id]));}}}
function setDraggableAnswerCache(){for(var i=0,max=tasks.length;i<max;i++){var id=tasks[i];var kid=id.split("_")[1];var vid=vidForMatching[id];var placee=searchForPlacedAnswer(id);if(placee!=-1){placee=placee.split("_")[0];}
valaszErtekek[kid+'|7|'+vid]=placee;}}
function searchForPlacedAnswer(sid){var placee=-1;for(var i=0,max=tasks.length;i<max;i++){var id=tasks[i];if(placed[id]==sid){placee=id;}}
return placee;}
function setupSorrend(){if(!document.getElementsByClassName("sorrend_container")){return false;}
$(".sorrend_container").sortable({scroll:false,containment:"#feladatBazis",axis:"y",zIndex:999,start:function(event,ui){},sort:function(event,ui){var itemPos=ui.helper.context.getBoundingClientRect().top+ui.helper.context.clientHeight/2+1;var windowH=window.innerHeight;if(itemPos>=(windowH-50)){window.scrollBy(0,10);}
if(itemPos<=50){window.scrollBy(0,-10);}},stop:function(event,ui){readSorrend();kesleltetettmentes();}});$(".sorrend_solve_item").css("cursor","pointer");setupSorrendHeight();}
function setupSorrendHeight(){var elems=document.getElementsByClassName("sorrend_container");for(var i=0;i<elems.length;i++){var smaxh=-1;var elems2=elems[i].getElementsByClassName("sorrend_solve_item");for(var o=0;o<elems2.length;o++){elems2[o].style.height="auto";if(elems2[o].offsetHeight>smaxh){smaxh=elems2[o].offsetHeight;}}
for(var o=0;o<elems2.length;o++){$(elems2[o]).css("height",smaxh+"px");}
$("#sorrend_n_cont"+elems[i].id.substr(3)+" div").css("height",smaxh+"px");}}
function readSorrend(){var elems=document.getElementsByClassName("sorrend_container");c=aktualisIDk.length;for(var i=0;i<elems.length;i++){var elems2=elems[i].getElementsByClassName("sorrend_solve_item");for(var o=0;o<elems2.length;o++){var id=elems2[o].id.split('_');var kid=id[1];var vid=id[2];valaszErtekek[kid+'|8|'+vid]=o;savedKids[kid]=0;aktualisIDk[c]=vid;c++;}}}
function placeSorrendInSorrend(){var elems=document.getElementsByClassName("sorrend_container");var sorrendContainer={};for(var i=0;i<elems.length;i++){var elems2=elems[i].getElementsByClassName("sorrend_solve_item");var max=elems2.length;var kid=elems[i].id.substr(3);sorrendContainer[kid]={};for(var o=0;o<max;o++){var id=elems2[o].id.split('_');var vid=id[2];sorrendContainer[kid][vid]=elems2[o];}
var placedOrder={};var thereIsSavedAnswer=false;var exn=0;for(var x in valaszErtekek){if(x.split('|')[1]!=8){continue;}
var xkid=x.split('|')[0];var xvid=x.split('|')[2];if(xkid==kid){thereIsSavedAnswer=true;placedOrder[valaszErtekek[x]]=sorrendContainer[xkid][xvid];exn++;}}
if(thereIsSavedAnswer&&exn==max){elems[i].innerHTML="";for(var o=0;o<max;o++){if(placedOrder[o]){elems[i].appendChild(placedOrder[o]);}}}}}
function sw_timer(){if(typeof(Storage)!=="undefined"){if(typeof localStorage.timer24==="undefined"){localStorage.timer24=-1;}}
timer24++;var state=0;for(var i=0;i<8;i++){if((timer24next/8)*i<timer24){state=i+1;}}
if(state<1)state=1;if(state>8)state=8;if(timer24>=timer24next){kerdesTovabb(1);timer24=-1;state=1;}
if(typeof(Storage)!=="undefined"){localStorage.timer24=timer24;}
document.getElementById("tovabb").style.backgroundImage="url(design/sw/next"+state+".png)";if(timer24allowed){setTimeout(sw_timer,1000);}}
 var elem = document.getElementById("r_popup");
 elem.parentElement.removeChild(elem);