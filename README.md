# Luke & Jadi's Wedding Website

I know there are many wedding website builders out there, but I wanted to build a website because it is what I do. Another benefit is we could really customize it and it performs better.

## Tech Stack

- [Fathom Analytics](https://usefathom.com/ref/KTQXKQ)
- [Doppler](https://doppler.com/join?invite=31A4693C)
- [Next.js](https://nextjs.org/)
- [TypeScript](http://typescriptlang.org/)
- [CockroachDB](https://www.cockroachlabs.com/)
- [Pulumi](https://www.pulumi.com/)
- [Cloudflare](https://www.cloudflare.com/)
- [Clerk](https://clerk.dev/)
- [TailwindCSS](https://tailwindcss.com/)

This is not intended to be reused by others but it certainly can with some modification.

## Database Migrations

Currently, these are not working in CI and I cannot figure out why. Here are the steps to run database migrations.

1. `MIGRATION_DSN=$MIGRATION_DSN_ENV make schema-migrate`
