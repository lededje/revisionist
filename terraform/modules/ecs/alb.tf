module "alb" {
  source = "../alb"

  environment     = var.environment
  alb_name        = "${var.cluster}-${var.environment}"
  vpc_id          = module.vpc.id
  subnet_ids      = module.vpc.subnet_ids
  certificate_arn = var.certificate_arn
}

resource "aws_security_group_rule" "alb_to_ecs" {
  type                     = "ingress"
  from_port                = 32768
  to_port                  = 61000
  protocol                 = "TCP"
  source_security_group_id = module.alb.alb_security_group_id
  security_group_id        = module.ecs_instances.ecs_instance_security_group_id
}
