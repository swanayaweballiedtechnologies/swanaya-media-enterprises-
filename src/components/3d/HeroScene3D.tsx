import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NodeData {
  name: string;
  category: string;
  color: number;
  radius: number;
  speed: number;
  initialAngle: number;
  yOffset: number;
}

const ECOSYSTEM_NODES: NodeData[] = [
  { name: 'MEDIA', category: 'Production', color: 0x3b82f6, radius: 4.2, speed: 0.35, initialAngle: 0, yOffset: 0.4 },
  { name: 'MARKETING', category: 'Growth', color: 0x0284c7, radius: 5.1, speed: 0.28, initialAngle: (Math.PI * 2) / 9, yOffset: -0.6 },
  { name: 'WEB', category: 'Engineering', color: 0x2563eb, radius: 4.6, speed: 0.32, initialAngle: ((Math.PI * 2) / 9) * 2, yOffset: 0.8 },
  { name: 'TECHNOLOGY', category: 'Platforms', color: 0x60a5fa, radius: 5.4, speed: 0.25, initialAngle: ((Math.PI * 2) / 9) * 3, yOffset: -0.3 },
  { name: 'BRANDING', category: 'Identity', color: 0x38bdf8, radius: 4.0, speed: 0.38, initialAngle: ((Math.PI * 2) / 9) * 4, yOffset: 0.5 },
  { name: 'CONSULTANCY', category: 'Strategy', color: 0x1d4ed8, radius: 5.0, speed: 0.29, initialAngle: ((Math.PI * 2) / 9) * 5, yOffset: -0.7 },
  { name: 'AI', category: 'Intelligence', color: 0x818cf8, radius: 4.4, speed: 0.36, initialAngle: ((Math.PI * 2) / 9) * 6, yOffset: 0.7 },
  { name: 'GROWTH', category: 'Performance', color: 0x10b981, radius: 5.2, speed: 0.27, initialAngle: ((Math.PI * 2) / 9) * 7, yOffset: -0.5 },
  { name: 'SOCIAL', category: 'Ecosystem', color: 0xe11d48, radius: 4.8, speed: 0.31, initialAngle: ((Math.PI * 2) / 9) * 8, yOffset: 0.2 },
];

export const HeroScene3D: React.FC<{ onNodeClick?: (nodeName: string) => void }> = ({ onNodeClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeNodeInfo, setActiveNodeInfo] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 25);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x1d4ed8, 2, 25);
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    // Central SWANAYA Node Group
    const centralGroup = new THREE.Group();
    scene.add(centralGroup);

    // Central Sphere (Core)
    const coreGeometry = new THREE.IcosahedronGeometry(1.3, 3);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      emissive: 0x1e40af,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const centralCore = new THREE.Mesh(coreGeometry, coreMaterial);
    centralGroup.add(centralCore);

    // Wireframe Outer Cage for Core
    const cageGeometry = new THREE.IcosahedronGeometry(1.65, 1);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    centralGroup.add(cageMesh);

    // Dynamic Orbital Rings
    const rings: THREE.Line[] = [];
    [4.1, 4.7, 5.3].forEach((radius, idx) => {
      const ringGeom = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 1 ? 0x38bdf8 : 0x2563eb,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.22,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + (idx * 0.15 - 0.15);
      ringMesh.rotation.y = idx * 0.2;
      scene.add(ringMesh);
    });

    // Surrounding Satellite Nodes
    const nodeMeshes: { mesh: THREE.Mesh; data: NodeData; group: THREE.Group; line: THREE.Line }[] = [];

    ECOSYSTEM_NODES.forEach((nodeData) => {
      const group = new THREE.Group();

      // Satellite Sphere
      const geom = new THREE.SphereGeometry(0.38, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: nodeData.color,
        emissive: nodeData.color,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.7,
      });
      const mesh = new THREE.Mesh(geom, mat);
      group.add(mesh);

      // Mini Orbit Halo
      const haloGeom = new THREE.RingGeometry(0.48, 0.52, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: nodeData.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const halo = new THREE.Mesh(haloGeom, haloMat);
      halo.rotation.x = Math.PI / 2;
      group.add(halo);

      // Connection energy line to central node
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: nodeData.color,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      scene.add(line);

      scene.add(group);
      nodeMeshes.push({ mesh, data: nodeData, group, line });
    });

    // Particle Starfield
    const particlesCount = 350;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 1.5;
      mouseY = y * 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Raycaster for click/hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));
      if (intersects.length > 0) {
        const hit = nodeMeshes.find((n) => n.mesh === intersects[0].object);
        if (hit) {
          setActiveNodeInfo(`${hit.data.name} — ${hit.data.category}`);
          container.style.cursor = 'pointer';
        }
      } else {
        setActiveNodeInfo(null);
        container.style.cursor = 'default';
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));
      if (intersects.length > 0) {
        const hit = nodeMeshes.find((n) => n.mesh === intersects[0].object);
        if (hit && onNodeClick) {
          onNodeClick(hit.data.name);
        }
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Camera lerp with mouse
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 1.5;
      camera.position.y = 2 + targetY * 1.2;
      camera.lookAt(0, 0, 0);

      // Rotate Central Core
      centralCore.rotation.y += 0.008;
      centralCore.rotation.x += 0.004;
      cageMesh.rotation.y -= 0.012;
      cageMesh.rotation.z += 0.006;

      // Rotate Particle Cloud
      particleSystem.rotation.y = elapsedTime * 0.03;

      // Move Orbiting Nodes
      nodeMeshes.forEach((item) => {
        const angle = item.data.initialAngle + elapsedTime * (item.data.speed * 0.6);
        const x = Math.cos(angle) * item.data.radius;
        const z = Math.sin(angle) * item.data.radius;
        const y = item.data.yOffset + Math.sin(elapsedTime * 1.2 + item.data.initialAngle) * 0.4;

        item.group.position.set(x, y, z);
        item.group.rotation.y += 0.02;

        // Update dynamic line to center
        const positions = item.line.geometry.attributes.position as THREE.BufferAttribute;
        positions.setXYZ(0, 0, 0, 0);
        positions.setXYZ(1, x, y, z);
        positions.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onNodeClick]);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] lg:h-[580px] select-none" id="hero-3d-ecosystem-wrapper">
      {/* Three.js Container */}
      <div ref={mountRef} className="w-full h-full" id="hero-3d-canvas" />

      {/* Floating Interactive Badge / Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md border border-blue-500/30 px-4 py-2 rounded-full text-xs font-mono text-blue-200 flex items-center gap-2 shadow-lg shadow-blue-950/40 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          {activeNodeInfo ? (
            <strong className="text-white font-bold">{activeNodeInfo}</strong>
          ) : (
            '3D Ecosystem: Drag & Rotate | Click nodes to explore divisions'
          )}
        </span>
      </div>

      {/* Center Label Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
        <div className="px-3 py-1 bg-blue-900/70 border border-blue-400/40 rounded-md backdrop-blur-sm text-[10px] uppercase tracking-widest font-bold text-blue-100 shadow-md">
          SWANAYA CORE
        </div>
      </div>
    </div>
  );
};
