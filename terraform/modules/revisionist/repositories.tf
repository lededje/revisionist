resource "aws_ecr_repository" "nginx" {
  name = "revisionist/${var.environment}/nginx"
}
