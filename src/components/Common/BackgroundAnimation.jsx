import React, { useEffect, useRef } from 'react';
import '../../styles/CommonStyle/_backgroundAnimation.scss';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      // Set canvas size to match window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Redistribute particles across the new canvas size
      particlesRef.current.forEach(particle => {
        particle.baseX = Math.random() * canvas.width;
        particle.baseY = Math.random() * canvas.height;
        particle.x = particle.baseX;
        particle.y = particle.baseY;
      });
    };

    // Enhanced particle configuration
    const particleCount = 100;
    const connectionDistance = 180;
    const glowStrength = 20;

    // Create particles with more sophisticated variations
    const createParticles = () => {
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random();
        const isLarge = size > 0.85;
        const isMedium = size > 0.6 && size <= 0.85;
        const isHollow = Math.random() < 0.45;
        
        const baseRadius = isLarge ? 4.5 : (isMedium ? 3 : 1.8);
        const orbitRadius = Math.random() * 50;
        const orbitSpeed = (Math.random() * 0.002) + 0.001;
        const startAngle = Math.random() * Math.PI * 2;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: baseRadius + Math.random() * (isLarge ? 2 : 0.7),
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          isLarge,
          isMedium,
          isHollow,
          hasRing: (isLarge || isMedium) && Math.random() < 0.7,
          hasGlow: Math.random() < 0.3,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.015,
          orbitRadius,
          orbitSpeed,
          orbitAngle: startAngle,
          baseX: 0,
          baseY: 0,
          opacity: 0,
          targetOpacity: isLarge ? 0.9 : (isMedium ? 0.7 : 0.5)
        });
      }
      return particles;
    };

    // Initialize particles
    particlesRef.current = createParticles();
    resizeCanvas();

    // Add resize event listener with debounce
    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) {
        window.cancelAnimationFrame(resizeTimeout);
      }
      resizeTimeout = window.requestAnimationFrame(() => {
        resizeCanvas();
      });
    };

    window.addEventListener('resize', handleResize);

    function drawNetwork() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.shadowBlur = 0;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.12;
            const gradient = ctx.createLinearGradient(
              particlesRef.current[i].x, particlesRef.current[i].y,
              particlesRef.current[j].x, particlesRef.current[j].y
            );
            
            gradient.addColorStop(0, `rgba(255, 189, 0, ${opacity * particlesRef.current[i].opacity})`);
            gradient.addColorStop(1, `rgba(255, 189, 0, ${opacity * particlesRef.current[j].opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      const time = Date.now() * 0.001;

      // Draw particles
      particlesRef.current.forEach(particle => {
        particle.opacity += (particle.targetOpacity - particle.opacity) * 0.02;

        particle.orbitAngle += particle.orbitSpeed;
        particle.x = particle.baseX + Math.cos(particle.orbitAngle) * particle.orbitRadius;
        particle.y = particle.baseY + Math.sin(particle.orbitAngle) * particle.orbitRadius;

        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.3;
        const currentRadius = particle.radius * (1 + (particle.isLarge ? pulse * 0.25 : pulse * 0.15));

        if (particle.hasGlow) {
          ctx.shadowColor = 'rgba(255, 189, 0, 0.5)';
          ctx.shadowBlur = glowStrength * particle.opacity;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
        
        if (particle.isHollow) {
          ctx.strokeStyle = `rgba(255, 189, 0, ${particle.opacity})`;
          ctx.lineWidth = particle.isLarge ? 1.8 : particle.isMedium ? 1.2 : 0.7;
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255, 189, 0, ${particle.opacity})`;
          ctx.fill();
        }

        if (particle.hasRing) {
          const ringPulse = Math.sin(time * particle.pulseSpeed * 0.7 + particle.pulseOffset) * 0.5;
          const ringRadius = currentRadius + 2 + ringPulse;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 189, 0, ${0.2 * particle.opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        particle.baseX += particle.speedX;
        particle.baseY += particle.speedY;

        // Bounce off walls
        if (particle.baseX < 0 || particle.baseX > canvas.width) {
          particle.speedX *= -1;
          particle.baseX = Math.max(0, Math.min(canvas.width, particle.baseX));
        }
        if (particle.baseY < 0 || particle.baseY > canvas.height) {
          particle.speedY *= -1;
          particle.baseY = Math.max(0, Math.min(canvas.height, particle.baseY));
        }
      });
    }

    function animate() {
      drawNetwork();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeTimeout) {
        cancelAnimationFrame(resizeTimeout);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="networkCanvas" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  );
};

export default BackgroundAnimation;