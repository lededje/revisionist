module "vpc" {
  source = "../vpc"

  az1 = "eu-west-1a"
  az2 = "eu-west-1b"
  az3 = "eu-west-1c"
}

module "ecs_instances" {
  source = "../ecs_instances"

  environment             = var.environment
  cluster                 = var.cluster
  instance_group          = var.instance_group
  aws_ami                 = var.ecs_aws_ami
  subnets                 = module.vpc.subnet_ids
  instance_type           = var.instance_type
  max_size                = var.max_size
  min_size                = var.min_size
  desired_capacity        = var.desired_capacity
  vpc_id                  = module.vpc.id #
  iam_instance_profile_id = aws_iam_instance_profile.ecs.id
  key_name                = var.key_name
  target_groups           = [module.alb.default_alb_target_group]
  cloudwatch_prefix    = var.cloudwatch_prefix
}

resource "aws_ecs_cluster" "cluster" {
  name = var.cluster
}
