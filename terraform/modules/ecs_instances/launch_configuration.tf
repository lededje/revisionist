resource "aws_launch_configuration" "launch" {
  name_prefix          = "${var.cluster}_${var.instance_group}_${var.environment}_"
  image_id             = var.aws_ami
  instance_type        = var.instance_type
  security_groups      = [aws_security_group.instance.id]
  iam_instance_profile = var.iam_instance_profile_id
  key_name             = var.key_name
  user_data            = data.template_file.user_data.rendered

  # aws_launch_configuration can not be modified.
  # Therefore we use create_before_destroy so that a new modified aws_launch_configuration can be created
  # before the old one get's destroyed. That's why we use name_prefix instead of name.
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "asg" {
  name                 = "${var.cluster}_${var.instance_group}_${var.environment}"
  max_size             = var.max_size
  min_size             = var.min_size
  desired_capacity     = var.desired_capacity
  force_delete         = true
  launch_configuration = aws_launch_configuration.launch.id
  vpc_zone_identifier  = var.subnets
  target_group_arns    = var.target_groups

  tag {
    key                 = "Name"
    value               = "ecs_${var.cluster}_${var.instance_group}_${var.environment}"
    propagate_at_launch = "true"
  }

  tag {
    key                 = "Environment"
    value               = var.environment
    propagate_at_launch = "true"
  }

  tag {
    key                 = "Cluster"
    value               = var.cluster
    propagate_at_launch = "true"
  }

  tag {
    key                 = "InstanceGroup"
    value               = var.instance_group
    propagate_at_launch = "true"
  }
}

data "template_file" "user_data" {
  template = "${file("${path.module}/templates/user_data.sh")}"

  vars = {
    ecs_config        = var.ecs_config
    ecs_logging       = var.ecs_logging
    cluster_name      = var.cluster
    env_name          = var.environment
    custom_userdata   = var.custom_userdata
    cloudwatch_prefix = var.cloudwatch_prefix
  }
}
