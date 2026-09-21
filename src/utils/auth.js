/**
 * Lightweight client-side auth helpers.
 * DEMO ONLY — never store plain-text passwords in localStorage in production.
 */

export function hashPassword(password) {
  let hash = 0;
  const salt = 'carfashion_demo_salt_v1';
  const input = password + salt;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return 'h_' + Math.abs(hash).toString(36);
}

export function generateAvatar(name) {
  const initials = (name || 'U')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const gradients = [
    ['#2563EB', '#7C3AED'],
    ['#EC4899', '#F59E0B'],
    ['#10B981', '#06B6D4'],
    ['#7C3AED', '#EC4899'],
    ['#F59E0B', '#EF4444'],
  ];
  const idx = (name || '').length % gradients.length;
  return { initials, gradient: gradients[idx] };
}

export function generateId() {
  return 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}