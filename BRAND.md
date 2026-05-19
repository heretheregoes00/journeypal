# JourneyPal Brand & Feel

## Brand essence
JourneyPal feels like a quietly confident travel companion built by someone who actually travels. Calm, capable, precise. Not chirpy. Not selling you wanderlust. It assumes you know you want to travel — it just makes the doing of it less stupid.

## Visual feel

**Mood:** Dark, premium, technical-but-approachable. Think Linear or Arc Browser, not Airbnb or Hopper. Confident negative space. Topographic/cartographic visual cues, used sparingly — never literal "travel" imagery (no airplanes, no compass icons, no globes).

**Color palette:**
- Primary background: near-black, ~#0E1014 (deep, slightly cool)
- Primary surface (cards, elevated): ~#16191F
- Primary text: pure white #FFFFFF, with slightly dimmed white #C8CDD6 for secondary text
- Accent: electric blue ~#1E8FFF (the "Pal" blue from the logo) — used sparingly for primary CTAs, key highlights, and active states. Never as a background fill on large areas.
- Muted blue/navy ~#1E2A3D for subtle elements like the topographic lines in the logo
- Functional colors (success, warning, error) — keep desaturated, never neon

**Typography:**
- Headings & wordmark: geometric rounded sans (matches the logo — looks like Nunito, Quicksand, or similar). Slightly soft, never sharp/aggressive.
- Body: a clean modern sans — Inter, Geist, or similar. Optimized for readability at small sizes.
- Treat type with confidence — generous line-height, comfortable measure, never cramped.

**Density:** Generous whitespace. Information-dense when it earns the density (itinerary view, comparisons), spacious when it doesn't (onboarding, landing, empty states).

**Imagery style:** Minimal. When imagery is used, it's cinematic and atmospheric (think travel as a feeling, not a postcard). Avoid stock photography of smiling tourists, perfect beaches, "wanderlust" tropes entirely. Topographic/cartographic motifs (contour lines, map fragments, route paths) are on-brand visual elements.

**Motion:** Subtle and purposeful. Sub-200ms for UI feedback. Slightly longer (300-400ms) for transitions between major views. Easing should feel natural, never bouncy.

## Voice & tone

**Voice in 3 words:** confident, dry, useful.

**What it never sounds like:** "Discover amazing destinations!" — corporate, salesy, hype-y, exclamation-pointed, emoji-heavy, "amazing/incredible/breathtaking" adjective stacks.

**Sample microcopy:**
- ✅ "Where to next?"
- ✅ "Saved. Continue when you're ready."
- ✅ "This route adds 40 minutes. Worth it?"
- ❌ "Let's plan your dream getaway! ✈️🌴"
- ❌ "Discover incredible hidden gems!"

**Tone shifts by context:** dry and direct in functional UI, slightly warmer in empty states and onboarding, factual in error messages (never apologetic, never cute).

## Inspirations (specific products)

**Products that nail the feel:**
- Linear — dark, precise, fast, confident
- Arc Browser — opinionated, considered, calm
- Vercel dashboard — technical confidence, generous space
- Daylight Computer marketing — calm, considered, anti-hype
- Lounge (the social app) — restrained palette, warm minimalism

**Products that explicitly do NOT match:**
- Airbnb — too photo-led, too friendly-corporate
- Hopper — too gamified, too playful-emoji
- Booking.com — too dense, too salesy
- TripAdvisor — too cluttered
- Any "discover amazing destinations" app

## Hard rules (non-negotiable)
- No stock travel photography (smiling tourists, perfect beaches, etc.)
- No emoji in production UI (✈️🌴🗺️🧳) — emoji in microcopy only if genuinely earned, basically never
- No skeuomorphic UI (no leather, no paper, no boarding-pass-shaped cards)
- No light mode as the *default* — dark mode is the brand. (Light mode can exist as a setting, but design system is dark-first.)
- No exclamation points in functional UI copy
- Accent blue is for accent only — never large fills
- Topographic/cartographic motifs allowed; literal travel imagery (planes, compasses, globes) not allowed
