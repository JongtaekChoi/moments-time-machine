const scene = document.querySelector('#scene');
const el = {
  eyebrow: document.querySelector('#eyebrow'), title: document.querySelector('#title'), narration: document.querySelector('#narration'),
  speaker: document.querySelector('#speaker'), line: document.querySelector('#line'), choices: document.querySelector('#choices'), hint: document.querySelector('#hint'), clock: document.querySelector('#clockCard')
};

const state = { response: '', learned: false };
const scenes = {
  start: {
    eyebrow:'저녁 7시 40분 · 식탁', title:'또 깜빡했어',
    narration:'가방은 의자에 걸려 있고, 숙제 공책은 식탁 위에 펴져 있다. 내일 준비물은 아직 생각나지 않는다.',
    speaker:'엄마', line:'“내일 준비물도 가방에 넣었어?”',
    choices:[
      ['“응, 챙겼어.”', 'skip'], ['“잠깐만. 가방 열어서 볼게.”', 'check'], ['“준비물은 내일의 내가 챙기겠지!”', 'silly', 'silly']
    ], hint:'정답을 고르는 이야기가 아니에요. 한 번 말해 보고, 다시 생각해 볼 수 있어요.'
  },
  skip: {
    eyebrow:'다음 날 아침 · 현관', title:'문 앞에서 멈춘 하루',
    narration:'신발을 신다가 알림장을 봤다. “수학 준비물: 자, 풀, 색종이.” 가방 안에는 공책과 연필뿐이다.',
    speaker:'엄마', line:'“어제 챙겼다고 했잖아. 왜 매번 마지막에 알게 되는 걸까?”',
    choices:[['아무 말 없이 고개를 숙인다.', 'mother'], ['“엄마도 어제 확인 안 했잖아!”', 'mother']], hint:'말이 날카로워진 순간에는, 둘 다 자기 몫의 피곤함만 보일 때가 있어요.'
  },
  check: {
    eyebrow:'저녁 7시 41분 · 식탁', title:'가방을 열어 보니',
    narration:'가방 앞주머니에서 구겨진 알림장이 나온다. 필요한 것은 자, 풀, 색종이. 풀은 다 썼다.',
    speaker:'아이', line:'“아… 풀도 없네. 내일 아침에 말하면 늦겠지?”',
    choices:[['“엄마, 같이 메모해 줄래? 내일 문구점 들르고 싶어.”', 'mother'], ['“없는 풀로 숙제가 스스로 붙으면 좋겠다.”', 'silly2', 'silly']], hint:'미리 알아차려도 늘 완벽하게 해결되는 건 아니에요. 그래도 같이 방법을 찾을 수 있어요.'
  },
  silly: {
    eyebrow:'상상 속 · 내일의 나', title:'내일의 내가 화났다',
    narration:'잠옷을 입은 ‘내일의 나’가 현관에서 나타났다. 한 손엔 비어 있는 가방, 다른 손엔 “왜 나한테 넘겼어?”라고 쓴 쪽지.',
    speaker:'내일의 나', line:'“나는 미래에서 왔어. 그런데 준비물은 같이 안 왔어!”',
    choices:[['그래도 가방을 열어서 확인해 본다.', 'check']], hint:'엉뚱한 선택은 웃길 수 있지만, 내일의 나는 대신 해결해 주지 않아요.'
  },
  silly2: {
    eyebrow:'상상 속 · 풀의 반란', title:'풀이 대답했다',
    narration:'빈 풀통이 식탁 위에서 데굴데굴 굴러가더니 작은 목소리로 말한다. “나는 텅 비었어. 내일 아침의 너도 바쁠 텐데?”',
    speaker:'아이', line:'“알겠어. 그럼 지금 적어 둘게.”',
    choices:[['엄마에게 내일 필요한 것을 말한다.', 'mother']], hint:'상상은 잠깐 쉬게 해 주지만, 해결은 작은 말 한마디에서 시작돼요.'
  },
  mother: {
    eyebrow:'엄마의 시간 · 같은 저녁', title:'엄마도 놓친 것',
    narration:'엄마는 저녁을 치우고, 빨래를 널고, 내일 아침을 생각하고 있었다. “챙겼어?”라고 물었지만 가방을 함께 열어 보지는 않았다.',
    speaker:'엄마의 마음', line:'“왜 또 깜빡했냐고 묻기 전에, 같이 확인할 방법을 만들 수도 있었는데.”',
    choices:[['마음의 시계를 돌린다.', 'rewind']], hint:'깜빡한 일은 아이 혼자 만든 문제가 아닐 수 있어요. 기억에만 맡긴 방식도 함께 바꿀 수 있어요.'
  },
  rewind: {
    eyebrow:'저녁 7시 40분 · 한 번 더', title:'다시 말할 수 있다면',
    narration:'시계바늘이 저녁으로 돌아왔다. 이번에는 엄마도, 아이도 어제보다 조금 더 알고 있다.',
    speaker:'엄마', line:'“챙겼어? 말로 대답하기보다, 가방 열고 세 가지만 같이 볼까?”',
    choices:[
      ['“응. 알림장 보고 내가 먼저 넣어 볼게.”', 'ending'],
      ['“엄마가 다 찾아서 넣어 줘.”', 'help'],
      ['“내일의 나에게 또 맡길래!”', 'silly', 'silly']
    ], hint:'좋은 선택은 착한 대답이 아니라, 다음번에 실제로 할 수 있는 작은 행동이에요.'
  },
  help: {
    eyebrow:'다시 말한 뒤', title:'함께, 하지만 대신은 아니게',
    narration:'엄마는 필요한 물건을 식탁에 올려 두고, 아이에게 알림장을 읽어 달라고 했다. 마지막으로 가방에 넣는 손은 아이의 손이었다.',
    speaker:'엄마', line:'“오늘은 같이 하자. 대신 내일부터는 네가 현관 체크표를 보고 먼저 확인해 볼래?”',
    choices:[['“응. ‘알림장, 준비물, 물통’ 세 칸으로 할래.”', 'ending']], hint:''
  },
  ending: {
    eyebrow:'오늘의 끝 · 내일을 위한 세 칸', title:'완벽하지 않아도, 다시 해 본다',
    narration:'가방 옆에 작은 체크표가 놓였다. 알림장 · 준비물 · 물통. 누구도 혼나지 않았지만, 내일을 위한 방법 하나가 생겼다.',
    speaker:'아이와 엄마', line:'“아까는 미안해.”  “나도 말이 너무 컸어.”',
    choices:[['다른 선택도 해 보기', 'start']], hint:'현실에서는 시간을 되돌릴 수 없어요. 그래도 “아까는 미안해”와 “이번엔 같이 확인하자”는 언제든 다시 말할 수 있어요.'
  }
};

function render(key) {
  const data = scenes[key];
  scene.classList.toggle('ending', key === 'ending');
  el.eyebrow.textContent = data.eyebrow; el.title.textContent = data.title; el.narration.textContent = data.narration;
  el.speaker.textContent = data.speaker; el.line.textContent = data.line; el.hint.textContent = data.hint;
  el.clock.hidden = !['mother','rewind','ending','help'].includes(key);
  el.choices.innerHTML = '';
  data.choices.forEach(([label, next, tone]) => {
    const button = document.createElement('button'); button.type='button'; button.className = `choice ${tone || ''}`; button.textContent=label;
    button.addEventListener('click', () => render(next)); el.choices.append(button);
  });
  window.scrollTo({top:0, behavior:'smooth'});
}
document.querySelector('#restart').addEventListener('click', () => render('start'));
render('start');
