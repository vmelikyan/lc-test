# LC Apps Helm Chart

This Helm chart can deploy either `grpc-echo` or `my-express-app` independently.

## Installation

### Deploy grpc-echo

```bash
helm install grpc-echo ./helm/lc-apps \
  --set appName=grpc-echo \
  --set image.repository=your-registry/grpc-echo \
  --set image.tag=latest
```

### Deploy my-express-app

```bash
helm install my-express-app ./helm/lc-apps \
  --set appName=my-express-app \
  --set image.repository=your-registry/my-express-app \
  --set image.tag=latest
```

## Configuration

### Required Values

- `appName`: Must be either `grpc-echo` or `my-express-app`
- `image.repository`: The container image repository
- `image.tag`: The container image tag (defaults to chart appVersion)

### Optional Values

You can override any values in the `values.yaml` file. For example:

```bash
helm install my-app ./helm/lc-apps \
  --set appName=grpc-echo \
  --set image.repository=your-registry/grpc-echo \
  --set image.tag=v1.2.3 \
  --set apps.grpc-echo.deployment.replicaCount=3 \
  --set apps.grpc-echo.deployment.resources.requests.memory=200Mi
```

### Enable Ingress for my-express-app

```bash
helm install my-express-app ./helm/lc-apps \
  --set appName=my-express-app \
  --set image.repository=your-registry/my-express-app \
  --set image.tag=latest \
  --set apps.my-express-app.ingress.enabled=true \
  --set apps.my-express-app.ingress.hosts[0].host=myapp.example.com \
  --set apps.my-express-app.ingress.hosts[0].paths[0].path=/
```

## Uninstall

```bash
helm uninstall <release-name>
``` 