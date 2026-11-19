import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x07506c, 0.018);
const camera = new THREE.PerspectiveCamera(48, container.clientWidth/container.clientHeight, 0.1, 180);
camera.position.set(0, 8, 25);
const renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
container.prepend(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = .045;
controls.minDistance = 10; controls.maxDistance = 42;
controls.maxPolarAngle = Math.PI*.88; controls.target.set(0,2,0);

scene.add(new THREE.HemisphereLight(0x9deeff,0x06233a,2.0));
const keyLight = new THREE.DirectionalLight(0x8cecff,2.4); keyLight.position.set(-8,15,8); scene.add(keyLight);
const glow = new THREE.PointLight(0x20c6ed,45,42); glow.position.set(2,8,-5); scene.add(glow);

const water = new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({color:0x063c58,roughness:.9,metalness:.05}));
water.rotation.x=-Math.PI/2; water.position.y=-4.4; scene.add(water);
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshStandardMaterial({color:0x987d58,roughness:1}));
floor.rotation.x=-Math.PI/2; floor.position.y=-4.55; scene.add(floor);

// Sand ripples and scattered stones
for(let i=0;i<95;i++){const r=.12+Math.random()*.45;const m=new THREE.Mesh(new THREE.DodecahedronGeometry(r,0),new THREE.MeshStandardMaterial({color:[0x7d806c,0xaaa080,0x536e70][i%3],roughness:1}));m.position.set((Math.random()-.5)*48,-4.25+Math.random()*.12,(Math.random()-.5)*32);m.scale.y=.35;scene.add(m);}

// Coral garden: branching coral made from tapered segments
const coralMats=[0xff796f,0xffb36b,0xc47ce5,0xf17cae,0xf2a85b].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:.55}));
function branch(start,end,r,mat){const a=new THREE.Vector3(...start),b=new THREE.Vector3(...end),d=b.clone().sub(a);const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r*.55,r,d.length(),7),mat);mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());scene.add(mesh);}
for(let c=0;c<18;c++){const x=(Math.random()-.5)*38,z=(Math.random()-.5)*24;const h=1.2+Math.random()*2.1,mat=coralMats[c%coralMats.length];branch([x,-4.2,z],[x,-4.2+h,z],.28,mat);for(let b=0;b<4;b++){let side=(Math.random()-.5)*1.7,hh=h*(.45+Math.random()*.5);branch([x,-4.2+hh*.45,z],[x+side,-4.2+hh,z+(Math.random()-.5)*.8],.19,mat);branch([x+side,-4.2+hh,z+(Math.random()-.5)*.8],[x+side*1.25,-4.2+hh+.45,z],.12,mat);}}
const plantMat=new THREE.MeshStandardMaterial({color:0x2b9c78,roughness:.7});
for(let i=0;i<28;i++){const x=(Math.random()-.5)*42,z=(Math.random()-.5)*25;for(let j=0;j<3;j++){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(x,-4.3,z),new THREE.Vector3(x+(Math.random()-.5),-2.7,z),new THREE.Vector3(x+(Math.random()-.5)*2,-1.4+Math.random(),z)]);const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,12,.055,5,false),plantMat);scene.add(mesh);mesh.userData.sway=Math.random()*6;}}

// Fish models with animated tails
const fishGroups=[];
const fishColors=[0xff8b42,0x48d4db,0xffd45c,0xf08ab6,0x8aa7ff,0xf5f0df];
function makeFish(color,scale=1){const g=new THREE.Group();const mat=new THREE.MeshStandardMaterial({color,roughness:.32,metalness:.08});const body=new THREE.Mesh(new THREE.SphereGeometry(.55,18,14),mat);body.scale.set(1.35,.72,.65);g.add(body);const tail=new THREE.Mesh(new THREE.ConeGeometry(.38,.72,3),mat);tail.rotation.z=-Math.PI/2;tail.position.x=-.9;g.add(tail);const fin=new THREE.Mesh(new THREE.ConeGeometry(.25,.48,3),mat);fin.rotation.z=Math.PI;fin.position.set(-.05,.48,0);g.add(fin);const eyeMat=new THREE.MeshStandardMaterial({color:0x071b28});for(const s of [-1,1]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.065,8,8),eyeMat);eye.position.set(.48,.12,s*.29);g.add(eye);}g.scale.setScalar(scale);g.userData.tail=tail;return g;}
for(let i=0;i<17;i++){const s=.55+Math.random()*.7;const f=makeFish(fishColors[i%fishColors.length],s);f.position.set((Math.random()-.5)*30,-.2+Math.random()*7,(Math.random()-.5)*18);scene.add(f);fishGroups.push({mesh:f,origin:f.position.clone(),speed:.35+Math.random()*.45,phase:Math.random()*6.28,range:3+Math.random()*5});}

// A few larger elegant fish
for(let i=0;i<3;i++){const f=makeFish([0x58c8c5,0xf1a45c,0x9a9be8][i],1.45);f.position.set(-8+i*8,3+i*.7,-7);scene.add(f);fishGroups.push({mesh:f,origin:f.position.clone(),speed:.25+i*.08,phase:i*2,range:5});}

