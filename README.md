# Docker-node project skeleton

An template for a nodejs project that includes
- Docker support
- A deploy github workflow

## Github/Woodpecker secrets
- `SSH_PRIVATE_KEY`
- `SERVER_IP`
- `SSH_USER`
- `DEPLOY_PATH`

## Ci/cd prerequisites

All you need to do is clone the repository on the server to `DEPLOY_PATH`