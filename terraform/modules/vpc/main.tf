resource "aws_default_vpc" "default" {
  tags = {
    name = "Default VPC"
  }
}

resource "aws_default_subnet" "default_az1" {
  availability_zone = var.az1

  tags = {
    Name = "Default subnet for ${var.az1}"
  }
}

resource "aws_default_subnet" "default_az2" {
  availability_zone = var.az2

  tags = {
    Name = "Default subnet for ${var.az2}"
  }
}

resource "aws_default_subnet" "default_az3" {
  availability_zone = var.az3

  tags = {
    Name = "Default subnet for ${var.az3}"
  }
}

