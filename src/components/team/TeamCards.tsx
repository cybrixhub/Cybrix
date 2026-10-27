import Reveal from "@/components/Reveal";
import Portrait from "./Portrait";
import { RoleIcon, RoleMotif } from "./RoleMotif";
import type { TeamMember } from "@/lib/team";

function PhotoCredit({ member, className = "" }: { member: TeamMember; className?: string }) {
  const c = member.photo.credit;
  if (!c) return null;
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`absolute z-10 rounded-full bg-black/35 px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-white/85 opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:text-white focus-visible:opacity-100 group-hover:opacity-100 ${className}`}
    >
      Photo · {c.name} / Pexels
    </a>
  );
}

function Skills({ skills, dark = false }: { skills: string[]; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Focus areas">
      {skills.map((s) => (
        <li
          key={s}
          className={`rounded-full border px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] ${
            dark ? "border-white/20 text-[#B9CBE4]" : "border-line-strong text-ink-soft"
          }`}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

/** The CEO — a wide, navy leadership card. */
export function LeaderCard({ member }: { member: TeamMember }) {
  return (
    <article className="group relative grid overflow-hidden rounded-2xl bg-navy text-white shadow-[0_40px_80px_-40px_rgba(20,49,122,0.55)] md:grid-cols-[0.9fr_1.1fr]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-noise absolute inset-0 opacity-[0.06]" />
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#78efeb]/10 blur-3xl" />
        <svg
          viewBox="0 0 400 400"
          className="absolute -bottom-24 right-[-6rem] h-[26rem] w-[26rem] text-[#78efeb]/[0.08]"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="200" cy="200" r="120" />
          <circle cx="200" cy="200" r="160" />
          <circle cx="200" cy="200" r="199" strokeDasharray="2 6" />
        </svg>
      </div>

      <div className="relative">
        <Portrait
          member={member}
          sizes="(max-width: 768px) 100vw, 520px"
          className="aspect-[4/5] h-full md:aspect-auto md:min-h-[32rem]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-navy/35"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#78efeb] px-3 py-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-navy shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]">
          <RoleIcon role={member.key} className="h-3.5 w-3.5" />
          Leadership
        </span>
        <PhotoCredit member={member} className="bottom-3 right-3" />
      </div>

      <div className="relative flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-14">
        <div>
          <div className="flex items-center justify-between gap-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[#B9CBE4]">
            <span>01 · Leads the team</span>
            <span className="hidden lg:inline">Cybrix studio</span>
          </div>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-[#78efeb]">
            {member.role}
          </p>
          <h3 className="mt-3 font-display text-[2.1rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-[2.6rem] xl:text-5xl">
            {member.name}
          </h3>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#B9CBE4] text-pretty">
            {member.focus}
          </p>
          {member.bio && (
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 text-pretty">
              {member.bio}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <Skills skills={member.skills} dark />
          <RoleMotif role={member.key} />
        </div>
      </div>
    </article>
  );
}

/** Everyone else — consistent portrait cards. */
export function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line-strong bg-white p-2.5 shadow-[0_24px_48px_-32px_rgba(20,49,122,0.35)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#78efeb]/70 hover:shadow-[0_36px_64px_-32px_rgba(20,49,122,0.45)]">
      <div className="relative overflow-hidden rounded-xl">
        <Portrait
          member={member}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 290px"
          className="aspect-[4/5]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy/65 to-transparent"
        />
        <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy shadow-[0_6px_16px_-6px_rgba(20,49,122,0.45)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#78efeb]">
          <RoleIcon role={member.key} className="h-[1.1rem] w-[1.1rem]" />
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-4 font-display text-4xl font-semibold leading-none text-white/90"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <PhotoCredit member={member} className="right-2 top-3" />
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[#3DB5B0]">
          {member.role}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight text-navy text-balance">
          {member.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft text-pretty">
          {member.focus}
        </p>
        {member.bio && (
          <p className="mt-3 text-sm leading-relaxed text-ink text-pretty">{member.bio}</p>
        )}
        <div className="mt-5">
          <Skills skills={member.skills} />
        </div>
        <div className="mt-5 flex h-6 items-center border-t border-line pt-4">
          <RoleMotif role={member.key} />
        </div>
      </div>
    </article>
  );
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const [lead, ...rest] = members;
  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <Reveal>
        <LeaderCard member={lead} />
      </Reveal>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {rest.map((m, i) => (
          <Reveal key={m.key} as="li" delay={i * 90}>
            <MemberCard member={m} index={i + 1} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
