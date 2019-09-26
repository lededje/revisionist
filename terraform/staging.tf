module "staging" {
  source = "./modules/revisionist"

  domain      = "limitingfactor.io"
  subdomain   = "staging"
  environment = "staging"


  max_size         = 2
  min_size         = 1
  desired_capacity = 1
  instance_type    = "t3.micro"
  key_name         = aws_key_pair.staging.key_name

  db_username       = var.db_username
  db_instance_class = "db.t3.micro"
}

resource "aws_key_pair" "staging" {
  key_name   = "excession-yubi-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC4gjlHxiTox+yECxwhzLKGhR0Ap8yTI6bjCRB0IsXICNpe5fjBnojQVnKZMGMlBzEBQzRd6XI7Q6x5nlOMgPY14hPsxEFSkJ29L4ukk1cX08wBiyBIAwsYbCZ9mVJrHiMqq7QDC9vnrP16yHAodrX7NvNXDvC/FUP2jUWshNr6SwfdgwantxFPnyHT7BYVcmjN9Ii4txhSc5IOPBWSlmnCe5Zl7k4qwCQOiyzzPJcWx1OHr1fi+ckHl3pAy90AVGZEl7XmY5LYC2Mv54feN6V72KPzaT1/04vXZEB0n663Zlws23Pqb7kRWIVlyAJHVhIuNuLrh9Vc3avfQk43foOOValvjUPUHdk+K79ar+2YoIwH+DkBM5dkm0PKTySWv8S96rVZVjh7JGBY0nr9ZePwSH5YkQER/QzxzzUNpP0M4BWGSdaebIn03xcRTOkmohpoRKw7Zy0mHElj24/F2UCT8TdoXS85ayvimQOcqBq8AfbStMBMXmtN2+ScnyCaV/c3HpfEdAX5XZtZUlvxONbu4S9QMbMlYHDZWdcR8Wr/ndV3qBAcrQx2Lc61bMKfuKnDi+6MLfD2XDpFFIQ+y0SecSy02PhQ9x90qIXWcH4z5tCX4J12yOu91PmxqXuMiDbVkOco1s01p1eH7JXT4P0k+Fg/ea6/hWnqNoAIsLMsXw== cardno:000608755298"
}
