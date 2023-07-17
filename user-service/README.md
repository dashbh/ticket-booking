# Docker
docker tag ticket-booking-user-service bhadash1/ticket-booking-user-service:v1
docker push bhadash1/ticket-booking-user-service:v1

# Minikube Apply
kubectl apply -f deployment.yaml
kubectl apply -f services.yaml

# Get
kubectl get deployments
kubectl get services

# Delete
kubectl delete deployment user-service
kubectl delete service mongo-service