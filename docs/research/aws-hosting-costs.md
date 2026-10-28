# AWS hosting costs for a personal site and small apps

Researched: 2026-10-28 · Feeds: RADAR R-002 · Prices: us-east-1, USD, 730 h/month

## The question

Should the hub and future spokes move to AWS (I'm learning IaaS and networking with
OpenTofu), and what does that cost compared with GitHub Pages, Vercel, Supabase, and
Railway?

## Key finding: the cost is hourly charges, not usage

At personal traffic levels, usage charges round to cents. The bill comes from resources
that **charge every hour they exist, however lightly they're used**. A nearly idle ALB costs
the same as a busy one. The AWS "reference architecture" (ALB → private-subnet instances →
RDS, with NAT for egress) is built for high availability across several servers. **A
personal site or a ~10-user app needs none of it.**

## Hourly-billed resources

| Resource | Floor/month | Needed for a personal site or small app? | Sourcing |
|---|---|---|---|
| Application Load Balancer | $16.43 ($0.0225/h) + $0.008/LCU-h | **No.** Its job is spreading traffic over *multiple* servers. Caddy or nginx on one box does TLS and routing for free. | 3rd-party, matches AWS's worked example ([cloudburn](https://cloudburn.io/blog/aws-elastic-load-balancing-pricing)) |
| NAT Gateway | $32.85 ($0.045/h) + $0.045/GB | **No.** Only needed for outbound internet from *private* subnets. Use a public subnet with a tight security group, free gateway endpoints for S3/DynamoDB, IPv6 egress-only, or fck-nat on a `t4g.nano` (~$3). | 3rd-party ([cloudburn](https://cloudburn.io/blog/aws-nat-gateway-pricing), [fck-nat](https://dev.to/dhoang1905/introducing-fck-nat-cost-optimized-alternative-to-aws-nat-gateways-24a)) |
| RDS Postgres `db.t4g.micro` | $11.68 ($0.016/h) + ~$2.30 for 20 GB storage | **No** at ~10 users. Postgres in a container plus a nightly `pg_dump` to S3 is fine. RDS buys managed backups, patching, and failover. | 3rd-party ([Holori](https://calculator.holori.com/aws/rds/db.t4g.micro), [Spare Cores](https://sparecores.com/database/aws/db.t4g.micro)) |
| Aurora Serverless v2 at 0 ACU | Storage only while paused; ~15 s resume | A managed option with no idle compute cost, if wanted | official ([announcement](https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-aurora-serverless-v2-scaling-zero-capacity)) |
| Public IPv4 address | $3.65 each ($0.005/h), idle or not | One per public instance. An ALB uses at least 2. | 3rd-party ([cloudburn](https://cloudburn.io/blog/amazon-vpc-pricing)) |
| EKS control plane | ~$73 | No | general knowledge, not re-verified |

## Free or close to it

| Item | Cost | Sourcing |
|---|---|---|
| Route 53 hosted zone | $0.50/mo + ~$0.40 per million queries | general knowledge, not re-verified |
| CloudFront **flat-rate Free plan** | $0: 1M requests and 100 GB/mo. AWS says the plans bundle WAF, DDoS protection, Route 53 DNS, and S3 credits; exactly what the Free tier includes is unconfirmed. Pro is $15 (10M requests, 50 TB). | official ([plans](https://docs.aws.amazon.com/PricingPlanManager/latest/UserGuide/plans.html)) |
| ACM certificates | Free | general knowledge |
| Lambda | Always Free: 1M requests and 400K GB-s/mo | 3rd-party ([AWS Architecture Blog](https://aws.amazon.com/blogs/architecture/building-a-three-tier-architecture-on-a-budget/)) |
| DynamoDB | Always Free: 25 GB | 3rd-party |
| Cognito | I believe the lowest tier is free up to ~10k monthly active users | **unverified**, check before relying on it |

## Free tier changes (why AWS feels stingier now)

- Accounts opened **before 2025-07-15** keep the old program, including the **12-month free
  tier** (750 h/mo each of an EC2 micro, an RDS micro, and a load balancer). That free tier
  is why a small company stack can cost almost nothing in its first year.
- Accounts opened **since then** get **$100 of credits at signup, plus up to $100 more** for
  onboarding tasks. The **Free plan ends at 6 months or when the credits run out**, whichever
  comes first. "Always Free" allowances (Lambda, DynamoDB, and others) still apply.
  Sources: 3rd-party ([Rackspace](https://spot.rackspace.com/blog/aws-free-tier),
  [Neowin](https://www.neowin.net/news/aws-free-tier-overhauled-new-users-get-200-in-credits-but-theres-a-catch/)).
  Check [aws.amazon.com/free](https://aws.amazon.com/free) for the official terms.

## Lightsail (official pricing, [page](https://aws.amazon.com/lightsail/pricing/))

The **$5 plan is one small server**, not a managed stack. You run everything on it.

| Bundle (IPv4 / IPv6-only) | RAM | vCPU | SSD | Transfer |
|---|---|---|---|---|
| $5 / $3.50 | 0.5 GB | 2 | 20 GB | 1 TB |
| $7 / $5 | 1 GB | 2 | 40 GB | 2 TB |
| $12 / $10 | 2 GB | 2 | 60 GB | 3 TB |

The add-ons that make it "managed": a database at $15 (1 GB, 40 GB storage; $30 for high
availability) and a load balancer at $18. Instance + database + load balancer comes to
about $40/mo, the same as plain AWS. Lightsail includes the IPv4 address and transfer in
a flat price, but **it hides the VPC, subnets, and routing**, so it doesn't teach the
networking. A stopped instance still bills; to stop paying, snapshot it and delete it.

## Reference costs: the same small app (React + FastAPI + Postgres, ~10 users)

| Setup | ~Monthly | Who does ops |
|---|---|---|
| Railway (existing comparable app) | ~$20 | Platform |
| Vercel Hobby + Supabase free | $0 (Hobby is non-commercial; Supabase free pauses after ~1 week idle, ~500 MB database; both unverified here) | Platform |
| **One EC2 `t4g.small`, Docker Compose (Caddy + API + Postgres), public subnet, SSM for admin, `pg_dump` to S3** | ~$12 + $3.65 IPv4 + ~$1.60 for 20 GB gp3 = **~$17** (a `t4g.micro` brings it to ~$11) | Me |
| Lightsail $12 bundle, same Compose | **$12** | Me |
| "Reference architecture": ALB + EC2 + RDS (+ NAT) | **~$40–45** (~$75 with NAT) | AWS (partly) |

A static hub needs no server at all: GitHub Pages costs $0, and S3 + CloudFront's Free plan
costs about $0.

## Learning path that fits the budget

1. **Account hygiene:** a personal AWS account separate from any employer's, MFA on root,
   IAM Identity Center for daily use, and an AWS Budget alert at about $10. (One onboarding
   credit task is reportedly setting up a Budget.)
2. **DNS as code:** a Route 53 zone in OpenTofu (~$0.50/mo). See
   [dns-to-route53.md](dns-to-route53.md).
3. **Static hub on S3 + CloudFront + ACM,** deployed from GitHub Actions through OIDC (no
   stored keys). Teaches IAM trust policies, origin access control, and caching, and adds
   the security headers GitHub Pages can't set.
4. **One Compose box** for app spokes (table above): VPC, subnet, route table, internet
   gateway, security groups, instance IAM role, SSM.
5. **Optional high-availability lab:** private subnets + NAT + ALB + RDS written in
   OpenTofu. `apply` it for a weekend, then `destroy`. About $0.10/h all-in, so roughly $5
   per 48-hour lab.

Rules for infra in this public repo: OpenTofu state lives in a private S3 bucket, never in
git; no access keys anywhere (use OIDC for CI).
