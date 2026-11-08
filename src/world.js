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

  scene.add(new THREE.HemisphereLight(0xffffff, 0xe5e9ef, 2.8));
  const sunlight = new THREE.DirectionalLight(0xffffff, 4);
  sunlight.position.set(-5, 12, 9);
  sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(1536, 1536);
  Object.assign(sunlight.shadow.camera, { left: -11, right: 11, top: 11, bottom: -11, near: 0.5, far: 38 });
  sunlight.shadow.bias = -0.0005;
  sunlight.shadow.normalBias = 0.025;
  sunlight.shadow.radius = 4;
  scene.add(sunlight);
  const coolLight = new THREE.DirectionalLight(0xf3f6ff, 1.2);
  coolLight.position.set(8, 6, -8);
  scene.add(coolLight);

  const palette = {
    stone: 0xffffff, edge: 0xe8ebef, chalk: 0xffffff, navy: 0x24334d,
    sage: 0xb9c8b5, moss: 0x7b9474, terracotta: 0xd69c7a, amber: 0x3457d5,
    paper: 0xffffff, gray: 0x8694a7, dark: 0x222c2d, skin: 0xb87b52,
    wood: 0xe5c79e, white: 0xffffff,
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
  function signTexture(text, background = '#ffffff', color = '#24334d', width = 512, height = 160) {
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
  gradient.addColorStop(0, 'rgba(36,51,77,0.08)'); gradient.addColorStop(1, 'rgba(36,51,77,0)');
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
      // Keep the automated fulfillment and network labels below their equipment displays.
      labelAnchor: new THREE.Vector3(x * 6.15, index === 3 ? -0.75 : index === 4 ? -0.35 : 0.5, z * 5.0),
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
  const introductionPlaza = box(world, 1.6, 0.035, 1.6, 0, 0.174, 0, 'chalk', 0.2);
  introductionPlaza.rotation.y = Math.PI / 4;
  introductionPlaza.userData.station = -1;
  hits.push(introductionPlaza);
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

  // 01 — the design studio: a large navy pinboard, screen, desk and tiny sketches.
  {
    const group = stationGroups[1] || stationGroups[0];
    box(group, 2.65, 1.92, 0.16, 0, 1.25, -0.97, 'navy', 0.09);
    box(group, 2.2, 1.35, 0.045, 0, 1.34, -0.87, 'sage', 0.04);
    sign(group, 'STUDIO', 1.06, 0.3, 0, 2, -0.872, '#3457d5', '#ffffff');
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

  // 04 — an illustrative automated fulfillment cell: robot, conveyor and scanner.
  let fulfillmentTime = 0;
  let updateFulfillment = () => {};
  {
    const group = stationGroups[3] || stationGroups[0];
    group.name = 'automated-fulfillment-cell';
    const alloy = material(0xe9edf4, { metalness: 0.32, roughness: 0.42 });
    const cyan = material(0xb7c6fa, { emissive: 0x3457d5, emissiveIntensity: 0.45, roughness: 0.35 });
    const graphite = material(0x243b6b, { metalness: 0.35, roughness: 0.48 });
    const parcel = (parent, x, y, z, size = 0.34) => {
      const item = new THREE.Group(); item.position.set(x, y, z); parent.add(item);
      box(item, size, size * 0.8, size * 0.86, 0, 0, 0, 'wood', 0.025);
      box(item, 0.065, size * 0.8 + 0.006, size * 0.86 + 0.006, 0, 0, 0, 'paper', 0.005);
      box(item, 0.13, 0.075, 0.012, 0.055, -0.015, size * 0.43 + 0.01, 'chalk', 0.003);
      return item;
    };

    // Low enclosed conveyor with visible rollers and illuminated edge rails.
    const conveyor = new THREE.Group(); conveyor.name = 'automatic-parcel-conveyor'; group.add(conveyor);
    box(conveyor, 2.95, 0.28, 0.9, 0, 0.64, 0.6, alloy, 0.07);
    box(conveyor, 2.72, 0.055, 0.66, 0, 0.81, 0.6, graphite, 0.02);
    [-1.12, 1.12].forEach(x => [-0.3, 0.3].forEach(z => box(conveyor, 0.13, 0.25, 0.13, x, 0.41, 0.6 + z, 'navy', 0.02)));
    [-0.42, 0.42].forEach(z => box(conveyor, 2.8, 0.045, 0.035, 0, 0.77, 0.6 + z, cyan, 0.012));
    for (let i = 0; i < 13; i++) {
      const roller = cylinder(conveyor, 0.035, 0.035, 0.62, -1.25 + i * 0.208, 0.848, 0.6, alloy, 12);
      roller.rotation.x = Math.PI / 2;
    }
    const packages = [parcel(conveyor, -1, 1.025, 0.6), parcel(conveyor, 0, 1.025, 0.6), parcel(conveyor, 1, 1.025, 0.6)];

    // A scanning portal reads each parcel before automated dispatch.
    const scanner = new THREE.Group(); scanner.name = 'automated-dispatch-scanner'; scanner.position.x = 0.87; group.add(scanner);
    [0.06, 1.14].forEach(z => {
      box(scanner, 0.2, 1.03, 0.17, 0, 1.32, z, alloy, 0.04);
      box(scanner, 0.035, 0.75, 0.035, -0.111, 1.34, z, cyan, 0.008);
    });
    box(scanner, 0.25, 0.21, 1.25, 0, 1.89, 0.6, graphite, 0.04);
    box(scanner, 0.05, 0.035, 1.02, -0.139, 1.86, 0.6, cyan, 0.009);
    const scanMaterial = new THREE.MeshBasicMaterial({ color: 0xa9bcff, transparent: true, opacity: 0.13, side: THREE.DoubleSide, depthWrite: false });
    const scan = new THREE.Mesh(new THREE.PlaneGeometry(1.02, 0.89), scanMaterial);
    scan.rotation.y = Math.PI / 2; scan.position.set(0, 1.34, 0.6); scanner.add(scan);

    // Articulated pick-and-place robot, with contrasting joints and a two-finger gripper.
    const robot = new THREE.Group(); robot.name = 'robotic-parcel-handler'; robot.position.set(-0.78, 0.3, -0.58); group.add(robot);
    box(robot, 0.72, 0.14, 0.72, 0, 0.08, 0, graphite, 0.06);
    cylinder(robot, 0.24, 0.3, 0.31, 0, 0.29, 0, alloy);
    cylinder(robot, 0.255, 0.255, 0.055, 0, 0.47, 0, cyan);
    const turret = new THREE.Group(); turret.position.y = 0.5; robot.add(turret);
    const shoulder = new THREE.Group(); turret.add(shoulder);
    sphere(shoulder, 0.17, 0, 0, 0, graphite);
    box(shoulder, 0.29, 0.69, 0.27, 0, 0.36, 0, graphite, 0.07);
    box(shoulder, 0.21, 0.48, 0.035, 0, 0.36, 0.151, alloy, 0.02);
    box(shoulder, 0.045, 0.45, 0.025, 0.135, 0.36, 0.1, cyan, 0.012);
    const elbow = new THREE.Group(); elbow.position.y = 0.72; shoulder.add(elbow);
    sphere(elbow, 0.18, 0, 0, 0, graphite);
    cylinder(elbow, 0.095, 0.095, 0.385, 0, 0, 0, cyan, 24).rotation.x = Math.PI / 2;
    box(elbow, 0.25, 0.6, 0.23, 0, 0.32, 0, alloy, 0.055);
    const wrist = new THREE.Group(); wrist.position.y = 0.64; elbow.add(wrist);
    sphere(wrist, 0.12, 0, 0, 0, graphite);
    box(wrist, 0.36, 0.1, 0.18, 0, -0.1, 0, cyan, 0.025);
    [-0.145, 0.145].forEach(x => box(wrist, 0.065, 0.22, 0.15, x, -0.23, 0, graphite, 0.015));
    const heldParcel = parcel(wrist, 0, -0.32, 0, 0.29);

    // Compact automated storage bays and a dispatch display complete the cell.
    box(group, 0.8, 1.4, 0.59, 1.02, 1.01, -0.76, graphite, 0.08);
    [0.6, 1.02, 1.44].forEach(y => {
      box(group, 0.62, 0.32, 0.045, 1.02, y, -0.445, alloy, 0.025);
      box(group, 0.42, 0.025, 0.02, 1.02, y - 0.09, -0.413, cyan, 0.006);
    });
    sign(group, 'AUTO FULFILLMENT', 1.55, 0.25, 0.08, 2.21, -0.66, '#24334d', '#ffffff');
    box(group, 1.74, 0.35, 0.1, 0.08, 2.21, -0.73, graphite, 0.04);
    cylinder(group, 0.035, 0.035, 0.39, 0.8, 1.87, -0.75, alloy, 12);

    updateFulfillment = time => {
      packages.forEach((item, index) => {
        const progress = (time * 0.13 + index / packages.length + 0.08) % 1;
        item.position.x = -1.25 + progress * 2.5;
        const edgeScale = Math.min(1, progress * 12, (1 - progress) * 12);
        item.scale.setScalar(edgeScale);
      });
      const cycle = time * 0.7;
      turret.rotation.y = -0.58 + Math.sin(cycle) * 0.43;
      shoulder.rotation.z = -0.58 + Math.sin(cycle + 0.5) * 0.15;
      elbow.rotation.z = -1.52 + Math.sin(cycle - 0.3) * 0.22;
      wrist.rotation.z = -shoulder.rotation.z - elbow.rotation.z;
      heldParcel.visible = Math.sin(cycle) > -0.4;
      scanMaterial.opacity = 0.1 + (Math.sin(time * 2.4) + 1) * 0.035;
    };
    updateFulfillment(0);
  }

  // 01 — graphic design: the foundation in visual communication.
  {
    const group = stationGroups[0];
    box(group, 2.4, 1.55, 0.14, 0, 1.23, -0.67, 'terracotta', 0.09);
    box(group, 2.1, 1.28, 0.03, 0, 1.24, -0.58, 'paper');
    sign(group, 'CREATE', 1.45, 0.27, 0, 1.72, -0.56, '#ffffff', '#3457d5');
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
    sign(group, 'CONNECTED', 1.8, 0.24, 0, 1.73, -0.54, '#ffffff', '#3457d5');
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

  // 05 — network site work: desktop setup, live rack equipment and service kit.
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
    sign(rack, 'NETWORK', 0.83, 0.22, 0, 2.22, 0.392, '#24334d', '#ffffff');

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
    sign(group, 'SETUP', 0.53, 0.14, 0.93, 1.55, 0.351, '#ffffff', '#3457d5');
    box(group, 0.5, 0.045, 0.015, 0.93, 1.4, 0.355, 'stone', 0.008);
    box(group, 0.37, 0.045, 0.018, 0.865, 1.4, 0.367, 'sage', 0.008);
    box(group, 0.32, 0.025, 0.012, 0.93, 1.3, 0.355, 'gray', 0.005);

    box(group, 0.48, 0.22, 0.32, -1.02, 0.43, 0.87, 'terracotta', 0.04);
    lineBetween(group, [-1.19, 0.58, 0.87], [-0.85, 0.58, 0.87], 0.023, 'navy');
  }

  // 06 — customer service: a retail counter, parcel shelving, and point of sale.
  if (stationGroups[5]) {
    const group = stationGroups[5];
    box(group, 2.38, 1.48, 0.14, 0, 1.08, -0.76, 'chalk', 0.08);
    box(group, 2.63, 0.14, 0.66, 0, 1.91, -0.48, 'terracotta');
    [-0.9, -0.45, 0, 0.45, 0.9].forEach(x => box(group, 0.23, 0.04, 0.66, x, 2, -0.48, 'paper', 0.01));
    sign(group, 'CUSTOMER FIRST', 1.9, 0.25, 0, 1.53, -0.67, '#ffffff', '#24334d');
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
    sign(group, 'MAKE IT HAPPEN', 1.75, 0.23, -0.05, 1.89, -0.59, '#ffffff', '#24334d');
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

  // A small, deliberately stylized portrait with an Ivy League cut and a short beard.
  const person = new THREE.Group(); world.add(person);
  const personBody = new THREE.Group(); person.add(personBody);
  const darkHair = material(0x20211f, { roughness: 0.96, metalness: 0 });
  const facialHair = material(0x654b38, { roughness: 0.98, metalness: 0 });
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
  // Fitted surfaces allow a tapered cut without adding bulk around the face.
  function headSurface(name, radii, phiStart, phiLength, thetaStart, thetaEnd, mat, colorAt) {
    const columns = 40, rows = 16, positions = [], normals = [], indices = [], colors = [];
    for (let row = 0; row <= rows; row++) {
      for (let column = 0; column <= columns; column++) {
        const phi = phiStart + phiLength * column / columns;
        const start = typeof thetaStart === 'function' ? thetaStart(phi) : thetaStart;
        const end = typeof thetaEnd === 'function' ? thetaEnd(phi) : thetaEnd;
        const theta = THREE.MathUtils.lerp(start, end, row / rows);
        const x = Math.sin(theta) * Math.sin(phi), y = Math.cos(theta), z = Math.sin(theta) * Math.cos(phi);
        const fittedRadii = typeof radii === 'function' ? radii(theta, phi) : radii;
        positions.push(fittedRadii[0] * x, fittedRadii[1] * y, fittedRadii[2] * z);
        const nx = x / fittedRadii[0], ny = y / fittedRadii[1], nz = z / fittedRadii[2], length = Math.hypot(nx, ny, nz);
        normals.push(nx / length, ny / length, nz / length);
        if (colorAt) {
          const color = colorAt(row / rows, phi);
          colors.push(color.r, color.g, color.b);
        }
        if (row < rows && column < columns) {
          const a = row * (columns + 1) + column, b = a + columns + 1;
          indices.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    if (colors.length) geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.name = name; mesh.position.y = 1.52; mesh.castShadow = true;
    personBody.add(mesh);
    return mesh;
  }
  // One fitted shell keeps the sides close to the head and the longer top
  // gently swept to one side, without a separate fringe or bulky quiff.
  const hairline = phi => THREE.MathUtils.lerp(1.68, 1.06,
    THREE.MathUtils.smoothstep(Math.cos(phi), 0.15, 0.8));
  const hairRadii = (theta, phi) => {
    const top = 1 - THREE.MathUtils.smoothstep(theta, 0.65, 1.5);
    const sweep = Math.sin(theta) * Math.max(0, -Math.sin(phi));
    return [0.2485 + 0.003 * top, 0.2925 + (0.022 + 0.012 * sweep) * top, 0.23475 + 0.004 * top];
  };
  const taperMaterial = material(0xffffff, { roughness: 1, metalness: 0, vertexColors: true });
  headSurface('Ivy League top', hairRadii, -Math.PI, Math.PI * 2, 0, hairline, taperMaterial,
    (progress, phi) => {
      const front = THREE.MathUtils.smoothstep(Math.cos(phi), 0.15, 0.8);
      const theta = progress * hairline(phi);
      const fade = THREE.MathUtils.smoothstep(theta, 1.08, 1.68) * (1 - front);
      return darkHair.color.clone().lerp(materials.skin.color, fade);
    });
  const partPoints = [[1.03, 0.34], [0.74, 0.46], [0.45, 0.7], [0.25, 1.28], [0.27, 2.25]].map(([theta, phi]) => {
    const [rx, ry, rz] = hairRadii(theta, phi);
    return new THREE.Vector3((rx + 0.001) * Math.sin(theta) * Math.sin(phi),
      1.52 + (ry + 0.001) * Math.cos(theta), (rz + 0.001) * Math.sin(theta) * Math.cos(phi));
  });
  const part = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(partPoints), 28, 0.0015, 6, false), material(0x493e30));
  part.name = 'Side part'; personBody.add(part);
  // A very close beard sits low on the jaw, leaving the cheeks clear.
  headSurface('Short beard', [0.249, 0.294, 0.2355], -1.5, 3,
    phi => 1.93 + 0.3 * Math.pow(Math.max(0, Math.cos(phi)), 3), Math.PI, facialHair);
  sphere(personBody, 0.08, 0, 1.48, 0.208, 'skin', [0.75, 0.8, 0.7]);
  for (const side of [-1, 1]) {
    const moustache = sphere(personBody, 0.035, side * 0.028, 1.417, 0.225, facialHair, [1, 0.18, 0.2]);
    moustache.name = 'Short moustache'; moustache.rotation.z = -side * 0.14;
  }
  const smile = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.057, 1.386, 0.203), new THREE.Vector3(0, 1.378, 0.209), new THREE.Vector3(0.057, 1.386, 0.203),
  ]);
  const mouth = new THREE.Mesh(new THREE.TubeGeometry(smile, 10, 0.006, 6, false), material(0x744431));
  personBody.add(mouth);
  [-0.095, 0.095].forEach(x => {
    sphere(personBody, 0.028, x, 1.56, 0.215, 'dark', [1, 0.9, 0.55]);
    const brow = box(personBody, 0.07, 0.025, 0.025, x, 1.62, 0.215, darkHair, 0.01);
    brow.rotation.z = x > 0 ? 0.06 : -0.06;
  });
  // The cobalt location halo stays under the person as he walks.
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
      const narrow = size.width < 480 || size.height < 240;
      // Previous/Next chapter controls provide access on compact screens;
      // showing one world label keeps the small scene and character legible.
      label.style.visibility = size.height < 180 || (narrow && index !== activeIndex) ? 'hidden' : 'visible';
      // Measure the actual readable label instead of estimating from the old
      // miniature font size. Clamp both axes so larger text stays in the scene.
      const marginX = Math.min(8, size.width / 2), marginY = Math.min(8, size.height / 2);
      const halfWidth = Math.min(label.offsetWidth / 2, size.width / 2 - marginX);
      const halfHeight = Math.min(label.offsetHeight / 2, size.height / 2 - marginY);
      const left = narrow && index === 3
        ? halfWidth + marginX
        : THREE.MathUtils.clamp((projected.x * 0.5 + 0.5) * size.width, halfWidth + marginX, size.width - halfWidth - marginX);
      // Reserve the bottom control row when the scene is compact.
      const bottomMargin = narrow ? Math.min(64, size.height / 2) : marginY;
      const top = THREE.MathUtils.clamp((-projected.y * 0.5 + 0.5) * size.height, halfHeight + marginY, size.height - halfHeight - bottomMargin);
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
    const workplace = activeIndex === -1
      ? ' Meet Saqib at the central compass for About Me & My Story: his journey from Bangladesh to Canada and into project coordination.'
      : activeIndex === 3
      ? ' The iStoreiSend illustration shows automated fulfillment with a robotic parcel handler, moving conveyor, illuminated scanner, and automated storage.'
      : activeIndex === 4
        ? ' The Dynamic Infotech workplace contains a desktop computer setup, a cabled server rack, and a service kit.'
        : '';
    canvas.setAttribute('aria-label', controls + workplace);
  }
  function select(index) {
    const previousIndex = activeIndex;
    const requestedIndex = Number(index);
    activeIndex = requestedIndex === -1 ? -1 : Math.max(0, Math.min(stationData.length - 1, requestedIndex || 0));
    container.dataset.activeCompany = activeIndex === -1 ? 'About Me & My Story' : stationData[activeIndex].company;
    container.dataset.activeStation = String(activeIndex);
    updateCanvasDescription();
    labels.forEach((label, i) => label.classList.toggle('is-active', i === activeIndex));
    markers.forEach((marker, i) => marker.material = i === activeIndex ? materials.amber : materials.chalk);
    const destination = activeIndex === -1
      ? new THREE.Vector3(0, 0.08, 0)
      : new THREE.Vector3(...stationData[activeIndex].stop);
    destination.y = 0.08;
    if (reducedMotion || paused) {
      person.position.copy(destination); walkPath = [];
      if (activeIndex === -1) person.rotation.y = desiredYaw = 0.45;
      onArrival(activeIndex);
    } else if (activeIndex === -1 || previousIndex === -1) {
      // The central introduction is inside the ring, clear of the workplaces.
      // Start the career journey directly at the selected employer, and return
      // through the open plaza without changing any company indices.
      walkPath = person.position.distanceTo(destination) > 0.035 ? [destination] : [];
      if (!walkPath.length && activeIndex === -1) desiredYaw = 0.45;
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
        if (!walkPath.length) {
          container.dataset.traveling = 'false';
          if (activeIndex === -1) desiredYaw = 0.45;
          if (!userMoved) onArrival(activeIndex);
        }
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
    fulfillmentTime += delta;
    updateFulfillment(fulfillmentTime);
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
