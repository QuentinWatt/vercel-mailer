# Quentin Watt's email tester

This is a simple email tester for sending emails from Vercel through a local SMTP server.

It's made with [Nuxt 3](https://nuxt.com/docs/getting-started/introduction), [TailwindCSS](https://tailwindcss.com/).

## Try it

1. Clone the repository
2. Run `pnpm install`
3. Run `pnpm run dev`
4. Go to `http://localhost:3000`
5. Fill the form and send the email

## How it works

The email is sent to a local SMTP server, which is configured to send emails to the email address you put in the form.

The email address and password for the SMTP server are stored in the `.env` file.

## Customize it

You can customize the email address and password for the SMTP server in the `.env` file.
