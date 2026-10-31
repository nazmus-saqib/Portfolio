import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// The entire little world is built from geometry. It loads without model services,
// remote textures, or a second network request.
export function createWorld({ container, onSelect = () => {}, onReady = () => {}, reducedMotion = false, stations, onArrival = () => {} }) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
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
  canvas.setAttribute('aria-label', 'A three-dimensional journey through Saqib’s employers, in career order. Choose a company to visit its workplace.');
  canvas.style.cssText = 'display:block;width:100%;height:100%;outline-offset:-5px;touch-action:pan-y;';
  container.append(canvas);

  const camera = new THREE.OrthographicCamera(-8, 8, 6, -6, 0.1, 100);
  const cameraBase = new THREE.Vector3(13, 15, 18);
  camera.position.copy(cameraBase);
  const lookAt = new THREE.Vector3(0, 0.35, 0);
  camera.lookAt(lookAt);

  scene.add(new THREE.HemisphereLight(0xfffaf0, 0x839b9b, 2.8));
  const sunlight = new THREE.DirectionalLight(0xfff1d7, 4);
  sunlight.position.set(-5, 12, 9);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(1536, 1536);
  Object.assign(sunlight.shadow.camera, { left: -11, right: 11, top: 11, bottom: -11, near: 0.5, far: 38 });
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
  box(world, 13.9, 0.5, 11.7, 0, -0.1, 0, 'stone', 0.23);
  box(world, 13.55, 0.36, 11.35, 0, -0.44, 0, 'edge', 0.17);
  box(world, 13.05, 0.14, 10.85, 0, -0.66, 0, 'navy', 0.06);
  // A subtle radial grounding shadow also works when real-time shadows are off.
  const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = 128; shadowCanvas.height = 128;
  const sctx = shadowCanvas.getContext('2d');
  const gradient = sctx.createRadialGradient(64, 64, 12, 64, 64, 63);
  gradient.addColorStop(0, 'rgba(50,58,49,0.25)'); gradient.addColorStop(1, 'rgba(50,58,49,0)');
  sctx.fillStyle = gradient; sctx.fillRect(0, 0, 128, 128);
  const groundShadow = new THREE.Mesh(new THREE.PlaneGeometry(21, 18), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
  groundShadow.rotation.x = -Math.PI / 2; groundShadow.position.y = -1.3; scene.add(groundShadow);

  const defaultStations = [
    { company: 'WebNSofTech', label: 'WebNSofTech' },
    { company: 'Synesis IT', label: 'Synesis IT' },
    { company: 'iQuantile', label: 'iQuantile' },
    { company: 'iStoreiSend', label: 'iStoreiSend' },
    { company: 'Dynamic Infotech', label: 'Dynamic Infotech' },
    { company: 'UPS & Staples', label: 'UPS + Staples' },
    { company: 'Identify BDA', label: 'Identify BDA' },
  ];
  const companyStations = stations?.length ? stations : defaultStations;
  const stationData = companyStations.map((station, index) => {
    const angle = -Math.PI + index * Math.PI * 2 / companyStations.length;
    const x = Math.cos(angle), z = Math.sin(angle);
    return {
      name: station.label || station.company || defaultStations[index]?.company || `Company ${index + 1}`,
      company: station.company || station.label || defaultStations[index]?.company,
      position: [x * 5.05, 0, z * 4.05],
      stop: [x * 3.0, 0, z * 2.4],
      // The network workplace has a foreground technician; its label sits
      // below the tile so it does not cover him or the ladder.
      labelAnchor: new THREE.Vector3(x * 6.15, index === 4 ? -0.35 : 0.5, z * 5.0),
      color: ['terracotta', 'navy', 'sage', 'wood', 'gray', 'terracotta', 'moss'][index % 7],
    };
  });
  const stationGroups = [], hits = [], labels = [], markers = [];
  const targetMarkers = [];
  // A continuous inlaid path connects employers in chronological order.
  stationData.forEach((station, index) => {
    const next = stationData[(index + 1) % stationData.length];
    const a = new THREE.Vector3(station.stop[0], 0.17, station.stop[2]);
    const b = new THREE.Vector3(next.stop[0], 0.17, next.stop[2]);
    const middle = a.clone().add(b).multiplyScalar(0.5);
    const path = box(world, 0.64, 0.024, a.distanceTo(b), middle.x, middle.y, middle.z, 'wood', 0.035);
    path.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
    // Inlaid guide marks give the route a quiet sense of direction.
    const guide = box(world, 0.065, 0.012, 0.25, middle.x, 0.189, middle.z, 'paper', 0.012);
    guide.rotation.y = path.rotation.y;
  });
  box(world, 1.6, 0.035, 1.6, 0, 0.174, 0, 'chalk', 0.2).rotation.y = Math.PI / 4;
  cylinder(world, 0.39, 0.39, 0.018, 0, 0.207, 0, 'amber', 48);
  for (let i = 0; i < 4; i++) {
    const inset = box(world, 0.05, 0.015, 0.22, Math.sin(i * Math.PI / 2) * 0.57, 0.205, Math.cos(i * Math.PI / 2) * 0.57, 'navy', 0.01);
    inset.rotation.y = i * Math.PI / 2;
  }

  stationData.forEach((station, index) => {
    const group = new THREE.Group(); group.position.set(...station.position); group.scale.setScalar(0.78);
    world.add(group); stationGroups.push(group);
    const platform = box(group, 3.25, 0.15, 2.82, 0, 0.225, 0, 'chalk', 0.12);
    platform.userData.station = index; hits.push(platform);
    const hit = new THREE.Mesh(new THREE.BoxGeometry(3.3, 2.4, 2.9), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.y = 1.2; hit.userData.station = index; group.add(hit); hits.push(hit);
    const marker = cylinder(world, 0.29, 0.29, 0.035, station.stop[0], 0.198, station.stop[2], 'chalk', 32);
    const inner = cylinder(world, 0.105, 0.105, 0.04, station.stop[0], 0.218, station.stop[2], station.color, 24);
    markers.push(marker); targetMarkers.push(inner);
    const label = document.createElement('button');
    label.type = 'button'; label.className = 'world-label';
    const count = document.createElement('span'); count.textContent = String(index + 1).padStart(2, '0');
    label.append(count, document.createTextNode(` ${station.name}`));
    label.setAttribute('aria-label', `Visit company ${index + 1}: ${station.company}`);
    label.style.position = 'absolute'; label.style.zIndex = '2';
    label.style.transform = 'translate(-50%, -50%)';
    label.addEventListener('click', () => onSelect(index));
    container.append(label); labels.push(label);
  });

  // 01 — the design studio: a large blue pinboard, screen, desk and tiny sketches.
  {
    const group = stationGroups[1] || stationGroups[0];
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
    const group = stationGroups[3] || stationGroups[0];
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

  // 01 — graphic design: the foundation in visual communication.
  {
    const group = stationGroups[0];
    box(group, 2.4, 1.55, 0.14, 0, 1.23, -0.67, 'terracotta', 0.09);
    box(group, 2.1, 1.28, 0.03, 0, 1.24, -0.58, 'paper');
    sign(group, 'CREATE', 1.45, 0.27, 0, 1.72, -0.56, '#fff9ed', '#bb7459');
    [-0.65, 0, 0.65].forEach((x, i) => {
      box(group, 0.46, 0.66, 0.025, x, 1.14, -0.54, ['navy', 'sage', 'wood'][i], 0.03);
      cylinder(group, 0.12, 0.12, 0.015, x, 1.22, -0.52, 'paper', 20).rotation.x = Math.PI / 2;
    });
    box(group, 2.3, 0.12, 0.76, 0, 0.77, 0.35, 'wood');
    [-0.93, 0.93].forEach(x => box(group, 0.08, 0.48, 0.57, x, 0.49, 0.35, 'navy'));
    const sheet = box(group, 0.9, 0.024, 0.51, -0.2, 0.85, 0.3, 'paper'); sheet.rotation.y = -0.13;
    box(group, 0.24, 0.024, 0.32, -0.42, 0.87, 0.3, 'terracotta');
    cylinder(group, 0.1, 0.09, 0.24, 0.78, 0.94, 0.29, 'navy');
    [-0.035, 0.04].forEach((x, i) => cylinder(group, 0.015, 0.015, 0.33, 0.78 + x, 1.18, 0.29, i ? 'wood' : 'amber', 8));
    plant(group, -1.14, 0.91, 0.75);
  }

  // 03 — organization management: a small model of connected teams and systems.
  if (stationGroups[2]) {
    const group = stationGroups[2];
    box(group, 2.45, 1.68, 0.16, 0, 1.15, -0.67, 'sage', 0.1);
    box(group, 2.17, 1.37, 0.035, 0, 1.16, -0.57, 'chalk');
    sign(group, 'CONNECTED', 1.8, 0.24, 0, 1.73, -0.54, '#f5f1e5', '#526f5c');
    box(group, 0.53, 0.32, 0.04, 0, 1.43, -0.53, 'navy');
    [-0.67, 0, 0.67].forEach((x, i) => {
      lineBetween(group, [0, 1.25, -0.5], [x, 0.9, -0.5], 0.014, 'wood');
      box(group, 0.48, 0.32, 0.04, x, 0.89, -0.48, i === 1 ? 'terracotta' : 'paper');
    });
    box(group, 1.75, 0.11, 0.71, 0, 0.67, 0.56, 'navy');
    [-0.65, 0.65].forEach(x => box(group, 0.07, 0.37, 0.56, x, 0.45, 0.56, 'wood'));
    box(group, 0.9, 0.07, 0.5, 0, 0.77, 0.56, 'paper');
    plant(group, 1.05, 0.8, 0.8);
  }

  // 05 — network site work: desktop setup, live rack equipment and a service ladder.
  let updateNetworkTechnician = () => {};
  let networkWorkTime = 0;
  if (stationGroups[4]) {
    const group = stationGroups[4];
    group.name = 'dynamic-infotech-network-workplace';

    // The open-front rack makes switches, patch ports and server trays legible
    // at the normal campus camera distance.
    const rack = new THREE.Group(); rack.position.set(-0.82, 0, -0.62); group.add(rack);
    rack.name = 'network-server-rack';
    box(rack, 1.02, 0.13, 0.76, 0, 0.36, 0, 'navy');
    box(rack, 1.02, 0.12, 0.76, 0, 2.22, 0, 'navy');
    [-0.46, 0.46].forEach(x => {
      box(rack, 0.1, 1.87, 0.72, x, 1.29, 0, 'navy', 0.02);
      box(rack, 0.035, 1.75, 0.035, x, 1.28, 0.386, 'gray', 0.008);
    });
    box(rack, 0.84, 1.7, 0.045, 0, 1.28, -0.35, 'dark', 0.01);
    [0.66, 0.96, 1.26, 1.56].forEach((y, row) => {
      box(rack, 0.8, 0.22, 0.62, 0, y, 0.015, 'gray', 0.025);
      box(rack, 0.73, 0.16, 0.026, 0, y, 0.34, 'navy', 0.015);
      [-0.23, -0.13, -0.03, 0.07].forEach(x => box(rack, 0.055, 0.025, 0.012, x, y, 0.358, 'gray', 0.005));
      sphere(rack, 0.023, 0.25, y + 0.025, 0.365, row % 2 ? 'amber' : 'sage');
      sphere(rack, 0.016, 0.31, y + 0.025, 0.365, 'paper');
    });
    box(rack, 0.8, 0.23, 0.61, 0, 1.91, 0.01, 'paper', 0.025);
    [-0.28, -0.17, -0.06, 0.05, 0.16, 0.27].forEach(x => {
      box(rack, 0.065, 0.07, 0.025, x, 1.92, 0.33, 'navy', 0.008);
      box(rack, 0.04, 0.015, 0.015, x, 2, 0.35, 'sage', 0.004);
    });
    const cable = (points, shade, radius = 0.018) => {
      const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)));
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, radius, 6, false), materials[shade]);
      mesh.castShadow = true; group.add(mesh);
    };
    cable([[-1.1, 1.91, -0.27], [-1.1, 1.72, -0.13], [-0.64, 1.7, -0.11], [-0.64, 1.58, -0.26]], 'amber');
    cable([[-0.89, 1.91, -0.27], [-0.89, 1.62, -0.09], [-0.53, 1.55, -0.08], [-0.53, 1.26, -0.26]], 'sage');
    cable([[-0.52, 0.64, -0.27], [-0.33, 0.41, -0.14], [0.35, 0.32, -0.1], [1.15, 0.42, 0.19]], 'navy', 0.023);
    sign(rack, 'NETWORK', 0.83, 0.22, 0, 2.22, 0.392, '#263d48', '#fff9ed');

    // A light aluminium ladder leans beside the open rack, with seven distinct
    // rungs and rubber feet. It stays inside the original workplace footprint.
    const ladder = new THREE.Group(); ladder.position.set(0.03, 0, -0.08); group.add(ladder);
    ladder.name = 'server-service-ladder';
    [-0.23, 0.23].forEach(x => {
      lineBetween(ladder, [x, 0.34, 0.62], [x, 2.25, -0.28], 0.035, 'gray');
      box(ladder, 0.11, 0.09, 0.13, x, 0.345, 0.62, 'navy', 0.02);
    });
    for (let i = 0; i < 7; i++) {
      const amount = (i + 1) / 8;
      lineBetween(ladder, [-0.23, 0.34 + amount * 1.91, 0.62 - amount * 0.9], [0.23, 0.34 + amount * 1.91, 0.62 - amount * 0.9], 0.032, 'paper');
    }

    // A desktop computer, keyboard, tower and setup screen explain the other
    // half of the role without borrowing the laptop used by the UX workplaces.
    box(group, 1.05, 0.11, 0.73, 0.99, 0.99, 0.47, 'wood');
    [0.58, 1.39].forEach(x => box(group, 0.065, 0.62, 0.57, x, 0.62, 0.47, 'navy', 0.015));
    box(group, 0.78, 0.58, 0.075, 0.93, 1.43, 0.29, 'navy', 0.045);
    box(group, 0.67, 0.46, 0.018, 0.93, 1.44, 0.337, 'paper', 0.015);
    box(group, 0.07, 0.14, 0.07, 0.93, 1.09, 0.29, 'gray');
    box(group, 0.35, 0.025, 0.23, 0.93, 1.055, 0.33, 'navy');
    box(group, 0.54, 0.035, 0.21, 0.87, 1.065, 0.66, 'navy', 0.015);
    [-0.16, -0.05, 0.06, 0.17].forEach(x => box(group, 0.075, 0.012, 0.1, 0.87 + x, 1.089, 0.66, 'gray', 0.006));
    sphere(group, 0.07, 1.29, 1.085, 0.67, 'paper', [0.7, 0.36, 1]);
    box(group, 0.27, 0.55, 0.43, 1.27, 0.6, 0.44, 'gray', 0.035);
    box(group, 0.19, 0.43, 0.025, 1.27, 0.62, 0.67, 'navy', 0.015);
    sphere(group, 0.018, 1.27, 0.77, 0.691, 'sage');
    sign(group, 'SETUP', 0.53, 0.14, 0.93, 1.55, 0.351, '#fff9ed', '#526f5c');
    box(group, 0.5, 0.045, 0.015, 0.93, 1.4, 0.355, 'stone', 0.008);
    box(group, 0.37, 0.045, 0.018, 0.865, 1.4, 0.367, 'sage', 0.008);
    box(group, 0.32, 0.025, 0.012, 0.93, 1.3, 0.355, 'gray', 0.005);

    // The site technician alternates between the keyboard and a low ladder
    // rung to service the rack. His body is separate from the visiting avatar.
    const technician = new THREE.Group(); group.add(technician);
    technician.name = 'network-technician';
    const body = new THREE.Group(); technician.add(body);
    const legs = [-0.1, 0.1].map(x => {
      const leg = new THREE.Group(); leg.position.set(x, 0.5, 0); body.add(leg);
      box(leg, 0.15, 0.37, 0.17, 0, -0.19, 0, 'navy', 0.045);
      box(leg, 0.18, 0.1, 0.27, 0, -0.43, 0.045, 'dark', 0.035);
      return leg;
    });
    box(body, 0.42, 0.46, 0.26, 0, 0.75, 0, 'gray', 0.075);
    box(body, 0.42, 0.09, 0.27, 0, 0.59, 0, 'navy', 0.025);
    box(body, 0.075, 0.07, 0.024, -0.105, 0.83, 0.142, 'paper', 0.01);
    box(body, 0.055, 0.14, 0.055, 0.22, 0.57, 0.05, 'amber', 0.012);
    cylinder(body, 0.07, 0.075, 0.11, 0, 1.02, 0, 'skin');
    sphere(body, 0.215, 0, 1.19, 0, 'skin', [0.92, 1.05, 0.9]);
    sphere(body, 0.205, 0, 1.32, -0.015, 'dark', [0.99, 0.58, 0.97]);
    sphere(body, 0.055, 0, 1.17, 0.18, 'skin', [0.7, 0.8, 0.7]);
    [-0.07, 0.07].forEach(x => sphere(body, 0.019, x, 1.22, 0.183, 'dark', [1, 0.85, 0.5]));
    const arms = [-1, 1].map(side => {
      const arm = new THREE.Group(); arm.position.set(side * 0.25, 0.94, 0); body.add(arm);
      box(arm, 0.13, 0.25, 0.15, 0, -0.11, 0, 'gray', 0.05);
      const elbow = new THREE.Group(); elbow.position.y = -0.22; arm.add(elbow);
      box(elbow, 0.12, 0.22, 0.135, 0, -0.1, 0, 'skin', 0.04);
      sphere(elbow, 0.07, 0, -0.23, 0.01, 'skin', [0.9, 1, 0.8]);
      return { arm, elbow, side };
    });
    updateNetworkTechnician = time => {
      const phase = (time + 8) % 15;
      const toRack = phase < 5 ? 0 : phase < 7 ? (phase - 5) / 2 : phase < 12 ? 1 : (15 - phase) / 3;
      const blend = THREE.MathUtils.smoothstep(toRack, 0, 1);
      const walking = phase >= 5 && phase < 7 || phase >= 12;
      technician.position.set(0.82 - blend * 0.82, 0.305 + blend * 0.2, 1.06 - blend * 0.73);
      technician.rotation.y = Math.PI + blend * 0.59;
      body.rotation.x = -0.06 - blend * 0.08;
      legs.forEach((leg, index) => leg.rotation.x = walking ? Math.sin(time * 9 + index * Math.PI) * 0.23 : index ? blend * 0.32 : 0);
      arms.forEach(({ arm, elbow, side }, index) => {
        arm.rotation.x = -1.02 - blend * 0.37 + Math.sin(time * 4 + index) * 0.035;
        arm.rotation.z = side * (0.08 + blend * 0.14);
        elbow.rotation.x = -0.48 + Math.sin(time * 3.5 + index * 1.7) * 0.06;
      });
    };
    updateNetworkTechnician(0);
    box(group, 0.48, 0.22, 0.32, -1.02, 0.43, 0.87, 'terracotta', 0.04);
    lineBetween(group, [-1.19, 0.58, 0.87], [-0.85, 0.58, 0.87], 0.023, 'navy');
  }

  // 06 — customer service: a retail counter, parcel shelving, and point of sale.
  if (stationGroups[5]) {
    const group = stationGroups[5];
    box(group, 2.38, 1.48, 0.14, 0, 1.08, -0.76, 'chalk', 0.08);
    box(group, 2.63, 0.14, 0.66, 0, 1.91, -0.48, 'terracotta');
    [-0.9, -0.45, 0, 0.45, 0.9].forEach(x => box(group, 0.23, 0.04, 0.66, x, 2, -0.48, 'paper', 0.01));
    sign(group, 'CUSTOMER FIRST', 1.9, 0.25, 0, 1.53, -0.67, '#f5f1e5', '#263d48');
    box(group, 2.35, 0.8, 0.8, 0, 0.7, 0.52, 'wood', 0.08);
    box(group, 2.52, 0.1, 0.95, 0, 1.14, 0.52, 'navy', 0.05);
    const register = box(group, 0.53, 0.42, 0.06, 0.5, 1.45, 0.39, 'navy'); register.rotation.x = -0.15;
    box(group, 0.43, 0.3, 0.025, 0.5, 1.45, 0.43, 'sage');
    box(group, 0.4, 0.035, 0.28, 0.5, 1.22, 0.61, 'navy');
    [-0.78, -0.28].forEach((x, i) => {
      box(group, 0.39, 0.35, 0.34, x, 1.37, 0.46, i ? 'paper' : 'wood');
      box(group, 0.07, 0.36, 0.35, x, 1.37, 0.46, 'chalk', 0.005);
    });
    plant(group, 1.11, -0.53, 0.75);
  }

  // 04 — the coordinator's board. Dependencies, approvals, people, delivery.
  {
    const group = stationGroups[6] || stationGroups.at(-1);
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

  // Small landscape details connect the separate workplaces into one quiet campus.
  tree(world, -6, -3.7, 0.75);
  tree(world, 5.96, 3.9, 0.72, 'terracotta');
  tree(world, -5.9, 3.8, 0.64);
  tree(world, 5.85, -3.6, 0.68);
  for (const [x, z] of [[-1.6, -2.9], [2.55, 1.35]]) {
    cylinder(world, 0.045, 0.065, 1.25, x, 0.81, z, 'navy', 12);
    sphere(world, 0.13, x, 1.48, z, materials.white);
    cylinder(world, 0.19, 0.19, 0.06, x, 1.58, z, 'navy', 20);
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

  // Camera framing uses the complete miniature rather than four fixed corners.
  scene.updateMatrixWorld(true); camera.updateMatrixWorld(true);
  const modelBounds = new THREE.Box3().setFromObject(world);
  const frameExtent = new THREE.Vector2();
  for (const x of [modelBounds.min.x, modelBounds.max.x]) {
    for (const y of [modelBounds.min.y, modelBounds.max.y]) {
      for (const z of [modelBounds.min.z, modelBounds.max.z]) {
        const corner = new THREE.Vector3(x, y, z).applyMatrix4(camera.matrixWorldInverse);
        frameExtent.x = Math.max(frameExtent.x, Math.abs(corner.x));
        frameExtent.y = Math.max(frameExtent.y, Math.abs(corner.y));
      }
    }
  }
  function updateLabels() {
    stationData.forEach((station, index) => {
      projected.copy(station.labelAnchor); world.localToWorld(projected); projected.project(camera);
      const label = labels[index];
      const narrow = size.width < 480;
      // The company timeline supplies all seven choices on compact screens;
      // showing one world label keeps the small scene and character legible.
      label.style.visibility = narrow && index !== activeIndex ? 'hidden' : 'visible';
      const halfWidth = Math.min(narrow ? 73 : 85, 26 + station.name.length * 3);
      const left = THREE.MathUtils.clamp((projected.x * 0.5 + 0.5) * size.width, halfWidth + 8, size.width - halfWidth - 8);
      const top = THREE.MathUtils.clamp((-projected.y * 0.5 + 0.5) * size.height, 23, size.height - 24);
      label.style.left = `${left}px`; label.style.top = `${top}px`;
      label.classList.toggle('is-active', index === activeIndex);
      label.setAttribute('aria-pressed', String(index === activeIndex));
    });
  }
  function resize() {
    if (disposed) return;
    size = { width: Math.max(container.clientWidth, 1), height: Math.max(container.clientHeight, 1) };
    renderer.setSize(size.width, size.height, false);
    const aspect = size.width / size.height;
    const vertical = Math.max(frameExtent.y + 0.6, (frameExtent.x + 0.8) / aspect);
    camera.left = -vertical * aspect; camera.right = vertical * aspect;
    camera.top = vertical; camera.bottom = -vertical;
    camera.updateProjectionMatrix();
    updateLabels(); renderer.render(scene, camera);
  }
  const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(container);

  function updateCanvasDescription() {
    const controls = exploring
      ? 'Explore Saqib’s career world. Move using the arrow keys or W, A, S and D.'
      : 'A three-dimensional world of Saqib’s career. Choose a company button to move between workplaces.';
    const workplace = activeIndex === 4
      ? ' At Dynamic Infotech, a network technician sets up a desktop computer and services a server rack beside a ladder.'
      : '';
    canvas.setAttribute('aria-label', controls + workplace);
  }
  function select(index) {
    activeIndex = Math.max(0, Math.min(stationData.length - 1, Number(index) || 0));
    container.dataset.activeCompany = stationData[activeIndex].company;
    container.dataset.activeStation = String(activeIndex);
    updateCanvasDescription();
    labels.forEach((label, i) => label.classList.toggle('is-active', i === activeIndex));
    markers.forEach((marker, i) => marker.material = i === activeIndex ? materials.amber : materials.chalk);
    const destination = new THREE.Vector3(...stationData[activeIndex].stop); destination.y = 0.08;
    if (reducedMotion || paused) {
      person.position.copy(destination); walkPath = []; onArrival(activeIndex);
    } else {
      // Reach the nearest point on the ring, then follow its edges. Next-company
      // navigation walks forward in chronology instead of cutting through desks.
      let closest = 0, distance = Infinity;
      stationData.forEach((station, i) => {
        const d = Math.hypot(person.position.x - station.stop[0], person.position.z - station.stop[2]);
        if (d < distance) { distance = d; closest = i; }
      });
      walkPath = [];
      if (distance > 0.035) {
        const first = new THREE.Vector3(...stationData[closest].stop); first.y = 0.08;
        walkPath.push(first);
      }
      const forward = (activeIndex - closest + stationData.length) % stationData.length;
      const step = forward <= stationData.length / 2 ? 1 : -1;
      let cursor = closest;
      while (cursor !== activeIndex) {
        cursor = (cursor + step + stationData.length) % stationData.length;
        const next = new THREE.Vector3(...stationData[cursor].stop); next.y = 0.08;
        walkPath.push(next);
      }
    }
    container.dataset.traveling = String(walkPath.length > 0);
    if (!walkPath.length && !reducedMotion && !paused) onArrival(activeIndex);
    userMoved = false;
    updateLabels(); renderOnce();
  }
  function clampToCampus(vector) {
    const radius = Math.hypot(vector.x / 3.3, vector.z / 2.7);
    if (radius > 1) { vector.x /= radius; vector.z /= radius; }
    return vector;
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
    clampToCampus(destination);
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
    if ((reducedMotion || paused) && !event.repeat) move(keyDirections[event.key]);
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
        clampToCampus(person.position);
        desiredYaw = Math.atan2(moveVector.x, moveVector.z); walking = true;
      }
    } else if (!reducedMotion && walkPath.length) {
      moveVector.copy(walkPath[0]).sub(person.position); moveVector.y = 0;
      const distance = moveVector.length();
      if (distance < 0.04) {
        person.position.copy(walkPath.shift());
        if (!walkPath.length) { container.dataset.traveling = 'false'; if (!userMoved) onArrival(activeIndex); }
      }
      else {
        moveVector.normalize(); person.position.addScaledVector(moveVector, Math.min(distance, delta * 3.0));
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
    networkWorkTime += delta;
    updateNetworkTechnician(networkWorkTime);
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
      if (exploring) { walkPath = []; container.dataset.traveling = 'false'; }
      updateCanvasDescription();
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
