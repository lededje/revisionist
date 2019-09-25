# General

variable "environment" {
  description = "The name of the environment, e.g: staging"
}

variable "domain" {
  description = "The domain to register and validate"
}

# ECS

variable "max_size" {
  description = "The largest the ecs cluster will grow to"
}

variable "min_size" {
  description = "The smallest the ecs cluster will grow to"
}

variable "desired_capacity" {
  description = "The desired amount of instances ecs cluster aim for"
}

variable "instance_type" {
  description = "The type of instances the ecs cluster should spawn"
}

variable "key_name" {
  description = "Access key for access to ec2 instance. In production null key is recommended"
}

variable "cloudwatch_prefix" {
  default     = ""
  description = "If you want to avoid cloudwatch collision or you don't want to merge all logs to one log group specify a prefix"
}

# RDS

variable "db_username" {
  description = "Database username"
}
