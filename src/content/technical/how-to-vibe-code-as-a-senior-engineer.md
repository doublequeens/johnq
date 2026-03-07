---
title: "How to Vibe Code as a Senior Engineer"
excerpt: "Over the past few months, I’ve rediscovered my love for building software."
date: 2025-06-20
cover: /images/posts/How-to-Vibe-Code-as-a-Senior-Engineer.jpg
readTime: "7 min read"
---

Over the past few months, I’ve rediscovered my love for building software.

Not in the traditional way—writing line after line of code, plumbing together brittle libraries, grinding through boilerplate. Instead, I’ve been vibe coding.

**Vibe coding** is a new way of building software where you use one of the latest AI models to do most of the work. You write a good prompt, sketch out a plan, and let the model take over. It feels like rubbing a magic lamp and whispering your intent to a genie.

However, just like a genie, unless you give it very specific wishes you're going to get something you didn't expect.

**The biggest change? Code is no longer expensive.**

It used to take weeks to build a feature. Now, with AI, a senior engineer can do it in an hour. A fully featured SaaS app? Perhaps 10 days. I know because I just built one.

This isn’t just productivity—it’s a superpower. But it requires some experience to wield.

## Vibe Coding, Not Just for Junior Engineers

Vibe coding has a bit of a bad rep, partly due to hype from Twitter-thread-bois, and partly because, up until now, the code these AI models produced hasn’t been very good.

