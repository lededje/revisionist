resource "aws_route53_zone" "default" {
  name = var.domain
}

resource "aws_route53_record" "record" {
  zone_id = aws_route53_zone.default.zone_id
  name    = var.domain
  type    = "A"

  alias {
    name                   = var.alb_dns_name
    zone_id                = var.alb_zone_id
    evaluate_target_health = true
  }
}
