# Agent dispatch and review boundaries

The canonical identity and permissions for every producer/reviewer live under `.agents/roles/*.md`. This reference defines only the handoff protocol.

Each task request contains: video ID, unique task ID, phase, agent role, accepted input file paths, exact user requirements, writable paths, expected evidence, acceptance command, and return format.

Producers must not edit outside their writable paths. Reviewers must not edit producer artifacts. A new review context is required for each review round.

The director submits transition requests through `pipeline.py`; it does not directly edit status.json. An orchestrator task state of done does not imply a gate has passed.

Failed tasks return actionable evidence and may be retried by the runtime according to the retry budget. Never retry non-idempotent publishing or destructive actions automatically.
