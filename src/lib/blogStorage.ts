import { BlogPost } from '../types';

const BLOG_STORAGE_KEY = 'herhorizon_blog_posts_v1';

export const BLOG_CATEGORIES = [
  'All',
  'Nervous System',
  'Trauma Bonds',
  'Self-Trust',
  'Boundaries',
  'Nighttime Protocols',
] as const;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

// Initial high-quality, SEO-optimized articles crafted for HerHorizon
export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'the-phantom-courtroom-mental-loops',
    title: 'The 2 A.M. Phantom Courtroom: Why Your Brain Argues With Someone Who Isn’t There',
    subtitle: 'Why your nervous system stages imaginary trials in the dark, and the 90-second physiological brake that dismisses the jury tonight.',
    excerpt: 'It is 2:14 A.M. The room is dead quiet, yet inside your skull, a high-stakes trial is underway. You are presenting evidence, cross-examining their gaslighting, defending your dignity before an empty jury box. Here is why you cannot "rationalize" your way out of this loop—and what your body actually needs.',
    coverImage: '/cover-free-anchor-card.webp',
    coverImageAlt: 'HerHorizon 2 A.M. Emergency Anchor Card and quiet bedroom nightstand',
    author: {
      name: 'Sara Mitchell',
      role: 'Founder & Trauma-Informed Guide',
      avatar: '/author-portrait.png',
    },
    category: 'Nighttime Protocols',
    tags: ['Mental Loops', 'Nervous System', 'Insomnia', 'Trauma Recovery', '2 AM Protocol'],
    readingTimeMinutes: 5,
    publishedAt: '2026-09-18T08:00:00Z',
    status: 'published',
    featured: true,
    views: 1420,
    likes: 89,
    seo: {
      metaTitle: 'The 2 A.M. Phantom Courtroom: How to Halt Mental Loops | HerHorizon',
      metaDescription: 'Why does your brain argue with an ex or toxic person in the middle of the night? Discover why it happens and the 90-second somatic technique to dismiss the court.',
      focusKeyword: 'phantom courtroom mental loops',
      keywords: ['mental loops at night', 'trauma bond insomnia', 'stop ruminating at night', 'nervous system reset', 'phantom courtroom', 'vagus nerve recovery'],
      canonicalUrl: 'https://herhorizon.store/blog/the-phantom-courtroom-mental-loops',
    },
    content: `It is 2:14 A.M. The bedroom is pitch black. The world outside is asleep, but inside your chest, a high-stakes trial has commenced.

You are pacing the invisible floorboards of your mind, cross-examining their gaslighting, defending your choices, articulating the exact sentence that *should* have made them understand your pain.

You check the clock. 2:48 A.M. Your heart rate is elevated, your jaw is clamped like an iron vise, and your stomach churns with sour adrenaline.

Why does your mind drag you into this courtroom night after night, even when you swore you were done explaining yourself?

---

### 1. The Neurobiology of the Midnight Defense

When you experience betrayal, chronic invalidation, or a high-conflict relationship, your brain encodes **unresolved ambiguity as mortal danger**. 

To your amygdala, an unacknowledged truth feels like a loose predator outside the cave door. Your nervous system believes that if you can just construct the *airtight argument*—if you can just produce the undisputed moral proof—the danger will neutralize, and your safety will be restored.

> **Key Realization:** The phantom courtroom is not you being "obsessed" or "weak." It is your survival brain trying to litigate safety into existence using logic against a predator that operates on control.

The paradox? You cannot solve a nervous system emergency with cerebral analysis. 

Thinking more will never silence a panicked vagus nerve; it only feeds the fire with more cognitive gasoline.

---

### 2. Why "Just Think Positive" Fails Every Time

Self-help platitudes tell you to "let it go" or "count sheep." But in acute nervous system dysregulation, the prefrontal cortex is partially offline. The blood has pooled in your brainstem and motor centers. 

Your body is literally poised to sprint from a lion. You cannot whisper affirmations to a body that believes it is about to be eaten.

You need a **physiological circuit breaker**—something somatic, sensory, and concrete.

---

### 3. The 90-Second Physiological Circuit Breaker

Here is the exact somatic protocol taken from the *HerHorizon 72-Hour Reset System*:

#### Step A: The Cold Sensor Contact
Place your bare feet flat against a cold hardwood floor, or press the inside of your wrists against a chilled glass of ice water. The abrupt temperature shift triggers the mammalian dive reflex, instantly forcing your autonomic nervous system to dial down epinephrine production.

#### Step B: The 3-Fact Reality Filter
Whisper aloud three undisputed, verifiable physical facts about your immediate physical room:
1. *"My feet are touching this wooden floor right now."*
2. *"The time is 2:32 A.M. and this room is completely locked and safe."*
3. *"The person I am arguing with is not in this room, cannot hear me, and has no jurisdiction here."*

#### Step C: The Somatic Exhale
Inhale deeply through your nose for 4 counts, take a micro-sip of extra air at the very top, and release a slow, audible sigh through open lips for 8 counts. Repeat three times. Notice how your shoulders drop from your ears.

---

### The Verdict Is Already In

The closure you are seeking in the phantom courtroom cannot be granted by the person who hurt you. They were never a fair judge, and their courtroom was always rigged.

> *"You do not have to prove that they harmed you. Your body's exhaustion is the only witness you will ever need."*

Tonight, dismiss the court. Step down from the witness stand. Wrap both hands across your ribcage, let your exhale be longer than your inhale, and claim your quiet back.

---

#### Recommended Resource:
If you need an immediate pocket companion for the night hours, download our complimentary **[72-Hour Reset Guide & 2 A.M. Emergency Anchor Card](/free-guide)**. Keep the card saved on your phone lockscreen so you never have to navigate the midnight spiral alone.`,
  },
  {
    id: 'post-2',
    slug: '90-second-vagus-nerve-shift',
    title: 'The 90-Second Vagus Nerve Shift: How Somatic Temperature Resets Halt Acute Panicked Thoughts',
    subtitle: 'Why positive affirmations backfire during acute emotional flashbacks, and the temperature-based physiology that brings you home.',
    excerpt: 'When your body enters dorsal vagal collapse or hyperarousal, your prefrontal cortex shuts down. Here is how cold water immersion and somatic temperature shifts trigger the mammalian dive reflex to halt adrenaline spikes in under two minutes.',
    coverImage: '/cover-roadmap.webp',
    coverImageAlt: 'HerHorizon Somatic Roadmap and Nervous System Healing Protocols',
    author: {
      name: 'Sara Mitchell',
      role: 'Founder & Trauma-Informed Guide',
      avatar: '/author-portrait.png',
    },
    category: 'Nervous System',
    tags: ['Vagus Nerve', 'Somatic Healing', 'Panic Attack Relief', 'Body-First Recovery'],
    readingTimeMinutes: 4,
    publishedAt: '2026-09-24T10:30:00Z',
    status: 'published',
    featured: false,
    views: 980,
    likes: 64,
    seo: {
      metaTitle: 'The 90-Second Vagus Nerve Shift: Halt Acute Panic Fast | HerHorizon',
      metaDescription: 'Learn how to use somatic temperature shifts and the mammalian dive reflex to interrupt acute trauma panic and vagus nerve hijacking in 90 seconds.',
      focusKeyword: 'vagus nerve reset somatic',
      keywords: ['vagus nerve shift', 'mammalian dive reflex trauma', 'somatic panic relief', 'halt emotional flashbacks', 'polyvagal recovery'],
      canonicalUrl: 'https://herhorizon.store/blog/90-second-vagus-nerve-shift',
    },
    content: `When your phone buzzes with their name, or a sudden memory hits you like a truck in the grocery store aisle, your nervous system does not consult your intellect.

Within 200 milliseconds, your sympathetic branch floods your bloodstream with cortisol and adrenaline. Your pupils dilate, your breath turns shallow, and your muscles brace.

If someone tells you in that moment to *"take a deep breath and think positive thoughts,"* you might feel like screaming. And for good reason: **your brain is doing exactly what it was built to do.**

---

### The Brainstem Hijack

The human brain is organized in a hierarchy:
- **Bottom:** Brainstem & Autonomic Centers (Survival, Heart Rate, Respiration)
- **Middle:** Limbic System (Emotion, Threat Memory, Attachment)
- **Top:** Neocortex (Logic, Language, Future Planning)

Information flows from the **bottom up**. When the lower brain perceives threat, it throttles blood supply to the neocortex. Attempting to calm yourself with intellectual mantras is like trying to rewrite software code on a laptop that has lost power.

To restore power, you must talk to the hardware. You must use the **Vagus Nerve**.

---

### The Mammalian Dive Reflex: Nature’s Hard Reset

Mammals possess an innate survival adaptation known as the **Mammalian Dive Reflex**. When facial thermal sensors (specifically around the eyes, temples, and upper cheeks) detect sudden cold immersion while breathing stops, the brainstem sends an immediate emergency message through the vagus nerve:

1. **Bradycardia:** Heart rate slows by 10% to 25% within seconds.
2. **Peripheral Vasoconstriction:** Blood shifts from extremities to core organs.
3. **Parasympathetic Surge:** The dorsal motor nucleus and ventral vagal brake engage instantly.

---

### The 90-Second Emergency Protocol

When you feel an emotional flashback or panic spike:

1. **Fill a bowl with cold water** (add 3–4 ice cubes if available).
2. **Take a gentle normal inhale**—do not hyperventilate.
3. **Submerge your face** (from eye line to upper cheekbones) into the water for 15 to 20 seconds.
4. **Resurface and breathe out slowly** through pursed lips.
5. **Notice the somatic shift:** Feel the heavy rush of warmth settling into your torso as your heartbeat steadies.

> *"You cannot talk your body out of fear that your body has not felt you physically resolve."*

---

### Practical Integration for Daily Life

Keep an ice roller in your freezer or an insulated tumbler with ice cubes at your desk. When an old text message screenshot resurfaces in your mind, press the cold edge against your sternum and temples. 

Give your body the physical anchor it needs to believe: **You are safe now. The war has ended.**`,
  },
  {
    id: 'post-3',
    slug: 'why-you-cant-think-out-of-trauma-bond',
    title: 'Why You Can’t "Think" Your Way Out of a Trauma Bond (And What Actually Breaks It)',
    subtitle: 'The biochemical addiction cycle of intermittent reinforcement, dopamine droughts, and the real roadmap to emotional sobriety.',
    excerpt: 'You are an intelligent, capable woman. So why did you stay? Why do you still miss them? The secret lies in intermittent reinforcement and biochemical bonding. Understanding the neurochemistry of withdrawal changes everything.',
    coverImage: '/cover-free-reset-guide.webp',
    coverImageAlt: 'HerHorizon Free 72-Hour Reset Guide Book Cover',
    author: {
      name: 'Sara Mitchell',
      role: 'Founder & Trauma-Informed Guide',
      avatar: '/author-portrait.png',
    },
    category: 'Trauma Bonds',
    tags: ['Trauma Bond', 'Dopamine Detachment', 'Narcissistic Abuse Recovery', 'Emotional Sobriety'],
    readingTimeMinutes: 6,
    publishedAt: '2026-10-01T14:15:00Z',
    status: 'published',
    featured: false,
    views: 1850,
    likes: 122,
    seo: {
      metaTitle: 'Why You Can’t Think Out of a Trauma Bond | HerHorizon',
      metaDescription: 'Discover why intelligence cannot outsmart a trauma bond. Understand the intermittent dopamine cycle and the exact somatic steps to break the biological hook.',
      focusKeyword: 'break a trauma bond',
      keywords: ['how to break trauma bond', 'intermittent reinforcement', 'trauma bond withdrawal', 'toxic relationship recovery', 'dopamine addiction relationship'],
      canonicalUrl: 'https://herhorizon.store/blog/why-you-cant-think-out-of-trauma-bond',
    },
    content: `You run meetings. You balance budgets. You give grounded, brilliant advice to your closest friends.

Yet in the privacy of your own home, you have stared at a silent phone for three hours, physically sick with longing for a person who treated you with contempt 48 hours ago.

The shame that follows is suffocating: *"What is wrong with me? Am I pathetic? Why am I letting someone treat me like this?"*

Let us establish one truth right now: **There is nothing wrong with your intellect.** 

You are not failing because you lack willpower. You are experiencing the most powerful biochemical addiction known to behavioral psychology: **intermittent reinforcement**.

---

### The Vegas Slot Machine Inside Your Brain

In the 1950s, psychologist B.F. Skinner discovered that animals do not become addicted to rewards that arrive predictably. If a pigeon presses a lever and gets food every single time, it eats when it is hungry and stops.

However, if you make the reward **unpredictable**—sometimes food drops, sometimes nothing, sometimes an electric shock, followed randomly by a jackpot—the pigeon will press the lever compulsively until its beak bleeds.

This is the exact neurochemical architecture of a trauma bond:
- **Phase 1: The Golden Phase (Flooding):** Intense idealization floods your brain with dopamine and oxytocin.
- **Phase 2: The Devaluation / Cold Shoulder:** Sudden withdrawal plunges you into acute opioid-like withdrawal.
- **Phase 3: The Breadcrumb Reconciliation:** A warm text, an apology, or a momentary display of affection delivers a massive dopamine surge 400% higher than baseline.

Your brain has been conditioned to associate *the person who causes the injury* with *the only medicine that relieves the injury*.

---

### Why Logic Cannot Break A Dopamine Hook

When you try to "think" your way out:
- You make lists of everything bad they did.
- You reread horrible text messages.
- You listen to hours of podcasts explaining their pathology.

Yet the minute they send a casual text (*"Hey, was thinking about you"*), your heart leaps and the logic dissolves. Why?

Because logic lives in the prefrontal cortex, while the craving lives in the **nucleus accumbens** and **brainstem**. Addiction is a neurochemical state, not a debate.

---

### The 4 Pillars of Real Detachment

To dismantle a trauma bond, you must treat your recovery like physical detoxification:

#### 1. Cold Turkey on the Dopamine Spikes
Zero contact is not a punishment for them; it is a clinical sterile field for your brain chemistry. Every time you check their social media, you are handing a gambling addict a scratch-off ticket.

#### 2. Somatic Metabolization of the Withdrawal Ache
When the physical chest ache of withdrawal hits, do not distract yourself by ruminating. Sit down, place a heavy pillow across your lap, and describe the physical sensation: *"There is a tight band around my throat. My ribs feel hollow."* Breathe through it without answering the phone.

#### 3. Rewriting the Self-Betrayal Contract
Every time you accepted an apology without changed behavior, you signed an agreement against your own dignity. Start making micro-promises to yourself—and keep them.

#### 4. The 30-Day Identity Rebuild
Your entire identity became organized around managing their volatility. When they are gone, the quiet feels like death. Rebuilding requires structured, day-by-day somatic exercises to re-inhabit your own skin.

> *"You are not in love with their potential. You are in biological withdrawal from their inconsistency."*

Breathe. Drink water. The hook is unhooking. Give your body the time it needs to dry out.`,
  },
  {
    id: 'post-4',
    slug: 'subtle-signs-self-trust-is-returning',
    title: 'The Quiet Rebuild: 5 Subtle Signs Your Self-Trust Is Coming Back Online',
    subtitle: 'Healing does not arrive with a brass band. It shows up in the quiet moments where you no longer poll ten people before making a decision.',
    excerpt: 'You thought healing would feel like radiant invincibility. In reality, it feels like quiet indifference. Here are the 5 quiet indicators that your nervous system is finally resting in its own authority.',
    coverImage: '/cover-roadmap.webp',
    coverImageAlt: 'HerHorizon Self-Trust Roadmap and Guided Somatic Practices',
    author: {
      name: 'Sara Mitchell',
      role: 'Founder & Trauma-Informed Guide',
      avatar: '/author-portrait.png',
    },
    category: 'Self-Trust',
    tags: ['Self-Trust', 'Emotional Healing', 'Boundaries', 'Peace of Mind'],
    readingTimeMinutes: 4,
    publishedAt: '2026-10-05T12:00:00Z',
    status: 'published',
    featured: false,
    views: 820,
    likes: 71,
    seo: {
      metaTitle: '5 Subtle Signs Your Self-Trust Is Returning | HerHorizon',
      metaDescription: 'How do you know when you are truly healing from relationship trauma? Explore the 5 subtle, quiet shifts that reveal your self-trust is fully coming back online.',
      focusKeyword: 'rebuilding self trust recovery',
      keywords: ['rebuilding self trust', 'signs of emotional healing', 'post traumatic growth relationships', 'setting quiet boundaries', 'healing after betrayal'],
      canonicalUrl: 'https://herhorizon.store/blog/subtle-signs-self-trust-is-returning',
    },
    content: `When we imagine healing, we often picture a triumphant Hollywood scene: walking down a sunlit avenue, laughter echoing, complete imperviousness to pain.

In real life, trauma-informed recovery is far quieter. It does not shout. It settles.

If you have been wondering whether the work you are doing is actually taking root, look for these five subtle, understated shifts:

---

### Sign 1: You Stop Polling a Committee Before Making Decisions

In the depths of self-betrayal, you couldn't buy a pair of shoes or reply to a casual email without screenshotting the screen and texting three friends: *"Does this sound okay? Am I overreacting?"*

When self-trust returns, you make choices quietly. You pick the restaurant, you send the reply, you book the class. Even if you make a mistake, you know you will handle it.

---

### Sign 2: Discomfort No Longer Equals Danger

In a dysregulated body, someone else's bad mood feels like an active threat to your survival. You scramble to appease, smooth over, or over-explain.

As your vagus nerve recalibrates, you realize: **Someone being disappointed in you will not kill you.** You can watch someone sit in discomfort across the table without sacrificing your own peace to rescue them.

---

### Sign 3: You Have "No Response" Where You Used To Have A 5-Paragraph Defense

Remember the frantic notes app drafts? The 1,200-word explanations trying to get someone to see why their behavior was unkind?

The definitive turning point in recovery is the death of the urge to be understood by someone committed to misunderstanding you. A simple:
- *"Understood."*
- *"That does not work for me."*
- Or silence.

Indifference is the true opposite of attachment. Anger is still attachment. Silence is sovereignty.

---

### Sign 4: The 2 A.M. Courtroom Closes Earlier

You may still wake up at 2 A.M. occasionally. An old memory might knock on your door. 

But instead of diving in and prosecuting the trial until dawn, you notice the thought from a distance: *"Ah. That old loop is visiting."* You take three grounding exhales, turn your pillow over to the cool side, and drift back to sleep.

---

### Sign 5: You Prefer Solitude Over Disrespect

This is the crown jewel of self-reclamation. There was a time when the thought of being alone on a Friday evening filled you with dread. 

Today? You cherish your tidy living room, your evening cup of chamomile, your clean sheets. You realize that solitude is not emptiness—it is the presence of your own peaceful spirit.

> *"You did not lose yourself. You only stepped outside while the house was burning. Welcome back inside."*`,
  },
  {
    id: 'post-journal-1',
    slug: 'why-healthy-love-feels-boring',
    title: 'Why Healthy Love Feels Boring: The Neurochemistry of the Dopamine Crash',
    subtitle: 'When your nervous system is conditioned on adrenaline spikes and chaos, emotional consistency feels like withdrawal. Here is how to recalibrate your baseline.',
    excerpt: 'When you step out of a chaotic, high-conflict relationship and encounter someone consistent, your body does not immediately sigh with relief. Instead, a peculiar feeling surfaces: "Is this boring? Is there no spark?" Understanding the neurobiology of the dopamine crash will save you from abandoning real peace.',
    coverImage: '/cover-selftrust.webp',
    coverImageAlt: 'HerHorizon Journal Note on Healthy Love and Nervous System Regulation',
    author: {
      name: 'Sara Mitchell',
      role: 'Founder & Trauma-Informed Guide',
      avatar: '/author-portrait.png',
    },
    category: 'Nervous System',
    tags: ['Healthy Love', 'Dopamine Crash', 'Nervous System', 'Attachment Trauma', 'Trauma Bonds'],
    readingTimeMinutes: 5,
    publishedAt: '2026-10-08T09:00:00Z',
    status: 'published',
    featured: true,
    views: 1640,
    likes: 118,
    seo: {
      metaTitle: 'Why Healthy Love Feels Boring | HerHorizon Journal',
      metaDescription: 'Why does peace feel uncomfortable after a toxic relationship? Explore the neurobiology of the dopamine crash and how to recalibrate your nervous system for safe intimacy.',
      focusKeyword: 'why healthy love feels boring',
      keywords: ['why healthy love feels boring', 'dopamine crash after toxic relationship', 'nervous system calm feels boring', 'trauma bond spark', 'safe love somatic healing'],
      canonicalUrl: 'https://herhorizon.store/blog/why-healthy-love-feels-boring',
    },
    content: `You finally met someone who calls when they say they will. They don’t disappear for forty-eight hours after an argument. They don’t leave passive-aggressive riddles on social media. They are kind, steady, and attentive.

Yet inside your chest, there is no fireworks display. In fact, you might find yourself feeling restless, irritable, or secretly thinking: *"There's just no spark. Is this... boring?"*

Before you sabotage the connection or conclude that you are "only attracted to unavailable people," let us establish the physiological truth:

**Your nervous system is not bored. It is in acute biochemical withdrawal from adrenaline.**

---

### 1. The Addiction to Cortisol and Intermittent Reinforcement

When you spend months or years in a high-conflict or volatile relationship, your brain adapts to an extreme biochemical cocktail:
- **Cortisol & Epinephrine:** Flooding your bloodstream during tension, silent treatments, and walked-on eggshells.
- **Dopamine Jackpot:** Flooding your brain when they suddenly apologize, draw you close, and declare you are the only one who understands them.

This high-low swing is **intermittent reinforcement**—the exact mechanism that makes Las Vegas slot machines addictive. Over time, your autonomic nervous system begins to equate *hypervigilance* with *passion*, and *heart palpitations* with *love*.

When you encounter someone calm and emotionally regulated, there is no danger. There are no cortisol spikes. Without the spike, there is no dramatic relief; without the relief, there is no artificial dopamine explosion. 

To a dysregulated nervous system, peace feels flat, vacant, and uncomfortable.

---

### 2. The Difference Between Anxiety and "The Spark"

What popular culture romantically labels "the electric spark" is, in clinical terms, often your nervous system registering a familiar trauma pattern:
- The racing pulse you felt on date one wasn't destiny; it was your sympathetic nervous system identifying an unpredictable attachment figure.
- The obsession to win their approval was your inner child's old survival response kicking in to resolve an ancient wound.

> **Clinical Reframe:** Real healthy intimacy does not feel like an amusement park roller coaster. It feels like clean linen, a warm cup of herbal tea, and exhaling all the air out of your lungs without guarding your ribs.

---

### 3. How to Recalibrate Your Dopamine Baseline

If you want to receive safe love without running back to the familiar fire, you must somatically guide your body through the quiet:

1. **Name the sensation accurately:** When you feel that urge to label someone "too boring," pause and place your hand on your sternum. Whisper: *"My body is used to the war. Peace feels unfamiliar, but unfamiliar does not mean unsafe."*
2. **Give consistency 60 days:** Do not demand an adrenaline rush from healthy communication. Notice how your sleep improves, how your stomach stops churning, and how you no longer check your phone thirty times an hour.
3. **Seek excitement outside your attachment bonds:** Get your dopamine through creative work, physical exertion, travel, and new skills—not from wondering whether your partner secretly despises you.

Safe love will feel quiet at first. Let it be quiet. The quiet is where you finally get to sleep.`,
  },
  {
    id: 'post-journal-2',
    slug: '90-second-vagus-nerve-reset',
    title: 'The 90-Second Vagus Nerve Reset: Halting Acute Panic & 2 A.M. Trauma Loops',
    subtitle: 'Why positive affirmations backfire during acute emotional flashbacks, and the temperature-based physiology that brings you home.',
    excerpt: 'When your body enters dorsal vagal collapse or acute hyperarousal, your prefrontal cortex shuts down. Here is how cold water immersion and somatic temperature shifts trigger the mammalian dive reflex to halt adrenaline spikes in under two minutes.',
    coverImage: '/cover-free-anchor-card.webp',
    coverImageAlt: 'HerHorizon 90-Second Vagus Nerve Somatic Protocol',
    author: {
      name: 'Sara Mitchell',
      role: 'Founder & Trauma-Informed Guide',
      avatar: '/author-portrait.png',
    },
    category: 'Somatic Protocols',
    tags: ['Vagus Nerve', 'Somatic Reset', '2 AM Loops', 'Panic Attack Relief', 'Polyvagal Healing'],
    readingTimeMinutes: 4,
    publishedAt: '2026-10-01T10:30:00Z',
    status: 'published',
    featured: false,
    views: 1890,
    likes: 135,
    seo: {
      metaTitle: 'The 90-Second Vagus Nerve Reset | HerHorizon Journal',
      metaDescription: 'Discover the 90-second vagus nerve reset using somatic temperature shifts and the mammalian dive reflex to halt trauma loops and panic instantly.',
      focusKeyword: '90-second vagus nerve reset',
      keywords: ['90-second vagus nerve reset', 'mammalian dive reflex anxiety', 'somatic trauma loop reset', 'vagus nerve panic relief', 'polyvagal regulation'],
      canonicalUrl: 'https://herhorizon.store/blog/90-second-vagus-nerve-reset',
    },
    content: `When your phone buzzes with their name, or a sudden memory hits you like a truck in the grocery store aisle, your nervous system does not consult your intellect.

Within 200 milliseconds, your sympathetic branch floods your bloodstream with cortisol and adrenaline. Your pupils dilate, your breath turns shallow, and your muscles brace.

If someone tells you in that moment to *"take a deep breath and think positive thoughts,"* you might feel like screaming. And for good reason: **your brain is doing exactly what it was built to do.**

---

### The Brainstem Hijack

The human brain is organized in a hierarchy:
- **Bottom:** Brainstem & Autonomic Centers (Survival, Heart Rate, Respiration)
- **Middle:** Limbic System (Emotion, Threat Memory, Attachment)
- **Top:** Neocortex (Logic, Language, Future Planning)

Information flows from the **bottom up**. When the lower brain perceives threat, it throttles blood supply to the neocortex. Attempting to calm yourself with intellectual mantras is like trying to rewrite software code on a laptop that has lost power.

To restore power, you must talk to the hardware. You must use the **Vagus Nerve**.

---

### The Mammalian Dive Reflex: Nature’s Hard Reset

Mammals possess an innate survival adaptation known as the **Mammalian Dive Reflex**. When facial thermal sensors (specifically around the eyes, temples, and upper cheeks) detect sudden cold immersion while breathing stops, the brainstem sends an immediate emergency message through the vagus nerve:

1. **Bradycardia:** Heart rate slows by 10% to 25% within seconds.
2. **Peripheral Vasoconstriction:** Blood shifts from extremities to core organs.
3. **Parasympathetic Surge:** The dorsal motor nucleus and ventral vagal brake engage instantly.

---

### The 90-Second Emergency Protocol

When you feel an emotional flashback or panic spike:

1. **Fill a bowl with cold water** (add 3–4 ice cubes if available).
2. **Take a gentle normal inhale**—do not hyperventilate.
3. **Submerge your face** (from eye line to upper cheekbones) into the water for 15 to 20 seconds.
4. **Resurface and breathe out slowly** through pursed lips.
5. **Notice the somatic shift:** Feel the heavy rush of warmth settling into your torso as your heartbeat steadies.

> *"You cannot talk your body out of fear that your body has not felt you physically resolve."*

---

### Practical Integration for Daily Life

Keep an ice roller in your freezer or an insulated tumbler with ice cubes at your desk. When an old text message screenshot resurfaces in your mind, press the cold edge against your sternum and temples. 

Give your body the physical anchor it needs to believe: **You are safe now. The war has ended.**`,
  },
  {
    id: 'post-journal-3',
    slug: 'are-you-a-people-pleaser-or-just-fawning',
    title: 'Are You A People Pleaser or Just Fawning? The Hidden Trauma Response',
    subtitle: 'Why appeasement is not a personality trait or weakness, but an autonomic survival adaptation designed to disarm relational volatility.',
    excerpt: 'You say "yes" when your body screams "no." You apologize when someone bumps into you. Self-help advice tells you to "just set boundaries," but your nervous system treats boundaries like walking into gunfire. Here is the clinical truth about the Fawn response.',
    coverImage: '/cover-traumabond.webp',
    coverImageAlt: 'HerHorizon Journal Note on The Fawn Response and Boundary Reconstruction',
    author: {
      name: 'Sara Mitchell',
      role: 'Founder & Trauma-Informed Guide',
      avatar: '/author-portrait.png',
    },
    category: 'Trauma Recovery',
    tags: ['Fawn Response', 'People Pleasing', 'Boundaries', 'Trauma Recovery', 'Nervous System'],
    readingTimeMinutes: 6,
    publishedAt: '2026-09-29T11:00:00Z',
    status: 'published',
    featured: false,
    views: 1410,
    likes: 98,
    seo: {
      metaTitle: 'Are You A People Pleaser or Just Fawning? | HerHorizon Journal',
      metaDescription: 'Is your people-pleasing actually a trauma response? Understand the autonomic Fawn mechanism, why boundaries trigger panic, and how to recover your voice.',
      focusKeyword: 'are you a people pleaser or just fawning',
      keywords: ['are you a people pleaser or just fawning', 'fawn response trauma', 'people pleasing trauma bond', 'polyvagal fawn response', 'setting boundaries without panic'],
      canonicalUrl: 'https://herhorizon.store/blog/are-you-a-people-pleaser-or-just-fawning',
    },
    content: `You apologize when a waiter brings you the wrong order. You find yourself smiling warmly at someone who just made an insulting remark about your appearance. You agree to take on extra weekend projects at work even while shaking with exhaustion.

Afterwards, you sit in your car, gripping the steering wheel in frustration: *"Why do I do this? Why can't I just stand up for myself? Why am I such a pushover?"*

Let us retire that label right now. You are not a pushover. You are not "too nice." 

You are experiencing an autonomic survival defense known in trauma clinical psychology as **The Fawn Response**.

---

### The Four Threat Responses: Fight, Flight, Freeze, and Fawn

Most people are familiar with the first three evolutionary defenses:
- **Fight:** Moving toward the predator to overpower it.
- **Flight:** Sprinting away from the predator to escape.
- **Freeze:** Playing dead when capture is imminent.

However, pioneer trauma therapist Pete Walker identified the critical fourth response: **Fawn**.

When you were a child in an unpredictable household, or when you entered a relationship with a narcissistic or emotionally volatile partner, Fight was dangerous (it provoked explosive retaliation). Flight was impossible (you had nowhere to go, or they threatened abandonment). 

So your brilliant survival brain discovered the only strategy that kept you physically and emotionally intact: **preemptive appeasement**.

> **The Fawn Strategy:** If I can read their micro-expressions, anticipate their displeasure before they speak it, agree with their worldview, and subordinate all my needs to theirs, I can disarm the threat before it strikes.

---

### Why "Just Set Boundaries" Triggers Full Panic

Standard self-help advice tells you: *"Just say no! Boundaries are healthy!"*

Yet whenever you try to say *"I can't make it"* or *"That behavior doesn't work for me,"* your throat tightens, your heart pounds at 120 BPM, and your gut twists into a knot of existential terror.

Why? Because to your nervous system, **a boundary was coded as an act of war**. In your past experience, expressing a boundary resulted in:
- Days of punitive silence.
- Violent rage or broken objects.
- Vicious accusations of being selfish, cold, or disloyal.

Your body learned that safety equals self-abandonment, and individuality equals exile.

---

### 3 Steps to Somatically Unhook the Fawn Mechanism

You cannot shame yourself into assertiveness. You must guide your physiology to understand that the present moment is no longer your past:

#### 1. The Somatic Delay (The 10-Second Pause)
When asked for a favor or cornered for an immediate commitment, do not answer immediately. Inhale, press both feet into the floor, and use an automated bridge script:
- *"Let me check my calendar and get back to you this afternoon."*
- *"I need to think through my commitments before confirming."*
This 10-second gap breaks the automated appeasement reflex and allows your prefrontal cortex to come back online.

#### 2. Titrated Micro-Disappointments
Start by letting people experience tiny disappointments that carry zero risk:
- Tell the barista you asked for oat milk instead of whole milk.
- Tell a friend you prefer Thai food over Italian tonight.
Notice: The sky did not fall. You did not get abandoned. Your body begins building a track record of survivable autonomy.

#### 3. Recognize That Someone's Bad Mood Is Not Your Emergency
You do not have to be the emotional shock absorber for everyone in the room. When someone sighs, rolls their eyes, or sits in silence, place your hands on your lap and breathe. Their weather belongs to them.

You do not have to abandon yourself to keep the peace. The only peace worth having is the peace that includes you.`,
  },
];

