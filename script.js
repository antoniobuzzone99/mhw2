/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

let esito = [];
const images = document.querySelectorAll('.risposta');
for(const image of images){
  image.addEventListener('click', seleziona);
}

function seleziona(event){
  const element = event.currentTarget;
  const check= element.querySelector('.checkbox'); 
  check.src = './images/checked.png';
  element.classList.add('sfondo');

  for(let i of images){
    if(i.dataset.questionId === event.currentTarget.dataset.questionId && i !== event.currentTarget){
      let opacita= i.querySelector('.opacita');
      opacita.classList.remove('hidden');
      let img = i.querySelector('.checkbox');
      img.src = './images/unchecked.png';
      if(i.classList.contains('sfondo')){
        i.classList.remove('sfondo'); 
      }
    }
  }

  const opacita = element.querySelector('.opacita');
  if(!opacita.classList.contains('hidden')){
    opacita.classList.add('hidden');
  }
  
  assegnaEsito(event.currentTarget.dataset.choiceId, event.currentTarget.dataset.questionId);
  calcoloesitoF();

  if(Object.keys(esito).length === 3){
    for(let img of images){
      img.removeEventListener('click', seleziona);
    }
  }
}

function assegnaEsito(cId, qId){
  if(qId === 'one'){
    esito[0] = cId;
  }
  else if(qId === 'two'){
    esito[1] = cId;
  }
  else{
    esito[2] = cId;
  }
}

function calcoloesitoF(){
  if(Object.keys(esito).length === 3){
    if(esito[1] === esito[2] && esito[1] !== esito[0]){
      const tit = document.getElementById('titolo');
      const com = document.getElementById('commento');
      tit.textContent = RESULTS_MAP[esito[1]].title;
      com.textContent = RESULTS_MAP[esito[1]].contents;
    }
    else{
      const tit = document.getElementById('titolo');
      const com = document.getElementById('commento');
      tit.textContent = RESULTS_MAP[esito[0]].title;
      com.textContent = RESULTS_MAP[esito[0]].contents;
    }
    const tasto = document.getElementById('reset');
    tasto.addEventListener('click',ricomincia_quiz);
    const fine = document.getElementById('fine');
    fine.classList.remove('hidden');
  }
}

function ricomincia_quiz(event){
  esito = [];
  for(let i of images){
    const opacita= i.querySelector('.opacita');
    opacita.classList.add('hidden');
    const unc= i.querySelector('.checkbox');
    unc.src = './images/unchecked.png';
    i.classList.remove('sfondo');
    const fine = document.getElementById('fine');
    fine.classList.add('hidden');
    fine.removeEventListener('click', ricomincia_quiz);
    i.addEventListener('click',seleziona);
  }
}

