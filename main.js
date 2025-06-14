const raagas = {
  Yaman: { aro: ['Ni','Re','Ga','Ma(t)','Dha'], ava: ['Ni','Dha','Ma(t)','Ga','Re'], tanpura: 'c_drone.mp3' },
  Bhupali: { aro: ['Sa','Re','Ga','Pa','Dha'], ava: ['Sa','Dha','Pa','Ga','Re'] , tanpura: 'c_drone.mp3'},
  // ... add more
};

const noteMap = {
 'Sa.':48,'Re(k).':49,'Re.':50, 'Ga(k).':51,'Ga.':52,'Ma.':53,'Ma(t).':54,'Pa.':55,'Dha(k).':56,'Dha.':57,'Ni(k).':58,'Ni.':59,
 'Sa':60,'Re(k)':61,'Re':62,'Ga(k)':63,'Ga':64,'Ma':65,'Ma(t)':66,'Pa':67,'Dha(k)':68,'Dha':69,'Ni(k)':70,'Ni':71,
 'Sa\'':72,'Re(k)\'':73,'Re\'':74,'Ga(k)\'':75,'Ga\'':76,'Ma\'':77,'Ma(t)\'':78,'Pa\'':79,'Dha(k)\'':80,'Dha\'':81,'Ni(k)\'':82,'Ni\'':83,
 'Sa\'\'':84 // etc.
};

function init() {
  const sel = document.getElementById('raagSelect');
  for (let name in raagas) {
    let o = document.createElement('option');
    o.value = name; o.textContent = name;
    sel.appendChild(o);
  }
  drawNotation();
}
window.onload = init;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function play() {
  const sargamText = document.getElementById('sargamInput').value;
  const bpm = parseInt(document.getElementById('tempo').value);
  const beatDuration = 60 / bpm;
  const tokens = sargamText.trim().split(/\s+/);

  const tanpura = document.getElementById('tanpura');
  const click = document.getElementById('click');
  tanpura.volume = 0.3;
  tanpura.play();

  let currentTime = audioCtx.currentTime;

  tokens.forEach((token, i) => {
    const midi = noteMap[token];
    if (midi != null) {
      const freq = 440 * Math.pow(2, (midi - 69) / 12);
      scheduleNote(freq, currentTime);
    }

    // Metronome click every beat
    click.currentTime = 0;
    click.play();

    currentTime += beatDuration;
  });

  // Stop tanpura after playback (optional)
  setTimeout(() => tanpura.pause(), tokens.length * beatDuration * 1000);
}

function scheduleNote(freq, time) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, time);
  gain.gain.setValueAtTime(0.4, time);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(time);
  osc.stop(time + 0.45);
}

function drawNotation() {
  const input = document.getElementById('sargamInput').value;
  document.getElementById('indian').textContent = input;
  // Use VexFlow to render western staff in #vfCanvas
}