export function getBlogPosts(includeDrafts = true): BlogPost[] {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(INITIAL_BLOG_POSTS));
      return includeDrafts ? INITIAL_BLOG_POSTS : INITIAL_BLOG_POSTS.filter((p) => p.status === 'published');
    }
    const parsed: BlogPost[] = JSON.parse(raw);
    let mutated = false;

    // Ensure all INITIAL_BLOG_POSTS (including newly added journal posts) are present
    const existingSlugs = new Set(parsed.map((p) => p.slug.toLowerCase()));
    INITIAL_BLOG_POSTS.forEach((initPost) => {
      if (!existingSlugs.has(initPost.slug.toLowerCase())) {
        parsed.unshift(initPost);
        mutated = true;
      }
    });

    // Upgrade existing posts to use the author portrait persona from the landing page
    const normalized = parsed.map((p) => {
      if (!p.author || p.author.avatar === '/images/logo.webp' || !p.author.avatar || p.author.avatar.includes('logo')) {
        mutated = true;
        return {
          ...p,
          author: {
            name: p.author?.name === 'Sara M.' ? 'Sara Mitchell' : (p.author?.name || 'Sara Mitchell'),
            role: 'Founder & Trauma-Informed Guide',
            avatar: '/author-portrait.png',
          },
        };
      }
      return p;
    });
    if (mutated) {
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(normalized));
    }
    return includeDrafts ? normalized : normalized.filter((p) => p.status === 'published');
  } catch (err) {
    console.error('Failed to load blog posts from storage', err);
    return INITIAL_BLOG_POSTS;
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts(true);
  const target = slug.toLowerCase();
  const direct = posts.find((p) => p.slug.toLowerCase() === target);
  if (direct) return direct;

  // Handle aliases
  if (target === '90-second-vagus-nerve-reset' || target === '90-second-vagus-nerve-shift') {
    return posts.find((p) => p.slug.includes('vagus-nerve'));
  }
  return undefined;
}

