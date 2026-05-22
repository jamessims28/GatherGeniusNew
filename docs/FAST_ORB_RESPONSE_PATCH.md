# Fast Orb Response Patch

Optimized the orb response flow:

- Instant local voice response before API call
- Non-blocking background API call
- Shorter voice response text
- Faster speech rate
- Faster active animation reset
- Lightweight `/api/acquisition/run` response
- Keeps memory/investor/demo work queued in background instead of blocking voice

This makes the orb feel faster and more alive.
