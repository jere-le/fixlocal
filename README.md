# FixLocal — Cloud Escape Button

> Part of the series: *Kubernetes and Terraform as your cloud escape button*
> → [notmyprimaryregion.cloud](https://notmyprimaryregion.cloud)

FixLocal is a fictional phone repair business used to demonstrate how Kubernetes and Terraform
make cloud vendor lock-in optional — not by pretending everything is portable,
but by making the differences explicit and manageable.

## Structure

```
fixlocal/
├── fixlocal-app/                  # Application source code
│   ├── frontend/                  # Next.js
│   ├── backend/                   # FastAPI + Postgres
│   └── docker-compose.yml         # Local development
│
├── infrastructure/
│   ├── modules/
│   │   └── k8s/
│   │       ├── base/              # Cloud-agnostic manifests
│   │       └── overlays/          # Per-cloud patches (this is where it gets honest)
│   │           ├── azure/
│   │           ├── oci/
│   │           └── aws/
│   ├── azure/                     # Chapter 2: The Baseline
│   ├── oci/                       # Chapter 3: The First Move
│   └── aws/                       # Chapter 4: ...
│
└── cicd/                          # GitHub Actions per cloud
    └── azure.yml
```

## Run locally

```bash
cd fixlocal-app
docker compose up
```

Frontend: http://localhost:3000
API: http://localhost:8000

## What stays the same across clouds
- Application code
- Kubernetes Deployment and Service definitions (base/)
- CI/CD pipeline structure

## What changes
- Terraform provider and resource types
- LoadBalancer annotations (overlays/)
- Storage class names
- Managed Postgres FQDN format and SSL config
- Identity / Workload Identity setup

The overlays directory makes this visible.
