variable "environment" {
  description = "The name of the environment, e.g: staging"
}

variable "domain" {
  description = "The domain to register and validate"
}

variable "alb_dns_name" {
  description = "The load balancer name for the primary A record"
}

variable "alb_zone_id" {
  description = "The load balancer zone id for the primary A record"
}