// Jellyfish with glowing bell and dangling tentacles
const jellyGroup=new THREE.Group();const jellyMat=new THREE.MeshStandardMaterial({color:0x9c8cff,emissive:0x5944d9,emissiveIntensity:1.4,transparent:true,opacity:.85});
const bell=new THREE.Mesh(new THREE.SphereGeometry(.75,20,14,0,Math.PI*2,0,Math.PI*.58),jellyMat);bell.scale.y=.8;jellyGroup.add(bell);
for(let i=0;i<8;i++){const pts=[];for(let j=0;j<6;j++)pts.push(new THREE.Vector3(Math.cos(i/8*Math.PI*2)*.48,-.35-j*.28,Math.sin(i/8*Math.PI*2)*.48));const curve=new THREE.CatmullRomCurve3(pts);jellyGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve,12,.025,5,false),new THREE.MeshBasicMaterial({color:0x9bceff})));}jellyGroup.position.set(6,5,-9);scene.add(jellyGroup);

// Bubbles
const bubbleMat=new THREE.MeshPhysicalMaterial({color:0xb6f4ff,roughness:.05,metalness:.05,transparent:true,opacity:.35});
const bubbles=[];for(let i=0;i<85;i++){const r=.035+Math.random()*.09;const b=new THREE.Mesh(new THREE.SphereGeometry(r,8,8),bubbleMat);b.position.set((Math.random()-.5)*40,-4+Math.random()*18,(Math.random()-.5)*28);scene.add(b);bubbles.push({mesh:b,speed:.35+Math.random()*.75,drift:Math.random()*6});}

// Sunbeams and floating particles
const particleGeo=new THREE.BufferGeometry(),positions=[];for(let i=0;i<650;i++)positions.push((Math.random()-.5)*50,Math.random()*18-4,(Math.random()-.5)*35);particleGeo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));const particles=new THREE.Points(particleGeo,new THREE.PointsMaterial({color:0xc8f8ff,size:.045,transparent:true,opacity:.65}));scene.add(particles);
const beams=new THREE.Group();for(let i=0;i<7;i++){const beam=new THREE.Mesh(new THREE.CylinderGeometry(.15,2.8,18,12,1,true),new THREE.MeshBasicMaterial({color:0x7de9f5,transparent:true,opacity:.045,side:THREE.DoubleSide,depthWrite:false}));beam.position.set(-13+i*4,5,-12);beam.rotation.z=.16;beams.add(beam);}scene.add(beams);

// Feeding particles
const food=[];function feedFish(){for(let i=0;i<18;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.07,7,7),new THREE.MeshBasicMaterial({color:0xffd78b}));m.position.set((Math.random()-.5)*5,5+Math.random()*2,(Math.random()-.5)*5);scene.add(m);food.push({mesh:m,life:0});}}
let paused=false,night=false,elapsed=0;
function setNight(value){night=value;scene.background=new THREE.Color(value?0x020d27:0x07506c);scene.fog.color.set(value?0x06142c:0x07506c);keyLight.intensity=value?.35:2.4;glow.intensity=value?75:45;jellyMat.emissiveIntensity=value?2.7:1.4;document.getElementById('dayBtn').classList.toggle('active',!value);document.getElementById('nightBtn').classList.toggle('active',value);document.getElementById('viewLabel').textContent=value?'NIGHT REEF · 12M':'REEF ZONE · 12M';}
scene.background=new THREE.Color(0x07506c);
document.getElementById('dayBtn').onclick=()=>setNight(false);document.getElementById('nightBtn').onclick=()=>setNight(true);
document.getElementById('pauseBtn').onclick=()=>{paused=!paused;document.getElementById('pauseBtn').textContent=paused?'▶ Play':'Ⅱ Pause';};
document.getElementById('feedBtn').onclick=feedFish;
document.getElementById('resetBtn').onclick=()=>{camera.position.set(0,8,25);controls.target.set(0,2,0);controls.update();};
document.getElementById('exploreBtn').onclick=()=>document.getElementById('oceanStage').scrollIntoView({behavior:'smooth'});
document.getElementById('soundBtn').onclick=()=>{const b=document.getElementById('soundBtn');b.textContent=b.textContent==='♫'?'♪':'♫';b.title='Visual demo: ambient audio is not enabled';};
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.04);if(!paused){elapsed+=dt;fishGroups.forEach(({mesh,origin,speed,phase,range})=>{const t=elapsed*speed+phase;mesh.position.x=origin.x+Math.sin(t)*range;mesh.position.y=origin.y+Math.sin(t*1.8)*.45;mesh.position.z=origin.z+Math.cos(t*.7)*1.5;mesh.rotation.y=Math.cos(t)*.18;mesh.userData.tail.rotation.y=Math.sin(t*9)*.48;});bubbles.forEach(({mesh,speed,drift})=>{mesh.position.y+=speed*dt;mesh.position.x+=Math.sin(elapsed+drift)*dt*.12;if(mesh.position.y>13){mesh.position.y=-4;mesh.position.x=(Math.random()-.5)*40;}});jellyGroup.position.y=5+Math.sin(elapsed*1.2)*.5;jellyGroup.rotation.z=Math.sin(elapsed)*.08;beams.rotation.y=Math.sin(elapsed*.12)*.05;food.forEach((f,i)=>{f.life+=dt;f.mesh.position.y-=dt*.6;f.mesh.position.x+=Math.sin(f.life*3+i)*dt*.15;if(f.life>7){scene.remove(f.mesh);food.splice(i,1);}});}controls.update();renderer.render(scene,camera);}
const clock=new THREE.Clock();animate();
const resizeObserver=new ResizeObserver(()=>{const w=container.clientWidth,h=container.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));});resizeObserver.observe(container);
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loading-screen').classList.add('done'),450));