But three months ago that all changed with the release of [Claude Sonnet 4](https://www.anthropic.com/news/claude-4?ref=blog.alexmaccaw.com) and [Gemini 2.5 Pro](https://deepmind.google/models/gemini/pro/?ref=blog.alexmaccaw.com). These models are something else. If you've tried AI generating code in the past and been disappointed, try again.

Contrary to popular belief, I believe Vibe coding is most effective for senior engineers. If you know what you're doing, have a deep understanding of the frameworks and libraries, and a clear idea of the way you like to do things, Vibe coding is like adding Nitroglycerin to your productivity.

And it’s fun. Genuinely fun. I don’t think I’ve had this much joy coding in 20 years.

## The Last Hurrah

It looks like we’re in the final stretch where human engineers still matter. Soon, LLMs will close the gap completely.

Right now? It’s the best time ever to be coding. The tooling is magical. The models are competent. The velocity is intoxicating. And most importantly—we still matter. You still need a senior engineer’s judgment to guide architecture, prompt design, scaffold setup, and overall taste.

Soon, that won’t be the case. So take this moment. Build things. Explore. Enjoy the last hurrah of human coding.

# What You Need to Vibe Code

## 1. Great Scaffold

Start with a monorepo scaffold like [`ai‑monorepo‑scaffold`](https://github.com/maccman/ai-monorepo-scaffold/tree/main?ref=blog.alexmaccaw.com). It includes migrations, routes, Zod schemas, React Hook Form setups, etc. AI needs rich examples to learn from.

The AI performs best when it has clear examples of what to do. That's why a strong scaffold with good conventions and patterns is critical to getting the best code out of the genie.

## 2. Strong Rules

Use Cursor’s `.cursor/rules` to codify project conventions. For example, my always rules include:

### Development Cycle

1. Before writing any code, come up with an extremely good plan, review the plan, and then ask the user for permission to execute it.
2. After executing the plan, run: `pnpm typecheck` and `pnpm lint`.
3. To run tests: `pnpm test --filter @app/<web/api/db>`.
4. Never try to start a dev server or curl a local endpoint.

These rules enforce planning, type safety, linting, and test coverage—making the AI behave like a clean, accountable junior engineer.

Have a [peruse of the other rules](https://github.com/maccman/ai-monorepo-scaffold/tree/main/.cursor/rules?ref=blog.alexmaccaw.com) I've written in the scaffold. They cover things like database models, adding a migration, how to use env, react conventions, which shadcn components are available, how to use tRPC, and Typescript code conventions. I recommend also including a description of your project and its various directories.

From time to time you'll see AI making the same mistakes again and again, which is a great teaching opportunity. Cursor has a feature that will generate new rules based off the conversation, which will then be used alongside your existing `.cursor` rules.

![](https://blog.alexmaccaw.com/content/images/2025/06/CleanShot-2025-06-20-at-12.26.03@2x-1.png)

Over time, you will develop a set of rules, specific to you, that you can take with you from application to application.

## 3. Perfect Context

AI suffers from amnesia. It needs the right context to give you what you want, and it's not great at automatically determining the context it needs.

It’s especially weak with TypeScript types—defaults to `any` far too often.

While I don't expect this to last long, it is currently your job to automatically manage context. Here’s my tip:

> Open every relevant file—including
>
> type files—in the editor (
>
> on the import). Then in Cursor, trigger
>
> Add All Open Files to Context.

![](https://blog.alexmaccaw.com/content/images/2025/06/CleanShot-2025-06-20-at-12.23.39@2x.png)

The context issue is another good reason to use monorepos. I used to be bearish but the technology has improved now and having all the code accessible to the AI and easily modifiable without any linting or build issues is worth it.

Don’t be stingy with context. If in doubt, add anything it might need. Of course this will be more expensive, but at the end of the day your time is more valuable than anything else.

## 4. Smart Editor

Use **Cursor**—it offers fast linting, auto type checking, cursor rules integration, and vector code-search. I don't believe in running agents remotely yet because, when the genie wanders off, you need to pause, redirect, and re-prompt mid-generation.

I prefer using Cursor over CLI tools like Claude Code because it's easy to jam things into the context and it also has a quick linter so the AI can quickly see if it's barking up the wrong tree. Command-line-interface tools typically only run a full type check at the end of their modifications, vs as they go. Which gets me onto my next point:

**Small iteration and verification cycles.**

As with good software engineering, you want to have a very quick iteration and verification loop. Write a little code, lint it, run the tests, and then iterate. AI doesn’t tend to do this by default. The models are like over-enthusiastic junior engineers. It's your job to rein them in, slow them down, and compartmentalize larger projects into smaller bit-sized changes.

## 5. Top Models Only

Use the best available: **Claude Opus 4**, **Sonnet 4**, **Gemini 2.5 Pro**, or **o3‑pro**. Always run them in “thinking” mode. Don’t sacrifice quality for cost—your time is far more valuable than token savings.

## 6. Audio Prompts

I often use [**SuperWhisper**](https://superwhisper.com/?ref=blog.alexmaccaw.com) to ramble out my prompts. It’s messy, unstructured—but the model parses it. Audio can be more natural and effective than formatted text. And it lends itself to longer prompts which I've found are better to get the performance you need out of the AI. AI is good, but it can't read your mind yet.

## How to Write a Good Prompt

Prompting is everything. A good prompt turns the AI into a competent junior engineer. A bad prompt turns it into a hallucinating liability. If you're going to vibe code, you need to master the art of clear, directive communication.

Here’s what I’ve found works best:

### 1. **Always Start with a Plan**

Don’t just ask it to "add login." Say:

> Only after you approve the plan should the AI start writing code.

### 2. **Be Specific About the Output**

Tell the AI exactly what you want:

Bad:

>

Good:

>

### 3. **Give Examples and Context**

Examples are your best friend. If the model sees one Zod schema, it’ll replicate the pattern. If you’ve added `.cursor/rules`, remind the AI of them.

Example:

>

### 4. **Use Constraints Liberally**

Don’t assume the AI knows your limits. Say things like:

- *“Do not create a new library”*
- *“Avoid using `any`; use explicit types or infer from Zod”*
- *“Never write tests that hit a real DB—use mocks”*

### 5. **Keep a Tight Scope**

LLMs love to wander. Your job is to keep them on a short leash.

Instead of:

>

Say:

>

### 6. **When in Doubt, Ramble**

Ironically, longer prompts often work better. If you’re stuck, just talk to it like a junior dev:

>

Even a messy paragraph gets parsed surprisingly well.

# What AI Is Really Bad At

## Automatic Context Management

AI doesn’t automatically gather its needed context. You must explicitly open the files and add them via Cursor. Without this, you get hallucinations or bad code that doesn't use the patterns your project expects.

## TypeScript Types

AI is surprisingly bad at TypeScript types. It often gives up and forces types with `as any`. I suspect that this is actually more of a tooling and context issue. I don't believe Cursor is exposing the types from npm modules to the AI as context, and I found that I have needed to do this manually.

## Automatic Planning

By default, AI models just jump straight into coding without confirming a plan with you. I always ask for a plan up front because ultimately, like any endeavor, you'll get better output with a little planning.

## Taste & Architecture

AI lacks a sense of design patterns, modularity, and project-specific stylistic rules. That’s your role: define the architecture and enforce conventions.

# Final Takeaways

- Set up strong scaffolding and type-safe context
- Codify conventions in `.cursor/rules`
- Load all relevant files—including types—into Cursor’s context
- Use planning mode on top-tier models (o3‑pro, Claude Opus 4, etc.)
- Lint, typecheck, and test after each plan execution
- Embrace audio-first prompting
- Enjoy these last few years of human-led coding magic

Now go rub the lamp.
