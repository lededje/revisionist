variable "environment" {
  description = "The name of the environment, e.g: staging"
}

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

variable "ecs_aws_ami" {
  description = "The ami for the instances created for the ecs"
}

variable "certificate_arn" {
  description = "The arn of the certificiate the alb should be using"
}

variable "cloudwatch_prefix" {
  default     = ""
  description = "If you want to avoid cloudwatch collision or you don't want to merge all logs to one log group specify a prefix"
}
