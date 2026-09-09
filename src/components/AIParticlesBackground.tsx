import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseSpeed: number;
  pulseValue: number;
  pulseDir: number;
}

export default function AIParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Handle high-DPI displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Initialize particles
    const initParticles = (w: number, h: number) => {
      const particleCount = Math.min(Math.floor((w * h) / 14000), 120);
      const temp: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        temp.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 1,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          pulseValue: Math.random(),
          pulseDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
      particlesRef.current = temp;
    };

    initParticles(width, height);

    // Drawing & Updating Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw interactive grid lines gently in background
      ctx.strokeStyle = "rgba(57, 167, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const pts = particlesRef.current;

      // Update positions
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        // Pulse the size/glow
        p.pulseValue += p.pulseSpeed * p.pulseDir;
        if (p.pulseValue >= 1) {
          p.pulseValue = 1;
          p.pulseDir = -1;
        } else if (p.pulseValue <= 0.2) {
          p.pulseValue = 0.2;
          p.pulseDir = 1;
        }

        // Bounce on boundaries with a smooth cushion
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Constraint check in case window resized down
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
      }

      // Draw Connections (Neural Network Structure)
      const maxDistance = 120;
      const mouseMaxDistance = 180;

      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];

        // Connections to other nodes
        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            // Draw gradient-like color based on position
            ctx.strokeStyle = `rgba(57, 167, 255, ${alpha})`;
            ctx.lineWidth = (1 - dist / maxDistance) * 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connections to Mouse Cursor
        if (mouseRef.current.active) {
          const mdx = p1.x - mouseRef.current.x;
          const mdy = p1.y - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseMaxDistance) {
            const alpha = (1 - mdist / mouseMaxDistance) * 0.3;
            ctx.strokeStyle = `rgba(140, 108, 255, ${alpha})`;
            ctx.lineWidth = (1 - mdist / mouseMaxDistance) * 1.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.stroke();

            // Attract slightly towards mouse to look intelligent
            p1.x -= mdx * 0.005;
            p1.y -= mdy * 0.005;
          }
        }

        // Draw node points
        const r = p1.radius * (1 + p1.pulseValue * 0.3);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, r, 0, Math.PI * 2);
        
        // Dynamic color shifting for visual richness
        const gradient = ctx.createRadialGradient(p1.x, p1.y, 0, p1.x, p1.y, r * 4);
        const coreAlpha = 0.4 + p1.pulseValue * 0.4;
        gradient.addColorStop(0, `rgba(57, 167, 255, ${coreAlpha})`);
        gradient.addColorStop(0.3, `rgba(140, 108, 255, ${coreAlpha * 0.5})`);
        gradient.addColorStop(1, "rgba(5, 9, 20, 0)");

        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw solid core
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + p1.pulseValue * 0.3})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    // Set up ResizeObserver to handle canvas resizing dynamically
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const newWidth = Math.floor(entry.contentRect.width);
      const newHeight = Math.floor(entry.contentRect.height);

      if (newWidth === width && newHeight === height) return;

      width = newWidth;
      height = newHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-init particles on substantial changes
      initParticles(width, height);
    });

    resizeObserver.observe(container);

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.touches[0].clientX - rect.left;
        mouseRef.current.y = e.touches[0].clientY - rect.top;
        mouseRef.current.active = true;
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
    >
      <canvas ref={canvasRef} className="block w-full h-full opacity-70" />
    </div>
  );
}
