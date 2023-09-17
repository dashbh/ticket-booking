# ticket-booking


## K8 Deployment

- Create Deployment: `kubectl apply -f deployment.yaml`
- Get List of deployments: `kubectl get deployments`
- Delete deployment: `kubectl delete deployment [name]`
- Delete NameSpace : `kubectl delete namespace booking-namespace` (This will delete all the deployments & services)

## Services

- Check service status: `kubectl get svc api-gateway -n booking-namespace`
