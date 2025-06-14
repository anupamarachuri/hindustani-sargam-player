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

function play() {
  // Similar logic: play tanpura, metronome beats, and convert Sargam to frequencies + schedule playback
  // Uses Web Audio API for piano-like tones
}

function drawNotation() {
  const input = document.getElementById('sargamInput').value;
  document.getElementById('indian').textContent = input;
  // Use VexFlow to render western staff in #vfCanvas
}
