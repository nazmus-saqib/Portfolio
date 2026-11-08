import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// A small, fully three-dimensional portrait based on the supplied character.
// The six returned groups share the world's existing walking animation rig.
export function createCharacter() {
  const person = new THREE.Group(); person.name = 'Saqib — leather jacket portrait';
  const personBody = new THREE.Group(); person.add(personBody);
  const leftLeg = new THREE.Group(), rightLeg = new THREE.Group();
  const leftArm = new THREE.Group(), rightArm = new THREE.Group();
  leftLeg.position.set(-0.125, 0.80, 0); rightLeg.position.set(0.125, 0.80, 0);
  leftArm.position.set(-0.325, 1.25, 0); rightArm.position.set(0.325, 1.25, 0);
  personBody.add(leftLeg, rightLeg, leftArm, rightArm);
  const mat = (color, roughness = .78, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
  const skin = mat(0xc98d61), innerEar = mat(0xb5704d), leather = mat(0x6e381f, .54);
  const leatherEdge = mat(0x8b5030, .61), seam = mat(0xb47d50), shirt = mat(0xf5f3ed, .95);
  const denim = mat(0x274d73, .98), denimLight = mat(0x3c6489, .98), denimSeam = mat(0xa78250);
  const boots = mat(0x61351e, .68), sole = mat(0x332820), lace = mat(0xb99769);
  const hair = mat(0x211a15, .94), hairLight = mat(0x32251d, .97), beard = mat(0x281d16, .98);
  const eyeWhite = mat(0xfffaf1, .5), iris = mat(0x513321, .6), pupil = mat(0x171514, .6);
  const silver = mat(0xbabec0, .3, .72), watchFace = mat(0x283338, .42), lip = mat(0xa7624e, .88);
  const sphereGeometry = new THREE.SphereGeometry(1, 24, 18);
  function mesh(parent, geometry, material, position = [0, 0, 0]) {
    const item = new THREE.Mesh(geometry, material); item.position.set(...position);
    item.castShadow = true; item.receiveShadow = true; parent.add(item); return item;
  }
  function oval(parent, position, scale, material) {
    const item = mesh(parent, sphereGeometry, material, position); item.scale.set(...scale); return item;
  }
  function rounded(parent, position, size, material, radius = .025) {
    return mesh(parent, new RoundedBoxGeometry(...size, 3, Math.min(radius, ...size.map(n => n / 2))), material, position);
  }
  function curve(parent, points, radius, material, segments = 14) {
    return mesh(parent, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), segments, radius, 6, false), material);
  }
  function limb(parent, start, end, topRadius, bottomRadius, material) {
    const a = new THREE.Vector3(...start), b = new THREE.Vector3(...end);
    const item = mesh(parent, new THREE.CylinderGeometry(topRadius, bottomRadius, a.distanceTo(b), 18), material);
    item.position.copy(a).add(b).multiplyScalar(.5);
    item.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), a.clone().sub(b).normalize());
    oval(parent, start, [topRadius, topRadius, topRadius], material);
    oval(parent, end, [bottomRadius, bottomRadius, bottomRadius], material);
    return item;
  }
  function panel(parent, points, material, depth = .055, z = .10) {
    const shape = new THREE.Shape(); points.forEach(([x, y], i) => i ? shape.lineTo(x, y) : shape.moveTo(x, y)); shape.closePath();
    return mesh(parent, new THREE.ExtrudeGeometry(shape, { depth, steps: 1, bevelEnabled: true, bevelSegments: 3, bevelSize: .014, bevelThickness: .014 }), material, [0, 0, z]);
  }

  // Denim has a relaxed straight leg, with separate raised boot cuffs and soles.
  for (const [leg, side] of [[leftLeg, -1], [rightLeg, 1]]) {
    limb(leg, [0, -.035, 0], [0, -.44, .006], .113, .092, denim);
    rounded(leg, [0, -.455, .008], [.185, .06, .19], denimLight, .022);
    curve(leg, [[side * .095, -.05, .043], [side * .089, -.24, .062], [side * .079, -.45, .07]], .0035, denimSeam);
    oval(leg, [0, -.525, .005], [.097, .145, .105], boots);
    oval(leg, [0, -.607, .082], [.111, .074, .186], boots);
    rounded(leg, [0, -.670, .073], [.230, .06, .355], sole, .025);
    curve(leg, [[-.099, -.627, .17], [0, -.64, .25], [.099, -.627, .17]], .0038, seam);
    for (let i = 0; i < 4; i++) {
      const y = -.51 - i * .026, z = .103 + i * .023;
      curve(leg, [[-.046, y, z], [0, y - .012, z + .01], [.046, y, z]], .004, lace, 5);
    }
  }
  rounded(personBody, [0, .79, -.005], [.415, .14, .23], denim, .05);
  curve(personBody, [[-.19, .80, .112], [0, .805, .125], [.19, .80, .112]], .005, denimSeam);
  curve(personBody, [[0, .79, .126], [.012, .765, .125], [0, .74, .12]], .003, denimSeam);

  // An open leather jacket: shaped panels and stand collar reveal the T-shirt.
  oval(personBody, [0, 1.045, -.035], [.266, .275, .158], leather);
  rounded(personBody, [0, 1.065, .118], [.255, .445, .09], shirt, .045);
  const jacketPanel = [[-.27, 1.24], [-.145, 1.31], [-.082, 1.285], [-.078, 1.17], [-.115, .83], [-.225, .817], [-.263, .98], [-.281, 1.16]];
  panel(personBody, jacketPanel, leather);
  panel(personBody, jacketPanel.map(([x, y]) => [-x, y]).reverse(), leather);
  for (const side of [-1, 1]) {
    curve(personBody, [[side * .083, 1.275, .177], [side * .086, 1.12, .183], [side * .115, .85, .179]], .006, silver);
    curve(personBody, [[side * .227, 1.237, .154], [side * .245, 1.07, .167], [side * .213, .86, .166]], .0035, seam);
    const collar = rounded(personBody, [side * .108, 1.292, .075], [.11, .115, .15], leatherEdge, .025);
    collar.rotation.z = side * .27;
    oval(personBody, [side * .135, 1.3, .165], [.014, .014, .006], silver);
    curve(personBody, [[side * .174, .973, .178], [side * .193, .914, .177]], .006, leatherEdge);
    rounded(personBody, [side * .117, .85, .191], [.018, .038, .013], silver, .004);
  }
  curve(personBody, [[.135, 1.132, .18], [.214, 1.145, .178]], .006, silver);
  rounded(personBody, [.133, 1.125, .191], [.017, .028, .012], silver, .003);
  curve(personBody, [[-.085, 1.303, .12], [-.063, 1.278, .167], [0, 1.267, .173], [.063, 1.278, .167], [.085, 1.303, .12]], .010, shirt);
  limb(personBody, [0, 1.292, 0], [0, 1.437, 0], .084, .09, skin);

  // A slight bend is built into the sleeves, leaving the animated roots free.
  for (const [arm, side] of [[leftArm, -1], [rightArm, 1]]) {
    limb(arm, [0, -.015, -.012], [side * .022, -.225, .01], .091, .078, leather);
    limb(arm, [side * .022, -.225, .01], [side * .008, -.385, .085], .078, .064, leather);
    curve(arm, [[side * .065, -.04, -.02], [side * .08, -.22, .014], [side * .062, -.35, .084]], .003, seam);
    oval(arm, [side * .008, -.396, .09], [.067, .038, .067], leatherEdge);
    oval(arm, [side * .008, -.446, .11], [.059, .067, .055], skin);
    oval(arm, [-side * .035, -.429, .144], [.025, .041, .023], skin);
    arm.rotation.z = -side * .055;
  }
  oval(leftArm, [-.008, -.403, .10], [.070, .023, .069], sole);
  oval(leftArm, [-.008, -.405, .164], [.039, .036, .012], silver);
  oval(leftArm, [-.008, -.405, .176], [.029, .027, .005], watchFace);
  curve(leftArm, [[-.008, -.386, .182], [-.008, -.405, .182], [.006, -.41, .182]], .002, silver, 4);

  // A rounded face, recognizable full beard, and a swept, lifted dark quiff.
  const headY = 1.665;
  oval(personBody, [0, headY, 0], [.234, .274, .213], skin);
  for (const side of [-1, 1]) {
    oval(personBody, [side * .235, 1.655, -.004], [.043, .077, .035], skin);
    oval(personBody, [side * .249, 1.652, .021], [.018, .044, .013], innerEar);
  }
  function headSurface(name, radii, thetaEnd, material, thetaStart = () => 0, offsetAt = () => [0, 0, 0]) {
    const positions = [], indices = [], columns = 48, rows = 18;
    for (let row = 0; row <= rows; row++) for (let column = 0; column <= columns; column++) {
      const phi = -Math.PI + Math.PI * 2 * column / columns;
      const theta = THREE.MathUtils.lerp(thetaStart(phi), thetaEnd(phi), row / rows);
      const [rx, ry, rz] = typeof radii === 'function' ? radii(theta, phi) : radii;
      const [dx, dy, dz] = offsetAt(theta, phi);
      positions.push(rx * Math.sin(theta) * Math.sin(phi) + dx, headY + ry * Math.cos(theta) + dy, rz * Math.sin(theta) * Math.cos(phi) + dz);
      if (row < rows && column < columns) {
        const a = row * (columns + 1) + column, b = a + columns + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); geometry.setIndex(indices); geometry.computeVertexNormals();
    const item = mesh(personBody, geometry, material); item.name = name; return item;
  }
  const hairLine = phi => THREE.MathUtils.lerp(1.71, 1.045 + .04 * Math.sin(phi), THREE.MathUtils.smoothstep(Math.cos(phi), .12, .85));
  const hairRadii = (theta, phi) => {
    const lift = 1 - THREE.MathUtils.smoothstep(theta, .25, 1.42);
    const upper = 1 - THREE.MathUtils.smoothstep(theta, .35, 1.04);
    const front = Math.max(0, Math.cos(phi));
    const sweep = Math.max(0, -Math.sin(phi)) * Math.sin(theta);
    return [.239 + .018 * lift + .020 * upper, .282 + (.066 + .045 * sweep) * lift - .028 * upper, .219 + .022 * front * lift + .012 * front * upper];
  };
  const hairOffset = theta => {
    const upper = 1 - THREE.MathUtils.smoothstep(theta, .35, 1.04);
    const cos = Math.max(0, Math.cos(theta));
    return [-.045 * upper, (Math.sqrt(cos) - cos) * .29 * upper, .008 * upper];
  };
  headSurface('Continuous swept quiff', hairRadii, hairLine, hair, () => 0, hairOffset);
  // Fine directional ridges are sampled from that same crown surface, so they
  // follow the hair instead of floating above the forehead as separate strands.
  for (let i = 0; i < 6; i++) {
    const startPhi = -.62 + i * .245;
    const points = Array.from({ length: 18 }, (_, step) => {
      const t = step / 17, phi = startPhi - .74 * t;
      const theta = THREE.MathUtils.lerp(hairLine(startPhi) - .018, .23, t);
      const [rx, ry, rz] = hairRadii(theta, phi);
      const [dx, dy, dz] = hairOffset(theta, phi);
      return [(rx + .001) * Math.sin(theta) * Math.sin(phi) + dx, headY + (ry + .001) * Math.cos(theta) + dy, (rz + .001) * Math.sin(theta) * Math.cos(phi) + dz];
    });
    curve(personBody, points, .0018, hairLight, 32);
  }
  headSurface('Full sculpted beard', [.242, .278, .224], () => Math.PI, beard,
    phi => 1.58 + .56 * Math.pow(Math.max(0, Math.cos(phi)), 3));
  for (const side of [-1, 1]) {
    oval(personBody, [side * .218, 1.632, .023], [.024, .084, .04], beard);
    curve(personBody, [[side * .009, 1.581, .211], [side * .037, 1.582, .212], [side * .066, 1.565, .199]], .012, beard, 10);
  }
  oval(personBody, [0, 1.624, .210], [.038, .054, .038], skin);
  for (const side of [-1, 1]) oval(personBody, [side * .027, 1.605, .217], [.017, .019, .018], skin);
  curve(personBody, [[-.054, 1.551, .202], [0, 1.541, .212], [.054, 1.551, .202]], .006, lip, 12);
  oval(personBody, [0, 1.535, .201], [.034, .009, .011], lip);
  for (const side of [-1, 1]) {
    const x = side * .087;
    oval(personBody, [x, 1.707, .199], [.041, .018, .017], eyeWhite);
    oval(personBody, [x, 1.705, .216], [.018, .017, .007], iris);
    oval(personBody, [x, 1.705, .222], [.009, .013, .004], pupil);
    oval(personBody, [x - .005, 1.713, .226], [.004, .005, .002], eyeWhite);
    curve(personBody, [[x - .038, 1.709, .202], [x, 1.725, .207], [x + .038, 1.709, .202]], .004, beard, 10);
    curve(personBody, [[x - .044, 1.754, .198], [x, 1.772, .201], [x + .043, 1.754, .196]], .012, hair, 12);
  }

  // Merge static pieces within each animated group, preserving the limb pivots.
  // This keeps fine portrait/clothing details affordable in the larger world.
  const sourceGeometries = new Set();
  function batch(group) {
    group.updateMatrix();
    const byMaterial = new Map();
    for (const item of [...group.children]) if (item.isMesh) {
      item.updateMatrix();
      sourceGeometries.add(item.geometry);
      const geometry = item.geometry.clone().applyMatrix4(item.matrix);
      if (!geometry.index) geometry.setIndex(Array.from({ length: geometry.attributes.position.count }, (_, i) => i));
      if (!geometry.attributes.uv) geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.count * 2), 2));
      const list = byMaterial.get(item.material) || []; list.push(geometry); byMaterial.set(item.material, list);
      group.remove(item);
    }
    for (const [material, geometries] of byMaterial) {
      const combined = mergeGeometries(geometries, false);
      if (combined) mesh(group, combined, material);
      geometries.forEach(geometry => geometry.dispose());
    }
  }
  for (const group of [personBody, leftLeg, rightLeg, leftArm, rightArm]) batch(group);
  sourceGeometries.forEach(geometry => geometry.dispose());
  return { person, personBody, leftLeg, rightLeg, leftArm, rightArm };
}
