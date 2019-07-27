output "id" {
  value = aws_default_vpc.default.id
}

output "subnet_ids" {
  value = [
    aws_default_subnet.default_az1.id,
    aws_default_subnet.default_az2.id,
    aws_default_subnet.default_az3.id,
  ]
}

output "cidr_block" {
  value = "10.0.0.0/16"
}

