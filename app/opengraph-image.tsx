import { ImageResponse } from 'next/og';
import { profile } from './_data/portfolio';

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      tw='flex h-full w-full flex-col justify-between p-16 text-white'
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)' }}
    >
      <span tw='text-2xl text-slate-300'>{profile.website.replace(/^https?:\/\//, '')}</span>
      <div tw='flex flex-col'>
        <h1 tw='text-7xl font-bold tracking-tight'>{profile.name}</h1>
        <p tw='mt-4 text-3xl text-indigo-200'>{profile.role}</p>
      </div>
      <span tw='text-xl text-slate-400'>Microservicios · Cloud · Frontend moderno</span>
    </div>,
    size
  );
}
