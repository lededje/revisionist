locals {
  domain = "staging.revisionist.dev"
}

resource "aws_key_pair" "staging" {
  key_name   = "yubi-access-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC4gjlHxiTox+yECxwhzLKGhR0Ap8yTI6bjCRB0IsXICNpe5fjBnojQVnKZMGMlBzEBQzRd6XI7Q6x5nlOMgPY14hPsxEFSkJ29L4ukk1cX08wBiyBIAwsYbCZ9mVJrHiMqq7QDC9vnrP16yHAodrX7NvNXDvC/FUP2jUWshNr6SwfdgwantxFPnyHT7BYVcmjN9Ii4txhSc5IOPBWSlmnCe5Zl7k4qwCQOiyzzPJcWx1OHr1fi+ckHl3pAy90AVGZEl7XmY5LYC2Mv54feN6V72KPzaT1/04vXZEB0n663Zlws23Pqb7kRWIVlyAJHVhIuNuLrh9Vc3avfQk43foOOValvjUPUHdk+K79ar+2YoIwH+DkBM5dkm0PKTySWv8S96rVZVjh7JGBY0nr9ZePwSH5YkQER/QzxzzUNpP0M4BWGSdaebIn03xcRTOkmohpoRKw7Zy0mHElj24/F2UCT8TdoXS85ayvimQOcqBq8AfbStMBMXmtN2+ScnyCaV/c3HpfEdAX5XZtZUlvxONbu4S9QMbMlYHDZWdcR8Wr/ndV3qBAcrQx2Lc61bMKfuKnDi+6MLfD2XDpFFIQ+y0SecSy02PhQ9x90qIXWcH4z5tCX4J12yOu91PmxqXuMiDbVkOco1s01p1eH7JXT4P0k+Fg/ea6/hWnqNoAIsLMsXw== cardno:000608755298"
}

module "revisionist_staging" {
  source = "./modules/revisionist"

  environment      = "staging"
  max_size         = 2
  min_size         = 1
  desired_capacity = 1
  instance_type    = "t3.micro"
  ecs_aws_ami      = "ami-02b9d5ef54d57fb7d"
  certificate_arn  = aws_acm_certificate_validation.cert.certificate_arn
  key_name         = aws_key_pair.staging.key_name
}



### Routing ###

resource "aws_route53_zone" "primary" {
  name = local.domain
}

resource "aws_route53_record" "staging" {
  zone_id = aws_route53_zone.primary.zone_id
  name = local.domain
  type = "A"

  alias {
    name                   = module.revisionist_staging.alb_dns_name
    zone_id                = module.revisionist_staging.alb_zone_id
    evaluate_target_health = true
  }
}

### Certificate creation and validation ###

resource "aws_acm_certificate" "cert" {
  domain_name       = local.domain
  validation_method = "DNS"

  tags = {
    Environment = "staging"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "acm_validation" {
  name    = aws_acm_certificate.cert.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.cert.domain_validation_options.0.resource_record_type
  zone_id = aws_route53_zone.primary.zone_id
  records = [aws_acm_certificate.cert.domain_validation_options.0.resource_record_value]
  ttl     = 300
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.acm_validation.fqdn]
}

### Outputs ###

output "aws_route53_name_servers" {
  value = aws_route53_zone.primary.name_servers
}
