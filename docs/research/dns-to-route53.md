# Moving DNS from Namecheap to Route 53

Researched: 2026-10-28 · Feeds: RADAR R-002

## What "moving DNS" means

Namecheap currently does two jobs for `dylanfranck.com`:

1. **Registrar:** the domain is registered and renewed there. **This doesn't change.**
2. **DNS host:** it answers lookups. **Only this moves.**

The move means pointing the domain's nameservers at Route 53 instead of Namecheap.
Transferring the registration itself is a separate, optional step that isn't needed.

## Steps

1. **Create a Route 53 public hosted zone** for `dylanfranck.com` (~$0.50/mo). AWS assigns
   four nameservers (`ns-NNN.awsdns-NN.com/.net/.org/.co.uk`). Ideally create it in
   OpenTofu.
2. **Copy every current record into the zone.** Nothing changes yet, because nothing
   queries Route 53 yet.
   - GitHub Pages apex: 4 × A, 4 × AAAA
   - `www` CNAME → `dylanfranck.github.io`
   - `jp` CNAME → Vercel
   - The GitHub Pages domain-verification TXT record, and the Google Search Console
     verification TXT record
   - SPF, and DMARC (fix it to `v=DMARC1; p=reject;`; the tag is case-sensitive)
   - Mail records (see the email caveat below)
3. **Lower TTLs** at Namecheap a day ahead, to make a rollback faster.
4. **Check the new zone directly** before switching, for example
   `dig @ns-NNN.awsdns-NN.com dylanfranck.com A`. Every answer should match what
   Namecheap serves today.
5. **At Namecheap:** Domain → Nameservers → "Custom DNS". Paste in the four AWS
   nameservers. That's the actual move. Propagation takes hours, up to about 48. Both
   providers serve identical answers during that time, so visitors don't notice.
6. **Afterwards:** confirm GitHub Pages still shows the domain as verified with HTTPS, and
   Search Console still shows the property as verified.

## ⚠️ Email caveat

Namecheap's free email forwarding works only while Namecheap hosts the DNS (to the best
of my knowledge; re-check Namecheap's docs before moving). Moving the nameservers without
a replacement **silently stops mail to the domain**. Options:

| Option | Cost | Notes |
|---|---|---|
| ImprovMX (or a similar forwarder) | Free tier | Copy its MX/SPF records into Route 53 |
| SES inbound + a small Lambda forwarder | Cents | A good first AWS exercise; more moving parts |
| A real mailbox (Fastmail, WorkMail, etc.) | ~$4–5/mo | Also lets you *send* as @dylanfranck.com |

## Rollback

Switch Namecheap back to "Namecheap BasicDNS". The old records are still there unless
you deleted them, so don't delete them until the move has been stable for a week.