export function saveBlogPost(post: BlogPost): void {
  const posts = getBlogPosts(true);
  const existingIndex = posts.findIndex((p) => p.id === post.id);

  let updated: BlogPost[];
  if (existingIndex >= 0) {
    updated = [...posts];
    updated[existingIndex] = {
      ...post,
      updatedAt: new Date().toISOString(),
      readingTimeMinutes: calculateReadingTime(post.content),
    };
  } else {
    updated = [
      {
        ...post,
        id: post.id || `post-${Date.now()}`,
        publishedAt: post.publishedAt || new Date().toISOString(),
        readingTimeMinutes: calculateReadingTime(post.content),
      },
      ...posts,
    ];
  }

  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('herhorizon_blog_updated'));
}

export function deleteBlogPost(id: string): void {
  const posts = getBlogPosts(true);
  const updated = posts.filter((p) => p.id !== id);
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('herhorizon_blog_updated'));
}

export function incrementPostViews(id: string): void {
  try {
    const posts = getBlogPosts(true);
    const post = posts.find((p) => p.id === id);
    if (post) {
      post.views = (post.views || 0) + 1;
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
      // Don't dispatch global reload event to avoid loop
    }
  } catch {
    // Ignore
  }
}

export function togglePostLike(id: string): number {
  try {
    const posts = getBlogPosts(true);
    const post = posts.find((p) => p.id === id);
    if (post) {
      post.likes = (post.likes || 0) + 1;
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
      return post.likes;
    }
  } catch {
    // Ignore
  }
  return 0;
}

export function resetDefaultBlogPosts(): void {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(INITIAL_BLOG_POSTS));
  window.dispatchEvent(new Event('herhorizon_blog_updated'));
}
