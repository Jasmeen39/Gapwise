# Development workflow

1. Create a branch for one focused task, for example `feature/health-endpoint`.
2. Make a small, reviewable change.
3. Run relevant checks locally.
4. Review the diff and remove unrelated edits.
5. Commit with a clear message.
6. Push and open a pull request; CI must pass before merging.

For solo development, the pull request is still useful as a review checkpoint. Do not merge failing checks without understanding and resolving the failure.
