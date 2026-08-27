import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { LiveVisitor } from '../../types';

interface AnalyticsGlobe3DProps {
  visitors?: LiveVisitor[];
}

export const AnalyticsGlobe3D: React.FC<AnalyticsGlobe3DProps> = ({ visitors = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const safeVisitors = visitors || [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Dark Digital Globe Sphere
    const globeGeom = new THREE.SphereGeometry(2.4, 48, 48);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
      metalness: 0.2,
      wireframe: false,
    });
    const globe = new THREE.Mesh(globeGeom, globeMat);
    globeGroup.add(globe);

    // Lat/Long Wire Grid
    const wireGeom = new THREE.SphereGeometry(2.42, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    globeGroup.add(wireMesh);

    // Traffic Orbits (Google, Instagram, YouTube, LinkedIn, Direct, Referral)
    const orbitLabels = ['GOOGLE', 'INSTAGRAM', 'YOUTUBE', 'LINKEDIN', 'DIRECT', 'REFERRAL'];
    const orbitColors = [0x2563eb, 0xe11d48, 0xdc2626, 0x0284c7, 0x10b981, 0x8b5cf6];

    orbitLabels.forEach((_, idx) => {
      const radius = 3.1 + idx * 0.22;
      const ringGeom = new THREE.RingGeometry(radius - 0.015, radius + 0.015, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: orbitColors[idx % orbitColors.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.rotation.x = Math.PI / 2.2 + idx * 0.15;
      ring.rotation.y = idx * 0.3;
      globeGroup.add(ring);
    });

    // Helper: Convert Lat/Long to 3D Sphere vector
    const latLongToVector = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // Plot Live Visitors as Glowing Points
    const visitorPins: THREE.Mesh[] = [];
    safeVisitors.forEach((vis) => {
      const pos = latLongToVector(vis.latitude, vis.longitude, 2.45);
      const pinGeom = new THREE.SphereGeometry(0.08, 12, 12);
      const pinMat = new THREE.MeshBasicMaterial({
        color: vis.source === 'Instagram' ? 0xe11d48 : 0x38bdf8,
      });
      const pin = new THREE.Mesh(pinGeom, pinMat);
      pin.position.copy(pos);
      globeGroup.add(pin);
      visitorPins.push(pin);

      // Little beacon arc
      const beaconGeom = new THREE.RingGeometry(0.1, 0.14, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const beacon = new THREE.Mesh(beaconGeom, beaconMat);
      beacon.position.copy(pos);
      beacon.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(beacon);
    });

    // Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      globeGroup.rotation.y = elapsed * 0.15;
      globeGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.08;

      // Pulse pins
      visitorPins.forEach((pin, i) => {
        const scale = 1 + Math.sin(elapsed * 4 + i) * 0.3;
        pin.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [visitors]);

  return (
    <div className="relative w-full h-[380px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between p-4" id="swanaya-live-digital-world">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
            Swanaya Live Digital World
          </span>
        </div>
        <div className="text-[11px] font-mono text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/50">
          {safeVisitors.length} Active Worldwide Nodes
        </div>
      </div>

      {/* 3D Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Traffic Orbit Legend Footer */}
      <div className="z-10 bg-slate-900/85 backdrop-blur-sm border border-slate-800/80 px-3 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
        <span className="text-slate-300 font-semibold">Traffic Orbits:</span>
        <span className="text-blue-400 flex items-center gap-1">● Google</span>
        <span className="text-pink-400 flex items-center gap-1">● Instagram</span>
        <span className="text-red-400 flex items-center gap-1">● YouTube</span>
        <span className="text-sky-400 flex items-center gap-1">● LinkedIn</span>
        <span className="text-emerald-400 flex items-center gap-1">● Direct</span>
      </div>
    </div>
  );
};
