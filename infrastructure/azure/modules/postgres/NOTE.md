# Not wired up

This module (Azure Database for PostgreSQL Flexible Server) is kept here as
reference, not called from the root module.

Baseline (Chapter 2) uses a containerized Postgres via StatefulSet instead
(see infrastructure/modules/k8s/base/postgres.yaml) to keep the storage layer
portable across clouds.

Flexible Server is the lower-maintenance option and a legitimate choice for
a business with real operational constraints — it's kept here specifically
to write about later: what it costs, in portability terms, to make that
trade.
