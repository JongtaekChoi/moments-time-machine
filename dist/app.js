const $=s=>document.querySelector(s);
const state={notice:false,placement:null,found:new Set()};
const bag=$('#bag'),card=$('#noticeCard'),zones=$('#dropZones'),trace=$('#traceCard');
const line=$('#line'),speaker=$('#speaker'),hint=$('#hint'),actions=$('#actions'),narration=$('#narration');

function setTalk(name,text,tip){speaker.textContent=name;line.textContent=text;hint.textContent=tip||''}
function setActions(items=[]){actions.innerHTML='';items.forEach(([label,fn])=>{const b=document.createElement('button');b.className='action';b.type='button';b.textContent=label;b.addEventListener('click',fn);actions.append(b)})}
function found(name,text){state.found.add(name);setTalk('도윤의 마음',text,'다른 반짝이는 물건도 눌러 볼 수 있어요.')}
function openBag(){
  state.notice=true;card.hidden=false;zones.hidden=false;bag.classList.add('opened');
  narration.textContent='가방 앞주머니에서 구겨진 안내장이 나왔다.';
  setTalk('도윤','“색종이랑 자는 있는데… 풀통은 어디 있지?”','아래 장소 중 하나를 눌러 가방을 옮겨 보세요.');
  setActions([['안내장 다시 보기',()=>card.animate([{transform:'rotate(-3deg)'},{transform:'rotate(2deg)'},{transform:'rotate(-3deg)'}],{duration:360})]]);
}
function placeBag(place){
  state.placement=place;zones.hidden=true;bag.style.opacity='.18';bag.style.pointerEvents='none';
  const labels={['식탁 의자']:'눈에 잘 보이는 식탁 의자',['내 방']:'편한 내 방',['현관 바구니']:'현관 바구니'};
  setTalk('도윤',`“가방은 ${labels[place]}에 둘래.”`,'가방을 둔 곳은 다음 장면에도 기억돼요.');
  $('#traceTitle').textContent=`가방을 ${place}에 뒀어요.`;
  $('#traceText').textContent='아직 준비물이 다 해결된 것은 아니지만, 오늘 저녁의 작은 시작이 남았어요.';
  trace.hidden=false;
  setActions([['현관을 더 살펴보기',()=>setTalk('도윤의 마음','“우산이랑 간식도 눌러 볼까?”','필수 행동을 끝낸 뒤에도 숨은 반응을 찾을 수 있어요.')]]);
  trace.scrollIntoView({behavior:'smooth',block:'nearest'});
}
$('#bag').addEventListener('click',openBag);
$('#board').addEventListener('click',()=>found('board','“지난주에 붙인 그림도 아직 여기 있네.”'));
$('#umbrella').addEventListener('click',()=>found('umbrella','우산을 톡 건드리자 물방울이 반짝이며 바닥으로 톡, 톡 떨어졌다.'));
$('#snack').addEventListener('click',()=>found('snack','“간식은 먹고 싶지만, 가방도 조금 신경 쓰여.”'));
document.querySelectorAll('.drop-zone').forEach(b=>b.addEventListener('click',()=>placeBag(b.dataset.place)));
$('#restart').addEventListener('click',()=>location.reload());
$('#nextScene').addEventListener('click',()=>{setTalk('다음 장면','도윤의 방에서 알림장을 펴 보고, 빈 풀통을 찾아볼 차례예요.','방 장면은 다음 작업에서 이어집니다. 현관의 가방 위치는 이미 기록됐어요.');});
setActions([['가방 열어 보기',openBag]]);
