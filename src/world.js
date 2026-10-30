import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// The entire little world is built from geometry. It loads without model services,
// remote textures, or a second network request.
export function createWorld({ container, onSelect = () => {}, onReady = () => {}, reducedMotion = false }) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.className = 'world-canvas';
  canvas.tabIndex = 0;
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'A three-dimensional world of Saqib’s career: a design studio, a warehouse, a college, and a project workspace. Use the chapter buttons to visit each place.');
  canvas.style.cssText = 'display:block;width:100%;height:100%;outline-offset:-5px;touch-action:pan-y;';
  container.append(canvas);

  const camera = new THREE.OrthographicCamera(-8, 8, 6, -6, 0.1, 100);
  const cameraBase = new THREE.Vector3(12, 13, 16);
  camera.position.copy(cameraBase);
  const lookAt = new THREE.Vector3(0, 0.7, 0);
  camera.lookAt(lookAt);

  scene.add(new THREE.HemisphereLight(0xfffaf0, 0x839b9b, 2.8));
  const sunlight = new THREE.DirectionalLight(0xfff1d7, 4);
  sunlight.position.set(-5, 12, 9);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(2048, 2048);
  Object.assign(sunlight.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9, near: 0.5, far: 32 });
  sunlight.shadow.bias = -0.0005;
  sunlight.shadow.normalBias = 0.025;
  sunlight.shadow.radius = 4;
  scene.add(sunlight);
  const coolLight = new THREE.DirectionalLight(0xd6e7ff, 1.2);
  coolLight.position.set(8, 6, -8);
  scene.add(coolLight);

  const palette = {
    stone: 0xe4dfce, edge: 0xd1c8b5, chalk: 0xf5f1e5, navy: 0x263d48,
    sage: 0x8b9d87, moss: 0x526f5c, terracotta: 0xbb7459, amber: 0xe7ac50,
    paper: 0xfff9ed, gray: 0x7c8e92, dark: 0x222c2d, skin: 0xb87b52,
    wood: 0xc89e72, white: 0xfffdf8,
  };
  const materials = {};
  function material(color, extras = {}) {
    return new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0.02, ...extras });
  }
  for (const [name, color] of Object.entries(palette)) materials[name] = material(color);
  const geometries = new Map();
  function roundedGeometry(w, h, d, r = 0.05) {
    const key = [w, h, d, r].join(':');
    if (!geometries.has(key)) geometries.set(key, new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2)));
    return geometries.get(key);
  }
  function box(parent, w, h, d, x, y, z, mat = 'chalk', radius = 0.04) {
    const mesh = new THREE.Mesh(roundedGeometry(w, h, d, radius), typeof mat === 'string' ? materials[mat] : mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function cylinder(parent, rt, rb, height, x, y, z, mat = 'chalk', segments = 24) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, height, segments), typeof mat === 'string' ? materials[mat] : mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function sphere(parent, radius, x, y, z, mat = 'sage', scale = [1, 1, 1]) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 20, 14), typeof mat === 'string' ? materials[mat] : mat);
    mesh.position.set(x, y, z);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function lineBetween(parent, start, end, radius, mat = 'navy') {
    const a = new THREE.Vector3(...start), b = new THREE.Vector3(...end);
    const mesh = cylinder(parent, radius, radius, a.distanceTo(b), 0, 0, 0, mat, 12);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.sub(a).normalize());
    return mesh;
  }
  function signTexture(text, background = '#f5f1e5', color = '#263d48', width = 512, height = 160) {
    const element = document.createElement('canvas');
    element.width = width; element.height = height;
    const ctx = element.getContext('2d');
    ctx.fillStyle = background; ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = '600 48px sans-serif'; ctx.fillText(text, width / 2, height / 2);
    const texture = new THREE.CanvasTexture(element);
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.9 });
  }
  function sign(parent, text, w, h, x, y, z, bg, color) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), signTexture(text, bg, color));
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }
  function plant(parent, x, z, scale = 1) {
    const group = new THREE.Group(); group.position.set(x, 0.21, z); group.scale.setScalar(scale);
    parent.add(group);
    cylinder(group, 0.22, 0.15, 0.33, 0, 0.17, 0, 'terracotta');
    cylinder(group, 0.19, 0.19, 0.025, 0, 0.345, 0, 'edge');
    for (let i = 0; i < 5; i++) {
      const angle = i * Math.PI * 0.4;
      const leaf = sphere(group, 0.15, Math.sin(angle) * 0.12, 0.56 + (i % 2) * 0.1, Math.cos(angle) * 0.12, i % 2 ? 'moss' : 'sage', [0.55, 1.65, 0.6]);
      leaf.rotation.set(Math.sin(angle) * 0.5, 0, Math.cos(angle) * 0.5);
    }
    return group;
  }
  function tree(parent, x, z, scale = 1, color = 'sage') {
    const group = new THREE.Group(); group.position.set(x, 0.2, z); group.scale.setScalar(scale);
    parent.add(group);
    cylinder(group, 0.07, 0.1, 1.25, 0, 0.65, 0, 'wood');
    lineBetween(group, [0, 0.85, 0], [0.32, 1.3, 0.1], 0.04, 'wood');
    sphere(group, 0.51, 0, 1.52, 0, color, [1, 1.15, 0.9]);
    sphere(group, 0.39, 0.3, 1.6, 0.06, color);
    sphere(group, 0.38, -0.27, 1.48, 0.04, color);
    return group;
  }

  const world = new THREE.Group();
  world.position.y = -0.55;
  scene.add(world);
  // A floating architectural model, with a softly bevelled edge and recessed base.
  box(world, 10.8, 0.5, 8.5, 0, -0.1, 0, 'stone', 0.23);
  box(world, 10.45, 0.36, 8.15, 0, -0.44, 0, 'edge', 0.17);
  box(world, 9.95, 0.14, 7.65, 0, -0.66, 0, 'navy', 0.06);
  // A subtle radial grounding shadow also works when real-time shadows are off.
  const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = 128; shadowCanvas.height = 128;
  const sctx = shadowCanvas.getContext('2d');
  const gradient = sctx.createRadialGradient(64, 64, 12, 64, 64, 63);
  gradient.addColorStop(0, 'rgba(50,58,49,0.25)'); gradient.addColorStop(1, 'rgba(50,58,49,0)');
  sctx.fillStyle = gradient; sctx.fillRect(0, 0, 128, 128);
  const groundShadow = new THREE.Mesh(new THREE.PlaneGeometry(17, 13), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
  groundShadow.rotation.x = -Math.PI / 2; groundShadow.position.y = -1.3; scene.add(groundShadow);

  const stationData = [
    { name: 'Design', position: [-2.85, 0, -2.08], stop: [-1.35, 0, -1.22], color: 'navy' },
    { name: 'Systems', position: [2.85, 0, -2.08], stop: [1.4, 0, -1.2], color: 'terracotta' },
    { name: 'Growth', position: [2.85, 0, 2.15], stop: [1.35, 0, 1.25], color: 'sage' },
    { name: 'Delivery', position: [-2.85, 0, 2.15], stop: [-1.4, 0, 1.3], color: 'amber' },
  ];
  const stationGroups = [], hits = [], labels = [], markers = [];
  const targetMarkers = [];
  // Walkable amber inlay connects the four points around a small central plaza.
  box(world, 3.85, 0.025, 0.76, 0, 0.164, -1.2, 'wood', 0.035);
  box(world, 3.85, 0.025, 0.76, 0, 0.164, 1.25, 'wood', 0.035);
  box(world, 0.76, 0.025, 2.8, -1.38, 0.164, 0, 'wood', 0.035);
  box(world, 0.76, 0.025, 2.8, 1.38, 0.164, 0, 'wood', 0.035);
  box(world, 1.3, 0.045, 1.3, 0, 0.17, 0, 'chalk', 0.15).rotation.y = Math.PI / 4;
  cylinder(world, 0.32, 0.32, 0.018, 0, 0.205, 0, 'amber', 48);
  for (let i = 0; i < 4; i++) {
    const inset = box(world, 0.05, 0.015, 0.2, Math.sin(i * Math.PI / 2) * 0.48, 0.205, Math.cos(i * Math.PI / 2) * 0.48, 'navy', 0.01);
    inset.rotation.y = i * Math.PI / 2;
  }

  stationData.forEach((station, index) => {
    const group = new THREE.Group(); group.position.set(...station.position); world.add(group); stationGroups.push(group);
    const platform = box(group, 3.25, 0.15, 2.82, 0, 0.225, 0, 'chalk', 0.12);
    platform.userData.station = index; hits.push(platform);
    const hit = new THREE.Mesh(new THREE.BoxGeometry(3.3, 2.4, 2.9), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.y = 1.2; hit.userData.station = index; group.add(hit); hits.push(hit);
    const marker = cylinder(world, 0.29, 0.29, 0.035, station.stop[0], 0.198, station.stop[2], 'chalk', 48);
    const inner = cylinder(world, 0.105, 0.105, 0.04, station.stop[0], 0.218, station.stop[2], station.color, 32);
    markers.push(marker); targetMarkers.push(inner);
    const label = document.createElement('button');
    label.type = 'button'; label.className = 'world-label';
    label.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span> ${station.name}`;
    label.setAttribute('aria-label', `Visit chapter ${index + 1}: ${station.name}`);
    label.style.position = 'absolute'; label.style.zIndex = '2';
    label.style.transform = 'translate(-50%, -50%)';
    label.addEventListener('click', () => onSelect(index));
    container.append(label); labels.push(label);
  });

  // 01 — the design studio: a large blue pinboard, screen, desk and tiny sketches.
  {
    const group = stationGroups[0];
    box(group, 2.65, 1.92, 0.16, 0, 1.25, -0.97, 'navy', 0.09);
    box(group, 2.2, 1.35, 0.045, 0, 1.34, -0.87, 'sage', 0.04);
    sign(group, 'STUDIO', 1.06, 0.3, 0, 2, -0.872, '#8b9d87', '#fff9ed');
    [-0.68, 0, 0.68].forEach((x, i) => {
      const sheet = box(group, 0.46, 0.66, 0.025, x, 1.34, -0.83, i === 1 ? 'paper' : 'chalk', 0.015);
      sheet.rotation.z = (i - 1) * 0.04;
      box(group, 0.3, 0.05, 0.02, x, 1.5, -0.81, i === 1 ? 'terracotta' : 'navy', 0.007);
      box(group, 0.28, 0.21, 0.02, x, 1.3, -0.81, i === 1 ? 'sage' : 'edge', 0.01);
    });
    box(group, 2.45, 0.12, 0.86, 0, 0.92, 0.05, 'wood', 0.05);
    [-0.95, 0.95].forEach(x => box(group, 0.08, 0.6, 0.65, x, 0.6, 0.05, 'navy'));
    box(group, 0.85, 0.6, 0.07, 0.25, 1.3, -0.15, 'navy');
    box(group, 0.74, 0.47, 0.018, 0.25, 1.31, -0.102, 'paper', 0.015);
    box(group, 0.14, 0.11, 0.02, 0.03, 1.4, -0.087, 'terracotta', 0.01);
    box(group, 0.3, 0.035, 0.02, 0.32, 1.4, -0.087, 'sage', 0.005);
    box(group, 0.5, 0.2, 0.02, 0.25, 1.2, -0.087, 'edge', 0.01);
    box(group, 0.06, 0.21, 0.06, 0.25, 1.03, -0.15, 'navy');
    box(group, 0.36, 0.035, 0.24, 0.25, 1, -0.1, 'navy', 0.02);
    box(group, 0.55, 0.025, 0.21, 0.25, 1, 0.29, 'paper', 0.015);
    cylinder(group, 0.095, 0.075, 0.18, -0.8, 1.08, 0.08, 'terracotta');
    plant(group, 1.2, 0.94, 0.9);
    const chair = new THREE.Group(); chair.position.set(-0.55, 0, 0.73); group.add(chair);
    box(chair, 0.5, 0.1, 0.5, 0, 0.64, 0, 'terracotta', 0.07);
    box(chair, 0.5, 0.52, 0.08, 0, 0.88, 0.23, 'terracotta', 0.06);
    cylinder(chair, 0.04, 0.04, 0.3, 0, 0.43, 0, 'navy');
    box(chair, 0.55, 0.05, 0.4, 0, 0.29, 0, 'navy');
  }

  // 02 — the fulfillment space: a rack, real little parcels and a loading cart.
  {
    const group = stationGroups[1];
    [-1.1, 1.05].forEach(x => [-0.76, -0.16].forEach(z => box(group, 0.09, 1.72, 0.09, x, 1.15, z, 'navy', 0.015)));
    [0.46, 1.04, 1.64].forEach(y => box(group, 2.35, 0.07, 0.83, -0.02, y, -0.46, 'navy', 0.015));
    const parcel = (x, y, z, size = 0.42, shade = 'wood') => {
      box(group, size, size * 0.83, size * 0.92, x, y, z, shade, 0.025);
      box(group, 0.09, size * 0.83 + 0.004, size * 0.92 + 0.006, x, y, z, 'paper', 0.005);
      box(group, 0.18, 0.1, 0.01, x + 0.07, y - 0.02, z + size * 0.46 + 0.007, 'chalk', 0.003);
    };
    parcel(-0.7, 0.68, -0.44); parcel(-0.09, 0.71, -0.44, 0.5); parcel(0.65, 0.66, -0.44, 0.37);
    parcel(-0.65, 1.29, -0.44, 0.5, 'terracotta'); parcel(0.1, 1.27, -0.44, 0.47); parcel(0.71, 1.27, -0.44, 0.43);
    parcel(-0.72, 1.88, -0.44, 0.44); parcel(-0.08, 1.9, -0.44, 0.5);
    sign(group, 'FULFILLMENT', 1.8, 0.3, -0.02, 2.24, -0.12, '#f5f1e5', '#263d48');
    box(group, 0.9, 0.12, 0.65, 0.32, 0.49, 0.81, 'amber', 0.04);
    [-0.03, 0.67].forEach(x => [0.58, 1.05].forEach(z => {
      const wheel = cylinder(group, 0.1, 0.1, 0.07, x, 0.35, z, 'navy', 16); wheel.rotation.z = Math.PI / 2;
    }));
    lineBetween(group, [0.8, 0.5, 0.56], [0.8, 1.05, 0.56], 0.035, 'navy');
    lineBetween(group, [0.8, 0.5, 1.04], [0.8, 1.05, 1.04], 0.035, 'navy');
    lineBetween(group, [0.8, 1.05, 0.56], [0.8, 1.05, 1.04], 0.04, 'navy');
    parcel(0.22, 0.79, 0.81, 0.55); plant(group, -1.18, 0.95, 0.8);
  }

  // 03 — study in Canada, told through a small architectural arch and open book.
  {
    const group = stationGroups[2];
    box(group, 1.95, 1.78, 0.4, -0.3, 1.19, -0.6, 'sage', 0.12);
    const archShape = new THREE.Shape();
    const r = 0.57;
    archShape.moveTo(-r, 0); archShape.lineTo(r, 0); archShape.lineTo(r, 0.91);
    archShape.absarc(0, 0.91, r, 0, Math.PI, false); archShape.lineTo(-r, 0);
    const arch = new THREE.Mesh(new THREE.ShapeGeometry(archShape, 32), materials.navy);
    arch.position.set(-0.3, 0.32, -0.385); group.add(arch);
    box(group, 0.04, 1.1, 0.025, -0.3, 0.99, -0.36, 'wood', 0.007);
    box(group, 0.98, 0.04, 0.025, -0.3, 1.2, -0.36, 'wood', 0.007);
    sign(group, 'KEEP LEARNING', 1.7, 0.26, -0.3, 2.22, -0.365, '#f5f1e5', '#526f5c');
    box(group, 1.58, 0.1, 0.5, -0.3, 0.36, -0.2, 'edge');
    box(group, 1.84, 0.07, 0.55, -0.3, 0.3, 0.06, 'stone');
    box(group, 1.1, 0.17, 0.62, -0.5, 0.45, 0.9, 'terracotta');
    box(group, 0.97, 0.14, 0.63, -0.47, 0.6, 0.9, 'navy');
    box(group, 1.05, 0.1, 0.62, -0.53, 0.73, 0.92, 'paper');
    // Two turned pages make the open book read clearly from the isometric camera.
    const pageL = box(group, 0.43, 0.035, 0.5, -0.78, 0.82, 0.9, 'paper', 0.015); pageL.rotation.z = -0.14;
    const pageR = box(group, 0.43, 0.035, 0.5, -0.34, 0.82, 0.9, 'paper', 0.015); pageR.rotation.z = 0.14;
    tree(group, 1.03, 0.4, 0.85, 'terracotta');
    cylinder(group, 0.45, 0.4, 0.12, 1.03, 0.36, 0.4, 'edge');
  }

  // 04 — the coordinator's board. Dependencies, approvals, people, delivery.
  {
    const group = stationGroups[3];
    box(group, 2.4, 1.55, 0.12, -0.05, 1.38, -0.7, 'wood', 0.05);
    box(group, 2.2, 1.35, 0.035, -0.05, 1.38, -0.615, 'paper', 0.025);
    sign(group, 'MAKE IT HAPPEN', 1.75, 0.23, -0.05, 1.89, -0.59, '#fff9ed', '#263d48');
    for (let i = 0; i < 3; i++) {
      const x = -0.76 + i * 0.71;
      box(group, 0.5, 0.045, 0.018, x, 1.65, -0.59, i === 2 ? 'sage' : 'terracotta', 0.01);
      for (let j = 0; j < 2 + (i % 2); j++) {
        box(group, 0.47, 0.2, 0.02, x, 1.43 - j * 0.24, -0.59, j === 0 ? 'stone' : 'chalk', 0.015);
        box(group, 0.27, 0.025, 0.01, x, 1.47 - j * 0.24, -0.572, 'gray', 0.005);
      }
    }
    [-0.96, 0.87].forEach(x => box(group, 0.06, 0.5, 0.07, x, 0.56, -0.7, 'navy', 0.015));
    box(group, 1.8, 0.1, 0.78, -0.15, 0.91, 0.53, 'navy', 0.05);
    [-0.85, 0.55].forEach(x => box(group, 0.07, 0.58, 0.64, x, 0.58, 0.53, 'wood', 0.02));
    const laptop = box(group, 0.65, 0.44, 0.045, -0.36, 1.21, 0.43, 'sage'); laptop.rotation.x = -0.1;
    box(group, 0.66, 0.03, 0.4, -0.36, 0.99, 0.59, 'sage', 0.015);
    box(group, 0.43, 0.02, 0.35, 0.35, 0.99, 0.59, 'paper', 0.01).rotation.y = -0.15;
    cylinder(group, 0.09, 0.07, 0.17, 0.42, 1.07, 0.34, 'terracotta');
    plant(group, 1.17, 0.7, 0.85);
  }

  // Small landscape details turn four plinths into one coherent place.
  tree(world, -4.65, -0.15, 0.85);
  tree(world, 4.62, -0.3, 0.65);
  box(world, 0.55, 0.12, 0.9, -4.55, 0.21, 2.6, 'wood', 0.03);
  box(world, 0.55, 0.12, 0.9, 4.6, 0.21, -2.4, 'sage', 0.03);
  for (const [x, z] of [[0, -3.7], [0, 3.7]]) {
    cylinder(world, 0.06, 0.08, 1.4, x, 0.86, z, 'navy', 16);
    sphere(world, 0.16, x, 1.58, z, materials.white);
    cylinder(world, 0.23, 0.23, 0.07, x, 1.7, z, 'navy', 24);
  }

  // A small, deliberately stylized portrait: dark hair, beard and a navy jacket.
  const person = new THREE.Group(); world.add(person);
  const personBody = new THREE.Group(); person.add(personBody);
  const darkHair = material(0x20211f);
  const trouser = material(0x394442);
  const leftLeg = new THREE.Group(), rightLeg = new THREE.Group();
  leftLeg.position.set(-0.13, 0.68, 0); rightLeg.position.set(0.13, 0.68, 0);
  personBody.add(leftLeg, rightLeg);
  for (const leg of [leftLeg, rightLeg]) {
    box(leg, 0.19, 0.47, 0.21, 0, -0.24, 0, trouser, 0.055);
    box(leg, 0.22, 0.13, 0.35, 0, -0.51, 0.05, 'dark', 0.055);
    box(leg, 0.22, 0.035, 0.35, 0, -0.565, 0.05, 'paper', 0.02);
  }
  box(personBody, 0.51, 0.58, 0.3, 0, 0.94, 0, 'navy', 0.1);
  box(personBody, 0.14, 0.4, 0.025, 0, 1.01, 0.16, 'paper', 0.015);
  const lapelL = box(personBody, 0.11, 0.35, 0.025, -0.115, 1.07, 0.175, 'navy', 0.02); lapelL.rotation.z = -0.24;
  const lapelR = box(personBody, 0.11, 0.35, 0.025, 0.115, 1.07, 0.175, 'navy', 0.02); lapelR.rotation.z = 0.24;
  cylinder(personBody, 0.09, 0.1, 0.15, 0, 1.29, 0, 'skin');
  const leftArm = new THREE.Group(), rightArm = new THREE.Group();
  leftArm.position.set(-0.32, 1.17, 0); rightArm.position.set(0.32, 1.17, 0); personBody.add(leftArm, rightArm);
  for (const [arm, side] of [[leftArm, -1], [rightArm, 1]]) {
    box(arm, 0.16, 0.43, 0.19, 0, -0.19, 0, 'navy', 0.065);
    sphere(arm, 0.095, 0, -0.44, 0.015, 'skin', [0.85, 1.1, 0.8]);
    arm.rotation.z = -side * 0.08;
  }
  sphere(personBody, 0.275, 0, 1.52, 0, 'skin', [0.9, 1.06, 0.85]);
  sphere(personBody, 0.265, 0, 1.69, -0.025, darkHair, [0.95, 0.65, 0.92]);
  sphere(personBody, 0.18, 0.07, 1.78, 0.045, darkHair, [1.25, 0.67, 0.85]);
  sphere(personBody, 0.16, -0.11, 1.73, 0.015, darkHair, [0.8, 0.6, 0.85]);
  // Lower-face beard follows the head, instead of a flat floating block.
  sphere(personBody, 0.21, 0, 1.4, 0.075, darkHair, [0.95, 0.65, 0.91]);
  sphere(personBody, 0.08, 0, 1.48, 0.208, 'skin', [0.75, 0.8, 0.7]);
  [-0.095, 0.095].forEach(x => {
    sphere(personBody, 0.028, x, 1.56, 0.215, 'dark', [1, 0.9, 0.55]);
    const brow = box(personBody, 0.07, 0.025, 0.025, x, 1.62, 0.215, darkHair, 0.01);
    brow.rotation.z = x > 0 ? 0.06 : -0.06;
  });
  // The warm location halo stays under the person as he walks.
  const halo = new THREE.Mesh(new THREE.RingGeometry(0.35, 0.39, 48), new THREE.MeshBasicMaterial({ color: palette.amber, transparent: true, opacity: 0.72, side: THREE.DoubleSide, depthWrite: false }));
  halo.rotation.x = -Math.PI / 2; halo.position.y = 0.194; world.add(halo);
  person.position.set(...stationData[0].stop);
  // Person local feet end at 0.115; the platform's walking surface is 0.185.
  person.position.y = 0.08;
  person.rotation.y = 0.45;

  const clock = new THREE.Clock();
  let frame, disposed = false, paused = false, exploring = false, activeIndex = 0;
  let desiredYaw = 0.45, walkPhase = 0, walkPath = [], pointer = new THREE.Vector2();
  const heldKeys = new Set();
  const moveVector = new THREE.Vector3();
  const projected = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  let lastAutoSelect = 0;
  let userMoved = false;
  let size = { width: 1, height: 1 };

  function updateLabels() {
    stationGroups.forEach((group, index) => {
      projected.set(0, 0.45, index < 2 ? -1.65 : 1.64); group.localToWorld(projected); projected.project(camera);
      labels[index].style.left = `${(projected.x * 0.5 + 0.5) * size.width}px`;
      labels[index].style.top = `${(-projected.y * 0.5 + 0.5) * size.height}px`;
      labels[index].classList.toggle('is-active', index === activeIndex);
      labels[index].setAttribute('aria-pressed', String(index === activeIndex));
    });
  }
  function resize() {
    if (disposed) return;
    size = { width: Math.max(container.clientWidth, 1), height: Math.max(container.clientHeight, 1) };
    renderer.setSize(size.width, size.height, false);
    const aspect = size.width / size.height;
    const vertical = Math.max(5.1, 7.4 / aspect);
    camera.left = -vertical * aspect; camera.right = vertical * aspect;
    camera.top = vertical; camera.bottom = -vertical;
    camera.updateProjectionMatrix();
    updateLabels(); renderer.render(scene, camera);
  }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(container);

  function select(index) {
    activeIndex = Math.max(0, Math.min(3, Number(index) || 0));
    labels.forEach((label, i) => label.classList.toggle('is-active', i === activeIndex));
    markers.forEach((marker, i) => marker.material = i === activeIndex ? materials.amber : materials.chalk);
    const destination = new THREE.Vector3(...stationData[activeIndex].stop); destination.y = 0.08;
    if (reducedMotion || paused) {
      person.position.copy(destination); walkPath = [];
    } else {
      // Route around the central square instead of through furniture.
      const start = person.position;
      const corner = new THREE.Vector3(destination.x, 0.08, start.z);
      walkPath = [];
      if (start.distanceTo(corner) > 0.05) walkPath.push(corner);
      if ((walkPath.at(-1) || start).distanceTo(destination) > 0.05) walkPath.push(destination);
    }
    userMoved = false;
    updateLabels(); renderOnce();
  }
  function directionVector(direction) {
    // Screen-relative directions on an isometric ground plane.
    switch (direction) {
      case 'up': return new THREE.Vector3(-1, 0, -1).normalize();
      case 'down': return new THREE.Vector3(1, 0, 1).normalize();
      case 'left': return new THREE.Vector3(-1, 0, 1).normalize();
      case 'right': return new THREE.Vector3(1, 0, -1).normalize();
      default: return new THREE.Vector3();
    }
  }
  function move(direction) {
    const vector = directionVector(direction);
    const destination = person.position.clone().addScaledVector(vector, 0.62);
    destination.x = THREE.MathUtils.clamp(destination.x, -1.62, 1.62);
    destination.z = THREE.MathUtils.clamp(destination.z, -1.55, 1.55);
    walkPath = [destination]; userMoved = true;
    if (reducedMotion || paused) { person.position.copy(destination); walkPath = []; checkStation(); }
    renderOnce();
  }
  function checkStation() {
    if (!userMoved) return;
    const now = performance.now();
    stationData.forEach((station, i) => {
      const distance = Math.hypot(person.position.x - station.stop[0], person.position.z - station.stop[2]);
      if (i !== activeIndex && distance < 0.45 && now - lastAutoSelect > 900) {
        lastAutoSelect = now; activeIndex = i; onSelect(i);
      }
    });
  }
  const keyDirections = { ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down', ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' };
  function onKeyDown(event) {
    if (!exploring || document.activeElement !== canvas || !keyDirections[event.key]) return;
    event.preventDefault(); heldKeys.add(event.key); walkPath = []; userMoved = true;
    if (reducedMotion && !event.repeat) move(keyDirections[event.key]);
  }
  function onKeyUp(event) { heldKeys.delete(event.key); }
  function clearKeys() { heldKeys.clear(); }
  function onPointerMove(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width - 0.5) * 2, ((event.clientY - rect.top) / rect.height - 0.5) * 2);
    const normalized = new THREE.Vector2(pointer.x, -pointer.y);
    raycaster.setFromCamera(normalized, camera);
    canvas.style.cursor = raycaster.intersectObjects(hits, false).length ? 'pointer' : (exploring ? 'crosshair' : 'default');
  }
  let pointerStart;
  function onPointerDown(event) { pointerStart = [event.clientX, event.clientY]; }
  function onPointerUp(event) {
    if (!pointerStart || Math.hypot(event.clientX - pointerStart[0], event.clientY - pointerStart[1]) > 10) return;
    const rect = canvas.getBoundingClientRect();
    raycaster.setFromCamera(new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), camera);
    const intersections = raycaster.intersectObjects(hits, false);
    if (intersections.length) onSelect(intersections[0].object.userData.station);
    if (exploring) canvas.focus({ preventScroll: true });
  }
  function onPointerLeave() { pointer.set(0, 0); }
  canvas.addEventListener('keydown', onKeyDown); window.addEventListener('keyup', onKeyUp);
  canvas.addEventListener('blur', clearKeys); window.addEventListener('blur', clearKeys);
  canvas.addEventListener('pointermove', onPointerMove); canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('pointerdown', onPointerDown); canvas.addEventListener('pointerup', onPointerUp);

  function renderOnce() {
    if (disposed) return;
    halo.position.x = person.position.x; halo.position.z = person.position.z;
    updateLabels(); renderer.render(scene, camera);
  }
  function animate() {
    if (disposed) return;
    frame = undefined;
    // Still modes render in response to navigation and resize; no idle animation
    // loop is necessary while the visitor reads or requests reduced motion.
    if (paused || reducedMotion) return;
    frame = requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.05);
    let walking = false;
    if (!reducedMotion && exploring && heldKeys.size) {
      moveVector.set(0, 0, 0);
      for (const key of heldKeys) moveVector.add(directionVector(keyDirections[key]));
      if (moveVector.lengthSq()) {
        moveVector.normalize(); person.position.addScaledVector(moveVector, delta * 1.65);
        person.position.x = THREE.MathUtils.clamp(person.position.x, -1.62, 1.62);
        person.position.z = THREE.MathUtils.clamp(person.position.z, -1.55, 1.55);
        desiredYaw = Math.atan2(moveVector.x, moveVector.z); walking = true;
      }
    } else if (!reducedMotion && walkPath.length) {
      moveVector.copy(walkPath[0]).sub(person.position); moveVector.y = 0;
      const distance = moveVector.length();
      if (distance < 0.04) { person.position.copy(walkPath.shift()); }
      else {
        moveVector.normalize(); person.position.addScaledVector(moveVector, Math.min(distance, delta * 2.05));
        desiredYaw = Math.atan2(moveVector.x, moveVector.z); walking = true;
      }
    }
    if (!reducedMotion) {
      const angleDelta = Math.atan2(Math.sin(desiredYaw - person.rotation.y), Math.cos(desiredYaw - person.rotation.y));
      person.rotation.y += angleDelta * Math.min(1, delta * 10);
      if (walking) walkPhase += delta * 10;
      const stride = walking ? Math.sin(walkPhase) * 0.4 : 0;
      leftLeg.rotation.x = THREE.MathUtils.lerp(leftLeg.rotation.x, stride, 0.3);
      rightLeg.rotation.x = THREE.MathUtils.lerp(rightLeg.rotation.x, -stride, 0.3);
      leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, -stride * 0.8, 0.3);
      rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, stride * 0.8, 0.3);
      personBody.position.y = walking ? Math.abs(Math.sin(walkPhase)) * 0.035 : Math.sin(clock.elapsedTime * 1.7) * 0.006;
      const camTarget = cameraBase.clone().add(new THREE.Vector3(pointer.x * 0.12, -pointer.y * 0.05, -pointer.x * 0.1));
      camera.position.lerp(camTarget, 0.025); camera.lookAt(lookAt);
      targetMarkers.forEach((marker, index) => {
        const scale = index === activeIndex ? 1 + Math.sin(clock.elapsedTime * 2.5) * 0.07 : 1;
        marker.scale.set(scale, 1, scale);
      });
    }
    checkStation(); renderOnce();
  }
  resize(); select(0); animate(); onReady();

  return {
    goTo: select,
    setPaused(value) {
      paused = !!value;
      if (paused) {
        clearKeys();
        cancelAnimationFrame(frame);
        frame = undefined;
      } else if (!reducedMotion && frame === undefined) {
        clock.getDelta();
        animate();
      }
      renderOnce();
    },
    setExploring(value) {
      exploring = !!value; clearKeys();
      canvas.setAttribute('aria-label', exploring ? 'Explore Saqib’s career world. Move using the arrow keys or W, A, S and D. Visit the four stations to discover each chapter.' : 'A three-dimensional world of Saqib’s career. Choose a chapter button to move between stations.');
      if (exploring) canvas.focus({ preventScroll: true });
    },
    move,
    dispose() {
      disposed = true; cancelAnimationFrame(frame); resizeObserver.disconnect();
      window.removeEventListener('keyup', onKeyUp); window.removeEventListener('blur', clearKeys);
      canvas.removeEventListener('keydown', onKeyDown); canvas.removeEventListener('blur', clearKeys);
      canvas.removeEventListener('pointermove', onPointerMove); canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown); canvas.removeEventListener('pointerup', onPointerUp);
      const geometrySet = new Set(), materialSet = new Set(), textureSet = new Set();
      scene.traverse(object => {
        if (object.geometry) geometrySet.add(object.geometry);
        if (object.material) for (const mat of (Array.isArray(object.material) ? object.material : [object.material])) {
          materialSet.add(mat); if (mat.map) textureSet.add(mat.map);
        }
      });
      geometrySet.forEach(item => item.dispose()); textureSet.forEach(item => item.dispose()); materialSet.forEach(item => item.dispose());
      renderer.dispose(); labels.forEach(label => label.remove()); canvas.remove();
    },
  };
}
