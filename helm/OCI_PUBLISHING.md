# Helm Chart OCI Publishing Guide

This guide explains how the Helm chart OCI publishing workflow works for the `lc-apps` chart.

## How It Works

The GitHub Actions workflow automatically publishes the Helm chart to GitHub Container Registry (ghcr.io) when you create a new git tag.

## Publishing a New Version

1. **Update the Chart Version**
   
   Edit `helm/lc-apps/Chart.yaml` and update the version:
   ```yaml
   version: 0.2.0  # Increment this
   ```

2. **Commit Your Changes**
   ```bash
   git add helm/lc-apps/Chart.yaml
   git commit -m "Bump chart version to 0.2.0"
   git push
   ```

3. **Create a Git Tag**
   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   ```

4. **Automatic Publishing**
   
   The GitHub Actions workflow will automatically:
   - Package the Helm chart
   - Push it to `ghcr.io/vmelikyan/lc-apps`
   - Make it available for installation

## Manual Publishing (Alternative)

You can also trigger the workflow manually from GitHub Actions UI using the "workflow_dispatch" event.

## Verifying the Published Chart

After publishing, users can install your chart with:

```bash
# Latest version
helm install my-release oci://ghcr.io/vmelikyan/lc-apps

# Specific version
helm install my-release oci://ghcr.io/vmelikyan/lc-apps --version 0.2.0
```

## Troubleshooting

- Ensure the workflow has permissions to write packages
- Check GitHub Actions logs if publishing fails
- The chart name in ghcr.io will be `ghcr.io/vmelikyan/lc-apps`

## Notes

- The local chart remains unchanged and can still be used for development
- OCI publishing is in addition to local usage, not a replacement
- GitHub Container Registry is free for public repositories