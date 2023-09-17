# ticket-booking


## K8 Deployment

- Create Deployment: `kubectl apply -f k8-compose.yaml`
- Get List of deployments: `kubectl get deployments -n booking-namespace`
- Delete NameSpace : `kubectl delete namespace booking-namespace` (This will delete all the deployments & services)

## Services

- Check All Services : `kubectl get service -n booking-namespace`
- Check service status: `kubectl get svc api-gateway -n booking-namespace`


## PODS

- Get All pods `kubectl get pods -n booking-namespace`
- Inspect Pods `kubectl describe pod [pod_id] -n booking-namespace`


## GCP - Deployment Steps

- Enable GKE
- Create Cluster: `gcloud container clusters create booking-app-cluster --num-nodes=3 --zone=asia-south1-a`

