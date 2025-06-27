# LC Apps Helm Chart

A generic Helm chart for deploying Kubernetes applications.

## Installation

### Option 1: Install from OCI Registry (Recommended for Users)

```bash
# Install directly from OCI registry
helm install my-app oci://ghcr.io/vmelikyan/lc-apps \
  --set image=your-registry/your-app:tag \
  -f your-values.yaml

# Install a specific version
helm install my-app oci://ghcr.io/vmelikyan/lc-apps \
  --version 0.1.0 \
  --set image=your-registry/your-app:tag \
  -f your-values.yaml
```

### Option 2: Install from Local Chart (For Development)

```bash
# Install from local directory
helm install my-app ./helm/lc-apps \
  --set image=your-registry/your-app:tag \
  -f your-values.yaml
```

## Configuration

### Minimal Required Values

- `image`: The container image with tag (e.g., `your-registry/app:v1.0.0`)

### Using External Values Files

You can provide configuration through external YAML files:

```bash
helm install my-app ./helm/lc-apps \
  --set image=your-registry/your-app:v1.0.0 \
  -f ./sysops/helm/common.yaml \
  -f ./sysops/helm/lfc/service/app.yaml
```

### Common Configuration Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `image` | Container image with tag | `""` |
| `imagePullPolicy` | Image pull policy | `IfNotPresent` |
| `deployment.replicaCount` | Number of replicas | `1` |
| `service.enabled` | Enable service | `true` |
| `service.type` | Service type | `ClusterIP` |
| `ingress.enabled` | Enable ingress | `false` |
| `podDisruptionBudget.enabled` | Enable PDB | `false` |
| `nodeAffinity` | Node affinity rules | `{}` |
| `commonLabels` | Additional labels to add to all resources | `{}` |

### Full Values Example

```yaml
image: your-registry/your-app:v1.0.0
component: app
componentType: server

ports:
  - name: tcp
    protocol: TCP
    servicePort: 80
    containerPort: 8080
    appProtocol: http

deployment:
  replicaCount: 2
  resources:
    requests:
      cpu: 100m
      memory: 128Mi
  livenessProbe:
    httpGet:
      path: /health
      port: 8080
    periodSeconds: 10
  readinessProbe:
    httpGet:
      path: /ready
      port: 8080
    periodSeconds: 5

service:
  enabled: true
  type: ClusterIP

ingress:
  enabled: true
  port: 80
  hosts:
    - host: myapp.example.com
      paths:
        - path: /
          pathType: Prefix
```

## Uninstall

```bash
helm uninstall <release-name>
``` 