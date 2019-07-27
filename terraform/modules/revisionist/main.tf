locals {
  cluster = "revisionist-${var.environment}"
  region = "eu-west-1"
}

module "ecs" {
  source = "../ecs"

  environment      = var.environment
  cluster          = local.cluster
  max_size         = var.max_size
  min_size         = var.min_size
  desired_capacity = var.desired_capacity
  key_name         = var.key_name
  instance_type    = var.instance_type
  ecs_aws_ami      = var.ecs_aws_ami
  certificate_arn = var.certificate_arn
  cloudwatch_prefix = var.cloudwatch_prefix
}

resource "aws_ecs_service" "nginx" {
  name            = "nginx-${var.environment}"
  cluster         = local.cluster
  task_definition = aws_ecs_task_definition.service.arn
  desired_count   = 1

  load_balancer {
    target_group_arn = module.ecs.default_alb_target_group
    container_name   = "nginx"
    container_port   = 80
  }
}

resource "aws_ecr_repository" "nginx_repo" {
  name = "nginx"
}

data "template_file" "tasks" {
  template = "${file("${path.module}/services/default_cluster.json")}"

  vars =  {
    ecr_repository = aws_ecr_repository.nginx_repo.repository_url
    log_group = aws_cloudwatch_log_group.docker.name
    log_region = local.region
    environment = var.environment
  }
}

resource "aws_ecs_task_definition" "service" {
  family = "${var.environment}_revisionist"

  container_definitions = data.template_file.tasks.rendered
}
