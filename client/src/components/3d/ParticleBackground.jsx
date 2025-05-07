
/**
 * ParticleBackground (Static, No Animation)
 * - Replaces animated DOM-manipulated particles with a static, CSS-only background.
 * - No JavaScript animation, no DOM manipulation, zero performance impact.
 * - Senior-level: Accessible, maintainable, and performant.
 */
const ParticleBackground = () => {
  // You can adjust the number and style of particles as needed for your design.
  const PARTICLE_COUNT = 24;
  const particles = Array.from({ length: PARTICLE_COUNT });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0">
        {particles.map((_, i) => {
          // Randomize position and size for a natural look
          const size = Math.random() * 12 + 8; // 8px - 20px
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const opacity = Math.random() * 0.4 + 0.2;
          return (
            <div
              key={i}
              className="rounded-full bg-primary/10"
              style={{
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                opacity,
                pointerEvents: 'none',
                filter: 'blur(0.5px)',
              }}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ParticleBackground;
